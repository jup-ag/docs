# LO & DCA Docs — Restructure Plan + Session Context

Working doc for the Trigger / "LO & DCA" documentation. Written 2026-07-13 so the plan
survives a memory compaction. Not published (Mintlify ignores `.claude/`). Remove from the
commit if you don't want it in the PR.

Branch: `docs/trigger-dca-v2` · Worktree: `/Users/anmol/Dev/docs--docs-trigger-dca-v2`
PR: #921 (open). **Nothing from this session is committed or pushed yet.**
Source of truth for API behaviour: `jup-ag/trigger-order` `api-v2/src/**` on `origin/main`
(last audited @ `7b15671d`). Never trust `api-v2/docs/*.md` (stale, per Yusuf).

---

## Status — done this session

1. **Recurring (DCA V1) → unmaintained**, matching the Trigger V1 precedent (the repo removes
   unmaintained products from nav; it does not collapse them). Removed the `Recurring` dropdown
   item from `docs.json`; kept all `recurring/*` + `api-reference/recurring/*` files; added an
   `UNMAINTAINED:` `llmsDescription` prefix + a `<Warning>` linking to `/trigger/dca` on all 14
   pages. Updated the `generate-llms-from-docs.js` product summary (dropped Recurring, merged
   Trigger → "LO & DCA"). Left the pre-existing `deprecated: true` on the two price-order API
   pages. `llms.txt` regenerated (0 recurring refs). `mint broken-links` clean.
2. **Renamed the `Trigger` dropdown item → "LO & DCA"** and regrouped its sidebar:
   `Get Started` (index, authentication) / `Limit Order` (lifecycle, create-order, manage-orders,
   order-history) / `DCA` / `Resources` (best-practices, errors) / `API Reference`. Label only,
   no page paths changed.
