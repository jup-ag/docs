# Product Learnings

Single source of truth for product-specific knowledge that isn't (or shouldn't be)
in the docs themselves. This file accumulates institutional knowledge that prevents
Claude from writing incorrect content or making wrong assumptions.

**When to add an entry:** You discovered something non-obvious about a product —
through debugging, user feedback, reading source code, Discord, or trial and error —
and a future session would benefit from knowing it.

**Format:** Every entry is a dated bullet under the appropriate heading.
Keep entries concise — one line if possible, a short paragraph if needed.

---

# Ultra Swap API

## Undocumented Behavior

- [2026-03-09] `wrapAndUnwrapSol=true` always closes the wSOL token account after the transaction, regardless of whether the input or output mint is SOL. This was missing from the parameter description until PR#842.
- [2026-03-09] The `receiver` parameter allows specifying a different wallet to receive the output tokens, decoupling the payer from the recipient (added PR#791).

## Ambiguities

## Known Issues

## Open Questions

---

# Metis Swap API

## Undocumented Behavior

- [2026-03-09] `routePlan[].percent` may return `null` when using `instructionVersion=V2` due to the upgraded routing algorithm. Code must handle null values.
- [2026-03-09] The `mostReliableAmmsQuoteReport` parameter in the quote endpoint helps debug routing failures by reporting which AMMs were considered and why they were excluded.
- [2026-05-18] `GET /swap/v1/quote` can return an internal Dynamic Swap route step with `routePlan[].swapInfo.ammKey = "DynamicSwap11111111111111111111111111111112"` and a required `routePlan[].swapInfo.details.dynamicSwapV2` object. `POST /swap/v1/swap-instructions` returns `500 {"error":"Dynamic swap is missing dynamic swap details"}` if an integrator deserializes the quote into a strict struct and re-serializes it without preserving `swapInfo.details`. Preserve unknown quote fields with `serde_json::Value`/flatten maps or pass the raw quote JSON through unchanged.
- [2026-05-19] `GET /swap/v1/quote` supports `allowDynamicSwap=false` to suppress internal Dynamic Swap route steps. The parameter is parsed as a boolean on both Lite and API-key hosts (`allowDynamicSwap=not-bool` returns `400 ParseBoolError`). Verified with Bitrue-style Swap V1 flow: quotes that returned `DynamicSwap11111111111111111111111111111112` with `allowDynamicSwap=true` switched to non-Dynamic Swap AMMs with `allowDynamicSwap=false`, and the resulting quote built successfully through `POST /swap/v1/swap-instructions`.

## Ambiguities

## Known Issues

## Open Questions

## Content Gaps

## Patterns & Conventions

---

# Swap API V2

## Architecture

- [2026-03-17] Three endpoints: `/order` (default, all routers compete), `/build` (raw instructions, Metis-only routing), `/execute` (managed landing for `/order` only).
- [2026-04-16] Two integration paths: **Meta-Aggregator** (`/order` + `/execute`) where Jupiter handles transaction assembly and landing, and **Router** (`/build` + `/submit` or own RPC) where the integrator builds the transaction. The swap overview page uses this framing.
- [2026-03-17] `/order` without optional params gets all routers (Metis, JupiterZ, Hashflow, Dflow, OKX, Mantis). Adding certain params (fee, slippage overrides) may restrict to Metis-only routing.
- [2026-03-17] `/build` has no Jupiter swap fees. Only integrator platform fees via `platformFeeBps`.
- [2026-05-15] `/order` top-level `feeBps` is the total fee rate charged for the swap. `platformFee.feeBps` is the Jupiter platform fee component and can be lower when the swap includes gasless support cost recoup.
- [2026-03-17] `/build` returns `computeBudgetInstructions` with CU price only, NOT CU limit. Integrators must simulate to determine CU limit (confirmed from `ultra-api` source: `setComputeUnitPrice` only).
- [2026-05-21] Third (hidden) integration path: `/swap/v2/quote` + `/swap/v2/swap` (or `/swap/v2/swap-instructions`). Separated quote and swap flow exposed in `jup-ag/swap-api` for integrators that need to inspect or transform the quote between routing and transaction assembly. `/quote` returns a `QuoteResponse` (Metis-only routing) that is roundtripped unchanged to `/swap` (returns base64 VersionedTransaction) or `/swap-instructions` (returns raw instructions + `addressesByLookupTableAddress`). Body for `/swap` and `/swap-instructions` is shared (`swapBodySchema`). `QuoteResponsePassthrough` uses `.passthrough()` on the server; clients must preserve unknown fields when forwarding. Documented as a hidden page at `swap/quote-and-swap.mdx`. Not in `docs.json` nav.

## Gasless Behaviour

- [2026-05-22] `gasless: true` in the `/order` response has three independent sources: (1) automatic Jupiter sponsorship, (2) JupiterZ market maker winning the quote, (3) integrator `payer`. All three set `gasless: true`. The deterministic way to identify the source is by inspecting `signatureFeePayer` against the taker.
- [2026-05-22] **`gasTzr94Pmp4Gf8vknQnqxeYxdgwFjbgdJa4msYRpnB` is Jupiter's automatic gas sponsor wallet.** Empirically confirmed: when a low-SOL taker (&lt;0.01 SOL) hits `/order` and JupiterZ isn't winning the quote, the `signatureFeePayer`, `prioritizationFeePayer`, and `rentFeePayer` are all set to this address. Already used as the `example` value for the `payer` query param in the OpenAPI spec, but its role as the auto-sponsor wallet wasn't documented anywhere.
- [2026-05-22] JupiterZ market maker addresses **vary per quote** (e.g. `6UWsi9WKQbE5jLxLcycfr5NZ1DQGVNKUCkW1pzUaRVCE`, `GJvewfRjqTUPtx6WsBSUnaFbdgXwgXnWfpDyLm65T4YA` both observed on USDC↔SOL). Integrators should not hardcode against any single MM address; use the generic `signatureFeePayer != taker` check.
- [2026-05-22] `payer=taker` (same address as the taker) is a **no-op**. The `payer` param only activates integrator-sponsored gas when set to a wallet different from the taker. Integrators sometimes try `payer=taker` thinking it opts out of automatic gasless — it doesn't.
- [2026-05-22] **Docs claims that were empirically false** before the 2026-05-22 rewrite (in `swap/advanced/gasless.mdx`):
  - "Automatic gasless only when using default `/order` parameters" — false. Verified with low-SOL taker + `excludeRouters=jupiterz`: automatic gasless still fires via Metis route with `signatureFeePayer = gasTzr94…`.
  - "JupiterZ gasless does not work with manual mode params (`slippageBps`, `priorityFeeLamports`, `excludeRouters`)" — false. JupiterZ routes through with `slippageBps=5200` (5/5), `priorityFeeLamports=500000` (4/5), and `excludeRouters=okx` (5/5) all set individually.
  - "Automatic gasless does not work with manual mode params" — same as above, false.
  - The TRUE limitation still verified: JupiterZ is disabled by `payer != taker` (5/5 routed Metis-only).
- [2026-06-23] `referralAccount` + `referralFee` does not disable JupiterZ/RFQ by itself. Verified with controlled funded wallets and repeated forced-only-JupiterZ requests (`excludeRouters=metis,dflow,okx`): SOL→USDC with referral returned `router: "jupiterz"`, `swapType: "rfq"`, `feeBps: 50`, transaction present, and simulation `err: null`; USDC→USDT with a funded taker and USDC referral token account also returned JupiterZ with referral. `payer != taker` with a funded payer still disables/makes JupiterZ ineligible: forced-only-JupiterZ + payer returned `400 Failed to get quotes` 3/3; all-router + payer returned `router: "metis"` with `signatureFeePayer`, `prioritizationFeePayer`, and `rentFeePayer` equal to the payer. `payer=taker`, `slippageBps`, `priorityFeeLamports`, `jitoTipLamports`, and `receiver` did not disable JupiterZ in forced-only-JupiterZ tests.
- [2026-06-23] E2E `/swap/v2/execute` recheck for referral/gasless routing: referral + forced JupiterZ SOL→USDC landed (`rMpuQUTE49E4y6YBZRqNQaaJ2Fm9ZALEi4zniCGZukWueeXZmwaqoD8GVMWCvH2FBnqCNAwhELFsv7C5k1mHKj1`); `payer != taker` + referral all-router SOL→USDC landed as Metis with payer as fee/rent payer (`2RbbQan4ZSQMYGtnwst7DM8fcue9nbPboqn66fRr4fvgyBFHZvmU1SvAniGBU31njY233j5gY76r8AKp2cSYGHWJ`); low-SOL automatic Metis gasless USDC→USDT without referral landed with `gasTzr94…` as signature/rent payer (`q3HQrjkwBgwsaVZMsWffBJ2cRTA1Ea9iUFFhg8U9VX9kuLJJkdgLPi5Uv1wfL9nA7nzw3Jmdar6vphoPC87Xo2i`). Low-SOL forced JupiterZ + referral USDC→SOL returned valid RFQ orders and simulated locally, but `/execute` rejected 6/6 fresh attempts with RFQ code `-2004` (`Swap was rejected`). Do not document low-SOL + JupiterZ + referral as e2e-supported without a funded-taker caveat.
- [2026-06-25] Second E2E mainnet recheck for PR #917 review comments: fresh funded USDC taker + `referralAccount/referralFee` + `slippageBps=50` + forced JupiterZ USDC→USDT returned `router: "jupiterz"`, `swapType: "rfq"`, `rentFeePayer = taker`, simulated `err: null`, and landed (`Fbwqp824zEvK3wUyAiT7bYQHdMbnxmcXhvYFihaHQXkoo9GNXeUT6BUVuWGNusGgpyHE2EaTiDDW4n6jxSe76tm`). Fresh low-SOL USDC taker + no referral + forced Metis USDC→USDT landed automatic gasless with `signatureFeePayer/rentFeePayer = gasTzr94…` (`4ELXqeEqfSxgwjUBx2a1hg3k83E552v2fb6fzyrmJswFpqPpmaEGzFxqL7U17VjGwqQw8hfMztFjk5GjraukdT94`). Fresh `payer != taker` + referral all-router SOL→USDC landed as Metis with payer as all fee/rent payer (`3BgW2jKCWEJM3rJ9aJjMAMX9yUXmn9kd9JpoEgpLRdQ2eqCRbLFK3WzisSKVmJExygrAcmrZSqY14qk7wgwQMTQY`); forced-only-JupiterZ with the same payer returned `400 Failed to get quotes`.
- [2026-05-22] When a quote returns `gasless: true` from a JupiterZ MM, the MM pays signature and priority fees. ~~Taker previously paid ATA rent~~ — as of 2026-06-11, Jupiter's gas wallet (`gasTzr94…`) can fund the output token account if not yet initialised, but this is not universal: 2026-06-23 live tests showed no-referral JupiterZ USDC→USDT used `rentFeePayer = gasTzr94…`, while JupiterZ + referral with a funded taker used `rentFeePayer = taker`, and the same referral request failed for a low-SOL taker. Automatic Jupiter sponsorship covers all four cost types (sig, priority, ATA rent, other rent) when it fires through Metis since `gasTzr94…` is set as `rentFeePayer` too.
- [2026-06-05] `receiver` does not disable JupiterZ/RFQ routing on `/order`. Verified live with `receiver` set and `excludeRouters=iris,dflow,okx`: SOL->USDC and USDC->SOL requests returned `router: jupiterz`, `swapType: rfq`, and a transaction.

## Rent / Close-Account Handling (vs Ultra V1)

- [2026-05-19] **Swap V2 does NOT expose `closeAuthority`** (it was an Ultra V1 parameter). `/order` and `/build` silently ignore the query param. The only auto-close behaviour is for the temporary wSOL TA, and how the rent flows back depends on the path:
  - `/order` with `payer`: wSOL TA rent is paid by `payer` and **returned to `payer`** within the same transaction (Metis appends a compensating SOL transfer ix). Documented at `swap/advanced/gasless.mdx:89`. Non-wSOL ATAs are NOT returned (they hold tokens post-swap) — V2 has no equivalent of Ultra V1's `SetAuthority(closeAuthority=payer)` ix.
  - `/build` with `payer`: payer funds rent, but the returned `cleanupInstruction` is a plain `CloseAccount` whose rent destination is the wSOL TA owner (the **taker**). No compensating SOL transfer is appended. Verified live 2026-05-19 with `payer=BXBo…` and `taker=GkwF…`: cleanup ix destination = taker. Integrators must add their own taker→payer transfer or recoup via `referralFee`.
- [2026-05-19] **Closing the input SPL token account when selling 100% is not supported via `/order`.** No parameter exists to close the taker's source ATA (e.g. draining USDC). Only wSOL is auto-closed. Integrators wanting full-balance close-and-reclaim must use `/build` and append their own `closeAccount` ix (see `swap/build/common-instructions.mdx`).

## V1 vs V2 Instruction Differences

- [2026-03-17] V2 instructions do not emit fee events. Integrators parsing swap results via fee events need to update their parsing logic.
- [2026-03-17] Route plan response format: V1 uses `percent`, V2 uses `bps`.
- [2026-03-17] V2 defaults `instructionVersion=V2` for all usage.

## ALT (Address Lookup Table) Handling

- [2026-03-19] `/build` returns `addressesByLookupTableAddress` as `Record<string, string[]>` (table address to contained addresses). This is the full mapping needed to compile v0 transactions. No RPC calls needed to resolve ALTs.
- [2026-03-19] @solana/kit: use `compressTransactionMessageUsingAddressLookupTables` with the mapped data directly (just transform addresses).
- [2026-03-19] @solana/web3.js: construct `AddressLookupTableAccount` from the response data. The constructor requires `state` fields (`deactivationSlot`, `lastExtendedSlot`, `lastExtendedSlotStartIndex`) but `compileToV0Message` only reads `key` and `state.addresses` at runtime. Use placeholder values for the unused fields.

## /build Response & Params

- [2026-04-09] `/build` response includes `tipInstruction` (nullable) when `tipAmount` is provided. Code examples must handle it as optional: `...(build.tipInstruction ? [createInstruction(build.tipInstruction)] : [])`.
- [2026-04-09] `/build` has a `computeUnitPricePercentile` param (shipped in jup-ag/ultra-api#1375): named levels map to bps (`medium`=2500/25th, `high`=5000/50th, `veryHigh`=7500/75th) or raw integer 0-10000. Controls the `setComputeUnitPrice` instruction in `computeBudgetInstructions`. Defaults: 50th percentile normally, 90th in `mode=fast`. When provided, overrides both defaults. See https://solana.com/docs/core/fees/fee-structure for CUP/CUL context.
- [2026-04-09] `/build` transactions cannot use `/execute` for two reasons: (1) `/build` does not return `requestId`, and (2) `/execute` validates the transaction to prevent modifications, which defeats the purpose of `/build`.
- [2026-06-19] `/build` supports `forJitoBundle=true` to exclude DEXes incompatible with Jito bundles (same behaviour as V1's `forJitoBundle` on `/quote`). Only available on `/build`, not `/order`.
- [2026-06-19] `/build` response `blockhashWithMetadata` includes `fetchedAt` (ISO 8601 timestamp) not previously in the OpenAPI spec. Added in DEV-564.

## Known Issues

## Open Questions

## Content Gaps

## Patterns & Conventions

- [2026-03-17] Code examples provide both @solana/kit and @solana/web3.js variants in `<CodeGroup>` tabs. Kit is listed first as the recommended modern SDK.
- [2026-03-17] Prerequisites (imports, types, helpers) go in a collapsible `<Accordion>` above the main code example to keep the page scannable.
- [2026-04-09] `/build` code examples now default to `/submit` as the submission path instead of `sendRawTransaction`. Comments note "or use your own RPC / transaction pipeline" for integrators not using `/submit`.
- [2026-04-16] Code examples for `/build` and `/submit` must include confirmation polling as the final step (`confirmTransaction` with blockhash strategy). Step numbering must be consistent across pages that share the same flow (currently 7 steps: call API, collect instructions, prepare blockhash/ALTs, simulate CU, build final tx, sign and submit, confirm).

---

# Tokens API

## Undocumented Behavior

- [2026-06-19] `audit.topHoldersPercentage` and `audit.devBalancePercentage` are percentages on a **0-100 scale** (e.g. USDC `topHoldersPercentage=25.07` means 25.07%), NOT 0-1 fractions. Source: `datapipes/internal/pkg/searchserver/asset.go:164` → `topHolders/totalSupply*100`, clamped [0,100]. Verified live (USDC 25.07, SOL 0.586). A DX bounty integrator read it as a fraction and rejected every token with a `> 0.50` filter (DEV-571). Docs now state the scale explicitly.
- [2026-06-19] `audit.isSus` is serialized `omitempty` in source (`datapipes/.../model/assetupdate.go`), so it is **only present when a token is flagged suspicious** — absence is intentional and is not a guarantee of safety. Confirmed absent on SOL/USDC live. Check field presence, not value.
- [2026-06-19] `/tokens/v2/search?query=` accepts **comma-separated mint addresses, up to 100 per call**, returning full mint info in one request. This is the supported batch-by-mint path; there is no dedicated `/by-mint/:mint` route and one is not needed (DEV-568). Verified live with `SOL,USDC`.
- [2026-06-19] Tokens stats `priceChange` (stats5m/1h/6h/24h) is a **percentage**, same as Price API `priceChange24h`. Source: `datapipes/internal/pkg/percent/percent.go` → `(new-old)/old*100`.

## Ambiguities

## Known Issues

## Open Questions

## Content Gaps

## Patterns & Conventions

---

# Price API

## Undocumented Behavior

- [2026-06-19] `priceChange24h` is a **percentage** (e.g. SOL `-3.47` = -3.47%), not a 0-1 fraction. Source: `datapipes/.../percent/percent.go`. Already correct in the V3 OpenAPI spec; the `price/index.mdx` prose now annotates it too (DEV-567).
- [2026-06-19] `/price/v3` **silently omits** mints it cannot price reliably: the mint gets no key at all (not a `null` value), with no error and no per-mint reason string. Source: `datapipes/.../searchserver/query.go` → `if !ok { continue }`; no reason is surfaced internally. Verified live: requested 6 mints (incl. an invalid one), got 4 keys back. Detect dropped mints by diffing requested `ids` against returned keys. Surfacing `{usdPrice: null, reason}` would be an API change; out of docs scope (DEV-566 kept docs-only by decision).

## Ambiguities

## Known Issues

## Open Questions

## Content Gaps

## Patterns & Conventions

---

# Developer Platform

## Undocumented Behavior

## Ambiguities

## Known Issues

## Open Questions

## Content Gaps

## Patterns & Conventions

---

---

# AI Resources

## Facts

- [2026-03-03] `skill.md` served at developers.jup.ag/skill.md is sourced directly from the Skills Repository (github.com/jup-ag/agent-skills), NOT auto-generated by Mintlify. It uses intent routing rather than individual function definitions per endpoint.
- [2026-03-03] OpenAPI specs are accessible directly as YAML files, e.g. `developers.jup.ag/openapi-spec/swap/swap.yaml`
- [2026-03-03] The frontmatter field for AI descriptions is `llmsDescription` (with an 's'), not `llmDescription`

---

# Prediction Market API

## Undocumented Behavior

- [2026-03-09] Live API response schemas diverged from initial OpenAPI spec in several places (caught in PR#836/#839): Profile types are strings not numbers, PnL History returns `history` key not `data`, Leaderboard uses nested `{ all_time, weekly, monthly }` structure, `settlementTime` was renamed to `resolveAt`. Always verify against the live API when writing examples.

## Ambiguities

## Known Issues

## Open Questions

## Content Gaps

## Patterns & Conventions

---

# Trigger Order API

## Sources

- **Live API:** `api.jup.ag/trigger/v2` (requires `x-api-key`; authenticated routes also need a JWT `Authorization: Bearer`). This is the gateway host used for all live verification.
- **OpenAPI spec:** `openapi-spec/trigger/v2/trigger.yaml` in this repo. The price-order surface was complete; the DCA paths were added 2026-06-26 from live + source.
- **Source repo:** `jup-ag/trigger-order`, cloned locally at `/Users/anmol/Dev/trigger-order` (corrects the older `Documents/Projects/...` path). The V2 API is `api-v2/` (Hono + `@hono/zod-openapi` on Cloudflare Workers). DCA route handlers: `api-v2/src/routes/v2/orders/dca/**`; create/response schemas in `dca/schema.ts`; limits in `dca/validation.ts`; deposit discriminated union in `deposit/schema.ts`; history routing in `orders/history/index.ts`; auth middleware in `middleware/readonlyAuth.ts` + `readWriteAuth.ts`; root app (Hono `strict` option) in `src/index.ts`.
- [2026-07-02] **The repo's `api-v2/docs/*.md` are hand-maintained and stale — code is the source of truth (confirmed by Yusuf, DCA eng lead).** The older `docs/dca-api.md` was deleted; its replacement `docs/api-schemas.md` still shows `orderCount.max(100)`, `triggerMint` as optional/"defaults to outputMint", etc., all of which the actual zod schemas no longer do. When verifying Trigger behaviour, cite `api-v2/src/**` (and live), never `api-v2/docs/*.md`. Filing "docs say X but live says Y" tickets off these files wastes the eng team's time (four of the DEV-623 sub-issues traced back to this stale doc).
- **Local checkout caution:** always read `origin/main`, not whatever branch is checked out. The clone sat on a stale `pr-461` branch; `main` had already dropped the `orderCount` max (#481) and made `triggerMint` required, so `pr-461` produced false "live is ahead of source" findings.
- **SDK:** No public JS SDK for Trigger V2 DCA found in the repo or as a `@jup-ag/*` package. Integrators call the REST API directly.

## DCA — audit findings (2026-07-13, vs origin/main @ 7b15671d)

- **Round-fill execution is keeper-side, NOT in `api-v2`.** `api-v2/src/shared/order-states.ts` says the state machine "must stay in sync with keeper/"; the `executing`/`completed` states are "Keeper only". So routing, slippage, and fee at fill time cannot be verified from `api-v2`. Do not name RTSE or Ultra for DCA fills, and do not claim "no fee" — the keeper sets these.
- **On-chain fill forensics (verified 2026-07-13, fill tx `HuNMpjFkTjVrCYMN6gTPWV9ay3GSxTxM7sZj4WNzjvzQoe4J5CR71MnTpuMKH9rtkDoDCTWu6rYRM12oR9cpbb4`):** the round swap runs on `JUP6…` (Jupiter aggregator v6), the fee payer is the keeper gas wallet `gasBidSWW5zmwXs3gn8TG2ijzKkrwpyM7ucwjgDQst6` (not the taker, not the vault), and the output settles as **native SOL straight to the taker wallet** (+0.137589159 SOL, exactly the round `outputAmount`). So "keeper pays fees, output goes to the wallet" is confirmed empirically even though the code isn't in `api-v2`.
- **Fills carry a per-fill `fee_bps`** (`dca.fill_attempts`, read by `dca_get_successful_fills_sql.ts` and published to Redpanda). `api-v2` only reads it. So a blanket "no DCA fee" is wrong; the fee is set by the keeper and is reflected in the delivered `outputAmount`. Trigger V2 has no *integrator* fee (per the Trigger FAQ / YY), which is a separate thing.
- **A failed `confirm-cancel` does NOT roll the order back to `active`.** It stays in `withdrawing` for retry (re-craft via `cancel`, which is idempotent while withdrawing). The reset fn `resetDcaCancelAndMarkTransferFailed` (withdrawing→active) has **zero callers** on origin/main. Corrects the earlier threat-model note that claimed a rollback.
- **`triggerMint` rule is "not the stablecoin leg", not "supported price feed".** `checkDcaPriceConditional` (`service/order/mint-support.ts`) uses Ultra `/fees` `STABLE_CATEGORY`: stablecoin trigger → 400 "Trigger mint is not supported"; both legs stable → 400 "Mint pair is not supported".
- **`beginFillAt` >30 days → 400 "Begin fill time cannot be more than 30 days in the future"** (distinct from the past-time error; `MAX_BEGIN_FILL_AT_MS = 30d` in `dca/validation.ts`).
- **Confirmed in source (no change needed):** retry window `min(max(30, intervalSeconds/2), 7200)`; 10-active-order cap + error string; `state`→`displayState` map; transfer-fee/transfer-hook deposit rejection; dust added to the last round (computed in `api-v2`, credited by the keeper); `orderCount` min 2 / no max; `interval` 60–31,536,000; `$10`/round min with `$0.20` tolerance.

## Architecture

- [2026-05-18] Trigger V2 API is the umbrella for both LOv2 (limit orders, price-triggered) and DCAv2 (recurring, time-triggered). They share the same API surface with different paths: `/orders/price/*` (LO) and `/orders/dca/*` (DCA). Internally both are "trigger orders" — DCA is just time-triggered. Source: Evan, owner of Trigger + Recurring APIs. Docs currently only expose the price (LO) paths; DCAv2 routes exist in source but are not yet documented. The standalone Recurring API in docs is V1 only.
- [2026-03-10] V2 uses vault-based architecture with Privy-managed custodial wallets. Deposits go into vault accounts, not PDA order accounts like V1.
- [2026-03-10] JWT authentication via challenge-response flow. Challenge types: `message` (standard wallets) or `transaction` (hardware wallets). Challenge TTL: 5 min, JWT TTL: 24h.
- [2026-03-10] All fund operations (deposits, withdrawals) require wallet signature. A leaked JWT can cancel/edit orders but cannot move funds.
- [2026-03-10] Cancellation is two-step: initiate (order moves to `ready_to_cancel`, preventing fills) then sign withdrawal tx and confirm.

## Order Types

- [2026-03-10] Three order types: `single` (price limit), `oco` (one-cancels-other TP/SL pair sharing one deposit), `otoco` (parent trigger activates OCO on fill).
- [2026-03-10] Default slippage: TP/buy-below uses RTSE auto slippage, SL/buy-above defaults to 20% (2000 bps) for execution certainty.
- [2026-03-10] V2 triggers on USD price (not pool rate like V1). Output amount is not guaranteed.
- [2026-04-28] No integrator fees on Trigger V2, no timeline. No atomic workaround: the keeper executes the tx and the order is opaque to integrators. Only option is a separate transfer transaction outside the order flow. (Confirmed by YY.)
- [2026-05-08] Upcoming Trigger V2 craft-deposit enforcement: `POST /trigger/v2/deposit/craft` will require `orderType: "price"` and `orderSubType` (`single`, `oco`, or `otoco`) for price-order deposits. Create-order payloads do not receive these new craft-deposit fields.
- [2026-07-13] The 10 USD minimum is enforced at **`POST /trigger/v2/deposit/craft`** (on the total deposit `amount`), not at create. Verified live for both families: `amount` worth 0.08 USD returns `400 "Order must be at least 10 USD (current value: 0.08 USD)"` for `orderType: "price"`/`single` AND `orderType: "dca"`; 10 USD passes craft for both. The DCA per-round `inputAmount ÷ orderCount ≥ 10 USD` check is separate and fires at `POST /orders/dca` (needs `orderCount`, absent from craft), but is subsumed for any valid DCA (per-round ≥ 10 + orderCount ≥ 2 ⇒ total ≥ 20). Documented on `trigger/deposit.mdx`. `otoco` craft returns `outputTokenAccount` (verified). Full LO create→cancel→confirm-cancel e2e verified on mainnet (order `019f5b3c-8d51-7711-a19e-a6fcc0960fd1`): create returns `{id, txSignature}`, cancel returns `{id, transaction, requestId}`, confirm-cancel returns `{id, txSignature}`, 11 USDC fully refunded. Script: `~/Dev/jup-workbench/trigger-live-resolve.ts`.
- [2026-07-14] **Trailing stop loss (LOv2)** is a `single` order with `trailingBps` (50–9000) instead of `triggerPriceUsd` — exactly one of the two (zod refine). Not a new `orderType`. Gated by env `TRAILING_ENABLED` (source default off), but **verified live-enabled in prod on api.jup.ag** on 2026-07-14. Direction from `triggerCondition`: `below` = sell-below/stop loss (`triggerMint === inputMint`, trigger = `highWatermark × (1 − bps/10000)`), `above` = buy-above (`triggerMint === outputMint`, trigger = `lowWatermark × (1 + bps/10000)`). API seeds the initial trigger from the current Datapi price; keeper tracks a per-token running watermark (shared across trailing orders on that token) and rewrites `trigger_price_usd` as it moves in your favour, batched not per-tick; trailing orders pin `scaling_factor = 1`. History (single) adds `trailingBps`/`highWatermark`/`lowWatermark`. PATCH `trailingBps` to change trail distance; "Cannot set trigger price on trailing stop loss order", "Cannot convert to trailing stop loss order", "Trailing order would immediately trigger" are the update guards. Create-time errors: `"Trailing orders are not enabled"` (if flag off), `"Market price is unavailable for trailing order"`, `"exactly one of triggerPriceUsd or trailingBps must be set"`, range `>=50`/`<=9000`; a stablecoin `triggerMint` hits `"Trigger mint is not supported"` first (checkPriceTrigger runs before the trailing direction check). Live e2e verified buy-above USDC→SOL (order `019f5ef7-…`: `trailingBps=1000`, `lowWatermark=75.028`, `triggerPriceUsd=82.53` = 75.028×1.10, refunded); sell-below SOL→USDC passed validation but the deposit failed on low wallet SOL (0.008 SOL), not a trailing bug. **Live create response is `{id, txSignature, depositConfirmed}`** (docs previously showed only `{id, txSignature}`; create-order.mdx + OrderResponse spec updated). Source: `trigger-order` `api-v2/src/routes/v2/orders/price/{schema,validation,index}.ts` @ `origin/main` `aa6e00ee`. Script: `~/Dev/jup-workbench/trigger-tsl-e2e.ts`. Blog: developers.jup.ag/blog/lov2-trailing-stop.

## DCA v2 (live-verified 2026-06-26, mainnet lifecycle on `api.jup.ag/trigger/v2`)

- [2026-06-26] **DCA v2 is live, well-adopted via the jup.ag frontend, and now documented for integrators** (`trigger/dca.mdx`, PR pending). The earlier 2026-03-10 "intentionally excluded from docs" framing was wrong: integrator docs simply had not been written yet (confirmed by user 2026-06-26), it was never a deliberate gate. Full lifecycle ran end-to-end with a funded test wallet: auth(JWT) → `GET /vault` → `POST /deposit/craft` (`orderType:"dca"`) → sign → `POST /orders/dca` → `POST /orders/dca/cancel/{id}` → sign → `POST /orders/dca/confirm-cancel/{id}`. Deposit sig `4R18eTrkDvmZFPq87pznBPpVCpk1G2FQapWVks4ELLNYxAQZdwoDaxnnAHN2ZvBFrRvbnJSAPTnhutgj8ZzLFwgV`, withdrawal sig `3fjoTu8AaSkzxPshgGUviUdnNy6rKRiyyuxA1A87SyDX6Z2NjQfVBEw8NptQVEeYNircD6oaZuunB7dUYR62QXLt`. Source of behaviour: live API > `jup-ag/trigger-order` `api-v2/src/routes/v2/orders/dca/**`.
- [2026-06-26] **Trailing-slash 404 footgun:** `POST /trigger/v2/orders/dca` works; `POST /trigger/v2/orders/dca/` returns `404 Not Found` at the gateway. Same on `/orders/price` vs `/orders/price/`. The canonical reference client (`scripts/test-ui/dca/dca.html`) uses no trailing slash. A trailing slash on create looks identical to a gateway gap — confirm route reachability by comparing the no-slash variant (returns 400 validation) before concluding an endpoint is unexposed.
- [2026-06-26] **Per-order detail path requires the `dca` segment:** `GET /trigger/v2/orders/history/dca/{id}` returns the order; `GET /trigger/v2/orders/history/{id}` returns `404 {"error":"Order not found"}` for DCA orders. The LIST endpoint works at both `/orders/history` and `/orders/history/dca` (both 200), but only `/orders/history/dca` is DCA-scoped/documented.
- [2026-06-26] **Create response includes `txSignature`** (the on-chain deposit signature): live returns `{id, txSignature}`. The source repo's `docs/dca-api.md` documents `{id}` only — source-doc drift, live wins. Matches the public price-order docs which already document `{id, txSignature}`.
- [2026-06-26] **`POST /orders/dca` submits the deposit synchronously** — creating a DCA order moves funds immediately (the signed deposit lands on-chain during the call), it does not just register intent. Cancelling before any round fills refunds the full deposit (`refundAmount` = `inputAmountInitial`, `roundsRemaining` = `orderCount`).
- [2026-06-26] **Limits (prod):** min **currently $10 per round** (env-driven `max(MINIMUM_ORDER_AMOUNT_USD, floor)`; env=10 in `api-v2/wrangler.toml`, floor is currently a TEMP test constant, so it is not a permanent rule; 0.20 USD tolerance, validated against `inputAmount/orderCount`); `orderCount` **min 2, no max enforced on live** (source `main` has `max(100)`; see the no-upper-bound note below); `intervalSeconds` 60–31,536,000; `beginFillAt` ≤ 30 days out; max **10 active** DCA orders per wallet. `retryWindowSeconds = clamp(intervalSeconds*0.5, 30, 7200)` (observed 30 for interval 60).
- [2026-06-26] **`deposit/craft` for DCA:** `orderType:"dca"` with NO `orderSubType` (passing it → `400 "orderSubType must be omitted when orderType is 'dca'"`). Response has `inputTokenAccount` (deterministic NATA), no `outputTokenAccount` (that is OTOCO-only). `receiverAddress` = the vault pubkey.
- [2026-06-26] **Cost is not zero:** the deposit + withdrawal round-trip cost ~0.00208 SOL in fees/rent on the test wallet (USDC fully refunded, SOL slightly down). Worth noting for integrators expecting a free cancel.
- [2026-06-26] **`jlEnabled` (boolean) appears in the live order-detail response.** RESOLVED 2026-06-27: it is the Earn While You Wait (Jupiter Lend yield) opt-in, not a routing flag — now documented and in the public OpenAPI schema. See the 2026-06-27 entry below.
- [2026-06-26] **`inputAmountRemaining` is not zeroed after a cancelled withdrawal** — a cancelled order still reported `inputAmountRemaining: "20000000"` while `events` recorded the withdrawal. Treat `state`/`events`, not `inputAmountRemaining`, as the source of truth for whether funds were returned.
- [2026-06-26] **`price_conditional` verified live e2e** (second funded run): create + deposit `PPbp1QbbKDPjpHM3ScKyZBnCtLKKqmWwDeVj7USdBeEoNQsA1hkN35UQfrY2cQpyAB1pfVi9FdfciYdz7qUXBQA`, withdrawal `53CQkssz7oGmbUxp3W5tsjw8Vhpv8FKVXjfWb3ZyPW71gsAm4qHvK2FjEDKt9RNDVGesoNiMA7moGR1rKbzhEfqb`, USDC refunded in full. Order detail echoes `minPriceUsd`/`maxPriceUsd`/`triggerMint`; `retryWindowSeconds` = 7200 for `intervalSeconds` 86400 (confirms the upper clamp). Populated `GET /orders/history/dca` list verified (was only ever seen empty before).
- [2026-06-26] **`triggerMint` is REQUIRED for `price_conditional`** — contradicts the source repo's `docs/dca-api.md` claim that it "defaults to outputMint". Live: `price_conditional` without `triggerMint` → `400 {"orderType":"Price-conditional orders must have at least minPriceUsd or maxPriceUsd set","triggerMint":"Price-conditional orders must specify a triggerMint"}`. Public docs corrected to mark `triggerMint` required for price-conditional.
- [2026-06-26] Real DCA create validation errors (zod, body-level, fire before the deposit is consumed): `orderCount: 1` → `{"orderCount":"Too small: expected number to be >=2"}`; `time_based` + `minPriceUsd` → `{"orderType":"Time-based orders cannot set minPriceUsd or maxPriceUsd"}`. All under top-level `{"error":"Request validation failed","details":{...}}`.
- [2026-06-26] **Fill VERIFIED live e2e (third funded run).** A `time_based` order due now filled round 1 in ~3s: fill tx `HuNMpjFkTjVrCYMN6gTPWV9ay3GSxTxM7sZj4WNzjvzQoe4J5CR71MnTpuMKH9rtkDoDCTWu6rYRM12oR9cpbb4` (on-chain `err=null`), 10 USDC -> 137589159 lamports SOL. Confirmed: (1) **fill output is delivered straight to the taker wallet** (wallet SOL += outputAmount; the deposit only ever holds the unfilled remainder); (2) **the keeper pays the fill tx fee** (fill fee 1378618 lamports came off the keeper, taker only paid deposit+withdraw fees); (3) after a fill, `roundsFilled`/`fillPercent`/`outputAmountTotal`/`inputAmountUsed` update and `nextFillAt` advances by `intervalSeconds`; (4) `fill` event shape: `{type:"fill", roundNumber, inputAmount, outputAmount, txSignature, state:"success"}`; (5) `retryWindowSeconds` = 1800 for `intervalSeconds` 3600 (mid-range clamp confirmed). Cancelling after round 1 refunded only the remaining round (`refundAmount` 10000000, `roundsRemaining` 1). All DCA-doc response examples are now real captured responses, including the filled detail.

### Edge cases (live-verified 2026-06-26, ~60 cases)

- **`orderCount` has NO upper bound on the deployed API.** `orderCount` of 100/101/1,000/100,000/1,000,000 all passed zod and failed only the per-round `$10` min ("Each order must be at least 10 USD"), never a "Too big". The pr-461 source has `.max(100)` but the deployed worker does not enforce it. Only `min(2)` is a zod rule. Effective max = floor(total input USD / 10). **Docs corrected** from the wrong "2–100".
- **`triggerMint` must be a supported price mint, not just input-or-output.** The zod refinement accepts inputMint or outputMint, but the server then rejects an unsupported price leg: `triggerMint = inputMint` (USDC) → `400 "Trigger mint is not supported"`. Use the volatile leg (outputMint). Source's "defaults to outputMint" is wrong (it is required) AND the input leg is not accepted in practice.
- **DCA orders are NOT editable.** `PATCH /orders/dca/{id}` → `404` (no update endpoint; price orders have one). Change = cancel + recreate.
- **API key not enforced when a valid JWT is present:** `GET /vault` with NO `x-api-key` but a valid Bearer → `200`. Same gateway behavior as Prediction. Keep "API key required" in docs (gateway-side, can change).
- **`GET /vault/register` when a vault exists → `409`** with the existing vault in the body (resolves the long-standing 200-vs-201 open question: it's 409).
- **Dust:** `inputAmount 20000001`, `orderCount 2` → `amountPerRound: "10000000"` (floored); the extra unit is added to the last round, not reflected in `amountPerRound`.
- **`price_conditional` gate verified both directions:** out-of-band (`maxPriceUsd` 10 vs ~$73 market) stayed `active`/`roundsFilled 0` with no fill for 84s; in-band (`maxPriceUsd` 100000) filled in ~20s and delivered output to the wallet, identical to `time_based`.
- **Auth errors:** invalid signature → `400 "Challenge not found"` (not 401); missing/bad JWT → `401`; `userPubkey` ≠ JWT sub → `403 "Forbidden: userPubkey must match authenticated user"`.
- **Cancel state machine:** confirm with wrong `cancelRequestId` → `400 "Withdrawal transaction not found in cache"`; garbage tx → `400 "Invalid transaction format"`; a different valid signed tx → `400 "Invalid withdrawal transaction: Transaction signers modified"`; re-`cancel` while `withdrawing` → `200` (idempotent re-craft); cancel a cancelled order → `400 "Cannot cancel DCA order in 'cancelled' state"`; confirm a cancelled order → `400 "DCA order not in cancellation state"`.
- **Below-min create is rejected before any funds move** (USDC balance byte-identical across the 400).
- [2026-06-26] **Max-active cap VERIFIED live** (wallet topped up to >$200, rebalanced to USDC via Ultra): created 10 concurrent USDC→SOL orders (all `active`), and the 11th create returned `400 "Maximum of 10 active DCA orders allowed per user"`. Cancelling all 10 returned the active count to 0 and refunded the full $200. The cap is exactly 10, counting states `depositing|active|executing|withdrawing`.
- [2026-06-26] **Native-SOL-input DCA VERIFIED live** (SOL→USDC): the deposit accepts native SOL and wraps it into a deterministic token account (`inputTokenAccount` returned, same shape as SPL input); `amountPerRound` is in lamports (0.14 SOL/round for a 0.28 SOL, 2-round order); the full deposit is recovered on cancel (net −0.00008 SOL = fees only). Native SOL works as the input mint, not just SPL tokens.
- [2026-06-27] **DCA fills execute through Ultra (keeper source).** `keeper/internal/app/pkg/dcaexecutor/dcaexecutor.go` `prepareSwap` builds each round via `ultra.GenerateSwapTx` with `MinimumOutputAmount: ""`, `AutoSettle: true`, `Taker = vaultPubkey`, `Payer = gasPayer`, `User = userPubkey`, then `submitSwap` → `ultra.ExecuteTx` (Privy). Consequences for docs: (1) **slippage is Ultra/RTSE-managed per round, with no integrator slippage param anywhere in the DCA API** (grep of `orders/dca/**` + keeper = no create-side slippage); (2) **each round pays the standard Jupiter swap fee** (`feeBps := swapResp.FeeBps`; `fee = vol/10000 * FeeBps`), there is no separate DCA/integrator fee, and the fee is not surfaced in the public history response; (3) output `AutoSettle`s straight to the user wallet (confirms the live observation); (4) the keeper's `gasPayer` pays network/priority fees. Documented in `trigger/dca.mdx` "Fees and slippage".
- [2026-06-27] **Failed fills:** the executor has `handleFailedFill` + `recoverStuckOrder`; `ExecutionError.Retryable` drives retry within the round's retry window, then reschedule to the next interval. The `failed`/`rescheduled` `DcaEvent.state` values are from source/schema; an actual failed fill was NOT observed live (only successful fills and price-conditional out-of-band no-fills). Still a candidate for live verification.
- [2026-06-27] **⚠️ UNRELEASED — DO NOT PUBLISH.** Earn While You Wait is live on the API and verified e2e, but it is **not publicly released**: LO/DCA Linear project **LODCA-133 is still In Progress** (state "started", owner Evan Chng; backend PR #516 merged 2026-06-24, ~3 days before this note). All public docs for it are **commented out** in `trigger/dca.mdx` (`{/* */}`) and `openapi-spec/trigger/v2/trigger.yaml` (`#`). Uncomment ONLY when the DCA team confirms launch. (Caught because the user searched the org and questioned the release status.)
- [2026-06-27] **`jlEnabled` RESOLVED + verified live e2e: it is the "Earn While You Wait" opt-in** — idle stablecoin earns Jupiter Lend yield between rounds. (My earlier "not in the repo" note was wrong; see the stale-clone note below.) Rules, all verified live: `jlEnabled:true` requires `orderType: time_based` (price_conditional → `400`), a **stablecoin input** (SOL → `400 "jlEnabled is not supported for this input mint"`), and a **JL deposit craft carrying `jlMint`** (a normal deposit → `400 "JL orders require the JL deposit craft. Please re-craft the deposit with jlMint."`). `jlMint` = the Jupiter Lend earn token whose `assetAddress` is the input mint, from `GET /lend/v1/earn/tokens` (USDC → `9BEcn9aPEmhSPbPQeFGjidRiEKki46fVQDyPpSQXPA2D` jlUSDC; wrong value → `400 "jlMint does not match the JL token for this input mint"`). The JL craft response returns `jlTokenAccount` (the Lend position) instead of `inputTokenAccount`. Full lifecycle ran (order `019f0592-966e-736b-aedd-80fa56e2e399`); the public detail surfaces only `jlEnabled` (not jlMint/jlYieldAccrued); cancel unwound cleanly (USDC delta −0.000003 = fees). Documented in `trigger/dca.mdx` "Earn While You Wait".
- [2026-06-27] **The local `trigger-order` clone (branch `pr-461`) is STALE vs the deployed API + org default branch.** Two divergences proven live: the entire `jlEnabled`/Earn-While-You-Wait feature is absent from pr-461 but live; `orderCount.max(100)` exists in pr-461 but is not enforced live. **Always source-cite against the org default branch (or the live API), not this local checkout.** (The org-wide GitHub search the user ran found `jlEnabled` across 11 files; my local grep found none.)
- [2026-06-29] **Re-verified on live before merge (PR #921 review by YY):** `orderCount` has no max (101/500 fail only on the per-round min), `triggerMint` is required for `price_conditional` (`400 "Price-conditional orders must specify a triggerMint"`), and the min per round is still 10 ($5/round rejected). All three hold on the deployed API even though current `trigger-order` `main` enforces `orderCount.max(100)` and treats `triggerMint` as optional (defaulting to `outputMint`). Live is ahead of `main` on these; docs follow live. The $10 min is env-driven (see the Limits note above), so documented as "currently 10 USD".

## Source Code

- [2026-03-10] V2 API source: `Documents/Projects/trigger-order/api-v2/` — Hono.js on Cloudflare Workers with Zod OpenAPI validation.
- [2026-03-10] Vault register returns 200 on success, 409 if vault already exists (not 201 despite the source returning 200 — user confirmed 201 is the intended documented behaviour).
- [2026-03-10] DCA order routes exist in source (`/orders/dca/`) but are intentionally excluded from docs.
- [2026-03-10] Vault link routes (`/vault/link`) exist but are hidden/internal.

## Open Questions

- [2026-03-10] Vault register: source returns 200 but docs say 201. Which is correct?
- [2026-03-10] Are `/vault/link` endpoints needed in public docs?
- [2026-06-26] ~~DCA order detail returns `jlEnabled` — what does it control?~~ RESOLVED 2026-06-27: it is the Earn While You Wait (Jupiter Lend yield) opt-in, settable on create, now documented.

---

# Jupiter Lend (Fluid Protocol)

## Architecture

- [2026-03-12] Three on-chain programs: Liquidity Layer (reserves, interest-rate curves), Lending/Earn (jlToken deposits/withdrawals), Vaults/Borrow (position NFTs, collateral, debt). All interactions go through `operate` instructions with operation-specific payloads.
- [2026-03-12] Oracle support: Pyth, SwitchboardV2, and ScopePrices. Oracle type is per-reserve, not per-market.
- [2026-03-12] CPI pattern: advanced recipes (multiply, unwind, vault swap) use cross-program invocation to Jupiter swap within a single transaction. Requires `jupIxToTransactionInstruction` helper to convert Jupiter API response into CPI-compatible instructions, plus `getAddressLookupTableAccounts` for ALTs.

## SDK vs API

- [2026-03-12] Two integration paths: Lend SDK (`@jup-ag/lend-sdk`) for TypeScript with helper functions, and REST API for language-agnostic access. SDK wraps the same on-chain programs but provides typed helpers like `getDepositIxs`, `getWithdrawIxs`, `getBorrowIxs`.
- [2026-03-12] SDK deposit/withdraw functions use named parameters (`{ connection, signer, asset, amount }`), not positional args. This was a common source of errors in early examples.

## Terminology

- [2026-03-12] "Earn" = supply/deposit side (get jlTokens). "Borrow" = vault/debt side (position NFTs). Never use "Supply" or "Lending" as section names, use "Earn" and "Borrow" to match the product UI.
- [2026-03-12] jlTokens are yield-bearing receipt tokens for deposits (similar to cTokens in Compound). Exchange rate increases over time as interest accrues.
- [2026-03-12] Position NFTs represent borrow positions. Each position is uniquely identified by an NFT mint.

## Known Issues

## Open Questions

## Content Gaps

## Patterns & Conventions

- [2026-03-12] All Lend SDK code examples use the same boilerplate: load keypair from file, initialise Connection, define mint constants. Consistent across all pages for copy-paste reliability.
- [2026-03-12] Import Private Key accordion uses base58 decode pattern (`bs58.decode(privateKey)` with `Keypair.fromSecretKey`), not file-read. This matches how browser wallets export keys.

---

# Swap API V2 — Squads Multisig

## Architecture

- [2026-04-06] Two endpoints for Squads V5 multisig swaps: `GET /swap/v2/squads/v5/order` and `POST /swap/v2/squads/v5/execute`. The API wraps swap instructions in Squads `executeTransactionSyncV2` CPI server-side.
- [2026-04-06] Only Metis routing is supported for multisig swaps. RFQ is not supported because wrapping breaks exact transaction bytes required by RFQ.
- [2026-04-06] `signers` is a param on `/order` only, not `/execute`. The execute endpoint validates against the cached transaction from `/order`.
- [2026-04-06] `excludeRouters` is NOT a param on the squads `/order` endpoint (unlike the regular `/order`). Router restriction is handled server-side.
- [2026-04-06] First signer in the `signers` param becomes the fee payer. Signer order matters.
- [2026-04-06] The vault PDA signs via CPI through the Squads program, never as a transaction-level signer.
- [2026-04-09] The Squads settings param is `settingsPda` (with an 's'), not `settingPda`. Corrected across docs and code examples in DEVREL-166.

## Source of Truth

- [2026-04-06] Canonical endpoint docs: `github.com/jup-ag/squads-integration-ultra-test/blob/main/app/squads-endpoint-docs.md`
- [2026-04-06] API source code: `github.com/jup-ag/ultra-api/tree/main/src/routes/squads`

---

# Swap API V2 — Transaction Submission

## Architecture

- [2026-04-06] `POST api.jup.ag/tx/v1/submit` accepts any signed Solana transaction with a SOL tip (min 1M lamports / 0.001 SOL) to one of 16 Jupiter V6 program authorities.
- [2026-04-06] `/submit` is for `/build` transactions and non-Jupiter transactions. `/execute` is exclusively for `/order` (meta-aggregator flow) transactions. Different fee models: tips vs swap fees.
- [2026-04-07] `/submit` is now public. API path is `api.jup.ag/tx/v1/submit` (deliberately outside the `/swap/v2/` namespace since it accepts any transaction). Docs page at `/transaction/submit`.
- [2026-04-06] `/build` supports a `tipAmount` param that auto-includes the tip instruction in the response. For non-Jupiter transactions, integrators add a standard SOL transfer instruction manually.
- [2026-04-07] Jupiter operates one of the highest-staked validators on Solana. `/submit` opens this landing pipeline to integrators. Key selling points: validator stake, MEV protection (no intermediaries), sub-second landing, zero credit cost.
- [2026-04-07] Recommended integration pattern: run `/submit` in parallel with existing RPC submission for zero-risk comparison. Whichever lands first wins.
- [2026-04-16] `/submit` costs zero API credits on all plans (free, Developer, Launch, Pro) and works with keyless access. The only cost is the SOL tip in the transaction.

---

# Swap API V2 — RTSE (Real-Time Slippage Estimator)

## Architecture

- [2026-04-07] RTSE is applied at **order time** (when `/order` or `/build` is called), not at execution time. The estimated slippage is baked into the transaction.
- [2026-04-07] RTSE uses: heuristics (token categories, historical/real-time slippage data), algorithms (EMA on slippage data), and real-time failure rate monitoring.
- [2026-04-07] On `/order`, RTSE is automatic (no param needed). Passing `slippageBps` overrides RTSE with a fixed value. Live forced-JupiterZ tests on 2026-06-23 showed `slippageBps` does not disable JupiterZ by itself.
- [2026-04-07] On `/build`, RTSE is opt-in via `slippageBps=rtse` (literal string). Default is 50 bps fixed.
- [2026-04-07] Do not use "dynamic slippage" or "auto slippage" as naming conventions. The canonical name is RTSE (Real-Time Slippage Estimator).
