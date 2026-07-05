# Works Showcase Materials

## Demo Link

https://agentic-stock-graph-eight.vercel.app/demo/

No login is required.

## Core Experience Path

1. Open the demo link.
2. Use the default portfolio or edit the holdings list.
3. Select one of the built-in demo news samples, or paste a news URL / excerpt.
4. Click `Analyze propagation`.
5. Read the result from top to bottom:
   - News URL Extraction Preview
   - Node / Edge Inventory
   - Before / After Graph Mutation
   - Company Agent Sandbox
   - Graph Snapshot
   - Propagation network
   - Portfolio impact and recommendation actions
   - Agent Trace and Evidence

## Demo Script

Recommended first run:

```text
Scenario: Meta AI compute / cloud capex
Portfolio: default AI infrastructure portfolio
Expected output:
news extraction -> cloud capex event -> strengthened AI server, networking, power/cooling paths -> impacted META/NVDA exposure -> new candidates such as ANET/VRT/AVGO.
```

Second run:

```text
Scenario: Nvidia China / export control
Expected output:
export-control risk path -> NVDA risk, local substitution, Hong Kong / China AI chain candidates.
```

Third run:

```text
Scenario: Treasury yields / rate path
Expected output:
macro rate-path-lower event -> market graph path -> TLT/QQQ/growth tech effect.
```

## AI Capability Shown

The demo uses an Ark model backend to parse external events into structured JSON:

```text
event extraction
 -> entity extraction
 -> graph mutation proposal
 -> company-agent scenario overlay
 -> recommendation context
```

The front end then shows how the event propagates through the typed graph and how it affects the user's portfolio.

## Notes For Reviewers

- The demo is public and does not require an account.
- The graph seed is curated and frozen for demo stability.
- Some news websites block server-side article fetching; the pasted excerpt field is the fallback.
- Output is for product demonstration only and is not investment advice.

## Supplementary Materials

- Product document: `docs/product-description.md`
- System design: `docs/stock-market-graph-design.md`
- Demo feasibility and submission plan: `docs/demo-feasibility-and-submission-plan.md`
- Ark integration notes: `docs/ark-api-integration.md`
- Deployment guide: `docs/vercel-deployment.md`
- Architecture image: `docs/架构图.png`