3. **DEV-657 fix:** removed the root `GET /orders/history/{id}` references from `trigger/dca.mdx`
   and `openapi-spec/trigger/v2/trigger.yaml` (Yusuf: don't surface the legacy root detail path).
4. **DCA claim audit** of `dca.mdx` vs `origin/main` @ `7b15671d` (source + adversarial verify)
   plus no-funds live checks and on-chain fill forensics. Almost everything confirmed. Six fixes
   applied:
   - Added the `beginFillAt` >30-day error: `"Begin fill time cannot be more than 30 days in the future"`.
   - `triggerMint`: reworded from "supported price feed" to "cannot be the stablecoin leg"; added
     both-legs-stable → `400 "Mint pair is not supported"`.
   - Slippage: dropped the unverifiable "RTSE" naming (keeper sets it; no RTSE in `api-v2`).
   - Fills: "routed through Jupiter Ultra" → "standard Jupiter swap" (on-chain = `JUP6` aggregator).
   - Fees: softened "no separate DCA fee" (fills carry a `fee_bps` in `dca.fill_attempts`).
   - Cancel: "rolls back to `active`" was CONTRADICTED by source; changed to "stays in `withdrawing`".
   - Kept, now on-chain backed: keeper pays fees (`gasBidSWW5zmwXs3gn8TG2ijzKkrwpyM7ucwjgDQst6`),
     output delivered as native SOL straight to the wallet (fill tx `HuNMpjF…`).
   - Corrected learnings recorded in `.claude/rules/product-learning.md`.
5. **Split the DCA page into three** under the DCA group, matching Limit Order:
   `trigger/dca` (sidebarTitle "Create Order"), `trigger/dca-history` ("Track Order"),
   `trigger/dca-cancel` ("Cancel Order"). Descriptive `title`s kept for the page H1 + `llms.txt`.
   `docs.json` updated; `llms.txt` regenerated (230 entries); `mint broken-links` clean.
6. **Linear DEV-623 sub-issues:** DEV-653/655/656 cancelled (were doc-drift, code == live);
   DEV-654/657/659 kept and rewritten code-grounded with GitHub permalinks; DEV-658 flagged as
   gateway-owned, cancelled by Yusuf.

Preview: `mint dev` runs on localhost:3000 from the worktree.

---

## The restructure (pending — this is the plan)

### Goal
Make the flow obvious to a human engineer and unambiguous to an AI agent, with nothing that reads
as irregular. Remove the one real duplication (vault + deposit + sign, currently inline in both
`create-order` and `dca`).

### Two readers
- **Engineer:** arrives with an intent already formed ("I want limit orders" or "I want DCA").
  Wants one working example fast, then depth. Enemy = bouncing between pages to assemble one flow,
  and things that differ for no reason.
- **AI agent:** usually lands on one page. Needs that page self-sufficient, predictable names, and
  one canonical source per concept. Duplication reads as conflicting truths.

### Two principles
1. **Follow the real order of operations:** authenticate → fund a vault (deposit) → create an
   order → track → manage. Auth + vault + deposit are identical for both families, so they come
   first, once, before the fork.
2. **Parallel concepts must look parallel:** both families expose Create, Track, Manage. Name them
   identically in both.

### Target structure
```
LO & DCA
  Get Started
    Overview          what it is, the two families, the vault model, the end-to-end flow
    Authentication    JWT challenge -> verify            (shared)
    Vault & Deposit   get vault, craft deposit, sign     (shared, NEW page: trigger/deposit)
  Limit Orders
    Create            order types (single/OCO/OTOCO), params, full runnable example
    Track             history, states, events
    Manage            edit + cancel
  DCA
    Create            time / price-conditional, params, full runnable example
    Track             history, states, how rounds fill, fees
    Manage            cancel (states up front that DCA can't be edited)
  Resources           Best Practices, Errors
  API Reference       ...
```

### Why it works
- **Engineer:** reads top-down in the order they actually build; shared setup is before the fork
  so it's never done twice or hunted for; within a family, `Create → Track → Manage` is the same
  triad on both sides, so learning one teaches the other.
- **AI:** shared plumbing has one home (no conflicting copies); parallel `Create/Track/Manage`
  lets the model generalize across families; each Create page stays self-contained (full example)
  so an agent can act from a single page.

### The mechanic that avoids the trade-off
Risk of "shared setup first" is making the reader leave their Create page to see the whole flow.
Resolve it:
- `Vault & Deposit` is the **canonical reference** (deposit params, vault-register, the
  `orderType`/`orderSubType` table).
- Each `Create` page keeps a **complete runnable end-to-end example**, but the shared
  auth + vault + deposit portion comes from **one `snippets/` component**. Single source (no drift,
  clean for AI); each page still copy-paste-runnable (good for the engineer). Never explain setup
  twice in prose; show it inline from one source, link to the reference for depth.

### Changes vs now
- **New:** `trigger/deposit` ("Vault & Deposit") page + one shared setup snippet in `snippets/`.
- **Label renames (URLs unchanged, no redirects):** LO `Order History → Track`,
  `Manage Orders → Manage`; DCA `Track Order → Track`, `Cancel Order → Manage`. Use `sidebarTitle`,
  keep descriptive `title`s for H1 + `llms.txt`.
- **Edits to the live LO `create-order`:** inline setup becomes the shared snippet + a link.
  Content change, path unchanged. Show the diff before committing.
- **Secondary decision:** `Lifecycle` overlaps the new `Overview`. Fold its "integration at a
  glance" into `Overview`, then either retire `Lifecycle` (add a redirect) or keep it as a deeper
  appendix. Not central.
- **First-page label:** DCA `Create` page is currently labelled "Create Order"; alternative is
  "Overview" if we want to emphasise its landing role. Same for LO parity.

### Path safety
Only new URL is `trigger/deposit`. All existing LO/DCA page URLs stay, so no redirects. Risk is
content (editing live `create-order`), not paths.

### Phasing
1. **Phase 1 (zero path/content risk):** nav regroup to surface `Authentication` + `Vault &
   Deposit` as shared groups above Limit Orders and DCA; apply the parallel `Create/Track/Manage`
   labels. Visible on localhost:3000 immediately.
2. **Phase 2 (medium):** create the `snippets/` setup component + the `Vault & Deposit` page; point
   both Create pages at it; generalise `Lifecycle`. Review the `create-order` diff before it lands.

### Open decisions for the human
- Phase 1 now, Phase 2 after diff review? (recommended)
- `Lifecycle`: fold into `Overview` and retire (with redirect), or keep as appendix?
- DCA first-page label: "Create Order" (parity) or "Overview" (landing emphasis)?
- Snippet vs link-out for the shared setup in Create pages (recommended: snippet, so pages stay
  self-contained).

---

## Reminders / guardrails carried from this session
- Code + live are the source of truth for Trigger; never `api-v2/docs/*.md`. Read `origin/main`,
  not a stale local checkout.
- Unmaintained/deprecated content: this repo REMOVES from nav (keeps files, adds `UNMAINTAINED:`/
  `deprecated: true` + a `<Warning>`), it does not collapse in the sidebar.
- Every content change: run `node generate-llms-from-docs.js` then `mint broken-links` before commit.
- No em dashes, plain engineer prose, no AI-slop flourish.
- Ask before pushing; drafts only for Slack.
