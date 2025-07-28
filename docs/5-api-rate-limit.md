---
sidebar_label: "API Rate Limiting"
description: "API rate limiting for the Jupiter API."
title: "API Rate Limiting"
displayed_sidebar: docs
---

<head>
    <title>API Rate Limiting</title>
    <meta name="twitter:card" content="summary" />
</head>

In this section, you can find the rate limiting details for the Jupiter API.

## Overview

**Fixed Rate Limit**
- All Jupiter APIs that are public and documented are free to use via the Lite tier.
- By purchasing a higher Pro plan, you are only accessing higher rate limits with no differences in usage nor freshness of data.

**Dynamic Rate Limit**
- Only Ultra API has a unique dynamic rate limit system, [you can find more details in this section](#dynamic-rate-limit).

**API Key rules**
- API Keys are universal, use the same API Key for Ultra API (Dynamic Rate Limit) and all other APIs (Fixed Rate Limit).
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
| **Tokens Allocated Rate** | 60 tokens per minute | Based on tier |

### Rate Limit

Rate limits are defined over 10-second windows (except Lite at 60-second window). For example, if your tier allows 100 requests per 10 seconds, any more within that window will receive a 429 response, regardless of how few you used in the previous minute.

| Tier | Est. Requests per Minute | Requests Per Period | Sliding Window Period |
|------|---------------------|---------------------|-----------------------|
| Lite | ~60 | 60 | 1 minute |
| Pro I | ~600 | 100 | 10 seconds |
| Pro II | ~3,000 | 500 | 10 seconds |
| Pro III | ~6,000 | 1,000 | 10 seconds |
| Pro IV | ~30,000 | 5,000 | 10 seconds |

Requests are distributed to each bucket:
1. **Default Bucket** – used for all APIs except the Price API.
2. **Price API Bucket** – dedicated for price requests only - separate from Default Bucket.

:::note
- Each bucket enforces its own sliding window independently.
- For example, Pro II = 500 per 10 seconds to the Default Bucket and 500 per 10 seconds to the Price API Bucket.
- Lite users do not have a separate Price API Bucket — all requests are counted against the Default Bucket.
:::

## Dynamic Rate Limit

The **Ultra API** uses a unique rate limiting mechanism that scales with your **executed swap volume** over time.

| Property | Dynamic |
|----------|---------|
| **Base URL** | `https://api.jup.ag/ultra/` |
| **Cost** | Free to use, but Ultra incurs swap fees |
| **API Key** | Required |
| **Requests Per Minute** | Base Quota + Added Quota |
| **Tokens Allocated** | Base Quota + Added Quota per 10 seconds |

### How Dynamic Rate Limit Works

- Every **X period rolling window**, the system aggregates your swap volume from `/execute` on Ultra.
- Every **X period**, your Added Quota will update, which will apply to the number of tokens allocated.

| Swap Volume | Requests Per Period | Sliding Window Period |
| --- | --- | --- |
| $0 | 50 Base + 0 Added = 50 | 10 seconds |
| $10,000 | 50 Base + 1 Added = 51 | 10 seconds |
| $100,000 | 50 Base + 10 Added = 60 | 10 seconds |
| $1,000,000 | 50 Base + 100 Added = 150 | 10 seconds |

## Managing Rate Limits

If you receive a 429 response, you should:
1. Implement exponential backoff in your retry logic
2. Wait for sliding window to allow for more requests
2. **Upgrade your tier (Pro)** or **scale your Ultra usage** to unlock higher limits.

:::caution
Bursting beyond your allocation may result in **temporary blocking**, even after the refill period. Avoid aggressive retry patterns.
:::

## FAQ

#### Can I use the same API key for all Jupiter APIs?
- Yes, API keys are universal across both Fixed Rate Limit and Dynamic Rate Limit system.

#### Can I use both Pro and Ultra APIs together?
- Yes. You can maintain a Pro subscription for all other API routes while integrating Ultra endpoints separately.
- Do note that purchasing a Pro plan, does not apply its rate limits to Ultra API.

#### What if I need higher Ultra limits to start with?
- Reach out via the Developer Portal to request a bootstrap quota for early launch phases or enterprise onboarding.

#### Can I get custom rate limits outside of Pro plans?
- Yes, contact our [support](/docs/misc/integrator-guidelines#developer-support) to discuss about custom plans.

#### Does the API Key apply immeidately?
- No, it will take 2-5 minutes for it to reflect.

#### What happens if I upgrade/downgrade my plan?
- Upgrade happens immediately (2 - 5 minutes) is still required to be reflected.
- Downgrade will happen at the end of the billing period if you are to renew the plan.