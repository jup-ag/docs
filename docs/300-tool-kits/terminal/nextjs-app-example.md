---
sidebar_label: "Next.js App Example"
description: "A step-by-step guide to integrating Jupiter Terminal into a Next.js application."
title: "Next.js App Example"
---

<head>
    <title>Terminal Next.js App Example</title>
    <meta name="twitter:card" content="summary" />
</head>

## Step 1: Add TypeScript Support

Create a type declaration file `terminal.d.ts` in your project's types folder:

```typescript
declare global {
  interface Window {
    Jupiter: JupiterTerminal;
  }
}
```

## Step 2: Embed the Terminal Script

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
import Script from "next/script";

function MyApp({ Component, pageProps }) {
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

export default MyApp;
```

## Step 3: Initialize Terminal

Create a new component for the terminal:

```typescript
"use client";

import React, { useEffect } from "react";

export default function TerminalComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.Jupiter.init({
        displayMode: "integrated",
        integratedTargetId: "jupiter-terminal",
        endpoint: "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY",
        formProps: {
          fixedOutputMint: false,
        },
      });
    }
  }, []);

  return (
    <div>
      <h1>Jupiter Terminal Demo</h1>
      <div
        id="jupiter-terminal"
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
```
