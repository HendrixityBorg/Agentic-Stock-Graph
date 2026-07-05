const DEMO_DATA = {
  portfolios: {
    aiGrowth: {
      name: "AI Infrastructure Growth",
      description: "偏 AI 基础设施，适合展示云厂商 capex 和半导体链条传导。",
      holdings: [
        { ticker: "NVDA", name: "NVIDIA", weight: 24 },
        { ticker: "TSM", name: "TSMC", weight: 18 },
        { ticker: "SMH", name: "VanEck Semiconductor ETF", weight: 20 },
        { ticker: "AAPL", name: "Apple", weight: 15 },
        { ticker: "CASH", name: "Cash", weight: 23 }
      ]
    },
    balancedTech: {
      name: "Balanced US Tech",
      description: "更均衡的美股科技组合，适合展示市场通道和估值传导。",
      holdings: [
        { ticker: "MSFT", name: "Microsoft", weight: 22 },
        { ticker: "AAPL", name: "Apple", weight: 20 },
        { ticker: "NVDA", name: "NVIDIA", weight: 16 },
        { ticker: "QQQ", name: "Nasdaq 100 ETF", weight: 22 },
        { ticker: "CASH", name: "Cash", weight: 20 }
      ]
    },
    crossMarket: {
      name: "Cross-Market Semiconductor",
      description: "包含港美半导体节点，适合展示跨国监管和供应链路径。",
      holdings: [
        { ticker: "NVDA", name: "NVIDIA", weight: 20 },
        { ticker: "TSM", name: "TSMC", weight: 18 },
        { ticker: "0981.HK", name: "SMIC", weight: 16 },
        { ticker: "1347.HK", name: "Hua Hong Semiconductor", weight: 14 },
        { ticker: "CASH", name: "Cash", weight: 32 }
      ]
    }
  },
  companyTrees: {
    NVDA: {
      name: "NVIDIA",
      type: "Company",
      business: "Data Center GPU, networking, gaming GPU, CUDA ecosystem",
      revenue: "AI accelerator ASP, shipment volume, cloud customer capex, networking attach rate",
      cost: "HBM, advanced packaging, foundry capacity, R&D, supply allocation",
      financial: "Revenue growth, gross margin, FCF, long-duration valuation multiple",
      external: "Cloud providers, TSMC/CoWoS, HBM suppliers, SMH/QQQ market flow"
    },
    TSM: {
      name: "TSMC",
      type: "Company",
      business: "Advanced foundry, CoWoS packaging, mature process nodes",
      revenue: "Wafer volume, advanced-node pricing, customer mix, packaging demand",
      cost: "Capex, equipment, energy, depreciation, Taiwan operating concentration",
      financial: "Utilization, gross margin, capex intensity, FCF conversion",
      external: "NVIDIA, Apple, AMD, semiconductor equipment, geopolitical risk"
    },
    SMH: {
      name: "VanEck Semiconductor ETF",
      type: "Market Asset",
      business: "Semiconductor basket exposure",
      revenue: "Not operating revenue; tracks constituent market value and fund flow",
      cost: "Expense ratio, liquidity, index methodology, concentration risk",
      financial: "ETF flow, factor exposure, volatility, semiconductor beta",
      external: "NVDA, TSM, AVGO, ASML, AMD, macro duration and risk appetite"
    },
    AAPL: {
      name: "Apple",
      type: "Company",
      business: "iPhone, Mac, wearables, services, silicon ecosystem",
      revenue: "Product cycle, installed base, services attach, region demand",
      cost: "Components, assembly, logistics, FX, regulatory compliance",
      financial: "Revenue mix, services margin, buyback, FCF stability",
      external: "Consumer electronics suppliers, app ecosystem, QQQ market flow"
    },
    AVGO: {
      name: "Broadcom",
      type: "Company",
      business: "Custom ASIC, networking chips, infrastructure software",
      revenue: "Cloud ASIC projects, switch silicon, software subscription",
      cost: "R&D, foundry supply, customer concentration, integration costs",
      financial: "Backlog, margin, FCF, debt paydown",
      external: "Cloud capex, AI networking, ETF/index flows"
    },
    ANET: {
      name: "Arista Networks",
      type: "Company",
      business: "Data center switches, cloud networking software",
      revenue: "Cloud customer deployment, AI cluster networking, port speed upgrade",
      cost: "Component supply, inventory, sales mix, competition",
      financial: "Revenue growth, gross margin, operating leverage, cash generation",
      external: "Cloud providers, Ethernet AI networking, market growth factor"
    },
    VRT: {
      name: "Vertiv",
      type: "Company",
      business: "Data center power, cooling, thermal management",
      revenue: "Data center buildout, power density, liquid cooling adoption",
      cost: "Equipment supply, labor, backlog execution, input costs",
      financial: "Backlog conversion, margin expansion, working capital",
      external: "AI data center capex, utilities, industrial equipment flow"
    },
    "0981.HK": {
      name: "SMIC",
      type: "Company",
      business: "China foundry, mature-node and selected advanced-node capacity",
      revenue: "Local substitution, utilization, wafer pricing, policy-supported demand",
      cost: "Capex, equipment constraints, depreciation, yield learning curve",
      financial: "Utilization, margin pressure, subsidy/capex efficiency, FCF",
      external: "Export control, local design houses, HK market flow"
    },
    "1347.HK": {
      name: "Hua Hong Semiconductor",
      type: "Company",
      business: "Mature-node foundry, power/discrete and embedded process",
      revenue: "Local demand, power semiconductor cycle, utilization",
      cost: "Capacity ramp, pricing pressure, capex, depreciation",
      financial: "Gross margin, utilization, cycle exposure, cash flow",
      external: "China semiconductor substitution, industrial and auto demand"
    },
    QQQ: {
      name: "Nasdaq 100 ETF",
      type: "Market Asset",
      business: "Large-cap growth and technology basket",
      revenue: "Not operating revenue; reflects constituent prices and fund flow",
      cost: "Expense ratio, concentration, duration risk, liquidity",
      financial: "ETF flow, valuation multiple, growth factor exposure",
      external: "Rates, mega-cap tech earnings, market risk appetite"
    },
    TLT: {
      name: "20+ Year Treasury ETF",
      type: "Market Asset",
      business: "Long-duration US Treasury exposure",
      revenue: "Not operating revenue; driven by yield and duration",
      cost: "Duration risk, real rate changes, term premium",
      financial: "Price sensitivity to yields, distribution yield, volatility",
      external: "FRED/Treasury yields, inflation data, Fed policy path"
    }
  },
  graph: {
    nodes: [
      {
        id: "event.cloud_capex",
        label: "Cloud AI capex up",
        type: "event",
        layer: "event",
        description: "News trigger showing higher cloud AI infrastructure budget."
      },
      {
        id: "event.export_control",
        label: "Export control",
        type: "event",
        layer: "event",
        description: "Regulatory trigger changing cross-border semiconductor demand paths."
      },
      {
        id: "macro.rate_path_lower",
        label: "Rate path lower",
        type: "macro_indicator",
        layer: "macro",
        description: "Macro trigger that changes discount rate, financing cost, and flow appetite."
      },
      {
        id: "driver.ai_server_demand",
        label: "AI server demand",
        type: "operating_driver",
        layer: "operating",
        description: "Training and inference capacity expansion."
      },
      {
        id: "driver.high_speed_networking",
        label: "High-speed networking",
        type: "operating_driver",
        layer: "operating",
        description: "Switches, NICs, and optical networking demand in AI clusters."
      },
      {
        id: "driver.power_cooling",
        label: "Power / cooling",
        type: "operating_driver",
        layer: "operating",
        description: "Data center power density and thermal management bottleneck."
      },
      {
        id: "product.gpu_hbm_cowos",
        label: "GPU / HBM / CoWoS",
        type: "product_supply_chain",
        layer: "operating",
        description: "Compute, memory, and advanced packaging supply chain."
      },
      {
        id: "driver.restricted_shipments",
        label: "Restricted shipments",
        type: "risk_driver",
        layer: "operating",
        description: "Compliance constraints on high-end accelerator shipments."
      },
      {
        id: "driver.local_substitution",
        label: "Local substitution",
        type: "operating_driver",
        layer: "operating",
        description: "Demand rotation toward local semiconductor supply chains."
      },
      {
        id: "product.global_ai_chips",
        label: "Global AI chips",
        type: "product_supply_chain",
        layer: "operating",
        description: "Advanced accelerator demand outside restricted regions remains strong."
      },
      {
        id: "segment.hk_china_foundry",
        label: "HK/China foundry",
        type: "industry_segment",
        layer: "operating",
        description: "Local foundry exposure in Hong Kong and China semiconductor markets."
      },
      {
        id: "driver.valuation_multiple",
        label: "Valuation multiple",
        type: "market_driver",
        layer: "market",
        description: "Discount rate change supporting long-duration growth valuation."
      },
      {
        id: "driver.financing_cost",
        label: "Financing cost",
        type: "macro_driver",
        layer: "macro",
        description: "Lower rate path easing funding pressure for capex-heavy companies."
      },
      {
        id: "sector.growth_tech",
        label: "Growth tech",
        type: "sector",
        layer: "market",
        description: "Large-cap technology and long-duration growth exposure."
      },
      {
        id: "sector.banks",
        label: "Banks",
        type: "sector",
        layer: "market",
        description: "Financial sector with mixed sensitivity to lower rates."
      },
      {
        id: "company.NVDA",
        label: "NVIDIA",
        ticker: "NVDA",
        type: "company",
        layer: "operating",
        treeId: "NVDA",
        description: "Data center GPU, networking, and CUDA ecosystem."
      },
      {
        id: "company.TSM",
        label: "TSMC",
        ticker: "TSM",
        type: "company",
        layer: "operating",
        treeId: "TSM",
        description: "Advanced foundry and CoWoS packaging capacity."
      },
      {
        id: "company.AVGO",
        label: "Broadcom",
        ticker: "AVGO",
        type: "company",
        layer: "operating",
        treeId: "AVGO",
        description: "Custom ASIC, switch silicon, and infrastructure software."
      },
      {
        id: "company.ANET",
        label: "Arista Networks",
        ticker: "ANET",
        type: "company",
        layer: "operating",
        treeId: "ANET",
        description: "Data center switches and AI cluster networking."
      },
      {
        id: "company.VRT",
        label: "Vertiv",
        ticker: "VRT",
        type: "company",
        layer: "operating",
        treeId: "VRT",
        description: "Data center power and cooling equipment."
      },
      {
        id: "company.0981.HK",
        label: "SMIC",
        ticker: "0981.HK",
        type: "company",
        layer: "operating",
        treeId: "0981.HK",
        description: "China foundry with local substitution exposure."
      },
      {
        id: "company.1347.HK",
        label: "Hua Hong Semiconductor",
        ticker: "1347.HK",
        type: "company",
        layer: "operating",
        treeId: "1347.HK",
        description: "Mature-node foundry and power/discrete semiconductor exposure."
      },
      {
        id: "security.SMH",
        label: "SMH",
        ticker: "SMH",
        type: "security",
        layer: "market",
        treeId: "SMH",
        description: "Semiconductor ETF capturing sector beta and fund flow."
      },
      {
        id: "security.QQQ",
        label: "QQQ",
        ticker: "QQQ",
        type: "security",
        layer: "market",
        treeId: "QQQ",
        description: "Nasdaq 100 ETF with large-cap growth exposure."
      },
      {
        id: "security.TLT",
        label: "TLT",
        ticker: "TLT",
        type: "security",
        layer: "market",
        treeId: "TLT",
        description: "Long-duration Treasury ETF sensitive to yield changes."
      },
      {
        id: "asset.bonds_duration",
        label: "Bonds / duration",
        type: "market_asset",
        layer: "market",
        description: "Duration assets used as a hedge candidate."
      },
      {
        id: "action.hold_winners",
        label: "Hold winners",
        type: "portfolio_action",
        layer: "portfolio",
        description: "Keep direct winners while monitoring crowding."
      },
      {
        id: "action.add_watchlist",
        label: "Add watchlist",
        type: "portfolio_action",
        layer: "portfolio",
        description: "Add second-order beneficiaries to the watchlist."
      },
      {
        id: "action.monitor_exposure",
        label: "Monitor exposure",
        type: "portfolio_action",
        layer: "portfolio",
        description: "Track regulatory exposure and potential sizing changes."
      },
      {
        id: "action.add_local_watchlist",
        label: "Add local watchlist",
        type: "portfolio_action",
        layer: "portfolio",
        description: "Watch local semiconductor substitution candidates."
      },
      {
        id: "action.hold_growth",
        label: "Hold growth",
        type: "portfolio_action",
        layer: "portfolio",
        description: "Maintain growth exposure while the macro signal holds."
      },
      {
        id: "action.watch_macro_reversal",
        label: "Watch macro reversal",
        type: "portfolio_action",
        layer: "portfolio",
        description: "Monitor inflation and yield reversal risk."
      }
    ],
    edges: [
      {
        id: "edge.cloud.01",
        source: "event.cloud_capex",
        target: "driver.ai_server_demand",
        type: "demand_trigger",
        channel: "operating",
        direction: "positive",
        strength: 0.88,
        confidence: 0.84,
        lag: "0-2 quarters",
        lifecycle: "strengthened",
        evidence: "Capex guidance and AI data center buildout language."
      },
      {
        id: "edge.cloud.02",
        source: "driver.ai_server_demand",
        target: "product.gpu_hbm_cowos",
        type: "revenue_driver",
        channel: "operating",
        direction: "positive",
        strength: 0.92,
        confidence: 0.82,
        lag: "0-2 quarters",
        lifecycle: "confirmed",
        evidence: "AI server BOM requires GPU, HBM, and advanced packaging."
      },
      {
        id: "edge.cloud.03",
        source: "driver.ai_server_demand",
        target: "driver.high_speed_networking",
        type: "attach_rate",
        channel: "operating",
        direction: "positive",
        strength: 0.79,
        confidence: 0.76,
        lag: "1-3 quarters",
        lifecycle: "strengthened",
        evidence: "Cluster expansion increases networking attach rate."
      },
      {
        id: "edge.cloud.04",
        source: "driver.ai_server_demand",
        target: "driver.power_cooling",
        type: "capacity_bottleneck",
        channel: "operating",
        direction: "positive",
        strength: 0.67,
        confidence: 0.72,
        lag: "2-4 quarters",
        lifecycle: "watch",
        evidence: "Higher rack density increases power and thermal requirements."
      },
      {
        id: "edge.cloud.05",
        source: "product.gpu_hbm_cowos",
        target: "company.NVDA",
        type: "product_revenue",
        channel: "operating",
        direction: "positive",
        strength: 0.9,
        confidence: 0.83,
        lag: "0-2 quarters",
        lifecycle: "confirmed",
        evidence: "NVIDIA direct data center accelerator exposure."
      },
      {
        id: "edge.cloud.06",
        source: "product.gpu_hbm_cowos",
        target: "company.TSM",
        type: "foundry_packaging",
        channel: "operating",
        direction: "positive",
        strength: 0.82,
        confidence: 0.78,
        lag: "1-3 quarters",
        lifecycle: "confirmed",
        evidence: "Advanced-node and CoWoS packaging demand."
      },
      {
        id: "edge.cloud.07",
        source: "driver.high_speed_networking",
        target: "company.AVGO",
        type: "networking_revenue",
        channel: "operating",
        direction: "positive",
        strength: 0.74,
        confidence: 0.72,
        lag: "1-3 quarters",
        lifecycle: "candidate",
        evidence: "Switch silicon and AI ASIC exposure."
      },
      {
        id: "edge.cloud.08",
        source: "driver.high_speed_networking",
        target: "company.ANET",
        type: "networking_revenue",
        channel: "operating",
        direction: "positive",
        strength: 0.7,
        confidence: 0.69,
        lag: "1-2 quarters",
        lifecycle: "candidate",
        evidence: "AI cluster Ethernet buildout."
      },
      {
        id: "edge.cloud.09",
        source: "driver.power_cooling",
        target: "company.VRT",
        type: "infrastructure_revenue",
        channel: "operating",
        direction: "positive",
        strength: 0.63,
        confidence: 0.67,
        lag: "2-4 quarters",
        lifecycle: "candidate",
        evidence: "Power and thermal management demand."
      },
      {
        id: "edge.cloud.10",
        source: "company.NVDA",
        target: "security.SMH",
        type: "constituent_flow",
        channel: "market",
        direction: "positive",
        strength: 0.76,
        confidence: 0.8,
        lag: "days-weeks",
        lifecycle: "confirmed",
        evidence: "ETF exposure through semiconductor basket."
      },
      {
        id: "edge.cloud.11",
        source: "company.TSM",
        target: "security.SMH",
        type: "constituent_flow",
        channel: "market",
        direction: "positive",
        strength: 0.68,
        confidence: 0.76,
        lag: "days-weeks",
        lifecycle: "confirmed",
        evidence: "ETF constituent and semiconductor beta."
      },
      {
        id: "edge.cloud.12",
        source: "company.NVDA",
        target: "action.hold_winners",
        type: "portfolio_mapping",
        channel: "portfolio",
        direction: "positive",
        strength: 0.8,
        confidence: 0.79,
        lag: "now",
        lifecycle: "active",
        evidence: "Existing holding with direct positive exposure."
      },
      {
        id: "edge.cloud.13",
        source: "company.AVGO",
        target: "action.add_watchlist",
        type: "portfolio_mapping",
        channel: "portfolio",
        direction: "positive",
        strength: 0.72,
        confidence: 0.7,
        lag: "now",
        lifecycle: "candidate",
        evidence: "New candidate through networking and ASIC paths."
      },
      {
        id: "edge.cloud.14",
        source: "company.ANET",
        target: "action.add_watchlist",
        type: "portfolio_mapping",
        channel: "portfolio",
        direction: "positive",
        strength: 0.66,
        confidence: 0.68,
        lag: "now",
        lifecycle: "candidate",
        evidence: "New candidate through data center networking path."
      },
      {
        id: "edge.cloud.15",
        source: "company.VRT",
        target: "action.add_watchlist",
        type: "portfolio_mapping",
        channel: "portfolio",
        direction: "positive",
        strength: 0.59,
        confidence: 0.64,
        lag: "now",
        lifecycle: "watch",
        evidence: "Second-order infrastructure beneficiary."
      },
      {
        id: "edge.export.01",
        source: "event.export_control",
        target: "driver.restricted_shipments",
        type: "regulatory_constraint",
        channel: "risk",
        direction: "negative",
        strength: 0.82,
        confidence: 0.78,
        lag: "immediate",
        lifecycle: "strengthened",
        evidence: "Policy restriction changes shipment eligibility."
      },
      {
        id: "edge.export.02",
        source: "event.export_control",
        target: "driver.local_substitution",
        type: "policy_trigger",
        channel: "operating",
        direction: "positive",
        strength: 0.72,
        confidence: 0.69,
        lag: "1-4 quarters",
        lifecycle: "strengthened",
        evidence: "Local supply chain substitution becomes more salient."
      },
      {
        id: "edge.export.03",
        source: "driver.restricted_shipments",
        target: "product.global_ai_chips",
        type: "revenue_risk",
        channel: "risk",
        direction: "mixed",
        strength: 0.66,
        confidence: 0.67,
        lag: "1-2 quarters",
        lifecycle: "watch",
        evidence: "Restricted regions lose access while other regions may absorb supply."
      },
      {
        id: "edge.export.04",
        source: "driver.local_substitution",
        target: "segment.hk_china_foundry",
        type: "substitution_demand",
        channel: "operating",
        direction: "positive",
        strength: 0.7,
        confidence: 0.66,
        lag: "2-4 quarters",
        lifecycle: "candidate",
        evidence: "Local design and foundry chain receives attention."
      },
      {
        id: "edge.export.05",
        source: "product.global_ai_chips",
        target: "company.NVDA",
        type: "regional_revenue_risk",
        channel: "operating",
        direction: "mixed",
        strength: 0.64,
        confidence: 0.7,
        lag: "1-2 quarters",
        lifecycle: "watch",
        evidence: "High-end chips face regional limits, global AI demand remains."
      },
      {
        id: "edge.export.06",
        source: "product.global_ai_chips",
        target: "company.TSM",
        type: "customer_compliance_risk",
        channel: "risk",
        direction: "mixed",
        strength: 0.58,
        confidence: 0.65,
        lag: "1-3 quarters",
        lifecycle: "watch",
        evidence: "Foundry demand is exposed to customer and region mix."
      },
      {
        id: "edge.export.07",
        source: "segment.hk_china_foundry",
        target: "company.0981.HK",
        type: "local_foundry_demand",
        channel: "operating",
        direction: "positive",
        strength: 0.67,
        confidence: 0.63,
        lag: "2-4 quarters",
        lifecycle: "candidate",
        evidence: "Local substitution and policy support."
      },
      {
        id: "edge.export.08",
        source: "segment.hk_china_foundry",
        target: "company.1347.HK",
        type: "mature_node_demand",
        channel: "operating",
        direction: "positive",
        strength: 0.61,
        confidence: 0.61,
        lag: "2-4 quarters",
        lifecycle: "candidate",
        evidence: "Mature-node substitution exposure."
      },
      {
        id: "edge.export.09",
        source: "event.export_control",
        target: "security.SMH",
        type: "risk_premium",
        channel: "market",
        direction: "mixed",
        strength: 0.62,
        confidence: 0.7,
        lag: "days-weeks",
        lifecycle: "active",
        evidence: "Semiconductor factor volatility may rise."
      },
      {
        id: "edge.export.10",
        source: "company.NVDA",
        target: "action.monitor_exposure",
        type: "portfolio_mapping",
        channel: "portfolio",
        direction: "mixed",
        strength: 0.72,
        confidence: 0.73,
        lag: "now",
        lifecycle: "active",
        evidence: "Existing holding with higher regulatory risk."
      },
      {
        id: "edge.export.11",
        source: "company.0981.HK",
        target: "action.add_local_watchlist",
        type: "portfolio_mapping",
        channel: "portfolio",
        direction: "positive",
        strength: 0.6,
        confidence: 0.58,
        lag: "now",
        lifecycle: "candidate",
        evidence: "Local foundry candidate from substitution path."
      },
      {
        id: "edge.export.12",
        source: "company.1347.HK",
        target: "action.add_local_watchlist",
        type: "portfolio_mapping",
        channel: "portfolio",
        direction: "positive",
        strength: 0.56,
        confidence: 0.56,
        lag: "now",
        lifecycle: "candidate",
        evidence: "Mature-node local foundry candidate."
      },
      {
        id: "edge.rate.01",
        source: "macro.rate_path_lower",
        target: "driver.valuation_multiple",
        type: "discount_rate",
        channel: "macro",
        direction: "positive",
        strength: 0.75,
        confidence: 0.73,
        lag: "days-weeks",
        lifecycle: "active",
        evidence: "Lower yields support long-duration valuation."
      },
      {
        id: "edge.rate.02",
        source: "macro.rate_path_lower",
        target: "driver.financing_cost",
        type: "funding_cost",
        channel: "macro",
        direction: "positive",
        strength: 0.64,
        confidence: 0.68,
        lag: "1-3 quarters",
        lifecycle: "watch",
        evidence: "Rate path affects debt refinancing and capex hurdle rates."
      },
      {
        id: "edge.rate.03",
        source: "driver.valuation_multiple",
        target: "sector.growth_tech",
        type: "factor_exposure",
        channel: "market",
        direction: "positive",
        strength: 0.72,
        confidence: 0.7,
        lag: "days-weeks",
        lifecycle: "active",
        evidence: "Growth tech has long-duration cash flow sensitivity."
      },
      {
        id: "edge.rate.04",
        source: "driver.financing_cost",
        target: "sector.banks",
        type: "sector_margin",
        channel: "market",
        direction: "mixed",
        strength: 0.48,
        confidence: 0.56,
        lag: "1-3 quarters",
        lifecycle: "watch",
        evidence: "Funding relief helps credit, while lower rates can pressure NIM."
      },
      {
        id: "edge.rate.05",
        source: "sector.growth_tech",
        target: "security.QQQ",
        type: "etf_factor_flow",
        channel: "market",
        direction: "positive",
        strength: 0.73,
        confidence: 0.72,
        lag: "days-weeks",
        lifecycle: "confirmed",
        evidence: "QQQ maps large-cap growth factor flow."
      },
      {
        id: "edge.rate.06",
        source: "sector.growth_tech",
        target: "company.NVDA",
        type: "valuation_support",
        channel: "market",
        direction: "positive",
        strength: 0.63,
        confidence: 0.64,
        lag: "days-weeks",
        lifecycle: "active",
        evidence: "High-growth AI leaders benefit from lower discount rates."
      },
      {
        id: "edge.rate.07",
        source: "macro.rate_path_lower",
        target: "security.TLT",
        type: "duration_price",
        channel: "market",
        direction: "positive",
        strength: 0.77,
        confidence: 0.7,
        lag: "days-weeks",
        lifecycle: "active",
        evidence: "Long-duration Treasuries are sensitive to yield decline."
      },
      {
        id: "edge.rate.08",
        source: "security.QQQ",
        target: "action.hold_growth",
        type: "portfolio_mapping",
        channel: "portfolio",
        direction: "positive",
        strength: 0.68,
        confidence: 0.68,
        lag: "now",
        lifecycle: "active",
        evidence: "Existing growth ETF exposure benefits from macro channel."
      },
      {
        id: "edge.rate.09",
        source: "macro.rate_path_lower",
        target: "action.watch_macro_reversal",
        type: "risk_monitor",
        channel: "portfolio",
        direction: "mixed",
        strength: 0.55,
        confidence: 0.62,
        lag: "now",
        lifecycle: "watch",
        evidence: "Inflation rebound would weaken this path."
      }
    ]
  },
  scenarios: {
    cloudCapex: {
      name: "云厂商上调 AI capex",
      newsUrl: "https://example.com/news/cloud-provider-raises-ai-capex-guidance",
      eventText:
        "A large cloud provider raised its FY2026 AI data center capex guidance, citing stronger demand for training clusters, high-speed networking, and accelerated compute capacity.",
      summary: {
        eventType: "capex_increase",
        channel: "operating + market",
        confidence: 84,
        affectedWeight: 62,
        candidateCount: 5
      },
      extraction: {
        sourceType: "news_url + pasted excerpt",
        urlStatus: "accepted",
        normalizedTrigger: "Cloud provider raises AI data center capex guidance",
        eventClass: "capex_increase",
        entities: ["cloud provider", "AI data center", "GPU", "HBM", "CoWoS", "networking", "power equipment"],
        keySignals: [
          { label: "Demand", value: "training clusters and accelerated compute capacity" },
          { label: "Product", value: "GPU / HBM / CoWoS / high-speed networking" },
          { label: "Time window", value: "FY2026 guidance, 0-4 quarter propagation" },
          { label: "Primary channel", value: "operating graph, then market graph" }
        ],
        evidenceSnippets: [
          "raised FY2026 AI data center capex guidance",
          "stronger demand for training clusters and high-speed networking"
        ]
      },
      mutations: [
        {
          edgeId: "edge.cloud.01",
          operation: "strengthen",
          before: { lifecycle: "active", strength: 0.62, confidence: 0.7 },
          after: { lifecycle: "strengthened", strength: 0.88, confidence: 0.84 },
          reason: "Capex guidance directly increases confidence in AI server demand."
        },
        {
          edgeId: "edge.cloud.03",
          operation: "strengthen",
          before: { lifecycle: "watch", strength: 0.52, confidence: 0.61 },
          after: { lifecycle: "strengthened", strength: 0.79, confidence: 0.76 },
          reason: "News explicitly mentions high-speed networking in AI clusters."
        },
        {
          edgeId: "edge.cloud.04",
          operation: "add_candidate",
          before: { lifecycle: "absent", strength: 0, confidence: 0 },
          after: { lifecycle: "watch", strength: 0.67, confidence: 0.72 },
          reason: "Higher rack density creates a second-order power and cooling path."
        },
        {
          edgeId: "edge.cloud.13",
          operation: "add_candidate",
          before: { lifecycle: "absent", strength: 0, confidence: 0 },
          after: { lifecycle: "candidate", strength: 0.72, confidence: 0.7 },
          reason: "Broadcom becomes a candidate through ASIC and networking exposure."
        }
      ],
      graphPath: [
        { title: "Trigger", nodeIds: ["event.cloud_capex"] },
        { title: "Drivers", nodeIds: ["driver.ai_server_demand", "driver.high_speed_networking"] },
        { title: "Supply Chain", nodeIds: ["product.gpu_hbm_cowos", "driver.power_cooling"] },
        { title: "Assets", nodeIds: ["company.NVDA", "company.TSM", "security.SMH", "company.AVGO", "company.ANET", "company.VRT"] },
        { title: "Portfolio", nodeIds: ["action.hold_winners", "action.add_watchlist"] }
      ],
      edgeIds: [
        "edge.cloud.01",
        "edge.cloud.02",
        "edge.cloud.03",
        "edge.cloud.04",
        "edge.cloud.05",
        "edge.cloud.06",
        "edge.cloud.07",
        "edge.cloud.08",
        "edge.cloud.09",
        "edge.cloud.10",
        "edge.cloud.11",
        "edge.cloud.12",
        "edge.cloud.13",
        "edge.cloud.14",
        "edge.cloud.15"
      ],
      nodeSignals: {
        "event.cloud_capex": {
          impact: "positive",
          note: "客户预算流入 AI infrastructure"
        },
        "driver.ai_server_demand": {
          impact: "positive",
          note: "训练集群和推理容量扩张"
        },
        "driver.high_speed_networking": {
          impact: "positive",
          note: "交换机、网卡、光模块需求上升"
        },
        "product.gpu_hbm_cowos": {
          impact: "positive",
          note: "计算、存储和先进封装共同受益"
        },
        "driver.power_cooling": {
          impact: "positive",
          note: "电力和热管理成为新增瓶颈"
        },
        "company.NVDA": {
          impact: "positive",
          note: "组合内已有直接暴露"
        },
        "company.TSM": {
          impact: "positive",
          note: "先进制程和 CoWoS 暴露"
        },
        "security.SMH": {
          impact: "market",
          note: "半导体 ETF 接收主题资金通道"
        },
        "company.AVGO": {
          impact: "market",
          note: "新增关注：ASIC 和网络芯片"
        },
        "company.ANET": {
          impact: "market",
          note: "新增关注：高速网络"
        },
        "company.VRT": {
          impact: "market",
          note: "新增关注：电力和热管理"
        },
        "action.hold_winners": {
          impact: "positive",
          note: "继续持有 NVDA、TSM、SMH，观察订单和估值拥挤"
        },
        "action.add_watchlist": {
          impact: "market",
          note: "新增关注 AVGO、ANET、VRT"
        }
      },
      pathColumns: [
        {
          title: "Trigger",
          nodes: [
            {
              title: "Cloud AI capex up",
              impact: "positive",
              meta: "event type: capex increase",
              note: "客户预算流入 AI infrastructure"
            }
          ]
        },
        {
          title: "Drivers",
          nodes: [
            {
              title: "AI server demand",
              impact: "positive",
              meta: "lag: 0-2 quarters",
              note: "训练集群和推理容量扩张"
            },
            {
              title: "High-speed networking",
              impact: "positive",
              meta: "channel: operating",
              note: "交换机、网卡、光模块需求上升"
            }
          ]
        },
        {
          title: "Supply Chain",
          nodes: [
            {
              title: "GPU / HBM / CoWoS",
              impact: "positive",
              meta: "confidence: high",
              note: "计算、存储和先进封装共同受益"
            },
            {
              title: "Power / cooling",
              impact: "positive",
              meta: "confidence: medium",
              note: "电力和热管理成为新增瓶颈"
            }
          ]
        },
        {
          title: "Assets",
          nodes: [
            {
              title: "NVDA / TSM / SMH",
              impact: "positive",
              meta: "existing holdings",
              note: "组合内已有直接暴露"
            },
            {
              title: "AVGO / ANET / VRT",
              impact: "market",
              meta: "new candidates",
              note: "新增关注：网络、ASIC、电力设备"
            }
          ]
        },
        {
          title: "Portfolio",
          nodes: [
            {
              title: "Hold winners",
              impact: "positive",
              meta: "action: hold / monitor",
              note: "继续持有 NVDA、TSM、SMH，观察订单和估值拥挤"
            },
            {
              title: "Add watchlist",
              impact: "market",
              meta: "action: add",
              note: "新增关注 AVGO、ANET、VRT"
            }
          ]
        }
      ],
      portfolioImpact: [
        {
          ticker: "NVDA",
          action: "hold",
          direction: "positive",
          weightImpact: "+",
          text: "Data center GPU 和 networking 需求预期增强，但估值拥挤需要监控。"
        },
        {
          ticker: "TSM",
          action: "hold",
          direction: "positive",
          weightImpact: "+",
          text: "先进制程和 CoWoS 需求强化，受益但需关注产能和地缘风险。"
        },
        {
          ticker: "SMH",
          action: "hold",
          direction: "positive",
          weightImpact: "+",
          text: "半导体 ETF 受益于主题资金和成分股同步上修。"
        },
        {
          ticker: "AAPL",
          action: "monitor",
          direction: "mixed",
          weightImpact: "0",
          text: "非直接受益；AI capex 主题可能带来资金从消费电子向基础设施轮动。"
        }
      ],
      recommendations: [
        {
          ticker: "AVGO",
          name: "Broadcom",
          action: "add",
          direction: "positive",
          channel: "operating",
          confidence: 81,
          timeWindow: "1-3 months",
          rationale: "云厂商 AI ASIC 与网络芯片支出提升，可能带来订单和估值双通道支持。",
          path: "Cloud capex -> AI ASIC / networking -> AVGO revenue expectations",
          risks: "客户集中、估值已提前反映、订单确认节奏。",
          validation: "云厂商 capex 指引、交换芯片订单、管理层 backlog 表述。"
        },
        {
          ticker: "ANET",
          name: "Arista Networks",
          action: "add",
          direction: "positive",
          channel: "operating",
          confidence: 76,
          timeWindow: "1-2 quarters",
          rationale: "AI 集群扩张推动高速以太网和数据中心交换需求。",
          path: "Cloud capex -> high-speed networking -> data center switch demand",
          risks: "云客户采购节奏、竞争、毛利率压力。",
          validation: "云客户订单、交换机端口出货、财报指引。"
        },
        {
          ticker: "VRT",
          name: "Vertiv",
          action: "monitor",
          direction: "positive",
          channel: "operating",
          confidence: 72,
          timeWindow: "2-4 quarters",
          rationale: "数据中心电力和热管理成为 AI capex 的二阶受益环节。",
          path: "AI data center buildout -> power density -> cooling / power equipment",
          risks: "订单滞后、供应瓶颈、周期性估值波动。",
          validation: "液冷/电源订单、backlog、数据中心建设进度。"
        }
      ],
      trace: [
        {
          agent: "Event Router Agent",
          output: { event_type: "capex_increase", primary_channel: "operating", urgency: "medium_high" }
        },
        {
          agent: "Entity Extraction Agent",
          output: { entities: ["cloud provider", "AI data center", "GPU", "networking", "power equipment"] }
        },
        {
          agent: "Graph Mutation Agent",
          output: {
            strengthen_edges: ["Cloud Capex -> AI Server Demand", "AI Server -> GPU/HBM", "AI Server -> Networking"],
            new_watch_edges: ["AI Data Center -> Power/Cooling"]
          }
        },
        {
          agent: "Propagation Reasoning Agent",
          output: { hops: 3, affected_layers: ["Operating Graph", "Market Graph"], top_paths: 4 }
        },
        {
          agent: "Recommendation Agent",
          output: { actions: ["hold NVDA/TSM/SMH", "monitor AAPL", "add AVGO/ANET/VRT"] }
        }
      ],
      evidence: [
        {
          title: "Public source pattern",
          text: "Demo 使用公开新闻/财报可得字段的事件结构，不依赖内幕信息。"
        },
        {
          title: "Validation signals",
          text: "后续验证信号包括云厂商 capex、GPU/HBM 供需、网络设备订单、电力设备 backlog。"
        },
        {
          title: "Uncertainty",
          text: "边权为 demo 估计；供应链采购金额通常不会完全披露，需要置信度管理。"
        }
      ]
    },
    exportControl: {
      name: "出口管制加强",
      newsUrl: "https://example.com/news/new-export-control-rules-ai-accelerators",
      eventText:
        "New export control rules further restrict advanced AI accelerator shipments to selected regions, increasing compliance risk for global semiconductor supply chains.",
      summary: {
        eventType: "regulation",
        channel: "risk + operating",
        confidence: 78,
        affectedWeight: 54,
        candidateCount: 4
      },
      extraction: {
        sourceType: "news_url + pasted excerpt",
        urlStatus: "accepted",
        normalizedTrigger: "New export controls restrict advanced AI accelerator shipments",
        eventClass: "regulation",
        entities: ["advanced AI accelerator", "selected regions", "export control", "NVDA", "TSM", "local foundry"],
        keySignals: [
          { label: "Regulatory action", value: "further restrict selected regions" },
          { label: "Affected product", value: "advanced AI accelerator" },
          { label: "Risk channel", value: "shipment eligibility and compliance" },
          { label: "Substitution channel", value: "local semiconductor supply chain" }
        ],
        evidenceSnippets: [
          "restrict advanced AI accelerator shipments",
          "increasing compliance risk for global semiconductor supply chains"
        ]
      },
      mutations: [
        {
          edgeId: "edge.export.01",
          operation: "strengthen_negative",
          before: { lifecycle: "watch", strength: 0.55, confidence: 0.62 },
          after: { lifecycle: "strengthened", strength: 0.82, confidence: 0.78 },
          reason: "Policy language increases the negative shipment constraint edge."
        },
        {
          edgeId: "edge.export.02",
          operation: "strengthen",
          before: { lifecycle: "watch", strength: 0.5, confidence: 0.57 },
          after: { lifecycle: "strengthened", strength: 0.72, confidence: 0.69 },
          reason: "Regulatory pressure raises local substitution attention."
        },
        {
          edgeId: "edge.export.04",
          operation: "add_candidate",
          before: { lifecycle: "absent", strength: 0, confidence: 0 },
          after: { lifecycle: "candidate", strength: 0.7, confidence: 0.66 },
          reason: "Local foundry segment becomes an explicit propagation path."
        },
        {
          edgeId: "edge.export.09",
          operation: "activate_risk",
          before: { lifecycle: "watch", strength: 0.38, confidence: 0.5 },
          after: { lifecycle: "active", strength: 0.62, confidence: 0.7 },
          reason: "Regulation shock increases semiconductor ETF volatility risk."
        }
      ],
      graphPath: [
        { title: "Trigger", nodeIds: ["event.export_control"] },
        { title: "Drivers", nodeIds: ["driver.restricted_shipments", "driver.local_substitution"] },
        { title: "Supply Chain", nodeIds: ["product.global_ai_chips", "segment.hk_china_foundry"] },
        { title: "Assets", nodeIds: ["company.NVDA", "company.TSM", "security.SMH", "company.0981.HK", "company.1347.HK"] },
        { title: "Portfolio", nodeIds: ["action.monitor_exposure", "action.add_local_watchlist"] }
      ],
      edgeIds: [
        "edge.export.01",
        "edge.export.02",
        "edge.export.03",
        "edge.export.04",
        "edge.export.05",
        "edge.export.06",
        "edge.export.07",
        "edge.export.08",
        "edge.export.09",
        "edge.export.10",
        "edge.export.11",
        "edge.export.12"
      ],
      nodeSignals: {
        "event.export_control": {
          impact: "negative",
          note: "监管限制改变跨国供需路径"
        },
        "driver.restricted_shipments": {
          impact: "negative",
          note: "高端 AI 芯片出货受限"
        },
        "driver.local_substitution": {
          impact: "positive",
          note: "本地供应链关注度上升"
        },
        "product.global_ai_chips": {
          impact: "mixed",
          note: "收入受限，但其他地区需求仍强"
        },
        "segment.hk_china_foundry": {
          impact: "positive",
          note: "国产替代与成熟制程关注上升"
        },
        "company.NVDA": {
          impact: "mixed",
          note: "短期风险上升，长期需求仍需分地区看"
        },
        "company.TSM": {
          impact: "mixed",
          note: "客户合规和地缘风险上升"
        },
        "security.SMH": {
          impact: "market",
          note: "监管事件可能提高半导体因子波动"
        },
        "company.0981.HK": {
          impact: "market",
          note: "替代链条可能获得资金关注"
        },
        "company.1347.HK": {
          impact: "market",
          note: "成熟制程替代链条关注度上升"
        },
        "action.monitor_exposure": {
          impact: "mixed",
          note: "降低单一监管风险，跟踪收入地区暴露"
        },
        "action.add_local_watchlist": {
          impact: "market",
          note: "关注港股半导体替代链"
        }
      },
      pathColumns: [
        {
          title: "Trigger",
          nodes: [
            {
              title: "Export control",
              impact: "negative",
              meta: "event type: regulation",
              note: "监管限制改变跨国供需路径"
            }
          ]
        },
        {
          title: "Drivers",
          nodes: [
            {
              title: "Restricted shipments",
              impact: "negative",
              meta: "channel: risk",
              note: "高端 AI 芯片出货受限"
            },
            {
              title: "Local substitution",
              impact: "positive",
              meta: "channel: operating",
              note: "本地供应链关注度上升"
            }
          ]
        },
        {
          title: "Supply Chain",
          nodes: [
            {
              title: "Global AI chips",
              impact: "mixed",
              meta: "confidence: medium",
              note: "收入受限，但其他地区需求仍强"
            },
            {
              title: "HK/China foundry",
              impact: "positive",
              meta: "confidence: medium",
              note: "国产替代与成熟制程关注上升"
            }
          ]
        },
        {
          title: "Assets",
          nodes: [
            {
              title: "NVDA / TSM",
              impact: "mixed",
              meta: "existing holdings",
              note: "短期风险上升，长期需求仍需分地区看"
            },
            {
              title: "0981.HK / 1347.HK",
              impact: "market",
              meta: "cross-market candidates",
              note: "替代链条可能获得资金关注"
            }
          ]
        },
        {
          title: "Portfolio",
          nodes: [
            {
              title: "Monitor exposure",
              impact: "mixed",
              meta: "action: monitor / reduce",
              note: "降低单一监管风险，跟踪收入地区暴露"
            },
            {
              title: "Add local watchlist",
              impact: "market",
              meta: "action: add watch",
              note: "关注港股半导体替代链"
            }
          ]
        }
      ],
      portfolioImpact: [
        {
          ticker: "NVDA",
          action: "monitor",
          direction: "mixed",
          weightImpact: "-",
          text: "高端芯片区域出货限制提高监管风险；其他地区需求仍提供支撑。"
        },
        {
          ticker: "TSM",
          action: "monitor",
          direction: "mixed",
          weightImpact: "0",
          text: "先进制程需求强，但跨境客户合规和地缘风险需要关注。"
        },
        {
          ticker: "0981.HK",
          action: "hold",
          direction: "positive",
          weightImpact: "+",
          text: "国产替代叙事升温，但技术差距和资本开支效率仍是关键风险。"
        }
      ],
      recommendations: [
        {
          ticker: "0981.HK",
          name: "SMIC",
          action: "monitor",
          direction: "positive",
          channel: "operating",
          confidence: 68,
          timeWindow: "2-4 quarters",
          rationale: "本地替代和政策资金关注度提升，但财务兑现节奏较慢。",
          path: "Export control -> local substitution -> foundry demand",
          risks: "技术限制、capex 强度、毛利率压力。",
          validation: "政策支持、订单、产能利用率、客户导入。"
        },
        {
          ticker: "1347.HK",
          name: "Hua Hong Semiconductor",
          action: "add",
          direction: "positive",
          channel: "operating",
          confidence: 64,
          timeWindow: "2-4 quarters",
          rationale: "成熟制程和本地供应链关注度提高。",
          path: "Export control -> mature-node substitution -> local foundry",
          risks: "周期下行、价格压力、产能爬坡。",
          validation: "晶圆价格、利用率、客户订单。"
        },
        {
          ticker: "SMH",
          name: "Semiconductor ETF",
          action: "hedge",
          direction: "mixed",
          channel: "market",
          confidence: 70,
          timeWindow: "1-2 months",
          rationale: "主题仍强，但监管事件可能提高短期波动。",
          path: "Regulation shock -> risk premium -> semiconductor factor volatility",
          risks: "政策细则、市场情绪、估值波动。",
          validation: "ETF flow、波动率、新闻跟踪。"
        }
      ],
      trace: [
        {
          agent: "Event Router Agent",
          output: { event_type: "regulation", primary_channel: "risk", urgency: "high" }
        },
        {
          agent: "Entity Extraction Agent",
          output: { entities: ["advanced AI accelerator", "selected regions", "semiconductor supply chains"] }
        },
        {
          agent: "Graph Mutation Agent",
          output: {
            weaken_edges: ["US AI Chips -> Restricted Region Demand"],
            strengthen_edges: ["Export Control -> Local Substitution", "Local Substitution -> HK/China Foundry"]
          }
        },
        {
          agent: "Propagation Reasoning Agent",
          output: { hops: 3, affected_layers: ["Operating Graph", "Macro Graph", "Market Graph"] }
        },
        {
          agent: "Recommendation Agent",
          output: { actions: ["monitor NVDA/TSM", "add local foundry watchlist", "hedge semiconductor volatility"] }
        }
      ],
      evidence: [
        {
          title: "Regulatory channel",
          text: "监管事件优先进入 risk channel，再影响收入区域暴露和市场风险溢价。"
        },
        {
          title: "Cross-market dimension",
          text: "该场景展示美国公司、台积电和港股半导体节点之间的跨市场传导。"
        },
        {
          title: "Validation signals",
          text: "需观察政策细则、公司地区收入披露、订单转移和本地供应链 capex。"
        }
      ]
    },
    rateCut: {
      name: "利率路径下修",
      newsUrl: "https://example.com/news/treasury-yields-drop-after-inflation-data",
      eventText:
        "Treasury yields dropped after weaker inflation data, and the market now prices a faster rate-cut path over the next two quarters.",
      summary: {
        eventType: "macro_rate_shock",
        channel: "macro + market",
        confidence: 73,
        affectedWeight: 58,
        candidateCount: 3
      },
      extraction: {
        sourceType: "news_url + pasted excerpt",
        urlStatus: "accepted",
        normalizedTrigger: "Treasury yields drop and market prices faster rate cuts",
        eventClass: "macro_rate_shock",
        entities: ["Treasury yields", "inflation data", "rate-cut path", "QQQ", "TLT", "growth tech"],
        keySignals: [
          { label: "Macro variable", value: "yield curve and rate-cut expectation" },
          { label: "Market channel", value: "discount rate and duration appetite" },
          { label: "Portfolio channel", value: "cash drag and hedge sleeve" },
          { label: "Validation", value: "CPI, FOMC language, 10Y yield, ETF flow" }
        ],
        evidenceSnippets: [
          "Treasury yields dropped after weaker inflation data",
          "market now prices a faster rate-cut path"
        ]
      },
      mutations: [
        {
          edgeId: "edge.rate.01",
          operation: "activate_macro",
          before: { lifecycle: "watch", strength: 0.48, confidence: 0.55 },
          after: { lifecycle: "active", strength: 0.75, confidence: 0.73 },
          reason: "Rate path shock activates discount-rate support for valuation multiples."
        },
        {
          edgeId: "edge.rate.03",
          operation: "strengthen",
          before: { lifecycle: "watch", strength: 0.5, confidence: 0.58 },
          after: { lifecycle: "active", strength: 0.72, confidence: 0.7 },
          reason: "Growth tech sensitivity rises when yields fall."
        },
        {
          edgeId: "edge.rate.07",
          operation: "activate_market",
          before: { lifecycle: "watch", strength: 0.46, confidence: 0.55 },
          after: { lifecycle: "active", strength: 0.77, confidence: 0.7 },
          reason: "Long-duration Treasury assets become a hedge candidate."
        },
        {
          edgeId: "edge.rate.09",
          operation: "add_monitor",
          before: { lifecycle: "absent", strength: 0, confidence: 0 },
          after: { lifecycle: "watch", strength: 0.55, confidence: 0.62 },
          reason: "Inflation reversal risk needs a dedicated monitor edge."
        }
      ],
      graphPath: [
        { title: "Trigger", nodeIds: ["macro.rate_path_lower"] },
        { title: "Drivers", nodeIds: ["driver.valuation_multiple", "driver.financing_cost"] },
        { title: "Sectors", nodeIds: ["sector.growth_tech", "sector.banks"] },
        { title: "Assets", nodeIds: ["security.QQQ", "company.NVDA", "asset.bonds_duration", "security.TLT"] },
        { title: "Portfolio", nodeIds: ["action.hold_growth", "action.watch_macro_reversal"] }
      ],
      edgeIds: [
        "edge.rate.01",
        "edge.rate.02",
        "edge.rate.03",
        "edge.rate.04",
        "edge.rate.05",
        "edge.rate.06",
        "edge.rate.07",
        "edge.rate.08",
        "edge.rate.09"
      ],
      nodeSignals: {
        "macro.rate_path_lower": {
          impact: "market",
          note: "折现率和资金成本预期下降"
        },
        "driver.valuation_multiple": {
          impact: "positive",
          note: "长久期成长资产估值支撑"
        },
        "driver.financing_cost": {
          impact: "positive",
          note: "高债务和 capex 密集公司压力下降"
        },
        "sector.growth_tech": {
          impact: "positive",
          note: "受益于折现率下行"
        },
        "sector.banks": {
          impact: "mixed",
          note: "融资环境改善但 NIM 或承压"
        },
        "security.QQQ": {
          impact: "market",
          note: "市场资金和估值通道受益"
        },
        "company.NVDA": {
          impact: "market",
          note: "估值通道受益，基本面仍取决于 AI capex"
        },
        "asset.bonds_duration": {
          impact: "positive",
          note: "债券久期资产可作为组合平衡"
        },
        "security.TLT": {
          impact: "positive",
          note: "收益率下行支撑久期资产"
        },
        "action.hold_growth": {
          impact: "positive",
          note: "成长资产受益，但需验证通胀路径"
        },
        "action.watch_macro_reversal": {
          impact: "mixed",
          note: "若通胀反弹，估值支撑会被削弱"
        }
      },
      pathColumns: [
        {
          title: "Trigger",
          nodes: [
            {
              title: "Rate path lower",
              impact: "market",
              meta: "event type: macro",
              note: "折现率和资金成本预期下降"
            }
          ]
        },
        {
          title: "Drivers",
          nodes: [
            {
              title: "Valuation multiple",
              impact: "positive",
              meta: "channel: market",
              note: "长久期成长资产估值支撑"
            },
            {
              title: "Financing cost",
              impact: "positive",
              meta: "channel: macro",
              note: "高债务和 capex 密集公司压力下降"
            }
          ]
        },
        {
          title: "Sectors",
          nodes: [
            {
              title: "Growth tech",
              impact: "positive",
              meta: "confidence: medium",
              note: "受益于折现率下行"
            },
            {
              title: "Banks",
              impact: "mixed",
              meta: "confidence: medium",
              note: "融资环境改善但 NIM 或承压"
            }
          ]
        },
        {
          title: "Assets",
          nodes: [
            {
              title: "QQQ / NVDA / MSFT",
              impact: "market",
              meta: "existing holdings",
              note: "市场资金和估值通道受益"
            },
            {
              title: "Bonds / duration",
              impact: "positive",
              meta: "hedge candidates",
              note: "债券久期资产可作为组合平衡"
            }
          ]
        },
        {
          title: "Portfolio",
          nodes: [
            {
              title: "Hold growth",
              impact: "positive",
              meta: "action: hold",
              note: "成长资产受益，但需验证通胀路径"
            },
            {
              title: "Watch macro reversal",
              impact: "mixed",
              meta: "action: monitor",
              note: "若通胀反弹，估值支撑会被削弱"
            }
          ]
        }
      ],
      portfolioImpact: [
        {
          ticker: "QQQ",
          action: "hold",
          direction: "positive",
          weightImpact: "+",
          text: "长久期成长股受益于折现率下降和资金风险偏好回升。"
        },
        {
          ticker: "NVDA",
          action: "hold",
          direction: "positive",
          weightImpact: "+",
          text: "估值通道受益，但基本面仍取决于 AI capex 兑现。"
        },
        {
          ticker: "CASH",
          action: "monitor",
          direction: "mixed",
          weightImpact: "-",
          text: "现金收益率预期下降，组合可能需要重新评估现金比例。"
        }
      ],
      recommendations: [
        {
          ticker: "QQQ",
          name: "Nasdaq 100 ETF",
          action: "hold",
          direction: "positive",
          channel: "market",
          confidence: 74,
          timeWindow: "1-3 months",
          rationale: "折现率下降支持成长股估值，资金可能回流 long-duration assets。",
          path: "Rate path lower -> discount rate lower -> growth multiple support",
          risks: "通胀反弹、收益率重新上行、估值拥挤。",
          validation: "CPI、FOMC 口径、10Y yield、ETF flow。"
        },
        {
          ticker: "TLT",
          name: "20+ Year Treasury ETF",
          action: "hedge",
          direction: "positive",
          channel: "macro",
          confidence: 70,
          timeWindow: "1-2 quarters",
          rationale: "若利率路径继续下修，久期资产可作为组合波动对冲。",
          path: "Rate path lower -> duration asset support -> hedge sleeve",
          risks: "利率反弹、期限溢价上升。",
          validation: "收益率曲线、通胀预期、央行表态。"
        }
      ],
      trace: [
        {
          agent: "Event Router Agent",
          output: { event_type: "macro_rate_shock", primary_channel: "market", urgency: "medium" }
        },
        {
          agent: "Macro Agent",
          output: { shock: "rate_path_down", affected_channels: ["valuation", "financing", "flow"] }
        },
        {
          agent: "Graph Mutation Agent",
          output: {
            strengthen_edges: ["Rate Path Down -> Growth Valuation", "Rate Path Down -> Duration Assets"],
            mixed_edges: ["Rate Path Down -> Bank NIM"]
          }
        },
        {
          agent: "Propagation Reasoning Agent",
          output: { hops: 2, affected_layers: ["Macro Graph", "Market Graph"] }
        },
        {
          agent: "Recommendation Agent",
          output: { actions: ["hold growth exposure", "monitor cash drag", "consider duration hedge"] }
        }
      ],
      evidence: [
        {
          title: "Macro channel",
          text: "利率路径下修同时影响估值倍数、融资成本和市场资金风险偏好。"
        },
        {
          title: "Validation signals",
          text: "需要跟踪 CPI、FOMC 表态、10Y yield、ETF flow 和成长股估值。"
        },
        {
          title: "Limitation",
          text: "宏观序列存在发布滞后和修订，demo 不做 point-in-time 回测。"
        }
      ]
    }
  }
};

