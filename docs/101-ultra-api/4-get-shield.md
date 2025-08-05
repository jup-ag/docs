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
Lite URL: `https://lite-api.jup.ag/ultra/v1/shield`
Dynamic URL: `https://api.jup.ag/ultra/v1/shield`

Dynamic Rate Limits are now applied to Ultra API.

- No Pro plans or payment needed.
- Simply generate the universal API Key via [Portal](https://portal.jup.ag)
- Rate limits scale together with your swap volume.

[Read more about Ultra API Dynamic Rate Limit](/docs/api-rate-limit).
:::

:::tip API Reference
To fully utilize the Ultra API, check out the [Ultra API Reference](/docs/api/ultra-api/shield.api.mdx).
:::

## Get Shield

The Ultra API provides an endpoint to retrieve token information and associated warnings for the specified mint addresses. To use this endpoint, provide one or more mint addresses for the required query parameter named mints.

This is useful when integrating with Jupiter Ultra or any other APIs, allowing you or your user to be informed of any potential malicious mints before conducting your transaction.

```jsx
const shieldResponse = await (
  await fetch(`https://lite-api.jup.ag/ultra/v1/shield?mints=So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v,someTokenAddressForEducationalPurposes`)
).json();
```

## Shield Response

The shield response will return a list of objects, containing the token information and warnings of the mints passed in.

Do note that this is subject to changes, and we will be adding more warnings and improving the accuracy of the warnings over time.

For the full list of potential warnings, refer to the [Shield API Reference](/docs/api/ultra-api/shield).

**Successful example response:**

```json
{
  "warnings": {
    "someTokenAddressForEducationalPurposes": [
      {
        "type": "NOT_VERIFIED",
        "message": "This token is not verified, make sure the mint address is correct before trading",
        "severity": "info"
      },
      {
        "type": "LOW_ORGANIC_ACTIVITY",
        "message": "This token has low organic activity",
        "severity": "info"
      },
      {
        "type": "NEW_LISTING",
        "message": "This token is newly listed",
        "severity": "info"
      }
    ],
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": [
      {
        "type": "HAS_FREEZE_AUTHORITY",
        "message": "The authority's owner has the ability to freeze your token account, preventing you from further trading",
        "severity": "warning"
      },
      {
        "type": "HAS_MINT_AUTHORITY",
        "message": "The authority's owner has the ability to mint more tokens",
        "severity": "info"
      }
    ],
    "So11111111111111111111111111111111111111112": []
  }
}
```
