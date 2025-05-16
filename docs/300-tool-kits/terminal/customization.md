---
sidebar_label: "Customizing Terminal"
description: "Learn how to customize Jupiter Terminal's appearance and behavior."
title: "Customizing Terminal"
---

<head>
    <title>Customizing Terminal</title>
    <meta name="twitter:card" content="summary" />
</head>

Try out the [Terminal Playground](https://terminal.jup.ag/playground) to experience the full swap features and see the different customization options with code snippets.

For the full customization options, you can refer to the [repository](https://github.com/jup-ag/terminal/blob/main/src/types/index.d.ts).

If you are using TypeScript, you can use the type declaration file to get the full type definitions for the Terminal.

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
    fixedAmount?: boolean;
    fixedInputMint?: boolean;
    fixedOutputMint?: boolean;
    initialAmount?: string;
    initialInputMint?: string;
    initialOutputMint?: string;
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

## Display Modes

Jupiter Terminal offers three distinct display modes to suit different use cases:

### 1. Integrated Mode

The integrated mode embeds the terminal directly into your application's layout. This is ideal for creating a seamless swap experience within your dApp.

```typescript
{
  displayMode: "integrated",
  integratedTargetId: string, // Required: ID of the container element
  containerStyles?: {
    width?: string,
    height?: string,
    borderRadius?: string,
    overflow?: string
  },
  containerClassName?: string
}
```

### 2. Widget Mode

The widget mode creates a floating terminal that can be positioned in different corners of the screen. Perfect for quick access to swaps without taking up too much space.

```typescript
{
  displayMode: "widget",
  widgetStyle?: {
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    size?: "sm" | "default"
  },
}
```

### 3. Modal Mode

The modal mode displays the terminal in a popup overlay. This is useful when you want to keep the terminal hidden until needed.

```typescript
{
  displayMode: "modal",
}
```

## Form Props Configuration

The `formProps` object allows you to customize the initial state and behavior of the swap form! This can be useful for use cases like fixed token swaps for memecoin communities or fixed amount payments.

```typescript
{
  displayMode: "modal",
  formProps?: {
    initialAmount?: string, // Pre-fill the swap amount (e.g. "100")
    initialInputMint?: string, // Pre-select the input token by its mint address
    initialOutputMint?: string, // Pre-select the output token by its mint address

    fixedAmount?: boolean, // When true, users cannot change the swap amount
    fixedInputMint?: boolean, // When true, users cannot change the input token
    fixedOutputMint?: boolean, // When true, users cannot change the output token

    referralAccount?: string, // Set the referral account for the swap
    referralFee?: number, // Set the referral fee for the swap
  }
}
```

## Wallet Integration

Jupiter Terminal supports third-party wallet integration through the `enableWalletPassthrough` prop. This allows your application to pass through an existing wallet provider's connection in your application to Terminal. If you do not have an existing wallet provider, Terminal will provide a wallet adapter and connection - powered by [Unified Wallet Kit](/docs/tool-kits/wallet-kit/).

```typescript
{
  // When true, wallet connection are handled by your dApp,
  // and use `syncProps()` to syncronise wallet state with Terminal.
  enableWalletPassthrough?: boolean,
  
  // When enableWalletPassthrough is true, this allows Terminal 
  // to callback your app's wallet connection flow
  onRequestConnectWallet?: () => void | Promise<void>;
}
```

## Token List Management

The Jupiter Token API is an open, collaborative and dynamic token list to make trading on Solana more transparent and safer for all. It is default to true to ensure that only validated tokens are shown.

```typescript
{
  strictTokenList?: boolean,
}
```

## Event Handling

Jupiter Terminal provides event handlers to track swap operations:

```typescript
{
  onSuccess: ({ txid, swapResult, quoteResponseMeta }) => {
    // Handle successful swap
    console.log("Swap successful:", txid);
  },
  onSwapError: ({ error, quoteResponseMeta }) => {
    // Handle swap errors
    console.error("Swap failed:", error);
  }
}
```

## Examples

### Fixed Token Pair Swap

```typescript
window.Jupiter.init({
  displayMode: "integrated",
  integratedTargetId: "swap-container",
  formProps: {
    initialInputMint: "So11111111111111111111111111111111111111112", // SOL
    fixedInputMint: true,
    initialOutputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
    fixedOutputMint: true,
  },
});
```

### Payment Integration

```typescript
window.Jupiter.init({
  displayMode: "modal",
  formProps: {
    initialAmount: "10",
    fixedAmount: true,
    initialOutputMint: "YOUR_TOKEN_MINT",
    fixedOutputMint: true,
  },
});
```

### Floating Widget

```typescript
window.Jupiter.init({
  displayMode: "widget",
  widgetStyle: {
    position: "bottom-right",
    size: "sm",
  },
});
```