augmentDemoGraph();

function augmentDemoGraph() {
  addCompanyTreeEntries({
    AAPL: {
      name: "Apple",
      type: "Company",
      business: "iPhone, Mac, services, wearables, Apple silicon",
      revenue: "Product cycle, installed base, services attach, region demand",
      cost: "Components, assembly, logistics, FX, regulatory compliance",
      financial: "Services margin, buyback, FCF stability, product gross margin",
      external: "Consumer demand, suppliers, QQQ/XLK flow, China exposure"
    },
    AMD: {
      name: "Advanced Micro Devices",
      type: "Company",
      business: "Data center GPU, CPU, embedded and gaming chips",
      revenue: "AI accelerator ramp, EPYC share, cloud demand, PC cycle",
      cost: "Foundry allocation, HBM supply, R&D, channel inventory",
      financial: "Revenue growth, gross margin, operating leverage, FCF",
      external: "Cloud AI capex, TSMC, HBM suppliers, SMH flow"
    },
    ASML: {
      name: "ASML",
      type: "Company",
      business: "EUV/DUV lithography equipment",
      revenue: "Advanced-node fab capex, installed base service, China DUV demand",
      cost: "Supply chain complexity, R&D, export compliance",
      financial: "Bookings, backlog, gross margin, FCF conversion",
      external: "Semiconductor equipment cycle, export controls, SMH flow"
    },
    AMAT: {
      name: "Applied Materials",
      type: "Company",
      business: "Semiconductor process equipment and services",
      revenue: "Foundry/logic capex, memory capex, services",
      cost: "Component supply, R&D, China compliance",
      financial: "Orders, margins, backlog, capital return",
      external: "Fab capex, export controls, semiconductor cycle"
    },
    LRCX: {
      name: "Lam Research",
      type: "Company",
      business: "Etch and deposition equipment",
      revenue: "Memory and foundry capex, installed base support",
      cost: "Supply chain, R&D, cycle-sensitive operating leverage",
      financial: "WFE exposure, gross margin, FCF, buybacks",
      external: "Memory cycle, advanced packaging, export controls"
    },
    KLAC: {
      name: "KLA",
      type: "Company",
      business: "Process control and inspection equipment",
      revenue: "Yield learning, advanced process complexity, services",
      cost: "R&D, precision supply chain, customer mix",
      financial: "Orders, recurring service, margin durability, FCF",
      external: "Advanced-node complexity, equipment capex, SMH flow"
    },
    MU: {
      name: "Micron",
      type: "Company",
      business: "DRAM, NAND, HBM memory",
      revenue: "HBM demand, data center memory, PC/mobile cycle",
      cost: "Capex, wafer starts, pricing cycle, inventory",
      financial: "ASP, utilization, gross margin, FCF cycle",
      external: "AI memory bandwidth, export controls, memory cycle"
    },
    MRVL: {
      name: "Marvell Technology",
      type: "Company",
      business: "Data infrastructure silicon, optical DSP, custom compute",
      revenue: "AI networking, custom silicon, storage and carrier demand",
      cost: "Foundry supply, R&D, customer concentration",
      financial: "Growth mix, margin recovery, FCF",
      external: "AI cluster networking, optical interconnect, cloud capex"
    },
    SMCI: {
      name: "Super Micro Computer",
      type: "Company",
      business: "AI servers and rack-scale infrastructure",
      revenue: "AI server deployments, GPU allocation, enterprise/cloud demand",
      cost: "Working capital, component supply, margin mix",
      financial: "Revenue growth, gross margin, inventory, cash conversion",
      external: "GPU supply, data center buildout, server cycle"
    },
    ETN: {
      name: "Eaton",
      type: "Company",
      business: "Electrical equipment, power management",
      revenue: "Data center electrical systems, grid investment, industrial demand",
      cost: "Input costs, backlog execution, labor",
      financial: "Backlog, organic growth, margin, FCF",
      external: "AI data center power demand, grid capex, industrial cycle"
    },
    PWR: {
      name: "Quanta Services",
      type: "Company",
      business: "Grid, utility, energy infrastructure services",
      revenue: "Transmission upgrades, data center power connections, utility capex",
      cost: "Labor, project execution, equipment availability",
      financial: "Backlog, margin, working capital, FCF",
      external: "Grid bottlenecks, data center power demand, rate environment"
    },
    MSFT: {
      name: "Microsoft",
      type: "Company",
      business: "Cloud, productivity software, AI platform",
      revenue: "Azure growth, AI services attach, enterprise software renewal",
      cost: "AI capex, data center opex, sales/R&D",
      financial: "Cloud margin, FCF, capex intensity, recurring revenue",
      external: "AI demand, rates, QQQ/XLK flow, enterprise budgets"
    },
    AMZN: {
      name: "Amazon",
      type: "Company",
      business: "AWS, e-commerce, advertising, logistics",
      revenue: "AWS growth, retail GMV, ad demand, subscription",
      cost: "Fulfillment, cloud capex, labor, energy",
      financial: "AWS margin, retail margin, FCF, capex intensity",
      external: "Consumer demand, cloud capex, rates, QQQ/XLY flow"
    },
    GOOGL: {
      name: "Alphabet",
      type: "Company",
      business: "Search, YouTube, cloud, AI infrastructure",
      revenue: "Advertising demand, cloud growth, AI product monetization",
      cost: "AI capex, TAC, R&D, regulatory compliance",
      financial: "Ad margin, cloud margin, FCF, buyback",
      external: "Digital ad cycle, AI capex, regulation, QQQ/XLK flow"
    },
    META: {
      name: "Meta Platforms",
      type: "Company",
      business: "Social platforms, ads, AI recommendation systems",
      revenue: "Ad demand, engagement, Reels monetization, AI tools",
      cost: "AI infrastructure capex, R&D, content moderation",
      financial: "Ad margin, capex intensity, FCF, buyback",
      external: "Digital ads, AI capex, rates, QQQ/XLK flow"
    },
    TSLA: {
      name: "Tesla",
      type: "Company",
      business: "EVs, energy storage, autonomy software",
      revenue: "EV deliveries, pricing, energy storage, software optionality",
      cost: "Battery costs, manufacturing utilization, incentives",
      financial: "Automotive margin, working capital, FCF, capex",
      external: "Rates, consumer credit, energy prices, XLY/QQQ flow"
    },
    ORCL: {
      name: "Oracle",
      type: "Company",
      business: "Cloud infrastructure, database, enterprise software",
      revenue: "OCI growth, database renewals, AI infrastructure demand",
      cost: "Cloud capex, data center opex, sales/R&D",
      financial: "Cloud growth, margin, debt, FCF",
      external: "Enterprise cloud demand, AI infrastructure, rates"
    },
    DELL: {
      name: "Dell Technologies",
      type: "Company",
      business: "Servers, storage, PCs, enterprise infrastructure",
      revenue: "AI server orders, enterprise refresh, storage demand",
      cost: "Component supply, inventory, margin mix",
      financial: "ISG growth, PC cycle, FCF, debt reduction",
      external: "AI server demand, GPU allocation, enterprise IT budgets"
    },
    JPM: {
      name: "JPMorgan Chase",
      type: "Company",
      business: "Banking, markets, asset management, payments",
      revenue: "Net interest income, fees, trading, credit demand",
      cost: "Funding costs, credit losses, compliance, technology",
      financial: "NIM, CET1, loan growth, credit quality, buyback",
      external: "Rate path, credit spreads, macro cycle, XLF flow"
    },
    BAC: {
      name: "Bank of America",
      type: "Company",
      business: "Consumer banking, wealth, markets, corporate banking",
      revenue: "NII, deposits, card spend, market activity",
      cost: "Deposit beta, credit provisions, expenses",
      financial: "NIM, securities portfolio, loan growth, capital return",
      external: "Rate path, credit cycle, XLF flow"
    },
    WMT: {
      name: "Walmart",
      type: "Company",
      business: "Discount retail, grocery, e-commerce, advertising",
      revenue: "Traffic, basket size, grocery share, membership/ads",
      cost: "Inventory, labor, logistics, shrink",
      financial: "Comparable sales, gross margin, inventory turns, FCF",
      external: "Consumer income, inflation, rates, XLY/defensive flow"
    },
    COST: {
      name: "Costco",
      type: "Company",
      business: "Warehouse retail and membership",
      revenue: "Membership renewal, traffic, basket size, international growth",
      cost: "Merchandise costs, labor, logistics",
      financial: "Comp sales, membership fee income, margin, inventory",
      external: "Consumer demand, inflation, defensive retail flow"
    },
    HD: {
      name: "Home Depot",
      type: "Company",
      business: "Home improvement retail",
      revenue: "Housing turnover, repair/remodel demand, Pro customer spend",
      cost: "Inventory, logistics, labor, commodity inputs",
      financial: "Comp sales, margin, inventory, FCF",
      external: "Mortgage rates, housing cycle, consumer credit"
    },
    CAT: {
      name: "Caterpillar",
      type: "Company",
      business: "Construction, mining, energy equipment",
      revenue: "Dealer inventory, infrastructure, mining capex, energy capex",
      cost: "Steel/components, labor, production utilization",
      financial: "Orders, backlog, margin, services, FCF",
      external: "Industrial capex, commodity cycle, rates"
    },
    XOM: {
      name: "Exxon Mobil",
      type: "Company",
      business: "Integrated oil and gas, refining, chemicals",
      revenue: "Oil/gas prices, refining margins, production volume",
      cost: "Capex, lifting costs, chemicals feedstock",
      financial: "FCF, dividends, buybacks, leverage",
      external: "Energy prices, USD, geopolitical supply, inflation"
    },
    "0700.HK": {
      name: "Tencent",
      type: "Company",
      business: "Social, games, fintech, cloud, AI applications",
      revenue: "Games, ads, fintech payments, cloud services",
      cost: "Content, cloud infrastructure, R&D, compliance",
      financial: "Ad/games growth, margin, investments, FCF",
      external: "China consumer internet, AI stack, HK market flow"
    },
    "9988.HK": {
      name: "Alibaba",
      type: "Company",
      business: "E-commerce, cloud, local services, logistics",
      revenue: "China commerce, cloud AI services, international commerce",
      cost: "Logistics, cloud capex, subsidies, compliance",
      financial: "Commerce margin, cloud growth, FCF, capital return",
      external: "China consumption, AI cloud demand, HK market flow"
    },
    BIDU: {
      name: "Baidu",
      type: "Company",
      business: "Search ads, AI cloud, autonomous driving",
      revenue: "Advertising, AI cloud, autonomous platform services",
      cost: "AI infrastructure, R&D, traffic acquisition",
      financial: "Ad recovery, cloud margin, FCF",
      external: "China AI stack, local accelerator supply, ADR/HK flow"
    },
    XLK: {
      name: "Technology Select Sector SPDR",
      type: "Market Asset",
      business: "Large-cap US technology sector ETF",
      revenue: "Not operating revenue; tracks constituent prices and fund flow",
      cost: "Expense ratio, liquidity, sector concentration",
      financial: "ETF flow, technology factor beta, valuation multiple",
      external: "Rates, mega-cap tech earnings, risk appetite"
    },
    XLF: {
      name: "Financial Select Sector SPDR",
      type: "Market Asset",
      business: "US financial sector ETF",
      revenue: "Not operating revenue; tracks constituent prices and fund flow",
      cost: "Expense ratio, liquidity, credit/rate cycle sensitivity",
      financial: "ETF flow, bank/insurance factor beta",
      external: "Rate path, credit spreads, NIM expectations"
    },
    XLY: {
      name: "Consumer Discretionary Select Sector SPDR",
      type: "Market Asset",
      business: "US consumer discretionary sector ETF",
      revenue: "Not operating revenue; tracks constituent prices and fund flow",
      cost: "Expense ratio, concentration, consumer cycle sensitivity",
      financial: "ETF flow, consumer beta, valuation multiple",
      external: "Rates, employment, consumer confidence"
    }
  });

  addGraphNodes([
    ...[
      ["company.AAPL", "Apple", "AAPL", "Apple product cycle and services ecosystem."],
      ["company.AMD", "AMD", "AMD", "AI accelerators, CPUs, and data center compute."],
      ["company.ASML", "ASML", "ASML", "Lithography equipment for advanced semiconductor manufacturing."],
      ["company.AMAT", "Applied Materials", "AMAT", "Semiconductor process equipment exposure."],
      ["company.LRCX", "Lam Research", "LRCX", "Etch/deposition equipment and memory capex exposure."],
      ["company.KLAC", "KLA", "KLAC", "Process control and inspection equipment exposure."],
      ["company.MU", "Micron", "MU", "DRAM, NAND, and HBM memory exposure."],
      ["company.MRVL", "Marvell", "MRVL", "AI networking, optical DSP, and custom compute exposure."],
      ["company.SMCI", "Supermicro", "SMCI", "AI server and rack-scale infrastructure exposure."],
      ["company.ETN", "Eaton", "ETN", "Electrical equipment and power management exposure."],
      ["company.PWR", "Quanta Services", "PWR", "Grid and utility infrastructure services exposure."],
      ["company.MSFT", "Microsoft", "MSFT", "Cloud, software, and AI platform exposure."],
      ["company.AMZN", "Amazon", "AMZN", "AWS, retail, advertising, and logistics exposure."],
      ["company.GOOGL", "Alphabet", "GOOGL", "Search, YouTube, cloud, and AI infrastructure exposure."],
      ["company.META", "Meta", "META", "Advertising and AI recommendation infrastructure exposure."],
      ["company.TSLA", "Tesla", "TSLA", "EV, energy storage, and autonomy exposure."],
      ["company.ORCL", "Oracle", "ORCL", "Cloud infrastructure and enterprise software exposure."],
      ["company.DELL", "Dell", "DELL", "AI servers, storage, and enterprise infrastructure exposure."],
      ["company.JPM", "JPMorgan", "JPM", "Banking, markets, and credit-cycle exposure."],
      ["company.BAC", "Bank of America", "BAC", "Consumer banking and rate-cycle exposure."],
      ["company.WMT", "Walmart", "WMT", "Defensive retail and consumer income exposure."],
      ["company.COST", "Costco", "COST", "Membership retail and consumer resilience exposure."],
      ["company.HD", "Home Depot", "HD", "Housing and repair/remodel demand exposure."],
      ["company.CAT", "Caterpillar", "CAT", "Industrial, construction, mining, and energy equipment exposure."],
      ["company.XOM", "Exxon Mobil", "XOM", "Integrated energy and oil/gas price exposure."],
      ["company.0700.HK", "Tencent", "0700.HK", "China internet, games, fintech, cloud, and AI application exposure."],
      ["company.9988.HK", "Alibaba", "9988.HK", "China commerce, cloud, logistics, and AI service exposure."],
      ["company.BIDU", "Baidu", "BIDU", "Search, AI cloud, and China AI stack exposure."]
    ].map(([id, label, ticker, description]) => ({
      id,
      label,
      ticker,
      type: "company",
      layer: "operating",
      treeId: ticker,
      description
    })),
    { id: "security.XLK", label: "XLK", ticker: "XLK", type: "security", layer: "market", treeId: "XLK", description: "US technology sector ETF flow exposure." },
    { id: "security.XLF", label: "XLF", ticker: "XLF", type: "security", layer: "market", treeId: "XLF", description: "US financial sector ETF flow exposure." },
    { id: "security.XLY", label: "XLY", ticker: "XLY", type: "security", layer: "market", treeId: "XLY", description: "US consumer discretionary ETF flow exposure." },
    { id: "driver.ai_inference_workloads", label: "AI inference workloads", type: "operating_driver", layer: "operating", description: "Production AI usage that converts infrastructure into software revenue." },
    { id: "driver.memory_bandwidth", label: "Memory bandwidth", type: "operating_driver", layer: "operating", description: "HBM/DRAM bandwidth bottleneck for AI clusters." },
    { id: "driver.data_center_power_grid", label: "Power grid bottleneck", type: "operating_driver", layer: "operating", description: "Power delivery and grid interconnect constraints for data centers." },
    { id: "product.custom_ai_asic", label: "Custom AI ASIC", type: "product_supply_chain", layer: "operating", description: "Cloud-designed AI accelerators and related silicon programs." },
    { id: "segment.semiconductor_equipment", label: "Semi equipment", type: "industry_segment", layer: "operating", description: "Equipment needed to build advanced semiconductor capacity." },
    { id: "segment.optical_interconnect", label: "Optical interconnect", type: "industry_segment", layer: "operating", description: "Optical DSP and high-speed interconnect demand in AI clusters." },
    { id: "driver.equipment_restrictions", label: "Equipment restrictions", type: "risk_driver", layer: "operating", description: "Export rules constraining semiconductor manufacturing equipment demand." },
    { id: "driver.local_ai_stack", label: "Local AI stack", type: "operating_driver", layer: "operating", description: "Local chips, cloud, software, and application ecosystem substitution." },
    { id: "segment.china_cloud_ai", label: "China cloud AI", type: "industry_segment", layer: "operating", description: "China cloud and AI service ecosystem exposed to domestic substitution." },
    { id: "driver.risk_appetite", label: "Risk appetite", type: "market_driver", layer: "market", description: "Market willingness to pay for duration and growth exposure." },
    { id: "driver.credit_spreads", label: "Credit spreads", type: "macro_driver", layer: "macro", description: "Credit conditions and risk premium channel." },
    { id: "driver.consumer_demand", label: "Consumer demand", type: "operating_driver", layer: "operating", description: "Household spending sensitivity to rates, labor, and inflation." },
    { id: "sector.cloud_platforms", label: "Cloud platforms", type: "sector", layer: "market", description: "Mega-cap cloud and enterprise AI platform exposure." },
    { id: "sector.consumer_retail", label: "Consumer retail", type: "sector", layer: "market", description: "Retail and discretionary demand exposure." },
    { id: "sector.housing", label: "Housing", type: "sector", layer: "market", description: "Mortgage-rate-sensitive housing and home improvement exposure." },
    { id: "sector.industrial_capex", label: "Industrial capex", type: "sector", layer: "market", description: "Industrial and equipment demand tied to capex cycles." },
    { id: "sector.energy", label: "Energy", type: "sector", layer: "market", description: "Oil, gas, refining, and energy price exposure." }
  ]);

  addGraphEdges([
    ...buildEdges("cloudx", [
      ["driver.ai_server_demand", "driver.ai_inference_workloads", "usage_conversion", "operating", "positive", 0.72, 0.68, "1-4 quarters", "candidate", "AI server deployments create production inference workloads."],
      ["driver.ai_server_demand", "product.custom_ai_asic", "custom_compute_demand", "operating", "positive", 0.7, 0.66, "1-4 quarters", "candidate", "Cloud AI capex can shift part of accelerator demand into custom silicon."],
      ["driver.ai_server_demand", "driver.memory_bandwidth", "memory_bottleneck", "operating", "positive", 0.76, 0.7, "0-3 quarters", "candidate", "AI clusters increase HBM and memory bandwidth demand."],
      ["driver.memory_bandwidth", "company.MU", "hbm_revenue", "operating", "positive", 0.67, 0.64, "1-3 quarters", "candidate", "HBM and data center memory demand can support Micron."],
      ["product.custom_ai_asic", "company.AVGO", "custom_asic_revenue", "operating", "positive", 0.78, 0.72, "1-4 quarters", "candidate", "Broadcom has custom ASIC and networking exposure."],
      ["product.custom_ai_asic", "company.AMD", "accelerator_competition", "operating", "positive", 0.62, 0.6, "1-4 quarters", "candidate", "AMD can receive second-source accelerator attention."],
      ["driver.ai_inference_workloads", "company.MSFT", "cloud_ai_revenue", "operating", "positive", 0.72, 0.66, "1-4 quarters", "candidate", "Azure AI usage can convert capex into software and cloud revenue."],
      ["driver.ai_inference_workloads", "company.AMZN", "cloud_ai_revenue", "operating", "positive", 0.68, 0.63, "1-4 quarters", "candidate", "AWS AI workloads can support cloud growth."],
      ["driver.ai_inference_workloads", "company.GOOGL", "cloud_ai_revenue", "operating", "positive", 0.64, 0.61, "1-4 quarters", "candidate", "Google Cloud and AI search products can monetize inference."],
      ["driver.ai_inference_workloads", "company.META", "ad_ai_efficiency", "operating", "positive", 0.58, 0.57, "1-4 quarters", "watch", "AI recommendation systems can improve ad efficiency, but capex is heavy."],
      ["driver.high_speed_networking", "segment.optical_interconnect", "interconnect_demand", "operating", "positive", 0.66, 0.62, "1-3 quarters", "candidate", "AI clusters require faster optical and electrical interconnect."],
      ["segment.optical_interconnect", "company.MRVL", "optical_dsp_revenue", "operating", "positive", 0.6, 0.58, "1-3 quarters", "candidate", "Marvell has AI networking and optical DSP exposure."],
      ["driver.ai_server_demand", "company.SMCI", "server_revenue", "operating", "positive", 0.61, 0.56, "0-2 quarters", "watch", "Rack-scale AI server demand can support Supermicro."],
      ["driver.ai_server_demand", "company.DELL", "server_revenue", "operating", "positive", 0.57, 0.55, "1-3 quarters", "watch", "Enterprise AI server demand can support Dell ISG."],
      ["driver.power_cooling", "driver.data_center_power_grid", "power_constraint", "operating", "positive", 0.68, 0.65, "2-6 quarters", "candidate", "Higher rack density increases power delivery and grid constraints."],
      ["driver.data_center_power_grid", "company.ETN", "electrical_equipment", "operating", "positive", 0.66, 0.63, "2-6 quarters", "candidate", "Electrical equipment demand can benefit Eaton."],
      ["driver.data_center_power_grid", "company.PWR", "grid_services", "operating", "positive", 0.58, 0.56, "2-6 quarters", "candidate", "Grid interconnect and utility work can support Quanta Services."],
      ["product.gpu_hbm_cowos", "segment.semiconductor_equipment", "capacity_capex", "operating", "positive", 0.64, 0.6, "2-6 quarters", "watch", "Advanced capacity demand can support equipment capex."],
      ["segment.semiconductor_equipment", "company.ASML", "equipment_revenue", "operating", "positive", 0.6, 0.58, "2-6 quarters", "watch", "Advanced node capacity depends on lithography tools."],
      ["segment.semiconductor_equipment", "company.AMAT", "equipment_revenue", "operating", "positive", 0.58, 0.56, "2-6 quarters", "watch", "Foundry and memory capex supports process equipment."],
      ["segment.semiconductor_equipment", "company.LRCX", "equipment_revenue", "operating", "positive", 0.56, 0.55, "2-6 quarters", "watch", "Memory and foundry capex supports etch/deposition demand."],
      ["segment.semiconductor_equipment", "company.KLAC", "equipment_revenue", "operating", "positive", 0.55, 0.55, "2-6 quarters", "watch", "Advanced process complexity supports inspection demand."],
      ["company.AMD", "security.SMH", "constituent_flow", "market", "positive", 0.58, 0.62, "days-weeks", "candidate", "AMD contributes to semiconductor ETF beta."],
      ["company.MU", "security.SMH", "constituent_flow", "market", "positive", 0.54, 0.6, "days-weeks", "candidate", "Memory cycle affects semiconductor ETF flow."],
      ["company.ASML", "security.SMH", "constituent_flow", "market", "positive", 0.52, 0.58, "days-weeks", "candidate", "Equipment leaders affect semiconductor factor flow."],
      ["company.MSFT", "security.XLK", "constituent_flow", "market", "positive", 0.7, 0.72, "days-weeks", "confirmed", "Microsoft maps into technology ETF flow."],
      ["company.GOOGL", "security.XLK", "constituent_flow", "market", "positive", 0.62, 0.66, "days-weeks", "candidate", "Alphabet contributes to tech/growth factor flow."],
      ["company.META", "security.XLK", "constituent_flow", "market", "positive", 0.58, 0.62, "days-weeks", "candidate", "Meta contributes to technology/growth factor flow."],
      ["company.AMZN", "security.XLY", "constituent_flow", "market", "positive", 0.6, 0.62, "days-weeks", "candidate", "Amazon contributes to consumer discretionary factor flow."],
      ["company.ETN", "action.add_watchlist", "portfolio_mapping", "portfolio", "positive", 0.6, 0.6, "now", "candidate", "Electrical equipment becomes a data center power watchlist candidate."],
      ["company.PWR", "action.add_watchlist", "portfolio_mapping", "portfolio", "positive", 0.54, 0.56, "now", "watch", "Grid services become a second-order data center candidate."],
      ["company.SMCI", "action.add_watchlist", "portfolio_mapping", "portfolio", "positive", 0.56, 0.54, "now", "watch", "AI server exposure is direct but operational risk requires monitoring."],
      ["company.DELL", "action.add_watchlist", "portfolio_mapping", "portfolio", "positive", 0.52, 0.54, "now", "watch", "Dell can benefit from enterprise AI server demand."],
      ["company.MRVL", "action.add_watchlist", "portfolio_mapping", "portfolio", "positive", 0.54, 0.55, "now", "candidate", "AI networking and optical DSP exposure enters watchlist."]
    ]),
    ...buildEdges("exportx", [
      ["event.export_control", "driver.equipment_restrictions", "equipment_policy_risk", "risk", "negative", 0.7, 0.68, "immediate", "candidate", "Export policy can constrain semiconductor equipment shipments."],
      ["driver.equipment_restrictions", "segment.semiconductor_equipment", "equipment_demand_constraint", "risk", "negative", 0.66, 0.64, "1-4 quarters", "watch", "Equipment demand may be delayed or rerouted by restrictions."],
      ["segment.semiconductor_equipment", "company.ASML", "equipment_revenue_risk", "risk", "mixed", 0.58, 0.61, "1-4 quarters", "watch", "ASML exposure depends on DUV/EUV rule scope and geography."],
      ["segment.semiconductor_equipment", "company.AMAT", "equipment_revenue_risk", "risk", "mixed", 0.55, 0.58, "1-4 quarters", "watch", "Applied Materials faces geography and product-scope risk."],
      ["segment.semiconductor_equipment", "company.LRCX", "equipment_revenue_risk", "risk", "mixed", 0.54, 0.56, "1-4 quarters", "watch", "Lam has memory/foundry equipment exposure to rule changes."],
      ["segment.semiconductor_equipment", "company.KLAC", "equipment_revenue_risk", "risk", "mixed", 0.5, 0.55, "1-4 quarters", "watch", "KLA faces inspection-equipment geography risk."],
      ["event.export_control", "driver.local_ai_stack", "local_stack_trigger", "operating", "positive", 0.62, 0.6, "1-4 quarters", "candidate", "Restrictions can accelerate local AI stack investment."],
      ["driver.local_ai_stack", "segment.china_cloud_ai", "local_cloud_ai_demand", "operating", "positive", 0.58, 0.56, "2-6 quarters", "candidate", "Domestic cloud and AI services receive substitution attention."],
      ["segment.china_cloud_ai", "company.0700.HK", "china_ai_application", "operating", "positive", 0.52, 0.52, "2-6 quarters", "watch", "Tencent can benefit from local AI application demand."],
      ["segment.china_cloud_ai", "company.9988.HK", "china_cloud_ai", "operating", "positive", 0.55, 0.54, "2-6 quarters", "watch", "Alibaba Cloud can receive local AI stack attention."],
      ["segment.china_cloud_ai", "company.BIDU", "china_ai_cloud", "operating", "positive", 0.56, 0.54, "2-6 quarters", "watch", "Baidu AI cloud and model ecosystem can receive local-stack attention."],
      ["driver.restricted_shipments", "company.AMD", "regional_revenue_risk", "risk", "mixed", 0.56, 0.58, "1-3 quarters", "watch", "AMD accelerator sales may face similar regional eligibility questions."],
      ["company.AMD", "action.monitor_exposure", "portfolio_mapping", "portfolio", "mixed", 0.54, 0.56, "now", "watch", "Monitor AMD regional AI accelerator exposure."],
      ["company.0700.HK", "action.add_local_watchlist", "portfolio_mapping", "portfolio", "positive", 0.48, 0.5, "now", "watch", "Tencent enters local AI application watchlist."],
      ["company.9988.HK", "action.add_local_watchlist", "portfolio_mapping", "portfolio", "positive", 0.5, 0.52, "now", "watch", "Alibaba enters local AI cloud watchlist."],
      ["company.BIDU", "action.add_local_watchlist", "portfolio_mapping", "portfolio", "positive", 0.52, 0.52, "now", "watch", "Baidu enters local AI stack watchlist."]
    ]),
    ...buildEdges("ratex", [
      ["macro.rate_path_lower", "driver.risk_appetite", "risk_appetite", "macro", "positive", 0.7, 0.68, "days-weeks", "active", "Lower rate expectations can increase duration and risk appetite."],
      ["macro.rate_path_lower", "driver.credit_spreads", "credit_easing", "macro", "positive", 0.58, 0.6, "days-weeks", "watch", "Lower rates can ease credit spreads if growth remains stable."],
      ["macro.rate_path_lower", "driver.consumer_demand", "consumer_rate_relief", "macro", "positive", 0.52, 0.55, "1-3 quarters", "watch", "Lower rates can support consumer credit and housing-related demand."],
      ["driver.risk_appetite", "sector.cloud_platforms", "growth_factor_flow", "market", "positive", 0.68, 0.66, "days-weeks", "active", "Cloud platforms are long-duration growth assets."],
      ["driver.risk_appetite", "sector.consumer_retail", "consumer_factor_flow", "market", "positive", 0.5, 0.54, "days-weeks", "watch", "Consumer discretionary can benefit when risk appetite improves."],
      ["driver.risk_appetite", "sector.energy", "cyclical_flow", "market", "mixed", 0.42, 0.48, "days-weeks", "watch", "Energy response depends on growth, oil prices, and USD."],
      ["driver.credit_spreads", "sector.banks", "bank_credit_cycle", "market", "mixed", 0.52, 0.56, "1-3 quarters", "watch", "Credit easing helps banks but lower rates can pressure NIM."],
      ["driver.financing_cost", "sector.housing", "mortgage_rate_channel", "market", "positive", 0.56, 0.58, "1-3 quarters", "watch", "Lower rates can support housing turnover and home improvement demand."],
      ["driver.financing_cost", "sector.industrial_capex", "capex_hurdle_rate", "market", "positive", 0.48, 0.52, "2-4 quarters", "watch", "Lower financing cost can support industrial capex."],
      ["sector.cloud_platforms", "company.MSFT", "valuation_support", "market", "positive", 0.66, 0.66, "days-weeks", "active", "Microsoft benefits from cloud growth plus lower discount rate."],
      ["sector.cloud_platforms", "company.AMZN", "valuation_support", "market", "positive", 0.62, 0.62, "days-weeks", "active", "Amazon benefits from AWS duration and consumer risk appetite."],
      ["sector.cloud_platforms", "company.GOOGL", "valuation_support", "market", "positive", 0.58, 0.6, "days-weeks", "active", "Alphabet benefits from cloud and advertising duration."],
      ["sector.cloud_platforms", "company.META", "valuation_support", "market", "positive", 0.56, 0.58, "days-weeks", "active", "Meta benefits from advertising duration and risk appetite."],
      ["sector.cloud_platforms", "company.ORCL", "valuation_support", "market", "positive", 0.5, 0.54, "days-weeks", "watch", "Oracle cloud infrastructure receives duration support."],
      ["sector.consumer_retail", "company.WMT", "consumer_resilience", "operating", "mixed", 0.46, 0.52, "1-3 quarters", "watch", "Walmart is defensive but can still benefit from consumer income stability."],
      ["sector.consumer_retail", "company.COST", "consumer_resilience", "operating", "mixed", 0.48, 0.52, "1-3 quarters", "watch", "Costco benefits from resilient membership demand."],
      ["sector.consumer_retail", "company.TSLA", "consumer_duration", "market", "positive", 0.54, 0.54, "days-weeks", "watch", "Tesla is rate-sensitive through consumer credit and duration valuation."],
      ["sector.housing", "company.HD", "housing_retail", "operating", "positive", 0.52, 0.55, "1-3 quarters", "watch", "Home Depot can benefit from lower mortgage-rate pressure."],
      ["sector.banks", "company.JPM", "bank_rate_cycle", "market", "mixed", 0.5, 0.56, "1-3 quarters", "watch", "JPMorgan has mixed sensitivity to lower rates and credit easing."],
      ["sector.banks", "company.BAC", "bank_rate_cycle", "market", "mixed", 0.48, 0.54, "1-3 quarters", "watch", "Bank of America has notable rate and securities portfolio sensitivity."],
      ["sector.industrial_capex", "company.CAT", "industrial_demand", "operating", "positive", 0.46, 0.5, "2-4 quarters", "watch", "Industrial capex can support Caterpillar if growth remains stable."],
      ["sector.energy", "company.XOM", "energy_factor", "market", "mixed", 0.42, 0.48, "days-weeks", "watch", "Energy exposure depends more on oil prices than rates alone."],
      ["company.MSFT", "security.QQQ", "constituent_flow", "market", "positive", 0.72, 0.74, "days-weeks", "confirmed", "Microsoft is a major QQQ constituent."],
      ["company.AMZN", "security.QQQ", "constituent_flow", "market", "positive", 0.64, 0.68, "days-weeks", "confirmed", "Amazon contributes to QQQ flow."],
      ["company.GOOGL", "security.QQQ", "constituent_flow", "market", "positive", 0.62, 0.66, "days-weeks", "confirmed", "Alphabet contributes to QQQ flow."],
      ["company.META", "security.QQQ", "constituent_flow", "market", "positive", 0.58, 0.62, "days-weeks", "candidate", "Meta contributes to QQQ flow."],
      ["company.ORCL", "security.XLK", "constituent_flow", "market", "positive", 0.5, 0.55, "days-weeks", "candidate", "Oracle contributes to technology factor flow."],
      ["company.TSLA", "security.XLY", "constituent_flow", "market", "positive", 0.56, 0.58, "days-weeks", "candidate", "Tesla contributes to consumer discretionary flow."],
      ["company.JPM", "security.XLF", "constituent_flow", "market", "mixed", 0.52, 0.58, "days-weeks", "candidate", "JPMorgan maps into financial sector ETF flow."],
      ["company.BAC", "security.XLF", "constituent_flow", "market", "mixed", 0.48, 0.56, "days-weeks", "candidate", "Bank of America maps into financial sector ETF flow."],
      ["security.XLK", "action.hold_growth", "portfolio_mapping", "portfolio", "positive", 0.62, 0.64, "now", "candidate", "Technology sector exposure can be held while rate support persists."],
      ["security.XLY", "action.hold_growth", "portfolio_mapping", "portfolio", "positive", 0.5, 0.54, "now", "watch", "Consumer discretionary exposure can be monitored as rates fall."],
      ["security.XLF", "action.watch_macro_reversal", "portfolio_mapping", "portfolio", "mixed", 0.5, 0.56, "now", "watch", "Financial exposure needs monitoring for NIM and credit spread trade-offs."]
    ])
  ]);

  extendScenario("cloudCapex", {
    edgePrefix: "edge.cloudx.",
    columns: {
      Drivers: ["driver.ai_inference_workloads", "driver.memory_bandwidth"],
      "Supply Chain": ["product.custom_ai_asic", "segment.semiconductor_equipment", "driver.data_center_power_grid"],
      Assets: ["company.AMD", "company.MU", "company.MSFT", "company.AMZN", "company.GOOGL", "company.ETN"]
    },
    signals: {
      "driver.ai_inference_workloads": { impact: "positive", note: "AI 基础设施转化为云和软件收入" },
      "driver.memory_bandwidth": { impact: "positive", note: "HBM/DRAM 成为 AI 集群瓶颈" },
      "product.custom_ai_asic": { impact: "positive", note: "云厂商自研 ASIC 需求上升" },
      "segment.semiconductor_equipment": { impact: "market", note: "先进制程扩产带动设备链关注" },
      "driver.data_center_power_grid": { impact: "positive", note: "电力接入成为数据中心扩张瓶颈" },
      "company.AMD": { impact: "market", note: "AI 加速器二供和估值弹性" },
      "company.MU": { impact: "positive", note: "HBM 和数据中心内存受益" },
      "company.MSFT": { impact: "market", note: "Azure AI workload 变现路径" },
      "company.AMZN": { impact: "market", note: "AWS AI 需求和 capex 双通道" },
      "company.GOOGL": { impact: "market", note: "Google Cloud 和 AI 搜索变现" },
      "company.ETN": { impact: "positive", note: "数据中心电力设备二阶受益" }
    }
  });

  extendScenario("exportControl", {
    edgePrefix: "edge.exportx.",
    columns: {
      Drivers: ["driver.equipment_restrictions", "driver.local_ai_stack"],
      "Supply Chain": ["segment.semiconductor_equipment", "segment.china_cloud_ai"],
      Assets: ["company.AMD", "company.ASML", "company.AMAT", "company.0700.HK", "company.9988.HK", "company.BIDU"]
    },
    signals: {
      "driver.equipment_restrictions": { impact: "negative", note: "设备出口规则影响先进产能建设" },
      "driver.local_ai_stack": { impact: "positive", note: "本地 AI 芯片、云和应用栈加速建设" },
      "segment.semiconductor_equipment": { impact: "mixed", note: "设备链收入区域和产品范围不确定" },
      "segment.china_cloud_ai": { impact: "positive", note: "本地云和 AI 应用获得替代关注" },
      "company.AMD": { impact: "mixed", note: "AI 加速器区域收入风险同步上升" },
      "company.ASML": { impact: "mixed", note: "DUV/EUV 规则范围影响订单节奏" },
      "company.AMAT": { impact: "mixed", note: "设备收入受地理和产品口径影响" },
      "company.0700.HK": { impact: "market", note: "本地 AI 应用和云服务关注上升" },
      "company.9988.HK": { impact: "market", note: "阿里云和国内 AI 服务链条受关注" },
      "company.BIDU": { impact: "market", note: "AI 云和模型生态获得替代叙事" }
    }
  });

  extendScenario("rateCut", {
    edgePrefix: "edge.ratex.",
    columns: {
      Drivers: ["driver.risk_appetite", "driver.credit_spreads", "driver.consumer_demand"],
      Sectors: ["sector.cloud_platforms", "sector.consumer_retail", "sector.housing", "sector.banks"],
      Assets: ["company.MSFT", "company.AMZN", "company.GOOGL", "company.JPM", "company.HD", "security.XLK", "security.XLF", "security.XLY"]
    },
    signals: {
      "driver.risk_appetite": { impact: "market", note: "市场愿意重新支付成长久期溢价" },
      "driver.credit_spreads": { impact: "mixed", note: "信用环境改善但需要验证增长质量" },
      "driver.consumer_demand": { impact: "positive", note: "利率下行缓解消费和住房压力" },
      "sector.cloud_platforms": { impact: "positive", note: "云平台兼具成长久期和 AI 变现弹性" },
      "sector.consumer_retail": { impact: "mixed", note: "消费链条受益但仍看就业和收入" },
      "sector.housing": { impact: "positive", note: "房贷利率下行支撑住房相关需求" },
      "company.MSFT": { impact: "market", note: "估值通道和云 AI 通道同时受益" },
      "company.AMZN": { impact: "market", note: "AWS 与消费风险偏好双通道" },
      "company.GOOGL": { impact: "market", note: "广告、云和折现率通道改善" },
      "company.JPM": { impact: "mixed", note: "信用改善与 NIM 压力并存" },
      "company.HD": { impact: "positive", note: "住房周转和维修需求改善" },
      "security.XLK": { impact: "market", note: "科技板块资金流入通道" },
      "security.XLF": { impact: "mixed", note: "金融板块需要观察利差和信用" },
      "security.XLY": { impact: "market", note: "可选消费资金通道" }
    }
  });
}

