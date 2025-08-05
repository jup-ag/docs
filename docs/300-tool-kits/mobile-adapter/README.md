---
sidebar_label: "Getting Started"
description: "Using Jupiter Mobile Adapter to login to apps"
title: "Jupiter Mobile Adapter"
---

<head>
    <title>Jupiter Mobile Adapter</title>
    <meta name="twitter:card" content="summary" />
</head>

The Jupiter Mobile Adapter allows you to integrate Jupiter Mobile login functionality into your app! By allowing Jupiter Mobile users to simply use the app to scan a QR code to login, they can utilize their wallets on Jupiter Mobile across any platform.

1. Install [@jup-ag/jup-mobile-adapter](https://www.npmjs.com/package/@jup-ag/jup-mobile-adapter)
2. Use `useWrappedReownAdapter` (Prerequisite to create an app id on https://dashboard.reown.com/)
3. Add the `jupiterAdapter` within the wrapped adapter

:::tip
[Example code reference from Jupiverse Kit](https://github.com/dannweeeee/jupiverse-kit/blob/36b0ed1e51ae7c4150355d1dd70205525ed9f305/src/provider/hooks/useAllWallets.ts#L10)
:::

```jsx
import { WalletProvider } from '@solana/wallet-adapter-react';
import { useWrappedReownAdapter } from "@jup-ag/jup-mobile-adapter";

const WalletConnectionProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // Refer to https://reown.com/appkit
  const { reownAdapter, jupiterAdapter } = useWrappedReownAdapter({
    appKitOptions: {
      metadata: {
        name: "",
        description: ``,
        url: "<YOUR_DOMAIN>", // origin must match your domain & subdomain
        icons: [
          // add icons here
        ],
      },
      projectId: "<YOUR_PROJECT_ID>",
      features: {
        analytics: false,
        socials: ["google", "x", "apple"],
        email: false,
      },
      enableWallets: false,
    },
  });

  const wallets = useMemo(
    () => [
      reownAdapter,
      jupiterAdapter,
      // add more wallets here
    ],
    []
  );

  return (
    <WalletProvider wallets={wallets} autoConnect>
      {children}
    </WalletProvider>
  );
};
```