# Demo 可行性与提交计划分析

## 1. 结论摘要

基于两份材料：

- `/Users/aprueperson/Downloads/作品提交说明.pdf`
- `/Users/aprueperson/Downloads/港美股公开数据源汇总.pdf`

当前公开数据源足够支撑一个有说服力的 hackathon demo，但不适合一开始做全市场、实时、生产级推荐系统。

建议 demo 采用：

```text
有限股票池 + 冻结数据快照 + 少量实时 API 可选增强 + agent 推理展示 + 可解释推荐闭环
```

当前实现状态：

```text
已完成静态 Mock Mode。
已完成本地 Real Model Mode，通过 server.mjs 调用 Ark Responses API。
已用近期 AP 新闻链接完成端到端验证：news URL -> backend article fetch -> Ark agent JSON -> graph mutation -> propagation visualization。
```

核心展示目标不是证明我们已经完成生产级投资系统，而是证明：

```text
外部信息进入
 -> agent 判断事件类型和证据
 -> 更新图谱节点/边
 -> 沿 Operating / Market / Macro Graph 传播影响
 -> 映射到用户 portfolio
 -> 输出新增关注、持有、观察、减配、对冲和解释
```

提交形式建议优先准备：

```text
公网可访问 demo + 录屏 demo + 产品说明文档 + 设计补充文档
```

如果时间或部署稳定性不足，至少应保证：

```text
录屏 demo + 可本地运行或静态公网 demo + 完整产品说明文档
```

`docs/stock-market-graph-design.md` 可以作为补充设计文档随提交材料一并提供。

## 2. 提交要求解读

根据 `作品提交说明.pdf`，必交材料包括：

```text
1. 产品说明文档
2. 作品展示材料
```

产品说明文档建议包含：

```text
1. 项目名称
2. 项目简介
3. 解决的问题或应用场景
4. 核心功能说明
5. AI 使用方式与技术方案
6. 使用的数据来源与数据处理方式
7. 产品运行方式、访问方式或演示方式
8. 项目创新点
9. 当前完成度
10. 风险提示、局限性或未来改进方向
```

作品展示材料二选一：

```text
方式一：公网可访问 Demo
- Demo 链接
- 测试账号或登录方式，如有
- 核心功能体验路径
- 使用步骤
- 注意事项

方式二：录屏 Demo
- 项目简介
- 使用场景说明
- 核心功能演示
- AI 能力展示
- 输入、处理过程和输出结果
- 项目亮点说明
```

可选材料包括：

```text
源码或代码仓库链接
系统架构图
产品截图
API 文档
数据字段说明
模型或提示词设计说明
测试样例
回测结果或实验结果
其他补充材料
```

数据披露要求重点：

```text
可以使用公开数据、自行整理数据、第三方 API、付费数据、自有数据或模拟数据。
如果不能公开原始数据，需要说明数据来源类型、使用方式、时间范围、市场范围、是否涉及敏感信息和合规声明。
可以提供脱敏样例、字段说明、数据处理流程或模拟数据。
不得使用非法获取数据、内幕信息、泄露数据或违反第三方条款的数据。
```

评审重点：

```text
实际完成度
AI 使用合理性
问题定义清晰度
产品可用性
技术实现质量
创新性
展示效果
```

这意味着 demo 必须尽量体现“可运行、可展示、可解释的完整闭环”，不能只提交概念说明或纯 PPT。

## 3. 数据是否足够

### 3.1 足够支撑的部分

公开数据源可以支撑以下 demo 能力：

```text
1. 股票与 ETF 基础行情
   yfinance、Stooq、Alpha Vantage、Twelve Data 可以提供日线 OHLCV、成交量、部分公司行动。

2. 美股财报与公告
   SEC EDGAR、SEC Company Facts 可以提供 10-K、10-Q、8-K、XBRL 财务字段。

3. 港股公告
   HKEXnews 可以提供年报、中报、业绩公告、公司行动等文本材料。

4. 宏观变量
   FRED、World Bank、IMF、U.S. Treasury FiscalData 可以提供利率、CPI、GDP、失业率、国债、财政等变量。

5. 新闻与文本
   SEC Press Releases、Alpha Vantage News、Finnhub News、GDELT、Kaggle financial news 可以支持事件抽取和 NLP demo。

6. Market Graph
   ETF Database、SEC ETF filings、OCC、Cboe、FINRA、HKEX short selling 可以支持 ETF、指数、期权统计、做空等市场结构信息的演示。

7. 标识符映射
   SEC company_tickers、OpenFIGI、LEI 可以支持 ticker、CIK、FIGI、ISIN、实体识别和跨市场映射。
```

因此，对于一个 demo 来说，数据足够覆盖：

```text
Operating Graph
公司、产品、财报、公告、部分客户/供应商、产品事件。

Market Graph
股票、ETF、指数、期权/做空统计、估值和资金流近似指标。

Macro Indicator Graph
利率、通胀、汇率、商品、信用、宏观周期变量。

Event Layer
新闻、公告、财报、监管、产品发布、合作、宏观数据变化。
```

