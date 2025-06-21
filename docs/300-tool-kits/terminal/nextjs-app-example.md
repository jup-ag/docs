---
sidebar_label: "Next.js App Example"
description: "A step-by-step guide to integrating Jupiter Terminal into a Next.js application."
title: "Next.js App Example"
---

<head>
    <title>Terminal Next.js App Example</title>
    <meta name="twitter:card" content="summary" />
</head>

In this guide, we'll walk you through from scratch the steps to integrate Jupiter Terminal into a Next.js application.

## Prerequisites

Before you begin, make sure you have the following installed on your system.

**Node.js and npm**: Download and install from [nodejs.org](https://nodejs.org)

## Step 1: Create a New Next.js Project

Head to your preferred directory and create a new Next.js project using `create-next-app` with TypeScript template (you can use other templates or methods to start your project too):

```bash
npx create-next-app@latest terminal-demo --typescript
cd terminal-demo
npm run dev
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

For Next.js applications, you can add the script in two ways:

### Using App Router (Next.js 13+)

In your `app/layout.tsx`:

```typescript
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://terminal.jup.ag/main-v4.js"
          strategy="beforeInteractive"
          data-preload
          defer
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Using Pages Router

In your `pages/_app.tsx`:

```typescript
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://terminal.jup.ag/main-v4.js"
        strategy="beforeInteractive"
        data-preload
        defer
      />
      <Component {...pageProps} />
    </>
  );
}
```

## Step 4: Initialize Terminal

There are two ways to initialize Jupiter Terminal in a Next.js application:

### Method 1: Using Window Object

Create a new component for the terminal at `components/terminal.tsx`:

```typescript
"use client";

import React, { useEffect } from "react";

export default function TerminalComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.Jupiter.init({
        displayMode: "widget",
        integratedTargetId: "jupiter-terminal",
      });
    }
  }, []);

  return (
    <div>
      <h1>Jupiter Terminal Demo</h1>
      <div
        id="jupiter-terminal"
      />
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

2. Create a new component for the terminal at `components/terminal.tsx`:

```typescript
"use client";

import React, { useEffect } from "react";
import "@jup-ag/terminal/css";

export default function TerminalComponent() {
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

## Step 5: Add the Terminal Component to Your Page

In your `app/page.tsx` (or `pages/index.tsx` if you're using Pages Router):

```typescript
import TerminalComponent from '@/components/terminal';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <TerminalComponent />
    </div>
  );
}
```

There you have it! You've successfully integrated Jupiter Terminal into your Next.js application.

- Please test the swap functionality and check the transaction.
- If you require more customizations, check out the [Terminal Playground](https://terminal.jup.ag/playground) or the [Customization](/docs/tool-kits/terminal/customization) documentation.
- If you have any questions or issues, please refer to the [FAQ](./faq.md) or contact us on [Discord](https://discord.gg/jup).
