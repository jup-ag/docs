---
sidebar_label: "Get Recurring Orders"
description: "Use the Jupiter Recurring API to get both active or historical recurring orders."
title: "Get Recurring Orders"
---

<head>
    <title>Get Recurring Orders</title>
    <meta name="twitter:card" content="summary" />
</head>

The root URL of the Recurring API's get recurring orders endpoint is as such.

```
For paid tiers with API Keys, use `https://api.jup.ag/recurring/v1/getRecurringOrders`

For free tier, use `https://lite-api.jup.ag/recurring/v1/getRecurringOrders`
```

This is a GET request to `/getRecurringOrders` endpoint. The response is paginated for every 10 orders and you can view different pages using the `page` parameter.

## Get Recurring Orders

:::note
- orderStatus can be either `active` or `history`
- recurringType can be either `time` or `price`
- includeFailedTx can be either `true` or `false`
:::

## Active Orders

To get the active orders, you can pass in the `orderStatus` parameter as `active`.

:::tip
You can optionally pass in the input and output token mint addresses to filter the open orders.
:::

:::note
Please take note, depending on the `recurringType`, the response will be different.
:::

```jsx
const openOrdersResponse = await (
    await fetch(
        'https://lite-api.jup.ag/recurring/v1/getRecurringOrders?user=replaceWithPublicKey&orderStatus=active&recurringType=time'
    )
).json();
```

## Active Orders Response

```json
{
  "user": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
  "orderStatus": "active",
  "time": {
    "orders": [
      {
        "userPubkey": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "orderKey": "8icop2U4E6R9hJYtSS9fnfiiRrD3BjCY5jir22NfWcrn",
        "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "outputMint": "So11111111111111111111111111111111111111112",
        "inDeposited": "104",
        "inWithdrawn": "0",
        "rawInDeposited": "104000000",
        "rawInWithdrawn": "0",
        "cycleFrequency": "86400",
        "outWithdrawn": "0.431580133",
        "inAmountPerCycle": "52",
        "minOutAmount": "0",
        "maxOutAmount": "0",
        "inUsed": "52",
        "outReceived": "0.431580133",
        "rawOutWithdrawn": "431580133",
        "rawInAmountPerCycle": "52000000",
        "rawMinOutAmount": "0",
        "rawMaxOutAmount": "0",
        "rawInUsed": "52000000",
        "rawOutReceived": "431580133",
        "openTx": "3VuddRGWr964XFbSngm9Yj2AirAEKnoyHY1TWeJ9wJRjH9yVUmNyfRyAv3VDmTvMgwMWDScxTRp8gFirEeBbu3Vb",
        "closeTx": "",
        "userClosed": false,
        "createdAt": "2025-03-11T02:51:53Z",
        "updatedAt": "2025-03-11T02:51:53Z",
        "trades": [
          {
            "orderKey": "8icop2U4E6R9hJYtSS9fnfiiRrD3BjCY5jir22NfWcrn",
            "keeper": "JD38n7ynKYcgPpF7k1BhXEeREu1KqptU93fVGy3S624k",
            "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "outputMint": "So11111111111111111111111111111111111111112",
            "inputAmount": "52",
            "outputAmount": "0.431580133",
            "rawInputAmount": "52000000",
            "rawOutputAmount": "431580133",
            "feeMint": "So11111111111111111111111111111111111111112",
            "feeAmount": "0.000432012",
            "rawFeeAmount": "432012",
            "txId": "2ensFcS32egg8V9hZr2su5LfP8jfkMnBMn7ChtEf1KbpucKe1TQf9x5wsRS2pEsqyvUTFdpbe6FkdGSytixkHvKj",
            "confirmedAt": "2025-03-11T02:51:54Z",
            "action": "Fill",
            "productMeta": null
          }
        ]
      }
    ],
    "totalPages": 1,
    "page": 1
  }
}
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

## Order History Response

