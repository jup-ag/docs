---
sidebar_label: "Customizing Terminal"
description: "Learn how to customize Jupiter Terminal's appearance and behavior."
title: "Customizing Terminal"
---

# Customizing Jupiter Terminal

## Display Modes

Jupiter Terminal offers three distinct display modes to suit different use cases:

### 1. Integrated Mode

The integrated mode embeds the terminal directly into your application's layout. This is ideal for creating a seamless swap experience within your dApp.

```typescript
{
  displayMode: "integrated",
  integratedTargetId: string, // Required: ID of the container element
  formProps: {
    initialAmount?: string,    // Pre-fill the swap amount
    fixedAmount?: boolean,     // Lock the amount (useful for payments)
    initialInputMint?: string, // Pre-select input token
    fixedInputMint?: boolean,  // Lock input token selection
    initialOutputMint?: string,// Pre-select output token
    fixedOutputMint?: boolean  // Lock output token selection
  },
  strictTokenList: boolean,    // Restrict to predefined token list
  containerStyles: React.CSSProperties, // Custom CSS styles
  containerClassName: string   // Custom CSS classes
}
```

### 2. Widget Mode

The widget mode creates a floating terminal that can be positioned in different corners of the screen. Perfect for quick access to swaps without taking up too much space.

```typescript
{
  displayMode: "widget",
  widgetStyle: {
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    size?: "sm" | "default"
  },
  formProps: {
    initialAmount?: string,
    fixedAmount?: boolean,
    initialInputMint?: string,
    fixedInputMint?: boolean,
    initialOutputMint?: string,
    fixedOutputMint?: boolean
  },
  strictTokenList: boolean
}
```

### 3. Modal Mode

The modal mode displays the terminal in a popup overlay. This is useful when you want to keep the terminal hidden until needed.

```typescript
{
  displayMode: "modal",
  formProps: {
    initialAmount?: string,
    fixedAmount?: boolean,
    initialInputMint?: string,
    fixedInputMint?: boolean,
    initialOutputMint?: string,
    fixedOutputMint?: boolean
  },
  strictTokenList: boolean
}
```

## Form Configuration

The `formProps` object allows you to customize the initial state and behavior of the swap form:

- `initialAmount`: Pre-fill the swap amount (e.g., "1.5")
- `fixedAmount`: When true, users cannot modify the amount (useful for fixed-price payments)
- `initialInputMint`: Pre-select the input token by its mint address
- `fixedInputMint`: Lock the input token selection
- `initialOutputMint`: Pre-select the output token by its mint address
- `fixedOutputMint`: Lock the output token selection

## Token List Management

- `strictTokenList`: When true, restricts token selection to a predefined list
- Use this to ensure users only swap between approved tokens

## Styling Options

### Integrated Mode Styling

```typescript
{
  containerStyles: {
    width: "100%",
    height: "500px",
    borderRadius: "8px",
    overflow: "hidden"
  },
  containerClassName: "custom-terminal-class"
}
```

### Widget Mode Styling

```typescript
{
  widgetStyle: {
    position: "bottom-right", // Position in viewport
    size: "default"          // Size of the widget
  }
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

## Advanced Configuration

### RPC Endpoint Configuration

```typescript
{
  endpoint: "https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY";
}
```

### Token List Customization

```typescript
{
  tokenList: {
    // Custom token list configuration
  }
}
```

## Best Practices for Customization

1. **Responsive Design**

   - Use percentage-based widths for container styles
   - Test on different screen sizes
   - Consider mobile-first design

2. **User Experience**

   - Position widgets in easily accessible locations
   - Use modal mode for secondary swap functionality
   - Consider fixed token pairs for specific use cases

3. **Performance**

   - Use appropriate RPC endpoints
   - Implement proper error handling
   - Monitor swap success rates

4. **Security**
   - Use environment variables for sensitive data
   - Implement proper error boundaries
   - Validate user inputs

## Common Issues and Solutions

### 1. Integrated Mode: Search Form Collapses Terminal

- Ensure you establish a fixed height for the terminal container under `containerStyles`

```typescript
{
  containerStyles: {
    height: "500px",
  },
}
```

## Example Implementations

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
