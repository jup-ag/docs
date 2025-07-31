---
sidebar_label: "About Lend API"
description: "Start using Jupiter Lend API to earn yield and borrow assets."
title: "About Lend API"
---

<head>
    <title>Lend API</title>
    <meta name="twitter:card" content="summary" />
</head>

The Jupiter Lend API is built on top of Jupiter Lend Program

## What is the Jupiter Lend Program

The Jupiter Lend Program is a foundational component designed to facilitate lending activities with high efficiency and security. You can think of it as the 'Deposit and Earn' of Jupiter. The lend program is your direct access into Jupiter's Liquidity Layer.

## Features of the Jupiter Lend Program

- **High Capital Efficiency**: The program supplies capital to the liquidity layer which is then in turn utilized efficiently across the entire Fluid ecosystem.

- **Simplified User Experience**: The program serves one function and removes the complexities associated with mult-use interfaces. Instead focusing on providing a user-friendly interface for depositors.

- **Long-term Yield Opportunities**: Depositors benefit from long-term safe yield opportunities, as the protocol is designed to adapt to advancements on the borrowing side without necessitating asset relocation. Deposit once and reap the benefits of advacnements on the borrowing side.

## How does the API work

- Currently, only Earn API is available - which provides the core functionalities and developer tools to interface with the Earn products of the Lend Program.
- For Borrow products, it will be coming soon.

## FAQ

### Earn

- What is the Jupiter `Earn` Protocol?
  The Earn Protocol is the 'Deposit and Earn' side of Jup Lend protocol. Supply to the Jup Earn protocol through this simple UX and earn yield on your supplied asset in kind.

- Why is this separate from borrowing?
  Jup uses a unified liquidity layer where all protocols on Jup can source liquidity from. For depositors this means you earn the best possible rate at all times without having to migrate your funds when new protocols are launched on Jup. You can supply once and earn the most up to date yield from the Jup protocol.

- Are there supply or withdraw limits?
  There is no limits on supplying funds to the Earn Protocol. Withdrawals from the Earn Protocol utilize an Automated Debt Ceiling. Withdrawals increase every block creating a smoothing curve for withdrawals preventing any sudden large movements.

- What are the risk?
  Jupiter lend is a new and novel protocol and like all DeFi protocols contains smart contract risk, market risk and other factors which can cause a complete loss of funds.

- What are the fees for the Earn Protocol?
  There are no fees to use the earn protocol on Jupiter Lend.

### Borrow

- What is Jupiter `Borrow` Protocol?
  Borrow Vaults are a known standard mechanism for locking collateral and borrowing debt. Jupiter Lend utilizes this familiar single asset - single debt vault approach. Jupiter Lend takes borrow vaults to the next level by being the most capital efficient and optimized protocol enabling up to 95% LTV on collateral.

- How does Jupiter Lend achieve such high LTV?
  Jupiter borrow vaults has the most advanced liquidation mechanisms, and are able to provide the highest LTVs in the market, the protocol easily removes bad debt and enables the most gas efficient liquidation mechanism in DeFi.

- What happens if I am liquidated?
  When your vault or position is liquidated, a portion of it is sold to repay your debt and return your position to a safe state. In addition to the debt repayment, a liquidation penalty is also charged.

- What is the Max Liquidation Threshold?
  While the Liquidation Threshold determines when a vault can be liquidated the protocol also has a 'hard' ceiling for liquidation. When a vault passes the max liquidation threshold it is liquidated automatically.

- My vault passed the liquidation threshold but is not liquidated, will I be liquidated?
  **Yes your position is still at risk of being liquidated!** Once your position passes the threshold it can be liquidated, but it may not happen immediately.

If your position is still at risk you can take the time now to unwind/reduce your risk ratio to make your position safe and prevent a liquidation event.
