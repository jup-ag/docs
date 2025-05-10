---
sidebar_label: "FAQ"
description: "Terminal FAQ"
title: "FAQ"
---

<head>
    <title>Terminal FAQ</title>
    <meta name="twitter:card" content="summary" />
</head>

**1. How do I feature request or get support?**

- For feature requests, please open an issue on the [GitHub repository](https://github.com/jup-ag/terminal/issues) and tag us on Discord.
- For support, please join the [Discord server](https://discord.gg/jup) and get help in the developer channels.

**2. Integrated Mode: Token Search Modal Collapses Terminal**

- Ensure you establish a fixed height for the terminal container under `containerStyles`

```typescript
{
   displayMode: "integrated",
   integratedTargetId: "jupiter-terminal",
   containerStyles: {
      height: "500px",
   },
}
```

## Best Practices for Customization

**1. Responsive Design**

   - Use percentage-based widths for container styles
   - Test on different screen sizes
   - Consider mobile-first design

**2. User Experience**

   - Position widgets in easily accessible locations
   - Consider fixed token pairs for specific use cases
   - Implement proper error handling and prompts

**3. Security**

   - Use environment variables for sensitive data
   - Implement proper error boundaries
   - Validate user inputs
