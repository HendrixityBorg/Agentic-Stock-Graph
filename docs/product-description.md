# 产品说明文档：MarketFlow Graph

## 1. 项目名称

MarketFlow Graph：股票市场动态图谱与 Agent 推荐 Demo

## 2. 项目简介

MarketFlow Graph 是一个面向港美股研究场景的动态图谱推荐系统 demo。它以用户已有 portfolio 和外部事件为输入，通过 agent 解析新闻、财报、宏观变化或产品事件，并将这些信息转化为图谱节点和边的变化，再沿 Operating Graph、Market Graph 和 Macro Indicator Graph 传播影响，最终输出组合影响、关注名单、可买候选、减配/退出提示、对冲建议和解释路径。

本 demo 的目标不是给出生产级交易信号，而是展示一个可解释的投研辅助闭环：

```text
portfolio + external event
 -> agent analysis
 -> graph mutation
 -> propagation path
 -> portfolio impact
 -> recommendation actions
```

## 3. 解决的问题或应用场景

传统资讯流通常只能告诉用户“发生了什么”，普通选股工具则往往只给出黑箱分数。投资者真正需要的是：

```text
这条信息会影响我已有的哪些持仓？
影响通过什么产业链、财务或市场资金路径传导？
哪些新标的值得关注？
哪些已有持仓需要观察、减配、退出或对冲？
这个判断有哪些证据和不确定性？
```

MarketFlow Graph 试图把新闻、公告、财报、宏观数据和市场结构信号转化为可解释的资金流和产业链传导路径。

## 4. 核心功能说明

当前 demo 包含：

```text
1. Portfolio 输入
   用户可以选择 preset portfolio，也可以用 list 方式编辑 ticker、权重和名称。

2. Event 输入
   用户可以输入新闻链接，也可以粘贴新闻摘要或事件文本；系统根据 URL 和文本自动推断事件类型。Demo 提供三条样例新闻：Meta excess AI compute、Nvidia China/export control、Treasury yields/rate path。

3. News URL Extraction Preview
   展示新闻链接或摘要被 agent 抽取后的结构化结果，包括 normalized trigger、event class、entities、key signals 和 evidence snippets。

4. Node / Edge Inventory
   展示 seed graph 与当前 active graph 的节点、边、layer、channel、lifecycle 统计，帮助读者区分“系统已有图谱规模”和“本次新闻激活的局部子图”。

5. Before / After Graph Mutation
   展示 Graph Mutation Agent 如何把外部信息转化为 edge lifecycle 调整，例如新增候选边、强化边、激活风险边、加入监控边。

6. Company Agent Sandbox
   展示 Company Agent / Economic Twin Agent 如何读取公司子图、入边信号和持仓暴露，生成 inference / scenario overlay，包括内部 driver changes、generated shock、edge proposals、observation tasks 和 portfolio implication。该推演不直接写入 canonical graph。

7. Agent Trace
   展示 News URL、Event Router、Entity Extraction、Graph Mutation、Propagation Reasoning、Recommendation Agent 的处理过程。

8. Graph Snapshot
   展示当前场景激活的三层异质图谱状态，包括 node type、layer、directed edge、edge lifecycle、strength、confidence、lag 和证据信号。

9. 传导路径可视化
   通过网络图和分阶段路径图，将事件从 trigger、drivers、supply chain、assets 一路传导到 portfolio action。

10. Company Tree Snapshot
   展示部分股票的公司经济体结构，包括业务与产品、收入驱动、成本/产能、财务输出和外部边关系。

11. Portfolio Impact
   展示已有持仓受到正向、负向、混合或市场通道影响。

12. Recommendation Actions
   输出 Add、Hold、Monitor、Reduce、Exit、Hedge 等动作类型。

13. Evidence & Validation Signals
   展示证据、关键假设、置信度和后续验证信号。
```

## 5. AI 使用方式与技术方案

本项目的 AI 角色不是单纯聊天，而是作为图谱演进的 agent layer。

核心 agent 设计：

