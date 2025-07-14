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
- By purchasing a higher Pro plan, you are only accessing higher rate limits with no significant difference (like latency).

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

The Fixed Rate Limit system applies to the Lite and Pro plans, they use a token bucket system with replenishment periods to manage request flow and prevent API abuse.

| Property | Lite | Pro |
|----------|------|-----|
| **Base URL** | `https://lite-api.jup.ag/` | `https://api.jup.ag/` |
| **Cost** | Free | Paid per month, based on tier |
| **API Key** | Not required | Required |
| **Requests Per Minute** | 60 | Based on tier |
| **Tokens Allocated Rate** | 60 tokens per minute | Based on tier |

### Token Allocation

| Tier | Request Per Minute | Tokens Allocated | Interval |
|------|--------------------|------------------|----------|
| Free | 60 | 60 | 1 minute |
| Pro I | 600 | 100 | 10 seconds |
| Pro II | 3,000 | 500 | 10 seconds |
| Pro III | 6,000 | 1,000 | 10 seconds |
| Pro IV | 30,000 | 5,000 | 10 seconds |

### Token Bucket

Token allocations are distributed to each bucket:
1. **Default Bucket** – used for all APIs except the Price API.
2. **Price API Bucket** – reserved exclusively for price requests.

:::note
- For example, Pro I = 500 tokens to Default Bucket and another 500 tokens to Price API Bucket.
- Each request consumes 1 token from the appropriate bucket.
- If the bucket is empty, a `429 Too Many Requests` response is returned.
- **Lite users** do not have a dedicated Price API bucket — all requests draw from the Default bucket.
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

| Executed Swap Volume (X period window) | Base + Bonus RPS | Tokens per 10s |
|-------------------------------------|------------------|----------------|
| $0 | 50 + 0 | 50 |
| $10,000 | 50 + 1 | 51 |
| $100,000 | 50 + 10 | 60 |
| $1,000,000 | 50 + 100 | 150 |

| Swap Volume | Tokens Allocated | Total Tokens | Per Period |
| --- | --- | --- | --- |
| $0 | 50 Base + 0 Added | 50 | 10 seconds |
| $10,000 | 50 Base + 1 Added | 51 | 10 seconds |
| $100,000 | 50 Base + 10 Added | 60 | 10 seconds |
| $1,000,000 | 50 Base + 100 Added | 150 | 10 seconds |

## Managing Rate Limits

If you receive a 429 response, you should:
1. Wait for your bucket to refill
2. Implement exponential backoff in your retry logic
3. **Upgrade your tier (Pro)** or **scale your Ultra usage** to unlock higher limits.

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

#### Does upgrade/downgrade/API Key applies immeidately?
- No, it will take 2-5 minutes for it to reflect.

#### What happens if I upgrade/downgrade my plan?
- Your rate limits will be adjusted to match your new plan tier immediately after the change.
