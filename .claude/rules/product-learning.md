# Product Learnings

Single source of truth for product-specific knowledge that isn't (or shouldn't be)
in the docs themselves. This file accumulates institutional knowledge that prevents
Claude from writing incorrect content or making wrong assumptions.

**When to add an entry:** You discovered something non-obvious about a product —
through debugging, user feedback, reading source code, Discord, or trial and error —
and a future session would benefit from knowing it.

**Format:** Every entry is a dated bullet under the appropriate heading.
Keep entries concise — one line if possible, a short paragraph if needed.
Cite the source on a learning where known (e.g. `Source: <repo>/<path>` or the live endpoint),
so a future session can re-verify it.

**Sources convention:** A product section may open with a `## Sources` subsection naming where
ground truth lives for that product: the live API host, the OpenAPI spec path in this repo, the
source-code repo(s), the SDK package, and the first-party FE/backend. The `document-from-source`
skill reads this to know what to verify against (authority order: live API + on-chain result >
source code > SDK/FE > docs). Keep it current as a side effect of documenting the product.

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

- [2026-06-29] `/execute` amount fields have two perspectives. `totalInputAmount` and `totalOutputAmount` are wallet-level amounts, while `inputAmountResult` and `outputAmountResult` are swap-route amounts. `feeMint` determines where the fee is reflected: if `feeMint == inputMint`, fee collected in the input mint = `totalInputAmount - inputAmountResult`; if `feeMint == outputMint`, fee collected in the output mint = `outputAmountResult - totalOutputAmount`. Verified live with SOL->USDC and USDC->SOL Swap API V2 executions.
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

# Mintlify Platform

## Facts

- [2026-07-08] Mintlify's compiled CSS is Tailwind v4 and puts utilities inside native cascade layers (`@layer utilities`). The banner (`div#banner`) forces its text colour with important utilities (`[&_*]:text-white/95!` → `color:#fffffff2!important` in `@layer utilities`) and sets `bg-primary-dark` (from `docs.json` `colors.dark`). Consequence for `style.css`: **layered `!important` beats unlayered `!important` regardless of specificity**, so unlayered custom overrides like `#banner * { color: black !important }` silently lose to Mintlify's layered important utilities, while unlayered important still beats their *normal* declarations (e.g. background). This produced the white-on-yellow banner fixed in DEV-723 (resolved by dropping the custom banner colours). If a custom override must beat a layered important utility, wrap it in `@layer utilities { ... }` so specificity applies again (an ID selector then outranks their class utilities). Verified against the deployed chunk `/docs/_next/static/chunks/f80c22dc4fd41578.css`.
- [2026-07-08] `mint dev` local preview renders the banner and injects custom CSS client-side only, so curl/static inspection of the local HTML cannot verify banner styling; inspect the production/preview deployment HTML instead (prod inlines `style.css` as `<style data-custom-css-path="style.css">` and server-renders `div#banner`).

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

# Jupiter Forecast (BisonFi provider)

Jupiter Forecast is a new in-house primitive: native Solana binary prediction markets, currently 15-minute BTC up/down. All facts below were verified live on 2026-06-29 with two real mainnet trades (buy `4USH17JArjQP5rCFqnEcLND38bwWN9XCe2CMPRpqReRnLBNX8mzQJLgPYT7ZfBvSnXa2ED1JGU7F2b5mytLkW81o`, close `3FzTLzmLNFsSDpjDaUkmuhuTkrrUxrFwNs6gtDTMxmnYyNrCM3n7wfR3dCFDXZFyRdAMQfxSTpvN7QAyd2kdjzPM`), then cross-checked against source on 2026-07-02. E2E scripts: `~/Dev/jup-workbench/forecast-e2e.cjs` + `forecast-close.cjs`.

## Sources

