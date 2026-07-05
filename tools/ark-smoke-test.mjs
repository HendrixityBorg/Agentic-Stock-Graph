const ARK_BASE_URL = process.env.ARK_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3";
const ARK_MODEL_ID = process.env.ARK_MODEL_ID || "doubao-seed-2-1-pro-260628";
const ARK_API_KEY = process.env.ARK_API_KEY;

if (!ARK_API_KEY) {
  console.error("Missing ARK_API_KEY. Set it before running this smoke test.");
  console.error("Example: ARK_API_KEY=... node tools/ark-smoke-test.mjs");
  process.exit(1);
}

const response = await fetch(`${ARK_BASE_URL}/responses`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${ARK_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: ARK_MODEL_ID,
    input:
      "Return a compact JSON object with keys ok, model, and task. The task is MarketFlow Graph API connectivity test.",
    thinking: { type: "disabled" }
  })
});

const rawText = await response.text();

if (!response.ok) {
  console.error(`Ark API request failed: ${response.status} ${response.statusText}`);
  console.error(rawText.slice(0, 1200));
  process.exit(1);
}

let payload;
try {
  payload = JSON.parse(rawText);
} catch {
  payload = { rawText };
}

const outputText =
  payload.output_text ||
  payload.output?.map?.((item) => item.content?.map?.((content) => content.text).filter(Boolean).join(" ")).filter(Boolean).join("\n") ||
  rawText.slice(0, 1200);

console.log("Ark API connectivity ok");
console.log(`model=${ARK_MODEL_ID}`);
console.log(outputText);
