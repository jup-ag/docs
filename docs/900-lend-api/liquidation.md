---
sidebar_label: "Liquidation"
description: "Liquidation for Jupiter Lend."
title: "About Liquidation"
---

<head>
    <title>Liquidation</title>
    <meta name="twitter:card" content="summary" />
</head>

Jupiter Lend allows anyone to participate in the liquidation mechanism. In this section, we have included a minimal Typescript example to get you started.

```typescript
import {
  getLiquidateIx,
  getAllLiquidations,
  getVaultsProgram,
} from "@jup-ag/lend/borrow";
import { getFlashBorrowIx, getFlashPaybackIx } from "@jup-ag/lend/flashloan";
import {
  Connection,
  PublicKey,
  ComputeBudgetProgram,
  TransactionMessage,
  VersionedTransaction,
  TransactionInstruction,
  AddressLookupTableAccount,
} from "@solana/web3.js";
import BN from "bn.js";
import axios from "axios";

const RPC_URL = "<RPC_URL>";
const SLIPPAGE_BPS = 100;

const signer = new PublicKey("1234567890");
const connection = new Connection(RPC_URL);
const program = getVaultsProgram({ connection, signer });
const configs = await program.account.vaultConfig.all();

async function fetchLiquidations() {
  try {
    const allAvailableLiquidations = await getAllLiquidations({
      connection,
      signer,
    });

    const validLiquidations: any = [];

    for (const vaultLiquidation of allAvailableLiquidations) {
      const { liquidations, vaultId } = vaultLiquidation;

      if (liquidations.length === 0) continue;

      // prettier-ignore
      for (const liquidation of liquidations) {
          const supplyToken = configs.find((config) => config.account.vaultId === vaultId)?.account.supplyToken;
          const borrowToken = configs.find((config) => config.account.vaultId === vaultId)?.account.borrowToken;
          
          validLiquidations.push({
            vaultId,
            liquidation,
            debtAmount: new BN(liquidation.amtIn),
            collateralAmount: new BN(liquidation.amtOut),
            supplyToken,
            borrowToken,
          });
        }
    }

    return validLiquidations;
  } catch (error) {
    console.error("Error fetching liquidations:", error);
    throw error;
  }
}

async function getJupiterQuote({
  inputMint,
  outputMint,
  amount,
  slippageBps = SLIPPAGE_BPS,
}) {
  try {
    const response = await axios.get("https://lite-api.jup.ag/swap/v1/quote", {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps,
        restrictIntermediateTokens: true,
        maxAccounts: 32,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching Jupiter quote:",
      error.response?.data || error.message
    );
    throw error;
  }
}

async function getJupiterSwapInstructions({ quoteResponse, userPublicKey }) {
  try {
    const response = await axios.post(
      "https://lite-api.jup.ag/swap/v1/swap-instructions",
      {
        quoteResponse,
        userPublicKey,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.data.error) {
      throw new Error(
        "Failed to get swap instructions: " + response.data.error
      );
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error getting swap instructions:",
      error.response?.data || error.message
    );
    throw error;
  }
}

function deserializeInstruction(instruction) {
  return new TransactionInstruction({
    programId: new PublicKey(instruction.programId),
    keys: instruction.accounts.map((key) => ({
      pubkey: new PublicKey(key.pubkey),
      isSigner: key.isSigner,
      isWritable: key.isWritable,
    })),
    data: Buffer.from(instruction.data, "base64"),
  });
}

async function getAddressLookupTableAccounts(connection, keys) {
  if (!keys || keys.length === 0) return [];

  const addressLookupTableAccountInfos =
    await connection.getMultipleAccountsInfo(
      keys.map((key) => new PublicKey(key))
    );

  return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
    const addressLookupTableAddress = keys[index];
    if (accountInfo) {
      const addressLookupTableAccount = new AddressLookupTableAccount({
        key: new PublicKey(addressLookupTableAddress),
        state: AddressLookupTableAccount.deserialize(accountInfo.data),
      });
      acc.push(addressLookupTableAccount);
    }
    return acc;
  }, []);
}

async function executeLiquidation({
  vaultId,
  debtAmount,
  collateralAmount,
  supplyToken,
  borrowToken,
}) {
  try {
    console.log(`Executing liquidation for vault ${vaultId}...`);

    const instructions: TransactionInstruction[] = [];
    let allAddressLookupTableAccounts: AddressLookupTableAccount[] = [];

    // Step 1: Flash borrow the debt amount
    const flashBorrowIx = await getFlashBorrowIx({
      amount: debtAmount,
      asset: borrowToken,
      signer,
      connection,
    });

    instructions.push(flashBorrowIx);

    // Step 2: Get liquidation instructions
    const {
      ixs: liquidateIxs,
      addressLookupTableAccounts: liquidateLookupTables,
    } = await getLiquidateIx({
      vaultId,
      debtAmount,
      signer,
      connection,
    });

    instructions.push(...liquidateIxs);

    if (liquidateLookupTables && liquidateLookupTables.length > 0) {
      allAddressLookupTableAccounts.push(...liquidateLookupTables);
    }

    // Step 3: Get Jupiter swap quote (collateral token -> debt token)
    const quoteResponse = await getJupiterQuote({
      inputMint: supplyToken.toString(), // Collateral token
      outputMint: borrowToken.toString(), // Debt token
      amount: collateralAmount.toString(),
      slippageBps: SLIPPAGE_BPS,
    });

    // Step 4: Get Jupiter swap instructions
    const swapInstructions = await getJupiterSwapInstructions({
      quoteResponse,
      userPublicKey: signer.toString(),
    });

    const {
      setupInstructions,
      swapInstruction: swapInstructionPayload,
      cleanupInstruction,
      addressLookupTableAddresses,
    } = swapInstructions;

    if (setupInstructions && setupInstructions.length > 0) {
      instructions.push(...setupInstructions.map(deserializeInstruction));
    }

    instructions.push(deserializeInstruction(swapInstructionPayload));

    if (cleanupInstruction) {
      instructions.push(deserializeInstruction(cleanupInstruction));
    }

    // Step 5: Flash payback
    const flashPaybackIx = await getFlashPaybackIx({
      amount: debtAmount,
      asset: borrowToken,
      signer,
      connection,
    });
    instructions.push(flashPaybackIx);

    // Step 6: Get Jupiter address lookup tables
    if (addressLookupTableAddresses && addressLookupTableAddresses.length > 0) {
      const jupiterLookupTables = await getAddressLookupTableAccounts(
        connection,
        addressLookupTableAddresses
      );
      allAddressLookupTableAccounts.push(...jupiterLookupTables);
    }

    // Step 7: Build and send transaction
    const latestBlockhash = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
      payerKey: signer,
      recentBlockhash: latestBlockhash.blockhash,
      instructions: [
        ComputeBudgetProgram.setComputeUnitLimit({
          units: 1_000_000,
        }),
        ...instructions,
      ],
    }).compileToV0Message(allAddressLookupTableAccounts);

    const transaction = new VersionedTransaction(messageV0);

    return transaction;
  } catch (error) {
    console.error(`Error executing liquidation for vault ${vaultId}:`, error);
    throw error;
  }
}

async function runLiquidationBot() {
  try {
    const liquidations = await fetchLiquidations();

    if (liquidations.length === 0) {
      console.log("No liquidations available at this time.");
      return;
    }

    for (const liquidationData of liquidations) {
      const {
        vaultId,
        debtAmount,
        collateralAmount,
        borrowToken,
        supplyToken,
      } = liquidationData;

      try {
        const signature = await executeLiquidation({
          vaultId,
          debtAmount,
          collateralAmount,
          borrowToken,
          supplyToken,
        });

        console.log(`Successfully liquidated vault ${vaultId}: ${signature}`);

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to liquidate vault ${vaultId}:`, error.message);
        continue;
      }
    }
  } catch (error) {
    console.error("Error in liquidation bot:", error);
  }
}
```