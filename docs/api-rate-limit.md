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

## Rate Limiting

The Jupiter API has a rate limit of 100 requests per minute. If you exceed this limit, you will get a 429 response.

- share about the token bucket based, account based
- more accurate to quantify per minute rather than per second
- outline the quota config - default (all apis) and price api (separate) - so a default token bucket and a price api token bucket
- outline of current rate limit tiers, and their refill rate
- cooldown period or method
