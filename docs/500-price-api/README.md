---
sidebar_label: "Price API"
description: "Use the Jupiter Price API for all tokens tradable or traded on Jupiter."
title: "Price API"
---

<head>
    <title>Price API</title>
    <meta name="twitter:card" content="summary" />
</head>

Price API V2 aims to enhance accuracy by incorporating both **buy** and **sell-side liquidity** to derive the **average price** of the two. This provides more reliable real-time data for SPL tokens. Additionally, V2 provides extra help information like depth and confidence to aid you or your users with decisions.

:::tip
The prices are derived **from Jupiter Swap**, which is an aggregate of most markets on Solana.
:::

## Let’s Get Started

In this guide, we will be going through the simple price responses and the extra help information.



:::note
- Lite URL: `https://lite-api.jup.ag/price/v2`
- Pro URL: `https://api.jup.ag/price/v2`

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

## Get Price (Only Price)

Using the root URL and parameters to pass in, it is as simple as the example code below!

Notice the `ids` parameter with the public key or token address of a token mint, you can also input more than 1 address by comma-separating them.

#### Price vs USDC by default

```jsx
const priceResponse = await fetch(
    'https://lite-api.jup.ag/price/v2?ids=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN,So11111111111111111111111111111111111111112'
);

const priceData = await priceResponse.json();

console.log(priceData);
```

#### Price vsToken

```jsx
console.log(JSON.stringify(priceData, null, 2));

const priceResponseWithVsToken = await fetch(
    'https://lite-api.jup.ag/price/v2?ids=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN,So11111111111111111111111111111111111111112&vsToken=So11111111111111111111111111111111111111112'
);

const priceDataWithVsToken = await priceResponseWithVsToken.json();
  
console.log(JSON.stringify(priceDataWithVsToken, null, 2));
```

From the above example, you should see this response.

Notice 2 details here:

- Usage of `vsToken`: The first set of data shows price denoted in USDC while the second set of data denotes in the price of SOL.
- With no `showExtraInfo`: There is only 1 price, the derived price is the buy price.

```json
{
  "data": {
    "So11111111111111111111111111111111111111112": {
      "id": "So11111111111111111111111111111111111111112",
      "type": "derivedPrice",
      "price": "210.195311500"
    },
    "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": {
      "id": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
      "type": "derivedPrice",
      "price": "1.084247"
    }
  },
  "timeTaken": 0.00488491
}
{
  "data": {
    "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": {
      "id": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
      "type": "derivedPrice",
      "price": "0.005158283466279884"
    },
    "So11111111111111111111111111111111111111112": {
      "id": "So11111111111111111111111111111111111111112",
      "type": "derivedPrice",
      "price": "1"
    }
  },
  "timeTaken": 0.00203215
}
```

## Get Price (with Extra Info)

To get extra help information such as confidence level or depth, you will need to pass in `showExtraInfo=true`. However, do note that if this is set to `true`, you will not be able to apply `vsToken`.

```jsx
const priceResponseShowExtraInfo = await fetch(
    'https://lite-api.jup.ag/price/v2?ids=JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN,So11111111111111111111111111111111111111112&showExtraInfo=true'
);

const priceDataShowExtraInfo = await priceResponseShowExtraInfo.json();
  
console.log(JSON.stringify(priceDataShowExtraInfo, null, 2));
```

Here is the sample response.

Notice a few details here:
- You can see both last swap and current quote prices.
- You can see both buy and sell prices of the different types.
- You can see the unix timestamps.
- You can see the confidence and depth information.

```json
{
  "data": {
    "So11111111111111111111111111111111111111112": {
      "id": "So11111111111111111111111111111111111111112",
      "type": "derivedPrice",
      "price": "210.734462500",
      "extraInfo": {
        "lastSwappedPrice": {
          "lastJupiterSellAt": 1731599242,
          "lastJupiterSellPrice": "210.52136418853988",
          "lastJupiterBuyAt": 1731599242,
          "lastJupiterBuyPrice": "210.5553945976539"
        },
        "quotedPrice": {
          "buyPrice": "210.578367000",
          "buyAt": 1731599236,
          "sellPrice": "210.890558000",
          "sellAt": 1731599236
        },
        "confidenceLevel": "high",
        "depth": {
          "buyPriceImpactRatio": {
            "depth": {
              "10": 0.08186978526745424,
              "100": 0.1154072102743595,
              "1000": 0.13766677800178445
            },
            "timestamp": 1731599207
          },
          "sellPriceImpactRatio": {
            "depth": {
              "10": 0.1211367007033883,
              "100": 0.059088081285986374,
              "1000": 0.16445602954342006
            },
            "timestamp": 1731599207
          }
        }
      }
    },
    "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": {
      "id": "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
      "type": "derivedPrice",
      "price": "1.088080",
      "extraInfo": {
        "lastSwappedPrice": {
          "lastJupiterSellAt": 1731599239,
          "lastJupiterSellPrice": "1.0857748923629837",
          "lastJupiterBuyAt": 1731599241,
          "lastJupiterBuyPrice": "1.0879206578017573"
        },
        "quotedPrice": {
          "buyPrice": "1.088085",
          "buyAt": 1731599236,
          "sellPrice": "1.088076",
          "sellAt": 1731599236
        },
        "confidenceLevel": "high",
        "depth": {
          "buyPriceImpactRatio": {
            "depth": {
              "10": 0.05662764967204097,
              "100": 0.17463135504551536,
              "1000": 0.7379832960897882
            },
            "timestamp": 1731599207
          },
          "sellPriceImpactRatio": {
            "depth": {
              "10": 0.03504801758790863,
              "100": 0.16858843747627028,
              "1000": 3.0578377037958586
            },
            "timestamp": 1731599207
          }
        }
      }
    }
  },
  "timeTaken": 0.003665979
}
```

## Limitations

#### Query limits
1. You can query up to 100 `id`s at once.

#### If the price for a token cannot be found, it is either because
1. The token is not tradable on Jupiter - it does not fit Jupiter’s routing criteria.
2. There is no route for this token to SOL.
  1. `sellPrice`, `sellAt` & `lastSwappedPrice` might be null in cases
3. If `sellPrice` & `sellAt` is not cached and cannot be retrieved the provided information will be `buyPrice`.
4. `lastSwappedPrice` might be null if the token has not been traded recently or cannot be retrieved.
  1. Tokens that have not been traded via USDC in the last 3 days.
  2. Note that this is only for swaps done via Jupiter, it will not be done for swaps done e.g. directly on Raydium’s platform

#### `buyPriceImpactRatio` & `sellPriceImpactRatio` in the depth field might be null in cases
1. We are to get the respective price impacts for the 10, 100 and 1000 SOL buys or sells
  1. It could be because the token’s liquidity does not have enough liquidity for larger values
2. We cannot find the sell quote for the respective token and the buy/sell values

[Read about how we derive confidenceLevel or depth in Price API V2 here.](https://www.jupresear.ch/t/introducing-the-price-v2-api/22175)