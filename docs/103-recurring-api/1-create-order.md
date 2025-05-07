---
description: "Use the Jupiter Recurring API to create orders."
title: "Create Order"
---

<head>
    <title>Create Order</title>
    <meta name="twitter:card" content="summary" />
</head>



:::note
Base URL: `https://lite-api.jup.ag/recurring/v1/createOrder`

For higher rate limits, [refer to the API Key Setup doc](/docs/api-setup).
:::

## Create Order

This is a POST request to `/createOrder` endpoint, where you pass in the necessary parameters and our backend will create the transaction for you to sign and send to the network seamlessly.

:::info
The Recurring API supports both Time-based and Price-based strategies.

The `createOrder` endpoint is used to create both types of orders based on the parameters you pass in.
:::

### Time-based Order

Pass in the **`time`** object in the `params` field.

:::note
Some notes to help you understand the parameters.

- The amount to be spent per cycle is calculated based on your input amount and the total number of orders.
```
Amount to be spent per cycle = inAmount / numberOfOrders
e.g. 1_000 USDC / 10 orders = 100 USDC per order
```

- The total time to complete is definite as the amount to be spent per cycle is fixed.
```
Total time to complete = numberOfOrders * interval
e.g. 10 orders * 86_400 seconds = 864_000 seconds = 10 days
```
:::

```jsx
const createOrderResponse = await (
    await fetch('https://lite-api.jup.ag/recurring/v1/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: wallet.publicKey,
            inputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            outputMint: "So11111111111111111111111111111111111111112",
            params: {
                time: {
                    inAmount: 104000000, // Raw amount of input token to deposit now (before decimals)
                    numberOfOrders: 2, // Total number of orders to execute
                    interval: 86400, // Time between each order in unix seconds
                    minPrice: null, // Minimum price or null
                    maxPrice: null, // Maximum price or null
                    startAt: null, // Unix timestamp of start time or null - null starts immediately
                },
            },
        }),
    })
).json();
```

### Price-based Order

Pass in the **`price`** object in the `params` field.

:::note
Some notes to help you understand the parameters.

- Price-based orders are opened indefinitely until the user closes them.
- Once low on funds, the order will not be closed and can continue to execute if the user deposits more into the order. Refer to the [Deposit Price Order](/docs/recurring-api/deposit-price-order) endpoint to deposit more funds into the order.
- Alternatively, the user can also withdraw funds from the order without closing it. Refer to the [Withdraw Price Order](/docs/recurring-api/withdraw-price-order) endpoint to withdraw funds from the order.
- Do note that the price-based orders auto withdraws the output tokens to the user's wallet every time the order is executed.
- The total time to use up all funds is not definite as the amount to be spent per cycle is variable based on the USDC value of the input token.
:::

```jsx
const createOrderResponse = await (
    await fetch('https://lite-api.jup.ag/recurring/v1/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: wallet.publicKey,
            inputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            outputMint: "So11111111111111111111111111111111111111112",
            params: {
                price: {
                    depositAmount: 110000000, // Raw amount of input token to deposit now (before decimals)
                    incrementUsdcValue: 10000000, // Raw amount of USDC to increment per cycle (before decimals)
                    interval: 86400, // Time between each cycle in unix seconds
                    startAt: null, // Unix timestamp of start time or null - null starts immediately
                },
            },
        }),
    })
).json();
```

Now that you have the order transaction, you can sign and send to the network. There are 2 methods, after signing the transaction, you can either send it to the network yourself or use the Recurring API's `/execute` endpoint to do it for you.

[Let's execute the order](/docs/recurring-api/execute-order)!

## Create Order Response

The response from the `createOrder` endpoint is as follows.

:::info
Do note that both time-based and price-based orders will return the same response structure.
:::

**Successful Example Response**

```json
{
  "requestId": "1d1f3586-eb72-4337-8c7e-1bbb9870ee4b",
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAgNRL7cu4ZNuxh1wI9W7GVURyr3A06dH348HDpIQzcAJ4o8bJlCl2Wc6MzpcvkV0INcJ7u23GV89soNJ/8i5QPLuk+NOvCjbAbTzOyNoSWuhO5fYq+hNGrGQ2JdDy82Gw0bv28tkzlck1LrvR2ACB/vAL7AIssgVYeCOBbHfYskycnT/icRrhr4nbjk0DzDqAkM4ntju8NXHrILEpE0TUKNKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwZGb+UhFzL/7K26csOb57yM5bvF9xJrLEObOkAAAAAGm4hX/quBhPtof2NGGMA12sQ53BrrO1WYoPAAAAAAAQbd9uHXZaGT2cvhRs7reawctIXtX1s3kTqM9YV+/wCpjJclj04kifG7PRApFI4NgwtaE5na/xCEBI572Nvp+FmwdagGY3nKb+NwN/8MKNVUpuTWNtnoUYz+brrpP1I2/rUn1F1kDj7BX2FdWw4jpUqWuD8Lggv3BjXyQ0rGQMwExvp6877brTo9ZfNqq8l0MbG75MLS9uDkfKYCA0UvXWG7njQ5EK9zaEM059+IQanso4m+YzpvFchLCtBxOCdR5QcGAAUCGSwAAAYACQNADQMAAAAAAAkGAAMABwUIAQEFAgADDAIAAAAAwusLAAAAAAgBAwERCw0EAAAHDAMBAgUICQoLK453K22iNAuxgF7IZwAAAAAAwusLAAAAAADh9QUAAAAALAEAAAAAAAAAAAAIBAMAAAABCQ=="
}
```

**Failed Example Response**

```json
{
  "code": 400,
  "error": "Order is valued at 2.99 USDC, minimum is 100.00 USDC",
  "status": "Bad Request"
}
```
