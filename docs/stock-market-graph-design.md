# 股票市场动态图谱推荐系统初步设计文档

## 1. 背景与目标

我们希望构建一个面向股票市场的动态图谱系统，通过公司经营关系、金融市场关系和宏观变量关系，将外部新闻、财报、公告、宏观数据、产品变化等信息转化为可解释的投资关注和组合推荐。

系统的核心目标不是简单预测股价，也不是只做价格相关性网络，而是回答：

- 一条新信息改变了哪些公司、产品、产业链、财务驱动项或市场资产关系？
- 这些变化会沿着哪些路径传导？
- 对用户当前持仓或关注池有什么潜在影响？
- 哪些标的值得关注、进一步研究、增配、减配或规避？
- 未来一段时间内，哪些公司、产品、资产或主题可能出现更好的资金流入？

初期系统定位为“投资研究与组合辅助决策系统”，输出应强调解释、证据、置信度和风险，而不是直接给出无条件买卖结论。

系统的核心主线可以概括为：

```text
追踪 money flow
 -> 公司内部经营活动如何改变资金流入/流出
 -> 公司之间经营关系如何传导资金流
 -> 宏观变量如何改变资金成本、需求和风险偏好
 -> 市场结构如何放大或削弱资金流
 -> 判断未来一段时间内哪些标的可能获得更好的 flow in
```

### 1.1 文档阅读路径

为了方便理解，本文可以按四层阅读：

```text
第一层：系统为什么存在
1. 背景与目标
2. 总体架构
3. 产品形态

第二层：图谱本身如何构建
4. Operating Graph
5. Market Graph
6. Macro Indicator Graph
7. Edge 设计

第三层：新信息如何让图谱演进
8. 外部信息与图谱演进
9. Agent 的角色
10. Agent 架构
11. 假设推演与 Company Agent
12. 图算法与影响传播

第四层：如何形成产品输出
13. 推荐逻辑
14. MVP 范围
15. 数据与验证
16. 核心原则
17. 下一步
```

整体逻辑是：

```text
外部信息进入
 -> agent 消化信息并提出图谱变化
 -> 节点和边状态更新
 -> 必要时进入 inference / scenario 推演
 -> 图算法传播影响
 -> 映射到用户组合
 -> 输出关注、买入候选、减配、退出、对冲和解释
```

## 2. 总体架构

系统可以在产品和模型层面拆成三层图谱：

```text
                         External Triggers
          news / filings / earnings / policy / macro data / market data
                                      |
                                      v
                         Macro Indicator Graph
              rates / inflation / FX / commodities / credit / policy
                         |                         |
                         | Fundamental Channel     | Market Channel
                         v                         v
        Operating Graph ---------------------> Market Graph
 company / product / customer / supplier       securities / ETF / options
 revenue / cost / capex / inventory / FCF      valuation / liquidity / flow
                         |                         |
                         v                         v
                 Company Impact            Market Flow Impact
           revenue / margin / cash flow    multiple / factor / fund flow
                         |                         |
                         +------------+------------+
                                      v
                         Portfolio Recommendation
              add / monitor / hold / reduce / exit / hedge / explain
```

也可以理解为两条主要传导路径：

```text
Fundamental Path:
external trigger -> Macro / Operating Graph -> company impact -> portfolio action

Market Path:
external trigger -> Macro / Market Graph -> valuation / flow impact -> portfolio action
```

三层图谱分别代表：

1. **Operating Graph**
   真实经营世界，包括公司、业务线、产品、客户、供应商、成本项、产能、库存、财务驱动项等。

2. **Market Graph**
   金融市场世界，包括股票、期权、ETF、指数、可转债、债券、资金流、估值、流动性、拥挤度等。

3. **Macro Indicator Graph**
   外部宏观状态世界，包括利率、通胀、汇率、商品价格、PMI、信用利差、政策、监管、地缘风险、经济周期等。

工程实现上可以采用统一的异质动态图：

```text
Node {
  id,
  type,
  layer,
  attributes,
  updated_at
}

Edge {
  source,
  target,
  relation_type,
  channel,
  direction,
  strength_range,
  lag,
  duration,
  confidence,
  evidence,
  status,
  updated_at
}
```

也就是说，逻辑上讲三层，存储和传播上是一张带 `layer`、`channel`、`type` 标签的统一图。

## 3. 产品形态

推荐采用：

```text
后台 canonical graph + 用户 personalized overlay
```

后台维护一套稳定、可验证、可回测的基础图谱。用户不需要从零搭图，而是在基础图谱上叠加：

- 当前持仓
- 关注股票
- 投资期限
- 风险偏好
- 禁买行业或标的
- 单票/行业权重约束
- 用户自定义观点

用户侧主要使用场景：

1. 查看当前持仓受哪些新闻、宏观变量、产业链事件影响。
2. 从某条新闻、某个宏观变量或某家公司出发，查看传导路径。
3. 发现可关注、可买、需减配或需避开的标的。
4. 对系统边关系、置信度或观点做个人化修正，形成用户 overlay。

### 3.1 用户输入与系统输出

初期用户输入可以分为四类：

```text
1. Existing Portfolio
   用户已有持仓、成本、权重、持仓期限、风险偏好。

2. Watchlist / Interest
   用户关注的公司、行业、主题、产品或宏观变量。

3. External Trigger
   用户主动输入或系统自动抓取的新闻、公告、财报、宏观数据、产品发布。

4. User Constraints / Views
   禁买清单、行业偏好、单票上限、投资期限、用户对某条边或某个主题的主观判断。
```

系统输出不应只包括“新增标的”，还应同时覆盖已有组合的调整：

```text
1. Add / Discover
   新增关注标的、可买候选、相关金融工具。

2. Hold / Monitor
   继续持有但需观察某些验证信号，例如订单、库存、capex、监管审批。

3. Reduce / Exit
   对已有 portfolio 中受负面传导、边关系削弱、资金流恶化或估值风险升高的标的给出减配或放弃建议。

4. Hedge / Offset
   通过 ETF、期权、债券、大宗商品或反向暴露资产对冲组合风险。

5. Explain / Validate
   输出传导路径、证据来源、置信度、时间窗口、关键观察指标。
```

因此推荐系统需要同时回答：

```text
我应该新增关注什么？
我已经持有的东西有没有变差？
哪些持仓受这条新闻或宏观变化影响最大？
哪些标的只是短期交易机会，哪些可能改变中期基本面？
```

