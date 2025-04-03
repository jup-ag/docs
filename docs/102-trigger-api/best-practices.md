---
sidebar_label: "Best Practices"
description: "Best Practices for using the Trigger API"
title: "Best Practices"
---

<head>
    <title>Best Practices</title>
    <meta name="twitter:card" content="summary" />
</head>

Some best practices when using the Trigger API.

| Item | Recommendation |
| --- | --- |
| The program will accept any value to create an order. | On jup.ag, our frontend enforces a minimum of 5 USD per order to be created, this will ensure our keepers can accommodate for no loss in transaction fees coverage. However, programatically, if you do not enforce this, the user can still create an order. |
| The program does not check the price or rate of the order, and the keeper will execute as instructed. | On our frontend, when user attempts to set the rate to buy above market price, we provide warnings and disable the execution if above 5%.<br /><br />If the order is created with such rates, the keeper will execute as instructed. For example, if user sets to Sell 1000 USDC to Buy 1 SOL at the rate of 1000 SOL/USDC, the keeper will execute as instructed and the additional funds will be lost. |
| Tokens with transfer tax extension are disabled. | Our frontend informs the user if the token has transfer tax. |
| Token2022 tokens with transfer tax extension are disabled. | Our frontend informs the user if the token has transfer tax. |
