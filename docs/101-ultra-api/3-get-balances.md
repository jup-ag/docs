---
sidebar_label: "Get Balances (Deprecated)"
description: "Request for token balances of an account."
title: "Get Balances"
---

<head>
    <title>Get Balances</title>
    <meta name="twitter:card" content="summary" />
</head>

:::warning
This Ultra endpoint is deprecated and will be removed in the future. Please use the [Get Holdings](/docs/ultra-api/get-holdings) endpoint instead.
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