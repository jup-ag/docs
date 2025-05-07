---
sidebar_label: "Execute Order"
description: "Use the Jupiter Trigger API to execute orders."
title: "Execute Order"
---

<head>
    <title>Execute Order</title>
    <meta name="twitter:card" content="summary" />
</head>



:::note
Base URL: `https://lite-api.jup.ag/trigger/v1/execute`

For higher rate limits, [refer to the API Key Setup doc](/docs/api-setup).
:::

After getting the order transaction, you can sign and send to the network yourself or use the Trigger API's `/execute` endpoint to do it for you.

## Sign Transaction

Using the Solana `web3.js` v1 library, you can sign the transaction as follows:

```js
// ... GET /order's response

// Extract the transaction from the order response
const transactionBase64 = orderResponse.tx

// Deserialize the transaction
const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64'));

// Sign the transaction
transaction.sign([wallet]);

// Serialize the transaction to base64 format
const signedTransaction = Buffer.from(transaction.serialize()).toString('base64');
```

## Execute Order

By making a post request to the `/execute` endpoint, Jupiter executes the order transaction on behalf of you/your users. This includes handling of transaction handling, priority fees, RPC connection, etc.

```jsx
const executeResponse = await (
    await fetch('https://lite-api.jup.ag/trigger/v1/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            signedTransaction: signedTransaction,
            requestId: "370100dd-1a85-421b-9278-27f0961ae5f4",
        }),
    })
).json();
```

## Execute Order Response

After making the post request to the `/execute` endpoint, you will receive a response with the status of the order.

**Example response of successful order:**

```json
{
  "signature": "...",
  "status": "Success"
}
```

**Example response of failed order:**

```json
{
  "error": "custom program error code: 1",
  "code": 500,
  "signature": "...",
  "status": "Failed"
}
```

## Send Transaction Yourself

If you want to handle the transaction, you can sign and send the transaction to the network yourself.

```jsx
const transactionBase64 = createOrderResponse.transaction
const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64'));

transaction.sign([wallet]);

const transactionBinary = transaction.serialize();

const blockhashInfo = await connection.getLatestBlockhashAndContext({ commitment: "finalized" });

const signature = await connection.sendRawTransaction(transactionBinary, {
    maxRetries: 1,
    skipPreflight: true
});

const confirmation = await connection.confirmTransaction({
signature,
blockhash: blockhashInfo.value.blockhash,
lastValidBlockHeight: blockhashInfo.value.lastValidBlockHeight,
}, "finalized");

if (confirmation.value.err) {
    throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}\n\nhttps://solscan.io/tx/${signature}`);
} else console.log(`Transaction successful: https://solscan.io/tx/${signature}`);
```
