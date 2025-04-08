---
sidebar_label: "Withdraw Price Order"
description: "Use the Jupiter Recurring API to withdraw price-based orders."
title: "Withdraw Price Order"
---

<head>
    <title>Withdraw Price Order</title>
    <meta name="twitter:card" content="summary" />
</head>



:::note
Base URL: `https://lite-api.jup.ag/recurring/v1/priceWithdraw`

For higher rate limits, [refer to the API Key Setup doc](/docs/api-setup).
:::

:::info
This will not close the order. To close the order, you need to use the [`/cancelOrder` endpoint](/docs/recurring-api/cancel-order).
:::

## Withdraw Order

If you want to withdraw funds from a price-based order, you need to do these steps:

1. Get a list of the order accounts you want to withdraw via `/getRecurringOrders` endpoint.
2. Choose the order account to deposit by making a post request to the `/priceDeposit` endpoint to get the transaction to deposit into the order.
3. Sign then send the transaction to the network either via `/execute` endpoint or by yourself.

:::info Get Recurring Orders
[Refer to the `/getRecurringOrders` section](/docs/recurring-api/get-recurring-orders) to prepare order account you want to withdraw from.
:::

:::warning
If you do not pass in `amount`, the transaction will be built to withdraw the full amount of the order.
:::

```jsx
const priceWithdrawResponse = await (
    await fetch('https://lite-api.jup.ag/recurring/v1/priceWithdraw', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order: "EpTsCUnKComCd8FDNZn3kVrQBQo2uEn5rRzYk9ocqFPH",
            user: wallet.publicKey.toBase58(),
            inputOrOutput: "In", // either "In" or "Out" mint, note that price-based orders auto withdraws the output tokens to the user's wallet every time the order is executed
            amount: 1000000
        }),
    })
).json();
```

## Withdraw Order Response

**Success Example Response**

```json
{
  "requestId": "cb1c0e03-8e4a-4f85-ac36-e353c7981f5b",
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAcNRL7cu4ZNuxh1wI9W7GVURyr3A06dH348HDpIQzcAJ4oHNtIX+MwRgQakd3fYovqoEXuKqaHTmdCmjuWoQiMiby7TSszpu+tgf+jdiEM5n3uMiCD/N3AS0uVWTp10QrcFd1R4MYi595YUO8ViNwpWb17+Q9DxkVcz5fWpSqjtDyjKhKdx27tkl2VPxhBBJcKx9gSuUqMJnrF2JWtuKPpRPM1Qmt8G5sH80c9QL+SQJRbRoHSG7z7KaEAztDAAXRb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBkZv5SEXMv/srbpyw5vnvIzlu8X3EmssQ5s6QAAAAAabiFf+q4GE+2h/Y0YYwDXaxDncGus7VZig8AAAAAABBt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKmMlyWPTiSJ8bs9ECkUjg2DC1oTmdr/EIQEjnvY2+n4Wcb6evO+2606PWXzaqvJdDGxu+TC0vbg5HymAgNFL11h22bCn6+jaw4yO0OzNgqgKrh+NYPQDG7Wi2D35hzKmzcjGx2VRtfxzpYauPv7ArfDDH2VHlwLKs45O0rZTboL4wMHAAUCnqwAAAcACQNADQMAAAAAAAEOAAAFCwgCAwEEBgkKDAEStxJGnJRtoSIBQEIPAAAAAAAA"
}
```

**Failed Example Response**

```json
{
  "code": 400,
  "error": "Failed to deserialize account data: failed to fill whole buffer",
  "status": "Bad Request"
}
```

## Execute Withdraw Order

To sign then send the transaction to the network to execute the withdrawal, you can use the `/execute` endpoint or by yourself.

Refer to the [Execute Order](/docs/recurring-api/execute-order) section for more details.
