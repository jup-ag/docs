---
sidebar_label: "Development Basics"
description: "Under development basics on Solana to build with Jupiter API."
title: "Development Basics"
---

<head>
    <title>Development Basics</title>
    <meta name="twitter:card" content="summary" />
</head>

:::tip where is jupiter?
Jupiter is built on Solana MAINNET only!
:::

Solana uses an account-based architecture where data are stored in accounts. However, Solana keeps Programs (also known as smart contracts on other blockchains) and Accounts distinct. In order to mutate the data in Accounts, you will need to send transactions to the network which execute Instructions defined by Programs.

- [Programs](https://solana.com/docs/core/programs) on Solana are executable code deployed on-chain. They are designed to execute instructions, process transactions and interact with accounts.
- [Instructions](https://solana.com/docs/core/transactions#instruction) on Solana are defined by the Program, similar to API endpoints exposed by a program.
- [Accounts](https://solana.com/docs/core/accounts) store data and are mutable, meaning they can be updated by the program who interacts with them.
- [Transactions](https://solana.com/docs/core/transactions#transaction) is what we send to interact with the network which can include one or more instructions to execute what is needed.

## Interacting with Solana

The Solana Web3.js and Rust client libraries serve as essential interfaces for interacting with Solana in JavaScript/TypeScript and Rust environments, respectively. They abstract complex interactions with the network, providing easier and more accessible functions for developers building on Solana. Here’s an overview of what each library offers and some of the most common functions they simplify:

1. Connecting to the network via RPC (Remote Procedure Call) endpoints
2. Building Transactions
3. Interfacing with Solana Programs and Accounts

:::note links
Explore the rich features and detailed documentation of these libraries in the official Solana Developer Documentation: [Web3.js](https://solana.com/docs/clients/javascript) and [Rust client](https://solana.com/docs/clients/rust)
:::

## Interacting with Jupiter Programs

To interact with the Jupiter Swap Aggregator Program, there are a few ways to do it:

| Method | Description |
| --- | --- |
| Swap API | Simply call the Quote API to get a quote based on Jupiter’s routing engine and call the Swap API to get a serialized transaction to send to the network. |
| Flash Fill method | If you are building your own on-chain program, an alternative method from CPI, using Versioned Transaction and Address Lookup Tables, thus reducing the size of each account (used to be a limitation of using CPI method). |
| [Cross Program Invocation (CPI)](https://solana.com/docs/core/cpi) | CPI method is now recommended. As of January 2025, Jupiter Swap via CPI is recommended for most users. [The `Loosen CPI restriction` feature has been deployed on Solana, you can read more here](https://github.com/solana-labs/solana/issues/26641). |

## Building Transactions

Before you send a transaction to the network, you will need to build the transaction that defines the instructions to execute and accounts to read/write to. It can be complex to handle this yourself when building with Jupiter, you can [read more about it here](https://solana.com/docs/core/transactions).

However, good news! Most of our APIs and SDKs just handles it for you, so you get a response with the transaction to be prepared and sent to the network.

:::tip swap api tip
The Swap API returns you the serialized transaction which you can directly send it to your RPC endpoint to execute on Solana. Alternatively, if you plan to manipulate the instructions and build your own custom transactions, you can request from the `/swap-instructions` endpoint.
:::

## Sending Transactions

Transactions on Solana can only be sent to the network through an RPC (Remote Procedure Call) endpoint. The Solana network operates with a client-server model where RPC nodes handle transactions and interact with the validators of the blockchain. We recommend using 3rd party RPC providers like [Triton](https://triton.one/) or [Helius](https://helius.dev/) for production applications.

There are a few key points to note when sending transactions to the Solana network. At Jupiter, we do our best to help you optimize transaction sending and make it easier for you.

1. Solana transaction base fee
2. Priority fee
3. Compute units
4. Transaction broadcasting methods
5. Slippage (100% slippage will probably always work but also mean you can possibly get the worst outcome, so we need to find the balance between success optimizations and best output price)

## More about these factors?

### What is Priority Fee?

Transactions submitted to the blockchain are prioritized based on a fee-bidding process. The higher the priority fee, the higher your transaction will be placed in the execution queue.

:::info Overpaying Priority Fee
It is important to note that overpaying for priority fee can be detrimental in the long run. If transactions continuously outbid each other, the overall fees required to process across the network will increase over time.
:::

**Priority Fee** is an optional fee you can pay additionally to improve the chance of landing your transactions faster.

- Priority Fee = **Compute Budget * Compute Unit Price**
- This is excluding the base transaction fee (5,000 lamports or 0.000005 SOL) that you always need to pay.
- You not only need to outbid other transactions trying to be included in the block, but also outbid those trying to write to the same account.

| Terminologies |  |
| --- | --- |
| Global Priority Fee | The Priority Fee estimation across the entire network. |
| Local Fee Market | The Priority Fee estimation when modifying a writable account (or hot account). |
| Priority Fee | Compute Budget * Compute Unit Price |
| Compute Budget | How much compute unit the transaction is supposed to consume |
| Compute Unit Price | Micro lamports per compute unit the transaction will use

When querying the micro-lamport per compute unit for a particular program or account, it will contain both the Global and Local Fee markets.

### What is Compute Unit?

Compute Unit (CU) is a standardized metric for evaluating how much "work" or "resource" is required by the transaction to execute. Different operations on Solana has varying amounts of CUs. In order to keep the blockchain efficient yet fast, each transaction, the Solana runtime has an absolute max compute unit limit of 1.4 million CU and sets a default requested max limit of 200k CU per instruction.

:::tip Set custom Compute Unit Limit
A transaction can request a more specific and optimal compute unit limit by including a single `SetComputeUnitLimit` instruction. Either a higher or lower limit. But it may never request higher than the absolute max limit per transaction.
:::

However, we must note that higher CU also means higher Priority Fee it might need to help prioritize it.

### What are some transaction broadcasting methods?
1. Typical RPCs
2. RPCs with SWQoS
3. Jito RPC

### What is Slippage?

A percentage or bps threshold the user specify and if the actual executed output is less than quoted output by the percentage/bps, the transaction will fail.

It is more like a safeguard but the tighter threshold you go, the harder it can become to land the transaction as markets can move rapidly.