function addCompanyTreeEntries(entries) {
  Object.entries(entries).forEach(([ticker, tree]) => {
    DEMO_DATA.companyTrees[ticker] = tree;
  });
}

function addGraphNodes(nodes) {
  const existing = new Set(DEMO_DATA.graph.nodes.map((node) => node.id));
  nodes.forEach((node) => {
    if (!existing.has(node.id)) {
      DEMO_DATA.graph.nodes.push(node);
      existing.add(node.id);
    }
  });
}

function addGraphEdges(edges) {
  const existing = new Set(DEMO_DATA.graph.edges.map((edge) => edge.id));
  edges.forEach((edge) => {
    if (!existing.has(edge.id)) {
      DEMO_DATA.graph.edges.push(edge);
      existing.add(edge.id);
    }
  });
}

function buildEdges(prefix, rows) {
  return rows.map(([source, target, type, channel, direction, strength, confidence, lag, lifecycle, evidence], index) => ({
    id: `edge.${prefix}.${String(index + 1).padStart(2, "0")}`,
    source,
    target,
    type,
    channel,
    direction,
    strength,
    confidence,
    lag,
    lifecycle,
    evidence
  }));
}

function extendScenario(scenarioId, { edgePrefix, columns, signals }) {
  const scenario = DEMO_DATA.scenarios[scenarioId];
  if (!scenario) return;

  const edgeIds = DEMO_DATA.graph.edges
    .map((edge) => edge.id)
    .filter((edgeId) => edgeId.startsWith(edgePrefix));
  scenario.edgeIds = Array.from(new Set([...(scenario.edgeIds || []), ...edgeIds]));
  scenario.nodeSignals = { ...(scenario.nodeSignals || {}), ...signals };

  Object.entries(columns).forEach(([title, nodeIds]) => {
    const column = scenario.graphPath?.find((item) => item.title === title);
    if (!column) return;
    column.nodeIds = Array.from(new Set([...column.nodeIds, ...nodeIds]));
  });
}