```text
Event Router Agent
判断事件类型：财报、产品、合作、监管、宏观、市场结构等。

Entity Extraction Agent
抽取公司、产品、行业、地区、宏观变量、金融资产。

Graph Mutation Agent
判断事件会新增、强化、削弱或降级哪些 node / edge。

Company Agent / Economic Twin Agent
围绕公司经济体做 inference / scenario 推演，判断入边信号是否影响收入、毛利、capex、现金流、供应链、融资或估值，并提出观察任务和潜在 edge proposal。该 agent 不直接写入 canonical graph。

Propagation Reasoning Agent
解释影响如何沿 Operating / Market / Macro Graph 传播。

Recommendation Explanation Agent
把传播结果转成用户 portfolio 动作和可读解释。
```

当前 demo 提供两种分析模式：

```text
Mock Mode:
使用 frozen dataset 和 deterministic mock response，保证演示稳定。

Real Model Mode:
通过本地 Node 后端读取新闻 URL / 用户粘贴摘要，调用 Ark Responses API，并返回严格 JSON 格式的 extraction、graph mutation 和 recommendation context。
```

后续如果扩展为完整生产级 agent workflow，每个 agent 将使用严格 JSON schema 输出：

```text
news URL / raw event
 -> article extraction
 -> event type
 -> entities
 -> graph mutation proposal
 -> propagation paths
 -> recommendation explanation
```

AI 与图算法的分工：

```text
Agent / LLM:
负责理解非结构化信息、提取实体、生成候选边、整理证据和解释；Company Agent 额外负责公司经济体的 inference / scenario overlay。

Graph Propagation:
负责沿有向边做 typed propagation，计算一阶、二阶、三阶影响。

Quantitative Layer:
负责校准边权、置信度和事件有效性。第一版 demo 暂用规则和 mock score。
```

模型 API 接入准备：

```text
供应商：火山方舟 Ark
base_url：https://ark.cn-beijing.volces.com/api/v3
endpoint：/responses
model：doubao-seed-2-1-pro-260628
auth：Authorization: Bearer $ARK_API_KEY
本地测试脚本：tools/ark-smoke-test.mjs
本地 demo 后端：server.mjs
前端调用接口：POST /api/analyze-news
```

## 6. 使用的数据来源与数据处理方式

当前 demo 使用：

```text
1. 人工整理的 frozen demo graph seed
   包括公司、产品、供应链、市场资产、宏观变量和边关系。当前前端已经用显式 nodes[] 和 edges[] 表达 typed heterogeneous directed graph，并扩展到 35 个可传播公司节点。

2. 新闻 URL 与用户粘贴摘要
   Real Model Mode 下，本地后端会 best-effort 抓取新闻正文并交给模型；如果新闻站点拒绝抓取，则回退到用户粘贴摘要。

3. 模拟推荐结果和置信度
   用于展示产品逻辑，不代表真实投资评级。Real Model Mode 会替换新闻抽取和边变更建议，但最终推荐仍是 demo 级规则映射。
```

当前 demo 不在浏览器侧直接调用模型或抓取正文，而是通过本地后端处理新闻 URL 和 Ark API key。新闻正文读取仍需要遵守目标网站条款、API 限额和授权要求。

后续可接入的数据源类型：

```text
行情数据：Yahoo Finance / yfinance、Stooq、Alpha Vantage、Twelve Data
美股财报：SEC EDGAR、SEC Company Facts
港股公告：HKEXnews
宏观数据：FRED、World Bank、IMF、U.S. Treasury FiscalData
新闻文本：SEC Press Releases、Finnhub、Alpha Vantage News、GDELT、Kaggle financial news
市场结构：ETF Database、SEC ETF filings、OCC、Cboe、FINRA、HKEX short selling
标识符：SEC company_tickers、OpenFIGI、LEI
```

数据合规声明：

```text
当前 demo 不包含个人信息、内幕信息、泄露数据或非公开数据。
公开数据源如用于生产或商业展示，需要遵守对应平台 Terms、API 限额和交易所授权规则。
若使用第三方付费 API 或用户自有数据，将在正式提交中单独披露来源、用途和授权范围。
```

## 7. 产品运行方式、访问方式或演示方式

公网 demo：

```text
https://agentic-stock-graph-eight.vercel.app/demo/
```

健康检查：

```text
https://agentic-stock-graph-eight.vercel.app/health
```

源码仓库：

```text
https://github.com/HendrixityBorg/Agentic-Stock-Graph
```

当前本地运行方式：

```text
直接打开 demo/index.html
```