## 4. Operating Graph 设计

### 4.1 公司不是单一节点，而是公司子图

每家公司应被建模为一个公司经济体，而不是一个黑盒股票节点：

```text
External Trigger
新闻 / 财报 / 产品发布 / 宏观变化 / 市场变化
        |
        v
Company Economic Twin
        |
        +-- Business & Products
        |   公司卖什么：产品、业务线、客户、地区、渠道
        |
        +-- Operating Drivers
        |   经营如何变化：需求、价格、销量、成本、产能、库存
        |
        +-- Financing & Balance Sheet
        |   资金状态如何：现金、债务、利息、再融资、回购、分红
        |
        +-- Financial Results
        |   结果是什么：收入、毛利、利润、现金流、ROIC、FCF
        |
        v
Transmission Outputs
        |
        +-- Operating Transmission
        |   影响客户、供应商、竞争对手、替代品、互补品
        |
        +-- Market Transmission
        |   影响股票、ETF、期权、债券、估值倍数、资金流
        |
        v
Portfolio Action
新增关注 / 持有 / 观察 / 减配 / 退出 / 对冲 / 解释
```

其中：

- `Business & Products` 表示公司具体卖什么、服务谁、依赖哪些产品或业务线。
- `Operating Drivers` 表示业务变化如何影响需求、价格、销量、成本、产能和库存。
- `Financing & Balance Sheet` 表示资金成本、融资能力、债务压力和资本结构。
- `Financial Results` 表示这些经营变化最终如何落到收入、利润率、现金流和资产负债表。
- `Transmission Outputs` 表示公司变化继续传导到上下游、竞争对手、ETF、期权、债券和股票等市场资产。

这个图的重点是：公司节点不是一个 ticker，而是一个小型经济体。外部变化进入公司后，先影响业务和经营驱动项，再转化成财务结果，最后继续向产业链和市场资产传导。

### 4.2 产品与业务线节点

产品层非常关键。很多投资机会不是从公司整体开始，而是从产品迭代、产品周期、产品结构变化开始。

例如，英伟达不应只建成一个 `NVDA` 节点，而应至少拆成：

```text
NVIDIA
├── Data Center GPU
├── Gaming GPU
├── Networking / InfiniBand / Ethernet
├── Automotive
└── Software / CUDA ecosystem
```

苹果也应至少拆成：

```text
Apple
├── iPhone
├── Mac
├── iPad
├── Wearables
├── Services
└── New Devices
```

产品节点建议维护字段：

```text
product_name
company
business_segment
revenue_share
gross_margin_level
growth_rate
lifecycle_stage
key_suppliers
key_customers
competitors
substitutes
complements
price_driver
volume_driver
cost_driver
launch_cycle
capacity_constraint
evidence
confidence
```

产品层的传导示例：

```text
英伟达推出新一代 Data Center GPU
 -> GPU ASP / 出货 / 性能变化
 -> 云厂商 capex 结构变化
 -> HBM 需求变化
 -> 先进封装需求变化
 -> 高速网络与光模块需求变化
 -> 服务器 ODM 订单变化
```

如果没有产品层，系统只能粗略输出“英伟达利好，半导体利好”，解释力和推荐精度都会不足。

### 4.3 财务驱动树

初期可以用财务驱动树作为公司内部建模骨架：

```text
Revenue = Price × Volume
Gross Profit = Revenue - Variable Costs
Operating Profit = Gross Profit - Opex
Net Profit = Operating Profit - Interest - Tax
FCF = Operating Cash Flow - Capex
Equity Value ≈ FCF / Discount Rate 或 EPS × Multiple
```

利润表、资产负债表、现金流量表的角色不同：

- 利润表：最适合承载新闻和经营传导，例如收入、价格、销量、毛利率、费用变化。
- 现金流量表：用于判断利润能否转化为真实现金，尤其适用于重资产、库存、应收账款、资本开支较大的公司。
- 资产负债表：用于处理利率、汇率、信用收缩、库存周期、资产减值、再融资压力等宏观或周期变量。

长期可以从财务驱动树升级为公司内部 Operating Flow Graph：

```text
Company
 -> Business Segment
 -> Product Line
 -> Customer Group
 -> Region
 -> Channel
 -> Cost Item
 -> Supplier Input
 -> Asset / Capacity
 -> Working Capital
 -> Financing
```

拆分原则不是越细越好，而是按照投资重要性拆：

- 收入占比高的业务要拆。
- 毛利差异大的业务要拆。
- 供应链约束明显的业务要拆。
- 资本开支重的业务要拆。
- 市场叙事强的业务要拆。
- 产品周期明显的业务要拆。

### 4.4 统一图谱框架与行业专属 Operating Template

本系统不应被设计成只适用于科技股。科技、半导体、消费电子更适合作为 MVP，是因为它们的产品周期、供应链、capex 和新闻传导路径更清晰；但底层框架应适用于不同行业。

正确的抽象是：

```text
统一图谱框架 + 行业专属 Operating Template
```

不同行业的公司内部经营驱动项不同，因此公司子图模板也不同。

科技 / 制造行业：

```text
产品迭代
 -> 订单 / capex
 -> 供应链
 -> 产能 / 库存
 -> 收入 / 毛利
 -> 市场重估
```

银行：

```text
Bank
├── Loan Book
│   ├── 房贷
│   ├── 企业贷款
│   ├── 消费贷
│   └── 商业地产
├── Deposit Base
├── Net Interest Margin
├── Credit Cost / NPL
├── Fee Income
├── Capital Ratio
├── Duration / Rate Sensitivity
└── Regulatory Exposure
```

银行传导示例：

```text
降息
 -> 存款成本变化 / 贷款收益率变化
 -> NIM 变化
 -> 贷款需求变化
 -> 信用成本变化
 -> 银行 EPS / ROE 变化
```

零售：

```text
Retailer
├── Category / Product Mix
├── Same-store Sales
├── Traffic
├── Ticket Size
├── Inventory
├── Gross Margin
├── Rent / Labor / Logistics
├── Supplier Terms
├── Channel: offline / e-commerce
└── Consumer Sentiment / Income Exposure
```

零售传导示例：

```text
消费者信心下降
 -> 客流下降
 -> 同店销售下降
 -> 促销增加
 -> 毛利率下降
 -> 库存周转变差
 -> 现金流承压
```