### 3.2 不足或需要谨慎的部分

公开数据源不完全支撑以下能力：

```text
1. 完整供应链和客户金额
   很多公司不会披露具体客户、供应商金额或产品级采购金额。例如英伟达不会完整披露光模块采购金额。

2. 全市场实时行情
   免费行情多为延迟、非官方或有限额度，不适合承诺实时生产级服务。

3. 完整历史 ETF 持仓和指数成分
   当前持仓可以较容易获取，历史成分和授权数据通常受限。

4. 完整期权链和高频波动率数据
   Cboe/OCC 免费数据适合统计和参考，完整链和 tick 数据多为付费。

5. 港股结构化财务解析
   HKEXnews 大量为 PDF/HTML，语言、格式和发布时间需要额外清洗。

6. point-in-time 回测
   财报修订、宏观数据 vintage、指数历史成分和幸存者偏差需要处理，否则不适合做严肃回测结论。

7. 商业再分发
   多数免费源不适合商业再分发或生产展示，需要遵守各平台 Terms。
```

因此，demo 中应明确：

```text
这是原型系统，不承诺实时交易建议。
部分关系来自公开文本、结构化数据和人工整理的 seed graph。
边权和置信度是示范性估计，不代表最终投资评级。
演示数据可以使用公开数据快照和模拟/脱敏样例。
```

### 3.3 建议的数据策略

建议采用三层数据策略：

```text
第一层：Frozen Demo Dataset
为了保证 demo 稳定，先准备一份固定数据快照。
包括公司、产品、边、事件、宏观变量、行情和用户 portfolio。

第二层：Public API Refresh
可选接入少量公开 API，例如 yfinance、SEC Company Facts、FRED。
用于展示系统可以更新，但不依赖实时 API 保证 demo 可用。

第三层：Synthetic / Curated Data
对于供应链、产品级收入、边权、传导关系，使用人工整理或模拟数据。
并在产品说明文档中披露其性质和用途。
```

这样既能满足展示效果，也能降低 API 限额、网络波动和授权风险。

## 4. Demo 应该做到什么程度

### 4.1 推荐 demo 范围

不建议第一版覆盖全港美股。建议选一个高解释度主题：

```text
AI Infrastructure / Semiconductor Supply Chain
```

原因：

```text
新闻密集
产品和供应链关系清晰
财报和公告信息较多
市场关注度高
能同时展示 Operating Graph、Market Graph 和 Macro Graph
```

建议 demo 股票池：

```text
30-80 个核心节点
```

可包括：

```text
云厂商
GPU / AI 芯片
HBM / 存储
先进封装
服务器 ODM
光模块 / 网络设备
液冷 / 电力设备
相关 ETF / 指数
关键宏观变量
```

### 4.2 必须展示的闭环

demo 至少要展示一个完整路径：

```text
用户输入 portfolio holding list
        |
        v
系统接收新闻链接 / 新闻摘要 / 宏观变化
        |
        v
Agent 判断事件类型、实体、证据、重要性
        |
        v
Graph Update Proposal
新增边 / 强化边 / 削弱边 / 更新置信度
        |
        v
Propagation
展示一阶、二阶、三阶影响路径
        |
        v
Portfolio Impact
已有持仓受益 / 受损 / 需观察 / 需减配
        |
        v
Recommendation
新增关注、可买候选、继续持有、减配、对冲、解释
```

### 4.3 建议页面

最小可展示产品可以包含 5 个页面或视图：

```text
1. Portfolio View
用户用 holding list 输入 ticker、权重和名称，并查看行业暴露、主题暴露、风险提示。

2. Event Inbox
新闻链接、新闻摘要、公告/宏观事件列表，以及事件类型、实体、重要性、预期差。

3. Graph Propagation View
展示事件如何沿 Operating / Market / Macro Graph 传播。

4. Recommendation View
输出新增关注、可买候选、继续持有、观察、减配、对冲建议。

5. Evidence & Agent Trace
展示 agent 的抽取结果、证据来源、边更新 proposal、置信度。

6. Company Tree Snapshot
展示部分股票的公司经济体结构，包括业务与产品、收入驱动、成本/产能、财务输出和外部边关系。
```

如果时间有限，可以合并成一个主界面：

```text
左侧：用户 holding list、新闻链接和事件摘要
中间：传播路径 / 图谱
右侧：推荐卡片和证据解释
底部：agent trace / confidence / validation signals
```

### 4.4 建议 demo 剧本

可以准备 2-3 个固定事件脚本：

```text
Scenario 1: 云厂商上调 AI capex
展示正向需求传导：
云厂商 -> AI server -> GPU / HBM / networking / optical module / power equipment

Scenario 2: 美国出口管制加强
展示跨国和监管传导：
政策 -> 先进芯片供应受限 -> 海外供应商风险 -> 国产替代受益链

Scenario 3: 利率路径下修
展示宏观双通道传导：
利率 -> 融资成本 / 折现率 -> 成长股估值 / 高负债公司 / 银行 NIM
```

