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
| **Additional required accounts** | Do note that, you must have a valid **referral account** and **referral token accounts** for the specific token mints. |
| **Fee mint** | Jupiter will always dictate which token mint to collect the fees in. You must ensure that you have the valid referral token account created for the specific token mint.<br /><br />For example, if the swap is JUP -> JLP, the fee can be collected in JLP, and you will need a JLP referral token account initialized for it to work.<br /><br />Having a set of token accounts created for top mints will be sufficient for most cases, for example WSOL, USDC, USDT, etc. |
| **Default fees** | Jupiter Ultra API incurs a 0.05% or 0.1% fee to the transaction. If you plan to add fees to the transaction, the end user will be paying for your fees on top of the default Jupiter fees. |
| **Edge cases** | If the fee mint is JUP and you do not have a JUP referral token account initialized, regardless, the order will still return and can be executed without your fees. This is to ensure success rates and the best experience with Jupiter Ultra. Hence, please verify the transaction when testing with a new referral token account. |

## Step-by-step

1. Install additional dependencies.
2. Create `referralAccount`.
3. Create `referralTokenAccount` for each token mint.
4. Add `referralAccount` and `referralFee` to Ultra `/order` endpoint.
5. Sign and send the transaction via Ultra `/execute` endpoint.
6. Verify transaction and fees.

### Dependencies

```bash
npm install bs58
npm install @jup-ag/referral-sdk
npm install @solana/web3.js@1 # Using v1 of web3.js instead of v2
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

```
// .env
PRIVATE_KEY=""
```

To set up a development wallet via a wallet generated via [Solana CLI](https://solana.com/docs/intro/installation#solana-cli-basics), you can use the following script.

```jsx
import { Keypair } from '@solana/web3.js';
import fs from 'fs';

const privateKeyArray = JSON.parse(fs.readFileSync('../.config/solana/id.json', 'utf8').trim());
const wallet = Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
```
</details>

### Create `referralAccount`

- You should only need to create the referral account once.
- After this step, you need to [create the referral token accounts for each token mint](#create-referraltokenaccount).

```ts
import { bs58 } from "bs58";
import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, Keypair, sendAndConfirmTransaction } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const wallet = Keypair.fromSecretKey(bs58.decode(process.env.KEYPAIR || ""));

const provider = new ReferralProvider(connection);
const projectPubKey = new PublicKey('DkiqsTrw1u1bYFumumC7sCG2S8K25qc2vemJFHyW2wJc');
const referralAccountKeypair = Keypair.generate();

(async () => {
  const transaction = await provider.initializeReferralAccountWithName({
    payerPubKey: wallet.publicKey,
    partnerPubKey: wallet.publicKey,
    projectPubKey: projectPubKey,
    referralAccountPubKey: referralAccountKeypair.publicKey,
    name: "YourProtocolName",
  });

  const referralAccount = await connection.getAccountInfo(
    referralAccountKeypair.publicKey,
  );

  if (!referralAccount) {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      wallet,
      referralAccountKeypair,
    ]);
    console.log(
      'signature:', signature,
      '\ncreated referralAccountPubkey:', referralAccountKeypair.publicKey.toBase58()
    );
  } else {
    console.log(
      `referralAccount ${referralAccountKeypair.publicKey.toBase58()} already exists`,
    );
  }
})();
```

### Create `referralTokenAccount`

- You need to [create the `referralAccount` first](#create-referralaccount).
- You need to create a `referralTokenAccount` for each token mint you want to collect fees in.
- We don't recommend creating a token account for **every** token mint, as it costs rent and most tokens might not be valuable, instead created token accounts for top mints to begin with is sufficient for most cases (you can always add more later).

```ts
import { bs58 } from "bs58";
import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const wallet = Keypair.fromSecretKey(bs58.decode(process.env.KEYPAIR || ""));
const provider = new ReferralProvider(connection);

// the token mint you want to collect fees in
const mint = new PublicKey("So11111111111111111111111111111111111111112");

(async () => {
  const { transaction, referralTokenAccountPubKey } =
    await provider.initializeReferralTokenAccountV2({
      payerPubKey: wallet.publicKey,
      referralAccountPubKey: new PublicKey("insert referral account public key here"),
      mint,
    });

  const referralTokenAccount = await connection.getAccountInfo(
    referralTokenAccountPubKey,
  );

  if (!referralTokenAccount) {
    const signature = await sendAndConfirmTransaction(connection, transaction, [wallet]);
    console.log({
      'signature:', signature,
      'created referralTokenAccountPubKey:', referralTokenAccountPubKey.toBase58()
    });
  } else {
    console.log(
      `referralTokenAccount ${referralTokenAccountPubKey.toBase58()} for mint ${mint.toBase58()} already exists`,
    );
  }
})();
```

### Usage in Ultra 

- After creating the necessary accounts, you can now add the `referralAccount` and `referralFee` to the Ultra `/order` endpoint.
- From the order response, you should see the `feeBps` field, which is the total fee in bps (Jupiter's fee + your referral fee).
- Then, you can extract the transaction from the order response and sign it with your wallet.
- Finally, you can send the signed transaction to the `/execute` endpoint and verify the transaction.

:::danger
Do note that, if you do not have the specific fee mint's referral token account initialized, the order will still return and can be executed without your fees. This is to ensure success rates and the best experience with Jupiter Ultra.

Hence, please verify the transaction when testing with a new referral token account.
:::

```ts
const orderResponse = await (
  await fetch(
      'https://lite-api.jup.ag/ultra/v1/order?' + 
      'inputMint=So11111111111111111111111111111111111111112&' +
      'outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&' +
      'amount=100000000&' +
      'taker=jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3&' +
      'referralAccount=jdocuPgEAjMfihABsPgKEvYtsmMzjUHeq9LX4Hvs7f3&' + // insert referral account public key here
      'referralFee=100' // insert referral fee in basis points (bps)
  )
).json();

console.log(JSON.stringify(orderResponse, null, 2));

const transactionBase64 = orderResponse.transaction // Extract the transaction from the order response
const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64')); // Deserialize the transaction
transaction.sign([wallet.payer]); // Sign the transaction
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
- When claiming fees, the transaction will include the transfer of the fees to both Jupiter (Jupiter default fee) and your referral account (your referral fee).

```ts
import { bs58 } from "bs58";
import { ReferralProvider } from "@jup-ag/referral-sdk";
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const wallet = Keypair.fromSecretKey(bs58.decode(process.env.KEYPAIR || ""));
const provider = new ReferralProvider(connection);

(async () => {
  // This method will return a list of transactions for all claims batched by 5 claims for each transaction.
  const transactions = await provider.claimAllV2({
    payerPubKey: wallet.publicKey,
    referralAccountPubKey: new PublicKey("insert referral account public key here"),
  });

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

  // Send each claim transaction one by one.
  for (const transaction of transactions) {
    transaction.sign([wallet]);

    const signature = await connection.sendTransaction(transaction);
    const { value } = await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });

    if (value.err) {
      console.log({ value, signature });
    } else {
      console.log({ signature });
    }
  }
})();

```