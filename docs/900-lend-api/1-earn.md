---
sidebar_label: "Earn (Beta)"
description: "Use Jupiter Lend to borrow assets."
title: "Earn (Beta)"
---

<head>
    <title>Earn (Beta)</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
- Lite URL: `https://lite-api.jup.ag/quote`
- Pro URL: `https://api.jup.ag/swap/v1/quote`

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

:::tip API Reference
To fully utilize the Lend API, check out the [Lend API Reference](/docs/api/lend-api).
:::

## Prerequisite

<details>
    <summary>
        <div>
            <div>
                <b>Dependencies</b>
            </div>
        </div>
    </summary>

```bash
npm install @solana/web3.js@1 # Using v1 of web3.js instead of v2
npm install dotenv # If required for wallet setup
```
</details>

<details>
    <summary>
        <div>
            <div>
                <b>RPC</b>
            </div>
        </div>
    </summary>

**Set up RPC**

:::note
Solana provides a [default RPC endpoint](https://solana.com/docs/core/clusters). However, as your application grows, we recommend you to always use your own or provision a 3rd party provider’s RPC endpoint such as [Helius](https://helius.dev/) or [Triton](https://triton.one/).
:::

```jsx
import { Connection } from "@solana/web3.js";
const connection = new Connection('https://api.mainnet-beta.solana.com');
```
</details>

<details>
    <summary>
        <div>
            <div>
                <b>Wallet</b>
            </div>
        </div>
    </summary>

**Set up Development Wallet**

:::note
- You can paste in your private key for testing purposes but this is not recommended for production applications.
- If you want to store your private key in the project directly, you can do it via a `.env` file.
:::

To set up a development wallet via `.env` file, you can use the following script.

```jsx
// index.js
import { Keypair } from '@solana/web3.js';
import dotenv from 'dotenv';
require('dotenv').config();

const wallet = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || ''));
```

```bash
# .env
PRIVATE_KEY=""
```

To set up a development wallet via a wallet generated via [Solana CLI](https://solana.com/docs/intro/installation#solana-cli-basics), you can use the following script.

```jsx
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

const privateKeyArray = JSON.parse(fs.readFileSync('/Path/To/.config/solana/id.json', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
```
</details>

<details>
    <summary>
        <div>
            <div>
                <b>Transaction Sending Example</b>
            </div>
        </div>
    </summary>

```jsx
transaction.sign([wallet]);
const transactionBinary = transaction.serialize();
console.log(transactionBinary);
console.log(transactionBinary.length);
const blockhashInfo = await connection.getLatestBlockhashAndContext({ commitment: "finalized" });

const signature = await connection.sendRawTransaction(transactionBinary, {
  maxRetries: 0,
  skipPreflight: true,
  preflightCommitment: "confirmed",
});

console.log(`Transaction sent: https://solscan.io/tx/${signature}`);
  
try {
  const confirmation = await connection.confirmTransaction({
    signature,
    blockhash: blockhashInfo.value.blockhash,
    lastValidBlockHeight: blockhashInfo.value.lastValidBlockHeight,
  }, "confirmed");

  if (confirmation.value.err) {
    console.error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
    console.log(`Examine the failed transaction: https://solscan.io/tx/${signature}`);
  } else {
    console.log(`Transaction successful: https://solscan.io/tx/${signature}`);
  }
} catch (error) {
  console.error(`Error confirming transaction: ${error}`);
  console.log(`Examine the transaction status: https://solscan.io/tx/${signature}`);
};
```

</details>

## Deposit and Withdraw

Using the Deposit or Withdraw endpoint, the user can do so based on the `amount` of assets to be deposited/withdrawn.

:::note Usage steps
1. User chooses the token.
2. User chooses the amount of assets to deposit or withdraw in the specific token mint.
3. Post request to get the transaction.
4. User sign and send the transaction to the network.
4. The mint authority mints/burns the vault tokens to/from the user.
:::

```jsx
const depositTransactionResponse = await (
    await (
        await fetch('https://lite-api.jup.ag/lend/v1/earn/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asset: mint,
                amount: '100000',
                signer: wallet.publicKey,
            })
        })
    )
);
```
```jsx
const withdrawTransactionResponse = await (
    await (
        await fetch('https://lite-api.jup.ag/lend/v1/earn/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asset: mint,
                amount: '100000',
                signer: wallet.publicKey,
            })
        })
    )
);
```

## Mint and Redeem

Using the Mint or Redeem endpoint, the user can do so based on the number `shares` to be minted/redeemed.

:::note Usage steps
1. User chooses the token.
2. User chooses the number of shares to deposit or withdraw in the specific token mint.
3. Post request to get the transaction.
4. User sign and send the transaction to the network.
4. The mint authority mints/burns the vault tokens to/from the user.
:::

```jsx
const mintTransactionResponse = await (
    await (
        await fetch('https://lite-api.jup.ag/lend/v1/earn/mint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asset: mint,
                signer: wallet.publicKey,
                shares: '100000',
            })
        })
    )
);
```
```jsx
const redeemTransactionResponse = await (
    await (
        await fetch('https://lite-api.jup.ag/lend/v1/earn/redeem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asset: mint,
                signer: wallet.publicKey,
                shares: '100000',
            })
        })
    )
);
```

---

## Build Your Own Transaction

The Lend API provides 2 ways to interface with the Earn functions in the Jupiter Lend Program. You can either make a post request to directly get the **Transaction**, or **Instruction** which can be used for CPI or composing with additional instructions.

### Transaction

To use the Transaction method, simply request to the endpoints without `-instructions` suffix directly, as shown in the examples above. The API will respond with an unsigned base64 transaction for the signer to sign, then sent to the network for execution.

### Instruction

In some use cases, you'd prefer to utilize the instructions instead of the serialized transaction, so you can utilize with CPI or compose with other instructions. You can make a post request to `-instructions`endpoints instead.

<details>
    <summary>
        <div>
            <div>
                <b>Building with Instuctions Code Snippet</b>
            </div>
        </div>
    </summary>
Example code snippet of using `/deposit-instructions` endpoint and building a transaction with the instructions.

```jsx
import { Connection, Keypair, PublicKey, TransactionMessage, TransactionInstruction, VersionedTransaction } from '@solana/web3.js';
import fs from 'fs';

