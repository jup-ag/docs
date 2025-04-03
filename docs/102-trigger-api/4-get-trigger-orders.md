---
sidebar_label: "Get Trigger Orders"
description: "Use the Jupiter Trigger API to get trigger orders."
title: "Get Trigger Orders"
---

<head>
    <title>Get Trigger Orders</title>
    <meta name="twitter:card" content="summary" />
</head>

The root URL of the Trigger API's get trigger orders endpoint is as such.

```
https://api.jup.ag/trigger/v1/getTriggerOrders
```

This is a GET request to `/getTriggerOrders` endpoint.

The response is paginated for every 10 orders and you can view different pages using the `page` parameter. The `hasMoreData` boolean will indicate if you have more data in the next page.

:::warning Change of Response Format
The `/getTriggerOrders` endpoint does not provide the same data format as `orderHistory` or `openOrders` endpoint.
:::

## Active Orders

To get the active orders, you can pass in the `orderStatus` parameter as `active`.

:::tip
You can optionally pass in the input and output token mint addresses to filter the open orders.
:::

```jsx
const openOrdersResponse = await (
    await fetch(
        'https://api.jup.ag/trigger/v1/getTriggerOrders?user=devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4&orderStatus=active'
    )
).json();
```

## Active Orders Response

```json
{
  "orders": [
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "3kmsJAquwE5in9dcn4hZN1mj7NqGnqXHACG5pa1H7dPZ",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "makingAmount": "0.05",
      "takingAmount": "100",
      "remainingMakingAmount": "0.05",
      "remainingTakingAmount": "100",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "100000000",
      "rawRemainingMakingAmount": "50000000",
      "rawRemainingTakingAmount": "100000000",
      "expiredAt": null,
      "createdAt": "2025-03-16T22:05:20Z",
      "updatedAt": "2025-03-16T22:05:20Z",
      "status": "Open",
      "openTx": "3kNgCnP13EVK2qVbcYspivwoYeyXBzQRg4PhnTYQ1jr78tey6JT9bi4gT3tTrj8JfhMnkdeH836hHSyPjpE4K9Xy",
      "closeTx": "",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": []
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "3YvKGGE9nsT5mHM9BB6LyvDjWwjowHxbWDTtJE5cknn7",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "makingAmount": "0.05",
      "takingAmount": "100",
      "remainingMakingAmount": "0.05",
      "remainingTakingAmount": "100",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "100000000",
      "rawRemainingMakingAmount": "50000000",
      "rawRemainingTakingAmount": "100000000",
      "expiredAt": null,
      "createdAt": "2025-03-16T22:05:08Z",
      "updatedAt": "2025-03-16T22:05:08Z",
      "status": "Open",
      "openTx": "52HB63fa2GKvQZxTjM3Jh4Z4WpVjg9RL47BnJwf5ATGo4Y5RcGWdzkizerAJTf71ZGqM4UYUenKbe3txSaxaKK38",
      "closeTx": "",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": []
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "7K9TjUq5nRzivHYV6XZ8D7fDvF5cJvPQGR24w6Ezsr2s",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "makingAmount": "0.05",
      "takingAmount": "100",
      "remainingMakingAmount": "0.05",
      "remainingTakingAmount": "100",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "100000000",
      "rawRemainingMakingAmount": "50000000",
      "rawRemainingTakingAmount": "100000000",
      "expiredAt": null,
      "createdAt": "2025-03-16T22:05:00Z",
      "updatedAt": "2025-03-16T22:05:00Z",
      "status": "Open",
      "openTx": "5Cx8ejo6RTVJcHCWQwZVQ8U1WYQwTr6SXHQznVSDahvUDeVUjpwW6d8b95fCb6bq3hdQW64VZpeMFU4JjNypHcQu",
      "closeTx": "",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": []
    }
  ],
  "totalPages": 1,
  "page": 1,
  "user": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
  "orderStatus": "active"
}
```

## Order History

To get the order history, you can pass in the `orderStatus` parameter as `history`.

```jsx
const orderHistoryResponse = await (
    await fetch(
        'https://api.jup.ag/trigger/v1/getTriggerOrders?user=ErJKdNoarixqGGQTHbBtvHtg2nkcCqcKtYjGbVKUxY7D&orderStatus=history'
    )
).json();
```

