---
sidebar_label: "Customizing Plugin"
description: "Learn how to customize Jupiter Plugin's appearance and behavior."
title: "Customizing Plugin"
---

<head>
    <title>Customizing Plugin</title>
    <meta name="twitter:card" content="summary" />
</head>

Try out the [Plugin Playground](https://plugin.jup.ag/) to experience the full swap features and see the different customization options with code snippets.

For the full customization options, you can refer to the [repository](https://github.com/jup-ag/plugin/blob/main/src/types/index.d.ts).

If you are using TypeScript, you can use the type declaration file to get the full type definitions for the Plugin.

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

## Display Modes

Jupiter Plugin offers three distinct display modes to suit different use cases:

### 1. Integrated Mode

The integrated mode embeds the swap form directly into your application's layout. This is ideal for creating a seamless swap experience within your dApp.

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

The widget mode creates a floating swap form that can be positioned in different corners of the screen. Perfect for quick access to swaps without taking up too much space.

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

The modal mode displays the swap form in a popup overlay. This is useful when you want to keep the swap form hidden until needed.

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
    swapMode?: SwapMode, // Set the swap mode to "ExactIn", "ExactOut", or default to "ExactInOrOut"

    initialAmount?: string, // Pre-fill the swap amount (e.g. "100")
    initialInputMint?: string, // Pre-select the input token by its mint address
    initialOutputMint?: string, // Pre-select the output token by its mint address

    fixedAmount?: boolean, // When true, users cannot change the swap amount
    fixedMint?: string, // Lock one side of the swap to a specific token by its mint address

    referralAccount?: string, // Set the referral account for the swap
    referralFee?: number, // Set the referral fee for the swap
  }
}
```

## Wallet Integration

Jupiter Plugin supports third-party wallet integration through the `enableWalletPassthrough` prop. This allows your application to pass through an existing wallet provider's connection in your application to Plugin. If you do not have an existing wallet provider, Plugin will provide a wallet adapter and connection - powered by [Unified Wallet Kit](/docs/tool-kits/wallet-kit/).

```typescript
{
  // When true, wallet connection are handled by your dApp,
  // and use `syncProps()` to syncronise wallet state with Plugin.
  enableWalletPassthrough?: boolean,
  
  // When enableWalletPassthrough is true, this allows Plugin 
  // to callback your app's wallet connection flow
  onRequestConnectWallet?: () => void | Promise<void>;
}
```

## Event Handling

Jupiter Plugin provides event handlers to track swap operations:

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

## Branding

Jupiter Plugin supports branding through the `branding` prop. This allows you to customize the Plugin's logo and name to include your own branding.

```typescript
{
  branding?: {
    logoUri?: string;
    name?: string;
  };
}
```

## Color Theme

Jupiter Plugin supports a simplified way to customize the color theme. This allows you to match the appearance of the Plugin to your brand.

```css
/* In your global CSS file */
:root {
  --jupiter-plugin-primary: 199, 242, 132;
  --jupiter-plugin-background: 0, 0, 0;
  --jupiter-plugin-primaryText: 232, 249, 255;
  --jupiter-plugin-warning: 251, 191, 36;
  --jupiter-plugin-interactive: 33, 42, 54;
  --jupiter-plugin-module: 16, 23, 31;
}
```

## Examples

### Fixed SOL Swap

```typescript
window.Jupiter.init({
  displayMode: "integrated",
  integratedTargetId: "jupiter-plugin",
  formProps: {
    initialInputMint: "So11111111111111111111111111111111111111112", // SOL
    initialOutputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
    fixedMint: "So11111111111111111111111111111111111111112",
  },
});
```

### Payment Integration

```typescript
window.Jupiter.init({
  displayMode: "modal",
  formProps: {
    swapMode: "ExactOut",
    initialAmount: "10",
    fixedAmount: true,
    initialOutputMint: "YOUR_TOKEN_MINT",
    fixedMint: "YOUR_TOKEN_MINT",
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
