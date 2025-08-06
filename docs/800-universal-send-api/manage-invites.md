---
sidebar_label: "Manage Invites (Beta)"
description: "Use the Jupiter Universal Send API to manage invites."
title: "Manage Invites (Beta)"
---

<head>
    <title>Manage Invites (Beta)</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
- Lite URL: `https://lite-api.jup.ag/send/v1`
- Pro URL: `https://api.jup.ag/send/v1`

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

## Overview

1. Get pending invites.
2. Get invite history.

:::note
Both of the following endpoints only returns the invites that are set up by the sender and not from the perspective of the recipient.

- Pending invites: Invites created by the sender that are not yet expired and can be clawback/claimed.
- Invite history: Invites created by the sender and is either claimed, clawback, or expired. (You can also pass in a Recipient pubkey to get their history)
:::

:::tip
Depending on how you have set up to allow connection of wallets, either via [Jupiter Mobile Adapter](/docs/tool-kits/mobile-adapter) for QR code login, wallet extensions, or any other methods, you will need to handle the passing in of their pubkey to the API to get the necessary data.
:::

## Get Pending Invites

```jsx
const pendingInvites = await (
  await fetch(
    `https://lite-api.jup.ag/send/v1/pending-invites?address=${pubkey}`
  )
).json();
```

## Get Invite History

```jsx
const inviteHistory = await (
  await fetch(
    `https://lite-api.jup.ag/send/v1/invite-history?address=${pubkey}`
  )
).json();
```
