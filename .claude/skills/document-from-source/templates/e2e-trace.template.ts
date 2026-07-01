/**
 * e2e-trace.template.ts — generic, product-agnostic trace script.
 *
 * Copy this into your WORKBENCH_DIR (outside the docs repo), rename per feature
 * (e.g. lend-borrow-e2e.ts), and fill in the ENDPOINTS + lifecycle steps.
 *
 * Runtime / SDK: this template is written against @solana/web3.js v1 because it is the most
 * widely installed. If your workbench uses @solana/kit, swap the signing/sending block for
 * kit equivalents (createKeyPairFromBytes, sendAndConfirmTransactionFactory, etc.). Run with
 * whatever your workbench uses — `bun run <file>` or `npx tsx <file>`. The skill infers this
 * from your workbench; keep the script faithful to whichever SDK you actually have.
 *
 * Config: this lives in YOUR workbench, so wire it to however your workbench loads secrets
 * (env, a config file, a keystore — your call). The reads below are just a sensible default;
 * the docs repo does not define or maintain these names.
 *
 * Safety model: use a DEDICATED LOW-FUND TEST WALLET, small amounts, and ALWAYS define the
 * unwind before sending. Read probes and build-only POSTs move no funds and are safe.
 */

import { writeFileSync, appendFileSync, readFileSync } from "node:fs";
import {
  Connection,
  Keypair,
  VersionedTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";

// ── Config: args → env → fail. Never hardcode a secret or path. ──────────────────────────
const arg = (name: string) =>
  process.argv.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");

const RPC_URL = arg("rpc") ?? process.env.RPC_URL;
const API_KEY = arg("apiKey") ?? process.env.JUPITER_API_KEY; // optional per product
const FINDINGS_OUT = arg("out") ?? "./trace-findings.md"; // copy into docs repo's dx-findings/ after

if (!RPC_URL) throw new Error("Set RPC_URL (env) or pass --rpc=");

// Test wallet: BS58_PRIVATE_KEY (base58 secret) or KEYPAIR_PATH (json array file).
function loadTestWallet(): Keypair {
  const b58 = arg("key") ?? process.env.BS58_PRIVATE_KEY;
  if (b58) return Keypair.fromSecretKey(bs58.decode(b58));
  const path = arg("keypair") ?? process.env.KEYPAIR_PATH;
  if (path) return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(readFileSync(path, "utf8"))));
  throw new Error("Set BS58_PRIVATE_KEY or KEYPAIR_PATH (use a dedicated low-fund test wallet)");
}

const connection = new Connection(RPC_URL, "confirmed");

// ── Trace logging: request → response → tx action → signature ─────────────────────────────
writeFileSync(FINDINGS_OUT, `# Trace — ${new Date().toISOString()}\n\n`);
const log = (md: string) => appendFileSync(FINDINGS_OUT, md + "\n");

async function probe(label: string, method: string, url: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      ...(API_KEY ? { "x-api-key": API_KEY } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const json = await res.json().catch(() => null);
  log(`### ${label}\n\n\`${method} ${url}\`\n`);
  if (body) log("Request:\n```json\n" + JSON.stringify(body, null, 2) + "\n```");
  log(`Response (${res.status}):\n\`\`\`json\n${JSON.stringify(json, null, 2)}\n\`\`\`\n`);
  return { status: res.status, json };
}

// Send a base64 VersionedTransaction returned by a build/order/operate endpoint.
async function signAndSend(label: string, txBase64: string, signer: Keypair) {
  const tx = VersionedTransaction.deserialize(Buffer.from(txBase64, "base64"));
  tx.sign([signer]);
  const sig = await connection.sendRawTransaction(tx.serialize(), { skipPreflight: false });
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed");
  log(`**${label}** → tx \`${sig}\`  (https://solscan.io/tx/${sig})\n`);
  return sig;
}

// ── The trace ─────────────────────────────────────────────────────────────────────────────
const BASE = "https://api.jup.ag";

async function main() {
  const wallet = loadTestWallet();
  log(`Test wallet: \`${wallet.publicKey.toBase58()}\`\n`);

  // 1. READ probes (safe) — confirm shapes against the OpenAPI spec.
  // await probe("read state before", "GET", `${BASE}/<product>/v1/<read-endpoint>?...`);

  // 2. BUILD-ONLY POST (safe) — inspect the unsigned transaction / instructions.
  // const built = await probe("build", "POST", `${BASE}/<product>/v1/<build-endpoint>`, { /* ... */ });

  // 3. SIGNED SEND (opt-in) — only to confirm behaviour you cannot read.
  //    State the UNWIND plan here BEFORE sending. Example:
  //    log("> Unwind plan: reverse the deposit (withdraw same amount), close any opened ATA.");
  // const sig = await signAndSend("operate", built.json.transaction, wallet);

  // 4. READ probe after — diff against "before" to prove the effect.
  // await probe("read state after", "GET", `${BASE}/<product>/v1/<read-endpoint>?...`);

  await unwind(wallet);
  log("\n✅ trace complete; wallet restored to starting state.");
}

// ── Unwind: reverse every state change so the wallet ends where it started. ────────────────
async function unwind(_wallet: Keypair) {
  // Reverse each step from main() in LIFO order. e.g.:
  // - withdraw what you deposited (full-amount sentinel if the protocol leaves dust)
  // - close any token account you opened
  // - return any shuttled SOL to the origin wallet
}

main().catch((e) => {
  log(`\n❌ ERROR: ${e?.message ?? e}`);
  throw e;
});
