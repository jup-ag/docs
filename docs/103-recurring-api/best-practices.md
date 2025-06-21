---
sidebar_label: "Best Practices"
description: "Best Practices for using the Recurring API"
title: "Best Practices"
---

<head>
    <title>Best Practices</title>
    <meta name="twitter:card" content="summary" />
</head>

Some best practices when using the Recurring API.

| Item | Recommendation |
| --- | --- |
| Understand the Recurring Product. | The Recurring API supports order creation for both recurring and smart recurring strategies. Understand the difference between the two and choose the appropriate one for your needs. |
| Both types of orders require minimum total amount of 100 USD. | As per the Jupiter Recurring API's requirements to prevent small orders from being created.<br />This is similar to jup.ag's frontend check for minimum order amount. |
| Time-based orders require minimum number of orders of 2 and 50 USD per order. | As per the Jupiter Recurring API's requirements to prevent small orders from being created.<br />This is similar to jup.ag's frontend check for minimum order amount. |
| Token-2022 tokens  | The Recurring API does not currently support Token-2022 mints. Ensure you’re only scheduling orders for standard SPL tokens (Token Program) until Token-2022 support is added. |