```json
{
  "user": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
  "orderStatus": "history",
  "price": {
    "orders": [
      {
        "userPubkey": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "orderKey": "EpTsCUnKComCd8FDNZn3kVrQBQo2uEn5rRzYk9ocqFPH",
        "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "outputMint": "So11111111111111111111111111111111111111112",
        "inDeposited": "111",
        "inWithdrawn": "100.99777",
        "inUsed": "10.00223",
        "outReceived": "0.083911943",
        "outWithdrawn": "0.083911943",
        "orderInterval": "86400",
        "incrementalUsdValue": "10",
        "supposedUsdValue": "10",
        "rawInDeposited": "111000000",
        "rawInWithdrawn": "100997770",
        "rawInUsed": "10002230",
        "rawOutReceived": "83911943",
        "rawOutWithdrawn": "83911943",
        "rawIncrementalUsdValue": "10000000",
        "rawSupposedUsdValue": "10000000",
        "status": "Close",
        "closedBy": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "openTx": "5zS2v1kUQhrd88paJWueE3Wyu92YQNLGfT4Wfy3JmstSzzsZRBK6bt5W9ZWfUEgTt3yNGDNSEVX5ZfeGZhpJUnTh",
        "closeTx": "bFika6ajRmrCsrQynnnJ2bncegKPZ68RF5oqHVbn1hprgYQoyvVN7XF3UWPDWwdkvgX1FvcQaeczQdvKgaxpQjW",
        "createdAt": "2025-03-11T01:52:53Z",
        "startAt": "2025-03-11T01:52:53Z",
        "updatedAt": "2025-03-11T02:19:42Z",
        "trades": [
          {
            "orderKey": "EpTsCUnKComCd8FDNZn3kVrQBQo2uEn5rRzYk9ocqFPH",
            "keeper": "",
            "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "outputMint": "",
            "inputAmount": "1",
            "outputAmount": "0",
            "rawInputAmount": "1000000",
            "rawOutputAmount": "0",
            "feeMint": "",
            "feeAmount": "0",
            "rawFeeAmount": "0",
            "txId": "RpT1w86pNm3qK3Le67927jBXM49cER9XHrqkUpYvGsUakUxWgWp8bZZGvMgDQaQyFunkaNWNyfZ3QB5VESPS2SE",
            "confirmedAt": "2025-03-11T01:53:34Z",
            "action": "Deposit",
            "productMeta": null
          },
          {
            "orderKey": "EpTsCUnKComCd8FDNZn3kVrQBQo2uEn5rRzYk9ocqFPH",
            "keeper": "JVySYuJBFwQzURiGd7m6FEKDWsq4g7ooWUqhL8BsVTD",
            "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "outputMint": "So11111111111111111111111111111111111111112",
            "inputAmount": "10.00223",
            "outputAmount": "0.083911943",
            "rawInputAmount": "10002230",
            "rawOutputAmount": "83911943",
            "feeMint": "So11111111111111111111111111111111111111112",
            "feeAmount": "0.000083995",
            "rawFeeAmount": "83995",
            "txId": "2NbmR7LsFf6iVUyyaqoArrkRvg9Lv8mWZEdPNS42EFZSURzbQHkGbjVcc7qS3T4vHeXUTcVbq2ipWk3VcGeup5Vi",
            "confirmedAt": "2025-03-11T01:53:28Z",
            "action": "Fill",
            "productMeta": {
              "new_actual_usdc_value": "9987143",
              "value": "10000000"
            }
          }
        ]
      },
      {
        "userPubkey": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "orderKey": "DwRfKzZcjEobgYgBe4UhqnCAhpAdqxUvPAsRj6ukFtkv",
        "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "outputMint": "So11111111111111111111111111111111111111112",
        "inDeposited": "110",
        "inWithdrawn": "100.00064",
        "inUsed": "9.99936",
        "outReceived": "0.084730004",
        "outWithdrawn": "0.084730004",
        "orderInterval": "86400",
        "incrementalUsdValue": "10",
        "supposedUsdValue": "10",
        "rawInDeposited": "110000000",
        "rawInWithdrawn": "100000640",
        "rawInUsed": "9999360",
        "rawOutReceived": "84730004",
        "rawOutWithdrawn": "84730004",
        "rawIncrementalUsdValue": "10000000",
        "rawSupposedUsdValue": "10000000",
        "status": "Close",
        "closedBy": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "openTx": "3qGXDqAW9Amz2meUfCnD5tAW888345EvemZe99Es7gZdGeza3aMN4hnW32Biax8aVA3dVZyE3rxfHEmgJ3NL85zf",
        "closeTx": "4x6vgTp1tLtVo7QEXsx2LmpMsotr2RJso2DztPfREm5R7zqSUecHNmGBuf88KTvz2PhDJhvBYtmvvymypkhdh2Ej",
        "createdAt": "2025-03-11T01:47:09Z",
        "startAt": "2025-03-11T01:47:09Z",
        "updatedAt": "2025-03-11T01:50:08Z",
        "trades": [
          {
            "orderKey": "DwRfKzZcjEobgYgBe4UhqnCAhpAdqxUvPAsRj6ukFtkv",
            "keeper": "JVFzwFiiKHK6rFHKj7fpBGWsGE7SpjUkfWqXRD8ip35",
            "inputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "outputMint": "So11111111111111111111111111111111111111112",
            "inputAmount": "9.99936",
            "outputAmount": "0.084730004",
            "rawInputAmount": "9999360",
            "rawOutputAmount": "84730004",
            "feeMint": "So11111111111111111111111111111111111111112",
            "feeAmount": "0.000084814",
            "rawFeeAmount": "84814",
            "txId": "5MaiJNy5Df4g7VELuvPktJSLUmQnzkn9xnJ3HNT5FndY8GAyQEv7c5c2u4fEb3aXxKXJRkEoSv13TnTENUN83RRQ",
            "confirmedAt": "2025-03-11T01:47:38Z",
            "action": "Fill",
            "productMeta": {
              "new_actual_usdc_value": "10014252",
              "value": "10000000"
            }
          }
        ]
      },
      {
        "userPubkey": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "orderKey": "Hkno7bnupZiDLzMxKDm1kyfjozvEaBPeoSLDAb7rdtLT",
        "inputMint": "So11111111111111111111111111111111111111112",
        "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "inDeposited": "1.003",
        "inWithdrawn": "0.711518921",
        "inUsed": "0.291481079",
        "outReceived": "39.994552",
        "outWithdrawn": "39.994552",
        "orderInterval": "86400",
        "incrementalUsdValue": "10",
        "supposedUsdValue": "40",
        "rawInDeposited": "1003000000",
        "rawInWithdrawn": "711518921",
        "rawInUsed": "291481079",
        "rawOutReceived": "39994552",
        "rawOutWithdrawn": "39994552",
        "rawIncrementalUsdValue": "10000000",
        "rawSupposedUsdValue": "40000000",
        "status": "Close",
        "closedBy": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "openTx": "2j8VutKDkWBaFRQssHWqqD5TPwhwJ5QySMaYZ3UQEcsutJf3HZABm1y8q5E2Jx31oUFDcG4kvMaza8cwJT46q3PG",
        "closeTx": "54AaS61qQKMZrdgcdAxJqkouyRNRv3a3WoLTD56oGj1R8C8xTZqgzMTWfpKq6GBRxTisVkGdn2ZPidXhkU24gRxJ",
        "createdAt": "2025-03-07T07:08:45Z",
        "startAt": "2025-03-07T07:08:45Z",
        "updatedAt": "2025-03-10T08:06:12Z",
        "trades": [
          {
            "orderKey": "Hkno7bnupZiDLzMxKDm1kyfjozvEaBPeoSLDAb7rdtLT",
            "keeper": "JVySYuJBFwQzURiGd7m6FEKDWsq4g7ooWUqhL8BsVTD",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "inputAmount": "0.078369049",
            "outputAmount": "10.006834",
            "rawInputAmount": "78369049",
            "rawOutputAmount": "10006834",
            "feeMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "feeAmount": "0.010016",
            "rawFeeAmount": "10016",
            "txId": "CqQ5kE2ruJJBiG58SsU26oHLDrdZmenJX81tpquMbgpHYSfgLpgGLZvWykSEemt7MhWnX3AFbjt25aBQ8YvfVUR",
            "confirmedAt": "2025-03-10T07:09:22Z",
            "action": "Fill",
            "productMeta": {
              "new_actual_usdc_value": "40006208",
              "value": "10011053"
            }
          },
          {
            "orderKey": "Hkno7bnupZiDLzMxKDm1kyfjozvEaBPeoSLDAb7rdtLT",
            "keeper": "JVhhq5CHJcKo9PaTSdmWEPTzNUt69xuZzcpMuCeja68",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "inputAmount": "0.071985073",
            "outputAmount": "9.996295",
            "rawInputAmount": "71985073",
            "rawOutputAmount": "9996295",
            "feeMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "feeAmount": "0.010006",
            "rawFeeAmount": "10006",
            "txId": "WPSQ8KaEaXQX187i6mdhWMDsW2ejAuWZwh7RLp6fxqVvzqmwLHT5tL6rhjoH6vsFXsHAnE5pTLi18uQRw2vj9JN",
            "confirmedAt": "2025-03-09T07:09:24Z",
            "action": "Fill",
            "productMeta": {
              "new_actual_usdc_value": "29997964",
              "value": "10008417"
            }
          },
          {
            "orderKey": "Hkno7bnupZiDLzMxKDm1kyfjozvEaBPeoSLDAb7rdtLT",
            "keeper": "JVhhq5CHJcKo9PaTSdmWEPTzNUt69xuZzcpMuCeja68",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "inputAmount": "0.071804924",
            "outputAmount": "10.005655",
            "rawInputAmount": "71804924",
            "rawOutputAmount": "10005655",
            "feeMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "feeAmount": "0.010015",
            "rawFeeAmount": "10015",
            "txId": "48kmbGtcacwJrcmPJZYjCpnrKAGs1KuwxPhEiAWxcounVb7yzrnEAVAzHWQBMo34JacaeAwPG6yuXfKAJsYw7gke",
            "confirmedAt": "2025-03-08T07:09:27Z",
            "action": "Fill",
            "productMeta": {
              "new_actual_usdc_value": "20001718",
              "value": "10014092"
            }
          },
          {
            "orderKey": "Hkno7bnupZiDLzMxKDm1kyfjozvEaBPeoSLDAb7rdtLT",
            "keeper": "",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "",
            "inputAmount": "0.001",
            "outputAmount": "0",
            "rawInputAmount": "1000000",
            "rawOutputAmount": "0",
            "feeMint": "",
            "feeAmount": "0",
            "rawFeeAmount": "0",
            "txId": "5tHkE9RtCRXqoQ5v3FZMXTsq31dM9iFYGsgH5S6eS5ZbcxvZG3ACeE2pDFgUDtBsNNd12mWbRGfVTDJk58vQ6LnB",
            "confirmedAt": "2025-03-07T07:11:02Z",
            "action": "Deposit",
            "productMeta": null
          },
          {
            "orderKey": "Hkno7bnupZiDLzMxKDm1kyfjozvEaBPeoSLDAb7rdtLT",
            "keeper": "",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "",
            "inputAmount": "0.001",
            "outputAmount": "0",
            "rawInputAmount": "1000000",
            "rawOutputAmount": "0",
            "feeMint": "",
            "feeAmount": "0",
            "rawFeeAmount": "0",
            "txId": "5WHPPX8g8Q2D14cfKU2968UcZdP7WnpDDeVaE6ZtukgLagddNNBKc4VpeE8SNtcP7xj3BEGtzrbfQpBJrWeEaoD1",
            "confirmedAt": "2025-03-07T07:10:39Z",
            "action": "Deposit",
            "productMeta": null
          },
          {
            "orderKey": "Hkno7bnupZiDLzMxKDm1kyfjozvEaBPeoSLDAb7rdtLT",
            "keeper": "",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "",
            "inputAmount": "0.001",
            "outputAmount": "0",
            "rawInputAmount": "1000000",
            "rawOutputAmount": "0",
            "feeMint": "",
            "feeAmount": "0",
            "rawFeeAmount": "0",
            "txId": "5ZVeFCB5EBxqm9hjc4JGtAzsMhHaXv46wHicqAmeqMRKjbJ42VqkpmC5aGoYgHkJfQ994YomuyaabwuKwABjaDcT",
            "confirmedAt": "2025-03-07T07:10:05Z",
            "action": "Deposit",
            "productMeta": null
          },
          {
            "orderKey": "Hkno7bnupZiDLzMxKDm1kyfjozvEaBPeoSLDAb7rdtLT",
            "keeper": "JVySYuJBFwQzURiGd7m6FEKDWsq4g7ooWUqhL8BsVTD",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "inputAmount": "0.069322033",
            "outputAmount": "9.985768",
            "rawInputAmount": "69322033",
            "rawOutputAmount": "9985768",
            "feeMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "feeAmount": "0.009995",
            "rawFeeAmount": "9995",
            "txId": "2nrVSvDTxm6VQPVYvtoqk1675s4JUV8fo5FEYdxaz88qG9HypyenaqDA8CoyXjqkeXreprjKBzPyTHWEYiw3W4sT",
            "confirmedAt": "2025-03-07T07:09:11Z",
            "action": "Fill",
            "productMeta": {
              "new_actual_usdc_value": "9995843",
              "value": "10000000"
            }
          }
        ]
      },
      {
        "userPubkey": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "orderKey": "2kH7ZZJ6dTXHDdP3zN4c2EYjeSEjiWvRsUqvU51T5h6p",
        "inputMint": "So11111111111111111111111111111111111111112",
        "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "inDeposited": "1",
        "inWithdrawn": "0.011802913",
        "inUsed": "0.988197087",
        "outReceived": "149.913742",
        "outWithdrawn": "149.913742",
        "orderInterval": "60",
        "incrementalUsdValue": "50",
        "supposedUsdValue": "150",
        "rawInDeposited": "1000000000",
        "rawInWithdrawn": "11802913",
        "rawInUsed": "988197087",
        "rawOutReceived": "149913742",
        "rawOutWithdrawn": "149913742",
        "rawIncrementalUsdValue": "50000000",
        "rawSupposedUsdValue": "150000000",
        "status": "Close",
        "closedBy": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "openTx": "22DvZUwZ1h7r3Fw6tC5z4czu7y29qiEU97eUGa2XZGy2FaxKfqAQf7Ks3JNMkYM8rt9qKawaHErhQXxMWWwEZEXY",
        "closeTx": "3EL1ieX9RBADGAgsDQVQzHLDaGX4TpFF1HgSde8JQzbCw6JLNxdvK3JbiKrBX1absubz5fTkvoBGj6qE4j7nYus3",
        "createdAt": "2025-03-06T11:52:16Z",
        "startAt": "2025-03-06T11:52:13Z",
        "updatedAt": "2025-03-10T08:06:06Z",
        "trades": [
          {
            "orderKey": "2kH7ZZJ6dTXHDdP3zN4c2EYjeSEjiWvRsUqvU51T5h6p",
            "keeper": "JVFzwFiiKHK6rFHKj7fpBGWsGE7SpjUkfWqXRD8ip35",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "inputAmount": "0.329513072",
            "outputAmount": "49.943007",
            "rawInputAmount": "329513072",
            "rawOutputAmount": "49943007",
            "feeMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "feeAmount": "0.049993",
            "rawFeeAmount": "49993",
            "txId": "4M14KRASA9YkfN7ALRwg2Eraq7YKVFKVmQ5JBqCGe4MKxgsvb85CRXhHfz5iMAWgR2veFcH7UVfjekFrAr4g2JQv",
            "confirmedAt": "2025-03-06T11:54:51Z",
            "action": "Fill",
            "productMeta": {
              "new_actual_usdc_value": "149962985",
              "value": "50029765"
            }
          },
          {
            "orderKey": "2kH7ZZJ6dTXHDdP3zN4c2EYjeSEjiWvRsUqvU51T5h6p",
            "keeper": "JVySYuJBFwQzURiGd7m6FEKDWsq4g7ooWUqhL8BsVTD",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "inputAmount": "0.329885906",
            "outputAmount": "50.03761",
            "rawInputAmount": "329885906",
            "rawOutputAmount": "50037610",
            "feeMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "feeAmount": "0.050087",
            "rawFeeAmount": "50087",
            "txId": "qNp95YMuUsePgmQBAVSd3ghAHnJiLtpPEUZRHALLkemhSW8QVu7ytL3RVTjySiuwtRpwgYi76JVirWVvmEzsPc7",
            "confirmedAt": "2025-03-06T11:53:51Z",
            "action": "Fill",
            "productMeta": {
              "new_actual_usdc_value": "100024523",
              "value": "50065027"
            }
          },
          {
            "orderKey": "2kH7ZZJ6dTXHDdP3zN4c2EYjeSEjiWvRsUqvU51T5h6p",
            "keeper": "JVFzwFiiKHK6rFHKj7fpBGWsGE7SpjUkfWqXRD8ip35",
            "inputMint": "So11111111111111111111111111111111111111112",
            "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "inputAmount": "0.328798109",
            "outputAmount": "49.933125",
            "rawInputAmount": "328798109",
            "rawOutputAmount": "49933125",
            "feeMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
            "feeAmount": "0.049983",
            "rawFeeAmount": "49983",
            "txId": "3JB54XD23MMqoiZN14UdNZm7o9ZGo2d27cTYQNW63ZRLt3c4zQb25drYp73HVKomYeTX5dmLowpNPgyszUZ88Jke",
            "confirmedAt": "2025-03-06T11:52:51Z",
            "action": "Fill",
            "productMeta": {
              "new_actual_usdc_value": "49985507",
              "value": "50000000"
            }
          }
        ]
      },
      {
        "userPubkey": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "orderKey": "7gUFAcwYTiyoW9pqEqpxrzDggPxvqwQkn9LhHjBvCBR9",
        "inputMint": "So11111111111111111111111111111111111111112",
        "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "inDeposited": "1",
        "inWithdrawn": "1",
        "inUsed": "0",
        "outReceived": "0",
        "outWithdrawn": "0",
        "orderInterval": "300",
        "incrementalUsdValue": "10",
        "supposedUsdValue": "0",
        "rawInDeposited": "1000000000",
        "rawInWithdrawn": "1000000000",
        "rawInUsed": "0",
        "rawOutReceived": "0",
        "rawOutWithdrawn": "0",
        "rawIncrementalUsdValue": "10000000",
        "rawSupposedUsdValue": "0",
        "status": "Close",
        "closedBy": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "openTx": "2hcdnV8SewirJRVovLbzbR5K8zNhMZwjs9FH9ATqifB7pjxqSdBbkbXMJCLB3u5jN53zHakfFGNppcgdJHqqrHGz",
        "closeTx": "4HFhpeQa8DhGvAn63WUXVBex5S2hRceCnNiSuG4X4AYzvm1UiDvaFaDUJmmoJFaK8Gjn5sqmrB2D3D4ho6paLab5",
        "createdAt": "2025-03-06T11:02:32Z",
        "startAt": "2026-03-06T03:01:57Z",
        "updatedAt": "2025-03-10T08:06:00Z",
        "trades": []
      },
      {
        "userPubkey": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "orderKey": "2A9BWzLCpsvRuAbruATYYXaaMDRkSYPPZoAey67ywYqx",
        "inputMint": "So11111111111111111111111111111111111111112",
        "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "inDeposited": "0.002",
        "inWithdrawn": "0.002",
        "inUsed": "0",
        "outReceived": "0",
        "outWithdrawn": "0",
        "orderInterval": "300",
        "incrementalUsdValue": "1",
        "supposedUsdValue": "0",
        "rawInDeposited": "2000000",
        "rawInWithdrawn": "2000000",
        "rawInUsed": "0",
        "rawOutReceived": "0",
        "rawOutWithdrawn": "0",
        "rawIncrementalUsdValue": "1000000",
        "rawSupposedUsdValue": "0",
        "status": "Close",
        "closedBy": "5dMXLJ8GYQxcHe2fjpttVkEpRrxcajRXZqJHCiCbWS4H",
        "openTx": "5dEtF7oyEmv7ANLCrmYbjGFVCNZZ4zHVA22mxvPQTxQL1fypvCbS1FFsyBZRfigS3vrzLhkHDyjHA3GmEUYA7HWN",
        "closeTx": "3eeHQXLrfgYWpsniNzmThMmdb6asB2AB29yNMn8jSBYzyPyw3xwW3NhSfyyksLDRRPcoxWpEL5NNQ1waA8PLy76W",
        "createdAt": "2025-03-05T14:54:10Z",
        "startAt": "2025-03-05T14:54:10Z",
        "updatedAt": "2025-03-06T11:01:10Z",
        "trades": []
      }
    ],
    "totalPages": 1,
    "page": 1
  }
}
```
