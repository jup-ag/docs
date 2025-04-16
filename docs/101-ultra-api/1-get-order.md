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
- `referralAccount`: The referral account address - created via the [Referral Program](https://github.com/TeamRaccoons/referral)
- `referralFee`: The referral fee in basis points (bps)

```jsx
const orderResponse = await (
    await fetch(
        'https://lite-api.jup.ag/ultra/v1/order?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&taker=jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3'
    )
  ).json();

console.log(JSON.stringify(orderResponse, null, 2));
```

:::tip Add Fees To Ultra
Refer to the [Add Fees To Ultra](/docs/ultra-api/add-fees-to-ultra) guide for more information on how to add fees to your Ultra transaction.

There are a few pointers to note in the guide.
:::

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
  "requestId": "f087e8d8-fca6-4af6-a4ff-2d962fa95489",
  "inAmount": "100000000",
  "outAmount": "12550645",
  "otherAmountThreshold": "12425139",
  "swapMode": "ExactIn",
  "slippageBps": 100,
  "priceImpactPct": "0",
  "routePlan": [
    {
      "swapInfo": {
        "ammKey": "AHhiY6GAKfBkvseQDQbBC7qp3fTRNpyZccuEdYSdPFEf",
        "label": "SolFi",
        "inputMint": "So11111111111111111111111111111111111111112",
        "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "inAmount": "100000000",
        "outAmount": "12550645",
        "feeAmount": "0",
        "feeMint": "So11111111111111111111111111111111111111112"
      },
      "percent": 100
    }
  ],
  "inputMint": "So11111111111111111111111111111111111111112",
  "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "feeBps": 0,
  "taker": "jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3",
  "gasless": false,
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAICwrsAhWzTDt8lE+KOND7l5F1l+AGosYESC5zchQ4ZfpWT2oNgWTjN0T1WlxqLRVMemOUFGyMhmsSKBlEsNmgHvWaNCoAnvG0/Sp0KxhDwMgeIge1NzW+fIbfreNBVIJfRwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjJclj04kifG7PRApFI4NgwtaE5na/xCEBI572Nvp+FmsH4P9uc5VDeldVYzceVRhzPQ3SsaI7BOphAAiCnjaBgMGRm/lIRcy/+ytunLDm+e8jOW7xfcSayxDmzpAAAAAtD/6J/XX9kp0wJsfKVh53ksJqzbfyd1RSzIap7OM5ejG+nrzvtutOj1l82qryXQxsbvkwtL24OR8pgIDRS9dYQR51VvyMcBu7nTFbs5oFQf9sbLeo/SOUQKxzaJWvBOPBt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKmKsHMLXQw2qLEyz0OzhbbleC1ZXTY4NGK6N8QWPXRWPwcGAAUCwFwVAAYACQMt3AYAAAAAAAMCAAIMAgAAAPD+FAYAAAAACQUCAA4KAwmT8Xtk9ISudvwEBgABAAgDCgEBCRMKAAIBCQgJBwkPAAwNCwIBChAFJOUXy5d6460qAQAAAD0AZAABAOH1BQAAAAD1gb8AAAAAADMAAAoDAgAAAQkByzeZPtf3ya4VjS880xYauu0yJzlCh6lntUFWKcU6tHoDDQsOAwcPEA==",
  "prioritizationType": "ComputeBudget",
  "prioritizationFeeLamports": 629413,
  "dynamicSlippageReport": {
    "slippageBps": 51,
    "otherAmount": null,
    "simulatedIncurredSlippageBps": null,
    "amplificationRatio": null,
    "categoryName": "solana",
    "heuristicMaxSlippageBps": 100,
    "rtseSlippageBps": 51,
    "failedTxnEstSlippage": 0,
    "emaEstSlippage": 51,
    "useIncurredSlippageForQuoting": null
  },
  "totalTime": 701
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
