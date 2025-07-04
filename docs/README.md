---
sidebar_position: 1
sidebar_label: "Get Started"
description: "Introduction to Jupiter APIs"
title: "Welcome!"
---

<head>
    <title>Get Started</title>
    <meta name="twitter:card" content="summary" />
</head>

Welcome to Jupiter Developer Documentation! You'll find detailed API guides, schemas, and powerful tool kits built by the team and DevRel Working Group to help you build with Jupiter.

:::tip Breaking Changes
Refer to the [What's New?](#whats-new) section for the latest API updates and breaking changes.
:::

## Get Started

**For new developers or new to blockchain development**: We recommend you to start with the [Environment Setup](/docs/environment-setup) and [Development Basics](/docs/development-basics) guides.

**For existing developers**: Please refer to the [What's New?](#whats-new) section for the latest API updates and breaking changes.

**For routing integrations**: Please refer to the [DEX Integration](/docs/routing/dex-integration) and [RFQ Integration](/docs/routing/rfq-integration) guides to complete the prerequisites before we look into integrating.

**Quick Links** to APIs and Tool Kits:

- [Ultra API](/docs/ultra-api/)
- [Swap API](/docs/swap-api/)
- [Trigger API](/docs/trigger-api/)
- [Recurring API](/docs/recurring-api/)
- [Token API](/docs/token-api/)
- [Price API](/docs/price-api/)
- [Swap Terminal](/docs/tool-kits/terminal/)
- [Unified Wallet Kit](/docs/tool-kits/wallet-kit/)


**Reach out to us** on [Discord](https://discord.gg/jup) for developer support

- If you have any feedback.
- If you have technical questions.
- If you need API Portal support.
- Refer to these channels to receive updates: [Telegram channel](https://t.me/jup_dev) or [Discord channel](https://discord.com/channels/897540204506775583/1115543693005430854)


## What's New?

:::caution Deprecation of Price API V2 and Token API V1
*Last updated: June 2025*

[**Price API upgrades to V3**](/docs/price-api/v3) to support more reliable and timely pricing data - derived by the last swap price (across all transactions) and a set of heuristics to ensure the accuracy of the price and eliminate any outliers.

[**Token API upgrades to V2**](/docs/token-api/v2) to support an easier and reliable usage with new data addition such as organic score, more trading categories like toporganicscore, and more.

:::danger ACTION REQUIRED
- If you are using **Price API V2** and **Token API V1**
- Please migrate to their new versions respectively
- The older version will be deprecated by 1 August 2025
:::


:::caution API Gateway: Improvements
*Last updated: March 2025*

**Improved API Gateway!**

For those that have been using the new hostnames at `api.jup.ag/**`, we have made improvements to the infrastructure
- Reduced latency in responses and much more consistent now
- Infrastructure costs reduction (will help us look into reducing costs of the plans with higher rate limits)

**Dual endpoint moving forward.**

We will be deploying 2 different endpoints, 1 for free usage and 1 for plans with higher rate limits via https://portal.jup.ag/
- `api.jup.ag` will serve only pro/paid users
- `lite-api.jup.ag` will be the endpoint to provide free usage

:::danger ACTION REQUIRED
**ACTION REQUIRED (only for free usage)**
- Migrate to `lite-api.jup.ag` **BY 1 MAY 2025**
- The paths remain unchanged, only domain change
- The same rate limits still apply
- You do not need an API Key to use the APIs for free
- If you are still on `api.jup.ag` without an API key, you will get a 401 response

**NO action required for higher rate limit plans via Portal**
- Your usage on `api.jup.ag` remains unchanged
- You can only use `api.jup.ag` with an API Key
:::


:::caution Trigger API: New Hostname and Breaking Changes
*Last updated: March 2025*

- The `/limit/v2` path will be deprecated soon, please update your API calls to use the `/trigger/v1` path immediately.
- `/execute` endpoint is introduced.
- `/createOrder` endpoint now includes an additional `requestId` parameter to be used with the `/execute` endpoint.
- `/cancelOrder` endpoint only builds the transaction for 1 order, while `/cancelOrders` endpoint builds the transaction for multiple orders.
- The `tx` field in the responses are now `transaction` or `transactions`.
- `/getTriggerOrders` endpoint is introduces a new format to get either active or historical orders (based on the query parameters).
- [Please refer to the documentation for usage](/docs/trigger-api/create-order).

<details>
    <summary>
        Hostname Changes
    </summary>
#### Trigger

| Old Hostnames                               | New Hostnames                                 |
| ------------------------------------------- | --------------------------------------------- |
| `https://api.jup.ag/limit/v2/createOrder`   | `https://lite-api.jup.ag/trigger/v1/createOrder`   |
| `https://api.jup.ag/limit/v2/executeOrder`  | `https://lite-api.jup.ag/trigger/v1/executeOrder`  |
| `https://api.jup.ag/limit/v2/cancelOrder`   | `https://lite-api.jup.ag/trigger/v1/cancelOrder`<br />`https://lite-api.jup.ag/trigger/v1/cancelOrders` |
| `https://api.jup.ag/limit/v2/openOrders`<br />`https://api.jup.ag/limit/v2/orderHistory`    | `https://lite-api.jup.ag/trigger/v1/getTriggerOrders` |
</details>
:::

:::caution API Gateway: New Hostnames and API Keys
*Last updated: January 2025*

- API will now be served through new hostnames.
- API will now be served through API keys.
- API Keys will be distributed via https://portal.jup.ag (Refer to [API Setup](/docs/api-setup) to get started).
- Old hostnames will be slowly phased out.
- Old hostnames during this period will have reduced rate limits to facilitate migration to the new API.

| Service Types          | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| Free with no API key   | Decreased rate limits to only accommodate for testing.   |
| Paid plan with API key | Fixed rate limits, self served through an API dashboard. |

<details>
    <summary>
        Hostname Changes
    </summary>
#### Swap

| Old Hostnames                                     | New Hostnames                                    |
| ------------------------------------------------- | ------------------------------------------------ |
| `https://quote-api.jup.ag/v6/quote`               | `https://lite-api.jup.ag/swap/v1/quote`               |
| `https://quote-api.jup.ag/v6/swap`                | `https://lite-api.jup.ag/swap/v1/swap`                |
| `https://quote-api.jup.ag/v6/swap-instructions`   | `https://lite-api.jup.ag/swap/v1/swap-instructions`   |
| `https://quote-api.jup.ag/v6/program-id-to-label` | `https://lite-api.jup.ag/swap/v1/program-id-to-label` |

#### Price

| Old Hostnames             | New Hostnames                 |
| ------------------------- | ----------------------------- |
| `https://price.jup.ag/v6` | `https://lite-api.jup.ag/price/v2` |

#### Token

| Old Hostnames                               | New Hostnames                                 |
| ------------------------------------------- | --------------------------------------------- |
| `https://tokens.jup.ag/token/:mint`         | `https://lite-api.jup.ag/tokens/v1/token/:mint`    |
| `https://tokens.jup.ag/tokens?tags=:tags`   | `https://lite-api.jup.ag/tokens/v1/tagged/:tag`    |
| `https://tokens.jup.ag/tokens_with_markets` | `https://lite-api.jup.ag/tokens/v1/mints/tradable` |
</details>
:::
