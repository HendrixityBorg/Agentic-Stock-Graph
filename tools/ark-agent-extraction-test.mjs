const ARK_BASE_URL = process.env.ARK_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3";
const ARK_MODEL_ID = process.env.ARK_MODEL_ID || "doubao-seed-2-1-pro-260628";
const ARK_API_KEY = process.env.ARK_API_KEY;

if (!ARK_API_KEY) {
  console.error("Missing ARK_API_KEY. Set it before running this test.");
  console.error("Example: ARK_API_KEY=... node tools/ark-agent-extraction-test.mjs");
  process.exit(1);
}

const eventText =
  process.argv.slice(2).join(" ") ||
  "A large cloud provider raised its FY2026 AI data center capex guidance, citing stronger demand for training clusters, high-speed networking, and accelerated compute capacity.";

const prompt = `
You are the Event Router + Graph Mutation Agent for MarketFlow Graph.

Analyze the external event and return compact JSON only. Do not include markdown.
Use numeric scores strictly in the 0 to 1 range. Do not use percentages like 25 or 85.
Use event_class from this enum when possible: event.cloud_capex, event.export_control, macro.rate_path_lower, product_launch, partnership, earnings_update, unknown.
Use graph node ids from the available graph node examples when possible. If an entity is outside the seed graph, include it in entities but do not invent a source/target id unless needed.

Event:
${eventText}

Available graph node examples:
- event.cloud_capex
- event.export_control
- macro.rate_path_lower
- driver.ai_server_demand
- driver.high_speed_networking
- driver.power_cooling
- product.gpu_hbm_cowos
- company.NVDA
- company.TSM
- company.AVGO
- company.ANET
- company.VRT
- security.SMH
- security.QQQ
- security.TLT

Return this JSON shape:
{
  "extraction": {
    "normalized_trigger": "",
    "event_class": "",
    "entities": [],
    "key_signals": [{"label": "", "value": ""}],
    "evidence_snippets": []
  },
  "graph_mutations": [
    {
      "source": "",
      "target": "",
      "operation": "add_candidate | strengthen | weaken | activate_risk | add_monitor",
      "direction": "positive | negative | mixed",
      "strength_delta": 0,
      "confidence": 0,
      "reason": ""
    }
  ],
  "recommendation_context": {
    "affected_holdings": [],
    "new_candidates": [],
    "validation_signals": [],
    "risks": []
  }
}
`;

const response = await fetch(`${ARK_BASE_URL}/responses`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${ARK_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: ARK_MODEL_ID,
    input: prompt,
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
  rawText;

console.log(outputText.trim());
