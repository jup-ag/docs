---
sidebar_label: "Get Quote"
description: "Start using Jupiter Swap API by getting a Quote."
title: "Get Quote"
---

<head>
    <title>Get Quote</title>
    <meta name="twitter:card" content="summary" />
</head>

:::warning Please use the Swap API at your own discretion.

The Jupiter UI at https://jup.ag/ contains multiple safeguards, warnings and default settings to guide our users to trade safer. Jupiter is not liable for losses incurred by users on other platforms.

If you need clarification or support, please reach out to us in [Discord](https://discord.gg/jup).
:::

The Quote API enables you to tap into the Jupiter routing engine, which accesses the deep liquidity available within the DEXes of Solana's DeFi ecosystem. In this guide, we will walkthrough how you can get a quote for a specific token pair and other related parameters.

## Let’s Get Started

In this guide, we will be using the Solana web3.js package.

If you have not set up your environment to use the necessary libraries and the connection to the Solana network, please head over to [Environment Setup](/docs/environment-setup).

:::tip API Reference
To fully utilize the Quote API, check out the [Quote API Reference](/docs/api/swap-api/quote.api.mdx).
:::

## Quote API

The root URL of the Quote API is as such.

```
For paid tiers with API Keys, use `https://api.jup.ag/swap/v1/quote`

For free tier, use `https://lite-api.jup.ag/swap/v1/quote`
```

The most common trading pair on Solana is SOL and USDC, to get a quote for this specific token pair, you need to pass in the required parameters such as:

| Parameters | Description |
| --- | --- |
| inputMint | The pubkey or token mint address e.g. So11111111111111111111111111111111111111112 |
| outputMint | The pubkey or token mint address e.g. EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v |
| amount | The number of **input** tokens before the decimal is applied, also known as the “raw amount” or “integer amount” in lamports for SOL or atomic units for all other tokens. |
| slippageBps | The number of basis points you can tolerate to lose during time of execution. e.g. 1% = 100bps |

## Get Quote

Using the root URL and parameters to pass in, it is as simple as the example code below!

```jsx
const quoteResponse = await (
    await fetch(
        'https://lite-api.jup.ag/swap/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=100000000&slippageBps=50&restrictIntermediateTokens=true'
    )
  ).json();
  
console.log(JSON.stringify(quoteResponse, null, 2));
```

Example response:

```json
{
  "inputMint": "So11111111111111111111111111111111111111112",
  "inAmount": "100000000",
  "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "outAmount": "16198753",
  "otherAmountThreshold": "16117760",
  "swapMode": "ExactIn",
  "slippageBps": 50,
  "platformFee": null,
  "priceImpactPct": "0",
  "routePlan": [
    {
      "swapInfo": {
        "ammKey": "5BKxfWMbmYBAEWvyPZS9esPducUba9GqyMjtLCfbaqyF",
        "label": "Meteora DLMM",
        "inputMint": "So11111111111111111111111111111111111111112",
        "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "inAmount": "100000000",
        "outAmount": "16198753",
        "feeAmount": "24825",
        "feeMint": "So11111111111111111111111111111111111111112"
      },
      "percent": 100
    }
  ],
  "contextSlot": 299283763,
  "timeTaken": 0.015257836
}
```

:::tip
`outAmount` refers to the best possible output amount based on the route at time of quote, this means that `slippageBps` does not affect.
:::

## What’s Next

Now, you are able to get a quote, next steps is to submit a transaction to execute the swap based on the quote given. Let’s go!

---

## Additional Resources

### Restrict Intermediate Tokens

`restrictIntermediateTokens` can be set to `true` . If your route is routed through random intermediate tokens, it will fail more frequently. With this, we make sure that your route is only routed through highly liquid intermediate tokens to give you the best price and more stable route.

### Legacy Transactions

All Jupiter swaps are using Versioned Transactions and Address Lookup Tables. However, not all wallets support Versioned Transactions yet, so if you detect a wallet that does not support versioned transactions, you will need to set the `asLegacyTransaction` parameter to `true`.

### Adding Fees

By using the Quote API in your app, you can add a fee to charge your users. You can refer to the `platformFeeBps` parameter and to add it to your quote and in conjuction, add `feeAccount` (it can be any valid token account) to your swap request.

### Direct Routes and Max Accounts

These 2 parameters can be useful for those who are building your own programs or apps. `onlyDirectRoutes` essentially restricts the routing to only go through 1 market; whereas `maxAccounts` can provide you with flexibility to utilize other accounts in your transaction.

:::warning unfavorable trades
Please be aware that using these 2 parameters can often yield unfavorable trades or outcomes.
:::
