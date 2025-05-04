---
sidebar_label: "Add Fees To Ultra"
description: "Jupiter Ultra API allows you to add fees."
title: "Add Fees To Ultra"
---

<head>
    <title>Add Fees To Ultra</title>
    <meta name="twitter:card" content="summary" />
</head>

In this guide, we will be walking through the steps to create the necessary accounts for adding fees to your Ultra transaction.

## Important Notes

| Note | Description |
| --- | --- |
| **Additional required accounts** | It is required to have a valid **referral account** and **referral token accounts** for the specific token mints. These accounts are initalized with the Referral Program under the ["Jupiter Ultra" Referral Project](https://solscan.io/account/DkiqsTrw1u1bYFumumC7sCG2S8K25qc2vemJFHyW2wJc). |
| **Fee mint** | In the `/order` response, you will see the `feeMint` field which is the token mint we will collect the fees in for that particular order.<br /><br />Since Jupiter will always dictate which token mint to collect the fees in, you must ensure that you have the valid referral token account created for the specific fee mint. If it is not initialized, the order will still return and can be executed without your fees. This is to ensure success rates and the best experience with Jupiter Ultra. |
| **Jupiter fees** | By default, Jupiter Ultra incurs a 0.05% or 0.1% fee based on token mint. When you add a referral fee, Jupiter will take a flat 20% of your integrator fees, for example, if you plan to take 100bps, Jupiter will take 20bps from it. |
| **Integrator fees** | You can configure `referralFee` to be between 50bps to 255bps. The `/order` response will show the total fee in `feeBps` field which should be exactly what you specified in `referralFee`.<br /><br />Do note that, the referral token account has to be created before calling `/order` because during the request, we will check if the token account is initialized before applying your referral fee (if it is not applied, we will only apply our default fees). |
| **Limitations** | <li>Currently, we do not support fees for Token2022 tokens.</li><li>Setting up the referral accounts and token accounts can only be done via the SDK (the scripts provided in this guide), and not via the Referral Dashboard.</li> |

## Step-by-step

1. Install additional dependencies.
2. Create `referralAccount`.
3. Create `referralTokenAccount` for each token mint.
4. Add `referralAccount` and `referralFee` to Ultra `/order` endpoint.
5. Sign and send the transaction via Ultra `/execute` endpoint.
6. Verify transaction and fees.

<details>
    <summary>
        Full Code Example
    </summary>
```ts
import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction, sendAndConfirmRawTransaction } from "@solana/web3.js";
import fs from 'fs';

const connection = new Connection("https://api.mainnet-beta.solana.com");
const privateKeyArray = JSON.parse(fs.readFileSync('/Path/to/.config/solana/id.json', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));

const provider = new ReferralProvider(connection);
const projectPubKey = new PublicKey('DkiqsTrw1u1bYFumumC7sCG2S8K25qc2vemJFHyW2wJc');

async function initReferralAccount() {
  const transaction = await provider.initializeReferralAccountWithName({
    payerPubKey: wallet.publicKey,
    partnerPubKey: wallet.publicKey,
    projectPubKey: projectPubKey,
    name: "insert-name-here",
  });

  const referralAccount = await connection.getAccountInfo(
    transaction.referralAccountPubKey,
  );

  if (!referralAccount) {
    const signature = await sendAndConfirmTransaction(connection, transaction.tx, [wallet]);
    console.log('signature:', `https://solscan.io/tx/${signature}`);
    console.log('created referralAccountPubkey:', transaction.referralAccountPubKey.toBase58());
  } else {
    console.log(
      `referralAccount ${transaction.referralAccountPubKey.toBase58()} already exists`,
    );
  }
}

async function initReferralTokenAccount() {
  const mint = new PublicKey("So11111111111111111111111111111111111111112"); // the token mint you want to collect fees in
  
  const transaction = await provider.initializeReferralTokenAccountV2({
    payerPubKey: wallet.publicKey,
    referralAccountPubKey: new PublicKey("insert-referral-account-pubkey-here"), // you get this from the initReferralAccount function
    mint,
  });
  
    const referralTokenAccount = await connection.getAccountInfo(
      transaction.tokenAccount,
    );
  
    if (!referralTokenAccount) {
      const signature = await sendAndConfirmTransaction(connection, transaction.tx, [wallet]);
      console.log('signature:', `https://solscan.io/tx/${signature}`);
      console.log('created referralTokenAccountPubKey:', transaction.tokenAccount.toBase58());
      console.log('mint:', mint.toBase58());
    } else {
      console.log(
        `referralTokenAccount ${transaction.tokenAccount.toBase58()} for mint ${mint.toBase58()} already exists`,
      );
    }
}