能源：

```text
油价 / 气价变化
 -> 储量价值 / 产量 / 套保收益
 -> 上游现金流
 -> 炼化价差 / 运输成本
 -> 下游利润率
```

医药：

```text
临床数据 / 审批 / 专利
 -> 管线成功概率
 -> 峰值销售预期
 -> 医保 / 支付方准入
 -> 商业化放量
```

公用事业：

```text
燃料成本 / 电价机制 / 监管收益率
 -> 利润率
 -> capex 回报
 -> 分红能力
 -> 利率敏感度
```

因此，MVP 可以先从 AI Infrastructure 开始，但数据模型应允许后续挂接不同行业模板。

### 4.5 跨国家与地区维度

公司经营关系往往跨越多个国家和地区。系统需要在节点和边上维护地理维度，避免只在单一市场内推理。

需要维护：

```text
revenue_by_region
cost_by_region
supplier_region
customer_region
manufacturing_location
tax_exposure
FX_exposure
tariff_exposure
sanction_exposure
regulatory_jurisdiction
listing_market
```

跨国传导示例：

```text
美国出口管制加强
 -> 中国区先进芯片供应受限
 -> 云厂商 capex 结构调整
 -> 国产替代供应链需求上升
 -> 海外供应商收入预期下调
 -> 本地设备 / 设计 / 封装公司关注度上升
```

另一个示例：

```text
美元走强
 -> 海外收入占比高的美国公司收入换算受益
 -> 美元债务高的新兴市场公司偿债压力上升
 -> 进口依赖型企业成本上升
 -> 出口型企业价格竞争力变化
```

## 5. Market Graph 设计

Market Graph 用来描述公司相关金融资产和市场资金表达方式。

对于每家公司，应建立 Capital Market Subgraph：

```text
Company
 -> Common Stock
 -> ADR / H 股 / A 股 / Dual Listing
 -> Options
 -> Convertible Bonds
 -> Corporate Bonds
 -> ETFs / Mutual Funds Holdings
 -> Index Membership
 -> Sector Proxies
 -> Structured Products / Warrants
```

Market Graph 关注的是资金如何通过不同资产表达同一主题或同一公司变化。

例如：

```text
英伟达利好
 -> NVDA 股票上涨预期
 -> 半导体 ETF 被动流入
 -> 期权成交放大
 -> Dealer delta hedging
 -> ETF 成分股或同行股票被动受益
```

Market Graph 可维护字段：

```text
security_type
underlying_company
index_membership
ETF_holding_weight
option_open_interest
short_interest
liquidity
valuation_multiple
fund_flow
crowding
factor_exposure
```

它与 Operating Graph 的区别在于：

- Operating Graph 解释真实经营和利润传导。
- Market Graph 解释资金流、估值、风险偏好和市场结构传导。

## 6. Macro Indicator Graph 设计

Macro 不应只作为 Operating Graph 的一部分。它应是独立的 Macro Indicator / Macro Shock Layer，因为宏观变量既影响公司经营，也直接影响市场定价、资金流和组合风险。

宏观变量包括：

```text
Interest Rate
Inflation
FX Rate
Commodity Price
PMI
Credit Spread
Fiscal Spending
Consumer Confidence
Housing Activity
Regulation
Geopolitical Risk
```

宏观变量有两类主要传导路径：

### 6.1 Fundamental Channel

宏观变量先影响经营，再影响股票：

```text
油价上涨
 -> 航空公司燃油成本上升
 -> 毛利率下降
 -> EPS 下修
 -> 股票吸引力下降
```

### 6.2 Market Channel

宏观变量直接影响市场定价：

```text
利率下降
 -> 折现率下降
 -> 成长股估值倍数上升
 -> 长久期资产受益
```

推荐系统不应简单问“macro 是否进入 portfolio”，而应判断：

```text
这个 macro shock 是通过经营传导、市场传导，还是两者同时发生？
```

### 6.3 Macro Indicator Graph 与 Macro Agent 的分工

Macro Indicator Graph 本身负责承载宏观变量、状态、历史关系和公司暴露，但不应假设图谱可以完全自动理解每次宏观变化。宏观数据和政策变化通常需要解释 surprise、方向、持续性和适用范围，因此需要 Macro Agent 参与。

分工如下：

```text
Macro Indicator Graph
存储宏观变量、宏观状态、历史区间、公司暴露、跨资产关系。

Macro Agent
解析新数据或政策，判断其是否构成 shock，映射到具体经营和市场通道。
```

Macro Agent 的任务：

```text
1. 判断宏观数据是否超预期
   例如 CPI 高于预期、PMI 低于荣枯线、央行表态转鹰。

2. 判断影响通道
   fundamental / valuation / liquidity / credit / FX / commodity / policy。

3. 找到暴露节点
   利率敏感公司、美元收入公司、进口成本公司、商品价格敏感公司、监管敏感行业。

4. 提出边更新
   强化、削弱、新增或改变 macro -> company / macro -> market 的边。

5. 生成情景假设
   base / bull / bear 三种情景下的影响范围、滞后和持续期。
```

示例：

```text
新闻：美联储释放降息信号

Macro Agent:
 -> 判断为利率路径下修 shock
 -> 更新 interest_rate_expectation 节点
 -> 强化 growth_duration_asset valuation channel
 -> 强化 high_debt_company financing channel
 -> 削弱部分银行 NIM channel
 -> 触发 Market Graph 风格因子与资金流传播
```

因此，宏观不是简单“直接进入推荐”，而是：

```text
macro data / policy
 -> Macro Agent 消化
 -> Macro Graph 状态变化
 -> Operating Graph / Market Graph 边更新
 -> 传播与组合影响分析
```

## 7. Edge 设计

边是系统的核心。每条边应有方向、类型、强度、滞后、证据和生命周期。

建议字段：

```text
source
target
relation_type
channel: fundamental / valuation / flow / risk / sentiment
direction: positive / negative / mixed
strength_range
elasticity
pass_through
lag
duration
confidence
evidence_list
uncertainty_reason
status
last_updated
model_version
```

### 7.1 Edge 类型

常见关系类型：

```text
revenue
cost
capex
supplier
customer
competitor
substitute
complement
financing
inventory
valuation
fund_flow
index_membership
ETF_holding
macro_exposure
partnership
joint_development
```

