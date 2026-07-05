# Ark API Integration Notes

Source: https://ark.volcengine.com/region:cn-beijing/docs/82379/1099455?lang=zh

## Current Model

```text
model: doubao-seed-2-1-pro-260628
base_url: https://ark.cn-beijing.volces.com/api/v3
endpoint: POST /responses
auth: Authorization: Bearer $ARK_API_KEY
```

## Smoke Test

Run after setting an API key:

```bash
ARK_API_KEY=... node tools/ark-smoke-test.mjs
```

Optional overrides:

```bash
ARK_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
ARK_MODEL_ID=doubao-seed-2-1-pro-260628
```

Current local check:

```text
Endpoint reachability: ok
Unauthenticated response: 401 Unauthorized
Meaning: network path works; real model test still needs ARK_API_KEY.
```

## First Real Agent Test

Status:

```text
Connectivity smoke test: ok
Business prompt test: ok
Model returned: extraction, graph_mutations, recommendation_context
Test event: cloud provider raises FY2026 AI data center capex guidance
Observed paths: AI server demand, high-speed networking, GPU/HBM/CoWoS, power/cooling, NVDA, TSM, AVGO, ANET, VRT, SMH
```

## Real News Link Tests

Status:

```text
2026-07 recent news tests: ok

1. Meta AI compute / cloud business
   Source: Business Insider
   Result: model identified AI capex, AI server demand, high-speed networking, GPU/HBM/CoWoS, power/cooling, NVDA/TSM/AVGO/ANET/VRT/SMH, and competitive risk for AWS/Azure/Google Cloud.

2. Nvidia China AI chip sales / Huawei / export controls
   Source: AP
   Result: model identified export-control negative path for NVDA and SMH plus local substitution signal. After prompt tightening, strength_delta and confidence stayed in 0-1 range.

3. Treasury yields fall after jobs report
   Source: MarketWatch
   Result: model identified macro rate-path-lower path for TLT, QQQ, and SMH.
```

## Demo Product Integration

The static front end should not call Ark directly because browser-side calls would expose the API key. The current demo therefore adds a local Node backend:

```text
POST /api/analyze-news
  input: news_url, pasted_excerpt, portfolio_holdings
  server:
    1. fetch/read article text
    2. call Ark Responses API
    3. validate strict JSON
    4. return extraction, graph_mutations, propagation_paths, recommendations
```

Implemented files:

```text
server.mjs
demo/app.js
demo/index.html
demo/styles.css
```

Run:

```bash
ARK_API_KEY=... PORT=5176 node server.mjs
```

Open:

```text
http://localhost:5176/demo/
```

Current local UI check:

```text
Real model mode: ok
Test news: AP - Nvidia's AI chip sales in China stall, as local chipmakers like Huawei take the lead
Article fetch: ok
Mutation cards rendered: 5
Active edge cards rendered: 8
Browser console errors: none
Horizontal overflow: none
```

## First Agent JSON Contract

```json
{
  "extraction": {
    "normalized_trigger": "",
    "event_class": "",
    "entities": [],
    "key_signals": [],
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
      "internal_driver_changes": [
        {
          "driver": "revenue | margin | capex | cash_flow | valuation | supply_chain | financing",
          "direction": "positive | negative | mixed",
          "reason": ""
        }
      ],
      "generated_shock": "",
      "edge_proposals": [
        {
          "target": "",
          "operation": "strengthen | weaken | add_candidate | add_monitor",
          "direction": "positive | negative | mixed",
          "reason": ""
        }
      ],
      "observation_tasks": [],
      "portfolio_implication": ""
    }
  ]
}
```

`company_agent_scenarios` belongs to inference / scenario overlay. It should not be treated as a canonical graph write unless later evidence confirms it and a Graph Update Agent upgrades the relation.
