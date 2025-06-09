---
description: "An overview of Jupiter Swap Terminal and its core features."
title: "Introduction to Terminal"
---

![Jupiter Terminal Hero](/terminal/demo/terminal.png)

Jupiter Terminal is an open-source, lightweight, plug-and-play version of Jupiter that allows you to seamlessly integrate end-to-end swap functionality into your application with minimal effort - with just a few lines of code, you can embed a fully functional swap interface directly into your website while providing the same powerful Ultra Mode swap experience found on https://jup.ag.

:::info Terminal Playground
Try out the [Terminal Playground](https://terminal.jup.ag/playground) to experience the full swap features and see the different customization options with code snippets.

To view the open-source code, visit the [GitHub repository](https://github.com/jup-ag/terminal).
:::

:::info Quick Start
To quick start your integration, check out the [Next.js](/docs/tool-kits/terminal/nextjs-app-example), [React](/docs/tool-kits/terminal/react-app-example) or [HTML](/docs/tool-kits/terminal/html-app-example) app examples.
:::

## Key Features

- **Seamless Integration**: Embed Jupiter's swap functionality directly into your application without redirects.
- **Multiple Display Options**: Choose between integrated, widget, or modal display modes.
- **Customizable Options**: Configure the terminal to match your application's needs.
- **RPC-less**: Integrate Terminal without any RPCs, Ultra handles transaction sending, wallet balances and token information.
- **Ultra Mode**: Access to all features of Ultra Mode, read more about it in the [Ultra API docs](/docs/ultra-api/).

## Getting Started

When integrating Terminal, there are a few integration methods to think about, and choose the one that best fits your application's architecture and requirements.

### Integration Methods

- **Using Window Object** - Simplest way to add and initialize Terminal.
- [**Using NPM Package**](https://www.npmjs.com/package/@jup-ag/terminal) - Install via `npm install @jup-ag/terminal` and initialize as a module (will require you to maintain its dependencies).

### Wallet Integration

- **Wallet Standard Support**: For applications without existing wallet provider, Terminal will provide a wallet adapter and connection - powered by [Unified Wallet Kit](/docs/tool-kits/wallet-kit/).
- **Passthrough Wallet**: For applications with existing wallet provider(s), set `enableWalletPassthrough=true` with context, and Terminal will allow the application to pass through the existing wallet provider's connection to Terminal.

### Adding Fees to Terminal

- **Referral Account**: You can create a referral account via [scripts](/docs/ultra-api/add-fees-to-ultra) or [Referral Dashboard](https://referral.jup.ag).
- **Referral Fee**: You can set the referral fee and account in the `formProps` interface when you initialize the Terminal.

### Quick Start Guides

In the next sections, we'll walk you through the steps to integrate Jupiter Terminal into different types of web applications from scratch.

- [Next.js](/docs/tool-kits/terminal/nextjs-app-example)
- [React](/docs/tool-kits/terminal/react-app-example)
- [HTML](/docs/tool-kits/terminal/html-app-example)

By integrating Jupiter Terminal into your application, you can seamlessly integrate a fully functional swap interface into your application with minimal effort, while staying at the forefront of Solana DeFi innovation.
