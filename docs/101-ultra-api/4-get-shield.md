---
sidebar_label: "Get Shield"
description: "Request for token information and warnings of mints."
title: "Get Shield"
---

<head>
    <title>Get Shield</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
Base URL: `https://lite-api.jup.ag/ultra/v1/shield`

For higher rate limits, [refer to the API Key Setup doc](/docs/api-setup).
:::

:::tip API Reference
To fully utilize the Ultra API, check out the [Ultra API Reference](/docs/api/ultra-api/shield.api.mdx).
:::

## Get Shield

The Ultra API supports a simple endpoint to get the token information and warnings of mints, you just need to pass in the required parameter of the mints.

This is useful when integrating with Jupiter Ultra or any other APIs, allowing you or your user to be informed of any potential malicious mints before conducting your transaction.

```jsx
const shieldResponse = await (
  await fetch(`https://lite-api.jup.ag/ultra/v1/shield?mints=So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`)
).json();
```

## Shield Response

The shield response will return a list of token information and warnings of mints.

**Successful example response:**

```json
{
  "warnings": {
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": [
      {
        "type": "HAS_MINT_AUTHORITY",
        "message": "This token has a mint authority"
      },
      {
        "type": "HAS_FREEZE_AUTHORITY",
        "message": "This token has a freeze authority"
      }
    ],
    "So11111111111111111111111111111111111111112": []
  }
}
```
