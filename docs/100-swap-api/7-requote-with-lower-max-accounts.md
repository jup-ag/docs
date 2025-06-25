---
sidebar_label: "Requote with Lower Max Accounts"
description: "Requote and adjust max accounts via the Swap API."
title: "Requote with Lower Max Accounts"
---

<head>
    <title>Requote with Lower Max Accounts</title>
    <meta name="twitter:card" content="summary" />
</head>

In some cases where you might be limited or require strict control by adding your own instructions to the swap transaction, you might face issues with exceeding transaction size limit. In this section, we will provide some helping code to help you requote when the transaction size is too large.

:::note
We provide a `maxAccounts` param in the `/quote` endpoint to allow you to reduce the total number of accounts used for a swap - this will allow you to add your own instructions.

[Refer to this section for more information and do note its limitations and important notes before using](/docs/swap-api/get-quote#max-accounts).
:::

## Example Code

1. Request for quote and the swap transaction as per normal.
2. Serialize the transaction.
3. Use the conditions to check if the transaction is too large.
    1. If too large, requote again with lower max accounts - do note that the route will change.
    2. If not, sign and send to the network.

:::tip
We recommend `maxAccounts` 64 and start as high as you can, then incrementally reduce when requoting.

Do note that with lower max accounts, it will might yield bad routes or no route at all.
:::

:::tip
When you serialize the transaction, you can log the number of raw bytes being used in the transaction.

You can either add your custom instructions before or after serializing the transaction.
:::

```jsx
import {
    AddressLookupTableAccount,
    Connection,
    Keypair,
    PublicKey,
    TransactionInstruction,
    TransactionMessage,
    VersionedTransaction,
} from '@solana/web3.js';

// Set up dev environment
import fs from 'fs';
const privateKeyArray = JSON.parse(fs.readFileSync('/Path/to/key', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
const connection = new Connection('your-own-rpc');

// Recommended
const MAX_ACCOUNTS = 64

async function getQuote(maxAccounts) {
    const params = new URLSearchParams({
        inputMint: 'insert-mint',
        outputMint: 'insert-mint',
        amount: '1000000',
        slippageBps: '100',
        maxAccounts: maxAccounts.toString()
    });

    const url = `https://lite-api.jup.ag/swap/v1/quote?${params}`;
    const response = await fetch(url);
    
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const quoteResponse = await response.json();
    
    if (quoteResponse.error) {
        throw new Error(`Jupiter API error: ${quoteResponse.error}`);
    }
    
    return quoteResponse;
};

async function getSwapInstructions(quoteResponse) {
    const response = await fetch('https://lite-api.jup.ag/swap/v1/swap-instructions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quoteResponse: quoteResponse,
            userPublicKey: wallet.publicKey.toString(),
            prioritizationFeeLamports: {
                priorityLevelWithMaxLamports: {
                    maxLamports: 10000000,
                    priorityLevel: "veryHigh"
                }
            },
            dynamicComputeUnitLimit: true,
        }, null, 2)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const swapInstructionsResponse = await response.json();
    
    if (swapInstructionsResponse.error) {
        throw new Error(`Jupiter API error: ${swapInstructionsResponse.error}`);
    }

    return swapInstructionsResponse;
};

async function buildSwapTransaction(swapInstructionsResponse) {
    const {
        computeBudgetInstructions,
        setupInstructions,
        swapInstruction,
        cleanupInstruction,
        addressLookupTableAddresses,
    } = swapInstructionsResponse;
    
    const deserializeInstruction = (instruction) => {
        if (!instruction) return null;
        return new TransactionInstruction({
            programId: new PublicKey(instruction.programId),
            keys: instruction.accounts.map((key) => ({
                pubkey: new PublicKey(key.pubkey),
                isSigner: key.isSigner,
                isWritable: key.isWritable,
            })),
            data: Buffer.from(instruction.data, "base64"),
        });
    };

    const getAddressLookupTableAccounts = async (
        keys
    ) => {
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
    };

    const addressLookupTableAccounts = [];
    addressLookupTableAccounts.push(
        ...(await getAddressLookupTableAccounts(addressLookupTableAddresses))
    );

    const blockhash = (await connection.getLatestBlockhash()).blockhash;

    // Create transaction message with all instructions
    const messageV0 = new TransactionMessage({
        payerKey: wallet.publicKey,
        recentBlockhash: blockhash,
        instructions: [
            ...(computeBudgetInstructions?.map(deserializeInstruction).filter(Boolean) || []),
            ...(setupInstructions?.map(deserializeInstruction).filter(Boolean) || []),
            deserializeInstruction(swapInstruction),
            ...(cleanupInstruction ? [deserializeInstruction(cleanupInstruction)].filter(Boolean) : []),
        ].filter(Boolean),
    }).compileToV0Message(addressLookupTableAccounts);

    const transaction = new VersionedTransaction(messageV0);

    return transaction;
}

async function checkTransactionSize(transaction) {
    // Max raw bytes of a Solana transaction is 1232 raw bytes
    // Using the conditions below, we can check the size of the transaction
    // (or if it is too large to even serialize)
    try {
        const transactionUint8Array = transaction.serialize();
        console.log(transactionUint8Array.length)

        // Use 1232 assuming you have added your instructions to the transaction above
        // If you have not add your instructions, you will need to know how much bytes you might use
        return (transactionUint8Array.length > 1232);

    } catch (error) {
        if (error instanceof RangeError) {
            console.log("Transaction is too large to even serialize (RangeError)");

            return true;

        } else {
            throw error; // Re-throw if it's not a RangeError
        }
    }
}

// Main execution logic with retry mechanism
let counter = 0;
let transactionTooLarge = true;
let quoteResponse, swapInstructionsResponse, transaction;

while (transactionTooLarge && counter < MAX_ACCOUNTS) {
    try {
        console.log(`Attempting with maxAccounts: ${MAX_ACCOUNTS - counter}`);
        
        quoteResponse = await getQuote(MAX_ACCOUNTS - counter);
        swapInstructionsResponse = await getSwapInstructions(quoteResponse);
        transaction = await buildSwapTransaction(swapInstructionsResponse);
        transactionTooLarge = await checkTransactionSize(transaction);
        
        if (transactionTooLarge) {
            console.log(`Transaction too large (with ${MAX_ACCOUNTS - counter} maxAccounts), retrying with fewer accounts...`);
            counter++;
        } else {
            console.log(`Transaction size OK with ${MAX_ACCOUNTS - counter} maxAccounts`);
        }
        
    } catch (error) {
        console.error('Error in attempt:', error);
        counter += 2; // Incrementing by 1 account each time will be time consuming, you can use a higher counter
        transactionTooLarge = true;
    }
}

if (transactionTooLarge) {
    console.error('Failed to create transaction within size limits after all attempts');
} else {
    console.log('Success! Transaction is ready for signing and sending');
    
    // After, you can add your transaction signing and sending logic
}
```

## Example Response

```markdown
Attempting with maxAccounts: 64
Transaction is too large to even serialize (RangeError)
Transaction too large (with 64 maxAccounts), retrying with fewer accounts...

Attempting with maxAccounts: 63
Transaction is too large to even serialize (RangeError)
Transaction too large (with 63 maxAccounts), retrying with fewer accounts...

...

Attempting with maxAccounts: 57
1244
Transaction too large (with 57 maxAccounts), retrying with fewer accounts...

Attempting with maxAccounts: 56
1244
Transaction too large (with 56 maxAccounts), retrying with fewer accounts...

...

Attempting with maxAccounts: 51
1213
Transaction size OK with 51 maxAccounts
Success! Transaction is ready for signing and sending
```