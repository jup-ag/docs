---
sidebar_label: "About Swap API"
description: "Start using Jupiter Swap API to swap with the Metis Routing Engine."
title: "About Swap API"
---

<head>
    <title>Swap API</title>
    <meta name="twitter:card" content="summary" />
</head>

The Jupiter Swap API enables you to tap into the Jupiter Metis v1 Routing Engine, which aggregates across all liquidity available within the DEXes of Solana's DeFi ecosystem, allowing you to swap seamlessly from any token to any token.

## Features

| Feature | Description |
| --- | --- |
| **Robust routing engine** | The Jupiter Metis v1 Routing Engine is a robust and battle-tested routing engine that has been in production for over 2 years with multiple DEXes integrated and trillions of dollars in volume. |
| **Best on-chain price** | Trades can split across multiple different on-chain tokens and AMMs to ensure the best possible on-chain price. |
| **Swap any token** | Swap from any token to another token. |
| **Zero platform fees** | Swaps made via the Swap API do not incur any trading fees, both for you and your users. |
| **Custom integrator fees** | Integrators can choose to charge their own custom fees. |
| **Slippage protection** | Routes are intentionally chosen to decrease the likelihood of trade failures due to price slippage. |
| **Fine-grained control** | Allows for full control of how your transaction is crafted and broadcasted. |

## What About Ultra API?

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
- **Deciding slippage**: The optimal slippage to use to balance between trade success and price protection, do note that [RTSE is only available via Ultra API](/docs/ultra-api#real-time-slippage-estimator).
- **Broadcasting the transaction**: Ultra uses a proprietary transaction sending engine which dramatically improves landing rate and speed.
- **Parsing the swap results**: Polling and parsing the resulting transaction from the RPC, including handling for success and error cases.

If the above sounds like too much work, then Ultra API will be the better choice.

## Getting Started with Swap API

1. [**Get Quote**](/docs/swap-api/get-quote): Request for a quote which consists of the route plan, and other params such as integrator fee, slippage, etc.
2. [**Build Swap Transaction**](/docs/swap-api/build-swap-transaction): Post the quote to build a swap transaction.
    - You can utilize other methods to return swap instructions or use CPI rather than the default swap transaction.
    - You can utilize other parameters such as priority fee, dynamic slippage, etc to customize the transaction.
3. [**Send Swap Transaction**](/docs/swap-api/send-swap-transaction): Sign and send the swap transaction to the network via your preferred RPC or other methods.

**Other Guides**
- [**Adding Fees to Swap API**](/docs/swap-api/add-fees-to-swap): Add custom integrator fees to the swap transaction.
- [**Using Swap API as a payment method**](/docs/swap-api/payments-through-swap): Use Swap API as a payment method for your users.
- [**Using Swap Terminal**](/docs/tool-kits/terminal): Lite version of Jupiter that provides end-to-end swap with just a few lines of code.
