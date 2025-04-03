---
sidebar_position: 2
sidebar_label: "API Key Setup"
description: "Guide to setting up API Keys to access Jupiter APIs."
title: "API Key Setup"
---

<head>
    <title>API Setup</title>
    <meta name="twitter:card" content="summary" />
</head>

Get started by setting up an account on the dashboard to generate API Keys and managing payments via Helio.

Then, to use the API Key in our APIs, simply add the key to the header.

```js
headers: {
    'Content-Type': 'application/json',
    'x-api-key': '' // enter api key here
},
```

:::info Free Plan
Do note that you **do not** need an API Key to use the free plan. Simply just call the endpoints without the API Key.
:::

## 1. Open Portal

Navigate to https://portal.jup.ag

## 2. Connect via email

To enter the portal, simply connect via email account. This allows us to keep track of your account tagged to your API Keys.

![Connect](../static/portal/connect.png)

## 3. Browse and Select Plan

To decide on a suitable plan by gauging requests required by your project size and user needs.

:::info Change of plans
You can always change your plans later.

Please reach out to the team for any plans change request as it is currently done manually.
:::

![Plans](../static/portal/plans.png)

## 4. Payment

Before you set up your keys, you will need to make the payment upfront via Helio.

1. Helio payment link modal will pop-up.
2. Enter the required details.
3. Connect wallet to pay via Solana blockchain.
4. Click the **Subscribe** button to proceed.

:::info Plan Renewal
The payment is currently done on a monthly basis.

- 7 days before the plan expires, you will see a banner in the dashboard.
- You can renew your plan latest 14 days after the plan expires before your API Key is disabled.
- The plan will be renewed for the same plan as the previous plan.
- If you have any issues with the payment, [please open a ticket](https://jupiverse.zendesk.com/hc/en-us/requests/new?ticket_form_id=18069133114012&tf_18541841140892=api_or_developer_support).
:::

:::note other payment methods
New payment methods is a work in progress.
:::

![Payment](../static/portal/payment.png)

## 5. Processing Screen

Yes, please wait while the payment gateway confirm the payment and return us a success response.

![Processing](../static/portal/processing.png)

## 6. Setup API Keys

Click on the **"+ Generate Key"** button to generate an API Key.

:::warning Generating multiple keys
The rate limits are imposed on a **PER ACCOUNT** basis, not per API Key.

If you need more requests, you can upgrade the plan, or create a completely new account and subscribe to a plan, (this means you will have 2 separate accounts, each has its own plans).
:::

![Generate](../static/portal/generate.png)

## 7. Have a Question?

Please reach out to us.

- If you have increasing demand and growth in your app, and need additional support.
- If you have questions or need support.
- Join the [Telegram channel](https://t.me/jup_dev) or [Discord channel](https://discord.com/channels/897540204506775583/1115543693005430854) to subsribe to updates.

## 8. Get Started!

With your API Key, you can gain higher request access to `/quote`, `/swap` and other endpoints to build world class applications. Refer to the rest of the documentation to get started, we will be releasing more developer content in the future.