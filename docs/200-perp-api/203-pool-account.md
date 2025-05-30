---
sidebar_label: "Pool Account"
description: "Understand and integrate the Jupiter Perp Program."
title: "Pool Account"
---

<head>
    <title>Pool Account</title>
    <meta name="twitter:card" content="summary" />
</head>

This page contains an overview of the **Solana account types** used in the Jupiter Perpetuals Program, and specifically the `Pool` account.

The `Pool` account is a struct which represents a set of parameters and states associated to the data for JLP pool, including AUM and [`Custody`](./custody-account) data.

:::note only one pool account
There is only one [`Pool` account](https://solscan.io/account/5BUwFW4nRbftYTDMbgxykoFWqWHPzahFSNAaaaJtVKsq).
:::

:::tip Example Typescript Repository
This [repository](https://github.com/julianfssen/jupiter-perps-anchor-idl-parsing) contains Typescript code samples on interacting with the Jupiter Perpetuals program IDL with `anchor` and `@solana/web3.js`

You can also find the [Custody Account fields in the repository](https://github.com/julianfssen/jupiter-perps-anchor-idl-parsing/blob/1a0b5dc71081958895691047a9aa8ba51d2a8765/src/idl/jupiter-perpetuals-idl.ts#L2699) or on a [blockchain explorer](https://solscan.io/account/PERPHjGBqRHArX4DySjwM6UJHiR3sWAatqfdBS2qQJu#anchorProgramIdl).
:::

## Account Details

Each `Pool` account contains the following data:

| Field | Description |
| --- | --- |
| `name`       | **Type:** `string`<br /><br />The name for the account. |
| `custodies`  | **Type:** `publicKey`<br /><br />An array containing the public keys for the custodies (tokens) managed by the JLP pool. |
| `aumUsd`    | **Type:** `u128`<br /><br />The current AUM value (USD) for the JLP pool. The `aumUsd` value's calculation can be summarized by getting the USD value of the tokens managed by the pool minus the USD value reserved to pay off trader profits.<br /><br />Refer to the [Custody account](./custody-account) details for more details on AUM calculation. |
| `limit`      | **Type:** [`Limit`](#limit)<br /><br />Contains values for the pool's limits. |
| `fees`       | **Type:** [`Fees`](#fees)<br /><br />Sets the fee amounts or percentages for the Jupiter Perpetuals exchange. |
| `poolApr`    | **Type:** [`PoolApr`](#poolapr)<br /><br />Contains data related to the pool's APR / APY calculations. |

### `Limit`

| Field | Description |
| --- | --- |
| `maxAumUsd`               | **Type:** `u128`<br /><br />The max AUM for the JLP pool. This acts as a max cap / ceiling as the JLP will not accept deposits when the cap is hit. |
| `tokenWeightageBufferBps` | **Type:** `u128`<br /><br />The token weightage buffer (in basis points) to calculate the token's maximum or minimum current weightage based on the target weightage.<br /><br />Currently, `tokenWeightageBufferBps` is set to `2000` which means the the current weightage cannot be lower or higher than + / - 20% of the token's target weightage.<br /><br />For example, if SOL's target weightage for the JLP pool is 50%, the current weightage cannot be less than 40% or exceed 60%. The pool will not allow deposits or withdrawals if the action causes the token to exceed its target weightage. |
| `maxPositionUsd`          | **Type:** `u64`<br /><br />Sets the maximum position size. The current `maxPositionUsd` value is `2_500_000_000_000` which means a position's max size is $2,500,000. |

### `Fees`

| Field | Description |
| --- | --- |
| `increasePositionBps`     | **Type:** `string`<br /><br />A fixed fee of 6 BPS (0.06%) is charged for opening or increasing a position. |
| `decreasePositionBps`     | **Type:** `publicKey`<br /><br />A fixed fee of 6 BPS (0.06%) is charged for closing or decreasing a position. |
| `addRemoveLiquidityBps`   | **Type:** `u128`<br /><br />Fee charged when adding or removing liquidity to/from the pool. |
| `swapBps`                 | **Type:** `Limit`<br /><br />Swap fee for exchanging non-stablecoin tokens routed through the liquidity pool.<br /><br />`swap fee = swapBps ± swapTaxBps` |
| `taxBps`                  | **Type:** `PoolApr`<br /><br />Tax fee for non-stablecoins, determined based on the difference between the current and target weightage. A larger difference results in a higher tax fee, encouraging liquidity providers to rebalance the pool to the target weightage. |
| `stableSwapBps`           | **Type:** `Limit`<br /><br />Swap fee for exchanges involving stablecoins, routed through the liquidity pool.<br /><br />`swap fee = stableSwapBps ± stableSwapTaxBps` |
| `stableSwapTaxBps`        | **Type:** `Fees`<br /><br />Tax fee for stablecoin swaps. Similar to taxBps, this fee is determined by the difference between the current and target weightage. |
| `protocolShareBps`        | **Type:** `PoolApr`<br /><br />Jupiter takes a share of 2500 BPS (25%) from the fees collected by the pool. |

### `PoolApr`

| Field | Description |
| --- | --- |
| `lastUpdated`      | **Type:** `i64`<br /><br />The UNIX timestamp when the pool's APR data was last updated. |
| `feeAprBps`        | **Type:** `u64`<br /><br />The pool's APR in BPS format. The APR is calculated weekly by dividing the pool's realized fees (minus the 25% collected by the protocol) by the total pool value, adjusting for the 1 week time period to annualize the rate. |
| `realizedFeeUsd`   | **Type:** `u64`<br /><br />The fees collected by the pool so far. This fee is reinvested back into the pool and is also used to calculate the APR as mentioned above. realizedFeeUsd resets to zero when the fee is reinvested into the pool hence causing the APR value to fluctuate weekly. |
