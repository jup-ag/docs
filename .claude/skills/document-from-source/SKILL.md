---
name: document-from-source
description: Document a Jupiter API/feature from verifiable evidence instead of assumptions. Probes the live API, optionally runs the real transaction lifecycle on mainnet from the operator's workbench, cross-references the SDK and first-party FE source, then writes docs, product-learning entries, a DX findings file, and a changelog entry. Use when documenting a new or changed endpoint/feature where behaviour must be verified, not guessed.
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

## Setup

Two inputs, neither stored in this repo:

1. **Your workbench directory** (passed as an arg). This is where your work is done and your
   secrets are held: your RPC endpoint, your dedicated test-wallet keypair, any API key, your
   trace scripts, and your runtime. When you invoke the skill you are saying "this is my
   workbench, run the tests here." The skill runs traces from that directory and reads
   whatever config/secrets your own setup exposes there. Nothing about your machine, no env
   vars, and no secrets live in the docs repo.

   The skill **infers your runtime and SDK** from the workbench (lockfiles, `package.json`,
   installed deps) — Bun or Node, `@solana/kit` or `@solana/web3.js`. If it is ambiguous, it
   asks once and remembers it for the run.

2. **The product's `## Sources` in `.claude/rules/product-learning.md`.** Source-of-truth
   pointers are not a separate file. They live under the product's heading in
   `product-learning.md` alongside the behavioural learnings: the live API host, the OpenAPI
   spec path, the source repo(s), the SDK, and the first-party FE/backend. Read that section
   first; if it is thin, you fill it in at step 6 as part of normal documentation work.

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

### 1. Read the product's Sources and prior learnings
Open `.claude/rules/product-learning.md` at the product's section. Note its `## Sources` (live
host, OpenAPI spec, source repos, SDK, FE/backend) and any prior learnings. That is your
starting map of what to verify against. Confirm the workbench arg and infer the runtime/SDK.

### 2. Probe the live API (read first)
Hit the **read** endpoints first, then **build-only POSTs** (e.g. `*-instructions`, `/build`,
`/order`) — these return data without moving funds and are safe to call freely. Record the
exact request (method, URL, body) and the exact response for every call. Compare the response
shape against the OpenAPI spec and note any drift.

### 3. (Optional) Sign and send on mainnet
Only when behaviour can only be confirmed by executing it (e.g. "does `/operate` create the
ATA?"). Run from your workbench, using its test wallet and RPC. Discipline:

- Use a **dedicated low-fund test wallet**, never a real user wallet.
- Use **small amounts**. The DEV-461 full lifecycle cost ~$0.000001.
- **Plan the unwind before the first send.** Every state change must have a reverse step so
  the wallet ends where it started (e.g. shuttle funds to a temp wallet and restore, close
  accounts you opened). The bundled trace template has an `unwind()` section.
- Sends proceed without a per-step confirmation prompt — the test-wallet + small-amount +
  unwind discipline is the safety model. State the unwind plan in the trace before sending so
  it is on record.

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

### 6. Release gate — confirm the feature is shipped (always ask)
The authority order proves what the API *does*, never whether it is *meant to be public yet*.
A feature can pass every live and on-chain check and still be unreleased. Before writing
anything, check release signals and **always pause for explicit operator confirmation** — do
not write until the operator confirms the feature is public:

- **Source recency** — how recently did the endpoint/feature merge (`git log` in the source repo)? A merge from the last few days is a red flag.
- **Tracking ticket** — is an in-progress ticket gating it? Ask the operator; a feature behind an open ticket is not shipped.
- **First-party FE usage** — does the FE actually call it? A live endpoint with no FE usage is often unreleased.
- **Flags/config** — is it behind a feature flag or config gate?

If any signal says "unshipped" (recent merge, open ticket, no FE usage, behind a flag), say so
plainly and hold. Publishing an unreleased feature is the worst failure mode for a docs skill,
and clean live evidence alone will not catch it.

### 7. Write the outputs
Produce all of these by default:

1. **Docs pages** (`.mdx`) — the primary deliverable. Follow the repo's writing rules in
   `CLAUDE.md` and `.claude/rules/style-guide.md`. Every code example must be runnable and
   carry the full API URL.
2. **`.claude/rules/product-learning.md`** — append dated bullets under the product heading
   for every non-obvious behaviour discovered, **citing the source** on each. Update or create
   the product's `## Sources` block while you are there. This is what keeps the source-of-truth
   map current, as a side effect of documenting.
3. **`dx-findings/<feature>-dx-findings.md`** — when the API/SDK/FE has rough edges, write DX
   feedback for the product engineers using `templates/findings-template.md`. This dir is
   gitignored; findings stay local. Note: `mint broken-links` (a Handoff step) parses every
   `.md`/`.mdx` in the working tree **regardless of gitignore**, so keep the findings file
   MDX-safe — use `{/* */}` not HTML comments, and backtick any bare `<...>` (e.g.
   `` `<placeholder>` ``, `` `Record<string, T>` ``) or the check fails to parse it.
4. **`updates/index.mdx` changelog** — add an `<Update>` entry only when the work surfaces a
   public API or product change (per `CLAUDE.md`). Skip for docs-only fixes.

### Handoff (not part of this skill)
Branching, Linear status, `node generate-llms-from-docs.js`, `mint broken-links`, and opening
the PR follow the **existing `CLAUDE.md` workflow**. This skill stops at producing the
artifacts so it never drifts from the canonical ship process.

## Run from a clean machine

1. Clone this docs repo. The skill and its helper templates are committed under `.claude/`.
2. Have your own **workbench directory outside this repo**: a TypeScript runtime (Bun or
   Node), an installed Solana SDK, your RPC endpoint, a funded low-balance test-wallet
   keypair, any API key, and your trace scripts. The skill reads all of this from there.
3. Invoke `/document-from-source`, pass your workbench directory, and name the
   feature/endpoint to document.

## Files in this skill

- `SKILL.md` — this file.
- `templates/findings-template.md` — DX findings format (copy into `dx-findings/`).
- `templates/e2e-trace.template.ts` — a **simple build → sign → send** trace skeleton to copy
  into your workbench and wire to its own secret loading. Real flows can be anything: an auth'd
  or custodial API (challenge-response signing, server-submitted steps, a multi-step lifecycle,
  keeper/status polling) needs a near-total rewrite, not just filled-in endpoints.
