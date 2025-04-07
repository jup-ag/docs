---
sidebar_label: "Get Balances"
description: "Request for token balances of an account."
title: "Get Balances"
---

<head>
    <title>Get Balances</title>
    <meta name="twitter:card" content="summary" />
</head>

The root URL of the Ultra API's order endpoint is as such.

```
For paid tiers with API Keys, use `https://api.jup.ag/ultra/v1/balances`

For free tier, use `https://lite-api.jup.ag/ultra/v1/balances`
```

:::tip API Reference
To fully utilize the Ultra API, check out the [Ultra API Reference](/docs/api/ultra-api/balances.api.mdx).
:::

## Get Balances

The Ultra API supports a simple endpoint to get the token balances of an account, you just need to pass in the required parameter of the user's wallet address.

```jsx
const balancesResponse = await (
  await fetch(`https://lite-api.jup.ag/ultra/v1/balances/3X2LFoTQecbpqCR7G5tL1kczqBKurjKPHhKSZrJ4wgWc`)
).json();

console.log(JSON.stringify(balancesResponse, null, 2));
```

## Balances Response

The balances response will return a list of token balances for the user's wallet address.

**Successful example response:**

```json
{
  "SOL": {
    "amount": "0",
    "uiAmount": 0,
    "slot": 324307186,
    "isFrozen": false
  }
}
```

**Failed example response:**

```json
{
  "error": "Invalid address"
}
```