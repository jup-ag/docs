---
sidebar_label: 'Claim Fee (Beta)'
description: 'Claim creator trading fees via Jupiter Studio API.'
title: 'Claim Fee (Beta)'
---

<head>
    <title>Claim Fee (Beta)</title>
    <meta name='twitter:card' content='summary' />
</head>

:::note
- Lite URL: `https://lite-api.jup.ag/studio/v1`: 5 requests per 60 seconds
- Pro URL: `https://api.jup.ag/studio/v1`: 5 requests per 10 seconds

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

:::tip API Reference
To fully utilize the Studio API, check out the [Studio API Reference](/docs/api/studio-api).
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
import { Connection } from '@solana/web3.js';
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
PRIVATE_KEY=''
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
const blockhashInfo = await connection.getLatestBlockhashAndContext({ commitment: 'finalized' });

const signature = await connection.sendRawTransaction(transactionBinary, {
  maxRetries: 0,
  skipPreflight: true,
});

console.log(`Transaction sent: https://solscan.io/tx/${signature}`);
  
try {
  const confirmation = await connection.confirmTransaction({
    signature,
    blockhash: blockhashInfo.value.blockhash,
    lastValidBlockHeight: blockhashInfo.value.lastValidBlockHeight,
  }, 'confirmed');

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

## Pool Address

Your successfully created token via Jupiter Studio, should have a newly generated token mint. By using the mint, you can get the config key and pool addresses associated to it: Dynamic Bonding Curve pool and Meteora DAMM V2 pool.

```jsx
const poolAddressResponse = await (
    await fetch(
      `https://lite-api.jup.ag/studio/v1/dbc-pool/addresses/${mint}`,
    )
).json();
```

## Fee

Using the Pool Address, you will be able to get the total and current unclaimed fees in the Dynamic Bonding Curve pool

```jsx
const feeResponse = await (
    await fetch (
      'https://lite-api.jup.ag/studio/v1/dbc/fee', 
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            poolAddress: poolAddressResponse.data.dbcPoolAddress,
        }, null, 2)
    })
).json();
```

## Claim Fee

In order to claim fees from a Dynamic Bonding Curve pool, you will need to pass in the pool address into this endpoint and we will create the Claim Fee transaction for you. After receiving the transaction, you will need to sign and submit the transaction to the network on your own ([refer to Transaction Sending Example above](#prerequisite)).

```jsx
const claimTransaction = await (
    await fetch (
      'https://lite-api.jup.ag/studio/v1/dbc/fee/create-tx', 
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ownerWallet: wallet.publicKey.toBase58(),
            poolAddress: poolAddressResponse.data.dbcPoolAddress,
            maxQuoteAmount: 1000000, // e.g. 1 USDC (depending on quote mint and decimals)
        }, null, 2)
    })
).json();
```
