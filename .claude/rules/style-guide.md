# Style Guide — Jupiter Developer Docs

This is the living style guide for all content in the Jupiter docs repo.
Update this file whenever a style decision is made or a pattern is established.

## Voice

- **Direct.** Lead with what the developer needs. Skip throat-clearing intros.
- **Precise.** Use exact terms. Don't say "send a request" when you mean "POST to /ultra/v1/execute".
- **Confident.** State things plainly. "Ultra Swap handles slippage automatically" not "Ultra Swap can help manage slippage".
- **Respectful of time.** Assume the reader is mid-build and wants to get back to their code.
- **AI-friendly.** Clear, unambiguous sentence structure so both humans and AI systems can parse content correctly.

### Tone

Technical but approachable. Professional and precise, not cold or overly formal. Aim for the voice of a knowledgeable colleague explaining something clearly, not a marketing page or an academic paper.

## Terminology

### Always Use (Canonical Names)

| ✅ Use this           | ❌ Not this                               | Notes                                    |
|-----------------------|------------------------------------------|------------------------------------------|
| Ultra Swap API        | Ultra API, Ultra Swap                    | Full product name in first mention, then "Ultra" is OK |
| Metis Swap API        | Metis API, Metis Swap                    | Don't call it "legacy" in docs — still supported |
| Jupiter               | Jup, jup.ag                              | Always "Jupiter" in prose. "jup.ag" only for URLs |
| Developer Platform    | Portal, Dev Portal, Dashboard            | Full name first, then "Portal" is OK     |
| API key               | api key, API Key, apiKey                  | Lowercase "key" in prose, camelCase only in code |
| Solana                | SOL (when referring to the chain)         | "SOL" only for the token                 |
| Swap API          | Unified Swap API, Swap V2             | "Swap API" in prose. Use "V2" only when contrasting with V1 |
| `/order`          | order endpoint, order API              | Always backtick the path in prose              |
| `/build`          | build endpoint, build API              | Always backtick the path in prose              |
| `/execute`        | execute endpoint, execute API          | Always backtick the path in prose              |
| `/submit`          | submit endpoint, submit API            | Always backtick. API at `api.jup.ag/tx/v1/submit`, not under `/swap/v2/` |
| Meta-Aggregator    | meta aggregator, MetaAggregator        | The `/order` + `/execute` integration path. Capitalised, hyphenated. |
| Router             | Metis Router (in most contexts)        | The `/build` + `/submit` integration path. Say "Router" in prose, mention Metis only when explaining what the Router uses under the hood. |

### Product-Specific Terms

| Term                        | Definition / Usage                                                |
|-----------------------------|-------------------------------------------------------------------|
| Juno                        | Jupiter's liquidity engine (multi-source aggregation, self-learning) |
| Iris                        | Jupiter's routing engine for DEX integrations                     |
| JupiterZ                    | RFQ-based routing engine for market maker integrations            |
| Jupiter Beam                | Transaction landing infrastructure (sub-second)                   |
| RTSE                        | Real-Time Slippage Estimator — always define on first use per page |
| Dynamic Rate Limits         | Rate limits that scale with swap volume — not "auto-scaling limits"|
| Lite API / Dynamic API      | Two access tiers: `lite-api.jup.ag` vs `api.jup.ag`              |

### Words to Avoid

| ❌ Avoid              | ✅ Use instead              | Why                                      |
|-----------------------|-----------------------------|------------------------------------------|
| simply, just, easy    | (remove or rephrase)        | Dismissive if the reader is struggling   |
| please                | (just state the action)     | Docs aren't requests — "Run X" not "Please run X" |
| leverage              | use                         | Corporate jargon                         |
| utilize               | use                         | Same                                     |
| in order to           | to                          | Unnecessary words                        |
| it should be noted    | (just state the thing)      | Filler                                   |
| as mentioned above    | (link to the section)       | Pages are non-linear — readers jump in   |
| click here            | (use descriptive link text) | Bad for accessibility and scanning       |
| em dash (—)           | colon, comma, period, or restructure | **Never use em dashes.** They read as AI-generated. Use a colon for explanations, a comma for light pauses, a period for separate thoughts, or restructure the sentence. |
| dApp, dapp, DApp      | app, application, website     | Avoid web3 jargon — use plain language   |

