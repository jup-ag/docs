---
sidebar_label: "Execute Order"
description: "Start using Jupiter Ultra API by executing a swap order and getting the execution status."
title: "Execute Order"
---

<head>
    <title>Execute Order</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
Base URL: `https://lite-api.jup.ag/ultra/v1/execute`

We are exploring a Dynamic Rate Limit system for Ultra, hence Portal API keys currently do not apply for Ultra API.

If you require higher rate limits, please reach out to us in [Discord](https://discord.gg/jup).
:::

:::tip API Reference
To fully utilize the Ultra API, check out the [Ultra API Reference](/docs/api/ultra-api/execute.api.mdx).
:::

## Sign Transaction

Using the Solana `web3.js` **v1** library, you can sign the transaction as follows: