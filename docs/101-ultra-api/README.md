---
sidebar_label: "About Ultra API"
description: "Start using Jupiter Ultra API to swap with the best experience."
title: "About Ultra API"
---

<head>
    <title>Ultra API</title>
    <meta name="twitter:card" content="summary" />
</head>

The Jupiter Ultra API is the *only* API you ever need to experience or build the best trading experience on Solana.

## Features

| Feature | Description |
| --- | --- |
| **Best liquidity engine** | Aggregates across multiple liquidity sources, both Jupiter's proprietary routing engines and third-party liquidity sources, for the best possible price.<br/><br />Including Jupiter's Metis Routing Engine, Jupiter Z (RFQ), and others. |
| **Blazing fast** | 95% of all swaps are executed under 2 seconds via our proprietary transaction sending engine. |
| **MEV-protected** | The lowest incidence of MEV attacks across all existing applications, by far. |
| **Real-Time Slippage Estimator** | Intelligently derives the best possible slippage to use at the time of execution, balancing between trade success and price protection. |
| **One-stop shop** | Retrieve the user's balances, get a quote, execute the trade, and get the results of the trade, all within Ultra API without touching a single RPC or any other external API. |
| **World class support** | We handle the complexities of RPC connections, transaction landing, slippage protection and more. |

## What About Swap API?

Ultra API is the spiritual successor to Swap API, and is much simpler to use than Swap API. If you are first starting out on your Solana development journey, using Ultra API is highly recommended over Swap API.

However, unlike Ultra API, Swap API allows developers to:

- Add custom instructions.
- Add Cross Program Invocation (CPI) calls.
- Choose the broadcasting strategy for the signed transaction (ie. via priority fee, Jito, etc.).
- Choose which DEXes or AMMs to route through.
- Modify the number of accounts to use in a transaction.

If you have a highly custom need like what is described above, then Swap API may be for you. However, with Swap API, there are many more things you need to worry about that Ultra API automatically handles for:

- **Upkeep of RPCs**: To retrieve wallet balances, broadcast and retrieve transactions, etc.
- **Deciding transaction fee**: Including, but not limited to, priority fee, Jito fee, etc.
- **Deciding slippage**: The optimal slippage to use to balance between trade success and price protection.
- **Broadcasting the transaction**: Ultra uses a proprietary transaction sending engine which dramatically improves landing rate and speed.
- **Parsing the swap results**: Polling and parsing the resulting transaction from the RPC, including handling for success and error cases.

If the above sounds like too much work, then Ultra API will be the better choice.

## Getting Started with Ultra API

1. [**Get Order**](/docs/ultra-api/get-order): Request for a swap transaction then sign it.
2. [**Execute Order**](/docs/ultra-api/execute-order): Execute the swap transaction and get the execution status.

- [**Get Balances**](/docs/ultra-api/get-balances): Additionally, you can request for token balances of an account from `/ultra/v1/balances`.

**Other Guides**
- [**Add Fees To Ultra**](/docs/ultra-api/add-fees-to-ultra): Add custom integrator fees to your Ultra transaction, on top of Jupiter's fees.

## FAQ

**Are there any fees for using Ultra API?**

When users swap using Ultra, Ultra takes 0.1% (or 0.05% depending on the tokens) of the swap amount as a fee.

If you are an integrator, you can add custom integrator fees via Ultra API. Jupiter will take 20% of the integrator fees. Please refer to the [Add Fees To Ultra](/docs/ultra-api/add-fees-to-ultra) guide for more information.

**What is the rate limit for Ultra API?**

Currently, Ultra API has a rate limit of 60 requests per minute.

:::info Increasing Rate Limits
Currently, there is no way to increase the rate limit for Ultra API.

Portal API Keys are not supported for Ultra API.
:::

**Can integrators take fees using Ultra API?**

Yes, you can add fees to Ultra API, on top of Jupiter's fees. Please refer to the [Add Fees To Ultra](/docs/ultra-api/add-fees-to-ultra) guide for more information.
