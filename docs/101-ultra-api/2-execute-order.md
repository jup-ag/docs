---
sidebar_label: "Execute Order"
description: "Start using Jupiter Ultra API by executing a swap order and getting the execution status."
title: "Execute Order"
---

<head>
    <title>Execute Order</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
Base URL: `https://lite-api.jup.ag/ultra/v1/order`

We are exploring a Dynamic Rate Limit system for Ultra, hence Portal API keys currently do not apply for Ultra API.

If you require higher rate limits, please reach out to us in [Discord](https://discord.gg/jup).
:::

:::tip API Reference
To fully utilize the Ultra API, check out the [Ultra API Reference](/docs/api/ultra-api/execute.api.mdx).
:::

## Sign Transaction

Using the Solana `web3.js` **v1** library, you can sign the transaction as follows:

<details>
  <summary>
    Set up imports and wallet for signing
  </summary>

```bash
npm install @solana/web3.js@1 # Using v1 of web3.js instead of v2
npm install bs58
npm install dotenv # if required for wallet setup
```

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

```jsx
// ... GET /order's response

// Extract the transaction from the order response
const transactionBase64 = orderResponse.transaction

// Deserialize the transaction
const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64'));

// Sign the transaction
transaction.sign([wallet]);

// Serialize the transaction to base64 format
const signedTransaction = Buffer.from(transaction.serialize()).toString('base64');
```

## Execute Order

By making a post request to the `/execute` endpoint, Jupiter executes the swap transaction on behalf of you/your users. This includes handling of slippage, priority fees, transaction landing and more.

To make a post request to execute a swap order, you need to pass in the required parameters:

- `signedTransaction`: The signed transaction
- `requestId`: The order response's request ID

:::info `/execute` parameters
Both required parameters are found in the [order response](/docs/ultra-api/get-order#order-response), do note that the `transaction` field is the base64 encoded transaction that [you need to sign](#sign-transaction) before submitting to the network.
:::

```jsx
const executeResponse = await (
    await fetch('https://lite-api.jup.ag/ultra/v1/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            signedTransaction: signedTransaction,
            requestId: orderResponse.requestId,
        }),
    })
).json();
```

## Execute Response

After making the post request to the `/execute` endpoint, you will receive a response with the status of the swap.

```jsx
if (executeResponse.status === "Success") {
    console.log('Swap successful:', JSON.stringify(executeResponse, null, 2));
    console.log(`https://solscan.io/tx/${executeResponse.signature}`);
} else {
    console.error('Swap failed:', JSON.stringify(executeResponse, null, 2));
    console.log(`https://solscan.io/tx/${executeResponse.signature}`);
}
```

**Example response of successful swap:**

```json
{
  "status": "Success",
  "signature": "transaction signature",
  "slot": "323598314",
  "code": 0,
  "inputAmountResult": "9995000",
  "outputAmountResult": "1274698",
  "swapEvents": [
    {
      "inputMint": "So11111111111111111111111111111111111111112",
      "inputAmount": "9995000",
      "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "outputAmount": "1274698"
    }
  ]
}
```

**Example response of failed swap:**

```json
{
  "status": "Failed",
  "signature": "transaction signature",
  "error": "custom program error: #6023",
  "code": 4615026,
  "slot": "323597963"
}
```

## Response Codes

The following is a list of error codes that can be returned by the `/execute` endpoint.

### Ultra Endpoint Codes

| Code | Description | Debugging |
|------|-------------|-----------|
| 0 | Success | - |
| -1 | Missing cached order | `requestId` not found in cache, likely expired or not found |
| -2 | Invalid signed transaction | `signedTransaction` is invalid, likely failed to sign the transaction correctly |
| -3 | Invalid message bytes | `signedTransaction` is invalid, likely due to incorrect usage of `transaction` field in the order response |

### Aggregator Swap Type Codes

| Code | Description | Debugging |
|------|-------------|-----------|
| -1000 | Failed to land | Transaction failed to land on the network |
| -1001 | Unknown error | - |
| -1002 | Invalid transaction | - |
| -1003 | Transaction not fully signed | - |
| -1004 | Invalid block height | - |

### RFQ Swap Type Codes

| Code | Description | Debugging |
|------|-------------|-----------|
| -2000 | Failed to land | - |
| -2001 | Unknown error | - |
| -2002 | Invalid payload | - |
| -2003 | Quote expired | User did not respond in time or RFQ provider did not execute in time |
| -2004 | Swap rejected | User or RFQ provider rejected the swap |