## Formatting Conventions

### Headings

- **H1:** Page title only (set in frontmatter `title:`, never in body)
- **H2:** Major sections within a page
- **H3:** Subsections — use sparingly, max 2 levels deep
- **Never skip levels** (no H2 → H4)
- **Headings are statements, not questions.** "Configure your API key" not "How do I configure my API key?"

### Code

- Inline code (`backticks`) for: endpoint paths, parameter names, function names,
  file names, terminal commands, values, mint addresses
- Code blocks for: anything ≥ 2 lines, complete examples, request/response payloads
- Always specify language in fenced code blocks: ```typescript, ```json, ```bash
- **TypeScript is the default language** for code examples
- If showing multiple languages, use Mintlify's `<CodeGroup>`:

```mdx
    <CodeGroup>
    ```typescript TypeScript
    // example
    ```
    ```python Python
    # example
    ```
    </CodeGroup>
```

### API Endpoints

Always format endpoints as:

```
METHOD https://full-url.jup.ag/path
```

Not just `/path`. Developers copy-paste from docs — give them the full URL.
Use the Lite URL as default, note the Dynamic URL variant where relevant.

### Parameters and Responses

Use Mintlify's `<ParamField>` and `<ResponseField>` for structured API docs.
For quick inline references, use tables:

```mdx
| Parameter    | Type     | Required | Description                    |
|-------------|----------|----------|--------------------------------|
| `inputMint` | `string` | Yes      | Mint address of the input token |
```

### Callouts

Use sparingly. If everything is a callout, nothing is.

- `<Tip>` — Helpful shortcut or best practice
- `<Note>` — Important context that's easy to miss
- `<Warning>` — Will break things or cost money if ignored
- `<Info>` — Background context, not critical

**Rule of thumb:** Max 2 callouts per page. If you need more, the content
structure needs rethinking or ask human for permission.

### Links

- Internal links: use relative paths (`/docs/ultra` not `https://dev.jup.ag/docs/ultra`)
- External links: always use full URLs
- Link text should describe the destination: "see the [Ultra API reference](/api-reference/ultra)" not "[click here](/api-reference/ultra)"

## Page Patterns

### API Product Page (e.g., Ultra Swap overview)

```
1. One-line description of what it does
2. Why you'd use this (2-3 sentences, tied to developer outcomes)
3. Quick start code example (complete, runnable)
4. Key features / capabilities (brief)
5. Links to detailed pages (API reference, guides, related tools)
```

### Guide Page (e.g., "Integrate Ultra in 10 minutes")

```
1. Goal statement: "By the end of this guide, you'll have X"
2. Prerequisites (API key, dependencies, etc.)
3. Steps — numbered, each with a code block and brief explanation
4. Complete working example at the end
5. Next steps / related guides
```

### Concept Page (e.g., "How routing works")

```
1. What this concept is and why it matters (1 paragraph)
2. How it works (diagrams welcome)
3. Key details developers need to know
4. How this affects their integration
5. Links to relevant API reference or guides
```

## Content Quality Bar

Before considering any page done:

- A developer with no Jupiter context can understand what the page is about from the title + first paragraph
- Every code example can be copied and run (with their own API key / wallet)
- The `description` frontmatter field is a real sentence, not just the title repeated
- The `llmDescription` frontmatter field is a descriptive and detailed sentence, not just the description repeated
- No acronyms used without definition on first use per page (RTSE, RFQ, MEV, etc.)
- The page answers "what", "why", and "how" — even if briefly

## Decisions Log

Record style decisions as they come up so we stay consistent.

Format: `- [YYYY-MM-DD] Decision: rationale`

