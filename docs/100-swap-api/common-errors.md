---
sidebar_label: "Common Errors"
description: "Common errors when using the Jupiter Swap API."
title: "Common Errors"
---

<head>
    <title>Common Errors</title>
    <meta name="twitter:card" content="summary" />
</head>

In this section, you can find the list of errors that can be returned by the Jupiter Swap API, Swap Program or from other programs like DEXes, System or Token programs.

## Program Errors

### Jupiter Swap Program Errors

:::note Jupiter Swap Program IDL
You can find the full Swap Program IDL here:
https://solscan.io/account/JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4#anchorProgramIdl
:::

:::info Abnormal Error Rates
If you face high or consistent amounts of errors, please reach out to [Jupiter Discord](https://discord.gg/jup).
:::

| Error Code | Error Name | Debug |
| ---------- | ---------- | ----------- |
| 6001 | SlippageToleranceExceeded | Try higher fixed slippage or try [`dynamicSlippage`](/docs/swap-api/send-swap-transaction#how-jupiter-estimates-slippage) |
| 6008 | NotEnoughAccountKeys | Likely modified swap transaction causing missing account keys |
| 6014 | IncorrectTokenProgramID | Likely attempted to take platform fees on a Token2022 token (This is also 0x177e)  |
| 6017 | ExactOutAmountNotMatched | Similar to slippage |

### Solana Program Errors

| Program | Link |
| ------- | -------------- |
| Token Program | https://github.com/solana-program/token/blob/main/program/src/error.rs |
| Token2022 Program | https://github.com/solana-program/token-2022/blob/main/program/src/error.rs |
| Associated Token Account Program | https://github.com/solana-program/associated-token-account/blob/main/program/src/error.rs |
| Other Solana Programs | https://github.com/solana-program |

### DEX Program Errors

In the swap transaction, the DEX in routing may return errors. You can find some of their IDLs and/or error codes in an explorer. If they do not support public IDLs or open source code, you can reference the common errors below or if you need additional help, please reach out to [Jupiter Discord](https://discord.gg/jup).

| Error | Description |
| --- | --- |
| Error related to tick array or bitmap extension account | Similar to slippage, the price or market has "moved out of range", hence the swap transaction failed. |

## Routing Errors

The common routing errors you may encounter are usually related to attempting to swap a token that is not tradable on Jupiter, for reasons such as lack of liquidity or the token is not supported.

| Error | Description | Debug |
|-------|-------------|-------|
| NO_ROUTES_FOUND | No routes were found for the requested swap | <ul><li>Check jup.ag if it's routable</li><li>[Check the liquidity of the token's markets](https://support.jup.ag/hc/en-us/articles/18453861473436-Why-is-this-token-not-tradable-on-Jupiter)</li></ul> |
| COULD_NOT_FIND_ANY_ROUTE | Unable to find any valid route for the swap | <ul><li>Check jup.ag if it's routable</li><li>[Check the liquidity of the token's markets](https://support.jup.ag/hc/en-us/articles/18453861473436-Why-is-this-token-not-tradable-on-Jupiter)</li></ul> |
| ROUTE_PLAN_DOES_NOT_<br/>CONSUME_ALL_THE_AMOUNT | The calculated route cannot process the entire input amount, you can get more output amount by reducing your input amount | <ul><li>Try reducing your input amount</li></ul> |
| MARKET_NOT_FOUND | The specified market address was not found | <ul><li>Verify the market address exists and is active</li></ul> |
| TOKEN_NOT_TRADABLE | The specified token mint is not available for trading | <ul><li>Check jup.ag if it's routable</li><li>[Check the liquidity of the token's markets](https://support.jup.ag/hc/en-us/articles/18453861473436-Why-is-this-token-not-tradable-on-Jupiter)</li></ul> |
| NOT_SUPPORTED | Generic error for unsupported operations | <ul><li>Check the specific error message for details</li></ul> |
| CIRCULAR_ARBITRAGE_<br/>IS_DISABLED | Attempted to swap a token for itself | <ul><li>Input and output tokens must be different</li></ul> |
| CANNOT_COMPUTE_<br/>OTHER_AMOUNT_THRESHOLD | Failed to calculate the minimum output amount based on slippage | <ul><li>Verify the input amount and slippage parameters are valid</li></ul> |

## Swap Transaction Composing Errors

| Error | Description | Debug |
|-------|-------------|-------|
| MAX_ACCOUNT_GREATER_THAN_MAX | The specified number of accounts exceeds the maximum allowed | <ul><li>Reduce the number of accounts in the transaction</li></ul> |
| INVALID_COMPUTE_UNIT_PRICE_AND_PRIORITIZATION_FEE | Both compute unit price and prioritization fee were specified | <ul><li>Use either compute unit price or prioritization fee, not both</li></ul> |
| FAILED_TO_GET_SWAP_AND_ACCOUNT_METAS | Failed to generate the swap transaction | <ul><li>Check the error message for specific details</li></ul> |

## Best Practices

It is important to understand the error codes when your products are user facing. This will help you provide a better experience for your users, helping them make an informed decision or follow up step to help their transaction succeed.

:::tip Jup.ag as a reference
You can use https://jup.ag/ as a reference to understand how we handle errors on the UI.
:::

| Error Type | Best Practice |
| ---------- | ------------- |
| Slippage exceeding threshold | Show the user the current slippage tolerance and the incurred slippage |
| Insufficient funds | Show the user the current balance of the account and the required balance |
| Non Jupiter Program Errors | Allow the user to retry with a different route and/or exclude the specific DEX from the quote request |
| Token not tradable | Show the user the token is not tradable and provide context on why it's not tradable |