const ACTION_LABELS = {
  add: "Add",
  hold: "Hold",
  monitor: "Monitor",
  reduce: "Reduce",
  exit: "Exit",
  hedge: "Hedge"
};

const LAYER_LABELS = {
  event: "Event Input",
  operating: "Operating Graph",
  market: "Market Graph",
  macro: "Macro Indicator Graph",
  portfolio: "Portfolio Layer"
};

const TYPE_LABELS = {
  event: "event",
  macro_indicator: "macro indicator",
  operating_driver: "operating driver",
  product_supply_chain: "product / supply chain",
  risk_driver: "risk driver",
  industry_segment: "industry segment",
  market_driver: "market driver",
  macro_driver: "macro driver",
  sector: "sector",
  company: "company",
  security: "security",
  market_asset: "market asset",
  portfolio_action: "portfolio action"
};

const NODE_BY_ID = new Map(DEMO_DATA.graph.nodes.map((node) => [node.id, node]));
const EDGE_BY_ID = new Map(DEMO_DATA.graph.edges.map((edge) => [edge.id, edge]));
let analysisMode = "real";

const DEMO_NEWS_SAMPLES = [
  {
    id: "meta_compute",
    label: "Meta compute",
    source: "Business Insider",
    url: "https://www.businessinsider.com/meta-stock-cloud-computing-ai-compute-tech-stocks-data-centers-2026-7",
    excerpt:
      "Meta stock jumped after reports that the company plans to launch a cloud computing business to sell excess AI compute capacity. The move would put Meta in direct competition with Microsoft, Amazon, Alphabet, CoreWeave and other compute providers, while helping monetize heavy AI infrastructure and data center spending."
  },
  {
    id: "nvidia_china",
    label: "Nvidia China",
    source: "AP",
    url: "https://apnews.com/article/1ae6228c4928ddbb43f984e9b38f49dd",
    excerpt:
      "Nvidia's AI chip sales in China have stalled as local chipmakers like Huawei take the lead. US export controls disrupted Nvidia's advanced AI chip sales to China, Chinese buyers shifted toward domestic alternatives, and Nvidia's China market share fell while Huawei gained share."
  },
  {
    id: "treasury_yields",
    label: "Treasury yields",
    source: "MarketWatch",
    url: "https://www.marketwatch.com/livecoverage/stock-market-today-dow-jones-s-p-500-nasdaq-key-unemployment-jobs-data-june/card/treasury-yields-fall-as-rate-hike-odds-drop-JzOl2rDdj6AJAEmrVu7g",
    excerpt:
      "Treasury yields fell after the June jobs report as odds of a Federal Reserve rate hike dropped. The 2-year yield declined, changing the market's view of the rate path and supporting duration-sensitive assets."
  }
];

