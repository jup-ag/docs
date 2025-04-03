---
sidebar_label: "Environment Setup"
description: "Get Started with setting up libraries, connection and local wallet to build with Jupiter API."
title: "Environment Setup"
---

<head>
    <title>Environment Setup</title>
    <meta name="twitter:card" content="summary" />
</head>

:::note about the documentation
In the documentation, we are using the Solana `web3.js` library to set up connection, sign transactions, etc.
:::

## Useful Libraries

**JavaScript Libraries**

- `@solana/web3.js`
- `@coral-xyz/anchor`
- `@solana/spl-token`
- `@jup-ag/referral-sdk`
- `bs58`
- `cross-fetch`

## Useful Scripts

**Set up RPC Connection**

:::note
Solana provides a [default RPC endpoint](https://solana.com/docs/core/clusters). However, as your application grows, we recommend you to always use your own or provision a 3rd party provider’s RPC endpoint such as [Helius](https://helius.dev/) or [Triton](https://triton.one/).
:::

```jsx
const connection = new Connection('https://api.mainnet-beta.solana.com');
```

**Set up Development Wallet**

:::note
- You can paste in your private key for testing purposes but this is not recommended for production applications.
- If you want to store your private key in the project directly, you can do it via a `.env` file.
:::

To set up a development wallet via `.env` file, you can use the following script.

```jsx
// index.js
import { Keypair } from '@solana/web3.js';
import { Wallet } from '@coral-xyz/anchor';
import dotenv from 'dotenv';
require('dotenv').config();

const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || '')));
```

```
// .env
PRIVATE_KEY=""
```

To set up a development wallet via a wallet generated via [Solana CLI](https://solana.com/docs/intro/installation#solana-cli-basics), you can use the following script.

```jsx
import { Keypair } from '@solana/web3.js';
import { Wallet } from '@coral-xyz/anchor';
import fs from 'fs';

const privateKeyArray = JSON.parse(fs.readFileSync('../.config/solana/id.json', 'utf8').trim());
const wallet = new Wallet(Keypair.fromSecretKey(new Uint8Array(privateKeyArray)));
```