async function claimAllTokens() {
  const transactions = await provider.claimAllV2({
    payerPubKey: wallet.publicKey,
    referralAccountPubKey: new PublicKey("insert-referral-account-pubkey-here"),
  })

  // Send each claim transaction one by one.
  for (const transaction of transactions) {
    transaction.sign([wallet]);

    const signature = await sendAndConfirmRawTransaction(connection, transaction.serialize(), [wallet]);
    console.log('signature:', `https://solscan.io/tx/${signature}`);
  }
}

// initReferralAccount(); // you should only run this once
// initReferralTokenAccount();
// claimAllTokens();
```
</details>

### Dependencies

```bash
npm install @jup-ag/referral-sdk
npm install @solana/web3.js@1 # Using v1 of web3.js instead of v2
npm install bs58
npm install dotenv # if required for wallet setup
```

<details>
    <summary>
        RPC Connection and Wallet Setup
    </summary>
**Set up RPC Connection**

:::note
Solana provides a [default RPC endpoint](https://solana.com/docs/core/clusters). However, as your application grows, we recommend you to always use your own or provision a 3rd party provider’s RPC endpoint such as [Helius](https://helius.dev/) or [Triton](https://triton.one/).
:::

```jsx
import { Connection } from "@solana/web3.js";

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
import dotenv from 'dotenv';
require('dotenv').config();

const wallet = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || ''));
```

```bash
# .env
PRIVATE_KEY=""
```

To set up a development wallet via a wallet generated via [Solana CLI](https://solana.com/docs/intro/installation#solana-cli-basics), you can use the following script.

```jsx
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