### 7.2 Edge Lifecycle

合作、供应、客户、联合研发等关系不应等到完全产生收入后才进入图谱。早期关系也应该进入，但需要有不同成熟度和置信度。

边的生命周期：

```text
candidate_edge
 -> hypothesized_edge
 -> confirmed_edge
 -> material_edge
 -> decaying_edge
 -> retired_edge
```

合作关系也可用业务成熟度表达：

```text
1. Announced Intent
   宣布合作、签 MOU、战略协议、联合研发、试点。

2. Active Program
   已有项目、测试、认证、PoC、送样、试生产。

3. Commercial Relationship
   已产生订单、收入、采购、合同金额、供应关系。

4. Financially Material
   已对收入、毛利、现金流、产能利用率产生可观影响。
```

示例：

```text
Company A -> Company B
relation_type: partnership / joint_development / potential_customer
edge_status: announced_intent
financial_materiality: unknown
confidence: low_to_medium
expected_lag: 1-8 quarters
evidence: news / filing / earnings call
```

后续如果出现订单、收入确认、客户认证、capex 或管理层指引，再升级这条边。

### 7.3 Edge 方向性与 Relationship Bundle

底层图应采用有向边。因为投资传导中的方向、影响符号、滞后和强度通常不对称。

例如：

```text
云厂商 capex ↑ -> 光模块需求 ↑
```

不等于：

```text
光模块公司变化 -> 云厂商 capex 变化
```

后者可能只在供应约束、价格变化或交付风险上影响云厂商，强度和方向完全不同。

供应商和客户关系也不应建成一条无向边，而应建成多条语义不同的有向边：

```text
Apple -> Supplier
relation_type: demand_source
channel: revenue
direction: positive
含义：Apple 订单增加会提高供应商收入。

Supplier -> Apple
relation_type: supply_constraint
channel: cost / delivery_risk
direction: negative / mixed
含义：供应商产能不足可能影响 Apple 成本或出货。
```

产品展示层可以把多条有向边包装成一个 relationship bundle：

```text
Relationship Bundle: Apple <-> Supplier
├── Apple -> Supplier: demand_source / revenue
├── Supplier -> Apple: supply_constraint / delivery_risk
├── Supplier -> Apple: component_cost / margin
└── Apple -> Supplier: bargaining_power / pricing
```

因此：

```text
存储与计算：directed edges
用户展示：relationship bundle
```

这样既保留计算所需的方向性，也能让用户以更自然的方式理解公司间关系。

## 8. 外部信息与图谱演进

外部新闻、财报、公告、宏观数据和产品发布都可以视为 trigger。

系统处理 trigger 的过程不是简单打标签，而是做图的演进推理：

```text
新信息进入
 -> 抽取实体、事件、产品、金额、时间、方向、证据
 -> 判断它改变了哪些节点状态或边状态
 -> 新增、强化、削弱、改变或删除边
 -> 沿图传播影响
 -> 映射到用户组合和关注池
 -> 输出推荐、解释路径和风险
```

新闻可能触发的图变化：

```text
新增边
强化边
削弱边
改变方向
改变滞后
改变置信度
改变影响范围
更新节点状态
更新产品生命周期
更新财务驱动项
```

示例：

```text
新闻：A 公司与 B 公司达成 AI 芯片联合开发合作

图变化：
新增 A <-> B joint_development edge
提升 A/B 的 AI chip exposure
增加潜在供应链路径
设置观察项：订单、量产、capex、收入确认

推荐层：
关注型推荐：合作边新建，主题暴露增强，但财务影响未验证
交易型推荐：市场预期可能短期重估，需看情绪、成交、估值
基本面型推荐：暂不纳入，等待订单或收入证据
```

### 8.1 信息类型分层与 Event Router

外部信息不应被统一当成“新闻”。不同类型的信息影响通道、证据要求、滞后和推荐方式都不同。系统应先用 Event Router 对信息分层，再进入对应的解析 schema。

初期事件类型：

```text
Regulation / Policy
监管、政策、补贴、出口管制、反垄断、医保控费。

Product Launch / Product Update
产品发布、产品升级、规格变化、价格变化、性能变化。

Earnings / Guidance
财报、业绩指引、毛利率、库存、capex、订单、管理层口径。

Order / Supply Chain
订单、供应协议、产能扩张、客户认证、交付延迟、库存周期。

Partnership / Joint Development
合作、MOU、联合研发、PoC、试点、生态合作。

M&A / Investment
并购、战略投资、资产剥离、合资公司。

Financing / Capital Return
发债、增发、回购、分红、可转债、再融资。

Legal / Incident
诉讼、调查、安全事故、召回、生产中断。

Management / Governance
管理层变化、股东变化、治理结构变化。

Macro Data / Commodity / FX
宏观数据、商品价格、汇率、利率、信用利差变化。
```

不同事件对应不同解析重点：

```text
产品发布：
产品性能、价格、替代关系、竞品压力、供应链增量、产品生命周期。

监管新闻：
适用范围、执行时间、受益/受损对象、合规成本、行业格局变化。

合作新闻：
合作成熟度、是否有订单、是否有财务金额、是否只是 PR、后续验证信号。

财报新闻：
收入拆分、毛利率、库存、capex、订单、指引、管理层表述变化。

并购投资：
交易金额、估值、协同、融资方式、监管审批、竞争格局变化。
```

Event Router 的作用不是直接推荐，而是选择正确的处理路径：

```text
raw information
 -> event classification
 -> event-specific extraction schema
 -> materiality / surprise scoring
 -> graph mutation proposal
 -> propagation
```

这部分可以在 MVP 中先用有限事件类型实现，后续逐步扩展。

## 9. Agent 的角色

Agent 的核心作用不是不是直接替代图算法，而是把外部世界不断出现的新信息转化成图可以吸收的结构化变化。

可以把 agent 理解为graph对非结构化信息的“消化层”：

```text
┌─────────────────────────────────────────────────────────────┐
│ Raw Signals                                                  │
│ news / filings / earnings / macro / product / market data    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               v
┌─────────────────────────────────────────────────────────────┐
│ Agent Layer                                                  │
│ classify event -> extract entities -> read evidence          │
│ judge materiality -> propose node / edge mutations           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               v
┌─────────────────────────────────────────────────────────────┐
│ Graph State                                                  │
│ node state / edge state / confidence / lifecycle / shock     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               v
┌─────────────────────────────────────────────────────────────┐
│ Propagation + Recommendation                                 │
│ impact paths -> portfolio impact -> add / reduce / hedge     │
└─────────────────────────────────────────────────────────────┘
```

