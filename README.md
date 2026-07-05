# Agentic Stock Graph

MarketFlow Graph is an agent-assisted stock market graph demo. It turns a user's portfolio and an external event into structured event extraction, graph mutation proposals, propagation paths, portfolio impact, and recommendation actions.

## Public Demo

```text
https://agentic-stock-graph-eight.vercel.app/demo/
```

Health check:

```text
https://agentic-stock-graph-eight.vercel.app/health
```

## What To Try

1. Open the public demo.
2. Keep or edit the portfolio holdings list.
3. Click one of the built-in news samples, or paste a news URL / excerpt.
4. Click `Analyze propagation`.
5. Review:
   - News URL Extraction Preview
   - Before / After Graph Mutation
   - Company Agent Sandbox
   - Propagation network
   - Portfolio impact and recommendation actions

## Repository Structure

```text
api/                 Vercel serverless API routes
public/demo/         Public Vercel static demo
demo/                Local demo source
docs/                Product, design, deployment, and API documents
submission/          Submission-facing checklist and showcase materials
tools/               Ark API smoke-test scripts
server.mjs           Local Node development server
```

## Local Development

Create a local `.env` from `.env.example`, then run:

```bash
ARK_API_KEY=... PORT=5176 node server.mjs
```

Open:

```text
http://localhost:5176/demo/
```

Run checks:

```bash
npm run check
```

## Notes

This is a hackathon demo, not an investment advisory product. The graph seed is curated for demonstration, and outputs are explanation-oriented scenario results rather than trading signals.
