# 股票市场动态图谱推荐 Demo

这是一个无依赖前端 + 轻量 Node 后端的单页 demo，用于展示：

```text
portfolio + external event
 -> agent analysis
 -> graph mutation proposal
 -> propagation path
 -> portfolio impact
 -> recommendation actions
```

## 运行方式

Mock 模式可以直接用浏览器打开：

```text
demo/index.html
```

也可以启动任意静态文件服务：

```bash
python3 -m http.server 5173
```

然后访问：

```text
http://localhost:5173/demo/
```

Real model 模式需要启动本地 Node server，并通过环境变量提供 Ark API key：

```bash
ARK_API_KEY=... PORT=5176 node server.mjs
```

然后访问：

```text
http://localhost:5176/demo/
```

浏览器前端不会保存或暴露 API key。`server.mjs` 会提供：

```text
POST /api/analyze-news
```

该接口会 best-effort 抓取新闻 URL 正文，调用 Ark Responses API，并把结构化 agent JSON 返回给前端。如果新闻站点拒绝抓取，接口会回退到用户粘贴的 excerpt。

## 当前能力

- 选择 preset portfolio。
- 用 list 方式编辑 portfolio holdings。
- 输入新闻链接。
- 提供三条 demo news samples：Meta excess AI compute、Nvidia China/export control、Treasury yields/rate path。
- 粘贴新闻摘要，系统根据 URL 和文本自动推断事件类型。
- 在 Mock / Real model 两种模式之间切换。
- Real model 模式通过本地后端调用 Ark 模型，将真实新闻链接和摘要转为 extraction、graph mutation 和 recommendation context。
- 展示 News URL Extraction Preview，包括事件类型、实体、关键信号和证据片段。
- 展示 agent trace。
- 展示 Before / After Graph Mutation，说明 agent 如何新增、强化、激活或监控 edge。
- 展示 Company Agent Sandbox，说明公司经济体如何基于入边信号做 inference / scenario 推演，但不写入 canonical graph。
- 展示 Node / Edge Inventory，包括 seed graph 和当前 active graph 的节点、边、layer、channel、lifecycle 统计。
- 展示三层异质图谱状态，包括 active nodes、directed edges、layer、node type 和 edge lifecycle。
- 展示 active edge signals，包括 edge direction、strength、confidence、lag 和证据信号。
- 展示传导路径可视化，包括网络图和分阶段路径图。
- 展示 Company Tree Snapshot。
- 输出已有持仓影响。
- 输出新增关注、持有、观察、对冲等动作。
- 当前 graph seed 已扩展到 35 个可传播公司节点，覆盖半导体、云平台、电力设备、金融、零售、住房、能源和中国云 AI 等路径。

## 当前 Agent 环节

```text
News URL Agent
后端 best-effort 抓取新闻正文；失败时使用用户粘贴摘要。

Event Router / Entity Extraction / Graph Mutation Agent
由 Ark 模型在一次结构化 JSON 调用中完成，输出 extraction、edge mutation proposal 和 recommendation context。

Company Agent / Economic Twin Agent
优先展示模型返回的 company_agent_scenarios；若模型未返回，则根据 active graph、入边强度和持仓生成 deterministic scenario overlay。该输出只属于 inference / scenario，不直接写入 canonical graph。

Propagation Reasoning
当前由前端图谱规则执行，沿 active edges 展示传导路径。

Recommendation Agent
使用模型 recommendation_context 与 demo graph 规则共同生成推荐解释。
```

## Demo News Samples

```text
Meta compute
https://www.businessinsider.com/meta-stock-cloud-computing-ai-compute-tech-stocks-data-centers-2026-7

Nvidia China
https://apnews.com/article/1ae6228c4928ddbb43f984e9b38f49dd

Treasury yields
https://www.marketwatch.com/livecoverage/stock-market-today-dow-jones-s-p-500-nasdaq-key-unemployment-jobs-data-june/card/treasury-yields-fall-as-rate-hike-odds-drop-JzOl2rDdj6AJAEmrVu7g
```

## 当前限制

- 图谱仍是人工整理的 seed graph，已经使用显式 `nodes[]` 和 `edges[]` 表达，但传播算法仍是 demo 规则。
- Real model 模式只替换新闻理解和 edge mutation proposal，尚未实现完整生产级多 agent 编排。
- 新闻正文抓取是 best-effort；部分网站会因权限、反爬或 paywall 返回失败，此时需要粘贴摘要作为 fallback。
- Mock mode 已从正式页面入口隐藏，仅作为模型/API 失败时的 fallback。
- 不接实时行情和真实新闻 API。
- 输出仅用于产品演示，不构成投资建议。

## 后续扩展真实 Agent Workflow

当前 Real model 模式已经打通第一版 Event Router + Graph Mutation Agent。后续可以继续拆分为：

```text
Event Router Agent
Entity Extraction Agent
Graph Mutation Agent
Propagation Reasoning Agent
Recommendation Explanation Agent
```

建议接口继续保持严格 JSON 输出，前端继续展示 agent trace 与推荐解释。

新闻链接接入真实 agent 后，建议后端流程为：

```text
news_url
 -> backend fetch / reader tool
 -> article extraction
 -> event router
 -> entity extraction
 -> graph mutation
 -> propagation
 -> recommendation explanation
```

## Ark API 连通性测试

根据火山方舟文档，当前模型调用使用：

```text
base_url: https://ark.cn-beijing.volces.com/api/v3
endpoint: /responses
model: doubao-seed-2-1-pro-260628
env: ARK_API_KEY
```

设置 API key 后可运行：

```bash
ARK_API_KEY=... node tools/ark-smoke-test.mjs
```

也可以运行端到端 demo：

```bash
ARK_API_KEY=... PORT=5176 node server.mjs
```

并在页面选择 `Real model` 后输入新闻链接验证。
