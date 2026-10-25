import { l, type L, type LensId } from "../i18n";

export const LINKS = {
  site: "https://evan-joseph.github.io",
  github: "https://github.com/Evan-Joseph",
  openreview: "https://openreview.net/profile?id=~Shenzhou_Gao1",
  orcid: "https://orcid.org/0009-0005-4019-0114",
  orcidId: "0009-0005-4019-0114",
  suanle: "https://www.suanle.cc",
  curator: "https://www.suanle.cc/curator",
  suanleRepo: "https://github.com/Evan-Joseph/suanle",
};

export const CONTACT = {
  phone: "186 2954 7236",
  jobEmail: "gaoshenzhou@foxmail.com",
  acadEmail: "gaoshenzhou@qdu.edu.cn",
};

export type SectionId =
  | "strengths"
  | "suanle"
  | "industrial"
  | "stone"
  | "health"
  | "matrix"
  | "research"
  | "education"
  | "honors"
  | "toolkit"
  | "contact";

export const SECTION_META: Record<SectionId, { label: L }> = {
  strengths: { label: l("核心能力", "Core Capabilities") },
  suanle: { label: l("旗舰产品 · 算了", "Flagship · Suanle") },
  industrial: { label: l("工业落地与智能体", "Industrial AI & Agents") },
  stone: { label: l("石室史诗", "Stone Chamber Epic") },
  health: { label: l("全球健康研究", "Global Health Study") },
  matrix: { label: l("独立产品矩阵", "Product Matrix") },
  research: { label: l("科研与大模型评测", "Research & Evaluation") },
  education: { label: l("学业成绩", "Education") },
  honors: { label: l("荣誉台账", "Honors & Awards") },
  toolkit: { label: l("工程栈与工具链", "Engineering & Tooling") },
  contact: { label: l("简历与联系", "Résumé & Contact") },
};

export type Pick = { to: SectionId; stat: string; title: L; note: L };

export type LensCfg = {
  id: LensId;
  name: L;
  who: L;
  question: L;
  order: SectionId[];
  picks: Pick[];
  metrics: { value: string; label: L }[];
};