- [2026-02-26] Tone set to "technical but approachable": professional and precise, not cold or overly formal. No em dashes for asides.
- [2026-03-09] API guide code examples should cover the full lifecycle (e.g. quote → build → sign → send) and include error handling at each stage, not just the happy path. Developers copy code from guides directly.
- [2026-03-09] When documenting API response schemas, always verify examples against the live API. OpenAPI specs can drift from actual responses, especially for newer APIs.
- [2026-03-10] Frontmatter is YAML, body is markdown: escaping rules differ. Markdown-specific escaping (e.g. `\$` for LaTeX prevention) must NOT be used in YAML frontmatter strings (`title`, `description`, `llmsDescription`) because YAML only recognizes its own escape sequences (`\n`, `\t`, `\\`, `\"`). Using `\$` in frontmatter causes a Mintlify parse error. In the markdown body, `$` must be escaped as `\$` to prevent LaTeX rendering (e.g. `\$300` not `$300`).
- [2026-03-10] OpenAPI security schemes: separate array items = OR, same object = AND. For endpoints requiring both API key and Bearer auth, use `- ApiKeyAuth: []\n  BearerAuth: []` (same item), not separate items.
- [2026-03-10] V1 collapsed dropdown pattern: use `"expanded": false` on the group in `docs.json` nav (same pattern as Metis Swap in Ultra docs).
- [2026-03-10] API reference overview pages should list endpoints grouped by category with `<CardGroup>` cards linking to each endpoint (see Prediction API as reference pattern).
- [2026-03-10] Code examples for transaction signing should use actual imports (`VersionedTransaction` from `@solana/web3.js`, `bs58`) not placeholder functions like `deserializeTransaction()`.
- [2026-03-12] Lend terminology: use "Earn" (not "Supply" or "Lending") for the deposit side, "Borrow" for the vault/debt side. Matches product UI naming.
- [2026-03-12] SDK named parameters: when documenting SDK functions, always show the named-parameter form (`{ connection, signer, asset, amount }`) not positional args. Positional forms are error-prone and not how the SDK is designed.
- [2026-03-12] Import Private Key pattern: use base58 decode (`bs58.decode(privateKey)` with `Keypair.fromSecretKey`), not file-read from JSON. Browser wallets export base58 strings.
- [2026-03-17] Swap V2 code examples always show both @solana/kit and @solana/web3.js in `<CodeGroup>` tabs, with kit listed first. Prerequisites (imports, types, helpers) go in a collapsible `<Accordion>` to keep the main example clean.
- [2026-03-19] When `/build` returns ALT data (`addressesByLookupTableAddress`), never make RPC calls to resolve ALTs. Construct lookup table objects locally from the response data. Both kit and web3.js examples should use a `transformALTs` helper for consistency.
- [2026-03-19] For @solana/web3.js `AddressLookupTableAccount` construction: `compileToV0Message` only uses `key` and `state.addresses`. Other state fields (`deactivationSlot`, `lastExtendedSlot`, `lastExtendedSlotStartIndex`) are TypeScript requirements only. Encapsulate in a helper rather than exposing placeholder values in the main code example.
- [2026-04-07] `/submit` is a product-neutral endpoint at `api.jup.ag/tx/v1/submit`. Always use the full API URL in code examples (`https://api.jup.ag/tx/v1/submit`), not a `BASE_URL` variable. The docs path is `/transaction/submit`. In prose, reference as `/submit` with backticks.
- [2026-04-07] RTSE terminology: always use "RTSE" or "Real-Time Slippage Estimator". Never use "dynamic slippage" or "auto slippage" — these were legacy names that are no longer used.
- [2026-04-07] Docs file path does not need to mirror the API URL path. Mintlify's docs.json decouples sidebar placement from file location. A page can live at `transaction/submit.mdx` but appear in the Swap sidebar. Choose file paths based on product scope, not discovery context.
- [2026-04-16] Swap API overview uses "Meta-Aggregator" and "Router" as the two integration paths. "Meta-Aggregator" = `/order` + `/execute` (Jupiter handles everything). "Router" = `/build` + `/submit` or own RPC (integrator builds the transaction). Use these terms consistently in swap docs.
- [2026-04-16] When absorbing a standalone page into another page, delete the original and add a redirect. Done for `swap/fees.mdx` (absorbed into order-and-execute and build) and `swap/routing/index.mdx` (absorbed into overview). Keeps URL space clean.
- [2026-04-16] British English spelling for docs prose (e.g. "randomise", "optimise", "colour"). Do not Americanise existing British spellings.
