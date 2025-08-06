---
sidebar_label: 'Create DBC (Beta)'
description: 'Create and launch tokens on Jupiter Studio via API.'
title: 'Create DBC (Beta)'
---

<head>
    <title>Create DBC (Beta)</title>
    <meta name='twitter:card' content='summary' />
</head>

:::note
- Lite URL: `https://lite-api.jup.ag/studio/v1`: 5 requests per 60 seconds
- Pro URL: `https://api.jup.ag/studio/v1`: 5 requests per 10 seconds

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

:::tip API Reference
To fully utilize the Studio API, check out the [Studio API Reference](/docs/api/studio-api).
:::

## Prerequisite

<details>
    <summary>
        <div>
            <div>
                <b>Dependencies</b>
            </div>
        </div>
    </summary>

```bash
npm install @solana/web3.js@1 # Using v1 of web3.js instead of v2
npm install dotenv # If required for wallet setup
```
</details>

<details>
    <summary>
        <div>
            <div>
                <b>Wallet</b>
            </div>
        </div>
    </summary>

**Set up Development Wallet**

:::note
- You can paste in your private key for testing purposes but this is not recommended for production applications.
- If you want to store your private key in the project directly, you can do it via a `.env` file.
:::

To set up a development wallet via `.env` file, you can use the following script.

```jsx
// index.js
import { Keypair } from '@solana/web3.js';
import dotenv from 'dotenv';
require('dotenv').config();

const wallet = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || ''));
```

```bash
# .env
PRIVATE_KEY=''
```

To set up a development wallet via a wallet generated via [Solana CLI](https://solana.com/docs/intro/installation#solana-cli-basics), you can use the following script.

```jsx
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

const privateKeyArray = JSON.parse(fs.readFileSync('/Path/To/.config/solana/id.json', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
```
</details>

## Create Transaction

This endpoint helps you create a few key components to launch your token on Studio.

1. `transaction`: A base64-encoded unsigned transaction.
2. `mint`: The mint of the token that is being created.
3. `imagePresignedUrl`: A `PUT` request endpoint to upload your token image.
4. `metadataPresignedUrl`: A `PUT` request endpoint to upload your token metadata.
5. `imageUrl`: The token's static image url to be used in the metadata.

:::tip Presets
On https://jup.ag/studio, you can find a few different presets to get you started.

<details>
    <summary>
        <div>
            <div>
                <b>Meme</b>
            </div>
        </div>
    </summary>
**Great for memes, similar profile to traditional meme launches.**
- People begin buying your token at 16K Market Cap (MC) in USDC.
- It graduates to a Meteora pool at 69K MC.
- Your pool raises ~17.94K USDC before graduation.

```json
buildCurveByMarketCapParam: {
    quoteMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    initialMarketCap: 16000,
    migrationMarketCap: 69000,
    tokenQuoteDecimal: 6,
    lockedVestingParam: {
        totalLockedVestingAmount: 0,
        cliffUnlockAmount: 0,
        numberOfVestingPeriod: 0,
        totalVestingDuration: 0,
        cliffDurationFromMigrationTime: 0,
    },
},
antiSniping: false,
isLpLocked: true,
tokenName: '',
tokenSymbol: '',
tokenImageContentType: 'image/jpeg',
creator: wallet.publicKey.toBase58(),
```
</details>

<details>
    <summary>
        <div>
            <div>
                <b>Indie</b>
            </div>
        </div>
    </summary>
**For projects ready to take it up a notch. More capital required to bond, but you'll have deeper liquidity and more LP fees when you graduate.**
- People begin buying your token at 32k Market Cap (MC) in USDC.
- It graduates to a Meteora pool at 240k MC.
- Your pool raises ~57.78K USDC before graduation.
- 10% of total supply will be vested daily over 12 months.

```json
buildCurveByMarketCapParam: {
    quoteMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    initialMarketCap: 32000,
    migrationMarketCap: 240000,
    tokenQuoteDecimal: 6,
    lockedVestingParam: {
        totalLockedVestingAmount: 100000000,
        cliffUnlockAmount: 0,
        numberOfVestingPeriod: 365,
        totalVestingDuration: 31536000,
        cliffDurationFromMigrationTime: 0,
    },
},
antiSniping: true,
isLpLocked: true,
tokenName: '',
tokenSymbol: '',
tokenImageContentType: 'image/jpeg',
creator: wallet.publicKey.toBase58(),
```
</details>

<details>
    <summary>
        <div>
            <div>
                <b>Custom</b>
            </div>
        </div>
    </summary>
Just pass in the parameters you need!
</details>
:::

```jsx
const createTransaction = await (
    await fetch (
      'https://lite-api.jup.ag/studio/v1/dbc-pool/create-tx', 
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            buildCurveByMarketCapParam: {
                quoteMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // or SOL or JUP
                initialMarketCap: 16000, // This means 16_000 USDC
                migrationMarketCap: 69000, // This means 69_000 USDC
                tokenQuoteDecimal: 6,
                lockedVestingParam: {
                    totalLockedVestingAmount: 0,
                    cliffUnlockAmount: 0,
                    numberOfVestingPeriod: 0,
                    totalVestingDuration: 0,
                    cliffDurationFromMigrationTime: 0,
                },
            },
            antiSniping: true,
            isLpLocked: true,
            tokenName: '',
            tokenSymbol: '',
            tokenImageContentType: 'image/jpeg',
            creator: wallet.publicKey.toBase58(),
        }, null, 2)
    })
).json();
```

## Upload Image

From the response of the `create-tx` endpoint, we will need the `imagePresignedUrl` to make a **`PUT` request** to the url provided, in order to upload the token image.

```jsx
const imageResponse = await fetch(createTransaction.imagePresignedUrl, {
    method: 'PUT',
    headers: {
        'Content-Type': 'image/jpeg', // Adjust based on the image type passed in previously
    },
    body: fs.readFileSync('./token.jpeg'), // Assuming the image file is located in the same folder
});
```

## Upload Metadata

From the response of the `create-tx` endpoint, we will need the `metadataPresignedUrl` to make a **`PUT` request** to the url provided, in order to upload the token metadata.

```jsx
const metadataResponse = await fetch(createTransaction.metadataPresignedUrl, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: '',
        symbol: '',
        description: '',
        image: createTransaction.imageUrl,
        website: '',
        twitter: '',
        telegram: '',
    }, null, 2),
});
```

## Submit Transaction

After you have uploaded your token image and token metadata, you can proceed to signing and making a post request to the `submit` endpoint - this will allow Jupiter Studio to complete the transaction and submit it to the network on your behalf.

:::note
Do note that the endpoint expects the `requestBody`'s `content` to be in [`multipart/form-data` format](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects).
:::

```jsx
import { VersionedTransaction } from '@solana/web3.js';
import fs from 'fs';

const transaction = VersionedTransaction.deserialize(Buffer.from(createTransaction.transaction, 'base64'));
transaction.sign([wallet]);
const signedTransaction = Buffer.from(transaction.serialize()).toString('base64');

const formData = new FormData();
formData.append('transaction', signedTransaction);
formData.append('owner', wallet.publicKey.toBase58());

const result = await (
    await fetch (
      'https://lite-api.jup.ag/studio/v1/dbc-pool/submit', 
      {
        method: 'POST',
        body: formData,
    })
).json();
```
