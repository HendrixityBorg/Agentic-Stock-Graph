# Vercel Deployment Guide

This demo should be deployed as a Node.js server because `/api/analyze-news` calls Ark from the backend.

## 1. Repository

Push this project root to GitHub. The root should contain:

- `server.mjs`
- `package.json`
- `vercel.json`
- `demo/`
- `docs/`

Do not commit API keys.

## 2. Import Project

In Vercel:

1. Add New Project.
2. Import the GitHub repository.
3. Set Framework Preset to `Other`.
4. Keep Root Directory as the repository root.
5. Leave Build Command and Output Directory empty unless Vercel asks for a value.

Vercel detects `server.mjs` in the project root and captures `server.listen()` as a Node.js Function. Do not add a `functions.server.mjs` rule in `vercel.json`; Vercel's `functions` patterns are for functions inside the `/api` directory and will fail with a pattern-mismatch error.

## 3. Environment Variables

Set these variables in Project Settings -> Environment Variables:

```text
ARK_API_KEY=<provided key>
ARK_MODEL_ID=doubao-seed-2-1-pro-260628
ARK_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
```

Apply them to Production. If you also use Preview deployments, apply them to Preview as well.

## 4. Deploy

Trigger a deployment from Vercel. After deployment, open:

```text
https://<project-name>.vercel.app/health
https://<project-name>.vercel.app/demo/
```

`/health` should return:

```json
{
  "status": "ok",
  "service": "marketflow-graph-demo",
  "model": "doubao-seed-2-1-pro-260628",
  "arkApiConfigured": true
}
```

Then test `/demo/` with one of the built-in news samples.

## 5. Troubleshooting

- If `/health` returns `arkApiConfigured: false`, check `ARK_API_KEY` in Vercel environment variables and redeploy.
- If `/demo/` returns 404, confirm `server.mjs` is in the repository root.
- If deploy fails with `The pattern "server.mjs" defined in functions doesn't match any Serverless Functions inside the api directory`, remove the `functions` block from `vercel.json` and redeploy.
- If analysis times out, retry with pasted article text. Some publishers block server-side article fetching.
- If a news site cannot be fetched, the demo can still run from the pasted excerpt field.