### 9.1 与传统 GNN / Graph Learning 的区别

传统图学习通常假设图结构已经基本给定，然后在图上做消息传递、表示学习或预测：

```text
Traditional GNN / Graph Learning

        Existing Graph
   nodes + edges + features
             |
             v
   ┌─────────────────────┐
   │  Message Passing    │
   │  node <-> edge      │
   └─────────────────────┘
             |
             v
   embeddings / prediction / classification

Key assumption:
the important information is already inside the graph.
```

这种方式适合处理已经结构化的数据，但对金融市场中的新信息有一个明显问题：很多重要变化最初并不是结构化边，而是以新闻、电话会、政策、公告、产品发布、传闻、订单、合作等形式出现。

本系统更接近 agent-assisted graph evolution：

```text
Agent-Assisted Graph Evolution

      New External Information
 news / filing / macro / product / market signal
                 |
                 v
   ┌─────────────────────────────┐
   │ Agent Interpretation         │
   │ event / entity / evidence    │
   │ materiality / surprise       │
   └──────────────┬──────────────┘
                  |
                  v
   ┌─────────────────────────────┐
   │ Graph Mutation Proposal      │
   │ + node    + edge             │
   │ ↑ weight  ↓ weight           │
   │ change lag / confidence      │
   │ retire weak relation         │
   └──────────────┬──────────────┘
                  |
                  v
        Updated Dynamic Graph
                  |
                  v
   directed propagation across
   operating / market / macro / risk channels
                  |
                  v
 add / hold / monitor / reduce / exit / hedge / explain

Key assumption:
important information often arrives outside the graph first.
```

两者的差异可以概括为：

```text
传统 GNN：
重点是“在已有图上学习表示和预测”。

本系统：
重点是“让新信息推动图谱持续演化，然后在演化后的图上做传播和推荐”。
```

### 9.2 Agent 如何围绕节点工作

agent 不是每家公司一个常驻小脑，而是围绕节点状态运行的任务型工作流。

```text
                         incoming event
                              |
                              v
        +------------------ Agent Ring ------------------+
        |                                                |
        |  News / Filing Agent      Product Agent        |
        |  Macro Agent              Market Agent         |
        |  Entity Resolver          Evidence Checker     |
        |                                                |
        +---------------------+--------------------------+
                              |
                              v
                    +----------------------+
                    |  Node State          |
                    |  company / product   |
                    |  security / macro    |
                    +----------+-----------+
                               |
                 reads current state and related edges
                               |
                               v
                    +----------------------+
                    | Mutation Proposal    |
                    | node update          |
                    | edge update          |
                    | confidence update    |
                    +----------+-----------+
                               |
                               v
                    propagation / portfolio agents
```

节点保存相对稳定的状态：

```text
Company / Product / Security / Macro Node
- 业务和产品
- 财务驱动项
- 客户和供应商
- 宏观暴露
- 市场资产映射
- 当前边关系
- 最近证据和更新时间
```

agent 在事件发生时读取节点状态和相关边，然后输出 mutation proposal：

```text
新增节点
新增边
强化边
削弱边
改变方向
改变滞后
改变置信度
改变节点状态
触发后续验证任务
```

### 9.3 Agent + 量化估计 + 置信度管理

推荐采用三段式机制：

```text
LLM extraction / reasoning
 -> quantitative estimation
 -> confidence management
```

#### 9.3.1 LLM Extraction / Reasoning

LLM 负责把非结构化信息转成候选结构：

```text
输入：新闻、财报、电话会、公告、研报摘要、产品发布。

输出：
- 涉及哪些公司、产品、地区、宏观变量。
- 事件类型是什么。
- 可能新增或改变哪些边。
- 影响方向是什么。
- 证据原文是什么。
- 哪些部分是事实，哪些部分是推断。
- 后续需要观察哪些验证信号。
```

#### 9.3.2 Quantitative Estimation

量化层负责给候选关系估计强度区间，而不是直接接受 LLM 的主观判断。

可用方法：

```text
1. Event Study
   相似事件发生后，相关标的 1/5/20/60 日的表现。

2. Financial Sensitivity
   收入、毛利率、成本、利息支出、capex 对变量变化的敏感性。

3. Exposure Weight
   产品收入占比、客户占比、供应商占比、地区收入占比、ETF 权重。

4. Text Intensity
   财报和电话会中相关主题的语义强度、出现频率、管理层语气变化。

5. Market Confirmation
   成交量、期权隐含波动率、ETF 资金流、分析师预期修正。
```

#### 9.3.3 Confidence Management

置信度不等于影响强度。一个事件可能影响很大但证据不足，也可能证据很强但影响很小。

建议拆成：

```text
impact_strength: 影响强度
evidence_confidence: 证据置信度
materiality_confidence: 财务重要性置信度
timing_confidence: 时间窗口置信度
direction_confidence: 方向置信度
```

例如：

```text
合作公告：
impact_strength: medium_to_high
evidence_confidence: high
materiality_confidence: low
timing_confidence: low
direction_confidence: medium

已披露大额订单：
impact_strength: high
evidence_confidence: high
materiality_confidence: high
timing_confidence: medium
direction_confidence: high
```

最终 edge 不应只有一个分数，而应是：

```text
EdgeEstimate {
  strength_range,
  confidence_vector,
  evidence_list,
  uncertainty_reason,
  validation_signals,
  last_calibrated_at
}
```

## 10. Agent 架构

第 9 章解释 agent 为什么需要存在，以及它和传统图学习的区别。本章进一步说明 agent 在系统中的工程化组织方式、任务边界和处理链路。

不建议一开始为每家公司设置一个常驻自治 agent。更好的设计是：

```text
公司节点 = 可维护的 company state / financial twin
agent = 围绕任务运行的工作流
```

公司状态包括：

```text
主营业务
主要产品
收入结构
成本结构
客户/供应商
地区敞口
财务指标
估值指标
宏观暴露
关键边关系
最近更新记录
```

建议的 agent / worker：

