---
sidebar_label: "About Ultra API"
description: "Start using Jupiter Ultra API to swap with the best experience."
title: "About Ultra API"
---

<head>
    <title>Ultra API</title>
    <meta name="twitter:card" content="summary" />
</head>

The Ultra API is built on top of the Swap API, with additional features to support seamless integration and execution of swap orders with Jupiter Swap.

## Features

- Request for swap orders from both Jupiter DEX Routing Engine and Jupiter Z (RFQ).
- Request for token balances of an account.
- Execute swap order seamlessly in a single API call.
- We handle the complexities of RPC connections, transaction landing, slippage protection and more.
- Provide world class customer support to your users, please refer to the [Support Guidelines](/docs/misc/support-guidelines) for more information.

## How to swap with Ultra API

You can do it in just 2 steps:

1. Request for a swap order from `/ultra/v1/order`.
2. Post request to `/ultra/v1/order/execute` to execute the swap order and get the execution status.
3. Additionally, you can request for token balances of an account from `/ultra/v1/balances`.

**Get started now with [Ultra API](/docs/ultra-api/get-order)**

## FAQ

**What is the fee for using Ultra API?**

Ultra API takes 0.1% (or 0.05% depending on the tokens) of the swap amount as a fee.

**What is the rate limit for Ultra API?**

Currently, Ultra API has a rate limit of 120 requests per minute.

:::info Portal API Keys
Portal API Keys are not supported for Ultra API.
:::

**Can integrators take fees using Ultra API?**

Currently no, we are working on it.
