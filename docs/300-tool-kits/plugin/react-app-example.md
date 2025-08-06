---
sidebar_label: "React App Example"
description: "A step-by-step guide to integrating Jupiter Plugin into a React application."
title: "React App Example"
---

<head>
    <title>Plugin React App Example</title>
    <meta name="twitter:card" content="summary" />
</head>

In this guide, we'll walk you through from scratch the steps to integrate Jupiter Plugin into a React application.

## Prerequisites

Before you begin, make sure you have the following installed on your system.

**Node.js and npm**: Download and install from [nodejs.org](https://nodejs.org)

## Step 1: Create a New React Project

Head to your preferred directory and create a new React project using `create-react-app` with TypeScript template (you can use other templates or methods to start your project too):

```bash
npx create-react-app plugin-demo --template typescript
cd plugin-demo
npm start
```

## Step 2: Add TypeScript Support

Create a type declaration file `plugin.d.ts` in your project's `/src/types` folder:

```typescript
declare global {
  interface Window {
    Jupiter: JupiterPlugin;
  }
};
export {};
```

<details>
  <summary>
    Full TypeScript Declaration
  </summary>

```typescript
declare global {
    interface Window {
        Jupiter: JupiterPlugin;
    }
}

export type WidgetPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
export type WidgetSize = 'sm' | 'default';
export type SwapMode = "ExactInOrOut" | "ExactIn" | "ExactOut";
export type DEFAULT_EXPLORER = 'Solana Explorer' | 'Solscan' | 'Solana Beach' | 'SolanaFM';

export interface FormProps {
    swapMode?: SwapMode;
    initialAmount?: string;
    initialInputMint?: string;
    initialOutputMint?: string;
    fixedAmount?: boolean;
    fixedMint?: string;
    referralAccount?: string;
    referralFee?: number;
}

export interface IInit {
    localStoragePrefix?: string;
    formProps?: FormProps;
    defaultExplorer?: DEFAULT_EXPLORER;
    autoConnect?: boolean;
    displayMode?: 'modal' | 'integrated' | 'widget';
    integratedTargetId?: string;
    widgetStyle?: {
        position?: WidgetPosition;
        size?: WidgetSize;
    };
    containerStyles?: CSSProperties;
    containerClassName?: string;
    enableWalletPassthrough?: boolean;
    passthroughWalletContextState?: WalletContextState;
    onRequestConnectWallet?: () => void | Promise<void>;
    onSwapError?: ({
        error,
        quoteResponseMeta,
    }: {
        error?: TransactionError;
        quoteResponseMeta: QuoteResponse | null;
    }) => void;
    onSuccess?: ({
        txid,
        swapResult,
        quoteResponseMeta,
    }: {
        txid: string;
        swapResult: SwapResult;
        quoteResponseMeta: QuoteResponse | null;
    }) => void;
    onFormUpdate?: (form: IForm) => void;
    onScreenUpdate?: (screen: IScreen) => void;
}

export interface JupiterPlugin {
    _instance: JSX.Element | null;
    init: (props: IInit) => void;
    resume: () => void;
    close: () => void;
    root: Root | null;
    enableWalletPassthrough: boolean;
    onRequestConnectWallet: IInit['onRequestConnectWallet'];
    store: ReturnType<typeof createStore>;
    syncProps: (props: { passthroughWalletContextState?: IInit['passthroughWalletContextState'] }) => void;
    onSwapError: IInit['onSwapError'];
    onSuccess: IInit['onSuccess'];
    onFormUpdate: IInit['onFormUpdate'];
    onScreenUpdate: IInit['onScreenUpdate'];
    localStoragePrefix: string;
}

export { };
```

</details>

## Step 3: Embed the Plugin Script

In your `/public/index.html`, add the Jupiter Plugin script:

```html
<head>
  <script src="https://plugin.jup.ag/plugin-v1.js" data-preload defer></script>
</head>
```

## Step 4: Initialize Plugin

There are two ways to initialize Jupiter Plugin in a React application:

### Method 1: Using Window Object

In your `/src/App.tsx`, use the following code to initialize the plugin.

```typescript
import React, { useEffect } from 'react';
import './App.css';
import './types/plugin.d';

export default function App() {
  useEffect(() => {
    // Initialize plugin
    window.Jupiter.init({
      displayMode: "widget",
      integratedTargetId: "jupiter-plugin",
    });
  }, []);

  return (
    <div className="App">
      <h1>Jupiter Plugin Demo</h1>
      <div id="jupiter-plugin" />
    </div>
  );
}
```

### Method 2: Using @jup-ag/plugin Package

:::warning
Do note that using this method will require you to maintain its dependencies.
:::

1. Install the package:

```bash
npm install @jup-ag/plugin
```

2. Initialize the plugin:

```typescript
import React, { useEffect } from "react";
import "@jup-ag/plugin/css";
import "./App.css";
import "./types/plugin.d";

export default function App() {
  useEffect(() => {
    import("@jup-ag/plugin").then((mod) => {
      const { init } = mod;
      init({
        displayMode: "widget",
        integratedTargetId: "jupiter-plugin",
      });
    });
  }, []);

  return (
    <div>
      <h1>Jupiter Plugin Demo</h1>
      <div id="jupiter-plugin" />
    </div>
  );
}
```

There you have it! You've successfully integrated Jupiter Plugin into your Next.js application.

- Please test the swap functionality and check the transaction.
- If you require more customizations, check out the [Plugin Playground](https://plugin.jup.ag) or the [Customization](/docs/tool-kits/plugin/customization) documentation.
- If you have any questions or issues, please refer to the [FAQ](./faq.md) or contact us on [Discord](https://discord.gg/jup).