- **Live API:** `api.jup.ag/prediction/v1` — Forecast surfaces via `provider=bisonfi`.
- **Source code:** `github.com/jup-ag/prediction-market` — the public API is `app/src` (execute route `app/src/api/execute/`, Forecast builds `app/src/services/BisonfiTradeService.ts`, order dispatch + size limits `app/src/services/OrderCreateService.ts`, positions `app/src/services/BisonfiPositionService.ts`, lifecycle `app/src/services/bisonfi-lifecycle.ts`). On-chain indexing lives in `tracker/src/bisonfi/`.
- **OpenAPI spec (this repo):** `openapi-spec/prediction/prediction.yaml`.
- **Integration gist:** julianfssen gist (0738f0a2546afb1110e0319b763bc29b) — useful walkthrough but drifts from source (stated a 100 USDC max; source enforces 250).

## Architecture

- [2026-06-29] Forecast markets are surfaced under the existing Prediction API with `provider=bisonfi`. Discovery: `GET /prediction/v1/events?provider=bisonfi&category=crypto&tag=15m&includeMarkets=true`. Each event = one 15m BTC round and holds two markets: `BISON-<marketPda>-UP` and `BISON-<marketPda>-DOWN`. UP resolves win if BTC close >= open (Chainlink BTC/USD data stream). Markets are tradable only during their live `openTime..closeTime` window. ~~Outside it, build returns `no_route`~~ — [2026-07-02] corrected from source: a closed round is rejected pre-routing with `bisonfi_market_not_tradable`; `no_route` means the underlying Jupiter routing call failed (which is what an out-of-window build produced empirically on 2026-06-29). Dust sells that fail routing below 10_000 micro (0.01 token) return `bisonfi_position_too_small`. `/orderbook` outside a window returns `orderbook_bad_status`.
- [2026-06-29] Forecast market objects carry fields NOT in the current Prediction OpenAPI `Market` schema: `outcomeMint` (the outcome token, Token-2022 program `TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb`), `outcomeTokenProgram`, `marketPda`, `outcomeSide` (`up`/`down`), `sideLabel`, `lifecycleStatus`, `tradable`. The `/events` `provider` enum in the spec only listed `kalshi|polymarket` and the param was documented as `tags`, but live `provider=bisonfi` + `tag=15m` both work (source has both `tag` single and `tags` comma-separated). Spec fixed in PR #927.
- [2026-06-29] On-chain (verified via getAccountInfo): issuer program `2sVcg2dBSUzXkmdZ8M5cp1LbnzDrWJmr6hktkHwB8nY3` (executable), config PDA `8LczfBkVZJhGnTYH8nQke2YC3b83GFZ8qZtfuMRe6AN6` and each `marketPda` are owned by the issuer program. Settlement/deposit mint is USDC. BTC Chainlink feed id `0x00039d9e45394f473ab1f050a1b963e6b05351e52d71e507509ada0c95ed75b8`.

## Execute model (`/execute` is general, but Forecast behaves differently)

