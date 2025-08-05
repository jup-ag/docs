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
Lite URL: `https://lite-api.jup.ag/ultra/v1/order`
Dynamic URL: `https://api.jup.ag/ultra/v1/order`

Dynamic Rate Limits are now applied to Ultra API.

- No Pro plans or payment needed.
- Simply generate the free/standard API Key via [Portal](https://portal.jup.ag)
- Rate limits scale together with your swap volume.

[Read more about Ultra API Dynamic Rate Limit](/docs/api-rate-limit).
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
- `referralAccount`: The referral account address - refer to the [Add Fees To Ultra](/docs/ultra-api/add-fees-to-ultra) guide for the step by step process.
- `referralFee`: The referral fee in basis points (bps)

```jsx
const orderResponse = await (
    await fetch(
        'https://lite-api.jup.ag/ultra/v1/order?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&taker=jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3'
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
  "mode": "ultra",
  "swapType": "aggregator",
  "router": "metis",
  "requestId": "5421e18f-9d12-4709-8f5a-6c79c1032203",
  "inAmount": "1000000",
  "outAmount": "6652914",
  "otherAmountThreshold": "6644643",
  "swapMode": "ExactIn",
  "slippageBps": 15,
  "priceImpactPct": "0",
  "routePlan": [
    {
      "swapInfo": {
        "ammKey": "4bg8UDLXEm4T6pCyoW7iUizAz9HMoxhTAtMquSXigFZu",
        "label": "Meteora DLMM",
        "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "outputMint": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        "inAmount": "90000",
        "outAmount": "89991",
        "feeAmount": "9",
        "feeMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      },
      "percent": 9,
      "bps": 900
    },
    {
      "swapInfo": {
        "ammKey": "5M7McNWX7yBBGrZGB6XhmHYhFwWwwB2ckrA1HEpkf3SA",
        "label": "Perena",
        "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "outputMint": "2u1tszSeqZ3qBWF3uNGPFc8TzMk2tdiwknnRMWGWjGWH",
        "inAmount": "50000",
        "outAmount": "50007",
        "feeAmount": "5",
        "feeMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      },
      "percent": 5,
      "bps": 500
    },
    {
      "swapInfo": {
        "ammKey": "6dB49iS94RnwUhQwJwjnE7mEqPedZDtU7XBZXaLBbfbt",
        "label": "Stabble Stable Swap",
        "inputMint": "2u1tszSeqZ3qBWF3uNGPFc8TzMk2tdiwknnRMWGWjGWH",
        "outputMint": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        "inAmount": "50007",
        "outAmount": "49995",
        "feeAmount": "0",
        "feeMint": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
      },
      "percent": 100,
      "bps": 10000
    },
    {
      "swapInfo": {
        "ammKey": "BWBHrYqfcjAh5dSiRwzPnY4656cApXVXmkeDmAfwBKQG",
        "label": "Obric V2",
        "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "outputMint": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        "inAmount": "860000",
        "outAmount": "859910",
        "feeAmount": "6",
        "feeMint": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
      },
      "percent": 86,
      "bps": 8600
    },
    {
      "swapInfo": {
        "ammKey": "D94tFiBfJzdZmcH6GtV39iXexWyVpNfwEH3CxEbqvsvr",
        "label": "Obric V2",
        "inputMint": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        "outputMint": "So11111111111111111111111111111111111111112",
        "inAmount": "999896",
        "outAmount": "6654624",
        "feeAmount": "343",
        "feeMint": "So11111111111111111111111111111111111111112"
      },
      "percent": 100,
      "bps": 10000
    }
  ],
  "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "outputMint": "So11111111111111111111111111111111111111112",
  "feeMint": "So11111111111111111111111111111111111111112",
  "feeBps": 2,
  "taker": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
  "gasless": false,
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAFCkS+3LuGTbsYdcCPVuxlVEcq9wNOnR9+PBw6SEM3ACeKd1R4MYi595YUO8ViNwpWb17+Q9DxkVcz5fWpSqjtDyi/by2TOVyTUuu9HYAIH+8AvsAiyyBVh4I4Fsd9iyTJyeC0vJINbsjyglaB0IKJCaka7Xs7bD5H1KusZLVDh/7A+PTko52VL0CIM2xtl0WkvNslD6Wawxr7yd9HYllN4LxSYdFKrMW8DuxjXahwWh9wo57jWprPC/jyLMbOSQGdegMGRm/lIRcy/+ytunLDm+e8jOW7xfcSayxDmzpAAAAA50rZbONln9MTUQAoS/d4BFuFEKjzTkmMki7ub8MF+GkEedVb8jHAbu50xW7OaBUH/bGy3qP0jlECsc2iVrwTjwbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpPSwt5ThewuTEP350DNuqyKwGVEa4lpMRw26ckG/cO10EBgAFApE/CQAGAAkDSbc4AAAAAAAIVwkkAAEOEAIPJg0IIwguGi4bHg4EDzEcLiQJCS0uHRkIMyAPHw4DISIyJAknKyQfMQMEFBMREikqKCwJJy8LBwUMCg4EFhYWJAkvFQcFGBcQBBYWMCQJJTjBIJszQdacgQAFAAAAJgkABEcAAQUAAk9kAgQ6AVYABDoAZAQFQEIPAAAAAABthWUAAAAAAA8AAgkDAgAAAQkGFvHsWcITjSSy666/XikzqLiO11a0SwY8rT5d3C+q84sDvr+7ACm/lQcqT78E33F1k+c4vMwhJygVwkcagNn59VWw1IQlBBopKBgFAAMBFxV9wMcXAhzLZucTPtF6MmZ80NPWq9GD13dumGAXjalsagR49HT7BfFveXXzwVdRxcH4wwx5hrqgGgkua/Gonv4pzAZz/LU35B3ySlkEeHl2dwQsLXV6xTf8OXe5zg55RN15dUirCc2NlTbGZ63YLmpuzcw8rqYGaGqFaW1mAWfiYdGuN3McD0TMhBYpTLog607/NBju6DG/v6eBEjRZCQSVk5fMApSW",
  "prioritizationFeeLamports": 2252824,
  "inUsdValue": 0.999901896351375,
  "outUsdValue": 1.0004190022848067,
  "priceImpact": 0.05171566683877625,
  "swapUsdValue": 0.999901896351375,
  "totalTime": 735
}
```

**Example response of RFQ Swap:**

```json
{
  "mode": "ultra",
  "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "outputMint": "So11111111111111111111111111111111111111112",
  "inAmount": "1000000",
  "outAmount": "6643102",
  "otherAmountThreshold": "6643102",
  "swapMode": "ExactIn",
  "slippageBps": 0,
  "priceImpactPct": "0",
  "routePlan": [
    {
      "swapInfo": {
        "ammKey": "CifhTfrKeMfSpTRLjJnXLXEALS37dKH3ziC8gjTLe5dD",
        "label": "JupiterZ",
        "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "outputMint": "So11111111111111111111111111111111111111112",
        "inAmount": "1000000",
        "outAmount": "6643102",
        "feeAmount": "0",
        "feeMint": "11111111111111111111111111111111"
      },
      "percent": 100
    }
  ],
  "feeBps": 2,
  "transaction": "AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAIABgyuHR/2vkxfzU7FGy7oIwST/eu3qKGcgDNLQXNZqjhf/ES+3LuGTbsYdcCPVuxlVEcq9wNOnR9+PBw6SEM3ACeKLG4Kt0ZV/x7L9RaG1rdUmMMOr+NV9iN2t63tTwAhJqt3VHgxiLn3lhQ7xWI3ClZvXv5D0PGRVzPl9alKqO0PKK8uUfxZ6umAKD8aFHv43B/XRa4GxCNft1fWnLOBGKhCvT1zZhVaaLZKp6kLnLekwgoP5noPGw80QSK/+q5KDAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMGRm/lIRcy/+ytunLDm+e8jOW7xfcSayxDmzpAAAAABpuIV/6rgYT7aH9jRhjANdrEOdwa6ztVmKDwAAAAAAEG3fbh12Whk9nL4UbO63msHLSF7V9bN5E6jPWFfv8AqUpYSftyo7vpH9xbDmpX9jxaHLRbIGem7Qys02OVyKECxvp6877brTo9ZfNqq8l0MbG75MLS9uDkfKYCA0UvXWFUzz6zfmKnWYJxn4RVu8Gf4g/6x2CmlkWSbSUO82C+2wMHAAkDiQQAAAAAAAAHAAUCMa0AAAoMAQADAgoECwkICQYFI6hgt6NcCiigQEIPAAAAAACeXWUAAAAAAELqbGgAAAAAAgAAAA==",
  "gasless": true,
  "prioritizationFeeLamports": 0,
  "requestId": "9e39b39a-4e6d-2c03-3a4e-df0564d98531",
  "swapType": "rfq",
  "router": "jupiterz",
  "quoteId": "b8f818b8-4651-5d3b-ba57-1f921c6b0f62",
  "maker": "CifhTfrKeMfSpTRLjJnXLXEALS37dKH3ziC8gjTLe5dD",
  "taker": "jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3",
  "expireAt": "1751968322",
  "platformFee": {
    "amount": "1328",
    "feeBps": 2
  },
  "inUsdValue": 0.999901896351375,
  "outUsdValue": 0.9993827964401991,
  "priceImpact": -0.05191508417676995,
  "swapUsdValue": 0.999901896351375,
  "totalTime": 721
}
```