这三个场景可以分别证明：

```text
Operating Graph 能解释产业链。
Macro Graph 能解释宏观 shock。
Market Graph 能解释资金流和估值。
Agent Layer 能把非结构化事件转成图变化。
Portfolio Layer 能给出用户相关动作。
```

## 5. 录屏还是公网 Demo

### 5.1 推荐策略

建议准备：

```text
公网 demo + 录屏 demo
```

原因：

```text
提交说明中明确公网 demo 会被优先直接体验。
录屏可以作为兜底，避免评审期公网环境、API、登录或网络异常影响展示。
```

### 5.2 公网 Demo 的形态

公网 demo 不一定需要完整生产后端，可以采用：

```text
静态前端 + 冻结 JSON 数据 + 少量后端 API
```

优点：

```text
稳定
部署简单
没有 API key 暴露风险
不受公开 API 限额影响
评委可以直接体验核心流程
```

如果要展示 agent 能力，可以后端提供：

```text
/analyze-event
/propagate
/recommend
```

这些接口可以先基于固定 demo 数据和模型 API 实现，不需要接入全量实时数据。

### 5.3 录屏 Demo 的重点

录屏建议 4-6 分钟，结构如下：

```text
0:00-0:30 项目简介和问题定义
0:30-1:30 用户 portfolio 和事件输入
1:30-2:30 Agent 如何抽取事件并提出图更新
2:30-3:30 图传播路径和 money flow 解释
3:30-4:30 推荐结果：新增、持有、观察、减配、对冲
4:30-5:30 数据来源、AI 使用、创新点和局限性
```

录屏应突出：

```text
AI 不是简单聊天，而是在消化信息、更新图谱、解释路径。
推荐不是黑箱分数，而是有证据、有路径、有置信度。
系统不仅推荐新标的，也会判断已有 portfolio 是否应减配或退出。
```

## 6. 产品说明文档建议结构

建议单独创建一份产品说明文档，文件名可以是：

```text
docs/product-description.md
```

或最终导出为：

```text
产品说明文档.pdf
```

结构按提交要求组织：

```text
1. 项目名称
2. 项目简介
3. 解决的问题或应用场景
4. 核心功能说明
5. AI 使用方式与技术方案
6. 数据来源与数据处理方式
7. 产品运行方式、访问方式或演示方式
8. 项目创新点
9. 当前完成度
10. 风险提示、局限性与未来改进方向
11. 补充材料目录
```

其中第 5 节应重点写：

```text
Agent Layer
Event Router
LLM Extraction
Graph Mutation Proposal
Typed Directed Propagation
Confidence Management
Portfolio Recommendation
Explanation Generation
```

第 6 节应重点披露：

```text
公开数据源类型
是否使用模拟/人工整理 seed graph
数据时间范围和市场范围
不包含个人信息、内幕信息或非公开数据
免费 API 和第三方数据的使用限制
```

第 11 节可以列：

```text
docs/stock-market-graph-design.md
docs/demo-feasibility-and-submission-plan.md
系统架构图
数据字段说明
录屏链接
公网 demo 链接
可选源码或 README
```

## 7. 建议提交包结构

最终提交压缩包可以组织为：

```text
姓名-项目名称.zip
├── 产品说明文档.pdf
├── 作品展示材料.md
├── demo-link.txt
├── recording-link.txt
├── docs/
│   ├── stock-market-graph-design.md
│   ├── demo-feasibility-and-submission-plan.md
│   ├── data-source-disclosure.md
│   └── system-architecture.md
├── screenshots/
│   ├── portfolio-view.png
│   ├── graph-propagation-view.png
│   └── recommendation-view.png
└── optional-source-or-repo-link.txt
```

如果源码不公开，也可以只提供：

```text
公网 demo
录屏 demo
产品说明文档
设计补充文档
数据披露说明
```

## 8. 当前建议的下一步

建议下一步不直接开写完整 demo，而是先完成三件事：

```text
1. 定义 demo scope
   选定主题、股票池、事件脚本和用户 portfolio 示例。

2. 定义 frozen demo dataset
   确定需要哪些 JSON/SQLite 表：companies、products、edges、events、macro、securities、portfolio。

3. 起草产品说明文档
   按提交要求写第一版，先不依赖最终代码完成。
```

随后再进入实现：

```text
Phase 1: 静态 demo 数据 + 前端原型
Phase 2: agent API 接入 + 事件分析
Phase 3: 图传播与推荐结果生成
Phase 4: 公网部署 + 录屏 + 提交材料打包
```

## 9. 暂不建议做的事

第一版 demo 暂不建议：

```text
全市场覆盖
实时行情承诺
真实买卖信号
完整历史回测
复杂 GNN 训练
全自动供应链发现
完整期权链分析
付费数据深度接入
```

这些方向可以作为未来计划，但不应成为 hackathon demo 的关键路径。
