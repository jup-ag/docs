---
sidebar_label: "Cancel Order"
description: "Use the Jupiter Recurring API to cancel orders."
title: "Cancel Order"
---

<head>
    <title>Cancel Order</title>
    <meta name="twitter:card" content="summary" />
</head>

The root URL of the Recurring API's execute endpoint is as such.

```
https://api.jup.ag/recurring/v1/cancelOrder
```

## Cancel Order

If you want to cancel order(s), you need to do these steps:

1. Get a list of the order accounts you want to cancel via `/getRecurringOrders` endpoint.
2. Choose the order account to cancel by making a post request to the `/cancelOrder` endpoint to get the transaction to cancel the order.
3. Sign then send the transaction to the network either via `/execute` endpoint or by yourself.

:::info Get Recurring Orders
[Refer to the `/getRecurringOrders` section](/docs/recurring-api/get-recurring-orders) to prepare the list of order accounts you want to cancel.
:::

:::note
The `/cancelOrder` endpoint only supports 1 cancellation per transaction.
:::

```jsx
const cancelOrderResponse = await (
    await fetch('https://api.jup.ag/recurring/v1/cancelOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order: "4DWzP4TdTsuwvYMaMWrRqzya4UTFKFoVjfUWNWh8zhzd",
            user: wallet.publicKey.toBase58(),
            recurringType: "time",
        }),
    })
).json();
```

## Cancel Order Response

**Success Example Response**

```json
{
  "requestId": "36779346-ae51-41e9-97ce-8613c8c50553",
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAgORL7cu4ZNuxh1wI9W7GVURyr3A06dH348HDpIQzcAJ4oZOZHXAukWalAX/odOiV55UZa1ePBg8d2tRKQyqCjV6C/H8IQcrfZR4QeOJFykenP3QJznc6vNpqe2D57HTD7Gd1R4MYi595YUO8ViNwpWb17+Q9DxkVcz5fWpSqjtDyiji2RfCl7yoUfzkV42QPexQNFjBK5/+pJhV8QuWShN6r9vLZM5XJNS670dgAgf7wC+wCLLIFWHgjgWx32LJMnJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBkZv5SEXMv/srbpyw5vnvIzlu8X3EmssQ5s6QAAAAAabiFf+q4GE+2h/Y0YYwDXaxDncGus7VZig8AAAAAABBt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKmMlyWPTiSJ8bs9ECkUjg2DC1oTmdr/EIQEjnvY2+n4WbB1qAZjecpv43A3/wwo1VSm5NY22ehRjP5uuuk/Ujb+tSfUXWQOPsFfYV1bDiOlSpa4PwuCC/cGNfJDSsZAzATG+nrzvtutOj1l82qryXQxsbvkwtL24OR8pgIDRS9dYVCj/auTzJLgPke1v9c3puAy81rBYgsabmuLUTEQsZyVAwcABQL9WQEABwAJA0ANAwAAAAAADA0AAg0IAQQDBQYJCgsMCBYHIWKotyLz"
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

## Execute Cancel Order

To sign then send the transaction to the network to execute the cancellation, you can use the `/execute` endpoint or by yourself.

Refer to the [Execute Order](/docs/recurring-api/execute-order) section for more details.