const dom = {
  portfolioPreset: document.getElementById("portfolioPreset"),
  holdingRows: document.getElementById("holdingRows"),
  addHoldingButton: document.getElementById("addHoldingButton"),
  newsSampleList: document.getElementById("newsSampleList"),
  newsUrlInput: document.getElementById("newsUrlInput"),
  eventInput: document.getElementById("eventInput"),
  analyzeButton: document.getElementById("analyzeButton"),
  analysisStatus: document.getElementById("analysisStatus"),
  modeButtons: document.querySelectorAll("[data-analysis-mode]"),
  summaryGrid: document.getElementById("summaryGrid"),
  inventoryPanel: document.getElementById("inventoryPanel"),
  extractionPreview: document.getElementById("extractionPreview"),
  mutationPanel: document.getElementById("mutationPanel"),
  companyAgentPanel: document.getElementById("companyAgentPanel"),
  graphLayerList: document.getElementById("graphLayerList"),
  edgeSignalList: document.getElementById("edgeSignalList"),
  networkGraph: document.getElementById("networkGraph"),
  pathBoard: document.getElementById("pathBoard"),
  portfolioImpact: document.getElementById("portfolioImpact"),
  recommendationList: document.getElementById("recommendationList"),
  companyTreeList: document.getElementById("companyTreeList"),
  agentTrace: document.getElementById("agentTrace"),
  evidenceList: document.getElementById("evidenceList"),
  analysisTimestamp: document.getElementById("analysisTimestamp")
};

