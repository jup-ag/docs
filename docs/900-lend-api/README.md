---
sidebar_label: "About Lend API"
description: "Start using Jupiter Lend API to earn yield and borrow assets."
title: "About Lend API"
---

<head>
    <title>Lend API</title>
    <meta name="twitter:card" content="summary" />
</head>

The Jupiter Lend API is built on top of Jupiter Lend Program.

## Program ID

- LIQUIDITY_PROGRAM: `jupeiUmn818Jg1ekPURTpr4mFo29p46vygyykFJ3wZC`

- LENDING_PROGRAM: `jup3YeL8QhtSx1e253b2FDvsMNC87fDrgQZivbrndc9`

- LRRM_PROGRAM: `jup7TthsMgcR9Y3L277b8Eo9uboVSmu1utkuXHNUKar`

- ORACLE_PROGRAM: `jupnw4B6Eqs7ft6rxpzYLJZYSnrpRgPcr589n5Kv4oc`

- VAULTS_PROGRAM: `jupr81YtYssSyPt8jbnGuiWon5f6x9TcDEFxYe3Bdzi`

## About Earn

- **What is the Jupiter `Earn` Protocol?**
    
    The Earn Protocol is the 'Deposit and Earn' side of Jupiter Lend. Simply deposit assets to the Jupiter Earn and earn yield.

- **Why is this separate from borrowing?**
    
    Jupiter Lend uses a unified liquidity layer where both Earn (lending) and Borrow (vault) protocol can source liquidity from. For depositors this means you earn the best possible rate at all times without having to migrate your funds when new protocols are launched on Jupiter Lend. You can supply once and earn the most up to date yield from the Jupiter Lend protocol.

- **Are there supply or withdraw limits?**
    
    There is no limits on supplying funds to the Earn Protocol. Withdrawals from Jupiter Lend utilize an Automated Debt Ceiling. Withdrawals increase every block creating a smoothing curve for withdrawals preventing any sudden large movements.

- **What are the risk?**
    
    Jupiter Lend is a novel protocol and like all DeFi protocols contains smart contract risk, market risk and other factors which can cause loss of user funds.

- **What are the fees for the Earn Protocol?**
    
    There are no fees to use the Earn Protocol on Jupiter Lend.

## About Borrow

- **What is Jupiter `Borrow` Protocol?**
    
    Borrow Vaults are a known standard mechanism for locking collateral and borrowing debt. Jupiter Lend utilizes this familiar single asset - single debt vault approach. Jupiter Lend takes borrow vaults to the next level by being the most capital efficient and optimized protocol enabling up to 95% LTV on collateral.

- **How does Jupiter Lend achieve such high LTV?**

    Jupiter borrow vaults has the most advanced liquidation mechanisms, and are able to provide the highest LTVs in the market, the protocol easily removes bad debt and enables the most gas efficient liquidation mechanism in DeFi.

- **What happens if I am liquidated?**
    
    When your NFT or position is liquidated, a portion of your collateral is sold to repay your debt and return your position to a safe state. In addition to selling a part of your collateral, a liquidation penalty is also charged.

- **What is the Max Liquidation Threshold?**

    While the Liquidation Threshold determines when a vault can be liquidated, the protocol also has a 'hard' ceiling for liquidation. When a vault passes the max liquidation threshold it is entirely (100%) liquidated automatically.

- **My vault passed the liquidation threshold but is not liquidated, will I be liquidated?**
    
    **Yes your position is still at risk of being liquidated!** Once your position passes the threshold it can be liquidated, but it may not happen immediately.
    If your position is still at risk you can take the time now to unwind/reduce your risk ratio to make your position safe and prevent a liquidation event.
