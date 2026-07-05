const ARK_BASE_URL = process.env.ARK_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3";
const ARK_MODEL_ID = process.env.ARK_MODEL_ID || "doubao-seed-2-1-pro-260628";
const ARK_API_KEY = process.env.ARK_API_KEY;

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    if (!ARK_API_KEY) {
      sendJson(res, 500, {
        error: "Missing ARK_API_KEY. Configure it in Vercel Project Settings -> Environment Variables."
      });
      return;
    }

    const body = await readJsonBody(req);
    const newsUrl = String(body.newsUrl || "").trim();
    const eventText = String(body.eventText || "").trim();
    const holdings = Array.isArray(body.holdings) ? body.holdings : [];
    const article = await fetchArticleText(newsUrl);
    const agentOutput = await callArkAgent({ newsUrl, eventText, articleText: article.text, holdings });

    sendJson(res, 200, {
      ok: true,
      mode: "real_model",
      model: ARK_MODEL_ID,
      source: {
        newsUrl,
        fetched: article.fetched,
        fetchError: article.error || null,
        articleChars: article.text.length
      },
      agentOutput
    });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Internal server error" });
  }
}

async function callArkAgent({ newsUrl, eventText, articleText, holdings }) {
  const prompt = buildAgentPrompt({ newsUrl, eventText, articleText, holdings });
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
    throw new Error(`Ark API failed: ${response.status} ${response.statusText} ${rawText.slice(0, 500)}`);
  }

  let payload;
  try {
    payload = JSON.parse(rawText);
  } catch {
    payload = { rawText };
  }

  const outputText =
    payload.output_text ||
    payload.output
      ?.map?.((item) => item.content?.map?.((content) => content.text).filter(Boolean).join(" "))
      .filter(Boolean)
      .join("\n") ||
    rawText;

  return parseAgentJson(outputText);
}

function buildAgentPrompt({ newsUrl, eventText, articleText, holdings }) {
  const holdingText = holdings
    .map((holding) => `${holding.ticker || "UNKNOWN"} ${holding.weight || 0}% ${holding.name || ""}`.trim())
    .join("\n");

  return `
You are the Event Router + Graph Mutation Agent + Company Agent for MarketFlow Graph.

Analyze the external event and return compact JSON only. Do not include markdown.
Use numeric scores strictly in the 0 to 1 range. Do not use percentages like 25 or 85.
Use event_class from this enum when possible: event.cloud_capex, event.export_control, macro.rate_path_lower, product_launch, partnership, earnings_update, unknown.
Use graph node ids from the available graph node examples when possible. If an entity is outside the seed graph, include it in entities but do not invent a source/target id unless needed.
Graph Mutation Agent may propose canonical graph edge lifecycle changes.
Company Agent is different: it creates inference/scenario overlays for impacted company economic twins. It must not claim those overlays are facts.
For company_agent_scenarios, pick up to 4 relevant companies from the available company node ids or portfolio holdings.

News URL:
${newsUrl || "(not provided)"}

User pasted excerpt:
${eventText || "(not provided)"}

Fetched article text:
${articleText ? articleText.slice(0, 6000) : "(not available)"}

Portfolio holdings:
${holdingText || "(not provided)"}

Available graph node examples:
- event.cloud_capex
- event.export_control
- macro.rate_path_lower
- driver.ai_server_demand
- driver.high_speed_networking
- driver.power_cooling
- product.gpu_hbm_cowos
- driver.restricted_shipments
- driver.local_substitution
- segment.hk_china_foundry
- sector.growth_tech
- sector.banks
- company.NVDA
- company.TSM
- company.AVGO
- company.ANET
- company.VRT
- company.0981.HK
- company.1347.HK
- company.AAPL
- company.AMD
- company.ASML
- company.AMAT
- company.LRCX
- company.KLAC
- company.MU
- company.MRVL
- company.SMCI
- company.ETN
- company.PWR
- company.MSFT
- company.AMZN
- company.GOOGL
- company.META
- company.TSLA
- company.ORCL
- company.DELL
- company.JPM
- company.BAC
- company.WMT
- company.COST
- company.HD
- company.CAT
- company.XOM
- company.0700.HK
- company.9988.HK
- company.BIDU
- security.SMH
- security.QQQ
- security.TLT
- security.XLK
- security.XLF
- security.XLY
- driver.ai_inference_workloads
- driver.memory_bandwidth
- driver.data_center_power_grid
- product.custom_ai_asic
- segment.semiconductor_equipment
- segment.optical_interconnect
- driver.equipment_restrictions
- driver.local_ai_stack
- segment.china_cloud_ai
- driver.risk_appetite
- driver.credit_spreads
- driver.consumer_demand
- sector.cloud_platforms
- sector.consumer_retail
- sector.housing
- sector.industrial_capex
- sector.energy

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
  },
  "company_agent_scenarios": [
    {
      "company": "company.NVDA",
      "state_type": "inference | scenario | hypothesis",
      "received_signal": "",
      "materiality": 0,
      "channel": "operating | market | macro | risk | mixed",
      "internal_driver_changes": [{"driver": "revenue | margin | capex | cash_flow | valuation | supply_chain | financing", "direction": "positive | negative | mixed", "reason": ""}],
      "generated_shock": "",
      "edge_proposals": [{"target": "", "operation": "strengthen | weaken | add_candidate | add_monitor", "direction": "positive | negative | mixed", "reason": ""}],
      "observation_tasks": [],
      "portfolio_implication": ""
    }
  ]
}
`;
}

function parseAgentJson(outputText) {
  const cleaned = outputText
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Model did not return JSON: ${cleaned.slice(0, 500)}`);
    return JSON.parse(match[0]);
  }
}

async function fetchArticleText(newsUrl) {
  if (!newsUrl || !/^https?:\/\//i.test(newsUrl)) {
    return { fetched: false, text: "", error: null };
  }

  try {
    const response = await fetch(newsUrl, {
      headers: {
        "User-Agent": "MarketFlowGraphDemo/0.1"
      },
      signal: AbortSignal.timeout(9000)
    });
    const html = await response.text();
    if (!response.ok) {
      return { fetched: false, text: "", error: `${response.status} ${response.statusText}` };
    }
    return { fetched: true, text: htmlToText(html), error: null };
  } catch (error) {
    return { fetched: false, text: "", error: error.message || "fetch failed" };
  }
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 12000);
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  if (typeof req.body === "string") {
    return req.body ? JSON.parse(req.body) : {};
  }

  const chunks = [];
  let length = 0;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > 1_000_000) throw new Error("Request body too large");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload, null, 2));
}
