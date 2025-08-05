---
sidebar_label: "API Rate Limiting"
description: "API rate limiting for the Jupiter API."
title: "API Rate Limiting"
---

<head>
    <title>API Rate Limiting</title>
    <meta name="twitter:card" content="summary" />
</head>

In this section, you can find the rate limiting details for the Jupiter API.

## Overview

**Fixed Rate Limit**
- All Jupiter APIs that are public and documented are free to use via the Lite tier.
- By purchasing a Pro plan, you are only accessing higher rate limits with no differences in usage nor freshness of data.

**Dynamic Rate Limit**
- Only Ultra API has a unique dynamic rate limit system, [you can find more details in this section](#dynamic-rate-limit).

**API Key rules**
- API Keys are universal
    - Use the same API Key for Ultra API (Dynamic Rate Limit) and all Pro APIs `api.jup.ag` (Fixed Rate Limit).
    - You do not need an API Key for Lite APIs `lite-api.jup.ag`.
- Rate limits apply on a per account basis, not to individual API keys.

| API Tier | Rate Limit Model | API Key Required | Base URL |
|----------|------------------|------------------|----------|
| **Lite** | Fixed (Free Tier) | No | `https://lite-api.jup.ag/**` |
| **Pro** | Fixed (Tiered) | Yes | `https://api.jup.ag/**` |
| **Ultra** | Dynamic | Yes | `https://api.jup.ag/ultra/**` |

## Fixed Rate Limit

The Fixed Rate Limit system applies to the Lite and Pro plans (does not include Ultra API), using the sliding window method to enforce request quotas.

| Property | Lite | Pro |
|----------|------|-----|
| **Base URL** | `https://lite-api.jup.ag/` | `https://api.jup.ag/` |
| **Cost** | Free | Paid per month, based on tier |
| **API Key** | Not required | Required |
| **Requests Per Minute** | 60 | Based on tier |
| **Window** | 60 seconds | 10 seconds |
### Rate Limit

Rate limits are defined over 10-second windows (except Lite at 60-second window). For example, if your tier allows 100 requests per 10 seconds, any more within that window will receive a 429 response, regardless of how few you used in the previous window.

| Tier | Est. Requests per Minute | Requests Per Period | Sliding Window Period |
|------|---------------------|---------------------|-----------------------|
| Lite | 60 | 60 | 60 seconds |
| Pro I | ~600 | 100 | 10 seconds |
| Pro II | ~3,000 | 500 | 10 seconds |
| Pro III | ~6,000 | 1,000 | 10 seconds |
| Pro IV | ~30,000 | 5,000 | 10 seconds |

Requests are distributed to each bucket:
1. **Price API Bucket** – dedicated for `/price/v3/` only - separate from Default Bucket.
2. **Default Bucket** – used for all APIs except the Price API.

:::note
- Each bucket enforces its own sliding window independently.
- For example, Pro II = 500 per 10 seconds to the Default Bucket and 500 per 10 seconds to the Price API Bucket.
- Lite users do not have a separate Price API Bucket — all requests are counted against the Default Bucket.
:::

## Dynamic Rate Limit (BETA)

The [**Ultra API**](/docs/ultra-api) uses a unique rate limiting mechanism that scales with your **executed swap volume** over time.

| Property | Dynamic |
|----------|---------|
| **Base URL** | `https://api.jup.ag/ultra/` |
| **Cost** | Free to use, but Ultra incurs swap fees |
| **API Key** | Required |
| **Requests Per Minute** | Base Quota + Added Quota |

### How Dynamic Rate Limit Works

Every **10 minutes**
- The system aggregates your swap volume from `/execute` on Ultra for **the current rolling day** (volume of (current timestamp - 1 day) up to present).
- After which, the Added Quota will update, which will be added on top of the Base Quota.

| Swap Volume | Requests Per Period | Sliding Window Period |
| --- | --- | --- |
| $0 | 50 Base + 0 Added = 50 | 10 seconds |
| $10,000 | 50 Base + 1 Added = 51 | 10 seconds |
| $100,000 | 50 Base + 11 Added = 61 | 10 seconds |
| $1,000,000 | 50 Base + 115 Added = 165 | 10 seconds |

:::note
The formula is subject to changes as we experiment with the Dynamic Rate Limit system.

If you find that the rate limit is too restrictive, please reach out to us in Discord.
:::

## Managing Rate Limits

If you receive a 429 response, you should:
1. Implement exponential backoff in your retry logic
2. Wait for sliding window to allow for more requests
2. **Upgrade your tier (Pro)** or **scale your Ultra usage** to unlock higher limits.

:::caution
Bursting beyond your allocation may result in **temporary 429s/rate limits**, even after the refill period. Avoid aggressive retry patterns.
:::