const privateKeyArray = JSON.parse(fs.readFileSync('/Path/to/private/key', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
const connection = new Connection('insert-your-own-rpc');

const depositIx = await (
    await fetch (
        'https://lite-api.jup.ag/lend/v1/earn/deposit-instructions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                asset: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
                amount: '1000000',
                signer: wallet.publicKey,
            }, null, 2)
        }
    )
).json();

console.log(JSON.stringify(depositIx, null, 2));

const deserializeInstruction = (instruction) => {
    return new TransactionInstruction({
    programId: new PublicKey(instruction.programId),
    keys: instruction.accounts.map((key) => ({
        pubkey: new PublicKey(key.pubkey),
        isSigner: key.isSigner,
        isWritable: key.isWritable,
    })),
    data: Buffer.from(instruction.data, 'base64'),
    });
};

const blockhash = (await connection.getLatestBlockhash()).blockhash;
const messageV0 = new TransactionMessage({
    payerKey: wallet.publicKey,
    recentBlockhash: blockhash,
    instructions: [
        ...depositIx.instructions.map(deserializeInstruction)
    ],
}).compileToV0Message();

const transaction = new VersionedTransaction(messageV0);
transaction.sign([wallet]);
const transactionBinary = transaction.serialize();
console.log(transactionBinary);
console.log(transactionBinary.length);
const blockhashInfo = await connection.getLatestBlockhashAndContext({ commitment: "finalized" });

const signature = await connection.sendRawTransaction(transactionBinary, {
  maxRetries: 0,
  skipPreflight: true,
  preflightCommitment: "confirmed",
});

console.log(`Transaction sent: https://solscan.io/tx/${signature}`);
  
try {
  const confirmation = await connection.confirmTransaction({
    signature,
    blockhash: blockhashInfo.value.blockhash,
    lastValidBlockHeight: blockhashInfo.value.lastValidBlockHeight,
  }, "confirmed");

  if (confirmation.value.err) {
    console.error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
    console.log(`Examine the failed transaction: https://solscan.io/tx/${signature}`);
  } else {
    console.log(`Transaction successful: https://solscan.io/tx/${signature}`);
  }
} catch (error) {
  console.error(`Error confirming transaction: ${error}`);
  console.log(`Examine the transaction status: https://solscan.io/tx/${signature}`);
};
```
</details>

### CPI

- Refer to https://github.com/jup-ag/jupiter-lend/blob/main/docs/earn/cpi.md for CPI example
- Refer to https://github.com/jup-ag/jupiter-lend/blob/main/target/idl/lending.json for IDL

---

## Tokens

Jupiter Lend provides Earnings for individual tokens, meaning SOL and USDC will be deposited in isolation. To get all token information such as the underlying token, supply, rates and liquidity information.

```jsx
const vaults = await (
    await fetch (
        'https://lite-api.jup.ag/lend/v1/earn/tokens'
    )
).json();
```

## Stats

To get an overview of the statistics of Earn.

```jsx
const userPositions = await (
    await fetch (
        'https://lite-api.jup.ag/lend/v1/earn/stats'
    )
).json();
```

---

## User Data

Below are the endpoints to aid user to better manage their positions with data of each existing positions, earnings, etc.

### Positions

Given a user, you are able to get their existing position data such as shares, underlying assets, balance and allowance.

```jsx
const userPositions = await (
    await fetch (
        'https://lite-api.jup.ag/lend/v1/earn/positions?users={user1},{user2}'
    )
).json();
```

### Rewards

Given a user, you are able to get the rewards of a specific position, for example, the yield earned for USDC token position.

```jsx
const userRwards = await (
    await fetch (
        'https://lite-api.jup.ag/lend/v1/earn/rewards?user={user1}&positions={position1},{position2}'
    )
).json();
```
