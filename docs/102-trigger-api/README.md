---
sidebar_label: "About Trigger API"
description: "Start using Jupiter Trigger API to create limit orders."
title: "About Trigger API"
---

<head>
    <title>Trigger API</title>
    <meta name="twitter:card" content="summary" />
</head>

The Jupiter Trigger API enables you to create limit orders on Solana, allowing users to set target prices for token swaps that execute automatically when market conditions are met.

The Trigger API is ideal for:
- DeFi applications that want to offer users more advanced trading options
- Wallets looking to expand their trading features
- Automated systems that need to execute at specific price points

## Features

| Feature | Description |
| --- | --- |
| **Custom integrator fees** | Integrators can choose to charge their own custom fees (on top of Jupiter's fees). |
| **Any token pair** | Create trigger orders between any token pairs supported on Jupiter's Metis Routing Engine. |
| **Best execution** | Orders are executed through Jupiter's Metis Routing Engine to get the best possible price across all DEXes. |
| **Price monitoring** | Our infrastructure continuously monitors prices to execute trigger orders as soon as conditions are met. |
| **Order expiry** | Trigger orders can be set to expire after a certain period of time. |
| **Slippage addition** | Add slippage to the target price, ideal for users who want to prioritize success rate over price. |

## Getting Started with Trigger API

1. [**Create Order**](/docs/trigger-api/create-order): Create a new trigger order with your desired parameters.
2. [**Execute Order**](/docs/trigger-api/execute-order): Execute a trigger order.
3. [**Cancel Order**](/docs/trigger-api/cancel-order): Cancel an existing trigger order.
4. [**Get Trigger Orders**](/docs/trigger-api/get-trigger-orders): Retrieve active/historical trigger orders for a specific wallet address
5. [**Best Practices**](/docs/trigger-api/best-practices): Best practices for using Trigger API.

## FAQ

**What is the fee for using Trigger API?**

Trigger API takes 0.03% for stable pairs and 0.1% for every other pairs.

**Can integrators take fees using Trigger API?**

Yes, integrators can take fees on top of Jupiter's fees.

**How do jup.ag UI modes translate to the Trigger API?**

When using trigger orders on the jup.ag frontend, you'll see two execution modes:

| jup.ag UI Mode | API Implementation | Description |
| --- | --- | --- |
| **Exact** | `slippageBps: 0` (default) | Orders execute with 0 slippage for precise price execution |
| **Ultra** | `slippageBps: <custom_value>` | Orders execute with custom slippage for higher success rates |

:::info API Implementation Notes
- **Exact mode**: By default, trigger orders execute with 0 slippage (you can omit the `slippageBps` parameter)
- Set your own slippage tolerance via the `slippageBps` parameter in the create order request
- Higher slippage increases the likelihood of order execution but may result in less favorable prices
:::