- [2026-07-01] **Correction to an earlier assumption: `/execute` and the `execution` object are NOT Forecast-only.** Live builds show every prediction order build returns `execution {endpoint:"/api/v1/execute", context:{...}}` + `transaction` + `txMeta`. Verified with polymarket (`POLY-558936`): `execution.context = {type:"create_order"}`, `executionModel:null`, `settlement:null`, `jupiterSwapRequestId:null`, and a non-null `order.orderPubkey`. So `/execute` is a general Prediction endpoint. Do NOT claim in docs that Forecast "uses an execute endpoint unlike other prediction markets" — unverified/false. What IS Forecast-specific: `context.type:"bisonfi_swap"`, `executionModel:"atomic_swap"`, `settlement:"auto"`, non-null `jupiterSwapRequestId`, and `order.orderPubkey:null`.
- [2026-06-29] Forecast (bisonfi) buy: `POST /prediction/v1/orders` returns `execution {endpoint:"/api/v1/execute", context:{type:"bisonfi_swap", jupiterSwapRequestId, ownerPubkey}}`, `executionModel:"atomic_swap"`, `settlement:"auto"`, `jupiterSwapRequestId`, plus `transaction`+`txMeta`. Flow: sign `transaction`, then `POST https://api.jup.ag/prediction/v1/execute` with body `{signedTransaction, context: build.execution.context}` → `{status:"Success", signature, error}`. The `execution.endpoint` value `/api/v1/execute` resolves to `https://api.jup.ag/prediction/v1/execute` (verified 200; the gist's `predictionUrl()` helper was undefined). `/execute` errors return the standard `ErrorResponse` envelope (400): missing/non-string `signedTransaction` → `code:"invalid_type"`; missing `context` or bad tx → `code:"execute_failed"`.
- [2026-06-29] Because Forecast is `atomic_swap`, `order.orderPubkey` is `null` and there is NO keeper order — `GET /orders/status/{orderPubkey}` returns `order_history_not_found`. The position appears immediately in `GET /positions?ownerPubkey=` after execute (keyed by `positionPubkey` from the build). Do not document the order-status polling step for Forecast (it applies to keeper-filled orders like polymarket, which have a non-null orderPubkey).
- [2026-07-01] Added to the Prediction OpenAPI spec (PR #927): `/execute` path (`ExecuteRequest`/`ExecuteResponse`/`Execution` schemas), `execution`/`executionModel`/`settlement`/`jupiterSwapRequestId` on `CreateOrderResponse`, `outcomeMint`/`outcomeTokenProgram`/`marketPda`/`outcomeSide`/`tradable`/`lifecycleStatus` on `Market`, and `bisonfi` in the `/events` (+search, +suggested) `provider` enum. `bisonfi` verified accepted on all three provider endpoints. Per source, `ExecuteRequest.context` is optional (Forecast can alternatively pass top-level `jupiterSwapRequestId` + `ownerPubkey`), `requestId` is an optional echo, and `status` is the enum `Success | Failed`.
- [2026-07-02] `isYes` is vestigial for Forecast: the per-side market ID already selects UP/DOWN, the build ignores the flag, and the response hardcodes `isYes: true` (source: `BisonfiTradeService.buildResult`). Docs example passes `isYes: true` with a comment saying so.
- [2026-06-29] Close/sell uses the same model: `DELETE /prediction/v1/positions/{positionPubkey}` body `{ownerPubkey}` returns the same `execution`/`executionModel:atomic_swap`/`settlement:auto` shape; sign + POST to `/prediction/v1/execute` with `context: close.execution.context`. Verified 200 on-chain.
- [2026-06-29] Under the hood the Prediction-API Forecast buy IS a Jupiter swap (context.type `bisonfi_swap`, carries a `jupiterSwapRequestId`). That is why the Swap API path works directly against `outcomeMint`.

## Swap API path

- [2026-06-29] Forecast outcome tokens trade directly via Swap API: `GET /swap/v2/order?inputMint=USDC&outputMint=<market.outcomeMint>&amount=&taker=&slippageBps=10000` routes (verified `router: metis`, returns `transaction`+`requestId`); execute with the standard `POST /swap/v2/execute {signedTransaction, requestId}`. The gist frames this as the path for integrators managing their own ledgers/position tracking (NOT "lower latency" — the gist makes no latency claim). Outcome prices move fast near expiry, hence the 10000 bps slippage recommendation.

## Constraints (tested)

- [2026-06-29] Minimum order is 5 USDC: `depositAmount` < 5000000 → `{code:"min...",message:"Minimum order is $5"}` (validated pre-routing). USDC-only: non-USDC `depositMint` → `{code:"bisonfi_usdc_only", message:"Forecast orders can only use USDC"}` (validated pre-routing).
- [2026-06-29] **Gist's "Maximum buy: 100 USDC" was NOT reproduced.** During a live window, `POST /orders` built fine for 100, 100.000001, 150, and 200 USDC with no max error. [2026-07-02] RESOLVED from source: **the cap is 250 USDC** (`BISONFI_MAX_DEPOSIT_MICRO_USDC = 250_000_000` in `OrderCreateService`, error `"Maximum order is $250"`), enforced app-side at build on the Prediction API path only — "there is no on-chain limit on the Jupiter swap" per the source comment, so the direct Swap API path has no cap. The 200 USDC test passed because it was under 250; the gist's 100 is stale.
- [2026-07-02] Limit orders are rejected for Forecast markets (`OrderCreateService` throws unsupported-provider on `orderType: "limit"` when the provider is bisonfi). Market orders only.

## Open Questions

- ~~[2026-06-29] Is there a max order size?~~ RESOLVED 2026-07-02: 250 USDC, app-side at build, Prediction API path only (see Constraints).
- ~~[2026-06-29] Do winning Forecast positions auto-settle or require `POST /positions/{pubkey}/claim`?~~ RESOLVED 2026-07-02 from source: **no manual claim.** `BisonfiPositionService` hardcodes `claimable: false` ("observe-only settlement; no claim action in this app") and `claimMethod: "automatic"`; the issuer auto-settles via Token-2022 permanent delegate and v1 indexes only auto-settle markets (`shared/db/src/schemas/bisonfi-details.ts`). Never document a claim step for Forecast.
- ~~[2026-06-29] Confirm the real round cadence (continuous 15m rotation vs scheduled).~~ RESOLVED 2026-07-02: rounds are created by the issuer program and merely indexed by the tracker (`tracker/src/bisonfi/index-events.ts` polls on-chain every ~4s), so the API cannot promise a cadence — sparse windows (13:45–14:00 then ~18:00) are expected. Docs say "scheduled by the issuer, poll `/events`".
- [2026-07-02] Source has more breadth wired than what is live/documented: a hidden `GET /events/crypto/timed` route with `subcategory` enum `btc|eth|xrp|sol|hype|doge|bnb` and `tags` enum `5m|15m` (`app/src/api/events/schema.ts`). Only BTC 15m observed live so far; revisit the Forecast page when other assets/intervals launch.

---

# Trigger Order API

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

## Source Code

- [2026-03-10] V2 API source: `Documents/Projects/trigger-order/api-v2/` — Hono.js on Cloudflare Workers with Zod OpenAPI validation.
- [2026-03-10] Vault register returns 200 on success, 409 if vault already exists (not 201 despite the source returning 200 — user confirmed 201 is the intended documented behaviour).
- [2026-03-10] DCA order routes exist in source (`/orders/dca/`) but are intentionally excluded from docs.
- [2026-03-10] Vault link routes (`/vault/link`) exist but are hidden/internal.

## Open Questions

- [2026-03-10] Vault register: source returns 200 but docs say 201. Which is correct?
- [2026-03-10] Are `/vault/link` endpoints needed in public docs?

---

# Jupiter Lend (Fluid Protocol)

## Sources

- **Live API:** `api.jup.ag/lend/v1` (earn + borrow). Borrow read endpoints returned data without `x-api-key` during DEV-461 testing; confirm before relying on keyless.
- **OpenAPI spec:** `openapi-spec/lend/lend.yaml` — drifts from live in places (e.g. `InstructionResponse` shape); live wins.
- **SDK:** `@jup-ag/lend` (build) and `@jup-ag/lend-read` (read). Mainnet-only; amounts are `BN`; subpath exports (`/api`, `/earn`, `/borrow`, `/flashloan`). SDK does not create ATAs (REST does).
- **First-party FE:** `TeamRaccoons/monorepo` → `apps/jupiter-ui/src/components/Borrowing`. Builds instructions with the SDK and reads vault/position data from Fluid's backend, not the public REST API.
- **Backend:** `api.solana.fluid.io/v1` (`borrowing/vaults`, `borrowing/users/{addr}/nfts`) — what the FE actually reads from. The public REST surface is not dogfooded by the FE.

## Architecture

- [2026-03-12] Three on-chain programs: Liquidity Layer (reserves, interest-rate curves), Lending/Earn (jlToken deposits/withdrawals), Vaults/Borrow (position NFTs, collateral, debt). All interactions go through `operate` instructions with operation-specific payloads.
- [2026-03-12] Oracle support: Pyth, SwitchboardV2, and ScopePrices. Oracle type is per-reserve, not per-market.
- [2026-03-12] CPI pattern: advanced recipes (multiply, unwind, vault swap) use cross-program invocation to Jupiter swap within a single transaction. Requires `jupIxToTransactionInstruction` helper to convert Jupiter API response into CPI-compatible instructions, plus `getAddressLookupTableAccounts` for ALTs.

## SDK vs API

- [2026-03-12] Two integration paths: Lend SDK (`@jup-ag/lend-sdk`) for TypeScript with helper functions, and REST API for language-agnostic access. SDK wraps the same on-chain programs but provides typed helpers like `getDepositIxs`, `getWithdrawIxs`, `getBorrowIxs`.
- [2026-03-12] SDK deposit/withdraw functions use named parameters (`{ connection, signer, asset, amount }`), not positional args. This was a common source of errors in early examples.

## Borrow REST API (verified live 2026-06-23, DEV-461)

- [2026-06-23] Four routes on `https://api.jup.ag/lend/v1/borrow/*` (no lite-api per decision): `GET /vaults`, `GET /positions?users=a,b` (comma-separated), `POST /operate`, `POST /operate-instructions`. All returned data keyless in testing, but the OpenAPI spec keeps `ApiKeyAuth` to match Earn; docs show the `x-api-key` header.
- [2026-06-23] `OperatePayload` = `{ vaultId:number, positionId:number, positionOwner?:string, signer:string, colAmount:string, debtAmount:string }`. Single universal endpoint. Signed amounts: `colAmount` >0 deposit / <0 withdraw; `debtAmount` >0 borrow / <0 repay; `0` = no change. `positionId:0` creates a new position NFT.
- [2026-06-23] Response shapes differ from Earn: `/operate` → `{ nftId, transaction }` (Earn returns only `transaction`). `/operate-instructions` → `{ nftId, instructions[], addressLookupTableAddresses[] }` — an ARRAY of instructions PLUS ALT addresses (Earn `*-instructions` returns a single instruction object, no ALTs). So borrow code must resolve ALTs and build a `VersionedTransaction`.
- [2026-06-23] **Repay-all / withdraw-all sentinel = `MIN_I128` = `-170141183460469231731687303715884105728`** (string). This is `MAX_REPAY_AMOUNT` / `MAX_WITHDRAW_AMOUNT` in `@jup-ag/lend/borrow` (`= MIN_I128`). Verified: repaying the exact displayed `borrow` leaves interest dust (`dustBorrow`) below `minimumBorrowing` and fails with `VaultUserDebtTooLow` (error 6025 / 0x1789). Use the sentinel to fully clear debt before closing.
- [2026-06-23] **WSOL-collateral vaults (vault 1, `supplyToken=So111…112`) do NOT auto-wrap native SOL.** The operate tx assumes the user already holds wrapped SOL; depositing without it fails with token-program `insufficient funds` (0x1). Integrators must wrap SOL into the WSOL ATA first.
- [2026-06-23] Vault risk fields scale: `collateralFactor`/`liquidationThreshold`/`liquidationMaxLimit` map to LTV % (e.g. 800/850/900 = 80/85/90%; JLP vault 850/900/950 = 85/90/95%, matching the "up to 95% LTV" claim). `supplyRate`/`borrowRate` in basis points (487 = 4.87%). `minimumBorrowing`, `borrowable`, `withdrawable` in token base units. Exact oracle/exchange-price scaling documented in `lend/borrow/read-vault-data`.
- [2026-06-23] Full e2e trace (mainnet, gpl wallet): wrap → `/operate` create+deposit (position 9062) → `/operate-instructions` borrow → `/operate` repay-all (MIN_I128) → `/operate` withdraw-all (MIN_I128), position closed. New-position `/operate` deposit tx = 3 ixs (ComputeBudget + 2× vaults program: PreOperate/init + operate) with 1 ALT.
- [2026-06-24] **REST `/operate` auto-creates the borrow-token (output) ATA** (verified by closing gpl's USDC ATA, then borrowing 1.05 USDC — it succeeded and the USDC ATA was recreated with the borrowed funds). The ATA is created via CPI *inside* the vaults program (the operate ix itself), NOT as a separate Associated-Token-Account-program instruction (`/operate-instructions` returned a single operate ix, no ATA ix). So REST integrators do NOT add a create-ATA instruction. This is the OPPOSITE of the SDK path: the FE monorepo (`useDepositAndBorrowMutation`/`useRepayAndWithdrawMutation`) adds `getOrCreateATAInstruction` for both supply and borrow mints itself, because `getOperateIx` does not.
- [2026-06-24] **REST API does not wrap/unwrap native SOL** (both directions verified): WSOL-collateral deposit fails without pre-wrapped SOL (token-program 0x1), and withdrawing WSOL collateral returns *wrapped* SOL to the WSOL ATA (it stays wrapped, caller must close to get native). The FE handles wrap/unwrap only because it uses the SDK path; for deposit it wraps, for native borrow/withdraw it appends a close-WSOL ix, for native repay it wraps the repay amount (+100 lamports buffer on full repay).
- [2026-06-25] Official borrow OpenAPI received from YY (`jup-lend-borrow.json`) and plugged in as `openapi-spec/lend/borrow.yaml` (its own spec file, NOT merged into `lend.yaml` — the official `LiquiditySupplyData`/`Token` schemas would collide with Earn's). Normalized on import: server changed from `lite-api.jup.ag/lend` to `api.jup.ag/lend/v1` (no lite-api per decision), `/v1/borrow/*` path prefix stripped, `ApiKeyAuth` added to match Earn, and the broken `operate-instructions` example (`addressLookupTableAddresses` was a float, programId was the lending program) fixed to real values. The 4 `api-reference/lend/borrow/*` pages point at `borrow.yaml`.
- [2026-06-25] **Borrow endpoints accept an optional `market` param: `main` (default) or `ethena`** (query on reads, body on operate). Verified live on api.jup.ag: `market=main` → 78 vaults, `market=ethena` → 3 vaults, no param → 78, `market=bogus` → 400. `GET /borrow/vaults` also accepts an optional `rpcUrl` query param to resolve on-chain vault state via a custom RPC.
- [2026-06-24] **FE monorepo (`TeamRaccoons/monorepo`, `apps/jupiter-ui/src/components/Borrowing`) does NOT use the public REST borrow endpoints.** It builds instructions with the SDK `getOperateIx` and reads vault/position data from Fluid's backend (`https://api.solana.fluid.io/v1`, paths `borrowing/vaults`, `borrowing/users/{addr}/nfts`), not `api.jup.ag/lend/v1/borrow/*`. It also gates sends behind an address-registration check (`datapi.jup.ag/v1/lend/register`) — a FE/ToS gate, NOT an on-chain requirement (the mainnet e2e succeeded with an unregistered wallet). The FE corroborates operate semantics (signed amounts, `positionId:0`=new, `positionOwner`, MIN_I128 = `MAX_REPAY_AMOUNT`/`MAX_WITHDRAW_AMOUNT` for repay/withdraw-all) but is not a reference for the public REST surface.

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
- [2026-07-09] Transaction submission is now primarily a Solana JSON-RPC endpoint at `https://tx.jup.ag` (Beam v2), not the REST `POST api.jup.ag/tx/v1/submit` (which still works). Integrators point any Solana client at `sendTransaction` and authenticate with the `x-api-key` header. Per Kyle (2026-07-09) an API key WILL be required, but it is NOT enforced yet: confirmed with real funds on 2026-07-09 that a valid signed swap sent keyless (no `x-api-key`) landed and finalized on mainnet, same as the keyed send. An invalid key returns `401`, but no key at all is currently accepted. Docs advertise API-key-required as forward guidance (the safer claim), so publishing should be coordinated with actual enforcement, or the docs will be ahead of live behaviour. It is send-only (only the `send*` methods; `getHealth` etc. return "Method not found"), so integrators keep their own RPC for blockhash and confirmation. The public path enforces a Jupiter tip (min 0.001 SOL) to one of the same 16 tip receiver accounts. Verified with a live SOL→USDC swap through `tx.jup.ag` (via `/build`) and both `@solana/web3.js` and `@solana/kit` send paths.
- [2026-07-09] The dedicated submit rate-limit bucket (Keyless 20 / Free 50 / Paid 100 RPS) is defined in `developer-platform` `api-gateway/auth-service/config/quota.toml`, keyed by the REST paths `/tx/v1/submit` and `/swap/v2/submit` (200/500/1000 per 10s window). The api-gateway (host `api.jup.ag`) rewrites those paths to `tx.juprpc.com/submit`. `tx.jup.ag` is a separate direct-to-beam load balancer, absent from that repo, so it does NOT inherit this bucket.
- [2026-07-09] Per Kyle: `tx.jup.ag` will require an API key and apply a single rate limit across all tiers (anti-abuse only, generous since revenue scales with landed transactions). Exact number not set yet. Differs from the tiered REST buckets above; docs describe the model without a number until it is set.
- [2026-07-09] Publishing is unresolved: Kyle wants to start advertising `sendTransaction`; groovie wants to hold until internal-team migration and all integrations are working. The docs PR should not merge until they align.
- [2026-07-09] Verified live (external key) against the beam api-v2 design spec (TX-105): `skipPreflight` must be `true` (explicit `false` → `-1015 "skipPreflight must be true"`), `maxRetries` must be `0` (non-zero → `-1015 "maxRetries must be 0"`), both default correctly if omitted. External error codes: `-1013` insufficient tip, `-1014` missing tip, `-1015` invalid param, `-1016` bad encoding.
- [2026-07-10] CORRECTION (groovie, beam dev): `swqosOnly` is NOT shipped yet. I wrongly documented it from the design spec plus a live test where `swqosOnly:true` "landed". That test was invalid: JSON-RPC servers silently ignore unknown config fields, so an unimplemented param yields the same "accepted + landed" result as a real one. Landing only proves the tx was valid, not that the param took effect (its routing effect is not observable from a confirmation check). Lesson: for an accept-path param, "it landed" is NOT verification; only reject-path params (skipPreflight/maxRetries, which returned specific `-1015` messages) were genuinely verified. Never document a param unless its effect is observed. Future (groovie, check in later): the section should advise how/when to use jito tips + priority fees, and note that if `swqosOnly` is false with no jito tip set, beam adds one.
- [2026-07-13] `swqosOnly` IS shipped after all — groovie reversed his earlier "not there" call. Re-added with the tip economics he confirmed: Jupiter tip always required and flat (higher does not help); add priority fees when congested; `swqosOnly=false` (default) = SWQoS + Jito, Beam adds a small Jito tip (add your own only to boost Jito landing); `swqosOnly=true` = SWQoS only, do NOT add a Jito tip. Wording fixes per groovie: the endpoint "forwards to the cluster" (not "lands" — a success response is not a landing guarantee); `encoding`/`skipPreflight` both default (`skipPreflight` false → `-1015`). The observe-the-effect lesson still holds; here the effect is confirmed by the owning dev, which is the authoritative source.
- [2026-07-09] `tx.jup.ag` methods are role-gated: **only `sendTransaction` is available to external integrators.** `sendJitoBundle`, `sendAndConfirmTransaction`, and `sendYoloModeTransaction` all require `RoleTag::Internal` and error with `-1012` for external callers (groovie confirmed the beam-side `require_role(&role, &[RoleTag::Internal], "sendJitoBundle")` check). `sendAndConfirmTransaction` is also scheduled for deprecation. Caveat on my own probing: a malformed-params probe of `sendJitoBundle` returned `-32602` (params are deserialized before the role check runs), which looked reachable but is not. So: integrator docs cover `sendTransaction` alone.
- [2026-07-09] Confirmed by Sayantan: the developer platform will show transaction-landing analytics/logs (fed by the Beam telemetry → ClickHouse ingestion, `beam_transaction_sent_v1`). Docs follow-up for `portal/analytics` + `portal/logs` is deferred until the submit-page UI ships. Nothing to document yet.

---

# Swap API V2 — RTSE (Real-Time Slippage Estimator)

## Architecture

- [2026-04-07] RTSE is applied at **order time** (when `/order` or `/build` is called), not at execution time. The estimated slippage is baked into the transaction.
- [2026-04-07] RTSE uses: heuristics (token categories, historical/real-time slippage data), algorithms (EMA on slippage data), and real-time failure rate monitoring.
- [2026-04-07] On `/order`, RTSE is automatic (no param needed). Passing `slippageBps` overrides RTSE with a fixed value. Live forced-JupiterZ tests on 2026-06-23 showed `slippageBps` does not disable JupiterZ by itself.
- [2026-04-07] On `/build`, RTSE is opt-in via `slippageBps=rtse` (literal string). Default is 50 bps fixed.
- [2026-04-07] Do not use "dynamic slippage" or "auto slippage" as naming conventions. The canonical name is RTSE (Real-Time Slippage Estimator).

---

# Token Verification (VRFD) — Express API

## Architecture

- [2026-06-30] Published OpenAPI spec lives at `https://token-verify-api.jup.ag/openapi.json` (service URL). The public docs/gateway path is `https://api.jup.ag/tokens/v2/verify/express/*`. Local repo spec `openapi-spec/tokens/v2/verification.yaml` uses server `https://api.jup.ag/tokens/v2/verify` and backs the three `api-reference/tokens/verify-*` MDX pages (thin `openapi:` wrappers, no hand-written field tables).
- [2026-06-30] Three documented routes: `GET /express/check-eligibility`, `GET /express/craft-txn`, `POST /express/execute`. 1000 JUP is required for Express submissions to prevent spam and prioritize requests. Standard submissions (on the VRFD site) are free.

## Multi-Currency Payment

- [2026-06-30] `paymentCurrency` is a token symbol: `JUP` (default), `SOL`, `USDC`, or `JUPUSD` (not a mint). JUP transfers directly (Ultra `/transfer/craft-token`). Non-JUP swaps to JUP (Ultra `/order`): the backend works out how much input buys 1000 JUP, adds a 50 bps buffer (`SIZING_BUFFER_BPS`), and swaps that fixed amount, so the output is a little above 1000 JUP. Mints: JUP `JUPyiwr…`, SOL `So111…112`, USDC `EPjF…Dt1v`, JUPUSD `Juprjzn…55USD`. Source: `vrfd/hub-api/apps/token-verification/src/routes/combined/{craftExpressTxn,executeExpressTxn,helpers}.ts`.
- [2026-06-30] On non-JUP paths, `craft-txn` also returns `inputMint`, `inputDecimals`, `quotedInputAmount`, `maxInputAmount`. `quotedInputAmount` and `maxInputAmount` are the same value (the swap input is fixed). `mint`/`amount` stay JUP: `amount` is a little above 1000 JUP on swaps, exactly `1000000000` on the JUP path. `feeLamports`/`feeAmount` are 0 on swap paths.
- [2026-06-30] `execute` body adds `paymentCurrency`, `paymentAmount`, `jupOutputAmount`. `paymentAmount` (atomic input paid) is required for non-JUP — the API returns 400 without it. `jupOutputAmount` (the craft `amount`) is optional and only used for revenue reporting. Use craft `quotedInputAmount` for `paymentAmount`. `paymentCurrency` must match what craft-txn used.

## Open Questions

- [2026-06-30] RESOLVED (verified in `hub-api` source): `paymentAmount` can use `quotedInputAmount` — it equals `maxInputAmount` (the swap input is fixed), and the API records it without re-checking.

## Content Gaps

- [2026-06-30] Published spec has a fourth route, `GET /express/quote` (cost preview without crafting a tx; returns `ExpressQuoteResponse`). Intentionally NOT documented (DEV-672 scoped to existing routes only). It is the cleanest way to preview non-JUP cost; revisit if integrators need it. The local repo spec also omits it.
- [2026-06-30] Local spec `verification.yaml` lagged the published spec: before DEV-672 it had `senderTwitterHandle` + the metadata `use*` toggles + full craft/execute responses, but not the payment-currency additions. DEV-672 added the payment-currency fields (still no `/express/quote`).

---

# Routing — Frontend Flow Signaling (propAMM)

## Architecture

- [2026-06-30] The Jupiter frontend (jup.ag) appends the dedicated signer `sighWH8KaiT7QhtV4w29ReVF8kG6D5yG3EQP1KYyGVF` to swap transactions and signs the transaction with it. PropAMMs detect Jupiter frontend (retail / non-toxic) flow by verifying this signature is present and valid, then quote tighter spreads. This is the technical mechanism behind "Ultra Signaling" (named but not previously explained in `ultra/index.mdx`). Trust model is a real signature, not just the address: only Jupiter holds the private key so it cannot be forged, which is why the address is safe to publish. Documented as a section on `swap/routing/dex-integration.mdx` (DEV-649). Example tx: `4PUVAsfdagLZcHbxso5w7eH13fnmAmobrRLih5uyqAFjQqRL5TgmVD5Fyrnbfm2mvpEn7dutk9wvGYNZrzQc6tbH`.
