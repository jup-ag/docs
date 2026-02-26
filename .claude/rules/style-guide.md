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
| Developer Portal      | Portal, Dev Portal, Dashboard            | Full name first, then "Portal" is OK     |
| API key               | api key, API Key, apiKey                  | Lowercase "key" in prose, camelCase only in code |
| Solana                | SOL (when referring to the chain)         | "SOL" only for the token                 |

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
| em dash for asides    | comma, period, or restructure | Em dashes read as AI-generated; prefer cleaner sentence structure |

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