function init() {
  Object.entries(DEMO_DATA.portfolios).forEach(([id, portfolio]) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = portfolio.name;
    dom.portfolioPreset.appendChild(option);
  });

  renderNewsSamples();

  dom.portfolioPreset.addEventListener("change", () => {
    const portfolio = DEMO_DATA.portfolios[dom.portfolioPreset.value];
    renderHoldingRows(portfolio.holdings);
  });

  dom.modeButtons.forEach((button) => {
    button.addEventListener("click", () => setAnalysisMode(button.dataset.analysisMode || "mock"));
  });

  dom.addHoldingButton.addEventListener("click", () => {
    addHoldingRow({ ticker: "", weight: 0, name: "" });
  });

  dom.holdingRows.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-holding]");
    if (!button) return;
    button.closest(".holding-row")?.remove();
  });

  dom.analyzeButton.addEventListener("click", runAnalysis);

  dom.portfolioPreset.value = "aiGrowth";
  renderHoldingRows(DEMO_DATA.portfolios.aiGrowth.holdings);
  applyNewsSample(DEMO_NEWS_SAMPLES[0], false);
  runAnalysis();
}

function renderNewsSamples() {
  dom.newsSampleList.innerHTML = DEMO_NEWS_SAMPLES.map(
    (sample) => `
      <button class="news-sample-button" data-news-sample="${escapeHtml(sample.id)}" type="button">
        <span class="news-sample-title">${escapeHtml(sample.label)}</span>
        <span class="news-sample-meta">${escapeHtml(sample.source)}</span>
      </button>
    `
  ).join("");

  dom.newsSampleList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-news-sample]");
    if (!button) return;
    const sample = DEMO_NEWS_SAMPLES.find((item) => item.id === button.dataset.newsSample);
    if (!sample) return;
    applyNewsSample(sample);
  });
}

function applyNewsSample(sample, shouldAnalyze = true) {
  dom.newsUrlInput.value = sample.url;
  dom.eventInput.value = sample.excerpt;
  if (shouldAnalyze) runAnalysis();
}

function setAnalysisMode(mode) {
  analysisMode = mode === "real" ? "real" : "mock";
  dom.modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.analysisMode === analysisMode);
  });
  setAnalysisStatus(
    analysisMode === "real"
      ? "Real model mode: analysis will call local /api/analyze-news."
      : "Mock mode: using frozen graph seed and deterministic demo data."
  );
}

function renderHoldingRows(holdings) {
  dom.holdingRows.innerHTML = "";
  holdings.forEach((holding) => addHoldingRow(holding));
}

function addHoldingRow(holding) {
  const row = document.createElement("div");
  row.className = "holding-row";
  row.innerHTML = `
    <input data-holding-field="ticker" aria-label="Ticker" placeholder="Ticker" value="${escapeHtml(holding.ticker || "")}" />
    <input data-holding-field="weight" aria-label="Weight" placeholder="%" value="${escapeHtml(String(holding.weight ?? ""))}" />
    <input data-holding-field="name" aria-label="Name" placeholder="Name" value="${escapeHtml(holding.name || "")}" />
    <button class="icon-button" data-remove-holding type="button" aria-label="Remove holding">×</button>
  `;
  dom.holdingRows.appendChild(row);
}

function getHoldingsFromRows() {
  return Array.from(dom.holdingRows.querySelectorAll(".holding-row"))
    .map((row) => {
      const ticker = row.querySelector('[data-holding-field="ticker"]')?.value.trim().toUpperCase();
      const weight = Number(row.querySelector('[data-holding-field="weight"]')?.value.trim()) || 0;
      const name = row.querySelector('[data-holding-field="name"]')?.value.trim() || ticker || "Unknown";
      return { ticker, weight, name };
    })
    .filter((holding) => holding.ticker);
}

function inferScenarioId(eventText, newsUrl = "") {
  const text = `${eventText} ${newsUrl}`.toLowerCase();
  if (text.includes("export") || text.includes("control") || text.includes("管制") || text.includes("监管")) {
    return "exportControl";
  }
  if (text.includes("rate") || text.includes("yield") || text.includes("inflation") || text.includes("利率") || text.includes("降息")) {
    return "rateCut";
  }
  return "cloudCapex";
}

