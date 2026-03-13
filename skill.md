---
name: jupiter-agent-skills
description: Discovery index for all Jupiter agent skills. Lists available skills for integrating Jupiter APIs (swaps, lend, perps, triggers, recurring, tokens, price, portfolio, prediction markets, send, studio, lock, routing) with install commands and documentation links.
license: MIT
metadata:
  author: jupiter
  version: "1.0.0"
tags:
  - jupiter
  - jup-ag
  - agent-skills
  - integrating-jupiter
  - jupiter-lend
---

# Jupiter Agent Skills

> Agent skills for integrating with the Jupiter ecosystem on Solana. Each skill provides structured guidance, code examples, and API references for AI coding agents.

- GitHub: https://github.com/jup-ag/agent-skills
- Docs: https://dev.jup.ag
- [llms.txt](https://dev.jup.ag/llms.txt): Full documentation index for LLM context
- [MCP Server](https://dev.jup.ag/ai/mcp.md): Jupiter MCP server for tool-calling agents

## Skills

- [integrating-jupiter](https://dev.jup.ag/skills/integrating-jupiter.md): Comprehensive guidance for integrating Jupiter APIs (Ultra Swap, Lend, Perps, Trigger, Recurring, Tokens, Price, Portfolio, Prediction Markets, Send, Studio, Lock, Routing). Use for endpoint selection, integration flows, error handling, and production hardening.
  - GitHub: https://github.com/jup-ag/agent-skills/blob/main/skills/integrating-jupiter/SKILL.md
- [jupiter-lend](https://dev.jup.ag/skills/jupiter-lend.md): Interact with Jupiter Lend Protocol. Read-only SDK (@jup-ag/lend-read) for querying liquidity pools, lending markets (jlTokens), and vaults. Write SDK (@jup-ag/lend) for lending (deposit/withdraw) and vault operations (deposit collateral, borrow, repay, manage positions).
  - GitHub: https://github.com/jup-ag/agent-skills/blob/main/skills/jupiter-lend/SKILL.md

## Install

```bash
# Install all skills
npx skills add jup-ag/agent-skills

# Install a specific skill
npx skills add jup-ag/agent-skills --skill "integrating-jupiter"
npx skills add jup-ag/agent-skills --skill "jupiter-lend"
```