或启动静态文件服务，仅使用 Mock Mode：

```bash
python3 -m http.server 5173
```

然后访问：

```text
http://localhost:5173/demo/
```

如需使用 Real Model Mode，启动本地 Node 后端：

```bash
ARK_API_KEY=... PORT=5176 node server.mjs
```

然后访问：

```text
http://localhost:5176/demo/
```

Vercel 公网部署使用：

```text
public/demo/              静态前端页面
api/analyze-news.mjs      新闻分析与 Ark 模型调用接口
api/health.mjs            部署健康检查接口
```

提交阶段建议提供：

```text
公网 demo 链接：已提供
录屏 demo 链接：建议作为兜底材料补充
产品说明文档：当前为 Markdown，可按需要导出 PDF
补充设计文档 docs/stock-market-graph-design.md
Demo 可行性与提交计划 docs/demo-feasibility-and-submission-plan.md
```

## 8. 项目创新点

```text
1. 将外部新闻/宏观信息视为图谱演进 trigger，而不是简单情绪标签。
2. 将公司节点拆成公司经济体，关注产品、收入、成本、融资、现金流和市场资产映射。
3. 使用 Operating Graph、Market Graph、Macro Indicator Graph 三层逻辑图谱。
4. 通过 agent 将非结构化信息转化为 node / edge mutation proposal。
5. 推荐不仅包括新增标的，也包括已有持仓的持有、观察、减配、退出和对冲。
6. 输出传导路径、证据、置信度和验证信号，而不是黑箱买卖结论。
```

## 9. 当前完成度

已完成：

```text
1. 初步系统设计文档
2. Demo 可行性与提交计划文档
3. 静态单页 demo
4. Frozen demo data
5. Mock agent trace
6. 传导路径可视化
7. Portfolio impact 与 recommendation output
8. Graph Snapshot 与 active edge signal 展示
9. News URL Extraction Preview
10. Before / After Graph Mutation
11. 网络图形式的传播路径可视化
12. Ark API smoke test 脚本与接入说明
13. 本地 Node 后端 `server.mjs`
14. Real Model Mode UI
15. `POST /api/analyze-news` 端到端链路
16. 使用近期 AP 新闻链接完成真实模型验证
17. 将正式页面入口改为默认 Real Model，隐藏 Mock Mode，仅保留失败 fallback
18. 将 graph seed 扩展到 35 个公司传播节点，覆盖半导体、云平台、电力、金融、零售、住房、能源和中国云 AI 路径
19. 增加 Company Agent Sandbox，展示公司经济体层面的 inference / scenario 推演
20. 增加 Node / Edge Inventory，展示 seed graph 与 active graph 统计
21. 增加三条 demo news samples，支持稳定录屏和现场展示
```

待完成：

```text
1. 将第一版 Real Model Mode 拆成更完整的多 agent workflow。
2. 完善 agent JSON schema、fallback、输出校验和异常恢复。
3. 补充更多 demo 事件和股票池。
4. 录制演示视频，作为公网 demo 的兜底展示材料。
5. 导出最终产品说明文档 PDF（如提交平台偏好 PDF）。
6. 补充产品截图，帮助评委快速理解界面。
```

## 10. 风险提示、局限性与未来改进方向

当前局限：

```text
1. demo 使用 frozen graph seed，不是实时投研系统。
2. Real Model Mode 可以 best-effort 抓取新闻正文，但不是合规新闻 API 或生产级 reader。
3. 边权和置信度是示范性估计，未经过完整回测校准。
4. 公开数据源存在延迟、额度、授权和字段稳定性限制。
5. 供应链和产品级金额很多时候无法从公开财报完整获得。
6. 当前 demo 不构成投资建议，也不提供交易信号。
```

未来改进：

```text
1. 扩展模型 API 编排，实现完整真实 agent workflow。
2. 建立更严格 JSON schema、fallback 和输出校验机制。
3. 接入 SEC、HKEXnews、FRED、行情和新闻数据源。
4. 引入 edge lifecycle，让关系从候选、假设、确认、重要、衰减到退休持续演化。
5. 引入行业专属 operating template，扩展到金融、零售、能源、医药和公用事业。
6. 增加回测和验证模块，校准边权和推荐有效性。
7. 支持用户自定义 graph overlay 和个性化 portfolio 约束。
```