async function runAnalysis() {
  const newsUrl = dom.newsUrlInput.value.trim();
  const rawEventText = dom.eventInput.value.trim();
  const scenarioId = inferScenarioId(rawEventText, newsUrl);
  const scenario = DEMO_DATA.scenarios[scenarioId];
  const eventText = rawEventText || scenario.eventText;
  const holdings = getHoldingsFromRows();
  let realAnalysis = null;

  if (analysisMode === "real") {
    try {
      setAnalyzeLoading(true);
      setAnalysisStatus("Calling Ark model through local backend...");
      realAnalysis = await requestRealAnalysis({ newsUrl, eventText, holdings });
      setAnalysisStatus(
        `Real model response received. Article fetch: ${realAnalysis.source?.fetched ? "ok" : "fallback"}.`,
        "success"
      );
    } catch (error) {
      console.error(error);
      setAnalysisStatus(`Real model failed, showing mock fallback: ${error.message}`, "error");
    } finally {
      setAnalyzeLoading(false);
    }
  } else {
    setAnalysisStatus("Mock mode: using frozen graph seed and deterministic demo data.");
  }

  const result = buildResult(scenario, holdings, eventText, newsUrl, realAnalysis);

  renderSummary(result);
  renderInventoryPanel(result);
  renderExtractionPreview(result);
  renderMutationPanel(result);
  renderCompanyAgentPanel(result);
  renderGraphOverview(result);
  renderNetworkGraph(result);
  renderPath(result.pathColumns);
  renderPortfolioImpact(result);
  renderRecommendations(result.recommendations);
  renderCompanyTrees(result);
  renderTrace(result.trace, eventText, newsUrl, result);
  renderEvidence(result.evidence);
  dom.analysisTimestamp.textContent = `Analyzed ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

async function requestRealAnalysis({ newsUrl, eventText, holdings }) {
  const response = await fetch("/api/analyze-news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newsUrl, eventText, holdings })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.ok) {
    throw new Error(payload.error || `${response.status} ${response.statusText}`);
  }
  return payload;
}

function setAnalyzeLoading(isLoading) {
  dom.analyzeButton.disabled = isLoading;
  dom.analyzeButton.textContent = isLoading ? "Analyzing..." : "Analyze propagation";
}

function setAnalysisStatus(message, type = "") {
  dom.analysisStatus.textContent = message || "";
  dom.analysisStatus.className = `analysis-status ${type}`.trim();
}

function buildResult(scenario, holdings, eventText, newsUrl, realAnalysis = null) {
  const totalWeight = holdings.reduce((sum, item) => sum + item.weight, 0);
  const knownImpacts = new Set(scenario.portfolioImpact.map((item) => item.ticker));
  const matchedWeight = holdings
    .filter((item) => knownImpacts.has(item.ticker))
    .reduce((sum, item) => sum + item.weight, 0);
  const agentOutput = normalizeAgentOutput(realAnalysis?.agentOutput);
  const graphContext = buildGraphContext(scenario, agentOutput);
  const companyAgentScenarios = buildCompanyAgentScenarios(scenario, agentOutput, graphContext, holdings);
  const inventory = buildInventoryResult(graphContext, companyAgentScenarios);

  return {
    scenario,
    holdings,
    eventText,
    newsUrl,
    totalWeight,
    matchedWeight: Math.round(matchedWeight),
    isReal: Boolean(agentOutput),
    sourceMeta: realAnalysis?.source || null,
    extraction: buildExtractionResult(scenario, agentOutput, newsUrl, realAnalysis?.source),
    summary: buildSummaryResult(scenario, agentOutput, graphContext),
    recommendations: buildRecommendationResult(scenario, agentOutput),
    trace: buildTraceResult(scenario, agentOutput, companyAgentScenarios),
    evidence: buildEvidenceResult(scenario, agentOutput, realAnalysis?.source),
    companyAgentScenarios,
    inventory,
    ...graphContext
  };
}

function normalizeAgentOutput(agentOutput) {
  if (!agentOutput || typeof agentOutput !== "object") return null;
  return {
    extraction: agentOutput.extraction || {},
    graphMutations: Array.isArray(agentOutput.graph_mutations) ? agentOutput.graph_mutations : [],
    recommendationContext: agentOutput.recommendation_context || {},
    companyAgentScenarios: Array.isArray(agentOutput.company_agent_scenarios)
      ? agentOutput.company_agent_scenarios
      : []
  };
}

function buildExtractionResult(scenario, agentOutput, newsUrl, sourceMeta) {
  if (!agentOutput) return scenario.extraction;
  const extraction = agentOutput.extraction;
  return {
    sourceType: sourceMeta?.fetched ? "news_url + fetched article + pasted excerpt" : "news_url + pasted excerpt",
    urlStatus: newsUrl ? (sourceMeta?.fetchError ? "fetch fallback" : "accepted") : "missing",
    normalizedTrigger: extraction.normalized_trigger || "Unclassified external event",
    eventClass: extraction.event_class || "unknown",
    entities: Array.isArray(extraction.entities) ? extraction.entities : [],
    keySignals: Array.isArray(extraction.key_signals)
      ? extraction.key_signals.map((signal) => ({
          label: String(signal.label || "signal"),
          value: String(signal.value || "")
        }))
      : [],
    evidenceSnippets: Array.isArray(extraction.evidence_snippets) ? extraction.evidence_snippets : []
  };
}

function buildSummaryResult(scenario, agentOutput, graphContext) {
  if (!agentOutput) return scenario.summary;
  const confidenceValues = agentOutput.graphMutations
    .map((mutation) => Number(mutation.confidence))
    .filter((value) => Number.isFinite(value));
  const avgConfidence = confidenceValues.length
    ? Math.round((confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length) * 100)
    : scenario.summary.confidence;
  const candidates = Array.isArray(agentOutput.recommendationContext.new_candidates)
    ? agentOutput.recommendationContext.new_candidates
    : [];
  return {
    eventType: agentOutput.extraction.event_class || scenario.summary.eventType,
    channel: Array.from(new Set(graphContext.activeEdges.map((edge) => edge.channel))).join(" + ") || scenario.summary.channel,
    confidence: avgConfidence,
    affectedWeight: scenario.summary.affectedWeight,
    candidateCount: candidates.length || scenario.summary.candidateCount
  };
}

function buildInventoryResult(graphContext, companyAgentScenarios = []) {
  const allNodes = DEMO_DATA.graph.nodes;
  const allEdges = DEMO_DATA.graph.edges;
  const activeNodes = graphContext.activeNodes;
  const activeEdges = graphContext.activeEdges;
  const allCompanyCount = allNodes.filter((node) => node.type === "company").length;
  const activeCompanyCount = activeNodes.filter((node) => node.type === "company").length;
  const marketAssetCount = allNodes.filter((node) => ["security", "market_asset"].includes(node.type)).length;
  const macroNodeCount = allNodes.filter((node) => node.layer === "macro").length;
  const modelEdgeCount = activeEdges.filter((edge) => edge.modelGenerated).length;

  return {
    globalCards: [
      { label: "Seed nodes", value: allNodes.length, sub: `${allCompanyCount} company nodes` },
      { label: "Seed edges", value: allEdges.length, sub: "canonical + curated candidate edges" },
      { label: "Market assets", value: marketAssetCount, sub: "stocks, ETFs, duration proxies" },
      { label: "Macro nodes", value: macroNodeCount, sub: "rates, credit, macro drivers" }
    ],
    activeCards: [
      { label: "Active nodes", value: activeNodes.length, sub: `${activeCompanyCount} active companies` },
      { label: "Active edges", value: activeEdges.length, sub: `${modelEdgeCount} model proposed edges` },
      { label: "Active channels", value: new Set(activeEdges.map((edge) => edge.channel)).size, sub: activeChannelText(activeEdges) },
      { label: "Scenario twins", value: companyAgentScenarios.length, sub: "Company Agent overlays" }
    ],
    layerRows: buildLayerInventoryRows(allNodes, allEdges, activeNodes, activeEdges),
    lifecycleRows: countRows(activeEdges, (edge) => edge.lifecycle || "unknown").slice(0, 6),
    channelRows: countRows(activeEdges, (edge) => edge.channel || "unknown").slice(0, 6),
    typeRows: countRows(allNodes, (node) => TYPE_LABELS[node.type] || node.type).slice(0, 8)
  };
}

function activeChannelText(edges) {
  const channels = Array.from(new Set(edges.map((edge) => edge.channel))).filter(Boolean);
  return channels.length ? channels.join(" / ") : "none";
}

function buildLayerInventoryRows(allNodes, allEdges, activeNodes, activeEdges) {
  const layerOrder = ["event", "macro", "operating", "market", "portfolio"];
  const allNodeCounts = countMap(allNodes, (node) => node.layer);
  const activeNodeCounts = countMap(activeNodes, (node) => node.layer);
  const allEdgeCounts = countMap(allEdges, (edge) => NODE_BY_ID.get(edge.target)?.layer || "unknown");
  const activeEdgeCounts = countMap(activeEdges, (edge) => edge.targetNode?.layer || NODE_BY_ID.get(edge.target)?.layer || "unknown");

  return layerOrder.map((layer) => ({
    label: LAYER_LABELS[layer] || layer,
    fullNodes: allNodeCounts.get(layer) || 0,
    activeNodes: activeNodeCounts.get(layer) || 0,
    fullEdges: allEdgeCounts.get(layer) || 0,
    activeEdges: activeEdgeCounts.get(layer) || 0
  }));
}

function countRows(items, getter) {
  return Array.from(countMap(items, getter).entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || String(a.label).localeCompare(String(b.label)));
}

function countMap(items, getter) {
  const map = new Map();
  items.forEach((item) => {
    const key = getter(item) || "unknown";
    map.set(key, (map.get(key) || 0) + 1);
  });
  return map;
}

function buildRecommendationResult(scenario, agentOutput) {
  if (!agentOutput) return scenario.recommendations;
  const context = agentOutput.recommendationContext;
  const modelCandidates = Array.isArray(context.new_candidates) ? context.new_candidates : [];
  if (!modelCandidates.length) return scenario.recommendations;
  const candidateItems = modelCandidates.slice(0, 4).map((candidate) => ({
    ticker: normalizeTicker(candidate),
    name: String(candidate),
    action: "monitor",
    direction: "mixed",
    channel: "model",
    confidence: 70,
    timeWindow: "1-3 months",
    rationale: "Real model marked this as a new candidate from the external event.",
    path: "Real model extraction -> graph mutation proposal -> candidate watchlist",
    risks: (context.risks || []).slice(0, 2).join(" ") || "Needs validation before any portfolio action.",
    validation: (context.validation_signals || []).slice(0, 2).join(" ") || "Track follow-up news and company disclosures."
  }));
  return [...candidateItems, ...scenario.recommendations].slice(0, 6);
}

function buildTraceResult(scenario, agentOutput, companyAgentScenarios = []) {
  if (!agentOutput) {
    return [
      ...scenario.trace,
      {
        agent: "Company Agent",
        output: {
          graph_layer: "scenario overlay",
          scenario_count: companyAgentScenarios.length,
          note: "Fallback demo builds company-level scenario overlays from the frozen graph seed."
        }
      }
    ];
  }
  return [
    {
      agent: "Event Router Agent",
      output: {
        event_type: agentOutput.extraction.event_class || "unknown",
        mode: "real_model"
      }
    },
    {
      agent: "Entity Extraction Agent",
      output: {
        entities: agentOutput.extraction.entities || [],
        key_signals: agentOutput.extraction.key_signals || []
      }
    },
    {
      agent: "Graph Mutation Agent",
      output: {
        proposed_edges: agentOutput.graphMutations.length,
        mutations: agentOutput.graphMutations.slice(0, 8)
      }
    },
    {
      agent: "Company Agent",
      output: {
        graph_layer: "inference / scenario overlay",
        scenario_count: companyAgentScenarios.length,
        state_types: Array.from(new Set(companyAgentScenarios.map((item) => item.stateType))),
        note: "Company Agent reads company economic twins and proposes sandbox shocks without writing to canonical graph."
      }
    },
    {
      agent: "Recommendation Agent",
      output: agentOutput.recommendationContext
    }
  ];
}

function buildEvidenceResult(scenario, agentOutput, sourceMeta) {
  if (!agentOutput) return scenario.evidence;
  const evidence = [];
  evidence.push({
    title: "Real model source",
    text: sourceMeta?.fetched
      ? `Backend fetched article text (${sourceMeta.articleChars} characters) and passed it to Ark.`
      : `Backend used URL and pasted excerpt. Fetch fallback: ${sourceMeta?.fetchError || "not fetched"}.`
  });
  (agentOutput.extraction.evidence_snippets || []).slice(0, 3).forEach((snippet, index) => {
    evidence.push({ title: `Evidence snippet ${index + 1}`, text: snippet });
  });
  (agentOutput.recommendationContext.validation_signals || []).slice(0, 3).forEach((signal, index) => {
    evidence.push({ title: `Validation signal ${index + 1}`, text: signal });
  });
  return evidence;
}

function buildCompanyAgentScenarios(scenario, agentOutput, graphContext, holdings) {
  const modelScenarios = agentOutput?.companyAgentScenarios || [];
  if (modelScenarios.length) {
    return modelScenarios
      .map((item) => normalizeCompanyAgentScenario(item, graphContext, holdings))
      .filter(Boolean)
      .slice(0, 4);
  }

  return buildDeterministicCompanyAgentScenarios(scenario, graphContext, holdings).slice(0, 4);
}

function normalizeCompanyAgentScenario(item, graphContext, holdings) {
  const companyId = normalizeCompanyNodeId(item.company);
  const node = NODE_BY_ID.get(companyId);
  if (!node || node.type !== "company") return null;
  const ticker = node.ticker || companyId.replace("company.", "");
  const holding = holdings.find((entry) => entry.ticker === ticker);
  const inboundEdges = graphContext.activeEdges.filter((edge) => edge.target === companyId);
  const outboundEdges = graphContext.activeEdges.filter((edge) => edge.source === companyId);
  const materiality = clamp01(Number(item.materiality) || estimateCompanyMateriality(inboundEdges, holding));

  return {
    companyId,
    ticker,
    name: node.label,
    stateType: normalizeStateType(item.state_type),
    receivedSignal: String(item.received_signal || buildReceivedSignal(inboundEdges, node)),
    materiality,
    channel: normalizeCompanyChannel(item.channel || dominantChannel(inboundEdges)),
    internalDriverChanges: normalizeDriverChanges(item.internal_driver_changes, inboundEdges),
    generatedShock: String(item.generated_shock || buildGeneratedShock(ticker, inboundEdges)),
    edgeProposals: normalizeEdgeProposals(item.edge_proposals, outboundEdges),
    observationTasks: normalizeStringList(item.observation_tasks).slice(0, 4),
    portfolioImplication:
      String(item.portfolio_implication || buildPortfolioImplication(node, holding, materiality, inboundEdges))
  };
}

function buildDeterministicCompanyAgentScenarios(scenario, graphContext, holdings) {
  const holdingTickers = new Set(holdings.map((entry) => entry.ticker));
  const recommendationTickers = new Set((scenario.recommendations || []).map((item) => item.ticker));
  const companyNodes = graphContext.activeNodes.filter((node) => node.type === "company");

  return companyNodes
    .map((node) => {
      const ticker = node.ticker || node.id.replace("company.", "");
      const inboundEdges = graphContext.activeEdges.filter((edge) => edge.target === node.id);
      const outboundEdges = graphContext.activeEdges.filter((edge) => edge.source === node.id);
      const holding = holdings.find((entry) => entry.ticker === ticker);
      const materiality = estimateCompanyMateriality(inboundEdges, holding);
      const priority =
        materiality +
        (holdingTickers.has(ticker) ? 0.22 : 0) +
        (recommendationTickers.has(ticker) ? 0.14 : 0) +
        Math.min(inboundEdges.length, 4) * 0.03;

      return {
        companyId: node.id,
        ticker,
        name: node.label,
        stateType: "inference",
        receivedSignal: buildReceivedSignal(inboundEdges, node),
        materiality,
        channel: dominantChannel(inboundEdges),
        internalDriverChanges: buildDriverChanges(inboundEdges),
        generatedShock: buildGeneratedShock(ticker, inboundEdges),
        edgeProposals: buildCompanyEdgeProposals(outboundEdges),
        observationTasks: buildObservationTasks(ticker, inboundEdges),
        portfolioImplication: buildPortfolioImplication(node, holding, materiality, inboundEdges),
        priority
      };
    })
    .filter((item) => item.materiality > 0 || item.edgeProposals.length)
    .sort((a, b) => b.priority - a.priority)
    .map(({ priority, ...item }) => item);
}

function normalizeCompanyNodeId(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.startsWith("company.")) return raw;
  return `company.${raw.toUpperCase()}`;
}

function normalizeStateType(value) {
  return ["fact", "inference", "hypothesis", "scenario"].includes(value) ? value : "inference";
}

function normalizeCompanyChannel(value) {
  return ["operating", "market", "macro", "risk", "mixed"].includes(value) ? value : "mixed";
}

function normalizeDriverChanges(changes, inboundEdges) {
  if (Array.isArray(changes) && changes.length) {
    return changes.slice(0, 4).map((change) => ({
      driver: String(change.driver || "business_driver"),
      direction: normalizeDirection(change.direction),
      reason: String(change.reason || "Company Agent inferred a driver change.")
    }));
  }
  return buildDriverChanges(inboundEdges);
}

function normalizeEdgeProposals(proposals, outboundEdges) {
  if (Array.isArray(proposals) && proposals.length) {
    return proposals.slice(0, 3).map((proposal) => ({
      target: String(proposal.target || ""),
      operation: String(proposal.operation || "add_monitor"),
      direction: normalizeDirection(proposal.direction),
      reason: String(proposal.reason || "Company Agent proposed an inference edge.")
    }));
  }
  return buildCompanyEdgeProposals(outboundEdges);
}

function normalizeStringList(value) {
  return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
}

function estimateCompanyMateriality(inboundEdges, holding) {
  const maxStrength = inboundEdges.reduce((max, edge) => Math.max(max, Number(edge.strength) || 0), 0);
  const avgConfidence = inboundEdges.length
    ? inboundEdges.reduce((sum, edge) => sum + (Number(edge.confidence) || 0), 0) / inboundEdges.length
    : 0;
  const holdingBoost = holding ? Math.min(Number(holding.weight) || 0, 40) / 200 : 0;
  return clamp01(maxStrength * 0.62 + avgConfidence * 0.25 + holdingBoost);
}

function dominantChannel(edges) {
  if (!edges.length) return "mixed";
  const counts = edges.reduce((map, edge) => {
    const channel = edge.channel || "mixed";
    map[channel] = (map[channel] || 0) + (edge.strength || 0.4);
    return map;
  }, {});
  const [channel] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || ["mixed"];
  return normalizeCompanyChannel(channel);
}

function buildReceivedSignal(inboundEdges, node) {
  const topEdge = inboundEdges.slice().sort((a, b) => b.strength - a.strength)[0];
  if (!topEdge) return `${node.label} receives a weak portfolio-level scenario signal.`;
  const source = topEdge.sourceNode?.label || topEdge.source;
  return `${source} -> ${node.label}: ${topEdge.type} (${topEdge.direction}, strength ${formatScore(topEdge.strength)})`;
}

function buildDriverChanges(inboundEdges) {
  const topEdges = inboundEdges.slice().sort((a, b) => b.strength - a.strength).slice(0, 3);
  if (!topEdges.length) {
    return [
      {
        driver: "business_driver",
        direction: "mixed",
        reason: "No strong inbound edge; keep the company in scenario watch mode."
      }
    ];
  }

  return topEdges.map((edge) => ({
    driver: inferCompanyDriver(edge),
    direction: normalizeDirection(edge.direction),
    reason: `${edge.type} through ${edge.channel} channel: ${edge.evidence}`
  }));
}

function inferCompanyDriver(edge) {
  const text = `${edge.type} ${edge.channel} ${edge.evidence}`.toLowerCase();
  if (text.includes("risk") || text.includes("restriction") || text.includes("compliance")) return "supply_chain";
  if (text.includes("funding") || text.includes("financing") || text.includes("credit")) return "financing";
  if (text.includes("valuation") || text.includes("multiple") || text.includes("flow")) return "valuation";
  if (text.includes("margin") || text.includes("cost")) return "margin";
  if (text.includes("capex") || text.includes("capacity")) return "capex";
  if (text.includes("cash") || text.includes("fcf")) return "cash_flow";
  return "revenue";
}

function buildGeneratedShock(ticker, inboundEdges) {
  const driver = inferCompanyDriver(inboundEdges.slice().sort((a, b) => b.strength - a.strength)[0] || {});
  return `${ticker.toLowerCase()}_${driver}_shock`;
}

function buildCompanyEdgeProposals(outboundEdges) {
  return outboundEdges
    .slice()
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 3)
    .map((edge) => ({
      target: edge.targetNode?.label || edge.target,
      operation: edge.direction === "negative" ? "weaken" : edge.lifecycle === "confirmed" ? "strengthen" : "add_monitor",
      direction: normalizeDirection(edge.direction),
      reason: `If the company shock materializes, re-score ${edge.type} toward ${edge.targetNode?.label || edge.target}.`
    }));
}

function buildObservationTasks(ticker, inboundEdges) {
  const tasks = new Set();
  inboundEdges.forEach((edge) => {
    const driver = inferCompanyDriver(edge);
    if (driver === "revenue") tasks.add("Track revenue guidance, orders, and customer demand.");
    if (driver === "margin") tasks.add("Track gross margin, pricing, and input costs.");
    if (driver === "capex") tasks.add("Track capex plans, backlog, and capacity timing.");
    if (driver === "supply_chain") tasks.add("Track regional exposure, licenses, supplier constraints, and substitutions.");
    if (driver === "valuation") tasks.add("Track ETF flow, valuation multiple, and factor rotation.");
    if (driver === "financing") tasks.add("Track debt maturity, funding cost, and credit spread sensitivity.");
    if (driver === "cash_flow") tasks.add("Track working capital, FCF conversion, and buyback/dividend capacity.");
  });
  tasks.add(`Review next ${ticker} filing / earnings call for confirmation.`);
  return Array.from(tasks).slice(0, 4);
}

function buildPortfolioImplication(node, holding, materiality, inboundEdges) {
  const direction = dominantDirection(inboundEdges);
  if (holding) {
    if (direction === "negative") return `Existing holding ${holding.ticker}: monitor downside scenario and consider risk controls if validation fails.`;
    if (direction === "positive") return `Existing holding ${holding.ticker}: keep exposure, but wait for validation before sizing up.`;
    return `Existing holding ${holding.ticker}: mixed signal, keep in monitor state.`;
  }
  if (materiality >= 0.55) return `${node.label} is a candidate for watchlist expansion after evidence confirmation.`;
  return `${node.label} remains a second-order scenario candidate.`;
}

function dominantDirection(edges) {
  if (!edges.length) return "mixed";
  const scores = edges.reduce(
    (acc, edge) => {
      acc[normalizeDirection(edge.direction)] += Number(edge.strength) || 0.4;
      return acc;
    },
    { positive: 0, negative: 0, mixed: 0 }
  );
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function buildGraphContext(scenario, agentOutput = null) {
  const activeEdges = (scenario.edgeIds || [])
    .map((edgeId) => EDGE_BY_ID.get(edgeId))
    .filter(Boolean)
    .map((edge) => ({
      ...edge,
      sourceNode: NODE_BY_ID.get(edge.source),
      targetNode: NODE_BY_ID.get(edge.target)
    }));
  const modelEdges = agentOutput ? buildModelEdges(agentOutput.graphMutations) : [];
  const mergedEdges = mergeActiveEdges(activeEdges, modelEdges);

  const pathColumns = scenario.graphPath
    ? scenario.graphPath.map((column) => ({
        title: column.title,
        nodes: column.nodeIds
          .map((nodeId) => buildPathNode(nodeId, scenario.nodeSignals?.[nodeId]))
          .filter(Boolean)
      }))
    : scenario.pathColumns;

  const activeNodeIds = new Set();
  pathColumns.forEach((column) => {
    column.nodes.forEach((node) => activeNodeIds.add(node.id));
  });
  mergedEdges.forEach((edge) => {
    activeNodeIds.add(edge.source);
    activeNodeIds.add(edge.target);
  });

  const activeNodes = Array.from(activeNodeIds)
    .map((nodeId) => NODE_BY_ID.get(nodeId))
    .filter(Boolean);

  return {
    activeEdges: mergedEdges,
    activeNodes,
    pathColumns,
    mutationRows: agentOutput ? buildModelMutationRows(agentOutput.graphMutations) : buildMutationRows(scenario),
    graphStats: buildGraphStats(activeNodes, mergedEdges)
  };
}

function buildMutationRows(scenario) {
  return (scenario.mutations || [])
    .map((mutation) => {
      const edge = EDGE_BY_ID.get(mutation.edgeId);
      if (!edge) return null;
      return {
        ...mutation,
        edge,
        sourceNode: NODE_BY_ID.get(edge.source),
        targetNode: NODE_BY_ID.get(edge.target)
      };
    })
    .filter(Boolean);
}

function buildModelEdges(mutations) {
  return mutations
    .map((mutation, index) => {
      const source = String(mutation.source || "").trim();
      const target = String(mutation.target || "").trim();
      if (!source || !target) return null;
      const existing = findEdgeByEndpoints(source, target);
      const delta = clamp01(Number(mutation.strength_delta) || 0);
      const direction = normalizeDirection(mutation.direction);
      const baseStrength = existing?.strength || 0;
      const strength = mutation.operation === "weaken" ? Math.max(0, baseStrength - delta) : clamp01(Math.max(baseStrength, delta));
      const edge = {
        id: `model.edge.${index + 1}`,
        source,
        target,
        type: mutation.operation || existing?.type || "model_proposal",
        channel: existing?.channel || inferChannel(source, target),
        direction,
        strength,
        confidence: clamp01(Number(mutation.confidence) || 0.5),
        lag: existing?.lag || "model inferred",
        lifecycle: mutation.operation || "model_proposal",
        evidence: mutation.reason || existing?.evidence || "Model proposed edge mutation.",
        sourceNode: NODE_BY_ID.get(source),
        targetNode: NODE_BY_ID.get(target),
        modelGenerated: true
      };
      return edge;
    })
    .filter(Boolean);
}

function mergeActiveEdges(baseEdges, modelEdges) {
  const byKey = new Map();
  baseEdges.forEach((edge) => byKey.set(`${edge.source}->${edge.target}`, edge));
  modelEdges.forEach((edge) => byKey.set(`${edge.source}->${edge.target}`, edge));
  return Array.from(byKey.values());
}

function buildModelMutationRows(mutations) {
  return mutations
    .map((mutation, index) => {
      const source = String(mutation.source || "").trim();
      const target = String(mutation.target || "").trim();
      if (!source || !target) return null;
      const existing = findEdgeByEndpoints(source, target);
      const delta = clamp01(Number(mutation.strength_delta) || 0);
      const confidence = clamp01(Number(mutation.confidence) || 0.5);
      const baseStrength = existing?.strength || 0;
      const afterStrength = mutation.operation === "weaken" ? Math.max(0, baseStrength - delta) : clamp01(Math.max(baseStrength, delta));
      const edge = existing || {
        id: `model.edge.${index + 1}`,
        source,
        target,
        type: "model_proposal",
        channel: inferChannel(source, target),
        direction: normalizeDirection(mutation.direction),
        strength: afterStrength,
        confidence,
        lag: "model inferred",
        evidence: mutation.reason || "Model proposed edge mutation."
      };

      return {
        edge,
        operation: mutation.operation || "model_proposal",
        before: {
          lifecycle: existing?.lifecycle || "absent",
          strength: existing?.strength || 0,
          confidence: existing?.confidence || 0
        },
        after: {
          lifecycle: mutation.operation || "model_proposal",
          strength: afterStrength,
          confidence
        },
        reason: mutation.reason || "Model proposed edge mutation.",
        sourceNode: NODE_BY_ID.get(source),
        targetNode: NODE_BY_ID.get(target)
      };
    })
    .filter(Boolean);
}

function findEdgeByEndpoints(source, target) {
  return DEMO_DATA.graph.edges.find((edge) => edge.source === source && edge.target === target);
}

function inferChannel(source, target) {
  const targetLayer = NODE_BY_ID.get(target)?.layer;
  const sourceLayer = NODE_BY_ID.get(source)?.layer;
  if (targetLayer === "market" || target.startsWith("security.")) return "market";
  if (targetLayer === "macro" || sourceLayer === "macro") return "macro";
  if (targetLayer === "portfolio") return "portfolio";
  if (source.startsWith("event.export") || target.includes("restricted")) return "risk";
  return "operating";
}

function normalizeDirection(direction) {
  return ["positive", "negative", "mixed"].includes(direction) ? direction : "mixed";
}

function clamp01(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function normalizeTicker(value) {
  return String(value).replace(/^company\./, "").replace(/^security\./, "").toUpperCase();
}

function buildPathNode(nodeId, signal = {}) {
  const node = NODE_BY_ID.get(nodeId);
  if (!node) return null;
  return {
    id: node.id,
    title: node.label,
    impact: signal.impact || "mixed",
    meta: `${TYPE_LABELS[node.type] || node.type} · ${LAYER_LABELS[node.layer] || node.layer}`,
    note: signal.note || node.description || ""
  };
}

function buildGraphStats(activeNodes, activeEdges) {
  const layers = new Map();
  activeNodes.forEach((node) => {
    const current = layers.get(node.layer) || { layer: node.layer, nodes: 0, edges: 0, types: new Set() };
    current.nodes += 1;
    current.types.add(TYPE_LABELS[node.type] || node.type);
    layers.set(node.layer, current);
  });
  activeEdges.forEach((edge) => {
    const targetLayer = edge.targetNode?.layer || "unknown";
    const current = layers.get(targetLayer) || { layer: targetLayer, nodes: 0, edges: 0, types: new Set() };
    current.edges += 1;
    layers.set(targetLayer, current);
  });
  return Array.from(layers.values()).map((item) => ({
    ...item,
    label: LAYER_LABELS[item.layer] || item.layer,
    types: Array.from(item.types).slice(0, 4)
  }));
}

function renderSummary(result) {
  const summary = result.summary;
  const cards = [
    {
      label: "Event type",
      value: summary.eventType.replaceAll("_", " "),
      sub: summary.channel
    },
    {
      label: "Portfolio weight affected",
      value: `${Math.max(summary.affectedWeight, result.matchedWeight)}%`,
      sub: "estimated exposure"
    },
    {
      label: "Confidence",
      value: `${summary.confidence}%`,
      sub: "mock confidence vector"
    },
    {
      label: "New candidates",
      value: summary.candidateCount,
      sub: "add / monitor / hedge"
    }
  ];

  dom.summaryGrid.innerHTML = cards
    .map(
      (card) => `
        <div class="summary-card">
          <div class="label">${escapeHtml(card.label)}</div>
          <div class="value">${escapeHtml(String(card.value))}</div>
          <div class="sub">${escapeHtml(card.sub)}</div>
        </div>
      `
    )
    .join("");
}

function renderInventoryPanel(result) {
  const inventory = result.inventory;
  dom.inventoryPanel.innerHTML = `
    <div class="inventory-summary-grid">
      ${inventory.globalCards.map((card, index) => renderInventoryCard(card, index === 0)).join("")}
    </div>
    <div class="inventory-summary-grid">
      ${inventory.activeCards.map((card, index) => renderInventoryCard(card, index === 0)).join("")}
    </div>
    <div class="inventory-columns">
      <article class="inventory-card">
        <div class="inventory-label">Layer Inventory</div>
        <div class="inventory-list">
          ${inventory.layerRows
            .map(
              (row) => `
                <div class="inventory-row">
                  <strong>${escapeHtml(row.label)}</strong>
                  <span>${escapeHtml(String(row.activeNodes))}/${escapeHtml(String(row.fullNodes))} nodes · ${escapeHtml(String(row.activeEdges))}/${escapeHtml(String(row.fullEdges))} edges</span>
                </div>
              `
            )
            .join("")}
        </div>
      </article>
      <article class="inventory-card">
        <div class="inventory-label">Active Edge Mix</div>
        <div class="inventory-list">
          ${renderInventoryRows("Channel", inventory.channelRows)}
          ${renderInventoryRows("Lifecycle", inventory.lifecycleRows)}
        </div>
      </article>
    </div>
  `;
}

function renderInventoryCard(card, isPrimary = false) {
  return `
    <article class="inventory-card ${isPrimary ? "primary" : ""}">
      <div class="inventory-label">${escapeHtml(card.label)}</div>
      <div class="inventory-value">${escapeHtml(String(card.value))}</div>
      <div class="inventory-sub">${escapeHtml(card.sub)}</div>
    </article>
  `;
}

function renderInventoryRows(groupLabel, rows) {
  return rows
    .map(
      (row) => `
        <div class="inventory-row">
          <strong>${escapeHtml(groupLabel)} · ${escapeHtml(row.label)}</strong>
          <span>${escapeHtml(String(row.count))}</span>
        </div>
      `
    )
    .join("");
}

function renderExtractionPreview(result) {
  const extraction = result.extraction;
  if (!extraction) {
    dom.extractionPreview.innerHTML = "";
    return;
  }

  dom.extractionPreview.innerHTML = `
    <div class="extraction-main">
      <article class="extraction-card primary">
        <div class="extraction-label">Normalized trigger</div>
        <h3>${escapeHtml(extraction.normalizedTrigger)}</h3>
        <p>${escapeHtml(result.newsUrl || "(no URL provided)")}</p>
        <div class="graph-chip-row">
          <span class="mini-chip">${escapeHtml(extraction.eventClass)}</span>
          <span class="mini-chip">${escapeHtml(extraction.sourceType)}</span>
          <span class="mini-chip">url ${escapeHtml(extraction.urlStatus)}</span>
        </div>
      </article>
      <article class="extraction-card">
        <div class="extraction-label">Extracted entities</div>
        <div class="entity-chip-list">
          ${extraction.entities.map((entity) => `<span>${escapeHtml(entity)}</span>`).join("")}
        </div>
      </article>
    </div>
    <div class="extraction-grid">
      ${extraction.keySignals
        .map(
          (signal) => `
            <article class="extraction-card">
              <div class="extraction-label">${escapeHtml(signal.label)}</div>
              <p>${escapeHtml(signal.value)}</p>
            </article>
          `
        )
        .join("")}
    </div>
    <div class="evidence-strip">
      ${extraction.evidenceSnippets
        .map((snippet) => `<span>${escapeHtml(snippet)}</span>`)
        .join("")}
    </div>
  `;
}

function renderMutationPanel(result) {
  const operationCounts = result.mutationRows.reduce((counts, row) => {
    counts[row.operation] = (counts[row.operation] || 0) + 1;
    return counts;
  }, {});
  const operationSummary = Object.entries(operationCounts)
    .map(([operation, count]) => `${operation}: ${count}`)
    .join(" / ");

  dom.mutationPanel.innerHTML = `
    <article class="mutation-summary">
      <div>
        <div class="graph-layer-title">Agent mutation proposal</div>
        <p>Graph Mutation Agent 将新闻抽取结果转成 edge lifecycle 调整，再交给传播模块计算影响。</p>
      </div>
      <span class="mini-chip">${escapeHtml(operationSummary || "no mutation")}</span>
    </article>
    <div class="mutation-list">
      ${result.mutationRows.map(renderMutationRow).join("")}
    </div>
  `;
}

function renderMutationRow(row) {
  return `
    <article class="mutation-card">
      <div class="mutation-head">
        <div>
          <div class="edge-route">${escapeHtml(row.sourceNode?.label || row.edge.source)} -> ${escapeHtml(row.targetNode?.label || row.edge.target)}</div>
          <div class="edge-meta-line">
            <span>${escapeHtml(row.edge.type)}</span>
            <span>${escapeHtml(row.edge.channel)}</span>
            <span>${escapeHtml(row.edge.lag)}</span>
          </div>
        </div>
        <span class="mutation-op ${escapeHtml(row.operation)}">${escapeHtml(row.operation)}</span>
      </div>
      <div class="mutation-change">
        ${renderMutationState("Before", row.before)}
        <div class="mutation-arrow">→</div>
        ${renderMutationState("After", row.after)}
      </div>
      <p>${escapeHtml(row.reason)}</p>
    </article>
  `;
}

function renderMutationState(label, state) {
  return `
    <div class="mutation-state">
      <div class="mutation-state-label">${escapeHtml(label)}</div>
      <div class="mutation-state-value">${escapeHtml(state.lifecycle)}</div>
      <div class="mutation-metrics">
        <span>strength ${formatScore(state.strength)}</span>
        <span>confidence ${formatScore(state.confidence)}</span>
      </div>
    </div>
  `;
}

function renderCompanyAgentPanel(result) {
  const scenarios = result.companyAgentScenarios || [];
  dom.companyAgentPanel.innerHTML = `
    <article class="company-agent-summary">
      <div class="graph-layer-title">Company Agent as Economic Twin</div>
      <p>Company Agent 读取公司子图、入边信号和持仓暴露，生成 inference / scenario overlay。它提出潜在 shock、内部 driver 变化和观察任务，但不会直接写入 canonical graph。</p>
      <div class="graph-chip-row">
        <span class="mini-chip">state: inference / scenario</span>
        <span class="mini-chip">${escapeHtml(String(scenarios.length))} company twins</span>
        <span class="mini-chip">no canonical write</span>
      </div>
    </article>
    <div class="company-agent-grid">
      ${scenarios.map(renderCompanyAgentCard).join("")}
    </div>
  `;
}

function renderCompanyAgentCard(item) {
  const dominant = dominantDirectionFromDriverChanges(item.internalDriverChanges);
  return `
    <article class="company-agent-card">
      <div class="company-agent-head">
        <div>
          <div class="company-agent-title">${escapeHtml(item.ticker)} · ${escapeHtml(item.name)}</div>
          <div class="edge-meta-line">
            <span>${escapeHtml(item.stateType)}</span>
            <span>${escapeHtml(item.channel)}</span>
            <span>materiality ${formatScore(item.materiality)}</span>
          </div>
        </div>
        <span class="pill ${escapeHtml(dominant)}">${escapeHtml(dominant)}</span>
      </div>
      <p class="company-agent-signal">${escapeHtml(item.receivedSignal)}</p>
      <div class="company-agent-body">
        <div class="company-agent-block">
          <h3>Internal Driver Changes</h3>
          <ul>
            ${item.internalDriverChanges
              .map(
                (change) =>
                  `<li>${escapeHtml(change.driver)} · ${escapeHtml(change.direction)}: ${escapeHtml(change.reason)}</li>`
              )
              .join("")}
          </ul>
        </div>
        <div class="company-agent-block">
          <h3>Scenario Outputs</h3>
          <ul>
            <li>Shock: ${escapeHtml(item.generatedShock)}</li>
            ${item.edgeProposals
              .map(
                (proposal) =>
                  `<li>${escapeHtml(proposal.operation)} -> ${escapeHtml(proposal.target)}: ${escapeHtml(proposal.reason)}</li>`
              )
              .join("")}
          </ul>
        </div>
        <div class="company-agent-block">
          <h3>Observation Tasks</h3>
          <ul>
            ${item.observationTasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}
          </ul>
        </div>
        <div class="company-agent-block">
          <h3>Portfolio Implication</h3>
          <ul>
            <li>${escapeHtml(item.portfolioImplication)}</li>
          </ul>
        </div>
      </div>
    </article>
  `;
}

function dominantDirectionFromDriverChanges(changes) {
  const scores = (changes || []).reduce(
    (acc, change) => {
      acc[normalizeDirection(change.direction)] += 1;
      return acc;
    },
    { positive: 0, negative: 0, mixed: 0 }
  );
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function renderNetworkGraph(result) {
  const columns = result.pathColumns;
  const maxRows = Math.max(...columns.map((column) => column.nodes.length), 1);
  const width = Math.max(900, columns.length * 190);
  const height = Math.max(360, maxRows * 82 + 110);
  const nodePositions = new Map();
  const columnWidth = (width - 140) / Math.max(columns.length - 1, 1);

  columns.forEach((column, columnIndex) => {
    const x = 70 + columnIndex * columnWidth;
    const rowHeight = (height - 120) / Math.max(column.nodes.length, 1);
    column.nodes.forEach((node, nodeIndex) => {
      const y = 78 + rowHeight * nodeIndex + rowHeight / 2;
      nodePositions.set(node.id, { ...node, x, y, columnTitle: column.title });
    });
  });

  const visibleEdges = result.activeEdges.filter(
    (edge) => nodePositions.has(edge.source) && nodePositions.has(edge.target)
  );

  const edgeMarkup = visibleEdges.map((edge) => renderNetworkEdge(edge, nodePositions)).join("");
  const nodeMarkup = Array.from(nodePositions.values()).map(renderNetworkNode).join("");
  const headerMarkup = columns
    .map((column, index) => {
      const x = 70 + index * columnWidth;
      return `<text class="network-column-label" x="${x}" y="28" text-anchor="middle">${escapeHtml(column.title)}</text>`;
    })
    .join("");

  dom.networkGraph.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Active propagation network graph">
      <defs>
        ${["positive", "negative", "mixed"].map((type) => renderArrowMarker(type)).join("")}
      </defs>
      <rect class="network-bg" x="0" y="0" width="${width}" height="${height}" rx="8"></rect>
      ${headerMarkup}
      <g class="network-edges">${edgeMarkup}</g>
      <g class="network-nodes">${nodeMarkup}</g>
    </svg>
  `;
}