export const LENSES: Record<LensId, LensCfg> = {
  recruiter: {
    id: "recruiter",
    name: l("招聘方 / 业务负责人", "Hiring & Product Leads"),
    who: l("关注 0→1 独立产品交付、复杂业务规则建模与港口一线实测结果", "Focused on 0→1 product delivery, complex rule modeling and field-tested results"),
    question: l("核心代表作与关键指标速览", "Representative works & headline metrics"),
    order: ["strengths", "suanle", "industrial", "stone", "matrix", "research", "health", "education", "honors", "toolkit", "contact"],
    picks: [
      {
        to: "suanle",
        stat: "0 → 1",
        title: l("《算了》：独立完成从定义到上线收款", "Suanle: solo build from concept to live payment"),
        note: l("9 套原型比选、确定性排盘计算、实时运营看台与两支 1080p60 宣传片", "9 prototypes compared, deterministic chart engine, live ops cockpit and two 1080p60 films"),
      },
      {
        to: "industrial",
        stat: "90.0% (18/20)",
        title: l("青岛港现场实测推荐落位采纳率", "Field-test recommendation acceptance at Qingdao Port"),
        note: l("2026.10.15 赴青岛港驻场跟班实测 20 箱，18 箱推荐落位被计划员现场采纳", "On-site at Qingdao Port (15 Oct 2026): 18 of 20 recommended placements accepted by planners"),
      },
      {
        to: "research",
        stat: "AAAI 2026 Oral",
        title: l("多模态大模型评测与幻觉边界控制", "Multimodal LLM evaluation & hallucination control"),
        note: l("系统实测 20+ 款主流模型，用实证数据划分模型生成与确定性规则的边界", "20+ multimodal LLMs evaluated — separating model generation from deterministic rule guards"),
      },
      {
        to: "contact",
        stat: "PDF",
        title: l("简历预览与直接联系", "Résumé preview & direct contact"),
        note: l("2027 届应届本科 · 求职主力邮箱与微信同号电话", "Class of 2027 · job email and phone/WeChat"),
      },
    ],
    metrics: [
      { value: "90.0% (18/20)", label: l("青岛港现场实测推荐落位采纳率", "Field-test placement acceptance at Qingdao Port") },
      { value: "21+1 / 14", label: l("安全否决红线 / 防翻箱评分维度", "safety veto rules / anti-reshuffle scoring dimensions") },
      { value: "50,000+", label: l("清洗治理“幽灵在场箱”异常数据", "“ghost container” records reconciled") },
      { value: "9 → 1", label: l("套并行原型比选定版", "parallel prototypes evaluated for production") },
      { value: "26", label: l("跨平台标准化 Agent 技能包", "cross-platform standardized agent skills") },
    ],
  },
  academic: {
    id: "academic",
    name: l("学术合作 / 导师", "Academic & Advisors"),
    who: l("关注论文发表记录、评测基准设计、对照实验结论与开源复现代码", "Focused on publications, benchmark design, controlled experiments and reproducible code"),
    question: l("代表论文、研究框架与开源代码", "Selected papers, frameworks & open-source code"),
    order: ["research", "health", "education", "honors", "strengths", "industrial", "stone", "suanle", "matrix", "toolkit", "contact"],
    picks: [
      {
        to: "research",
        stat: "AAAI · ICML · EMNLP",
        title: l("三篇顶会录用，一篇独立一作在审", "Three top-tier acceptances + one solo first-author paper"),
        note: l("AAAI 2026 Oral 共同一作、ICML 2026 第三作者、EMNLP 2026 Findings 第六作者", "AAAI 2026 Oral (co-first), ICML 2026 (3rd), EMNLP 2026 Findings (6th)"),
      },
      {
        to: "research",
        stat: "+12.90 / 99.8%",
        title: l("LEAP：小尺寸模型解析器规则门控", "LEAP: parser-gated planning for compact VLMs"),
        note: l("独立设计匹配对照实验，响应耗时 4.85s → 1.97s，代码与评测集已开源", "Matched-control study; latency 4.85s → 1.97s; code and evaluation set open-sourced"),
      },
      {
        to: "health",
        stat: "203",
        title: l("全球 203 个国家与地区慢病承接研究", "Chronic-disease study across 203 countries & territories"),
        note: l("健康转型压力 × 卫生承接能力二维框架，含 2026 预警与 2030 情景推演", "2-D framework with 2026 risk warnings and 2030 policy-scenario simulations"),
      },
      {
        to: "education",
        stat: "2 / 20",
        title: l("图灵拔尖创新班综测第 2 / 20", "Ranked 2nd of 20 in the Turing Honors Class"),
        note: l("累计加权均分 86.19、GPA 3.46/4.00、CET-6 564", "Weighted avg 86.19, GPA 3.46/4.00, CET-6 564"),
      },
    ],
    metrics: [
      { value: "AAAI 2026 Oral", label: l("CCF-A · 共同第一作者 (#2) · 已正式发表", "CCF-A · co-first author (#2) · published") },
      { value: "+12.90", label: l("LEAP 高难任务规划得分提升", "LEAP planning-score gain on hard tasks") },
      { value: "99.8%", label: l("结构化输出格式合规率", "structured-output format compliance") },
      { value: "54.67×", label: l("单卡最高推理加速（合作研究，在审）", "max single-GPU speedup (collaborative, under review)") },
      { value: "20+", label: l("系统评测的主流多模态大模型", "mainstream multimodal LLMs evaluated") },
    ],
  },
  explorer: {
    id: "explorer",
    name: l("产品与作品体验", "Live Products & Works"),
    who: l("直接上手体验已上线的 Web 产品、三维数字展厅、工程控制台与 1080p60 宣传片", "Try the live web products, 3D digital exhibition halls, consoles and 1080p60 brand films"),
    question: l("可在线交互的代表作品与实机演示", "Interactive live products & demonstrations"),
    order: ["suanle", "stone", "matrix", "industrial", "health", "research", "strengths", "education", "honors", "toolkit", "contact"],
    picks: [
      {
        to: "suanle",
        stat: "1080p · 60fps",
        title: l("《算了》：两支宣传片与线上实机体验", "Suanle: two brand films & live web app"),
        note: l("suanle.cc 线上运行：确定性排盘、茶馆掌柜对谈、宣纸揉团释怀与实时看台", "Live at suanle.cc: deterministic charting, Keeper dialogue, paper-ball release and live cockpit"),
      },
      {
        to: "stone",
        stat: "76",
        title: l("《石室史诗》：双版本汉画像石数字展厅", "Stone Chamber Epic: dual-edition digital halls"),
        note: l("暗黑青铜 3D 考古版与宣纸雅韵三馆展厅版，均支持在线访问", "Dark-bronze 3D archaeology hall & rice-paper three-museum edition — both live online"),
      },
      {
        to: "matrix",
        stat: "8",
        title: l("8 款已上线独立产品与研发工具", "8 live independent products & developer tools"),
        note: l("沉浸时钟、22408 研记、洗衣机脉冲抢占助手、虚拟试衣双视口工作台等", "Flow timer, 22408 exam workbench, laundry pulse grabber, virtual try-on workbench and more"),
      },
      {
        to: "honors",
        stat: "13",
        title: l("奖项与荣誉台账", "Honors & awards ledger"),
        note: l("附红头文件文号与参赛作品编号的完整记录", "Complete timeline with official document and entry numbers"),
      },
    ],
    metrics: [
      { value: "1080p60 × 2", label: l("两支独立制作的品牌宣传片", "two self-produced 1080p60 brand films") },
      { value: "76", label: l("件馆藏全量数字化石刻档案", "stone-relief pieces digitized") },
      { value: "561", label: l("套拖轮编组方案自动枚举", "tug crew plans auto-enumerated") },
      { value: "203", label: l("国家与地区宏观卫生数据建模", "countries & territories modeled") },
      { value: "1,513 / 1,613", label: l("考研学习项 / 历年真题入库", "exam study items / past questions indexed") },
    ],
  },
};
