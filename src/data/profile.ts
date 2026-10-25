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
  strengths: { label: l("核心壁垒", "Core Edge") },
  suanle: { label: l("旗舰产品 · 算了", "Flagship · Suanle") },
  industrial: { label: l("工业落地与智能体", "Industrial AI & Agents") },
  stone: { label: l("石室史诗", "Stone Chamber Epic") },
  health: { label: l("全球健康研究", "Global Health Study") },
  matrix: { label: l("即想即做产品矩阵", "Build-it-now Matrix") },
  research: { label: l("科研与大模型评测", "Research & Evaluation") },
  education: { label: l("学业成绩", "Education") },
  honors: { label: l("荣誉台账", "Honors & Awards") },
  toolkit: { label: l("个人武器库", "Toolkit") },
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
    name: l("招聘方 / 业务负责人", "Recruiter / Hiring Lead"),
    who: l("30 秒速览：能否把 AI 产品从 0 做到上线并在一线跑通", "30 seconds to judge: can he take an AI product from 0 to live and make it work in real operations?"),
    question: l("先看这四处，就够判断匹配度", "Start with these four stops"),
    order: ["strengths", "suanle", "industrial", "stone", "matrix", "research", "health", "education", "honors", "toolkit", "contact"],
    picks: [
      {
        to: "suanle",
        stat: "0 → 1",
        title: l("一个人，从洞察到支付闭环", "One person, insight to payment loop"),
        note: l("《算了》：9 套原型竞技、确定性排盘兜底、运营看台、两支 1080p60 宣传片", "Suanle: 9 prototypes, deterministic chart engine, ops cockpit, two 1080p60 films"),
      },
      {
        to: "industrial",
        stat: "90.0% (18/20)",
        title: l("港口现场实测的可行率", "Field-tested feasibility at the port"),
        note: l("2026.10.15 青岛港驻场跟随计划员实测 20 箱，18 箱推荐落位被现场采纳", "On-site at Qingdao Port: 18 of 20 recommended placements accepted by planners"),
      },
      {
        to: "research",
        stat: "AAAI 2026 Oral",
        title: l("对大模型能力边界的一手直觉", "First-hand sense of model limits"),
        note: l("20+ 款多模态大模型实测，知道哪里放权给模型、哪里必须规则兜底", "20+ multimodal LLMs tested — knows where to delegate and where to guard"),
      },
      {
        to: "contact",
        stat: "PDF",
        title: l("简历预览与联系方式", "Résumé preview & contact"),
        note: l("2027 届本科 · 求职主力邮箱与微信同号电话", "Class of 2027 · job email and phone/WeChat"),
      },
    ],
    metrics: [
      { value: "90.0% (18/20)", label: l("青岛港现场实测推荐落位采纳率", "Field-test acceptance & feasibility at Qingdao Port") },
      { value: "21+1 / 14", label: l("一票否决红线 / 防翻箱评分维度", "veto safety rules / anti-reshuffle scoring dimensions") },
      { value: "50,000+", label: l("治理“幽灵在场箱”异常数据条数", "“ghost container” records cleaned") },
      { value: "9 → 1", label: l("套并行原型，收敛为一个生产版", "parallel prototypes converged into one production build") },
      { value: "26", label: l("跨平台标准化 Agent 技能包", "cross-platform standardized agent skills") },
    ],
  },
  academic: {
    id: "academic",
    name: l("学术合作 / 导师", "Academic / Advisor"),
    who: l("关注研究贡献、论文状态、评测方法与合作潜力", "Interested in contributions, paper status, evaluation methods and collaboration"),
    question: l("论文、方法与可复现代码", "Papers, methods and reproducible code"),
    order: ["research", "health", "education", "honors", "strengths", "industrial", "stone", "suanle", "matrix", "toolkit", "contact"],
    picks: [
      {
        to: "research",
        stat: "AAAI · ICML · EMNLP",
        title: l("三篇顶会，一篇独立一作在审", "Three top-tier papers + one solo first-author"),
        note: l("AAAI 2026 Oral 共一、ICML 2026 第三作者、EMNLP 2026 Findings 第六作者", "AAAI 2026 Oral (co-first), ICML 2026 (3rd), EMNLP 2026 Findings (6th)"),
      },
      {
        to: "research",
        stat: "+12.90 / 99.8%",
        title: l("LEAP：规则门控的小模型规划", "LEAP: parser-gated planning for compact VLMs"),
        note: l("独立设计匹配对照实验，响应耗时 4.85s → 1.97s，代码与评测集已开源", "Matched-control study; latency 4.85s → 1.97s; code and evaluation set open-sourced"),
      },
      {
        to: "health",
        stat: "203",
        title: l("全球 203 个国家与地区数据研究", "Study across 203 countries & territories"),
        note: l("健康转型压力 × 卫生承接能力二维框架，含 2026 预警与 2030 情景推演", "2-D framework with 2026 warnings and 2030 scenario simulation"),
      },
      {
        to: "education",
        stat: "2 / 20",
        title: l("图灵拔尖班综测第二", "2nd of 20 in the Turing Honors Class"),
        note: l("累计加权均分 86.19、GPA 3.46/4.00、CET-6 564", "Weighted avg 86.19, GPA 3.46/4.00, CET-6 564"),
      },
    ],
    metrics: [
      { value: "AAAI 2026 Oral", label: l("CCF-A · 共同第一作者 (#2) · 已正式发表", "CCF-A · co-first author (#2) · published") },
      { value: "+12.90", label: l("LEAP 高难任务规划得分提升", "LEAP planning-score gain on hard tasks") },
      { value: "99.8%", label: l("结构化输出格式合规率", "structured-output format compliance") },
      { value: "54.67×", label: l("单卡最高推理加速（合作研究，在审）", "max single-GPU speedup (collaborative, under review)") },
      { value: "20+", label: l("系统评测的主流多模态大模型", "mainstream multimodal LLMs benchmarked") },
    ],
  },
  explorer: {
    id: "explorer",
    name: l("随便逛逛", "Just Exploring"),
    who: l("不赶时间，先逛逛最有意思的视频、数字展厅与实机界面", "No rush — start with the fun stuff: films, galleries and live interfaces"),
    question: l("从这些最好玩的地方开始", "Start with the most fun places"),
    order: ["suanle", "stone", "matrix", "industrial", "health", "research", "strengths", "education", "honors", "toolkit", "contact"],
    picks: [
      {
        to: "suanle",
        stat: "1080p · 60fps",
        title: l("看两支宣传片，再揉一个纸团", "Watch two films, then crumple a paper ball"),
        note: l("《算了》线上可玩：和茶馆掌柜聊聊，把放不下的丢进竹篓", "Suanle is live: chat with the Keeper, toss what you can’t let go into the basket"),
      },
      {
        to: "stone",
        stat: "76",
        title: l("两个版本的汉画像石数字展厅", "Two digital halls of Han stone reliefs"),
        note: l("暗黑青铜 3D 考古 & 宣纸雅韵三馆展厅，都能在线逛", "Dark-bronze 3D archaeology & rice-paper three-museum hall — both online"),
      },
      {
        to: "matrix",
        stat: "8",
        title: l("“即想即做”小产品矩阵", "A matrix of build-it-now products"),
        note: l("心流时钟、考研识记、洗衣机抢占助手、虚拟试衣……", "Flow timer, exam flashcards, laundry grabber, virtual try-on…"),
      },
      {
        to: "honors",
        stat: "13",
        title: l("奖项与荣誉台账", "Honors & awards ledger"),
        note: l("按类别筛选的完整时间线", "A filterable timeline"),
      },
    ],
    metrics: [
      { value: "1080p60 × 2", label: l("两支逐帧精修的品牌宣传片", "two frame-by-frame polished brand films") },
      { value: "76", label: l("件馆藏全量数字化石刻档案", "stone-relief pieces fully digitized") },
      { value: "561", label: l("套拖轮编组方案自动枚举", "tug crew plans auto-enumerated") },
      { value: "203", label: l("国家与地区健康数据覆盖", "countries & territories covered") },
      { value: "1,513 / 1,613", label: l("考研学习项 / 历年真题", "exam study items / past questions") },
    ],
  },
};
