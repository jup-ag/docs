---
sidebar_label: "About Routing"
description: "About Jupiter Routing"
title: "About Routing"
---

<head>
    <title>About Routing</title>
    <meta name="twitter:card" content="summary" />
</head>

Jupiter products utilizes the Swap infrastructure which is built on top of a robust and complex routing system that aggregates liquidity from multiple sources such as decentralized exchanges (DEXes) and market makers.

:::note
If you are an exchange or market maker and want to participate in our routing system, please refer to our [DEX Integration](/docs/routing/dex-integration) and [RFQ Integration](/docs/routing/rfq-integration) guides.
:::

## Jupiter Metis Routing Engine

The Metis Routing Engine integrates with most decentralized exchanges on Solana, and to access the quotes, you can request the Swap API. You can find a complete list of supported DEXes via the [/swap/v1/program-id-to-label](https://lite-api.jup.ag/swap/v1/program-id-to-label) endpoint.

Our routing infrastructure consists of several key components:

- A routing engine that finds the optimal price across all integrated venues
- A market indexer that automatically detects and integrates most new markets (with a 14-day grace period before the crawler takes over)
- A market crawler that runs periodically to categorize markets based on their liquidity

## Jupiter Z (RFQ) Routing Engine

Jupiter Z is our Request For Quote (RFQ) routing engine, it is intent based where the user express their desired price (intents) and market makers provide quotes to fulfill those intents.

Our RFQ system consists of:

- An order engine for RFQ processing
- To include RFQ into our routing, we utilize a quote proxy that compares quotes between Jupiter Z and Jupiter Metis (or more) to ensure best quotes
- RFQ is accessible via the Ultra API

For more information about Jupiter Z, please refer to our [RFQ Integration](/docs/routing/rfq-integration) guide.
