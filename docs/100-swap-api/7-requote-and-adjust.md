---
sidebar_label: "Requote and Adjust"
description: "Requote and adjust via the Swap API."
title: "Requote and Adjust"
---

<head>
    <title>Requote and Adjust</title>
    <meta name="twitter:card" content="summary" />
</head>

In some cases where you might be limited or require strict control over the swap, you might want to retry to get a better quote/outcome.

:::note In cases like
- Limited transaction size, requoting with lower `maxAccounts` to be able to fit in the transaction size limit.
:::

## Example Code

- get quote should start with higher max accounts
- get quote
- if simulation fails, retry quote with lower max accounts
- if simulation succeeds, send transaction