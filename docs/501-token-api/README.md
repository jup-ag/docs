---
sidebar_label: "Using Token API"
description: "Use the Jupiter Token API for all tokens tradable or tagged via Jupiter."
title: "Token API"
---

<head>
    <title>Token API</title>
    <meta name="twitter:card" content="summary" />
</head>

Token API aims to provide accessibility to all Solana tokens that are tradable on Jupiter. The Token API is built with a tagging system which consists of tokens from [Jupiter's verification system](https://x.com/9yointern/status/1907425355071197347), LSTs and also the ability to support partner token tags.

Through the Token API, you can query by tags, mints, markets to get a list of tokens and also to get more on the token information.

:::info More About Token API
- [Background and History of the Ecosystem Token List](https://www.jupresear.ch/t/ecosystem-master-token-list/19786)
- [Introducing a new token verification method](https://x.com/9yointern/status/1907425355071197347) at https://verify.jup.ag
- [API Reference](/docs/api/token-api/quickstart.info.mdx)
:::

## Let's Get Started

In this guide, we will be going through a few examples of what Token API endpoints you can call to get the information you need.

:::note
Base URL: `https://lite-api.jup.ag/tokens/v1`

For higher rate limits, [refer to the API Key Setup doc](/docs/api-setup).
:::

---

## Get Token Information

Using this endpoint, you can get the token information of the specific mint address. In the following example, we are looking at getting the token information of the JUP token.

:::tip Helpful Information
In the response, you can see that we have identified the `tags`, [`freeze_authority`](https://spl.solana.com/token#freezing-accounts) and [`permanent_delegate`](https://spl.solana.com/token#authority-delegation) to help you or your users make informed decisions.
:::

```jsx
const tokenInfoResponse = await (
    await fetch('https://lite-api.jup.ag/tokens/v1/token/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN')
).json();

console.log(tokenInfoResponse);
```

From the above example, you should see this response.

```
{
    address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    name: 'Jupiter',
    symbol: 'JUP',
    decimals: 6,
    logoURI: 'https://static.jup.ag/jup/icon.png',
    tags: [ 'verified', 'strict', 'community', 'birdeye-trending' ],
    daily_volume: 79535977.0513354,
    created_at: '2024-04-26T10:56:58.893768Z',
    freeze_authority: null,
    mint_authority: null,
    permanent_delegate: null,
    minted_at: '2024-01-25T08:54:23Z',
    extensions: { coingeckoId: 'jupiter-exchange-solana' }
}
```

---

## Get Tokens In Market

Using this endpoint, you can get a list of token mints that belong to a market/pool address. In the following example, we use a [Meteora SOL-USDC market](https://solscan.io/account/BVRbyLjjfSBcoyiYFuxbgKYnWuiFaF9CSXEa5vdSZ9Hh).

```jsx
const marketTokensResponse = await (
    await fetch('https://lite-api.jup.ag/tokens/v1/market/BVRbyLjjfSBcoyiYFuxbgKYnWuiFaF9CSXEa5vdSZ9Hh/mints')
).json();

console.log(marketTokensResponse);
```

From the above example, you should see this response.

```
[
    'So11111111111111111111111111111111111111112',
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
]
```

---

## Get All Tradable Tokens

Using this endpoint, you can get a list of all token mints that are tradable on Jupiter.
- A new token (before market liquidity checks)
- Or tokens that has past the market liquidity checks
- These tokens should return a quote from the `/quote` endpoint and is able to swap.

```jsx
const allTradableResponse = await (
    await fetch('https://lite-api.jup.ag/tokens/v1/mints/tradable')
).json();

console.log(allTradableResponse);
```

From the above example, you should see this response.

```
[
    ...

    'So11111111111111111111111111111111111111112',
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    'jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v',
    'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    '27G8MtK7VtTcCHkpASjSDdkWWYfoqT6ggEuKidVJidD4',

    ...
]
```

---

## Get Tagged Tokens

Using this endpoint, you can get a list of token mints (with information) that are tagged according to the tag you pass in. In the following example, we use the `lst` tag.

:::tip
A list of useful tags are:

| **Token List Name** | **Description** |
|---|---|
| **verified** | A list of verified tokens, consisting of community-verified tokens via [catdetlist.jup.ag](https://catdetlist.jup.ag) and the previous standard of Jupiter Strict. |
| **lst** | A list of liquid staked tokens, maintained with Sanctum. |
| **token-2022** | A list of all token-2022 tokens. |

You can pass in multiple tags using a comma separated list, refer to the API Reference for more details.
:::

```jsx
const lstTaggedResponse = await (
    await fetch('https://lite-api.jup.ag/tokens/v1/tagged/lst')
).json();

console.log(lstTaggedResponse);
```

From the above example, you should see this response.

```
...

{
    address: 'jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v',
    name: 'Jupiter Staked SOL',
    symbol: 'JupSOL',
    decimals: 9,
    logoURI: 'https://static.jup.ag/jupSOL/icon.png',
    tags: [ 'verified', 'community', 'strict', 'lst' ],
    daily_volume: 24017778.687489692,
    created_at: '2024-04-26T10:57:45.759228Z',
    freeze_authority: null,
    mint_authority: 'EMjuABxELpYWYEwjkKmQKBNCwdaFAy4QYAs6W9bDQDNw',
    permanent_delegate: null,
    minted_at: '2024-03-25T09:28:04Z',
    extensions: { coingeckoId: 'jupiter-staked-sol' }
},

...
```

---

## Get New Tokens

Using this endpoint, you can get a list of token mints (with information) **sorted by `created_at` their timestamps**.

:::tip Paginate Large Response
The `/new` endpoint will return a large sized payload as response, you can utilize the `limit` and `offset` query parameters to help paginate the responses.

- `limit`: Refers to how many counts of data to be in the output.
- `offset`: Refers to how many counts of data to offset into the result set.
    - Used in conjunction with `limit` to page through the data.

Refer to the [API Reference](/docs/api/token-api/new.api.mdx) for more information.
:::

```jsx
const newTokensReponse = await (
    await fetch('https://lite-api.jup.ag/tokens/v1/new')
).json();

console.log(newTokensReponse);
```

From the above example, you should see this response.

```
{
    mint: 'penguin',
    created_at: '1733481083',
    metadata_updated_at: 1733481087,
    name: 'cool penguin',
    symbol: 'penguin',
    decimals: 6,
    logo_uri: 'https://jup.ag',
    known_markets: [ 'market' ],
    mint_authority: null,
    freeze_authority: null
},
{
    mint: 'cat',
    created_at: '1733481083',
    metadata_updated_at: 1733481087,
    name: 'cat moon',
    symbol: 'cat',
    decimals: 6,
    logo_uri: 'https://jup.ag',
    known_markets: [ 'market' ],
    mint_authority: null,
    freeze_authority: null
},
```

---

## Get All Tokens

Using the endpoint, you can simply query with the `all` resource to get all tokens that Jupiter has indexed through our infrastructure.

:::warning
Do note that calling this endpoint's resource will return **a large payload of 300+MB**, which would introduce some latency in the call. Please use carefully and intentionally, else utilize the other endpoints.

This endpoint does not support `limit` or `offset`.
:::

:::tip
To index your own tokens, you can use RPC APIs such as the [Metaplex Digital Asset Standard (DAS)](https://developers.metaplex.com/das-api). Major RPC providers like [Helius](https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api) and [Triton One](https://docs.triton.one/digital-assets-api/introduction) offer access to this API.
:::

```jsx
const allResponse = await (
  await fetch("https://lite-api.jup.ag/tokens/v1/all")
).json();

console.log(allResponse);
```

From the above example, you should see this response.

```
...

{
    address: 'So11111111111111111111111111111111111111112',
    name: 'Wrapped SOL',
    symbol: 'SOL',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    tags: [ 'verified', 'community', 'strict' ],
    daily_volume: 2873455332.377303,
    created_at: '2024-04-26T10:56:58.893768Z',
    freeze_authority: null,
    mint_authority: null,
    permanent_delegate: null,
    minted_at: null,
    extensions: { coingeckoId: 'wrapped-solana' }
},
{
    address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
    name: 'Jupiter',
    symbol: 'JUP',
    decimals: 6,
    logoURI: 'https://static.jup.ag/jup/icon.png',
    tags: [ 'verified', 'strict', 'community', 'birdeye-trending' ],
    daily_volume: 79535977.0513354,
    created_at: '2024-04-26T10:56:58.893768Z',
    freeze_authority: null,
    mint_authority: null,
    permanent_delegate: null,
    minted_at: '2024-01-25T08:54:23Z',
    extensions: { coingeckoId: 'jupiter-exchange-solana' }
},

...
```
