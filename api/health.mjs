const ARK_MODEL_ID = process.env.ARK_MODEL_ID || "doubao-seed-2-1-pro-260628";
const ARK_API_KEY = process.env.ARK_API_KEY;

export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  sendJson(res, 200, {
    status: "ok",
    service: "marketflow-graph-demo",
    model: ARK_MODEL_ID,
    arkApiConfigured: Boolean(ARK_API_KEY)
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload, null, 2));
}
