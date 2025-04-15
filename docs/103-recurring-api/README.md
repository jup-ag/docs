---
sidebar_label: "About Recurring API"
description: "Start using Jupiter Recurring API to create time or price based recurring orders."
title: "About Recurring API"
---

<head>
    <title>Recurring API</title>
    <meta name="twitter:card" content="summary" />
</head>

The Jupiter Recurring API enables you to create automated recurring orders on Solana, allowing users to set up regular token swaps that execute automatically based on time intervals or price conditions.

The Recurring API is ideal for:
- DeFi applications that want to offer dollar-cost average or value average features
- Wallets and platforms looking to provide automated investment options
- Projects that want to implement treasury management strategies

## Features

| Feature | Description |
| --- | --- |
| **Time-based recurring** | Set up regular token swaps that execute automatically at specified time intervals. |
| **Price-based recurring** | Create price-based recurring orders that execute when certain market conditions are met. |
| **Any token pair** | Create recurring orders between any token pairs supported on Jupiter's Metis Routing Engine. |
| **Best execution** | Orders are executed through Jupiter's Metis Routing Engine to get the best possible price across all DEXes. |
| **Flexible scheduling** | Configure the frequency and timing of recurring orders to match your needs. |
| **Price strategy** | Set a price range in time-based recurring orders. |

## Getting Started with Recurring API

1. [**Create Order**](/docs/recurring-api/create-order): Create a new recurring order with your desired parameters.
2. [**Cancel Order**](/docs/recurring-api/cancel-order): Cancel an existing recurring order.
3. [**Deposit in Price-based Orders**](/docs/recurring-api/deposit-price-order): Deposit funds in price-based orders.
4. [**Withdraw from Price-based Orders**](/docs/recurring-api/withdraw-price-order): Withdraw funds from price-based orders.
5. [**Get Recurring Orders**](/docs/recurring-api/get-recurring-orders): Retrieve the history of recurring orders for a specific wallet address.
6. [**Best Practices**](/docs/recurring-api/best-practices): Best practices for using Recurring API.

## FAQ

**What is the fee for using Recurring API?**

Recurring API takes 0.1% as fees.

**Can integrators take fees using Recurring API?**

Currently no.
