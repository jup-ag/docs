---
sidebar_label: "Introduction"
description: "An overview of Jupiter Swap Terminal and its core features."
title: "Introduction to Terminal"
---

# Introduction to Jupiter Terminal

Jupiter Terminal is a lightweight, plug-and-play version of Jupiter that allows you to seamlessly integrate end-to-end swap functionality into your application with minimal effort - with just a few lines of code, you can embed a fully functional swap interface directly into your website while providing the same powerful Ultra Mode swap experience found on https://jup.ag.

- **Seamless Integration**: Embed Jupiter's swap functionality directly into your application without redirects.
- **Multiple Display Options**: Choose between integrated, widget, or modal display modes.
- **Customizable Interface**: Configure the terminal to match your application's needs.
- **Ultra Mode**: Access to [Ultra Mode](/docs/ultra-api/) without any RPCs or complex configurations.

## Key Features

### Ultra Mode Features

All of these features are available on Terminal via Ultra Mode, without having to integrate any APIs, RPCs, or complex configurations.

| Feature | Description |
| --- | --- |
| **Best liquidity engine** | Aggregates across multiple liquidity sources, both Jupiter's proprietary routing engines and third-party liquidity sources, for the best possible price.<br/><br />Including Jupiter's Metis Routing Engine, Jupiter Z (RFQ), and others. |
| **Blazing fast** | 95% of all swaps are executed under 2 seconds via our proprietary transaction sending engine. |
| **MEV-protected** | The lowest incidence of MEV attacks across all existing applications, by far. |
| **Shielded** | Enhanced security feature via Shield API to provide critical token information during token selection, to help provide an informed trading decision. |
| **Real-Time Slippage Estimator** | Intelligently derives the best possible slippage to use at the time of execution, balancing between trade success and price protection. |
| **One-stop shop** | Retrieve the user's balances, get a quote, execute the trade, and get the results of the trade, all within Ultra API without touching a single RPC or any other external API. |
| **World class support** | We handle the complexities of RPC connections, transaction landing, slippage protection and more. |

### Display Flexibility

Jupiter Terminal offers three display modes to suit different use cases:

1. **Integrated Mode**: Embeds the terminal directly into a specified container in your application.
2. **Widget Mode**: Creates a floating widget that can be positioned in different corners of the screen.
3. **Modal Mode**: Displays the terminal as a modal dialog that can be triggered by user actions.

### Customization Options

- Configure initial tokens and amounts.
- Lock input or output tokens for specific use cases.
- Restrict token selection to a predefined list.
- Style the terminal to match your application's design.
- Set up event handlers for swap success and error scenarios.

By integrating Jupiter Terminal into your application, you can seamlessly integrate a fully functional swap interface into your application with minimal effort, while staying at the forefront of Solana DeFi innovation.
