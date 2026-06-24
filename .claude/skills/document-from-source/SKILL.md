---
name: document-from-source
description: Document a Jupiter API/feature from verifiable evidence instead of assumptions. Probes the live API, optionally runs the real transaction lifecycle on mainnet with a test wallet, cross-references the SDK and first-party FE source, then writes docs, product-learning entries, a DX findings file, and a changelog entry. Use when documenting a new or changed endpoint/feature where behaviour must be verified, not guessed.
user-invocable: true
---

# Document from source

Produce documentation that is backed by evidence: the live API response, the on-chain
transaction result, and the actual source code, not the issue text or an assumption.

This skill packages the workflow proven on DEV-461 (Borrow API). Documenting from the issue
text alone would have gotten four things wrong that only showed up when we probed the live
endpoints and ran the lifecycle on mainnet:

- REST `/operate` auto-creates the borrow-token ATA; the SDK does not (caller must).
- The API does not wrap/unwrap native SOL (deposit needs pre-wrapped WSOL; withdraw returns wrapped SOL).
- Repaying the exact `borrow` value leaves interest dust → `VaultUserDebtTooLow`; full repay needs the `MIN_I128` sentinel.
- Earn and Borrow return different instruction-response envelopes.

Those became the docs (PR #918), the `.claude/rules/product-learning.md` entries, and
`dx-findings/lend-borrow-dx-findings.md`. This skill makes that repeatable for any product.

## When to use this

Use it when you are documenting a new or changed endpoint/feature and the correct behaviour
is not already proven in the docs. Skip it for pure copy edits, restructures, or navigation
changes where no API behaviour is in question.

## Setup (resolve the operator's environment)

Before doing anything, resolve two things: **where ground truth lives** (the registry) and
**the operator's machine paths** (env or args). Never hardcode either.

1. **Read the registry** at `.claude/resources.md`. It lists, per product: the live API
   hosts, the OpenAPI spec path in this repo (`openapi-spec/<product>/`), the source-code
   repos, the SDK package, the first-party FE monorepo, and any backend. It also states the
   authority order (below). The Lend row is filled in as the worked example; other products
   may be placeholders you complete as you go (the registry is running fieldnotes, keep it
   updated).

2. **Resolve machine paths** in this precedence: **invocation args → `.env` → ask the
   operator.** Never commit a real path or secret. The env vars (see `.env.example`):
   - `RPC_URL` — Solana RPC endpoint (mainnet).
   - `JUPITER_API_KEY` — for `api.jup.ag` hosts that need a key. Read endpoints on Lend
     worked without one during DEV-461; confirm per product.
   - `BS58_PRIVATE_KEY` or `KEYPAIR_PATH` — the **dedicated low-fund test wallet**. Either a
     base58 secret (matches how browser wallets export) or a path to a keypair JSON.
   - `WORKBENCH_DIR` — absolute path to the operator's workbench **outside this repo**, where
     trace scripts run and dependencies are installed.

3. **Infer the runtime, do not impose one.** Each operator has their own setup. Look in
   `WORKBENCH_DIR` for `bun.lockb`/`package.json`/`tsconfig` and the installed Solana SDK to
   decide whether to run scripts with Bun or Node, and whether to write `@solana/kit` or
   `@solana/web3.js` v1. If it is ambiguous, ask once and remember it for the run. The
   bundled trace template is runtime-agnostic.

## Authority order (when sources disagree)

Behaviour is decided by what actually happens, not by what any one source claims:

1. **Live API response + on-chain transaction result** — ground truth for behaviour. If you
   ran it and saw it, that wins.
2. **Source code** (API/program repos) — authority for intent, naming, error codes, and the
   "why" behind a behaviour.
3. **SDK and first-party FE** — reference implementations. Useful to see how Jupiter itself
   calls the thing, but they can diverge from the REST surface (that divergence is often the
   finding).
4. **Existing docs** — lowest. They are what you are correcting; never treat them as proof.

A conflict between any two of these is itself a finding worth logging.

## Workflow

### 1. Read the registry and resolve env
Per Setup above. Confirm you know: the live hosts, the OpenAPI spec, the source repos, the
SDK, the FE, and the resolved machine paths/runtime.

### 2. Probe the live API (read first)
Hit the **read** endpoints first, then **build-only POSTs** (e.g. `*-instructions`, `/build`,
`/order`) — these return data without moving funds and are safe to call freely. Record the
exact request (method, URL, body) and the exact response for every call. Compare the response
shape against the OpenAPI spec and note any drift.

### 3. (Optional) Sign and send on mainnet
Only when behaviour can only be confirmed by executing it (e.g. "does `/operate` create the
ATA?"). Preconditions and discipline:

- Use the **dedicated low-fund test wallet** from env. Never a real user wallet.
- Use **small amounts**. The DEV-461 full lifecycle cost ~$0.000001.
- **Plan the unwind before the first send.** Every state change must have a reverse step so
  the wallet ends where it started (e.g. shuttle funds to a temp wallet and restore, close
  accounts you opened). The bundled trace template has an `unwind()` section.
- Sends proceed without a per-step confirmation prompt — the test-wallet + small-amount +
  unwind discipline is the safety model. State the unwind plan in the trace before sending so
  it is on record.

Run trace scripts from `WORKBENCH_DIR`, not from this repo.

### 4. Log the e2e trace
For every step, append to the findings file: **request → response → tx action → signature**.
Real mainnet signatures are the evidence. Use the bundled `templates/findings-template.md`
format (severity-tagged tables, hierarchical finding IDs, an evidence table of step →
endpoint → signature).

### 5. Cross-reference SDK and FE source
Read the SDK package and the first-party FE for the same operation. Where they do it
differently from the REST API (extra ATA instructions, manual SOL wrap, named constants for
magic numbers, different response envelopes), that is a discrepancy — log it with the
authority order deciding which surface is "right" for behaviour.

### 6. Write the outputs
Produce all of these by default:

1. **Docs pages** (`.mdx`) — the primary deliverable. Follow the repo's writing rules in
   `CLAUDE.md` and `.claude/rules/style-guide.md`. Every code example must be runnable and
   carry the full API URL.
2. **`.claude/rules/product-learning.md`** — append dated bullets under the product heading
   for every non-obvious behaviour discovered.
3. **`dx-findings/<feature>-dx-findings.md`** — when the API/SDK/FE has rough edges, write DX
   feedback for the product engineers using `templates/findings-template.md`. This dir is
   gitignored; findings stay local.
4. **`updates/index.mdx` changelog** — add an `<Update>` entry only when the work surfaces a
   public API or product change (per `CLAUDE.md`). Skip for docs-only fixes.

### Handoff (not part of this skill)
Branching, Linear status, `node generate-llms-from-docs.js`, `mint broken-links`, and opening
the PR follow the **existing `CLAUDE.md` workflow**. This skill stops at producing the
artifacts so it never drifts from the canonical ship process.

## Run from a clean machine

1. Clone this docs repo. The skill, registry template, and helper templates are committed
   under `.claude/`.
2. Set up a workbench **outside** this repo (any dir with a Solana SDK installed and a
   TypeScript runner). Point `WORKBENCH_DIR` at it.
3. Copy `.env.example` to `.env` (gitignored) and fill in `RPC_URL`, `JUPITER_API_KEY`,
   `BS58_PRIVATE_KEY` (or `KEYPAIR_PATH`) for a **funded low-balance test wallet**, and
   `WORKBENCH_DIR`. Alternatively pass any of these as invocation args.
4. Open `.claude/resources.md` and confirm (or fill in) the row for the product you are
   documenting.
5. Invoke `/document-from-source` and name the feature/endpoint to document.

## Files in this skill

- `SKILL.md` — this file.
- `templates/findings-template.md` — DX findings format (copy into `dx-findings/`).
- `templates/e2e-trace.template.ts` — generic, runtime-agnostic trace script (copy into
  `WORKBENCH_DIR`, fill in the endpoints).
- `.claude/resources.md` (repo root) — the source-of-truth registry.