const privateKeyArray = JSON.parse(fs.readFileSync('/Path/To/.config/solana/id.json', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
```
</details>

### Create `referralAccount`

- You should only need to create the referral account once.
- After this step, you need to [create the referral token accounts for each token mint](#create-referraltokenaccount).

```ts
import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const privateKeyArray = JSON.parse(fs.readFileSync('/Path/to/.config/solana/id.json', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
const provider = new ReferralProvider(connection);
const projectPubKey = new PublicKey('DkiqsTrw1u1bYFumumC7sCG2S8K25qc2vemJFHyW2wJc'); // Jupiter Ultra Referral Project

async function initReferralAccount() {
  const transaction = await provider.initializeReferralAccountWithName({
    payerPubKey: wallet.publicKey,
    partnerPubKey: wallet.publicKey,
    projectPubKey: projectPubKey,
    name: "insert-name-here",
  });

  const referralAccount = await connection.getAccountInfo(
    transaction.referralAccountPubKey,
  );

  if (!referralAccount) {
    const signature = await sendAndConfirmTransaction(connection, transaction.tx, [wallet]);
    console.log('signature:', `https://solscan.io/tx/${signature}`);
    console.log('created referralAccountPubkey:', transaction.referralAccountPubKey.toBase58());
  } else {
    console.log(
      `referralAccount ${transaction.referralAccountPubKey.toBase58()} already exists`,
    );
  }
}
```

### Create `referralTokenAccount`

- You need to [create the `referralAccount` first](#create-referralaccount).
- You need to create a `referralTokenAccount` for each token mint you want to collect fees in.
- We don't recommend creating a token account for **every** token mint, as it costs rent and most tokens might not be valuable, instead created token accounts for top mints to begin with (you can always add more later).

```ts
import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const privateKeyArray = JSON.parse(fs.readFileSync('/Path/to/.config/solana/id.json', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
const provider = new ReferralProvider(connection);

async function initReferralTokenAccount() {
  const mint = new PublicKey("So11111111111111111111111111111111111111112"); // the token mint you want to collect fees in
  
  const transaction = await provider.initializeReferralTokenAccountV2({
    payerPubKey: wallet.publicKey,
    referralAccountPubKey: new PublicKey("insert-referral-account-pubkey-here"),
    mint,
  });
  
    const referralTokenAccount = await connection.getAccountInfo(
      transaction.tokenAccount,
    );
  
    if (!referralTokenAccount) {
      const signature = await sendAndConfirmTransaction(connection, transaction.tx, [wallet]);
      console.log('signature:', `https://solscan.io/tx/${signature}`);
      console.log('created referralTokenAccountPubKey:', transaction.tokenAccount.toBase58());
      console.log('mint:', mint.toBase58());
    } else {
      console.log(
        `referralTokenAccount ${transaction.tokenAccount.toBase58()} for mint ${mint.toBase58()} already exists`,
      );
    }
}
```

### Usage in Ultra 

- After creating the necessary accounts, you can now add the `referralAccount` and `referralFee` to the Ultra `/order` endpoint.
- From the order response, you should see the `feeMint` field, which is the token mint we will collect the fees in for that particular order.
- From the order response, you should see the `feeBps` field, which is the total fee in bps, which should be exactly what you specified in `referralFee`.
- Then, you can sign and send the transaction via the Ultra `/execute` endpoint.

:::danger
Do note that, during your request to `/order`, we will check if the specific fee mint's referral token account is initialized. If it is not, the order will still return and can be executed without your fees. This is to ensure success rates and the best experience with Jupiter Ultra.

Hence, please verify the transaction when testing with a new referral token account, and always create the referral token account before calling `/order`.
:::

```ts
import { Keypair, VersionedTransaction } from "@solana/web3.js";
import fs from 'fs';

const privateKeyArray = JSON.parse(fs.readFileSync('/Path/to/.config/solana/id.json', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));

const orderResponse = await (
  await fetch(
      'https://lite-api.jup.ag/ultra/v1/order?' + 
      'inputMint=So11111111111111111111111111111111111111112&' +
      'outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&' +
      'amount=100000000&' +
      'taker=jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3&' +
      'referralAccount=&' + // insert referral account public key here
      'referralFee=50' // insert referral fee in basis points (bps)
  )
).json();

console.log(JSON.stringify(orderResponse, null, 2));

const transactionBase64 = orderResponse.transaction // Extract the transaction from the order response
const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64')); // Deserialize the transaction
transaction.sign([wallet]); // Sign the transaction
const signedTransaction = Buffer.from(transaction.serialize()).toString('base64'); // Serialize the transaction to base64 format

const executeResponse = await (
    await fetch('https://lite-api.jup.ag/ultra/v1/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            signedTransaction: signedTransaction,
            requestId: orderResponse.requestId,
        }),
    })
).json();

if (executeResponse.status === "Success") {
    console.log('Swap successful:', JSON.stringify(executeResponse, null, 2));
    console.log(`https://solscan.io/tx/${executeResponse.signature}`);
} else {
    console.error('Swap failed:', JSON.stringify(executeResponse, null, 2));
    console.log(`https://solscan.io/tx/${executeResponse.signature}`);
}
```

## Claim All Fees

- The `claimAllV2` method will return a list of transactions to claim all fees and are batched by 5 claims for each transaction.
- The code signs and sends the transactions one by one - you can also Jito Bundle to send multiple at once, if preferred.
- When claiming fees, the transaction will include the transfer of the fees to both your referral account and Jupiter's (20% of your integrator fees).

```ts
import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, Keypair, PublicKey, sendAndConfirmRawTransaction } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const privateKeyArray = JSON.parse(fs.readFileSync('/Path/to/.config/solana/id.json', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
const provider = new ReferralProvider(connection);

async function claimAllTokens() {
  const transactions = await provider.claimAllV2({
    payerPubKey: wallet.publicKey,
    referralAccountPubKey: new PublicKey("insert-referral-account-pubkey-here"),
  })

  // Send each claim transaction one by one.
  for (const transaction of transactions) {
    transaction.sign([wallet]);

    const signature = await sendAndConfirmRawTransaction(connection, transaction.serialize(), [wallet]);
    console.log('signature:', `https://solscan.io/tx/${signature}`);
  }
}
```