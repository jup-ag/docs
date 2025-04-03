---
description: "Use the Jupiter Trigger API to create orders."
title: "Create Order"
---

<head>
    <title>Create Order</title>
    <meta name="twitter:card" content="summary" />
</head>

:::warning New Paths
The `/limit/v2` path will be deprecated soon, please update your API calls to use the `/trigger/v1` path immediately.

When updating to the new path, please refer to the documentation as there are some breaking changes.
- `/execute` endpoint is introduced.
- `/createOrder` endpoint now includes an additional `requestId` parameter to be used with the `/execute` endpoint.
- `/cancelOrder` endpoint only builds the transaction for 1 order, while `/cancelOrders` endpoint builds the transaction for multiple orders.
- The `tx` field in the responses are now `transaction` or `transactions`.
- `/getTriggerOrders` endpoint is introduced to get either active or historical orders (based on the query parameters) in a new format.
:::

The root URL of the Trigger API's create order endpoint is as such.

```
https://api.jup.ag/trigger/v1/createOrder
```

## Create Order

This is a POST request to `/createOrder` endpoint, where you pass in the necessary parameters and our backend will create the transaction for you to sign and send to the network seamlessly.

:::tip Optional Parameters
Do note that there are a few optional parameters that you can use, such as:

- Setting an expiry date on the order.
- Adding fees through our referral program, please ensure that your `feeAccount` has the necessary `referralTokenAccount`s of the output mint of the limit order for it to work, you can learn more about creating them dynamically in the [Add Fees To Swap](../100-swap-api/4-add-fees-to-swap.md) guide.
:::

#### Create a POST request to the `/createOrder` endpoint.

```jsx
const createOrderResponse = await (
    await fetch('https://api.jup.ag/trigger/v1/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inputMint: inputMint.toString(),
            outputMint: outputMint.toString(),
            maker: "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
            payer: "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
            params: {
                makingAmount: "1000000",
                takingAmount: "300000",
                // expiredAt: "", // In unix seconds (e.g. Date.now()/1_000) or optional
                // feeBps: "", // Requires referral account or optional
            },
            computeUnitPrice: "auto",
            // feeAccount: "", // Optional but if specified it is the referral token account of the output mint
            // wrapAndUnwrapSol: true, // Default true or optional
        })
    })
).json();

console.log(createOrderResponse);
```

Now that you have the order transaction, you can sign and send to the network. There are 2 methods, after signing the transaction, you can either send it to the network yourself or use the Trigger API's `/execute` endpoint to do it for you.

[Let's execute the order](/docs/trigger-api/execute-order)

## Create Order Response

**Success Example Response**

```json
{
  "order": "CFG9Bmppz7eZbna96UizACJPYT3UgVgps3KkMNNo6P4k",
  "transaction": "AQAAAAAAAAAAAAAAAAAAAAAA......AgAKCAkBAQsPAAADBAEMCwcKCQkIBg0LIoVuSq9wn/WfdskdmHlfUulAQg8AAAAAAICpAwAAAAAAAAAJAwEAAAEJAA==",
  "requestId": "370100dd-1a85-421b-9278-27f0961ae5f4"
}
```

**Failed Example Response**

```json
{
  "error": "invalid create order request",
  "cause": "input mint making amount must be at least 5 USD, received: 2",
  "code": 400
}
```