function renderArrowMarker(type) {
  return `
    <marker id="arrow-${type}" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="strokeWidth">
      <path class="network-arrow ${type}" d="M0,0 L9,4.5 L0,9 z"></path>
    </marker>
  `;
}

function renderNetworkEdge(edge, nodePositions) {
  const source = nodePositions.get(edge.source);
  const target = nodePositions.get(edge.target);
  const directionClass = ["positive", "negative", "mixed"].includes(edge.direction) ? edge.direction : "mixed";
  const x1 = source.x + 66;
  const x2 = target.x - 66;
  const y1 = source.y;
  const y2 = target.y;
  const midX = (x1 + x2) / 2;
  const strokeWidth = 1.4 + edge.strength * 2.4;

  return `
    <path
      class="network-edge ${escapeHtml(directionClass)}"
      d="M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}"
      stroke-width="${strokeWidth.toFixed(2)}"
      marker-end="url(#arrow-${escapeHtml(directionClass)})"
    >
      <title>${escapeHtml(edge.type)} · strength ${formatScore(edge.strength)} · confidence ${formatScore(edge.confidence)}</title>
    </path>
  `;
}

function renderNetworkNode(node) {
  const lines = splitSvgLabel(node.title);
  const yOffset = lines.length > 1 ? -4 : 3;
  return `
    <g class="network-node ${escapeHtml(node.impact)}" transform="translate(${node.x - 62}, ${node.y - 24})">
      <rect width="124" height="48" rx="7"></rect>
      <text x="62" y="${22 + yOffset}" text-anchor="middle">
        ${lines.map((line, index) => `<tspan x="62" dy="${index === 0 ? 0 : 13}">${escapeHtml(line)}</tspan>`).join("")}
      </text>
      <title>${escapeHtml(node.meta)} · ${escapeHtml(node.note)}</title>
    </g>
  `;
}

function splitSvgLabel(label) {
  const words = String(label).split(" ");
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 16 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  if (lines.length <= 2) return lines;
  return [lines[0], `${lines.slice(1).join(" ").slice(0, 18)}...`];
}

function formatScore(value) {
  return `${Math.round(Number(value || 0) * 100)}%`;
}

function renderGraphOverview(result) {
  const layerOrder = ["event", "macro", "operating", "market", "portfolio"];
  const orderedStats = result.graphStats.sort(
    (a, b) => layerOrder.indexOf(a.layer) - layerOrder.indexOf(b.layer)
  );
  const totalNodes = result.activeNodes.length;
  const totalEdges = result.activeEdges.length;
  const channels = Array.from(new Set(result.activeEdges.map((edge) => edge.channel))).join(" / ");

  dom.graphLayerList.innerHTML = `
    <article class="graph-layer-card system">
      <div class="graph-layer-title">Heterogeneous directed graph</div>
      <p>当前场景激活 ${escapeHtml(String(totalNodes))} 个 typed nodes、${escapeHtml(String(totalEdges))} 条 directed edges。</p>
      <div class="graph-chip-row">
        <span class="mini-chip">channels: ${escapeHtml(channels || "none")}</span>
        <span class="mini-chip">dynamic edge lifecycle</span>
      </div>
    </article>
    ${orderedStats
      .map(
        (stat) => `
          <article class="graph-layer-card">
            <div class="graph-layer-title">${escapeHtml(stat.label)}</div>
            <div class="graph-layer-metrics">
              <span>${escapeHtml(String(stat.nodes))} nodes</span>
              <span>${escapeHtml(String(stat.edges))} inbound edges</span>
            </div>
            <div class="graph-chip-row">
              ${stat.types.map((type) => `<span class="mini-chip">${escapeHtml(type)}</span>`).join("")}
            </div>
          </article>
        `
      )
      .join("")}
  `;

  dom.edgeSignalList.innerHTML = result.activeEdges
    .slice()
    .sort((a, b) => b.strength - a.strength)
    .slice(0, 8)
    .map(
      (edge) => `
        <article class="edge-signal-card">
          <div class="edge-signal-head">
            <div class="edge-route">${escapeHtml(edge.sourceNode?.label || edge.source)} -> ${escapeHtml(edge.targetNode?.label || edge.target)}</div>
            <span class="pill ${escapeHtml(edge.direction)}">${escapeHtml(edge.direction)}</span>
          </div>
          <div class="edge-meta-line">
            <span>${escapeHtml(edge.type)}</span>
            <span>${escapeHtml(edge.channel)}</span>
            <span>${escapeHtml(edge.lifecycle)}</span>
            <span>${escapeHtml(edge.lag)}</span>
          </div>
          <div class="edge-bars" aria-label="edge strength and confidence">
            <div><span>strength</span><i><b style="width: ${Math.round(edge.strength * 100)}%"></b></i></div>
            <div><span>confidence</span><i><b style="width: ${Math.round(edge.confidence * 100)}%"></b></i></div>
          </div>
          <p>${escapeHtml(edge.evidence)}</p>
        </article>
      `
    )
    .join("");
}

function renderPath(columns) {
  dom.pathBoard.innerHTML = columns
    .map(
      (column) => `
        <div class="path-column">
          <h3>${escapeHtml(column.title)}</h3>
          <div class="path-nodes">
            ${column.nodes
              .map(
                (node) => `
                  <div class="path-node ${escapeHtml(node.impact)}">
                    <div class="node-title">${escapeHtml(node.title)}</div>
                    <div class="node-meta">${escapeHtml(node.meta)}</div>
                    <div class="node-note">${escapeHtml(node.note)}</div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `
    )
    .join("");
}

function renderPortfolioImpact(result) {
  const holdingMap = new Map(result.holdings.map((item) => [item.ticker, item]));
  const impactRows = result.scenario.portfolioImpact.map((impact) => {
    const holding = holdingMap.get(impact.ticker);
    return { ...impact, weight: holding ? holding.weight : 0, name: holding ? holding.name : impact.ticker };
  });

  dom.portfolioImpact.innerHTML = impactRows
    .map(
      (impact) => `
        <div class="impact-item">
          <div>
            <div class="ticker">${escapeHtml(impact.ticker)}</div>
            <div class="impact-text">${escapeHtml(String(impact.weight))}%</div>
          </div>
          <div>
            <div class="impact-text">${escapeHtml(impact.text)}</div>
          </div>
          <span class="pill ${escapeHtml(impact.action)}">${escapeHtml(ACTION_LABELS[impact.action] || impact.action)}</span>
        </div>
      `
    )
    .join("");
}

function renderRecommendations(recommendations) {
  dom.recommendationList.innerHTML = recommendations
    .map(
      (item) => `
        <article class="recommendation-item">
          <div class="recommendation-head">
            <div>
              <div class="recommendation-title">${escapeHtml(item.ticker)} · ${escapeHtml(item.name)}</div>
              <p>${escapeHtml(item.rationale)}</p>
            </div>
            <span class="pill ${escapeHtml(item.action)}">${escapeHtml(ACTION_LABELS[item.action] || item.action)}</span>
          </div>
          <p><strong>Path:</strong> ${escapeHtml(item.path)}</p>
          <p><strong>Risk:</strong> ${escapeHtml(item.risks)}</p>
          <p><strong>Validation:</strong> ${escapeHtml(item.validation)}</p>
          <div class="recommendation-meta">
            <span class="mini-chip">${escapeHtml(item.channel)}</span>
            <span class="mini-chip">${escapeHtml(item.direction)}</span>
            <span class="mini-chip">${escapeHtml(item.timeWindow)}</span>
            <span class="mini-chip">confidence ${escapeHtml(String(item.confidence))}%</span>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCompanyTrees(result) {
  const tickers = new Set();
  result.scenario.portfolioImpact.forEach((item) => tickers.add(item.ticker));
  result.scenario.recommendations.forEach((item) => tickers.add(item.ticker));
  result.holdings.forEach((item) => {
    if (DEMO_DATA.companyTrees[item.ticker]) tickers.add(item.ticker);
  });
  result.activeNodes.forEach((node) => {
    if (node.treeId && DEMO_DATA.companyTrees[node.treeId]) tickers.add(node.treeId);
  });

  const trees = Array.from(tickers)
    .map((ticker) => ({ ticker, ...DEMO_DATA.companyTrees[ticker] }))
    .filter((tree) => tree.name)
    .slice(0, 9);

  dom.companyTreeList.innerHTML = trees
    .map(
      (tree) => `
        <article class="company-tree-card">
          <h3>${escapeHtml(tree.ticker)} · ${escapeHtml(tree.name)} <span>${escapeHtml(tree.type)}</span></h3>
          ${renderTreeBlock("Business & Products", tree.business)}
          ${renderTreeBlock("Revenue Drivers", tree.revenue)}
          ${renderTreeBlock("Cost / Capacity", tree.cost)}
          ${renderTreeBlock("Financial Output", tree.financial)}
          ${renderTreeBlock("External Edges", tree.external)}
        </article>
      `
    )
    .join("");
}

function renderTreeBlock(label, text) {
  return `
    <div class="tree-block">
      <div class="tree-label">${escapeHtml(label)}</div>
      <div class="tree-text">${escapeHtml(text)}</div>
    </div>
  `;
}

function renderTrace(trace, eventText, newsUrl, result) {
  const traceWithInput = [
    {
      agent: "Raw Signal",
      output: {
        source_url: newsUrl || "(not provided)",
        event_text: eventText.slice(0, 180) + (eventText.length > 180 ? "..." : "")
      }
    },
    {
      agent: "News URL Agent",
      output: {
        mode: result.isReal ? "real_model" : "demo_mock",
        url_status: newsUrl ? (result.sourceMeta?.fetchError ? "fetch_fallback" : "accepted") : "missing",
        article_chars: result.sourceMeta?.articleChars || 0,
        note:
          result.isReal
            ? "Local backend fetched the article when possible, then called Ark Responses API with the same agent schema."
            : "Static demo records the URL and uses frozen extraction. Real model mode calls the local backend."
      }
    },
    ...trace
  ];

  dom.agentTrace.innerHTML = traceWithInput
    .map(
      (step, index) => `
        <div class="trace-item">
          <h3>${index + 1}. ${escapeHtml(step.agent)}</h3>
          <p>${agentDescription(step.agent)}</p>
          <div class="trace-output">${escapeHtml(JSON.stringify(step.output, null, 2))}</div>
        </div>
      `
    )
    .join("");
}

function agentDescription(agent) {
  const descriptions = {
    "Raw Signal": "用户输入或系统抓取的原始外部信息。",
    "News URL Agent": "记录新闻链接；Real model 模式会通过本地后端抓取正文并调用 Ark。",
    "Event Router Agent": "判断事件类型、主要通道和处理 schema。",
    "Entity Extraction Agent": "抽取公司、产品、行业、地区和宏观变量。",
    "Macro Agent": "解释宏观 shock，并映射到估值、融资和资金流通道。",
    "Graph Mutation Agent": "提出节点和边的新增、强化、削弱或降级建议。",
    "Company Agent": "围绕公司经济体做 inference / scenario 推演，提出内部 driver shock 和观察任务，但不直接写入 canonical graph。",
    "Propagation Reasoning Agent": "沿 Operating / Market / Macro Graph 传播影响。",
    "Recommendation Agent": "把传播结果映射为组合动作和推荐解释。"
  };
  return descriptions[agent] || "任务型 agent 输出结构化结果。";
}

function renderEvidence(evidence) {
  dom.evidenceList.innerHTML = evidence
    .map(
      (item) => `
        <div class="evidence-item">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </div>
      `
    )
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

init();
