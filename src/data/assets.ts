import { l, type L } from "../i18n";

export const ASSET_BASE = "./assets/";
export const asset = (file: string) => ASSET_BASE + file;
export const SITE = "https://evan-joseph.github.io";
export const CV_URL = "./Shenzhou_Gao_CV.pdf";

export type Img = { file: string; w: number; h: number; cap: L };

const i = (file: string, w: number, h: number, zh: string, en: string): Img => ({
  file,
  w,
  h,
  cap: l(zh, en),
});

export const A = {
  /* ---------------- Suanle ---------------- */
  suanle_promo_cover: i(
    "suanle_promo_cover.webp", 1920, 1080,
    "品牌宣传片封面主视觉 ·「算一算，然后，算了」",
    "Promo film key visual · “Calculate it — then, let it go”",
  ),
  suanle_divination: i(
    "suanle_divination.webp", 1920, 1080,
    "宣传片剧照 · 三枚古钱六爻起卦与掌柜解局同框",
    "Film still · three-coin hexagram casting alongside the Keeper’s reading",
  ),
  suanle_letgo: i(
    "suanle_letgo.webp", 1920, 1080,
    "宣传片剧照 ·「把放不下的，揉掉」宣纸执念书写与释怀仪式",
    "Film still · “Crumple what you can’t let go” — writing the fixation on rice paper",
  ),
  suanle_letgo_throw: i(
    "suanle_letgo_throw.webp", 1920, 1080,
    "宣传片剧照 · 执念纸团抛入竹篓，四款宣纸签文卡同框",
    "Film still · paper ball tossed into the bamboo basket, with four ink-wash aphorism cards",
  ),
  suanle_curator_cockpit: i(
    "suanle_curator_cockpit.webp", 2880, 1920,
    "主理人实时运营看台 /curator · 24h 吞吐波形、CPU/Mem 监控与 PostgreSQL 数据行数（2x Retina 线上截取）",
    "Curator live ops cockpit /curator · 24h throughput waveform, CPU/Mem monitor and PostgreSQL row counts (2x Retina, captured live)",
  ),
  suanle_ui_chat: i(
    "suanle_ui_chat.webp", 860, 1864,
    "移动端实机 · 茶馆掌柜温润启发式对话主界面",
    "Mobile UI · the Teahouse Keeper’s warm, heuristic chat home",
  ),
  suanle_ui_hexagram: i(
    "suanle_ui_hexagram.webp", 860, 1864,
    "移动端实机 · 对话中按需唤起的六爻摇卦交互卡片",
    "Mobile UI · hexagram-casting card summoned on demand inside the chat",
  ),
  suanle_ui_bazi: i(
    "suanle_ui_bazi.webp", 860, 1864,
    "移动端实机 · 前置确定性天文历法四柱八字排盘与五行分布",
    "Mobile UI · deterministic astronomical-calendar Four Pillars chart with Five Elements distribution",
  ),
  suanle_ui_kline: i(
    "suanle_ui_kline.webp", 860, 1864,
    "移动端实机 · 人生百岁流年周期 K 线趋势图",
    "Mobile UI · hundred-year life-cycle “K-line” trend chart",
  ),
  suanle_ui_letgo_write: i(
    "suanle_ui_letgo_write.webp", 860, 1864,
    "移动端实机 ·「算了」模式：写下执念的宣纸输入态",
    "Mobile UI · “Let-go” mode: writing the fixation on rice paper",
  ),
  suanle_ui_letgo_ball: i(
    "suanle_ui_letgo_ball.webp", 860, 1864,
    "移动端实机 · 执念揉成 3D 宣纸团的物理交互态",
    "Mobile UI · the fixation crumpled into a 3D paper ball (physics interaction)",
  ),
  suanle_ui_letgo: i(
    "suanle_ui_letgo.webp", 860, 1864,
    "移动端实机 · 纸团投入竹篓，释怀完成与掌柜赠言",
    "Mobile UI · ball dropped into the basket — release complete, with the Keeper’s parting words",
  ),
  suanle_card_aphorism: i(
    "suanle_card_aphorism.webp", 1080, 1050,
    "水墨宣纸签文分享卡 A ·「风来听风，雨来听雨」",
    "Ink-wash share card A · “Hear the wind when it comes, the rain when it falls”",
  ),
  suanle_card_letgo: i(
    "suanle_card_letgo.webp", 1080, 1064,
    "水墨宣纸释怀分享卡 B ·「算了 · 第叁拾柒号」",
    "Ink-wash share card B · “Let It Go · No. 37”",
  ),
  suanle_card_dialogue: i(
    "suanle_card_dialogue.webp", 1080, 1256,
    "水墨宣纸茶肆对谈录分享卡 C",
    "Ink-wash share card C · teahouse conversation record",
  ),
  suanle_card_annual: i(
    "suanle_card_annual.webp", 1080, 1128,
    "水墨宣纸丙午年流年运势签分享卡 D",
    "Ink-wash share card D · Bing-Wu year fortune slip",
  ),
  suanle_logo: i("suanle_logo.svg", 512, 512, "《算了 · Suanle》矢量品牌印章 Logo", "Suanle vector brand-seal logo"),
  suanle_qrcode: i("suanle_qrcode.png", 1024, 1024, "扫码体验 suanle.cc", "Scan to try suanle.cc"),

  /* ---------------- Stone ---------------- */
  stone_hall: i(
    "stone_hall.webp", 2400, 1500,
    "版本 A · 数字展厅主控台与沉浸考古开挖交互",
    "Version A · digital hall console and immersive archaeological dig",
  ),
  stone_3d_view: i(
    "stone_3d_view.webp", 2400, 1500,
    "版本 A · 武梁祠汉画像石三维立体检视与拓片无级对比台",
    "Version A · 3D inspection of Wu Liang Shrine reliefs with continuous rubbing comparison",
  ),
  stone_vision: i(
    "stone_vision.webp", 2400, 1500,
    "版本 A · 现场拍照识图台（秒级匹配 76 件馆藏数字档案）",
    "Version A · on-site photo recognition (matches 76 collection records in seconds)",
  ),
  stone_ai_guide: i(
    "stone_ai_guide.webp", 2400, 1500,
    "版本 A · 绑定馆藏权威释文与《鲁迅藏汉画珍赏》考据资料的流式 AI 导览助手",
    "Version A · streaming AI guide grounded in curatorial texts and “Lu Xun’s Collection of Han Reliefs”",
  ),
  stone_exhibit_home: i(
    "stone_exhibit_home.webp", 2880, 1800,
    "版本 B · 宣纸雅韵版：三馆汇聚 76 件馆藏数字展厅首页",
    "Version B · rice-paper edition: homepage of the 76-piece, three-museum digital hall",
  ),
  stone_exhibit_hall: i(
    "stone_exhibit_hall.webp", 2880, 1800,
    "版本 B · 76 件馆藏文物库分类检索与石刻展柜",
    "Version B · 76-piece collection library with categorized search and display cases",
  ),
  stone_exhibit_detail: i(
    "stone_exhibit_detail.webp", 2880, 1800,
    "版本 B · 石刻高清拓片检视、官方介绍与书籍/PDF 考据详情页",
    "Version B · HD rubbing viewer, official description and book/PDF references",
  ),
  stone_qrcode: i("stone_qrcode.png", 400, 400, "扫码访问在线数字展厅", "Scan to open the online digital hall"),

  /* ---------------- Health ---------------- */
  health_quadrant: i(
    "health_quadrant.webp", 2699, 1890,
    "图 1 · 全球 203 个国家与地区四象限分型（健康转型压力指数 × 卫生承接能力指数）",
    "Fig. 1 · Four-quadrant typology of 203 countries & territories (Health-Transition Pressure × Health-System Absorption)",
  ),
  health_trajectories: i(
    "health_trajectories.webp", 2488, 1816,
    "图 2 · 2000–2023 年金砖五国（中/印/俄/巴/南）慢病转型与卫生承接演化轨迹",
    "Fig. 2 · 2000–2023 evolution trajectories of the five BRICS countries (CN/IN/RU/BR/ZA)",
  ),
  health_warning: i(
    "health_warning.webp", 2395, 1633,
    "图 3 · 2026 年全球慢病承接陷阱短期高危预警排序（识别持续高危与新滑入高危国家）",
    "Fig. 3 · 2026 short-term high-risk warning ranking of the chronic-disease absorption trap (persistent vs newly sliding)",
  ),
  health_scenarios: i(
    "health_scenarios.webp", 2671, 1524,
    "图 4 · 2023–2030 年三种政策干预情景下的高危国家风险消减推演",
    "Fig. 4 · 2023–2030 risk-reduction simulation for high-risk countries under three policy scenarios",
  ),

  /* ---------------- Industrial / research ---------------- */
  hazmat_yard_overview: i(
    "hazmat_yard_overview.webp", 1440, 920,
    "《危险品库堆场算法联调调试台 · 运行总览》· K/L/N/T 四大区、1467 贝位、4401 层位负载与预占锁监控",
    "“Hazmat Yard Algorithm Debug Console · Overview” · K/L/N/T zones, 1,467 bays, 4,401 tier loads and pre-allocation locks",
  ),
  hazmat_yard_map: i(
    "hazmat_yard_map.webp", 1440, 900,
    "《危险品库堆场算法联调调试台 · 堆场俯视贝位图》· 危类着色、双贝跨箱、喷淋/遮阳属性与在场箱分层透视",
    "“Yard top-down bay map” · hazard-class coloring, double-bay boxes, sprinkler/shade attributes and layered container view",
  ),
  hazmat_xdt_diff: i(
    "hazmat_xdt_diff.webp", 2880, 1800,
    "《甲方 XDT 与乙方地图数据库表建模范围差异可视化》· 2015 条在场箱空间落点对账诊断台",
    "“Client XDT vs. map-DB modeling scope diff” · reconciliation console for 2,015 on-yard container positions",
  ),
  tug_dispatch_dark: i(
    "tug_dispatch_dark.webp", 1440, 900,
    "《拖轮调度工作席》深色主题 · 枚举 561 套方案，输出三套推荐及人工编组下发",
    "“Tug Dispatch Workstation” dark theme · 561 enumerated plans, three recommendations and manual crew assignment",
  ),
  tug_dispatch_light: i(
    "tug_dispatch_light.webp", 1440, 900,
    "《拖轮调度工作席》浅色主题 · 北主航道吃水超标一票否决诊断与多维评分拆解",
    "“Tug Dispatch Workstation” light theme · north-channel draft-limit veto diagnosis and multi-factor score breakdown",
  ),
  leap_framework: i(
    "leap_framework.webp", 1600, 894,
    "LEAP 论文图 1 · 动作蓝图生成与解析器规则门控（Parser-Gated Control）总架构",
    "LEAP Fig. 1 · Action-blueprint generation and Parser-Gated Control — overall architecture",
  ),
  leap_execution: i(
    "leap_execution.webp", 1600, 894,
    "LEAP 论文图 2 · 结构化规划控制与消融对比实证视图",
    "LEAP Fig. 2 · structured plan control and ablation comparison",
  ),

  /* ---------------- Product matrix ---------------- */
  open_timer: i(
    "open_timer.webp", 2880, 1800,
    "《沉浸时钟 · Open-Timer》主界面 · 2027 考研倒计时、7 科药丸切换与超大居中数字时钟",
    "Open-Timer main view · 2027 exam countdown, 7-subject pills and giant centered clock",
  ),
  open_timer_review: i(
    "open_timer_review.webp", 2880, 1800,
    "《沉浸时钟》时间轴与 14 天回顾 · 流体时间轴、14 天趋势柱状图与打卡日历热力图",
    "Open-Timer timeline & 14-day review · fluid timeline, 14-day trend bars and check-in heatmap",
  ),
  kaoyan_22408: i(
    "kaoyan_22408.webp", 2880, 1800,
    "《22408 · 研记》全科主站 · 政治+英二+数二+408 共 1,513 学习项与 1,613 真题工作台",
    "22408 · Yanji main site · Politics + English II + Math II + CS-408 — 1,513 study items and 1,613 past-exam questions",
  ),
  kaoyan_politics: i(
    "kaoyan_politics.webp", 2880, 1800,
    "《政治识记》· 考研 101 客观题微批次、帽子题定位词速配与主观题挖空",
    "Politics Recall · micro-batches of 101 objective questions, keyword matching and subjective cloze",
  ),
  math2_flashcards: i(
    "math2_flashcards.webp", 2880, 1800,
    "《考研数学识记》· 数一/数二 302 项核心概念公式 FSRS 主动回忆与 1987–2025 真题库",
    "Math Recall · 302 core concepts with FSRS active recall and 1987–2025 past papers",
  ),
  haile_bot_matrix: i(
    "haile_bot_matrix.webp", 2880, 1800,
    "《海乐生活抢占助手 v3》桌面宽屏 · 左侧验证码登录，右侧 5 洗 1 烘实时进度条，零手机号暴露",
    "Haile Grabber v3 · desktop: code login on the left, live 5-washer + 1-dryer progress on the right, no phone numbers exposed",
  ),
  haile_bot_mobile: i(
    "haile_bot_mobile.webp", 1170, 2532,
    "《海乐生活抢占助手 v3》移动端（3x Retina）· 实时 5 洗 1 烘状态与排队抢占",
    "Haile Grabber v3 · mobile (3x Retina): live 5+1 machine status and queue grabbing",
  ),
  lumbar_ai: i(
    "lumbar_ai.webp", 2880, 1800,
    "《LumbarAI · 腰椎智能辅助分析系统》· 4C 大赛作品《智脊析》",
    "LumbarAI · lumbar-spine intelligent analysis system (4C entry “Zhi-Ji-Xi”)",
  ),
  medconnect_care: i(
    "medconnect_care.webp", 2880, 1800,
    "《医线牵》· 远程多方会诊平台，支持四套临床主题切换",
    "MedConnect · remote multi-party consultation platform with four clinical themes",
  ),
  mission_control: i(
    "mission_control.webp", 2880, 1800,
    "《竞赛矩阵 · 竞赛规划看板 V3》· 纳管 62 项赛事的日历排期、战术白板与 AI Action Card 指挥舱",
    "Competition Matrix V3 · calendar, tactics whiteboard and AI Action Cards for 62 contests",
  ),
  gpvton_review: i(
    "gpvton_review.webp", 2880, 1800,
    "《GP-VTON++ 虚拟试衣工作台与方案评审》· 模特试衣桌面 + 手机双视口同步预览",
    "GP-VTON++ try-on workbench & design review · desktop + phone dual-viewport sync",
  ),
  ppt_enhancer: i(
    "ppt_enhancer.webp", 2880, 1800,
    "《PPT 提示词增强》· 一句话需求变成专业结构化 PPT 提示词，支持全自动/半自动/数据图表三模式",
    "PPT Prompt Enhancer · one-line request → structured PPT prompt; auto / semi-auto / data-chart modes",
  ),
  junzi_deck: i(
    "junzi_deck.webp", 1440, 900,
    "《君子之交》· 教师端工作台与查重证据台：课程管理、92% 雷同检测与 AI 任务状态",
    "Junzi · teacher workbench & plagiarism evidence desk: course management, 92% similarity and AI task status",
  ),
} as const;

export type AssetKey = keyof typeof A;

export const VIDEOS = {
  opus55: asset("suanle_promo_opus55.mp4"),
  fable51max: asset("suanle_promo_fable51max.mp4"),
};
