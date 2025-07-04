---
sidebar_label: "About Price API"
description: "Understand the mechanisms and challenges behind deriving token prices."
title: "About Price API"
---

<head>
    <title>About Price API</title>
    <meta name="twitter:card" content="summary" />
</head>

The Jupiter Price API aims to be the source of truth of token prices across all Jupiter UIs and integrator platforms, providing a seamless experience for developers and a reliable and accurate price source for users.

:::danger DEPRECATED
[Price API V2](/docs/price-api/v2) will be/is deprecated by 1 August 2025.

Please migrate to [Price API V3](/docs/price-api/v3) which consists of breaking changes.
:::

---

## Challenges

Accurately pricing tokens on-chain is deceptively complex. Unlike traditional markets with centralized pricing mechanisms and consistent liquidity, decentralized finance (DeFi) presents a set of dynamic and often adversarial conditions. The Price API V3 is built with these realities in mind, abstracting away challenges to deliver accurate, real-time token prices with integrity and consistency.

| Challenge | Description |
|-----------|-------------|
| **Gamification of Price** | In decentralized environments, token prices can be manipulated or "gamed" for appearances or exploitative purposes. Common patterns include:<ul><li>Wash trading to inflate volume or imply activity</li><li>Circular swaps to fabricate higher valuations</li></ul> |
| **Fragmented, Volatile or Imbalanced Liquidity Across Venues** | Liquidity on Solana (and other chains) is spread across numerous protocols and AMMs. No single source can represent the entire market. Different pools might have wildly different pricing and can change very quickly. |
| **Low Liquidity Tokens** | Some tokens trade rarely or only within shallow pools. In such cases, even small orders can cause large price swings, making pricing unreliable. |

---

## How Price is Derived

The latest version of Price API is V3 - which uses the **last swapped price (across all transactions)**. The swaps are priced by working outwards from a small set of reliable tokens (like SOL) whose price we get from external oracle sources.

While and also after deriving the last swap price, we also utilize a number of heuristics to ensure the accuracy of the price and eliminate any outliers:
- Asset origin and launch method
- Market liquidity metrics
- Market behaviour patterns
- Holder distribution statistics
- Trading activity indicators
- Market value to liquidity ratios
