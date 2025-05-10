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

For higher rate limits, please reach out to us in [Discord](https://discord.gg/jup).

Portal API keys currently do not apply for Ultra API.
:::

:::tip API Reference
To fully utilize the Ultra API, check out the [Ultra API Reference](/docs/api/ultra-api/shield.api.mdx).
:::

## Get Shield

The Ultra API supports a simple endpoint to get the token information and warnings of mints, you just need to pass in the required parameter of the mints.

This is useful when integrating with Jupiter Ultra or any other APIs, allowing you or your user to be informed of any potential malicious mints before conducting your transaction.

```jsx
const shieldResponse = await (
  await fetch(`https://lite-api.jup.ag/ultra/v1/shield?mints=So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v,DocTwz3QhCgKy1CJJMruEAFEG51pump`)
).json();
```

## Shield Response

The shield response will return a list of token information and warnings of mints.

**Successful example response:**

```json
{
  "warnings": {
    "DocTwz3QhCgKy1CJJMruEAFEG5xTGsdfgfdgoC43vPMkC41pump": [
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
