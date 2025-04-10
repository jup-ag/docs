---
sidebar_label: "Get Recurring Orders"
description: "Use the Jupiter Recurring API to get both active or historical recurring orders."
title: "Get Recurring Orders"
---

<head>
    <title>Get Recurring Orders</title>
    <meta name="twitter:card" content="summary" />
</head>



:::note
Base URL: `https://lite-api.jup.ag/recurring/v1/getRecurringOrders`

For higher rate limits, [refer to the API Key Setup doc](/docs/api-setup).
:::

This is a GET request to `/getRecurringOrders` endpoint. The response is paginated for every 10 orders and you can view different pages using the `page` parameter.

## Get Recurring Orders

:::note
- orderStatus can be either `active` or `history`
- recurringType can be either `time` or `price` or `all`
- includeFailedTx can be either `true` or `false`
:::

## Active Orders

To get the active orders, you can pass in the `orderStatus` parameter as `active`.

:::tip
You can optionally pass in the input and output token mint addresses to filter the open orders.
:::

```jsx
const openOrdersResponse = await (
    await fetch(
        'https://lite-api.jup.ag/recurring/v1/getRecurringOrders?user=replaceWithPublicKey&orderStatus=active&recurringType=time'
    )
).json();
```

## Order History

To get the order history, you can pass in the `orderStatus` parameter as `history`.

```jsx
const orderHistoryResponse = await (
    await fetch(
        'https://lite-api.jup.ag/recurring/v1/getRecurringOrders?user=replaceWithPublicKey&orderStatus=history&recurringType=price'
    )
).json();
```
