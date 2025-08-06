---
description: "An overview of Jupiter Plugin and its core features."
title: "Integrate Jupiter Plugin"
---

![Jupiter Plugin Hero](/plugin/demo/plugin.png)

Jupiter Plugin is an open-source, lightweight, plug-and-play version of Jupiter that allows you to seamlessly integrate end-to-end swap functionality into your application with minimal effort - with just a few lines of code, you can embed a fully functional swap interface directly into your website while providing the same powerful Ultra Mode swap experience found on https://jup.ag.

:::info Plugin Playground
Try out the [Plugin Playground](https://plugin.jup.ag) to experience the full swap features and see the different customization options with code snippets.

To view the open-source code, visit the [GitHub repository](https://github.com/jup-ag/plugin).
:::

:::info Quick Start
To quick start your integration, check out the [Next.js](/docs/tool-kits/plugin/nextjs-app-example), [React](/docs/tool-kits/plugin/react-app-example) or [HTML](/docs/tool-kits/plugin/html-app-example) app examples.
:::

## Key Features

- **Seamless Integration**: Embed Jupiter's swap functionality directly into your application without redirects.
- **Multiple Display Options**: Choose between integrated, widget, or modal display modes.
- **Customizable Options**: Configure the swap form to match your application's needs.
- **RPC-less**: Integrate Plugin without any RPCs, Ultra handles transaction sending, wallet balances and token information.
- **Ultra Mode**: Access to all features of Ultra Mode, read more about it in the [Ultra API docs](/docs/ultra-api/).

## Getting Started

When integrating Plugin, there are a few integration methods to think about, and choose the one that best fits your application's architecture and requirements.

### Integration Methods

- **Using Window Object** - Simplest way to add and initialize Plugin.
- [**Using NPM Package**](https://www.npmjs.com/package/@jup-ag/plugin) - Install via `npm install @jup-ag/plugin` and initialize as a module (will require you to maintain its dependencies).

### Wallet Integration

- **Wallet Standard Support**: For applications without existing wallet provider, Plugin will provide a wallet adapter and connection - powered by [Unified Wallet Kit](/docs/tool-kits/wallet-kit/).
- **Passthrough Wallet**: For applications with existing wallet provider(s), set `enableWalletPassthrough=true` with context, and Plugin will allow the application to pass through the existing wallet provider's connection to Plugin.

### Adding Fees to Plugin

- **Referral Account**: You can create a referral account via [scripts](/docs/ultra-api/add-fees-to-ultra) or [Referral Dashboard](https://referral.jup.ag).
- **Referral Fee**: You can set the referral fee and account in the `formProps` interface when you initialize the Plugin.

### Quick Start Guides

In the next sections, we'll walk you through the steps to integrate Jupiter Plugin into different types of web applications from scratch.

- [Next.js](/docs/tool-kits/plugin/nextjs-app-example)
- [React](/docs/tool-kits/plugin/react-app-example)
- [HTML](/docs/tool-kits/plugin/html-app-example)

By integrating Jupiter Plugin into your application, you can seamlessly integrate a fully functional swap interface into your application with minimal effort, while staying at the forefront of Solana DeFi innovation.
