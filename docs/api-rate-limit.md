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

In this section, you can find the rate limiting details for the Jupiter API. The Jupiter API uses a token bucket rate limiting system that is applied on a per-account basis.

## API Hostnames

- For paid tiers with API Keys, use `api.jup.ag`
- For free tier, use `lite-api.jup.ag`

## Per Account Setup

Using the API Keys generated from the same account will share the same rate limit.

## Token Bucket Configuration

These are the token bucket configurations for each tier. Based on the tier, the token bucket will have different refill rates and refill delays.

For example, in Pro II, the token bucket will  start with 500 tokens and only refill 50 tokens every 1 second, with a capacity of 500 tokens at any given time, hence it is an estimate of 3,000 requests per minute.

| Tier | Request Per Minute | Initial Tokens | Capacity | Refill Rate | Refill Delay |
|------|--------------------|----------------|----------|-------------|--------------|
| Free | 60 | 60 | 60 | 60 | 1 minute |
| Pro I | 600 | 100 | 100 | 100 | 10 seconds |
| Pro II | 3000 | 500 | 500 | 50 | 1 second |
| Pro III | 6000 | 1000 | 100 | 100 | 1 second |
| Pro IV | 30000 | 5000 | 500 | 500 | 1 second |

**Different Buckets**

Each account has two separate token buckets and they share the same rules as stated in the table above.
1. The Default bucket is shared for all APIs except the Price API.
2. The Price API bucket is dedicated to the Price API and is separate from the Default bucket.

When you make an API request, a token is consumed from the appropriate bucket. If there are no tokens available, you'll receive a 429 (Too Many Requests) response.

**Token Refill**

The token buckets refill gradually over time at the rates specified above, up to their maximum capacity. This allows for bursts of activity while maintaining a sustainable average request rate.

:::note
For Pro I, you can see that it refills more tokens at once but has a longer refill delay, this will allow for more bursts of requests but at a slower rate.
:::

## Managing Rate Limits

If you receive a 429 response, you should:
1. Wait for your bucket to refill
2. Implement exponential backoff in your retry logic
3. Consider upgrading to a higher tier if you consistently hit rate limits

:::caution
If you decide to spam or burst more than your allocated rate limit, the initial requests will be go through but the subsequent requests will be blocked even after the minute/expected refill.
:::
