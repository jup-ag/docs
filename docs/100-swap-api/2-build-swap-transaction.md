---
sidebar_label: "Build Swap Transaction"
description: "Jupiter Swap API helps you to build your swap transaction using the quote."
title: "Build Swap Transaction"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
    <title>Build Swap Transaction</title>
    <meta name="twitter:card" content="summary" />
</head>

The Swap API is one of the ways for you to interact with the Jupiter Swap Aggregator program. Before you send a transaction to the network, you will need to build the transaction that defines the instructions to execute and accounts to read/write to. 

It can be complex to handle this yourself, but good news! Most of our APIs and SDKs just handles it for you, so you get a response with the transaction to be prepared and sent to the network.

:::tip Use Swap API to handle it for you or ...

If you are looking to interact with the Jupiter Swap Aggregator program in a different way, check out the other guides:

#### Swap Instructions
To compose with instructions and build your own transaction, [read how to use the `/swap-instructions` in this section](#build-your-own-transaction-with-instructions).

#### Flash Fill or Cross Program Invocation (CPI)
To interact with your own Solana program, [read how to use the **Flash Fill method** or **CPI** in this section](#build-your-own-transaction-with-flash-fill-or-cpi).
:::

## Let’s Get Started

In this guide, we will pick up from where [**Get Quote**](./1-get-quote.md) guide has left off.

If you have not set up your environment to use the necessary libraries, the RPC connection to the network and successfully get a quote from the Quote API, please start at [Environment Setup](/docs/environment-setup) or [get quote](./1-get-quote.md).

:::tip API Reference
To fully utilize the Swap API, check out the [Swap API or Swap Instructions Reference](/docs/api/swap-api/swap.api.mdx).
:::

## Swap API



:::note
- Lite URL: `https://lite-api.jup.ag/swap/v1/swap/v1/swap`
- Pro URL: `https://api.jup.ag/swap/v1/swap`

To upgrade to Pro or understand our rate limiting, please refer to this section.
- [API Key Setup](/docs/api-setup)
- [API Rate Limit](/docs/api-rate-limit)
:::

From the previous guide on getting a quote, now using the quote response and your wallet, you can receive a **serialized swap transaction** that needs to be prepared and signed before sending to the network.

## Get Serialized Transaction

Using the root URL and parameters to pass in, it is as simple as the example code below!

:::tip Optimizing for Transaction Landing is super super important!
This code block includes additional parameters that our Swap API supports, such as estimating compute units, priority fees and slippage, to optimize for transaction landing.

To understand how these parameters help, the next step, [Send Swap Transaction guide](./3-send-swap-transaction.md) will discuss them.
:::

```jsx
const swapResponse = await (
await fetch('https://lite-api.jup.ag/swap/v1/swap', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    quoteResponse,
    userPublicKey: wallet.publicKey,
    
    // ADDITIONAL PARAMETERS TO OPTIMIZE FOR TRANSACTION LANDING
    // See next guide to optimize for transaction landing
    dynamicComputeUnitLimit: true,
    dynamicSlippage: true,
    prioritizationFeeLamports: {
          priorityLevelWithMaxLamports: {
            maxLamports: 1000000,
            priorityLevel: "veryHigh"
          }
        }
    })
})
).json();

console.log(swapResponse);
```

From the above example, you should see this response.

```json
{
    swapTransaction: 'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAGDkS+3LuGTbs......+/oD9qb31dH6i0QZ2IHELXUX3Y1YeW79p9Stkqk12z4yvZFJiQ4GCQwLBwYQBgUEDggNTQ==',
    lastValidBlockHeight: 279632475,
    prioritizationFeeLamports: 9999,
    computeUnitLimit: 388876,
    prioritizationType: {
        computeBudget: { 
            microLamports: 25715,
            estimatedMicroLamports: 785154 
        }
    },
    dynamicSlippageReport: {
        slippageBps: 50,
        otherAmount: 20612318,
        simulatedIncurredSlippageBps: -18,
        amplificationRatio: '1.5',
        categoryName: 'lst',
        heuristicMaxSlippageBps: 100
    },
    simulationError: null
}
```

## What’s Next

Now, you are able to get a quote and use our Swap API to build the swap transaction for you. Next steps is to proceed to prepare and sign the transaction and send the signed transaction to the network.

**[Let’s go sign and send!](./3-send-swap-transaction.md)**

---

## Additional Resources

### Build Your Own Transaction With Instructions

If you prefer to compose with instructions instead of the provided transaction that is returned from the `/swap` endpoint (like the above example). You can post to `/swap-instructions` instead, it takes the same parameters as the `/swap` endpoint but returns you the instructions rather than the serialized transaction.

:::note
In some cases, you may add more accounts to the transaction, which may exceed the transaction size limits. To work around this, you can use the `maxAccounts` parameter in `/quote` endpoint to limit the number of accounts in the transaction.

[Refer to the GET /quote's `maxAccounts` guide for more details.](/docs/swap-api/get-quote#max-accounts)
:::

<details>
    <summary>
        <div>
            <div>
                <b>/swap-instructions code snippet</b>
            </div>
        </div>
    </summary>
Example code snippet of using `/swap-instruction`

```jsx
const instructions = await (
    await fetch('https://lite-api.jup.ag/swap/v1/swap-instructions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        quoteResponse,
        userPublicKey: wallet.publicKey,
    })
    })
).json();

if (instructions.error) {
    throw new Error("Failed to get swap instructions: " + instructions.error);
}

const {
    tokenLedgerInstruction, // If you are using `useTokenLedger = true`.
    computeBudgetInstructions, // The necessary instructions to setup the compute budget.
    setupInstructions, // Setup missing ATA for the users.
    swapInstruction: swapInstructionPayload, // The actual swap instruction.
    cleanupInstruction, // Unwrap the SOL if `wrapAndUnwrapSol = true`.
    addressLookupTableAddresses, // The lookup table addresses that you can use if you are using versioned transaction.
} = instructions;

const deserializeInstruction = (instruction) => {
    return new TransactionInstruction({
    programId: new PublicKey(instruction.programId),
    keys: instruction.accounts.map((key) => ({
        pubkey: new PublicKey(key.pubkey),
        isSigner: key.isSigner,
        isWritable: key.isWritable,
    })),
    data: Buffer.from(instruction.data, "base64"),
    });
};

const getAddressLookupTableAccounts = async (
    keys: string[]
): Promise<AddressLookupTableAccount[]> => {
    const addressLookupTableAccountInfos =
    await connection.getMultipleAccountsInfo(
        keys.map((key) => new PublicKey(key))
    );

    return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
    const addressLookupTableAddress = keys[index];
    if (accountInfo) {
        const addressLookupTableAccount = new AddressLookupTableAccount({
        key: new PublicKey(addressLookupTableAddress),
        state: AddressLookupTableAccount.deserialize(accountInfo.data),
        });
        acc.push(addressLookupTableAccount);
    }

    return acc;
    }, new Array<AddressLookupTableAccount>());
};

const addressLookupTableAccounts: AddressLookupTableAccount[] = [];

addressLookupTableAccounts.push(
    ...(await getAddressLookupTableAccounts(addressLookupTableAddresses))
);

const blockhash = (await connection.getLatestBlockhash()).blockhash;
const messageV0 = new TransactionMessage({
    payerKey: payerPublicKey,
    recentBlockhash: blockhash,
    instructions: [
    // uncomment if needed: ...setupInstructions.map(deserializeInstruction),
    deserializeInstruction(swapInstructionPayload),
    // uncomment if needed: deserializeInstruction(cleanupInstruction),
    ],
}).compileToV0Message(addressLookupTableAccounts);
const transaction = new VersionedTransaction(messageV0);
```
</details>

### Build Your Own Transaction With Flash Fill Or CPI

If you prefer to interact with the Jupiter Swap Aggregator program with your own on-chain program. There are 2 ways to do it, typically on-chain program call **Cross Program Invocation (CPI)** to interact with each other, we also have another method called **Flash Fill** built by Jupiter (due to limitations of CPI in the past).

:::info CPI is now recommended!
As of January 2025, Jupiter Swap via CPI is recommended for most users.

[The `Loosen CPI restriction` feature has been deployed on Solana, you can read more here](https://github.com/solana-labs/solana/issues/26641).
:::

:::tip Why Flash Fill?

With Jupiter's complex routing, best prices comes at a cost. It often means more compute resources and accounts are required as it would route across multiple DEXes in one transaction.

Solana transactions are limited to 1232 bytes, Jupiter is using [Address Lookup Tables (ALTs)](https://docs.solana.com/developing/lookup-tables) to include more accounts in one transaction. However, the CPI method cannot use ALTs, which means when you add more accounts to a Jupiter Swap transaction, it will likely fail if it exceeds the transaction size limits.

**Flash Fill allows the use of Versioned Transaction and ALTs**, hence, reducing the total accounts used for a Jupiter Swap transaction.
:::

<details>
    <summary>
        <div>
            <div>
                <b>CPI References</b>
            </div>
        </div>
    </summary>

**A CPI transaction will be composed of these instructions:**
1. Borrow enough SOL from the program to open a wSOL account that the program owns.
2. Swap X token from the user to wSOL on Jupiter via CPI.
3. Close the wSOL account and send it to the program.
4. The program then transfers the SOL back to the user.

**Links and Resources:**
- https://github.com/jup-ag/jupiter-cpi-swap-example
- https://github.com/jup-ag/sol-swap-cpi

<details>
    <summary>
        <div>
            <div>
                <b>To ease integration via CPI, you may add the following crate <a href="https://github.com/jup-ag/jupiter-cpi">jupiter-cpi</a> to your program.</b>
            </div>
        </div>
    </summary>

In cargo.toml<br />

```toml
[dependencies]
jupiter-cpi = { git = "https://github.com/jup-ag/jupiter-cpi", rev = "5eb8977" }
```

In your code

```rust
use jupiter_cpi;
...

let signer_seeds: &[&[&[u8]]] = &[...];

// Pass accounts to context one-by-one and construct accounts here
// Or in practise, it may be easier to use remaining_accounts
// https://book.anchor-lang.com/anchor_in_depth/the_program_module.html

let accounts = jupiter_cpi::cpi::accounts::SharedAccountsRoute {
    token_program: ,
    program_authority: ,
    user_transfer_authority: ,
    source_token_account: ,
    program_source_token_account: ,
    program_destination_token_account: ,
    destination_token_account: ,
    source_mint: ,
    destination_mint: ,
    platform_fee_account: ,
    token_2022_program: ,
};
let cpi_ctx = CpiContext::new_with_signer(
    ctx.accounts.jup.to_account_info(),
    accounts,
    signer_seeds,
);

jupiter_cpi::cpi::shared_accounts_route(
    cpi_ctx,
    id,
    route_plan,
    in_amount,
    quoted_out_amount,
    slippage_bps,
    platform_fee_bps,
);

...
```

</details>

</details>

<details>
    <summary>
        <div>
            <div>
                <b>Flash Fill References</b>
            </div>
        </div>
    </summary>

**A Flash Fill transaction will be composed of these instructions:**

1. Borrow enough SOL for opening the wSOL account from this program.
2. Create the wSOL account for the borrower.
3. Swap X token to wSOL.
4. Close the wSOL account and send it to the borrower.
5. Repay the SOL for opening the wSOL account back to this program.

**Links and resources:**
- https://github.com/jup-ag/sol-swap-flash-fill

</details>
