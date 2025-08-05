---
sidebar_label: "Jupiter Metis v1"
description: "Integrate your DEX into Jupiter Metis v1 Routing Engine."
title: "DEX Integration"
---

<head>
    <title>DEX Integration</title>
    <meta name="twitter:card" content="summary" />
</head>

Jupiter is one of the most widely integrated protocols, so a lot of work is involved in minimizing issues on new integrations and making each integration valuable to our users and partners. Our top priority is ensuring security and providing the best prices and the best token selection for our users, so we will focus on DEXes that will bring the most benefits to them.

In this section, we will walk you through the process of integrating your DEX into the Jupiter Metis v1 Routing Engine that powers the Swap API.

:::warning We do not charge fees for integration.
:::

## Integration Prerequisites

As Solana grows and more DEXes are built, we have to be more cautious in the DEXes we integrate, we look into a variety of factors.

- **Code health**: It will help with integration and ensure maintainability in the future.
- **Security audit**: This is important to ensure users' funds are secure and the program is not malicious.
- **Traction**: We look at the traction of the DEX to ensure it has market demand and is well-used.
- **Team and backers**: This is a good indicator of the quality of the DEX if they are backed by or built by reputable or verifiable entities.

### AMM Interface

To facilitate integration of your DEX into the Jupiter Core Engine:
- Provide a DEX SDK that works with the [Jupiter AMM Interface](https://docs.rs/crate/jupiter-amm-interface).
- Enable us to fork your SDK, this ensures our users that we can guarantee maintenance, support for the SDK, and fix potential bugs related to integrated DEXs.

:::note
`get_accounts_to_update` provides the necessary accounts to fetch, they are batched and cached by the Jupiter Core Engine and delivered through `update` to the AMM instance, there might be multiple calls to `quote` using the same cache so **we do not allow any network calls** in the entire implementation.
:::

:::info Resource and Support
You can refer to the implementation guide https://github.com/jup-ag/rust-amm-implementation for easier integration with Jupiter.

If you require assistance or have questions, reach out to us at [Discord](https://discord.gg/jup)
:::

<details>
    <summary>
        AMM Interface Code Example
    </summary>
        ```rust
        pub trait Amm {
            // Maybe trait was made too restrictive?
            fn from_keyed_account(keyed_account: &KeyedAccount, amm_context: &AmmContext) -> Result<Self>
            where
                Self: Sized;
            /// A human readable label of the underlying DEX
            fn label(&self) -> String;
            fn program_id(&self) -> Pubkey;
            /// The pool state or market state address
            fn key(&self) -> Pubkey;
            /// The mints that can be traded
            fn get_reserve_mints(&self) -> Vec<Pubkey>;
            /// The accounts necessary to produce a quote
            fn get_accounts_to_update(&self) -> Vec<Pubkey>;
            /// Picks necessary accounts to update it's internal state
            /// Heavy deserialization and precomputation caching should be done in this function
            fn update(&mut self, account_map: &AccountMap) -> Result<()>;

            fn quote(&self, quote_params: &QuoteParams) -> Result<Quote>;

            /// Indicates which Swap has to be performed along with all the necessary account metas
            fn get_swap_and_account_metas(&self, swap_params: &SwapParams) -> Result<SwapAndAccountMetas>;

            /// Indicates if get_accounts_to_update might return a non constant vec
            fn has_dynamic_accounts(&self) -> bool {
                false
            }

            /// Indicates whether `update` needs to be called before `get_reserve_mints`
            fn requires_update_for_reserve_mints(&self) -> bool {
                false
            }

            // Indicates that whether ExactOut mode is supported
            fn supports_exact_out(&self) -> bool {
                false
            }

            fn get_user_setup(&self) -> Option<AmmUserSetup> {
                None
            }

            fn clone_amm(&self) -> Box<dyn Amm + Send + Sync>;

            /// It can only trade in one direction from its first mint to second mint, assuming it is a two mint AMM
            fn unidirectional(&self) -> bool {
                false
            }

            /// For testing purposes, provide a mapping of dependency programs to function
            fn program_dependencies(&self) -> Vec<(Pubkey, String)> {
                vec![]
            }

            fn get_accounts_len(&self) -> usize {
                32 // Default to a near whole legacy transaction to penalize no implementation
            }

            /// The identifier of the underlying liquidity
            ///
            /// Example:
            /// For RaydiumAmm uses Openbook market A this will return Some(A)
            /// For Openbook market A, it will also return Some(A)
            fn underlying_liquidities(&self) -> Option<HashSet<Pubkey>> {
                None
            }

            /// Provides a shortcut to establish if the AMM can be used for trading
            /// If the market is active at all
            fn is_active(&self) -> bool {
                true
            }
        }
        ```
</details>

---

## Market Listing

This section explains how markets are listed and maintained on Jupiter. It covers the different types of routing (instant and normal), the criteria for a market to be included in routing, and the liquidity requirements that must be met for a market to remain routable. Understanding these rules is essential for DEX teams to ensure their markets are eligible for and remain in the Jupiter Metis routing engine.

### Routing Type

There are 2 types of market listing on Jupiter.

1. **Instant routing**
    - We automatically list all new markets that are created on specific DEXes (list is below).
    - These markets have a grace period, where the liquidity criteria is not applied.
    - After the grace period has passed, the liquidity criteria will apply (refer to normal routing).
    - For bonding curves, if it does not graduate after the grace period, it will be removed from routing.
        - Only when the bonding curve has graduated to a new market, the graduated market will be added to routing.

    <details>
        <summary>
            List of DEXes that are eligible for Instant Routing
        </summary>
            - Meteora Dynamic Bonding Curve
            - Meteora Dynamic AMM
            - Meteora DAMM V2
            - Meteora DLMM
            - Raydium
            - Raydium CLMM
            - Raydium CPMM
            - Raydium Launchlab
            - Pump.fun AMM
            - Pump.fun
            - Fluxbeam
            - Whirlpool
            - Moonshot
            - Virtuals
            - Boop.fun
    </details>

2. **Normal routing**
    - This is the default for all markets.
    - Every 30 minutes, we will check the liquidity of the market.
    - If the liquidity is not enough, we will remove the market from routing.

### Market Liquidity Requirements

The market must fit one of the following criteria for it to be routable:

1. **Less than 30% price difference on $500**

    Using a benchmark position size of $500, a user should encounter less than 30% price difference after buying $500 worth and then selling back on the same market.

    Price Difference = ($500 - Final USD value) / $500
    If the price difference is more than 30%, it means that there is insufficient liquidity in the market for the benchmark position size of $500.

2. **Less than 20% price impact on market**

    If the above (sell back $500 worth) fails, we will compare the price per token received from buying $1000 worth vs the price per token received from buying $500 worth to calculate price impact.

    If the price impact is more than 20%, it means that the market is illiquid.
