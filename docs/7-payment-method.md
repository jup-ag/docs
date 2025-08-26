---
sidebar_label: "Payment Method"
description: "Payment Method in Jupiter Portal"
title: "Payment Method"
---

<head>
    <title>Payment Method</title>
    <meta name="twitter:card" content="summary" />
</head>

This section covers the payment method in Jupiter Portal.


## Overview

The payment methods provided on Portal only applies to the **PRO PLAN**. 

- **Lite Plan**: Free tier, no payment required.
- **Pro Plan**: Tiered pricing.
- **Ultra Plan**: No payment via Portal needed.

:::note
For Lite and Ultra plans, you can use the API directly without any payment on Portal.

(Note that Ultra plan will require a free API Key to be generated first. You can find more details in [API Setup](/docs/api-setup) and [API Rate Limit](/docs/api-rate-limit) docs.)
:::

## Payment Method

We currently support 2 payment methods:
- Crypto - USDC on Solana via Helio
- Credit card - USD via CoinFlow

To pay for higher rate limits on Pro plan, you can choose either of the payment methods via the Portal UI.

### Crypto

| Property | Details |
|----------|---------|
| **Payment** | The payment is done in Solana USDC only. |
| **Cadence** | The payment is currently done on a monthly basis, which means you will need to revisit Portal and manually renew each month. |
| **Expiry** | 7 days before the plan expires, you will see the state change in the dashboard's table and receive an automated email as a reminder to renew. Upon expiry, your key will remain valid for a grace period but will be disabled (but not deleted) when it ends. |
| **Renewal** | If you choose to "Renew", the plan will be renewed to the same plan as the previous month. To change plan, you can upgrade/downgrade your plan at any time and cost will be pro-rated. |
| **Fee** | Jupiter incurs the payment service fees. |
| **Changing of payment method** | From Crypto to Credit Card:<br/>1. Wait for plan to expire<br/>2. Pay using the credit card payment method. |

### Credit Card

| Property | Details |
|----------|---------|
| **Payment** | The payment is done in USD only. |
| **Cadence** | The subscription is automatically renewed and funds deducted on a monthly basis. |
| **Expiry** | 7 days before the plan expires, you will see the state change in the dashboard's table and receive an automated email as a reminder to renew. Upon expiry, your key will remain valid for a grace period but will be disabled (but not deleted) when it ends. |
| **Fee** | User incurs the credit card payment service fees. |
| **Changing of cards** | Due to provider limitation, changing of cards require a few extra steps and cannot be done in the middle of the subscription.<br/>1. Cancel current plan<br/>2. Wait for plan to expire<br/>3. Resubscribe a plan with the new card. |
| **Upgrading of plans** | You can upgrade your plan at any time.<br/>- The cost of the new plan will be charged immediately, while the pro-rated unused cost of the previous plan will be refunded.<br/>- The subscription date will be updated to the date of the upgrade.<br/>- Do note that the refund will be processed at least 1-2 business days after the upgrade. |
| **Downgrading of plans** | You can downgrade by cancelling your plan and subscribing to a lower plan after expiry. |
| **Cancellation of plans** | No refund will be given for unused days and the Pro plan will continue until the expected expiry date. |
| **Changing of payment method** | From Credit Card to Crypto:<br/>1. Cancel current plan so it does not automatically renew<br/>2. Wait for plan to expire<br/>3. Pay using the crypto payment method. |
| **Other Caveats** | - Registered card address must be the billing address.<br/>- No usage of disposable cards as payments are made for a recurring subscription plan. |