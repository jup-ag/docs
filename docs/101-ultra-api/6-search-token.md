---
sidebar_label: "Search Token"
description: "Search tokens and their information by mint, name or symbol."
title: "Search Token"
---

<head>
    <title>Search Token</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note
Lite URL: `https://lite-api.jup.ag/ultra/v1/search`
Dynamic URL: `https://api.jup.ag/ultra/v1/search`

Dynamic Rate Limits are now applied to Ultra API.

- No Pro plans or payment needed.
- Simply generate the universal API Key via [Portal](https://portal.jup.ag)
- Rate limits scale together with your swap volume.

[Read more about Ultra API Dynamic Rate Limit](/docs/api-rate-limit).
:::

:::tip API Reference
To fully utilize the Ultra API, check out the [Ultra API Reference](/docs/api/ultra-api/search.api.mdx).
:::

## Search Token

The Ultra API provides an endpoint to search tokens in the background for you and returns you the search results, along with the mint information.

This is useful in most user applications, as users need to choose which tokens they want to swap. This also provides a seamless developer experience as integrating this allows us to handle and abstract the token search mechanism, allowing you to focus on other user features.

:::tip Search 
- Search for a token and its information by its **symbol, name or mint address**.
- Comma-separate to search for multiple.
- Limit to 100 mint addresses in query.
- Default to 20 mints in response when searching via symbol or name.
:::

```jsx
const searchResponse = await (
  await fetch(`https://lite-api.jup.ag/ultra/v1/search?query=So11111111111111111111111111111111111111112`)
).json();
```

## Search Response

The search response will return an array of mints, along with their information.

:::tip Useful Mint Information
- Token Metadata like name, symbol, icon to display token information to users
- [Organic Score](/docs/token-api/organic-score), Holder count, Market cap, etc can be useful to help make a better trading decision
- And much more!

Do note that the response is subject to changes as we continue to improve.

Refer to [Ultra API Reference](/docs/api/ultra-api/search) for full schema.
:::

**Successful example response:**

```jsx
[
  {
    id: 'So11111111111111111111111111111111111111112',
    name: 'Wrapped SOL',
    symbol: 'SOL',
    icon: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    decimals: 9,
    circSupply: 531207433.3986673,
    totalSupply: 603724547.3627878,
    tokenProgram: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    firstPool: {
      id: '58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2',
      createdAt: '2021-03-29T10:05:48Z'
    },
    holderCount: 2342610,
    audit: {
      mintAuthorityDisabled: true,
      freezeAuthorityDisabled: true,
      topHoldersPercentage: 1.2422471238911812
    },
    organicScore: 98.92390784896082,
    organicScoreLabel: 'high',
    isVerified: true,
    cexes: [
      'Binance', 'Bybit',
      'OKX',     'Upbit',
      'Bitget',  'Kraken',
      'KuCoin',  'MEXC',
      'Gate.io'
    ],
    tags: [ 'community', 'strict', 'verified' ],
    fdv: 87824499429.22047,
    mcap: 77275352037.79674,
    usdPrice: 145.47114211747515,
    priceBlockId: 349038717,
    liquidity: 89970631.83880953,
    stats5m: {
      priceChange: 0.021175445311831707,
      liquidityChange: -0.01230267453174984,
      volumeChange: 4.855149318222242,
      buyVolume: 14644327.188370818,
      sellVolume: 14743625.023908526,
      buyOrganicVolume: 269570.2345543641,
      sellOrganicVolume: 204114.37436445671,
      numBuys: 49281,
      numSells: 54483,
      numTraders: 18155,
      numOrganicBuyers: 981,
      numNetBuyers: 3503
    },
    stats1h: {
      priceChange: -0.145099593531635,
      liquidityChange: -0.13450589635262783,
      volumeChange: -15.928930753985316,
      buyVolume: 171520842.22567528,
      sellVolume: 174057197.5207193,
      buyOrganicVolume: 3099405.8562825476,
      sellOrganicVolume: 2975660.0383528043,
      numBuys: 586069,
      numSells: 649275,
      numTraders: 78145,
      numOrganicBuyers: 2716,
      numNetBuyers: 14442
    },
    stats6h: {
      priceChange: 0.3790495974473589,
      liquidityChange: 0.1659230330014905,
      volumeChange: 14.571340846647542,
      buyVolume: 1084625651.9256022,
      sellVolume: 1094488293.656417,
      buyOrganicVolume: 31145072.655369382,
      sellOrganicVolume: 31647431.25353508,
      numBuys: 3789847,
      numSells: 4363909,
      numTraders: 272131,
      numOrganicBuyers: 10849,
      numNetBuyers: 37155
    },
    stats24h: {
      priceChange: 1.5076363979360274,
      liquidityChange: 2.417364079880319,
      volumeChange: -2.1516094834673254,
      buyVolume: 4273248565.256824,
      sellVolume: 4306065610.69747,
      buyOrganicVolume: 109007133.8196669,
      sellOrganicVolume: 118085567.17983335,
      numBuys: 15125444,
      numSells: 17582713,
      numTraders: 754618,
      numOrganicBuyers: 28590,
      numNetBuyers: 80961
    },
    ctLikes: 4232,
    smartCtLikes: 522,
    updatedAt: '2025-06-25T05:02:21.034234634Z'
  }
]
```