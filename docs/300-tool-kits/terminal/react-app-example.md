---
sidebar_label: "React App Example"
description: "A step-by-step guide to integrating Jupiter Terminal into a React application."
title: "React App Example"
---

<head>
    <title>Terminal React App Example</title>
    <meta name="twitter:card" content="summary" />
</head>

In this guide, we'll walk you through from scratch the steps to integrate Jupiter Terminal into a React application.

## Prerequisites

Before you begin, make sure you have the following installed on your system.

**Node.js and npm**: Download and install from [nodejs.org](https://nodejs.org)

## Step 1: Create a New React Project

Head to your preferred directory and create a new React project using `create-react-app` with TypeScript template (you can use other templates or methods to start your project too):

```bash
npx create-react-app terminal-demo --template typescript
cd terminal-demo
npm start
```

## Step 2: Add TypeScript Support

Create a type declaration file `terminal.d.ts` in your project's `/src/types` folder:

```typescript
declare global {
  interface Window {
    Jupiter: JupiterTerminal;
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
        Jupiter: JupiterTerminal;
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

export interface JupiterTerminal {
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

## Step 3: Embed the Terminal Script

In your `/public/index.html`, add the Jupiter Terminal script:

```html
<head>
  <script src="https://terminal.jup.ag/main-v4.js" data-preload defer></script>
</head>
```

## Step 4: Initialize Terminal

There are two ways to initialize Jupiter Terminal in a React application:

### Method 1: Using Window Object

In your `/src/App.tsx`, use the following code to initialize the terminal.

```typescript
import React, { useEffect } from 'react';
import './App.css';
import './types/terminal.d';

export default function App() {
  useEffect(() => {
    // Initialize terminal
    window.Jupiter.init({
      displayMode: "widget",
      integratedTargetId: "jupiter-terminal",
    });
  }, []);

  return (
    <div className="App">
      <h1>Jupiter Terminal Demo</h1>
      <div id="jupiter-terminal" />
    </div>
  );
}
```

### Method 2: Using @jup-ag/terminal Package

:::warning
Do note that using this method will require you to maintain its dependencies.
:::

1. Install the package:

```bash
npm install @jup-ag/terminal
```

2. Initialize the terminal:

```typescript
import React, { useEffect } from "react";
import "@jup-ag/terminal/css";
import "./App.css";
import "./types/terminal.d";

export default function App() {
  useEffect(() => {
    import("@jup-ag/terminal").then((mod) => {
      const { init } = mod;
      init({
        displayMode: "widget",
        integratedTargetId: "jupiter-terminal",
      });
    });
  }, []);

  return (
    <div>
      <h1>Jupiter Terminal Demo</h1>
      <div id="jupiter-terminal" />
    </div>
  );
}
```

There you have it! You've successfully integrated Jupiter Terminal into your Next.js application.

- Please test the swap functionality and check the transaction.
- If you require more customizations, check out the [Terminal Playground](https://terminal.jup.ag/playground) or the [Customization](/docs/tool-kits/terminal/customization) documentation.
- If you have any questions or issues, please refer to the [FAQ](./faq.md) or contact us on [Discord](https://discord.gg/jup).
