# Submission Checklist

## Required Materials

- [x] Product description document: `docs/product-description.md`
- [x] Public demo: https://agentic-stock-graph-eight.vercel.app/demo/
- [x] Demo access method: no login required
- [x] Core usage path: `submission/showcase-materials.md`
- [x] Notes and limitations: `docs/product-description.md`

## Optional Materials Included

- [x] Source repository: https://github.com/HendrixityBorg/Agentic-Stock-Graph
- [x] Root README: `README.md`
- [x] System architecture / design document: `docs/stock-market-graph-design.md`
- [x] API integration notes: `docs/ark-api-integration.md`
- [x] Deployment guide: `docs/vercel-deployment.md`
- [x] Data source and feasibility discussion: `docs/demo-feasibility-and-submission-plan.md`
- [x] Environment variable template: `.env.example`

## Verified On 2026-07-05

- [x] `/` redirects to `/demo/`
- [x] `/demo/` returns HTTP 200
- [x] `/health` returns HTTP 200
- [x] `/api/health` returns HTTP 200
- [x] `arkApiConfigured` returns `true`
- [x] `/api/analyze-news` returns a real model response with extraction, graph mutations, recommendation context, and company agent scenarios
- [x] `npm run check` passes locally

## Still Recommended Before Final Submission

- [ ] Record a 4-6 minute demo video as fallback material
- [ ] Capture 3-5 screenshots for quick visual review
- [ ] Export `docs/product-description.md` to PDF if the submission portal prefers PDF
- [ ] Package final materials as `姓名-MarketFlow Graph.zip`
