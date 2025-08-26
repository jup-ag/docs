---
sidebar_label: "API Key Setup"
description: "Guide to setting up API Keys to access Jupiter APIs."
title: "API Key Setup"
---

<head>
    <title>API Setup</title>
    <meta name="twitter:card" content="summary" />
</head>

Get started by setting up an account on the dashboard to generate API Keys and managing payments via Helio.

:::note API Usage
Refer to [API Rate Limit](/docs/api-rate-limit) for more detailed information.

| API Tier | Rate Limit Model | API Key | Base URL |
| --- | --- | --- | --- |
| **Lite** | Fixed (Free Tier) | No | `https://lite-api.jup.ag/**` |
| **Pro** | Fixed (Tiered) | Yes | `https://api.jup.ag/**` |
| **Ultra** | Dynamic | Yes | `https://api.jup.ag/ultra/**` |

```js
headers: {
    'Content-Type': 'application/json',
    'x-api-key': '' // enter api key here
},
```
:::

## Overview

1. Open Portal at https://portal.jup.ag/
2. Browse and select plan
3. Connect via email
4. Pay via Helio (Payment is currently done on per month basis)
5. Setup API Keys

## Types of Plans

:::note
You can always change your plans later.

You can upgrade/downgrade your Pro plans on the UI any time.
:::

Depending on your needs, you can choose from the following plans:

| Plan | Rate Limit Model | Why choose this plan |
| --- | --- | --- |
| Lite | Free Tier | You are just starting out and want to test the Jupiter APIs. |
| Pro | Fixed Tiered Rate Limits | Both small projects or large enterprises can utilize this with the tiered rate limits. Rate limits range from 1 RPS to 500 RPS plans. |
| Ultra | Dynamic Rate Limits based on executed swap volume | [Using Ultra API comes with many benefits](/docs/ultra-api) where Jupiter will handle slippage, transaction sending, and more without the need of an RPC from you. With that, the Ultra API is governed by a Dynamic Rate Limit model that will scale with your swap executions. |

## Payment

:::note
Refer to [Payment Method](/docs/payment-method) for more details.
:::

:::info Plan Renewal
The payment is currently done on a monthly basis, which means you will need to manually renew each month.

- 7 days before the plan expires, you will see the state change in the dashboard's table and receive an automated email as a reminder to renew.
- Upon expiry, your key will remain valid for a grace period but will be disabled (but not deleted) when it ends.
- The plan will be renewed to the same plan as the previous.
- If you have any issues with the payment, [please open a ticket](https://support.jup.ag/hc/en-us/requests/new?ticket_form_id=18069133114012&tf_18541841140892=api_or_developer_support).
:::

The current payment method we support is via Helio.
- Only Pro plans require payments.
- The payment is currently done on a monthly basis.
- The payment is done in Solana USDC only.