```text
News Ingestion Agent
识别新闻事件、关联公司、判断事件类型和初始方向。

Filing / Earnings Agent
更新收入结构、毛利率、capex、库存、负债、现金流、管理层指引。

Product Intelligence Agent
维护产品线、产品周期、产品迭代、竞品和替代关系。

Macro Indicator Agent
监控利率、汇率、商品价格、PMI、信用利差等变量变化。

Instrument Discovery Agent
发现公司相关股票、ETF、期权、可转债、债券、指数成分关系。

Edge Update Agent
根据新证据提出新增、删除、增强、削弱某些边。

Impact Propagation Agent
把事件沿图传播，计算一阶、二阶、三阶影响。

Portfolio Agent
把传播结果映射到用户持仓，输出增配、减配、观察、避险建议。

Explanation Agent
生成传导路径、证据、置信度和风险提示。

Validation / Backtest Agent
持续检查历史推荐是否有效，反向校准 edge strength 和 confidence。
```

### 10.1 节点 + Agent 的工作流架构

系统不建议采用“每个公司一个常驻 agent”的架构，而应采用：

```text
Node State + Task Agents + Graph Mutation Log
```

其中：

```text
Node State
保存公司、产品、金融资产、宏观变量的结构化状态。

Task Agents
在新信息进入或定时任务触发时运行，负责抽取、判断、更新建议和解释。

Graph Mutation Log
记录每次节点或边变化的来源、原因、证据、版本和责任 agent。
```

整体处理链路：

```text
raw information
 -> Ingestion Agent
 -> Event Router
 -> Entity Resolution Agent
 -> Event Extraction Agent
 -> Materiality / Surprise Agent
 -> Graph Update Agent
 -> Impact Propagation Agent
 -> Portfolio Agent
 -> Explanation Agent
 -> Validation Agent
```

这可以理解为：

```text
external information
 -> agent digestion
 -> node / edge mutation proposal
 -> graph state update
 -> propagation over directed edges
 -> portfolio impact
 -> recommendation and explanation
```

与传统 graph learning 中的：

```text
edge -> node -> edge
```

相比，本系统更接近：

```text
event / data
 -> agent
 -> graph mutation
 -> node / edge state
 -> agent-assisted propagation
 -> new edge / recommendation
```

agent 的核心价值不是替代图，而是把非结构化或半结构化信息消化成图可以理解的变化：

```text
新增节点
新增边
强化边
削弱边
改变方向
改变滞后
改变置信度
改变节点状态
触发验证任务
```

### 10.2 不同 Agent 的任务边界

建议明确各 agent 的输入、输出和责任边界。

```text
Ingestion Agent
输入：新闻、公告、财报、宏观数据、市场数据。
输出：标准化原始信息对象。
责任：去重、来源识别、时间戳、基础清洗。

Event Router
输入：标准化信息对象。
输出：事件类型与处理 schema。
责任：判断是监管、产品、财报、订单、合作、并购、融资、宏观等。

Entity Resolution Agent
输入：事件文本和候选实体。
输出：标准化 company / product / security / macro id。
责任：解决别名、ticker、上市地、子公司、产品名歧义。

Event Extraction Agent
输入：事件及 schema。
输出：结构化事件字段。
责任：抽取金额、产品、地区、时间、方向、关系、证据。

Materiality / Surprise Agent
输入：结构化事件、历史预期、公司暴露。
输出：重要性分数、预期差分数、影响窗口。
责任：判断这条信息是否足以改变图或推荐。

Graph Update Agent
输入：结构化事件、materiality、当前图状态。
输出：node / edge mutation proposal。
责任：新增、强化、削弱、降级或 retire 边。

Impact Propagation Agent
输入：更新后的图、shock、传播参数。
输出：受影响节点、路径、分数、方向。
责任：跨 Operating / Market / Macro Graph 传播影响。

Portfolio Agent
输入：传播结果、用户持仓、约束、风险偏好。
输出：新增、持有、观察、减配、对冲建议。
责任：把图影响转成用户组合层动作。

Explanation Agent
输入：推荐、路径、证据、置信度。
输出：用户可读解释。
责任：说明为什么、通过什么路径、哪些证据、有哪些风险。

Validation Agent
输入：历史推荐、后续市场和基本面结果。
输出：回测结果、边权校准、失败案例。
责任：持续改进 edge strength、confidence 和事件 schema。
```

## 11. 假设推演与 Company Agent

除了根据真实市场信息更新 canonical graph，系统还需要支持假设推演。投资研究中很多问题不是“发生了什么”，而是“如果某件事发生，会怎样传导”。

因此需要区分两类 agent：

```text
Graph Update Agent
目标：维护真实图谱。
输入：已发生或有证据支持的信息。
输出：canonical graph 的 node / edge / confidence / lifecycle 更新。

Company Agent / Economic Twin Agent
目标：围绕公司经济体进行反应推演。
输入：公司子图状态、真实事件、用户假设或系统情景。
输出：inference、hypothesis、scenario、potential shock、edge mutation proposal。
```

### 11.1 三层图状态

建议把图状态拆成三层，避免事实和推演混在一起：

```text
1. Canonical Graph
   当前事实图。由披露、数据、新闻、市场数据和验证证据更新。

2. Inference Graph
   推断图。基于当前事实和模型推理出的可能影响路径。

3. Scenario Graph
   情景图。用户或系统假设某件事发生后，临时生成的架空推演图。
```

对应关系：

```text
Graph Update Agent  -> Canonical Graph
Company Agent       -> Inference Graph
Company Agent       -> Scenario Graph
```

Company Agent 可以提出潜在改变，但不能默认把潜在改变写入事实图。只有当后续出现证据验证时，Graph Update Agent 才能把对应关系升级到 canonical graph。

### 11.2 Company Agent 的职责

Company Agent 是围绕公司子图运行的反应推演器，不是经济关系图里的普通节点。它属于控制层或推理层，不属于 operating graph 本身。

它主要做：

```text
1. 读取公司子图变化
   产品、收入、成本、capex、库存、融资、宏观暴露、市场资产变化。

2. 判断 materiality
   变化是否足以影响收入、利润、现金流、估值或资金流。

3. 判断 channel
   operating / market / macro / risk 哪条通道受影响。

4. 生成 shock
   例如 product_demand_up、margin_pressure、financing_risk_down。

5. 提出 edge update
   强化、削弱、新增、降级、retire 某些边。

6. 触发 propagation
   把 shock 交给传播引擎，而不是 agent 自己随意扩散。

7. 生成 observation task
   后续要观察订单、库存、毛利、capex、客户指引等验证信号。
```

