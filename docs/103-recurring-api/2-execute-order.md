---
sidebar_label: "Execute Order"
description: "Use the Jupiter Recurring API to execute orders."
title: "Execute Order"
---

<head>
    <title>Execute Order</title>
    <meta name="twitter:card" content="summary" />
</head>



:::note
- Lite URL: `https://lite-api.jup.ag/recurring/v1/execute`
- Pro URL: `https://api.jup.ag/recurring/v1/execute`

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

After getting the order transaction, you can sign and send to the network yourself or use the Recurring API's `/execute` endpoint to do it for you.

## Sign Transaction

Using the Solana `web3.js` v1 library, you can sign the transaction as follows:

```js
// ... GET /createOrder's response

// Extract the transaction from the order response
const transactionBase64 = createOrderResponse.transaction

// Deserialize the transaction
const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64'));

// Sign the transaction
transaction.sign([wallet]);

// Serialize the transaction to base64 format
const signedTransaction = Buffer.from(transaction.serialize()).toString('base64');
```

## Execute Order

By making a post request to the `/execute` endpoint, Jupiter executes the order transaction on behalf of you/your users. This includes handling of transaction handling, priority fees, RPC connection, etc.

:::info
Do note that you need both the signed transaction and the order id to execute the order.

The order id is returned in the [`createOrder` response](/docs/recurring-api/create-order).
:::

```jsx
const executeResponse = await (
    await fetch('https://lite-api.jup.ag/recurring/v1/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            signedTransaction: signedTransaction,
            requestId: createOrderResponse.requestId,
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
  "status": "Success",
  "order": "4DWzP4TdTsuwvYMaMWrRqzya4UTFKFoVjfUWNWh8zhzd",
  "error": null
}
```

**Example response of failed order:**

```json
{
  "signature": "...",
  "status": "Failed",
  "order": null,
  "error": "Insufficient funds for the operation requested.",
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
