---
sidebar_label: "Get Order"
description: "Start using Jupiter Ultra API by getting a swap order."
title: "Get Order"
---

<head>
    <title>Get Order</title>
    <meta name="twitter:card" content="summary" />
</head>



:::note
Base URL: `https://lite-api.jup.ag/ultra/v1/order`

For higher rate limits, [refer to the API Key Setup doc](/docs/api-setup).
:::

:::tip API Reference
To fully utilize the Ultra API, check out the [Ultra API Reference](/docs/api/ultra-api/order.api.mdx).
:::

## Get Order

To get a swap order, you need to pass in the required parameters such as:

- `inputMint`: The input token mint address
- `outputMint`: The output token mint address
- `amount`: The amount of input token to swap
- `taker`: The user's wallet address
  - Note: If the `taker` is not provided, there will still be an Order Response with no `transaction` field.

```jsx
const orderResponse = await (
    await fetch(
        'https://lite-api.jup.ag/ultra/v1/order?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&taker=3X2LFoTQecbpqCR7G5tL1kczqBKurjKPHhKSZrJ4wgWc'
    )
  ).json();

console.log(JSON.stringify(orderResponse, null, 2));
```

## Order Response

In the order response, you will receive a number of fields that are important to note of, such as the `swapType`, `slippageBps`, etc.

The main fields you should need:
- `transaction`: The base64 encoded transaction that you need to sign before submitting to the network.
- `requestId`: The request ID of the order to be used in the `Execute Order` endpoint.

Now, you are able to get a swap order, next steps is to make a post request to the `Execute Order` endpoint. [Let's go](/docs/ultra-api/execute-order)!

**Example response of Aggregator Swap:**

```json
{
  "swapType": "aggregator",
  "environment": "production",
  "requestId": "668e8b71-a5ab-424e-83d6-51c9239e8bb5",
  "inAmount": "100000000",
  "outAmount": "12698391",
  "otherAmountThreshold": "12577697",
  "swapMode": "ExactIn",
  "slippageBps": 100,
  "priceImpactPct": "0.0000261921556639999999999997",
  "routePlan": [
    {
      "swapInfo": {
        "ammKey": "HTvjzsfX3yU6BUodCjZ5vZkUrAxMDTrBs3CJaq43ashR",
        "label": "Meteora DLMM",
        "inputMint": "So11111111111111111111111111111111111111112",
        "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "inAmount": "100000000",
        "outAmount": "12704744",
        "feeAmount": "30003",
        "feeMint": "So11111111111111111111111111111111111111112"
      },
      "percent": 100
    }
  ],
  "inputMint": "So11111111111111111111111111111111111111112",
  "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "feeBps": 5,
  "taker": "3X2LFoTQecbpqCR7G5tL1kczqBKurjKPHhKSZrJ4wgWc",
  "gasless": false,
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAHDiVoTeB3jAGy1WcoJlYcZ1tvgdU0Aj6FlsjeUYBxRhGxHxf2IsqBZDc4TJCX0VVjBoDXZbW1kEsA6W7yfwIKt0c0yO+iiUVv7jZVSBDvh2kWWXekzYuRuKoLLfe0bYTKH0yv2bL0ozt8+tDaxIBCyDPmUdeiHiB+F3j79RbUrMBTZhX4Vq3GhdgfMEaJ2gWhCEHo53uZ5+KEQR/PV5YuzQbJfK6aXbCSNOqlVWxR07NAyRtSnrznUlEs5AUgIpB9pOGnzAThMjD7choVuWHDjdTxOb0dsRN3czgZ42ifRt1HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMlyWPTiSJ8bs9ECkUjg2DC1oTmdr/EIQEjnvY2+n4Wawfg/25zlUN6V1VjNx5VGHM9DdKxojsE6mEACIKeNoGAwZGb+UhFzL/7K26csOb57yM5bvF9xJrLEObOkAAAAC0P/on9df2SnTAmx8pWHneSwmrNt/J3VFLMhqns4zl6AR51VvyMcBu7nTFbs5oFQf9sbLeo/SOUQKxzaJWvBOPBt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKnPysPFxScORV16vbzghryUvk+VkoZUUM+RCAjwwCR3xwcKAAUCwFwVAAoACQPQyQAAAAAAAAcCAAQMAgAAAPD+FAYAAAAADAUEABUNBwmT8Xtk9ISudv0IBgACABMHDQEBDB4NAAQCDBMDCwwUERQPEAQCFRMOFAANDRIUBgEFDAkj5RfLl3rjrSoBAAAAJmQAAQDh9QUAAAAAF8PBAAAAAABLAAUNAwQAAAEJAXMwdFGIqEvFUBDTRIWStB1ygQ6vc5NqdjVNwLc0VV1HBM7S09cE1NHWcA==",
  "prioritizationType": "ComputeBudget",
  "prioritizationFeeLamports": 72329,
  "lastValidBlockHeight": 301856775,
  "dynamicSlippageReport": {
    "slippageBps": 75,
    "otherAmount": null,
    "simulatedIncurredSlippageBps": null,
    "amplificationRatio": null,
    "categoryName": "solana",
    "heuristicMaxSlippageBps": 100,
    "rtseSlippageBps": 75,
    "failedTxnEstSlippage": 55,
    "priceMovementEstSlippage": 75,
    "emaEstSlippage": 0
  },
  "totalTime": 549
}
```

**Example response of RFQ Swap:**

```json
{
  "inputMint": "So11111111111111111111111111111111111111112",
  "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "inAmount": "100000000",
  "outAmount": "12619939",
  "otherAmountThreshold": "12626253",
  "swapMode": "ExactIn",
  "slippageBps": 0,
  "priceImpactPct": "0",
  "routePlan": [
    {
      "swapInfo": {
        "ammKey": "96ywtMs5KJNt2iAinr1U8KMzxjcY1FUEpgKHMYNz818g",
        "label": "RFQ",
        "inputMint": "So11111111111111111111111111111111111111112",
        "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "inAmount": "100000000",
        "outAmount": "12619939",
        "feeAmount": "0",
        "feeMint": "11111111111111111111111111111111"
      },
      "percent": 100
    }
  ],
  "feeBps": 5,
  "transaction": null,
  "gasless": true,
  "prioritizationType": "None",
  "prioritizationFeeLamports": 0,
  "requestId": "0abacc75-6a3c-d688-b633-ce2c14cef0fd",
  "swapType": "rfq",
  "quoteId": "25e8fc14-15f9-522d-8e18-5130e273b90f",
  "maker": "96ywtMs5KJNt2iAinr1U8KMzxjcY1FUEpgKHMYNz818g",
  "taker": null,
  "expireAt": null,
  "contextSlot": 0,
  "platformFee": {
    "amount": "6313",
    "feeBps": 5
  },
  "totalTime": 425
}
```
