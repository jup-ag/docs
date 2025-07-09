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

:::note API Usage
| Type | API Key | Rate Limit | Cost | URL |
| --- | --- | --- | --- | --- |
| Lite | No | Fixed at 60 RPM | Free | `lite-api.jup.ag` |
| Dynamic | Yes | Scales with swap volume | [Ultra Swap Fees](/docs/ultra-api/add-fees-to-ultra) | `api.jup.ag/ultra` |
| Pro | Yes | Tier-based | [Dependent on tier](/docs/api-rate-limit#token-configuration) | `api.jup.ag` |

```js
headers: {
    'Content-Type': 'application/json',
    'x-api-key': '' // enter api key here
},
```
:::

## Rate Limit Configuration

| Note | Description |
| --- | --- |
| Dynamic Rate Limit only applies to Ultra API. | Lite Rate Limit is default and free for all using `lite-api.jup.ag`.<br/>Pro Rate Limit requires additional payment depending on the tier. |
| API keys are universal and can be used with any of our APIs. | You can use the same API Key for Ultra API (Dynamic Rate Limit) and all other APIs (Lite/Pro Rate Limit). |
| Rate limits apply on a per account basis, not to individual API keys. | Your API Key 1 and API Key 2 share the same rate limit. |

![API Key](/dev/universal_api_key.png)

## Token Configuration

These are the token configurations for each tier. Based on the tier, the amount of tokens allocated per period are different.

For example, in Pro II, you will be allocated 500 tokens every 10 seconds, which is approximately 3,000 requests per minute.

| Tier | Request Per Minute | Tokens Allocated | Per Period |
|------|--------------------|------------------|------------|
| Free | 60 | 60 | 1 minute |
| Pro I | 600 | 100 | 10 seconds |
| Pro II | 3,000 | 500 | 10 seconds |
| Pro III | 6,000 | 1,000 | 10 seconds |
| Pro IV | 30,000 | 5,000 | 10 seconds |

**Buckets**

Each account has two separate token buckets and they share the same rules as stated in the table above.
1. The Default bucket is shared for all APIs except the Price API.
2. The Price API bucket is dedicated to the Price API and is separate from the Default bucket.

When you make an API request, a token is consumed from the appropriate bucket. If there are no tokens available in the bucket, you'll receive a 429 (Too Many Requests) response.

:::note
The free tier does not have a dedicated Price API bucket, all requests will be consumed from the same Default bucket.
:::

## Managing Rate Limits

If you receive a 429 response, you should:
1. Wait for your bucket to refill
2. Implement exponential backoff in your retry logic
3. Consider upgrading to a higher tier if you consistently hit rate limits

:::caution
If you decide to spam or burst more than your allocated rate limit, the initial requests will be go through but the subsequent requests will be blocked even after the minute/expected refill.
:::
