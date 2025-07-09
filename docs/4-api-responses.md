---
sidebar_label: "API Responses"
description: "API responses for the Jupiter API."
title: "API Responses"
displayed_sidebar: docs
---

<head>
    <title>API Responses</title>
    <meta name="twitter:card" content="summary" />
</head>

In this section, you can find the list of responses that can be returned by the Jupiter API.

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

:::info Program Errors
For more information on error codes from programs, see the [Swap API - Common Errors](/docs/swap-api/common-errors).
:::

| Common Codes | Description | Debug |
| --- | --- | --- |
| 200 | Good | Success! |
| 400 | Bad Request | Likely a problem with the request, check the request parameters, syntax, etc. |
| 401 | Unauthorized | Likely a problem with the API key, check if the API key is correct. |
| 404 | Not Found | Likely a broken or invalid endpoint. |
| 429 | Rate Limited | You are being rate limited. Either slow down requests, reduce bursts, or upgrade your plan. |
| 500 | Internal Server Error | Please reach out in [Discord](https://discord.gg/jup). |
| 502 | Bad Gateway | Please reach out in [Discord](https://discord.gg/jup). |
| 503 | Service Unavailable | Please reach out in [Discord](https://discord.gg/jup). |
| 504 | Gateway Timeout | Please reach out in [Discord](https://discord.gg/jup). |
