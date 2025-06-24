---
sidebar_label: "Get Trigger Orders"
description: "Use the Jupiter Trigger API to get trigger orders."
title: "Get Trigger Orders"
---

<head>
    <title>Get Trigger Orders</title>
    <meta name="twitter:card" content="summary" />
</head>



:::note
- Lite URL: `https://lite-api.jup.ag/trigger/v1/getTriggerOrders`
- Pro URL: `https://api.jup.ag/trigger/v1/getTriggerOrders`

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

This is a GET request to `/getTriggerOrders` endpoint.

The response is paginated for every 10 orders and you can view different pages using the `page` parameter. The `hasMoreData` boolean will indicate if you have more data in the next page.

:::warning Change of Response Format
The `/getTriggerOrders` endpoint does not provide the same data format as the old `orderHistory` or `openOrders` endpoint.
:::

## Active Orders

To get the active orders, you can pass in the `orderStatus` parameter as `active`.

:::tip
You can optionally pass in the input and output token mint addresses to filter the open orders.
:::

```jsx
const openOrdersResponse = await (
    await fetch(
        'https://lite-api.jup.ag/trigger/v1/getTriggerOrders?user=jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3&orderStatus=active'
    )
).json();
```

## Order History

To get the order history, you can pass in the `orderStatus` parameter as `history`.

```jsx
const orderHistoryResponse = await (
    await fetch(
        'https://lite-api.jup.ag/trigger/v1/getTriggerOrders?user=ErJKdNoarixqGGQTHbBtvHtg2nkcCqcKtYjGbVKUxY7D&orderStatus=history'
    )
).json();
```
