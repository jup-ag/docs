---
sidebar_label: "Deposit Price Order"
description: "Use the Jupiter Recurring API to deposit price-based orders."
title: "Deposit Price Order"
---

<head>
    <title>Deposit Price Order</title>
    <meta name="twitter:card" content="summary" />
</head>



:::note
Base URL: `https://lite-api.jup.ag/recurring/v1/priceDeposit`

For higher rate limits, [refer to the API Key Setup doc](/docs/api-setup).
:::

:::info
As the price-based order is opened indefinitely until the user closes them, the user can deposit more funds into the order to continue executing.
:::

## Deposit Order

If you want to deposit funds into a price-based order, you need to do these steps:

1. Get a list of the order accounts you want to deposit via `/getRecurringOrders` endpoint.
2. Choose the order account to deposit by making a post request to the `/priceDeposit` endpoint to get the transaction to deposit into the order.
3. Sign then send the transaction to the network either via `/execute` endpoint or by yourself.

:::info Get Recurring Orders
[Refer to the `/getRecurringOrders` section](/docs/recurring-api/get-recurring-orders) to prepare the order account you want to deposit into.
:::

```jsx
const priceDepositResponse = await (
    await fetch('https://lite-api.jup.ag/recurring/v1/priceDeposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order: "EpTsCUnKComCd8FDNZn3kVrQBQo2uEn5rRzYk9ocqFPH",
            user: wallet.publicKey,
            amount: 1000000
        }),
    })
).json();
```

## Deposit Order Response

**Success Example Response**

```json
{
  "requestId": "cbc021a6-8a61-49cd-8c5a-9ea29fc2dd4d",
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAcLRL7cu4ZNuxh1wI9W7GVURyr3A06dH348HDpIQzcAJ4ou00rM6bvrYH/o3YhDOZ97jIgg/zdwEtLlVk6ddEK3BXdUeDGIufeWFDvFYjcKVm9e/kPQ8ZFXM+X1qUqo7Q8ozVCa3wbmwfzRz1Av5JAlFtGgdIbvPspoQDO0MABdFvQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMGRm/lIRcy/+ytunLDm+e8jOW7xfcSayxDmzpAAAAABt324ddloZPZy+FGzut5rBy0he1fWzeROoz1hX7/AKkHNtIX+MwRgQakd3fYovqoEXuKqaHTmdCmjuWoQiMib4yXJY9OJInxuz0QKRSODYMLWhOZ2v8QhASOe9jb6fhZxvp6877brTo9ZfNqq8l0MbG75MLS9uDkfKYCA0UvXWHbZsKfr6NrDjI7Q7M2CqAquH41g9AMbtaLYPfmHMqbN3la+2QyLhVSaIunpVo3X8k4VAEj0cBT/ANSk2IKq9g1BAUABQL3nQAABQAJA0ANAwAAAAAACAYAAgAJBAYBAQcIAAMJAQIGCgcQ8iPGiVLh8rZAQg8AAAAAAA=="
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

## Execute Deposit Order

To sign then send the transaction to the network to execute the deposit, you can use the `/execute` endpoint or by yourself.

Refer to the [Execute Order](/docs/recurring-api/execute-order) section for more details.
