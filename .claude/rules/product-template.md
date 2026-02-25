# {Product Name} — Rules & Learnings

> Copy this template for each product area:
> ultra-swap.md, tokens-price.md, toolkits.md, routing.md, portal.md

## Product Overview

<!-- Brief context so Claude understands what this product is -->
- **What it does:** {One sentence}
- **Target developer:** {Who integrates this and why}
- **Key endpoints/entry points:** {List the main API URLs or SDK entry points}
- **Folder in repo:** `{path}`
- **OpenAPI spec:** `openapi-spec/{filename}` (if applicable)

## API Behavior & Gotchas

<!-- Log non-obvious API behaviors discovered during writing or from developer feedback -->
<!-- These prevent us from writing incorrect docs -->

```
Format:
- **[YYYY-MM-DD]** Behavior: explanation
```

**Example entries (delete these and replace with real ones):**
- **[2025-XX-XX]** If `taker` is omitted from `/ultra/v1/order`, the response still returns but without a `transaction` field. Document this clearly.
- **[2025-XX-XX]** `swapType` can be `"aggregator"` or `"rfq"` — determines which routing engine was used. Developers often miss this.

## Terminology Overrides

<!-- Product-specific terminology that differs from or extends the global style guide -->

| Term in this product | How to write it          | Notes                           |
|----------------------|--------------------------|---------------------------------|
|                      |                          |                                 |

## Common Developer Questions

<!-- Sourced from Discord, GitHub issues, support tickets -->
<!-- These help prioritize what to document and how to frame content -->

| Question                                | Where it's answered          | Gap?  |
|-----------------------------------------|------------------------------|-------|
| {e.g., "How do I handle failed swaps?"} | {page path or "NOT DOCUMENTED"} | {yes/no} |

## Code Patterns

<!-- Standard code snippets or patterns to reuse across this product's docs -->
<!-- Keeps examples consistent and saves rewriting the same setup code -->

### Standard setup / imports
```typescript
// {Standard imports for this product}
```

### Common example values
```
// {Specific to this product — e.g., example token pairs, amounts, etc.}
```

## Content Status

<!-- Track what exists, what needs work, and what's missing -->

| Page                    | Path                        | Status                     | Notes                    |
|-------------------------|-----------------------------|----------------------------|--------------------------|
| {e.g., Overview}        | `docs/ultra.mdx`            | {needs-update / ok / new}  | {brief note}             |
| {e.g., Get Order}       | `docs/ultra-api/get-order`  | {needs-update / ok / new}  |                          |

## Patterns That Work

<!-- Document content approaches that got good feedback or feel right -->

- {e.g., "Showing the complete order→sign→execute flow in a single code block works better than splitting across 3 pages"}

## Known Issues / Tech Debt

<!-- Content problems we know about but haven't fixed yet -->

- {e.g., "The swap-api pages still reference the old rate limit model"}
- {e.g., "Missing error response documentation for /execute endpoint"}