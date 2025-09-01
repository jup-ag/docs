---
sidebar_label: "Get Holdings"
description: "Request for detailed token holdings of an account including token account information"
title: "Get Holdings"
---

<head>
    <title>Get Holdings</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
Lite URL: `https://lite-api.jup.ag/ultra/v1/holdings`
Dynamic URL: `https://api.jup.ag/ultra/v1/holdings`

Dynamic Rate Limits are now applied to Ultra API.

- No Pro plans or payment needed.
- Simply generate the universal API Key via [Portal](https://portal.jup.ag)
- Rate limits scale together with your swap volume.

[Read more about Ultra API Dynamic Rate Limit](/docs/api-rate-limit).
:::

:::tip API Reference
To fully utilize the Ultra API, check out the [Ultra API Reference](/docs/api/ultra-api/holdings.api.mdx).
:::

## Get Holdings

The Ultra API supports a simple endpoint to get the detailed token holdings of an account, you just need to pass in the required parameter of the user's wallet address.

```jsx
const holdingsResponse = await (
  await fetch(`https://lite-api.jup.ag/ultra/v1/holdings/3X2LFoTQecbpqCR7G5tL1kczqBKurjKPHhKSZrJ4wgWc`)
).json();

console.log(JSON.stringify(holdingsResponse, null, 2));
```

## Holdings Response

The holdings response will return the following:
- A list of token holdings for the user's wallet address.
- Token account information for each token holding.

**Successful example response:**

```json
{
    "amount": "1000000000",
    "uiAmount": 1,
    "uiAmountString": "1",
    "tokens": {
        "jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v": [
            {
                "account": "tokenaccountaddress",
                "amount": "1000000000",
                "uiAmount": 1,
                "uiAmountString": "1",
                "isFrozen": false,
                "isAssociatedTokenAccount": true,
                "decimals": 9,
                "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            }
        ]
    }
}
```

**Failed example response:**

```json
{
  "error": "Invalid address"
}
```