需要注意：Company Agent 不应被建模成“维护股价”的 agent。公司可能通过回购、分红、指引、IR、融资安排影响市场预期，但公司经济体更应围绕以下目标建模：

```text
维护收入增长
维护毛利率
维护现金流
维护供应链稳定
维护资本结构
维护战略竞争力
维护融资能力
```

股价和市场资金流的反应应放入 Market Channel，由 Market Graph 和 Portfolio Agent 处理。

### 11.3 Graph Update Agent 与 Company Agent 的关系

两者都可能影响网络，但目的和权限不同。

```text
Graph Update Agent
像图谱编辑器 / 事实登记员 / schema 守门人。
负责把证据支持的信息写入 canonical graph。

Company Agent
像公司层面的分析师 / 经济体反应器 / shock 生成器。
负责基于公司状态做推断、假设和情景分析。
```

推荐链路：

```text
Real World Data
      |
      v
Graph Update Agent
      |
      v
Canonical Graph
      |
      v
Company Agent
      |
      +--> Inference Graph
      |
      +--> Scenario Graph / Sandbox Mode
      |
      v
Propagation Engine
      |
      v
Portfolio Recommendation
```

所有更新应标记状态类型：

```text
state_type:
- fact
- inference
- hypothesis
- scenario

source:
- market_data
- filing
- news
- model_inference
- company_agent
- user_scenario

graph_layer:
- canonical
- inference
- scenario
```

### 11.4 Scenario Mode / Sandbox Mode

Scenario Mode 是有意识的架空推演模式。它不修改 canonical graph，而是复制局部子图或创建 overlay，用于回答 what-if 问题。

示例假设：

```text
英伟达下一代 GPU 需求超预期 30%
台积电先进封装产能受限
美联储提前降息
油价上涨 20%
苹果新机销量低于预期
某监管政策提前落地
```

系统推演：

```text
哪些公司受益？
哪些公司受损？
哪些边被强化？
哪些边被削弱？
哪些持仓风险上升？
哪些标的进入关注名单？
哪些验证信号最重要？
```

Scenario Mode 的输出应明确标记为假设结果：

```text
scenario_id
assumption
affected_nodes
affected_edges
shock_list
propagation_paths
portfolio_impact
validation_signals
expiration_time
```

关键原则：

```text
Canonical Graph 记录我们认为接近现实的状态。
Inference Graph 记录模型基于现实状态得出的推断。
Scenario Graph 记录假设世界中的临时推演。
```

## 12. 图算法与影响传播

当前设计文档需要明确图传播算法。初期不建议直接上复杂黑箱 GNN，而应先用可解释的 typed directed graph propagation，再逐步引入学习型方法。

### 12.1 传播对象

传播的不是单纯新闻情绪，而是一个结构化 shock：

```text
Shock {
  source_event,
  affected_nodes,
  affected_drivers,
  direction,
  magnitude_range,
  confidence_vector,
  start_time,
  expected_lag,
  expected_duration,
  channel
}
```

示例：

```text
云厂商上调 AI capex
 -> shock: cloud_capex_up
 -> affected_driver: AI infrastructure demand
 -> channel: fundamental / capex
 -> direction: positive
 -> duration: 2-6 quarters
```

### 12.2 基础传播公式

每次传播沿有向边进行：

```text
impact(target) +=
  impact(source)
  × edge_direction
  × edge_strength
  × edge_confidence
  × channel_weight
  × time_decay
  × hop_decay
  × materiality_weight
```

其中：

```text
edge_direction: 正向、负向或混合
edge_strength: 影响弹性或强度区间
edge_confidence: 证据和方向置信度
channel_weight: fundamental / valuation / flow / risk 等通道权重
time_decay: 影响随时间衰减
hop_decay: 传播层级越远，默认影响越弱
materiality_weight: 该关系对目标公司财务或市场资金是否重要
```

### 12.3 多通道传播

同一个事件可能通过不同通道传播：

```text
Fundamental Channel
收入、成本、毛利、capex、库存、现金流。

Market Channel
估值、资金流、ETF、期权、指数、风格因子、拥挤度。

Macro Channel
利率、汇率、商品、信用、政策、监管。

Risk Channel
供应中断、监管处罚、诉讼、客户集中、流动性压力。
```

传播时应保留通道，不应过早合并成单一分数：

```text
Company Impact {
  fundamental_score,
  market_flow_score,
  macro_exposure_score,
  risk_score,
  combined_score
}
```

这样系统可以解释某个标的是“基本面变好”，还是“市场资金可能流入”，还是“风险下降”。

### 12.4 推荐使用的算法层级

MVP 阶段：

```text
1. Weighted BFS / Path Propagation
   沿有向边传播 1-3 跳，适合解释路径和早期版本。

2. Personalized PageRank
   从事件、公司或产品节点出发，寻找最相关的一组节点。

3. Scenario Simulation
   对宏观变量和关键事件做 base / bull / bear 情景传播。

4. Portfolio Exposure Aggregation
   把传播结果按用户持仓权重聚合，判断组合整体暴露。
```

进阶阶段：

```text
1. Temporal Graph Propagation
   引入时间序列、边生命周期、影响滞后和衰减。

2. Heterogeneous Graph Embedding
   学习 company / product / macro / security 节点的相似性和隐含关系。

3. Graph Neural Network
   在有足够标注和回测样本后，用于补充边权校准或候选发现。

4. Causal / Quasi-causal Event Study
   区分真实传导与市场同步波动，降低虚假相关。
```

初期原则：

```text
先可解释，后学习化。
先 typed directed propagation，后 GNN。
先路径和证据，后黑箱分数。
```

### 12.5 传播输出

传播算法应输出的不只是排序，还包括：

```text
affected_node
impact_direction
impact_channel
impact_score_range
confidence_vector
best_paths
time_window
key_assumptions
validation_signals
```

示例：

```text
事件：云厂商上调 AI capex

受影响节点：某光模块公司
路径：云厂商 capex -> AI server cluster -> high-speed networking -> optical module demand
通道：fundamental / capex
方向：positive
时间窗口：1-2 quarters
置信度：中高
验证信号：订单、产能利用率、客户指引、库存变化
```

## 13. 推荐逻辑

推荐分为两层：

### 13.1 关注名单推荐

回答：

