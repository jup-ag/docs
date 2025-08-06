---
sidebar_label: "HTML App Example"
description: "A step-by-step guide to integrating Jupiter Plugin into a HTML application."
title: "HTML App Example"
---

<head>
    <title>Plugin HTML App Example</title>
    <meta name="twitter:card" content="summary" />
</head>

In this guide, we'll walk you through from scratch the steps to integrate Jupiter Plugin into a HTML application.

## Prerequisites

Before you begin, make sure you have the following installed on your system.

**Node.js and npm**: Download and install from [nodejs.org](https://nodejs.org)
**http-server**: Download and install [http-server from npm](https://www.npmjs.com/package/http-server)

## Step 1: Create a New HTML Project

Head to your preferred directory and create a new folder for your project:

```bash
mkdir plugin-demo
cd plugin-demo
touch index.html
```

## Step 2: Add the Plugin Script

Add the Plugin script to your project:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jupiter Plugin Demo</title>
    <script src="https://plugin.jup.ag/plugin-v1.js" data-preload defer></script>
    <style>
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Jupiter Plugin Demo</h1>
        <div id="jupiter-plugin"></div>
    </div>

    <script>
        window.onload = function() {
            window.Jupiter.init({
                displayMode: "widget",
                integratedTargetId: "jupiter-plugin",
            });
        };
    </script>
</body>
</html>
```

## Step 3: Run the Project

Run the project using `http-server`:

```bash
http-server
```

There you have it! You've successfully integrated Jupiter Plugin into your HTML application.

- Please test the swap functionality and check the transaction.
- If you require more customizations, check out the [Plugin Playground](https://plugin.jup.ag) or the [Customization](/docs/tool-kits/plugin/customization) documentation.
- If you have any questions or issues, please refer to the [FAQ](./faq.md) or contact us on [Discord](https://discord.gg/jup).