## Order History Response

```json
{
  "orders": [
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "99uWTWukow8k7dqcpbYoHxTAWGvn1YkT1VMmnEeTjuDr",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "makingAmount": "0.05",
      "takingAmount": "32.071840924",
      "remainingMakingAmount": "0",
      "remainingTakingAmount": "0",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "32071840924",
      "rawRemainingMakingAmount": "0",
      "rawRemainingTakingAmount": "0",
      "expiredAt": null,
      "createdAt": "2025-03-17T08:07:25Z",
      "updatedAt": "2025-03-17T08:09:37Z",
      "status": "Completed",
      "openTx": "466G3XxE4NzxCj136SXe4BSjXzCVBQdvn6RsHMNGN2DGCS9PSceJSACqEWCxx22hsCXcEskvEFdm44wsHCF1auvL",
      "closeTx": "3PDo3pMJLqvAfNXwYjY7BSP57ZNQ5DgYDeK6xYszUVMneHzAZBQzsBSskym8uveMoLC4G8N8DjPaLBY726ZsBZvT",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": [
        {
          "orderKey": "99uWTWukow8k7dqcpbYoHxTAWGvn1YkT1VMmnEeTjuDr",
          "keeper": "j1oAbxxiDUWvoHxEDhWE7THLjEkDQW2cSHYn2vttxTF",
          "inputMint": "So11111111111111111111111111111111111111112",
          "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
          "inputAmount": "0.05",
          "outputAmount": "32.071840924",
          "rawInputAmount": "50000000",
          "rawOutputAmount": "32071840924",
          "feeMint": "DtL4JtjXwsJQndqXyd6ytJSmWDLWLESoXc7MkYNRQF9J",
          "feeAmount": "0",
          "rawFeeAmount": "0",
          "txId": "3PDo3pMJLqvAfNXwYjY7BSP57ZNQ5DgYDeK6xYszUVMneHzAZBQzsBSskym8uveMoLC4G8N8DjPaLBY726ZsBZvT",
          "confirmedAt": "2025-03-17T08:09:37Z",
          "action": "Fill",
          "productMeta": null
        }
      ]
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "HxYetV9XeMfJn62rX34WUohF7ALxa51kfdZXAtfGF3Z4",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "makingAmount": "0.5",
      "takingAmount": "320.718409237",
      "remainingMakingAmount": "0.5",
      "remainingTakingAmount": "320.718409237",
      "rawMakingAmount": "500000000",
      "rawTakingAmount": "320718409237",
      "rawRemainingMakingAmount": "500000000",
      "rawRemainingTakingAmount": "320718409237",
      "expiredAt": null,
      "createdAt": "2025-03-17T08:06:50Z",
      "updatedAt": "2025-03-17T08:07:09Z",
      "status": "Cancelled",
      "openTx": "3dfFb3xhwUAAUnp5iJ7PsYmT84Vtz8gBVmRpNSDV3ev6yGVrhixS4P3giM9xzHmSsmC8WacCbewxyHAqFwfddetY",
      "closeTx": "UikEA3SGuAwMh3zzYi6fUTnfZ99URRQ1w5nMxLcRbFuQWTiH1Vge6WvXKPwixPmWJZonrJQcbRGH7SPR5mwvWDT",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": []
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "2BwoyZyWr1kkf5VJ2QQttMqnxSFECZLT6Ym7VhPYKDwy",
      "inputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "outputMint": "So11111111111111111111111111111111111111112",
      "makingAmount": "120.8527972",
      "takingAmount": "0.187321836",
      "remainingMakingAmount": "0",
      "remainingTakingAmount": "0",
      "rawMakingAmount": "120852797200",
      "rawTakingAmount": "187321836",
      "rawRemainingMakingAmount": "0",
      "rawRemainingTakingAmount": "0",
      "expiredAt": null,
      "createdAt": "2025-03-17T07:54:33Z",
      "updatedAt": "2025-03-17T07:56:43Z",
      "status": "Completed",
      "openTx": "2yp6sCW3irmnGUrq1PQyvy7aoTYxTjjoNhziWxcGgcawvdZWBubkQRGd22LScVcJmqy19jQNMv27qpUECbtUUYuR",
      "closeTx": "4VKPSMkxQBQuRgSjp389tHcxt5HJ8z56kopQgHY22miDjP9iwvSGAWBxbscADRPMuxm2pb5xM2zMBAgRSSjAeoYm",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": [
        {
          "orderKey": "2BwoyZyWr1kkf5VJ2QQttMqnxSFECZLT6Ym7VhPYKDwy",
          "keeper": "j1oAbxxiDUWvoHxEDhWE7THLjEkDQW2cSHYn2vttxTF",
          "inputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
          "outputMint": "So11111111111111111111111111111111111111112",
          "inputAmount": "120.8527972",
          "outputAmount": "0.187321836",
          "rawInputAmount": "120852797200",
          "rawOutputAmount": "187321836",
          "feeMint": "GNSHYrJmjwYXnWLy3esF5VjWa1AKMhzAru1pTeQDY8w3",
          "feeAmount": "0.000187321",
          "rawFeeAmount": "187321",
          "txId": "4VKPSMkxQBQuRgSjp389tHcxt5HJ8z56kopQgHY22miDjP9iwvSGAWBxbscADRPMuxm2pb5xM2zMBAgRSSjAeoYm",
          "confirmedAt": "2025-03-17T07:56:43Z",
          "action": "Fill",
          "productMeta": null
        }
      ]
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "HcrU69DdNU6zKRSkurSC4G7QhMECxTLwT73qJhaZcTjv",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "makingAmount": "0.05",
      "takingAmount": "30",
      "remainingMakingAmount": "0",
      "remainingTakingAmount": "0",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "30000000000",
      "rawRemainingMakingAmount": "0",
      "rawRemainingTakingAmount": "0",
      "expiredAt": null,
      "createdAt": "2025-03-17T04:29:12Z",
      "updatedAt": "2025-03-17T04:30:52Z",
      "status": "Completed",
      "openTx": "4MouZyxkajHLTqAKSpuEo8bPemsz5Lgcb6bXAAM21hitHtNJZgnjrUsMGqeyxQbRpTNwfRd9y5SxfU88CbxxWcff",
      "closeTx": "5iLegzEq3nN9tvBWGbu6WFw2nuVJEiq1A2c5rZ5iUMPKwu8bPTUrwnEyuvXMTVVAf1Vg5tAC9a8qzADvW6BYboQL",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": [
        {
          "orderKey": "HcrU69DdNU6zKRSkurSC4G7QhMECxTLwT73qJhaZcTjv",
          "keeper": "j1opmdubY84LUeidrPCsSGskTCYmeJVzds1UWm6nngb",
          "inputMint": "So11111111111111111111111111111111111111112",
          "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
          "inputAmount": "0.05",
          "outputAmount": "30",
          "rawInputAmount": "50000000",
          "rawOutputAmount": "30000000000",
          "feeMint": "DtL4JtjXwsJQndqXyd6ytJSmWDLWLESoXc7MkYNRQF9J",
          "feeAmount": "0",
          "rawFeeAmount": "0",
          "txId": "5iLegzEq3nN9tvBWGbu6WFw2nuVJEiq1A2c5rZ5iUMPKwu8bPTUrwnEyuvXMTVVAf1Vg5tAC9a8qzADvW6BYboQL",
          "confirmedAt": "2025-03-17T04:30:52Z",
          "action": "Fill",
          "productMeta": null
        }
      ]
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "6xFuxx9JHZfGc8AqofDxrY16TH9Hpts38fP7RPd9K4wt",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "makingAmount": "0.05",
      "takingAmount": "30",
      "remainingMakingAmount": "0",
      "remainingTakingAmount": "0",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "30000000000",
      "rawRemainingMakingAmount": "0",
      "rawRemainingTakingAmount": "0",
      "expiredAt": null,
      "createdAt": "2025-03-17T04:26:10Z",
      "updatedAt": "2025-03-17T04:27:39Z",
      "status": "Completed",
      "openTx": "5LCgkKySkgXgvWe6d5JnHWdNEfWWQqGCjPNYPGBA5STEgAVgx37JtCseXtyQAf4dgcRLvkPfG9qZVrxTXes3s9eM",
      "closeTx": "3NnAMrbR6SwyJjLWZ1hHpsFXM3KJ3gKfTPdrFtUvYNQLc8G6zYcwgsRB1wLTWs8gXpWbUDqxBynE879QcuwXoJZE",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": [
        {
          "orderKey": "6xFuxx9JHZfGc8AqofDxrY16TH9Hpts38fP7RPd9K4wt",
          "keeper": "j1oeQoPeuEDmjvyMwBmCWexzCQup77kbKKxV59CnYbd",
          "inputMint": "So11111111111111111111111111111111111111112",
          "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
          "inputAmount": "0.05",
          "outputAmount": "30",
          "rawInputAmount": "50000000",
          "rawOutputAmount": "30000000000",
          "feeMint": "DtL4JtjXwsJQndqXyd6ytJSmWDLWLESoXc7MkYNRQF9J",
          "feeAmount": "0",
          "rawFeeAmount": "0",
          "txId": "3NnAMrbR6SwyJjLWZ1hHpsFXM3KJ3gKfTPdrFtUvYNQLc8G6zYcwgsRB1wLTWs8gXpWbUDqxBynE879QcuwXoJZE",
          "confirmedAt": "2025-03-17T04:27:39Z",
          "action": "Fill",
          "productMeta": null
        }
      ]
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "DMB7DrtWMw8Hn29BvNNdu1ZZhEny93NNRfmnqxD3stBn",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "makingAmount": "0.05",
      "takingAmount": "30",
      "remainingMakingAmount": "0",
      "remainingTakingAmount": "0",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "30000000000",
      "rawRemainingMakingAmount": "0",
      "rawRemainingTakingAmount": "0",
      "expiredAt": null,
      "createdAt": "2025-03-17T04:19:44Z",
      "updatedAt": "2025-03-17T04:21:29Z",
      "status": "Completed",
      "openTx": "4p8nrpusAJjoA8sCZGNe5hoVB3KMzp6fnkxqYUuBtfvCNWVzaZ5vP2H9yzJL5MejQ5yF6WaSKsRQfiUNzYtfDBFP",
      "closeTx": "52etED7dj1MUoP1QMSGYiT4DE4UXkXyrm5hFcPTAcLTZ7gqmus3eJwCxLWRxaPeRVdonotqFVnxGatEjUs5psWS6",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": [
        {
          "orderKey": "DMB7DrtWMw8Hn29BvNNdu1ZZhEny93NNRfmnqxD3stBn",
          "keeper": "j1oeQoPeuEDmjvyMwBmCWexzCQup77kbKKxV59CnYbd",
          "inputMint": "So11111111111111111111111111111111111111112",
          "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
          "inputAmount": "0.05",
          "outputAmount": "30",
          "rawInputAmount": "50000000",
          "rawOutputAmount": "30000000000",
          "feeMint": "DtL4JtjXwsJQndqXyd6ytJSmWDLWLESoXc7MkYNRQF9J",
          "feeAmount": "0",
          "rawFeeAmount": "0",
          "txId": "52etED7dj1MUoP1QMSGYiT4DE4UXkXyrm5hFcPTAcLTZ7gqmus3eJwCxLWRxaPeRVdonotqFVnxGatEjUs5psWS6",
          "confirmedAt": "2025-03-17T04:21:29Z",
          "action": "Fill",
          "productMeta": null
        }
      ]
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "Gn69cRioGPrQeiuDq9XkUZdmgtWM8496Yzi2tgy9m193",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "makingAmount": "0.05",
      "takingAmount": "30",
      "remainingMakingAmount": "0",
      "remainingTakingAmount": "0",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "30000000000",
      "rawRemainingMakingAmount": "0",
      "rawRemainingTakingAmount": "0",
      "expiredAt": null,
      "createdAt": "2025-03-17T04:17:39Z",
      "updatedAt": "2025-03-17T04:19:10Z",
      "status": "Completed",
      "openTx": "2xgtMuPQq9bnV3LKkA32FUePrG5hUsKtWzyoG4qeB4DhtKBV7WTeVPxUjsCskscZ5hJ4CUYgmKzbTa9X7YP4EU3N",
      "closeTx": "5RSCNs1GNqvhsx2LHRsiber6RQNXfVAz9fnrS1BQYAXhZHGrS371tAALfccYbW9spxXiu284EMfEjAmgdvyUkKfy",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": [
        {
          "orderKey": "Gn69cRioGPrQeiuDq9XkUZdmgtWM8496Yzi2tgy9m193",
          "keeper": "j1oeQoPeuEDmjvyMwBmCWexzCQup77kbKKxV59CnYbd",
          "inputMint": "So11111111111111111111111111111111111111112",
          "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
          "inputAmount": "0.05",
          "outputAmount": "30",
          "rawInputAmount": "50000000",
          "rawOutputAmount": "30000000000",
          "feeMint": "DtL4JtjXwsJQndqXyd6ytJSmWDLWLESoXc7MkYNRQF9J",
          "feeAmount": "0",
          "rawFeeAmount": "0",
          "txId": "5RSCNs1GNqvhsx2LHRsiber6RQNXfVAz9fnrS1BQYAXhZHGrS371tAALfccYbW9spxXiu284EMfEjAmgdvyUkKfy",
          "confirmedAt": "2025-03-17T04:19:10Z",
          "action": "Fill",
          "productMeta": null
        }
      ]
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "5ifZY5yYuuy4F16JoqA4fVfTPSmvxZKUKazxU9xq6BFN",
      "inputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "outputMint": "So11111111111111111111111111111111111111112",
      "makingAmount": "29",
      "takingAmount": "0.04",
      "remainingMakingAmount": "0",
      "remainingTakingAmount": "0",
      "rawMakingAmount": "29000000000",
      "rawTakingAmount": "40000000",
      "rawRemainingMakingAmount": "0",
      "rawRemainingTakingAmount": "0",
      "expiredAt": null,
      "createdAt": "2025-03-17T04:08:19Z",
      "updatedAt": "2025-03-17T04:09:33Z",
      "status": "Completed",
      "openTx": "5ffazUuSpsTekApMWDm7y28MtdKnvtJAm6QUQKXKmXXCz7ZvbibmGtmiLBY8TjcdAeNpoAwLFxGU5TAY6XoRnmRW",
      "closeTx": "5WFjsutdgA1ys4cq6goEuNNzVPEvLHUUvoqzEPnbvv8VvsdbMM5LcepTQTo7KeEcbostmoVSTB4sSXDfTnZiHmei",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": [
        {
          "orderKey": "5ifZY5yYuuy4F16JoqA4fVfTPSmvxZKUKazxU9xq6BFN",
          "keeper": "j1oeQoPeuEDmjvyMwBmCWexzCQup77kbKKxV59CnYbd",
          "inputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
          "outputMint": "So11111111111111111111111111111111111111112",
          "inputAmount": "29",
          "outputAmount": "0.04",
          "rawInputAmount": "29000000000",
          "rawOutputAmount": "40000000",
          "feeMint": "GNSHYrJmjwYXnWLy3esF5VjWa1AKMhzAru1pTeQDY8w3",
          "feeAmount": "0.00004",
          "rawFeeAmount": "40000",
          "txId": "5WFjsutdgA1ys4cq6goEuNNzVPEvLHUUvoqzEPnbvv8VvsdbMM5LcepTQTo7KeEcbostmoVSTB4sSXDfTnZiHmei",
          "confirmedAt": "2025-03-17T04:09:33Z",
          "action": "Fill",
          "productMeta": null
        }
      ]
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "6WMr67hvCQ1cDZ11q7wyvuRXwRkAnpcE9ANbtwvdXxJX",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "makingAmount": "0.05",
      "takingAmount": "30",
      "remainingMakingAmount": "0",
      "remainingTakingAmount": "0",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "30000000000",
      "rawRemainingMakingAmount": "0",
      "rawRemainingTakingAmount": "0",
      "expiredAt": null,
      "createdAt": "2025-03-17T04:04:58Z",
      "updatedAt": "2025-03-17T04:06:05Z",
      "status": "Completed",
      "openTx": "37Zx6oeb6djADRq9NGcQ4cw2Vff2L228tJao6rURnodiv4Kn63Wr7oZmEYtgrPWb1zASBfJHGJP4K8WNVD689iZv",
      "closeTx": "5yP1xcL4uKeMD2grXbeE4fEZMeJco16RFF8a3ZVopbGFax6K18om6ERd8L3NNRoCjEgzCmRUM6eaq6QU9bVL5w3d",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": [
        {
          "orderKey": "6WMr67hvCQ1cDZ11q7wyvuRXwRkAnpcE9ANbtwvdXxJX",
          "keeper": "j1oeQoPeuEDmjvyMwBmCWexzCQup77kbKKxV59CnYbd",
          "inputMint": "So11111111111111111111111111111111111111112",
          "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
          "inputAmount": "0.05",
          "outputAmount": "30",
          "rawInputAmount": "50000000",
          "rawOutputAmount": "30000000000",
          "feeMint": "DtL4JtjXwsJQndqXyd6ytJSmWDLWLESoXc7MkYNRQF9J",
          "feeAmount": "0",
          "rawFeeAmount": "0",
          "txId": "5yP1xcL4uKeMD2grXbeE4fEZMeJco16RFF8a3ZVopbGFax6K18om6ERd8L3NNRoCjEgzCmRUM6eaq6QU9bVL5w3d",
          "confirmedAt": "2025-03-17T04:06:05Z",
          "action": "Fill",
          "productMeta": null
        }
      ]
    },
    {
      "userPubkey": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
      "orderKey": "BwFmvmU9qnrjz4Q3Zu9Z2vabBj3FWawutrt85yCw3Kgs",
      "inputMint": "So11111111111111111111111111111111111111112",
      "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
      "makingAmount": "0.05",
      "takingAmount": "0.0014",
      "remainingMakingAmount": "0",
      "remainingTakingAmount": "0",
      "rawMakingAmount": "50000000",
      "rawTakingAmount": "1400000",
      "rawRemainingMakingAmount": "0",
      "rawRemainingTakingAmount": "0",
      "expiredAt": null,
      "createdAt": "2025-03-17T03:57:50Z",
      "updatedAt": "2025-03-17T03:59:14Z",
      "status": "Completed",
      "openTx": "2shUmxBdA4fcKS3F2aMjJKnrwBPCkYHL3YVNfQYY3PZDjeD9SRngXxU6qxzMNzV3x32tD39vQjhVyFZo4bovZ71R",
      "closeTx": "5MXuYV8UanLecXawDyVRWVxJCpKdW1amRtohw86NAxXUFsc6HU69rRw4mNTqfLiMPGdt1aBMejDybsVTx83rg5NM",
      "programVersion": "j1o2qRpjcyUwEvwtcfhEQefh773ZgjxcVRry7LDqg5X",
      "trades": [
        {
          "orderKey": "BwFmvmU9qnrjz4Q3Zu9Z2vabBj3FWawutrt85yCw3Kgs",
          "keeper": "j1opmdubY84LUeidrPCsSGskTCYmeJVzds1UWm6nngb",
          "inputMint": "So11111111111111111111111111111111111111112",
          "outputMint": "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
          "inputAmount": "0.05",
          "outputAmount": "0.0014",
          "rawInputAmount": "50000000",
          "rawOutputAmount": "1400000",
          "feeMint": "DtL4JtjXwsJQndqXyd6ytJSmWDLWLESoXc7MkYNRQF9J",
          "feeAmount": "0",
          "rawFeeAmount": "0",
          "txId": "5MXuYV8UanLecXawDyVRWVxJCpKdW1amRtohw86NAxXUFsc6HU69rRw4mNTqfLiMPGdt1aBMejDybsVTx83rg5NM",
          "confirmedAt": "2025-03-17T03:59:14Z",
          "action": "Fill",
          "productMeta": null
        }
      ]
    }
  ],
  "totalPages": 43,
  "page": 1,
  "user": "devjnEpxbJUhJ39FSsFz7YPerr5bdxN8VWUXvfbFUK4",
  "orderStatus": "history"
}
```