```text
这条信息出来后，哪些股票或资产值得跟踪？
```

核心分数：

```text
attention_score =
事件相关度
× 关系强度
× 传导方向
× 时间衰减
× 证据可信度
× 历史相似事件有效性
```

### 13.2 可买候选推荐

回答：

```text
这些标的中，哪些真正适合进入组合？
```

需要叠加：

```text
buy_score =
fundamental_impact
+ valuation_attractiveness
+ earnings_revision
+ trend / liquidity
+ portfolio_fit
- valuation_risk
- volatility_risk
- crowding_risk
- correlation_penalty
- drawdown_risk
```

系统应区分：

- 关注型推荐
- 交易型推荐
- 基本面型推荐
- 风险预警型推荐
- 组合再平衡建议

推荐输出建议格式：

```text
事件：美国数据中心投资上调

推荐关注：某光模块公司
传导路径：云厂商 capex ↑ -> AI 服务器集群 ↑ -> 高速网络需求 ↑ -> 光模块订单 ↑
影响方向：正向
置信度：中高
时间窗口：1-2 个季度
证据：财报、订单新闻、行业数据
风险：估值高、客户集中、订单兑现滞后
```

## 14. MVP 范围建议

初期不要覆盖全市场。建议选一个信息密度高、产业链清晰、新闻驱动强的主题作为起点。

可选 MVP 方向：

1. AI Infrastructure
   包括云厂商、GPU、HBM、先进封装、服务器 ODM、光模块、网络设备、液冷、电力设备。

2. Consumer Electronics
   包括 Apple、核心供应商、手机零部件、代工、存储、摄像头、显示、渠道。

3. New Energy / EV
   包括整车、电池、材料、矿产、充电、功率半导体、储能。

建议第一版优先做 AI Infrastructure，因为新闻密集、产品周期明显、市场关注度高、跨公司传导清晰。

MVP 能力：

```text
1. 维护 30-80 个核心公司节点
2. 拆分关键产品和业务线
3. 维护核心供应链和客户关系
4. 接入新闻/公告/财报摘要和关键宏观变量
5. 用 Event Router 区分产品、财报、合作、监管、宏观等事件
6. 用 LLM 抽取事件和候选边变化
7. 用规则 + Weighted BFS / Personalized PageRank 生成一阶/二阶推荐
8. 输出路径、证据、置信度、时间窗口、风险
9. 支持用户输入持仓并分析暴露
10. 对已有持仓给出继续持有、观察、减配或对冲提示
```

MVP 暂不追求：

- 完整全市场覆盖
- 高频交易预测
- 精确 EPS 建模
- 完整会计仿真
- 完全自动化无人工审核

## 15. 数据与验证

关键数据源类型：

```text
公司财报
10-K / 10-Q / 年报 / 季报
电话会 transcript
公告与新闻
产品发布
供应链数据
ETF 持仓
指数成分
期权与成交数据
宏观数据
商品价格
分析师预期
股价与成交量历史
跨国供应链数据
地区收入与成本拆分
监管和制裁信息
大宗商品期货与现货价格
宏观一致预期数据
```

验证方式：

```text
事件回测：新闻发生后 1/5/20/60 日相关标的表现
路径验证：被推荐路径是否后续出现订单、收入或指引证据
边权校准：高置信边是否比低置信边更有效
推荐分层验证：关注型、交易型、基本面型推荐分别回测
组合验证：推荐是否提升风险调整后收益或降低回撤
解释验证：用户是否认可传导路径和证据
```

## 16. 核心设计原则

1. 系统核心是追踪 money flow，包括 operating flow、market flow 和 macro flow。
2. 图谱由后台维护，用户叠加个性化 overlay。
3. 公司节点应拆为公司子图，不应只是股票 ticker。
4. 产品节点是经营传导的关键入口。
5. 框架应采用统一图谱框架 + 行业专属 operating template。
6. 宏观变量独立成层，同时通过经营和市场两条路径传导。
7. Macro Graph 负责承载宏观状态，Macro Agent 负责解释新宏观 shock。
8. Market Graph 用来描述资金流和金融资产表达方式。
9. Edge 底层应为有向边，展示层可以包装成 relationship bundle。
10. 合作新闻要进入图，但应以低成熟度、低置信度边进入。
11. 新闻推荐本质上是图谱演进推理。
12. Agent 负责把外部信息消化成节点和边的变化，LLM 是 agent layer 的关键能力之一。
13. LLM 负责抽取、假设、归因和解释，量化层负责校准和验证。
14. 置信度应拆为证据置信度、方向置信度、财务重要性置信度、时间置信度等维度。
15. Agent 不应按公司常驻，而应按任务工作流运行。
16. Graph Update Agent 维护 canonical graph，Company Agent 负责 inference / scenario 推演。
17. Canonical Graph、Inference Graph、Scenario Graph 必须隔离，避免把假设当成事实。
18. 传播算法应先可解释，后学习化；先 typed directed propagation，后 GNN。
19. 推荐必须输出路径、证据、置信度、时间窗口和风险。

## 17. 下一步

### 17.1 后续拓展计划

后续可以逐步引入以下能力：

```text
1. Edge Lifecycle 系统化
   让边从 candidate -> hypothesized -> confirmed -> material -> decaying -> retired 持续演化。

2. 不同类型信息源分层
   将新闻、财报、公告、电话会、宏观数据、市场数据、另类数据分层处理。

3. 公司内部 Operating Model 改进
   从财务驱动树升级为更细的 Operating Flow Graph，并按行业模板定制。

4. 大宗商品标的
   将铜、油、气、锂、黄金、农产品等同时作为 macro indicator 和 market asset 处理。

5. 用户自定义 Graph / Overlay
   允许用户修改关系强弱、加入个人假设、屏蔽某些标的或行业，形成个性化图谱。

6. Scenario Mode / Sandbox Mode
   支持用户或系统输入假设，在隔离的 scenario graph 中推演潜在受益、受损、风险和验证信号。

7. 跨多国市场分析
   引入供应链国家分布、客户地区分布、监管辖区、上市市场、汇率、关税和制裁暴露。

8. 跨资产推荐与对冲
   从股票扩展到 ETF、期权、可转债、债券、大宗商品和相关指数。

9. 学习型传播模型
   在积累足够历史事件和验证样本后，引入 temporal graph model、graph embedding 或 GNN。
```
