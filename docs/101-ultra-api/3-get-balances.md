---
sidebar_label: "Get Balances"
description: "Request for token balances of an account."
title: "Get Balances"
---

<head>
    <title>Get Balances</title>
    <meta name="twitter:card" content="summary" />
</head>



:::note
Base URL: `https://lite-api.jup.ag/ultra/v1/balances`

For higher rate limits, [refer to the API Key Setup doc](/docs/api-setup).
:::

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