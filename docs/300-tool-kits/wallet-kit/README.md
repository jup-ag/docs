---
sidebar_label: "Getting Started"
description: An open source, streamlined Unified Wallet Kit adapter designed to simplify development on Solana.
title: Unified Wallet Kit
---

<head>
    <title>Unified Wallet Kit</title>
    <meta name="twitter:card" content="summary" />
</head>

The Unified Wallet Kit is an open-source, Swiss Army Knife wallet adapter designed to streamline your development on Solana. Integrating multiple wallets into a single interface can be cumbersome, the Unified Wallet Kit aims to eliminates redundancies by providing these building blocks in a simple, plug-and-play package. This allows developers to focus on what matters most: building innovative features for your users.

The Unified Wallet Kit will help you reduce repetitive tasks within your development process, including:
- Creating a wallet notification system.
- Managing wallet states (connected, disconnected, etc.).
- Implementing a mobile-friendly wallet connector .

:::tip Unified Wallet Kit References
- [Wallet Kit Playground](https://unified.jup.ag/): To play with different settings,features and styling.
- [Open Source Repository](https://github.com/TeamRaccoons/Unified-Wallet-Kit): To understand and make use of the wallet adapter better.
- [Quick Examples](https://github.com/TeamRaccoons/Unified-Wallet-Kit/tree/main/src/components/examples): To reference code snippets and examples.
:::

## Core Features

| Feature | Description |
|---|---|
| **Compact Bundle** | Main ESM bundle is a lightweight 94KB (20KB gzipped). |
| **Built-in Support** | Comes with Wallet Standard and Mobile Wallet Adapter support. |
| **Abstracted Wallet Adapter** | Use the Bring Your Own Wallet (BYOW) approach to select custom and legacy wallets. |
| **Mobile Responsive** | Designed to be mobile-first. |
| **Smart Notification System** | Integrates seamlessly with your existing notification system or can be used independently. |
| **Internationalization** | Supports multiple languages including English, Chinese, Vietnamese, French, Japanese, Bahasa Indonesia, and Russian. |
| **Theming Options** | Choose from light, dark, and Jupiter modes, with more customization options coming soon. |
| **New User Onboarding** | Simplifies the onboarding process for new users. |

## Let's Get Started

#### TLDR Steps
1. Adjust the Theme Selector to your desired version.
2. Select your appropriate Language
3. Expand the "Show Snippet" box for the wallet configuration you would like in your app and 
4. Select the `Copy to Clipboard` button for easy code insertion into your app.
1. Install the Unified Wallet Kit to your project dependencies.

#### Install the wallet adapter depenency

```bash
npm i @jup-ag/wallet-adapter
```

#### Wrap your app with `<UnifiedWalletProvider />`

```jsx
const ExampleBaseOnly = () => {
  return (
    <UnifiedWalletProvider
      wallets={[]}
      config={{
        autoConnect: false,
        env: 'mainnet-beta',
        metadata: {
          name: 'UnifiedWallet',
          description: 'UnifiedWallet',
          url: 'https://jup.ag',
          iconUrls: ['https://jup.ag/favicon.ico'],
        },
        notificationCallback: WalletNotification,
        walletlistExplanation: {
          href: 'https://station.jup.ag/docs/old/additional-topics/wallet-list',
        },
      }}
    >
      <UnifiedWalletButton />
    </UnifiedWalletProvider>
  );
};

export default ExampleBaseOnly;
```

:::info
This kit also supports the attachment of custom elements to specific wallets
:::

```jsx
config={{
  walletAttachments: { 
    'Phantom': {
      attachment: <div tw="text-xs rounded-md bg-red-500 px-2 mx-2 text-center">Auto Confirm</div>
    } 
  }
}}
```
