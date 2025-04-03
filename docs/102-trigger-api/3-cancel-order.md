---
sidebar_label: "Cancel Order"
description: "Use the Jupiter Trigger API to cancel orders."
title: "Cancel Order"
---

<head>
    <title>Cancel Order</title>
    <meta name="twitter:card" content="summary" />
</head>

The root URL of the Trigger API's cancel order endpoint is as such.

```
https://api.jup.ag/trigger/v1/cancelOrder
```

If you want to cancel order(s), you need to do these steps:

1. Get a list of the order accounts you want to cancel via `/getTriggerOrders` endpoint.
2. Use the list of order accounts to make a post request to the `/cancelOrder` endpoint to get the transaction to cancel one or multiple orders.
3. Sign then send the transaction to the network either via `/execute` endpoint or by yourself.

:::info Get Trigger Orders
[Refer to the `/getTriggerOrders` section](/docs/trigger-api/get-trigger-orders) to prepare the list of order accounts you want to cancel.
:::

:::note
To cancel multiple orders, you can use the [`/cancelOrders` endpoint](#cancel-orders) to pass in a list of order accounts and it will build the transaction for multiple cancellations.
:::

## Cancel Order

```jsx
const cancelOrderResponse = await (
    await fetch('https://api.jup.ag/trigger/v1/cancelOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            maker: "jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3",
            computeUnitPrice: "auto",
            order: "3g2jF8txqXPp6GUStwtXMrWydeYWxU4qoBA8UDLoTnK7",
        })
    })
).json();
```

## Cancel Order Response

**Success Example Response**

```json
{
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAA......QYHAwUIX4Ht8Agx34Q=",
  "requestId": "370100dd-1a85-421b-9278-27f0961ae5f4",
}
```

**Failed Example Response**

```json
{
  "error": "no matching orders found",
  "code": 400
}
```

## Cancel Orders

:::warning
If no orders are specified, the API will return the transaction to cancel **ALL** open orders, batched in groups of 5 orders.
:::

:::tip
Orders are batched in groups of 5, if you have 6 orders to cancel, you will receive 2 transactions.

Do note that you will receive a list of transactions, so you will need to access each transaction in it to sign and send individually.

If using `/execute` endpoint, you should pass in the same `requestId` for the different transactions.
:::

```jsx
const cancelOrdersResponse = await (
    await fetch('https://api.jup.ag/trigger/v1/cancelOrders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            maker: "jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3",
            computeUnitPrice: "auto",
            orders: [
                "6fe8ByaiFHisjnYnH5qdpyiNtkn89mMBQUemRkVmKhro",
                "9jwzPKHxcrSozdrTYzPnTqy7psRvNGxaYUAiiyxwZKjj"
            ]
        })
    })
).json();
```

## Cancel Orders Response

**Success Example Response**

```json
{
  "transactions": [
    "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA......DHfhA0JAAAJBQ0ODwsNCF+B7fAIMd+EDQkAAAMCDQ4PCw0IX4Ht8Agx34Q=",
    "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA......a8lAwQABQLAqAAABAAJAy48AAAAAAAABQkAAAIBBQYHAwUIX4Ht8Agx34Q="
  ],
  "requestId": "370100dd-1a85-421b-9278-27f0961ae5f4",
}
```
