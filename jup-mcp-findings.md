# Jupiter Trading MCP — findings report

Cross-check of the `jup-ag/jup-mcp` server (source + live endpoint) against the current Jupiter
developer docs. Produced while documenting the server for [DEV-480](https://linear.app/raccoons/issue/DEV-480).

**Working document — not part of the published docs site. Do not add to `docs.json`.**

Method: read every tool file under `jup-ag/jup-mcp` `src/tools/<domain>/*.ts` (tool name,
description, the Jupiter REST path it calls), the repo README, and probed the live endpoint.
Compared against the current docs under this repo and `.claude/rules/product-learning.md`.

Date: 2026-06-30. MCP commit: `main` HEAD at time of check.

---

## Summary

- The server is **live** at `https://mcp.jup.ag` (`GET /health` → `200`).
- **47 tools across 8 domains**, confirmed from source.
- Most domains call the **current** API version (price v3, swap v2, tokens v2). The one real
  staleness flag is **Trigger**, which calls the unmaintained `/trigger/v1/*` API.
- The DEV-480 description has several inaccuracies (endpoint, Prediction count, tokens/trigger/lend
  domain descriptions) — corrected in section A.

---

## A. DEV-480 description errors (fix in the issue)

| # | Issue says | Reality (source / live) |
|---|------------|--------------------------|
| 1 | Hosted at `api.jup.ag/mcp` (once live) | Live now at `https://mcp.jup.ag`. `api.jup.ag/mcp` returns `404`. |
| 2 | "Blocked: waiting for the hosted server to be live" | Unblock — `https://mcp.jup.ag/health` returns `200`. |
| 3 | Prediction = 19 tools | Prediction = **20** tools. (Grand total of 47 is correct; the per-domain breakdown summed to 46.) |
| 4 | Tokens (4): "search tokens, get info, validate addresses, get top tokens" | Actual 4 tools: `tokens_search`, `tokens_list_by_tag`, `tokens_list_by_category`, `tokens_list_recent`. There is **no "validate addresses" tool**. |
| 5 | Trigger (5): "create/cancel/list limit orders & DCA" | Trigger = **limit orders only**. **DCA is the separate Recurring domain** (4 tools). |
| 6 | Lend (7): "lending/borrowing via marginfi" | Jupiter Lend is **Jupiter-owned** (Fluid-based per product-learning), **not marginfi**. The MCP exposes the **Earn side only** (deposit/withdraw/mint/redeem/positions/earnings/tokens). **No borrow tools.** |

Auth / transport claims in the issue are **accurate**: stateless per-request Bearer token = your
Jupiter API key from portal.jup.ag; the server never stores it and forwards it as `x-api-key` to
`api.jup.ag`. Transport is HTTP (`type: http`, Streamable HTTP).

---

## B. MCP-vs-docs staleness (flag to the MCP / Labs team)

### F1 — high: Trigger tools use the unmaintained Trigger V1 API
All 5 trigger tools call `/trigger/v1/*`:

| Tool | Path |
|------|------|
| `trigger_build_order` | `POST /trigger/v1/createOrder` |
| `trigger_build_cancel` | `POST /trigger/v1/cancelOrder` |
| `trigger_build_cancel_batch` | `POST /trigger/v1/cancelOrders` |
| `trigger_execute` | `POST /trigger/v1/execute` |
| `trigger_list_orders` | `GET /trigger/v1/getTriggerOrders` |

Our docs mark **Trigger V1 as unmaintained** (superseded by Trigger V2: `api.jup.ag/trigger/v2`,
vault-based, JWT challenge-response, `/orders/price`). Trigger V1 still works, so the MCP is
functional, but it is a generation behind the current product. The docs page describes this as
generic "limit orders" and does not claim V2.

### F2 — low (cosmetic): em dashes in tool descriptions
`prediction_get_trade_history`, `prediction_list_trades`, `swap_get_instructions`, and
`tokens_search` contain em dashes in their `description` strings. Conflicts with our style guide
if we ever lift this copy into docs. Upstream-repo concern only.

---

## C. Docs gaps the MCP surfaces (our docs should answer)

### G1 — Recurring minimums under-documented
`recurring_build_order` states and the schema enforces: **100 USD total order, at least 2 cycles,
50 USD per cycle** (schema: `numberOfOrders >= 2`, `interval >= 60s`). Our `recurring/` docs only
document the **100 USD total** minimum.

Action (follow-up, out of scope for the docs-page PR unless requested): verify the 50 USD/cycle
and 2-cycle minimums against the live API / `recurring` source, then add them to
`recurring/best-practices.mdx` and record a `product-learning.md` entry.

---

## D. Confirmed current / consistent (no action)

| Domain | MCP path | Docs status |
|--------|----------|-------------|
| Price | `GET /price/v3` (max 50 mints, 24h change) | Current. Matches `price/index.mdx`. |
| Swap | `GET /swap/v2/order`, `GET /swap/v2/build`, `POST /swap/v2/execute` | Current V2. `/build` Metis-only / no-RFQ matches docs. |
| Tokens | `GET /tokens/v2/search \| /tag \| /{category}/{interval} \| /recent` | Current V2. (Minor: `tokens_search` omits the comma-separated batch-by-mint up-to-100 capability our docs note — tool-richness nit, not staleness.) |
| Recurring | `POST /recurring/v1/*`, `GET /recurring/v1/getRecurringOrders` | V1 is the only public version. Consistent. |
| Lend | `/lend/v1/earn/*` (deposit, withdraw, mint, redeem, positions, earnings, tokens) | Earn side, current. Correctly labelled "Jupiter Lend/Earn" in source. |
| Prediction | `/prediction/v1/*` (20 tools) | V1 beta. Amount in micro USD (1,000,000 = $1.00); price 0–1. Consistent. |
| Portfolio | `GET /portfolio/v1/platforms`, `/positions/{address}`, `/staked-jup/{address}` | V1 beta. Matches `portfolio/index.mdx` exactly. |

---

## Tool inventory (47 total)

- **Swap (3):** `swap_get_order`, `swap_get_instructions`, `swap_execute_order`
- **Tokens (4):** `tokens_search`, `tokens_list_by_tag`, `tokens_list_by_category`, `tokens_list_recent`
- **Price (1):** `price_get`
- **Trigger (5):** `trigger_build_order`, `trigger_build_cancel`, `trigger_build_cancel_batch`, `trigger_execute`, `trigger_list_orders`
- **Recurring (4):** `recurring_build_order`, `recurring_build_cancel`, `recurring_execute`, `recurring_list_orders`
- **Lend (7):** `lend_build_deposit`, `lend_build_withdraw`, `lend_build_mint_shares`, `lend_build_redeem_shares`, `lend_get_positions`, `lend_get_earnings`, `lend_list_tokens`
- **Prediction (20):** events (`get_event`, `list_events`, `search_events`, `list_suggested_events`), markets (`get_market`, `list_markets`, `get_orderbook`), orders (`build_order`, `list_orders`, `get_order`, `get_order_status`), positions (`list_positions`, `get_position`, `build_close_position`, `build_close_all_positions`, `build_claim_payout`), profile/feed (`get_profile`, `get_leaderboard`, `get_trade_history`, `list_trades`)
- **Portfolio (3):** `portfolio_list_platforms`, `portfolio_get_positions`, `portfolio_get_staked_jup`
