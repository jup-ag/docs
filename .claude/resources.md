# Source-of-truth registry

Where ground truth lives for each Jupiter product, in authority order, plus where the
`document-from-source` skill finds the operator's machine setup. **Committed template — no
secrets, no machine-specific paths.** Real paths come from `.env` (gitignored) or invocation
args. Keep this file as running fieldnotes: when you verify a product, fill in its row.

## Authority order (when sources disagree)

1. **Live API response + on-chain tx result** — ground truth for behaviour.
2. **Source code** (API/program repos) — authority for intent, naming, error codes.
3. **SDK + first-party FE** — reference implementations (divergence from REST is often the finding).
4. **Existing docs** — lowest; this is what you are correcting.

## Machine setup (per operator, from `.env` or args)

Resolution precedence: **invocation args → `.env` → ask the operator.** See `.env.example`.

| Var | Meaning |
|-----|---------|
| `RPC_URL` | Solana mainnet RPC endpoint. |
| `JUPITER_API_KEY` | API key for `api.jup.ag` hosts that require one (some read endpoints work keyless). |
| `BS58_PRIVATE_KEY` / `KEYPAIR_PATH` | Dedicated **low-fund test wallet** (base58 secret, or path to a keypair JSON). |
| `WORKBENCH_DIR` | Absolute path to the operator's workbench, **outside this repo**, where trace scripts run. Runtime (Bun/Node) and SDK (`@solana/kit` / `@solana/web3.js`) are inferred from here. |

## Product source-of-truth table

Live hosts: Lite (keyless) `https://lite-api.jup.ag` · Dynamic (API key) `https://api.jup.ag`.
OpenAPI specs live in this repo under `openapi-spec/<product>/`.

### Lend (worked example — DEV-461)

| Source | Where | Notes |
|--------|-------|-------|
| Live API | `https://api.jup.ag/lend/v1` (earn + borrow) | Borrow read endpoints returned data without an `x-api-key` during testing; confirm before relying on keyless. |
| OpenAPI spec | `openapi-spec/lend/lend.yaml` | Drifts from live in places (e.g. `InstructionResponse` shape) — live wins. |
| SDK | `@jup-ag/lend` (build), `@jup-ag/lend-read` (read) | `getOperateIx` etc. SDK does NOT create ATAs; REST does. Subpath exports (`/api`, `/earn`, `/borrow`, `/flashloan`). Mainnet-only. Amounts are `BN`. |
| First-party FE | `TeamRaccoons/monorepo` → `apps/jupiter-ui/src/components/Borrowing` | Builds ix with the SDK, reads data from Fluid's backend (below), wraps SOL + creates ATAs manually. Does NOT use the public REST borrow API. |
| Backend | `https://api.solana.fluid.io/v1` (`borrowing/vaults`, `borrowing/users/{addr}/nfts`) | What the FE actually reads from. The public REST surface is not dogfooded by the FE. |
| Findings | `dx-findings/lend-borrow-dx-findings.md`, `dx-findings/lend-dx-findings.md` | Verified DX feedback from the DEV-461 / DEV-562 / DEV-604 runs. |

### Other products (fill in as you verify)

| Product | Live API | OpenAPI spec | Source repo(s) | SDK | FE / backend |
|---------|----------|--------------|----------------|-----|--------------|
| Swap (V2) | `…/swap/v2` | `openapi-spec/swap/v2/swap.yaml` | _tbd_ | _tbd_ | _tbd_ |
| Ultra | `…/ultra/v1` | `openapi-spec/ultra/…` | _tbd_ | _tbd_ | _tbd_ |
| Trigger (V2) | `…/trigger/v2` | `openapi-spec/trigger/v2/trigger.yaml` | _tbd_ | _tbd_ | _tbd_ |
| Tokens | `…/tokens/v2` | `openapi-spec/tokens/…` | _tbd_ | _tbd_ | _tbd_ |
| Price | `…/price/v3` | `openapi-spec/price/…` | _tbd_ | _tbd_ | _tbd_ |
| Transaction | `https://api.jup.ag/tx/v1` | `openapi-spec/transaction/transaction.yaml` | _tbd_ | _tbd_ | _tbd_ |

> Add a row (or a per-product section like Lend's once it gets detailed) whenever a
> verification run establishes the real source-of-truth locations for a product.
