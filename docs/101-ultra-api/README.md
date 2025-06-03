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

### Juno Liquidity Engine

Ultra utilizes the latest Juno Liquidity Engine which aggregates across multiple liquidity sources, including Jupiter's proprietary routing engines both Metis and Jupiter Z (RFQ), and third-party liquidity sources, for the best possible price. It also includes self-learning capabilities (to detect and sideline low-quality liquidity sources) which creates a competitive environment for all liquidity sources to continously optimize their performance and price.

### Transaction Sending

Over the years of experiment and development, we have optimized and continues to better our transaction sending service. Using various strategies involving multiple RPCs, priority fees/Jito tips estimation, and more, we are able to send transactions at a blazing fast speed with a high success rate (while still being [MEV-protected](#mev-protection)).

:::info
95% of all swaps are executed under 2 seconds via our proprietary transaction sending engine.

#### Transaction Landing Latency

- The `/execute` has an average latency of
    - Metis: Average P50 1 second.
    - RFQ: Average P50 2 seconds.

#### Transaction Success Rates

- The `/execute` has a success rate of 95%.
:::

### MEV Protection

According to both our internal monitoring system and external resources such as [Sandwiched.me](https://sandwiched.me/sandwiches), Ultra has the lowest incidence of MEV attacks across all existing applications, by far. Comparing using the ratio of volume to the amount of value extracted, Ultra has the highest volume yet the lowest value extracted.

### Real Time Slippage Estimator

Building on top of our previous versions of slippage estimation/optimization engines, we have developed a new Real Time Slippage Estimator (RTSE) - only available via Ultra API - that is able to intelligently estimate the best possible slippage to use at the time of execution, balancing between trade success and price protection. RTSE uses a variety of heuristics, algorithms and monitoring to ensure the best user experience: 
- Heuristics: Token categories, historical and real-time slippage data, and more.
- Algorithms: Exponential Moving Average (EMA) on slippage data, and more.
- Monitoring: Real-time monitoring of failure rates to ensure reactiveness to increase slippage when necessary.

### Gasless Support

Enables gasless transactions for users with certain tokens and trade sizes, you can identify this via the secondary signer in the transaction.

### Developer Experience

Ultra API is a holistic solution for developers to build all types of applications, without having to worry about the complexities of the underlying infrastructure - such as RPC connections, transaction landing, slippage protection and more.

:::info Ultra API Endpoints
Ultra API is a RPC-less API, you do not need to provide a RPC endpoint to use Ultra API.

| Endpoint | Description |
| --- | --- |
| `/order` | Get a quote for a swap via Juno Liquidity Engine. |
| `/execute` | Execute the trade with our proprietary transaction sending engine, with high success rates, low latency, and MEV-protected. |
| `/balances` | Retrieve the user's balances. |
| `/shield` | Enhanced security feature via Shield API to provide critical token information, to help provide an informed trading decision. |
:::

### World Class Support

Ultra is the best trading experience in crypto, it handles all the complexities such as slippage protection and transaction landing, and if you ever face any issues or need help when using Ultra, our support team is here to assist you 24/7. Read more about [Ultra customer support](/docs/misc/integrator-guidelines#customer-support).

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
- [**Get Shield**](/docs/ultra-api/get-shield): Enhanced security feature via Shield API to provide critical token information, to help provide an informed trading decision.

**Other Guides**
- [**Add Fees To Ultra**](/docs/ultra-api/add-fees-to-ultra): Add custom integrator fees to your Ultra transaction, on top of Jupiter's fees.

## FAQ

**Can I add custom integrator fees to Ultra API?**

- **Integrator without custom fees**: Do note that when your users swap using Ultra, we take 0.1% (or 0.05% depending on the tokens) of the swap amount as a fee.
- **Integrator with custom fees**: If you are an integrator, you can add custom integrator fees via Ultra API and Jupiter will take 20% of the integrator fees. Please refer to the [Add Fees To Ultra](/docs/ultra-api/add-fees-to-ultra) guide for more information.

**What is the rate limit for Ultra API?**

Currently, Ultra API has a rate limit of 60 requests per minute.

:::info Increasing Rate Limits
Currently, there is no way to increase the rate limit for Ultra API.

Portal API Keys are not supported for Ultra API.
:::
