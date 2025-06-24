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
**Hostnames**
- For paid tiers with API Keys, use `api.jup.ag`
- For free tier, use `lite-api.jup.ag` (NO API Key required)

**API Key**
Simply add the API Key in the `x-api-key` field in the Headers.

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
