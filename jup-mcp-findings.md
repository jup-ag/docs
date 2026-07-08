# Jupiter Trading MCP — findings report

Cross-check of the `jup-ag/jup-mcp` server (source + live endpoint) against the current Jupiter
developer docs. Produced while documenting the server for [DEV-480](https://linear.app/raccoons/issue/DEV-480).

**Working document — not part of the published docs site. Do not add to `docs.json`.**

Method: read every tool file under `jup-ag/jup-mcp` `src/tools/<domain>/*.ts` (tool name,
description, the Jupiter REST path it calls), the repo README, and probed the live endpoint.
Compared against the current docs under this repo and `.claude/rules/product-learning.md`.

Date: 2026-06-30. MCP commit: `main` HEAD at time of check.

---

> **Update (2026-07-08, from PR review by the MCP maintainer + re-verification against the live
> server).** The server has grown since the original cross-check. It now exposes **75 tools across
> 11 domains** (added **Send** 4, **Studio** 4, **Transaction** 1; Lend 7→11, Tokens 4→7,
> Prediction 20→27, Trigger 5→10). **Trigger has migrated to `/trigger/v2`** (JWT + Privy vault
> flow), so **F1 is resolved** and `trigger_build_order` / `trigger_build_cancel_batch` /
> `trigger_execute` no longer exist. **An API key is now optional** — keyless requests work at a
> lower rate limit (`tools/list` and `price_get` verified returning `200` with no auth header); a
> `401` now means the key sent is invalid, not that a key is missing. The counts and version notes
> below are the original 2026-06-30 state, kept for history; the docs page reflects the current
> state.

## Summary

- The server is **live** at `https://mcp.jup.ag` (`GET /health` → `200`).
- **75 tools across 11 domains** (current; see the update note above). Original cross-check found 47
  tools across 8 domains.
- Domains now call current API versions across the board, including **Trigger on `/trigger/v2`**.
  The one remaining repo flag is F3 (README links the wrong **portal URL**).
- The DEV-480 description had several inaccuracies (endpoint, Prediction count, tokens/trigger/lend
  domain descriptions) — corrected in section A.

Current counts (2026-07-08, live `tools/list`): lend 11, portfolio 3, prediction 27, price 1,
recurring 4, swap 3, tokens 7, trigger 10, send 4, studio 4, transaction 1 = **75**.

Original re-verification (2026-06-30): source tool counts were lend 7, portfolio 3, prediction 20,
price 1, recurring 4, swap 3, tokens 4, trigger 5 = **47**; version prefixes price `/v3`,
swap `/v2`, tokens `/v2`, others `/v1`. Portal redirect confirmed: `portal.jup.ag` →
`developers.jup.ag/` (docs root), while `developers.jup.ag/portal` → portal sign-in.

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

### F1 — RESOLVED (2026-07-08): Trigger migrated to `/trigger/v2`
Originally, all 5 trigger tools called the unmaintained `/trigger/v1/*` API. As of the
2026-07-08 review, Trigger is on **`/trigger/v2`** with the current vault-based, JWT
challenge-response flow, and now has **10 tools**: `trigger_get_challenge`,
`trigger_verify_challenge`, `trigger_get_vault`, `trigger_register_vault`, `trigger_build_deposit`,
`trigger_create_order`, `trigger_update_order`, `trigger_build_cancel`, `trigger_confirm_cancel`,
`trigger_list_orders`. The old `trigger_build_order`, `trigger_build_cancel_batch`, and
`trigger_execute` tools are gone. Placing a limit order is now: `trigger_get_challenge` →
`trigger_verify_challenge` → `trigger_build_deposit` → `trigger_create_order`. No action needed.

### F3 — medium: README links the wrong portal URL
The README sends users to `https://portal.jup.ag/` to create an API key (3 places: quickstart
step 1, the Authentication section, and Support). That host **redirects to the docs root
`https://developers.jup.ag/`**, not to the Developer Platform. The canonical URL is
**`https://developers.jup.ag/portal`** (redirects to sign-in → portal). A new user following the
README lands on the docs homepage instead of the API-key page. Fix in the MCP repo's README.
(Our docs page already uses `https://developers.jup.ag/portal`.)

### F4 — nit: inbound auth only accepts `Authorization: Bearer`, not `x-api-key`
The server's inbound auth (`src/infrastructure/security/auth.ts`) accepts **only**
`Authorization: Bearer <key>` and returns `401` otherwise. But the value is a Jupiter API key,
and the server forwards it **outbound as `x-api-key`** (`jupiter-client.ts`,
`API_KEY_HEADER = "x-api-key"`) — the convention every other Jupiter REST API uses.

Suggestion: keep `Authorization: Bearer` as the documented/primary method (aligns with the MCP
Authorization spec and is forward-compatible with OAuth), but **also accept `x-api-key` inbound**
as a fallback — one extra check in `extractApiKey`. This matches the rest of the platform so
integrators can reuse the header they already send, with no downside. Additive, low-risk.

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
| Trigger | `/trigger/v2/*` (JWT + Privy vault flow, 10 tools) | Current V2 (as of 2026-07-08; see F1). |
| Recurring | `POST /recurring/v1/*`, `GET /recurring/v1/getRecurringOrders` | V1 is the only public version. Consistent. |
| Lend | `/lend/v1/earn/*` (deposit, withdraw, mint, redeem, positions, earnings, tokens; +instructions variants, 11 tools) | Earn side, current. Correctly labelled "Jupiter Lend/Earn" in source. |
| Prediction | `/prediction/v1/*` (27 tools) | V1 beta. Amount in micro USD (1,000,000 = $1.00); price 0–1. Consistent. |
| Portfolio | `GET /portfolio/v1/platforms`, `/positions/{address}`, `/staked-jup/{address}` | V1 beta. Matches `portfolio/index.mdx` exactly. |
| Send | Jupiter Send invite transfers/clawback (4 tools) | New domain since original cross-check. |
| Studio | Jupiter Studio DBC launch pools + creator fees (4 tools) | New domain since original cross-check. |
| Transaction | `transaction_submit` (land signed tx via Beam, 1 tool) | New domain since original cross-check. |

---

## E. End-to-end verification against the live server (2026-06-30)

Ran the MCP protocol directly against `https://mcp.jup.ag` over Streamable HTTP (JSON-RPC POST).

| Check | Result |
|-------|--------|
| `GET /health` | `200 {"status":"ok"}` |
| `initialize` (no `Authorization` header) | `401 {"error":"Unauthorized: API key required"}` |
| `initialize` (any Bearer token) | `200` — `serverInfo: jup-mcp v1.0.0`, `protocolVersion 2025-06-18`, `capabilities.tools.listChanged: true`. No `Mcp-Session-Id` returned → **stateless** server. |
| `tools/list` | `200` — **47 tools**, domain split exactly matches source (lend 7, portfolio 3, prediction 20, price 1, recurring 4, swap 3, tokens 4, trigger 5). **Live deployment matches source 1:1.** |
| `tools/call price_get` with wrong arg (`mints`) | MCP input-validation error `-32602` (schema requires `ids`). Tool schemas are enforced. |
| `tools/call price_get` with `ids=<SOL mint>` + dummy key | `API error (401): {"code":401,"message":"Unauthorized"}` — the key is forwarded to `api.jup.ag` as `x-api-key` and Jupiter rejects the dummy. **Confirms the full MCP → Jupiter wiring.** |
| Happy-path execution with a **valid** key | `200`, `isError` unset. `price_get` for SOL + USDC returned live data: SOL `usdPrice ≈ 73.14`, USDC `≈ 0.9996`, each with `liquidity`, `decimals`, and `priceChange24h`. **Full path verified end to end.** |

### Client-level test (the documented user path)
Beyond raw JSON-RPC, the documented **Claude Code** setup was exercised exactly as a user would:

| Check | Result |
|-------|--------|
| `claude mcp add --transport http jupiter-trading https://mcp.jup.ag --header "Authorization: Bearer <key>"` | Server added to local config. |
| `claude mcp list` connection check | `jupiter-trading … ✔ Connected` (client ran the real `initialize` handshake with the key). |
| Headless agent, natural-language prompt ("look up the current USD price of SOL and JUP") | Agent auto-discovered the tools and called `price_get`, returning live prices (SOL ≈ \$73.2, JUP ≈ \$0.21). **The documented config + tool discovery + a real tool call all work from an actual MCP client.** |

### Read-tool sweep (8 domains)
Exercised one read tool per domain with live calls; all returned valid data: `price_get`,
`tokens_search`, `tokens_list_by_category`, `swap_get_order` (quote, no taker), `lend_list_tokens`,
`prediction_list_events`, `portfolio_list_platforms`. **F5 (usability) — `prediction_list_events`
returns oversized payloads:** even `limit=5` returned ~108 KB because each event embeds its full
`markets` array, which exceeds the MCP-client tool-result token cap. An agent will choke on the
default response. Suggest trimming embedded markets from the list response or adding a lightweight
list mode.

### Write path — real on-chain execution
Completed the full `swap_get_order(taker)` → sign → `swap_execute_order` loop against the live
server with a real funded wallet:

| Check | Result |
|-------|--------|
| `swap_get_order` with a real `taker` | Returned a signable base64 `transaction` + `requestId`, RTSE auto-slippage, fees attributed to the taker. No spend. |
| Sign locally + `swap_execute_order` | **`status: Success`**, real on-chain swap landed: 0.01 SOL → 0.732081 USDC, signature `49EtE9d…X438R`, slot 429909875. **Full write path verified end to end.** |

**F6 (integration note, for docs) — short blockhash validity.** A first attempt failed with
`code -1005 "Transaction expired"` because model-in-the-loop latency between order, signing, and
execute exceeded the order's blockhash validity (~60s). Re-running build → sign → execute back to
back succeeded. Integrators (and the docs page) should treat the order as short-lived: sign and
submit immediately, and re-fetch the order rather than reusing a stale `requestId`. No funds are
spent on an expired submission.

**Behaviour note (relates to F4):** the MCP auth boundary checks only that a Bearer token is
*present*, not that it is *valid* — `initialize` and `tools/list` succeed with any non-empty
Bearer. Key validity is enforced downstream by Jupiter's API on the first tool call that hits
`api.jup.ag`. This is expected for a stateless passthrough, but worth noting: a misconfigured key
surfaces as an `API error (401)` inside a tool result, not as a connection-time failure.

---

## Tool inventory (75 total, live `tools/list` on 2026-07-08)

- **Swap (3):** `swap_get_order`, `swap_execute_order`, `swap_get_instructions`
- **Tokens (7):** `tokens_search`, `tokens_list_by_tag`, `tokens_list_by_category`, `tokens_list_recent`, `tokens_get_verification_eligibility`, `tokens_build_verification_payment`, `tokens_execute_verification`
- **Price (1):** `price_get`
- **Trigger (10):** `trigger_get_challenge`, `trigger_verify_challenge`, `trigger_get_vault`, `trigger_register_vault`, `trigger_build_deposit`, `trigger_create_order`, `trigger_update_order`, `trigger_build_cancel`, `trigger_confirm_cancel`, `trigger_list_orders`
- **Recurring (4):** `recurring_build_order`, `recurring_build_cancel`, `recurring_execute`, `recurring_list_orders`
- **Lend (11):** `lend_build_deposit`, `lend_build_withdraw`, `lend_build_mint_shares`, `lend_build_redeem_shares`, `lend_get_deposit_instructions`, `lend_get_withdraw_instructions`, `lend_get_mint_instructions`, `lend_get_redeem_instructions`, `lend_list_tokens`, `lend_get_positions`, `lend_get_earnings`
- **Prediction (27):** events (`search_events`, `list_events`, `get_event`, `list_suggested_events`), markets (`list_markets`, `get_market`, `get_orderbook`, `get_event_market`), orders (`build_order`, `list_orders`, `get_order`, `get_order_status`), positions (`list_positions`, `get_position`, `build_close_position`, `build_close_all_positions`, `build_claim_payout`), profile/feed (`get_profile`, `get_leaderboard`, `get_trade_history`, `list_trades`, `get_pnl_history`), live/scores (`get_trading_status`, `get_live_scores`, `get_event_score`, `get_forecast`, `get_vault_info`)
- **Portfolio (3):** `portfolio_get_positions`, `portfolio_list_platforms`, `portfolio_get_staked_jup`
- **Send (4):** `send_build_transfer`, `send_build_clawback`, `send_list_pending_invites`, `send_list_invite_history`
- **Studio (4):** `studio_build_create_pool`, `studio_get_pool_addresses`, `studio_get_fees`, `studio_build_claim_fee`
- **Transaction (1):** `transaction_submit`
