---
sidebar_label: "About Routing"
description: "About Jupiter Routing"
title: "About Routing"
---

<head>
    <title>About Routing</title>
    <meta name="twitter:card" content="summary" />
</head> 

:::note
If you are an exchange or market maker and want to participate in our routing system, please refer to our [DEX Integration](/docs/routing/dex-integration) and [RFQ Integration](/docs/routing/rfq-integration) guides.
:::

## Juno Liquidity Engine

Juno is Jupiter's latest liquidity engine, it is built with the combined learnings from Metis and JupiterZ, with one single objective - to ensure the best possible execution price and success rate across all engines and liquidity sources. Juno employs a sophisticated self-learning mechanism to maintain high availability of competitive routes while automatically sidelining underperforming or potentially problematic quotes. Juno will be incrementally introducing new third-party liquidity sources and a continual effort to improve Metis and JupiterZ routing capabilities.

|  |  |
| --- | --- |
| **Multi-liquidity sources** | Integrates third-party liquidity sources and Jupiter's proprietary routing engines to ensure best possible rates.<br /><br />Currently, Juno consists of Metis, JupiterZ, Hashflow, DFlow and more in the pipeline. |
| **Self-learning** | Automatically detects and sidelines underperforming or problematic sources, while continuously learning to provide competitive quotes. |
| **Continuous optimizations** | By integrating external liquidity sources directly, Juno creates a competitive environment that drives continuous improvement across all routing engines. This approach ensures users consistently receive optimal execution rates while providing valuable performance data to enhance both Metis and JupiterZ routing capabilities. |

Juno is directly powering the Ultra Swap on Jupiter frontend (jup.ag) and is also accessible via [**Ultra API**](/docs/ultra-api): The Jupiter Ultra API is the *only* API you ever need to experience or build the best trading experience on Solana - Jupiter handles all the complexities such as RPCs, slippage, broadcast method and landing rates, all while accessing the best liquidity available through Juno.

## Jupiter Metis Routing Engine

Since its inception in 2023, Jupiter's proprietary DEX aggregation engine, Metis v1, has become a cornerstone of Solana blockchain's DeFi ecosystem. Metis functions as a sophisticated aggregation layer for on-chain liquidity, with one single objective - to algorithmically determine the most efficient trade route for any given token pair, considering factors like price, slippage, and quoted-to-executed price across multiple DEXes and AMMs. This ensures users receive the best possible execution price available on-chain at the moment that they wish to trade.

As of 2025, we've deployed Metis v1.5 which has experimented with modified algorithms to enable more granular splits and allows for a larger set of tokens to act as intermediate tokens in a route. From our analysis so far, this translates to 4.6x less spread between quoted and executed price. This is a continued effort to experiment with better configurations and algorithms to improve Metis.

[Read more about Metis's history, learnings and future plans](https://x.com/sssionggg/status/1912378618711535889).

|  |  |
| --- | --- |
| **Overcoming SVM constraints** | Employs a sophisticated and efficient transaction construction to enable multi-hop-multi-split swaps. |
| **Integrating diverse DEXes** | Utilizes a standardized interface to integrate with a wide range of DEXes, abstracting away the complexities of each individual DEX. |
| **Optimizing for price and execution** | Ensuring the quoted price is as close as the actual price, while also ensuring the transaction is executed successfully. |
| **Accessing markets immediately and safely** | Employs necessary infrastructure powered by a network of robust RPC nodes to include markets and checks their liquidity in real-time. |

The engine integrates with most DEXes on Solana and is accessible via the Swap API. You can find a complete list of supported DEXes via the [/swap/v1/program-id-to-label](https://lite-api.jup.ag/swap/v1/program-id-to-label) endpoint.

**Metis v1**

Metis v1's impact extends far beyond simple facilitation of on-chain trades. It is the de-facto liquidity engine on Solana, playing an instrumental role in onboarding millions of users to the network and facilitating trillions of dollars in cumulative trading volume. Its stability and general-purpose design have made it a reliable foundation for countless developers and protocols building on Solana.

Currently, Metis v1 powers the [**Swap API**](/docs/swap-api): A robust interface designed for developers and applications requiring programmatic access to Solana's liquidity. It currently has tens of thousands of requests per second, with demonstrated capacity to handle peak loads reaching hundreds of thousands of requests per second.

## Jupiter Z (RFQ) Routing Engine

Since its launch in 2024, Jupiter Z has emerged as a transformative addition to Jupiter's routing capabilities. Jupiter Z functions as an RFQ (Request For Quote) system that connects users directly with market makers, enabling market makers to provide competitive quotes for top token pairs. This ensures users receive the best possible execution price available from both on-chain and off-chain liquidity at the moment they wish to trade.

|  |  |
| --- | --- |
| **Intent-based architecture** | Employs an intent-based system where users express their desired trade and market makers compete to fulfill it. |
| **Integrating diverse market makers** | Utilizes a standardized interface to integrate with multiple market makers, abstracting away the complexities of each liquidity provider. |
| **Optimizing for price and execution** | Creates a competitive environment where market makers compete to provide the best quotes, while ensuring the transaction is executed successfully and efficiently. |
| **Real-time quote aggregation** | Employs a versatile proxy to collect and compare quotes from multiple routing sources (such as Jupiter Metis v1 and Jupiter Z) in real-time. |
| **Gasless transactions** | Enables users to execute trades without incurring transaction fees, providing a seamless and cost-effective trading experience. |

Jupiter Z has been handling a large portion of trades on the Jupiter frontend (jup.ag) - which has demonstrated Jupiter Z's reliability and effectiveness in providing competitive quotes and successful trade execution.

Currently, Jupiter Z is accessible through the **Ultra API**: A streamlined interface that makes it simple for developers and applications to tap into Metis v1, Jupiter Z and other routing sources.

For more information about Jupiter Z, please refer to our [RFQ Integration](/docs/routing/rfq-integration) guide.
