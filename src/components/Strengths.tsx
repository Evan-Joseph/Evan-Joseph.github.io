import { useState } from "react";
import { ArrowRight, ShieldCheck, Wand2 } from "lucide-react";
import { l, useI18n, type L } from "../i18n";
import { SectionShell, Chip, Tabs, Bullet } from "./ui";
import { cn } from "../utils/cn";

const MOATS: {
  n: string;
  title: L;
  body: L;
  chips: { text: L; to: string }[];
}[] = [
  {
    n: "壹",
    title: l("问题定义与 0→1 独立全栈交付", "Problem definition & solo 0→1 product delivery"),
    body: l(
      "从高频日常场景与非标产业一线切入，结合 Claude Code、Codex、Cursor、Antigravity、扣子（Coze）与多模态音视频工具链，独立完成需求调研、多模型原型比选、高保真交互 Mock、确定性规则设计、全栈开发部署，以及 1080p60 品牌宣传片、商业计划书（BP）、实时运营看台与线上收款。",
      "Starting from high-frequency daily scenarios and non-standard industrial operations, I pair Claude Code, Codex, Cursor, Antigravity, Coze and multimodal audio/video toolchains to deliver the full 0→1 product lifecycle solo: user research, multi-model prototyping, hi-fi interactive mocks, deterministic rule design, full-stack deployment, 1080p60 brand films, business plans (BP), live ops cockpits and online payment.",
    ),
    chips: [
      { text: l("算了 · 0→1 实例", "Suanle · 0→1 case"), to: "#suanle" },
      { text: l("工程栈与工具链", "Engineering & Tooling"), to: "#toolkit" },
    ],
  },
  {
    n: "贰",
    title: l("国企驻场交付与复杂规程数字化", "On-site enterprise delivery & procedure digitization"),
    body: l(
      "驻场港口与政企一线，将数百页非标安全规程与老计划员经验转化为可量化、可回测、可热更新的产品规则规格（PRD）与智能推荐系统，经 400 箱真实生产快照回测与青岛港现场跟班实测验证。",
      "Working on-site with port and enterprise operations teams, I translate hundreds of pages of non-standard safety regulations and planners’ tacit experience into quantifiable, back-testable, hot-updatable product rule specifications (PRD) and recommendation systems — validated through 400-container production-snapshot backtests and on-site field testing at Qingdao Port.",
    ),
    chips: [
      { text: l("21+1 / 14 规则规格", "21+1 / 14 rule spec"), to: "#industrial" },
      { text: l("现场 90.0% (18/20)", "On-site 90.0% (18/20)"), to: "#industrial" },
    ],
  },
  {
    n: "叁",
    title: l("顶会评测实证与大模型幻觉治理", "Top-tier LLM evaluation & hallucination control"),
    body: l(
      "以共同第一作者发表 CCF-A 类顶会 AAAI 2026 Oral，第三作者录用 ICML 2026，第六作者录用 EMNLP 2026 Findings，并独立开展结构化规则门控实验（leap-code）。通过对 20+ 款主流多模态大模型的系统评测，定位时空推理与顺序偏置盲区，用实证数据划分模型生成与确定性规则的职责边界。",
      "Co-first author of an AAAI 2026 Oral (CCF-A), third author at ICML 2026, sixth author at EMNLP 2026 Findings, and solo first author of the structured rule-gating study (leap-code). Benchmarking 20+ mainstream multimodal LLMs across spatiotemporal reasoning and order-bias blind spots provides empirical criteria for separating model generation from deterministic rule constraints.",
    ),
    chips: [
      { text: l("论文与评测", "Papers & evaluation"), to: "#research" },
      { text: l("LEAP 开源", "LEAP open-source"), to: "#research" },
    ],
  },
];

const STEPS: { n: string; name: L; ev: L }[] = [
  { n: "01", name: l("需求与现场调研", "Field & user research"), ev: l("高频日常决策 · 港口一线驻场调研", "Daily decision friction · on-site port research") },
  { n: "02", name: l("多模型原型比选", "Multi-model prototyping"), ev: l("9 套交互原型并行比选定版", "9 interaction prototypes evaluated for production") },
  { n: "03", name: l("高保真交互 Mock", "Hi-fi interactive mocks"), ev: l("拖轮调度工作席与 AIS 态势大屏", "Tug workstation & AIS situation board") },
  { n: "04", name: l("确定性规则设计", "Deterministic rule design"), ev: l("天文历法排盘 · 21+1 安全否决红线", "Calendar engine · 21+1 safety veto rules") },
  { n: "05", name: l("全栈开发与部署", "Full-stack build & deploy"), ev: l("React · Hono · Cloudflare · PostgreSQL", "React · Hono · Cloudflare · PostgreSQL") },
  { n: "06", name: l("1080p60 品牌宣传片", "1080p60 brand film"), ev: l("双版本成片：45s 与 50s", "Two cuts: 45s and 50s") },
  { n: "07", name: l("商业计划书（BP）", "Business plan (BP)"), ev: l("KouPilot 独立完成 UI、演示视频与 BP", "KouPilot: UI, demo video and BP built solo") },
  { n: "08", name: l("实时运营看台", "Live ops cockpit"), ev: l("/curator：24h 吞吐、CPU/Mem、对话质量", "/curator: 24h throughput, CPU/Mem, dialogue quality") },
  { n: "09", name: l("线上收款与运维", "Live payment & ops"), ev: l("线上打赏支付与常态化运维", "Online tipping payment & daily operations") },
];

type CaseId = "suanle" | "hazmat" | "leap";
const CASES: Record<
  CaseId,
  { tab: L; title: L; flex: L[]; guard: L[]; outcome: L }
> = {
  suanle: {
    tab: l("《算了》", "Suanle"),
    title: l("大模型直接推算干支历法易产生排盘幻觉", "LLMs frequently fabricate stems-and-branches calendar charts when computing directly"),
    flex: [
      l("茶馆掌柜启发式对话，梳理用户当前处境与情绪", "Heuristic Teahouse Keeper dialogue that clarifies the user’s situation and mood"),
      l("对话中按需唤起六爻/八字/紫微/塔罗等 6 类交互卡片", "Six types of interactive cards (hexagram / Bazi / Zi Wei / Tarot …) invoked on demand in chat"),
      l("后台结构化记录用户画像与历史脉络", "Structured user-profile and context logging in the background"),
    ],
    guard: [
      l("前置确定性天文历法排盘计算：四柱八字与五行分布先由算法算准，再交由模型解读", "Deterministic astronomical-calendar calculation runs first — Four Pillars and Five Elements are computed before model interpretation"),
      l("排盘数据完全脱离模型自由生成，消除历法排盘幻觉", "Chart data is never generated freely by the LLM, eliminating calendar hallucinations"),
    ],
    outcome: l("suanle.cc 线上运行，主理人看台实时监控吞吐与对话质量", "Live at suanle.cc, monitored in real time from the curator cockpit"),
  },
  hazmat: {
    tab: l("危化品堆存", "Hazmat yard"),
    title: l("港口危化品安全规程要求零违例硬约束", "Port hazmat safety regulations require zero-violation hard constraints"),
    flex: [
      l("14 维防翻箱优选评分：将老计划员经验量化为可调权重参数", "14-dimension anti-reshuffle scoring — planners’ experience modeled as tunable weights"),
      l("1 秒级策略参数热更新推演，调参即时预览落位变化", "1-second hot-update simulation to preview placement changes immediately"),
      l("400 箱真实生产快照回测，大区 Top-2 命中率 90.0% ~ 95.75%", "400-container production-snapshot backtest: zone Top-2 hit rate 90.0% ~ 95.75%"),
    ],
    guard: [
      l("21+1 项一票否决安全红线，严格对齐 IMDG《国际海运危险货物规则》", "21+1 one-vote-veto safety rules strictly aligned with the IMDG Code"),
      l("近 600 项自动化回归验证保障改规则不破红线", "Nearly 600 automated regression checks ensuring parameter updates never breach safety rules"),
    ],
    outcome: l("2026.10.15 青岛港现场实测：20 箱推荐落位中 18 箱被计划员现场采纳", "Qingdao Port field test (15 Oct 2026): 18 of 20 recommended placements accepted by planners"),
  },
  leap: {
    tab: l("LEAP 论文", "LEAP paper"),
    title: l("小尺寸模型长思维链易发散，引入解析器规则门控更可靠", "Compact VLMs drift in long CoT; parser-gated control keeps plans valid and fast"),
    flex: [
      l("小尺寸视觉语言模型生成高层动作蓝图（Action Blueprint）", "Compact vision-language model generates the high-level Action Blueprint"),
    ],
    guard: [
      l("解析器规则门控（Parser-Gated Control）：严格匹配对照实验验证剥离冗余思维链显著提升规划可靠性", "Parser-Gated Control — matched-control experiments show stripping redundant chain-of-thought significantly improves planning reliability"),
      l("结构化格式合规率 99.8%，高难任务规划得分 +12.90", "99.8% structured format compliance, +12.90 planning score on hard tasks"),
    ],
    outcome: l("用户等待响应耗时由 4.85s 降至 1.97s（缩短近 60%）", "Response latency reduced from 4.85s to 1.97s (nearly 60% faster)"),
  },
};

export function Strengths({ no }: { no: number }) {
  const { t } = useI18n();
  const [cs, setCs] = useState<CaseId>("suanle");
  const c = CASES[cs];

  return (
    <SectionShell
      id="strengths"
      no={no}
      kicker="CORE CAPABILITIES"
      title={
        <>
          {t("三项核心能力，", "Three core capabilities, ")}
          <span className="ink-mark">{t("全部附线上系统与实测数据", "backed by live systems and field data")}</span>
        </>
      }
      intro={t(
        "厘清模型生成与确定性规则的职责边界，将多模态大模型能力转化为可上线、可回测、经得起一线现场验收的产品与系统。",
        "Drawing clear boundaries between model generation and deterministic rule constraints — turning multimodal LLM capabilities into live, back-testable products verified in frontline operations.",
      )}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {MOATS.map((m, mi) => (
          <article key={m.n} className="paper-card group relative flex flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1 sm:p-7">
            <span className="seal mb-5 h-11 w-11 text-xl">{t(m.n, ["I", "II", "III"][mi])}</span>
            <h3 className="font-serif-cn text-xl font-black leading-snug">{t(m.title)}</h3>
            <p className="mt-3 flex-1 text-[14.5px] leading-[1.85] text-ink-2">{t(m.body)}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {m.chips.map((c) => (
                <a key={c.text.zh} href={c.to} className="transition hover:opacity-70">
                  <Chip tone="seal">
                    {t(c.text)}
                    <ArrowRight size={11} />
                  </Chip>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Pipeline */}
      <div className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h3 className="font-serif-cn text-2xl font-black sm:text-3xl">{t("从需求定义到上线运维的 9 个环节", "Nine stages from problem definition to live operations")}</h3>
          <span className="hidden font-mono text-xs uppercase tracking-widest text-mute sm:block">9 stages</span>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="group relative bg-paper p-5 transition hover:bg-paper-2 sm:p-6">
              <span className="font-mono text-3xl font-bold text-ink/15 transition group-hover:text-seal">{s.n}</span>
              <p className="mt-2 font-serif-cn text-lg font-black">{t(s.name)}</p>
              <p className="mt-1 text-[13px] text-ink-2">{t(s.ev)}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Delegate vs guard */}
      <div className="mt-20 overflow-hidden rounded-3xl bg-night text-paper">
        <div className="relative p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(600px 300px at 100% 0%, rgba(214,173,104,.16), transparent 70%)" }}
          />
          <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-bronze-2">{t("架构原则 · ARCHITECTURE PRINCIPLE", "ARCHITECTURE PRINCIPLE")}</p>
              <h3 className="font-serif-cn text-2xl font-black leading-tight sm:text-4xl">
                {t("模型生成与确定性规则的边界划分", "Separating model generation from deterministic rules")}
              </h3>
            </div>
            <Tabs
              dark
              value={cs}
              onChange={setCs}
              items={(Object.keys(CASES) as CaseId[]).map((k) => ({ id: k, label: t(CASES[k].tab) }))}
            />
          </div>

          <p className="relative mt-8 font-serif-cn text-lg font-bold text-paper/90 sm:text-xl">“{t(c.title)}”</p>

          <div key={cs} className="relative mt-6 grid gap-4 md:grid-cols-2" style={{ animation: "pop .35s ease both" }}>
            <div className="night-card rounded-2xl p-5 sm:p-6">
              <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bronze-2">
                <Wand2 size={15} />
                {t("模型生成 · MODEL GENERATION", "MODEL GENERATION")}
              </p>
              <ul className="space-y-3 text-[14.5px] leading-relaxed text-paper/85">
                {c.flex.map((x) => (
                  <Bullet key={x.zh} dark>
                    {t(x)}
                  </Bullet>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-seal-2/40 bg-seal/12 p-5 sm:p-6">
              <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-seal-2">
                <ShieldCheck size={15} />
                {t("确定性规则 · DETERMINISTIC RULES", "DETERMINISTIC RULES")}
              </p>
              <ul className="space-y-3 text-[14.5px] leading-relaxed text-paper/90">
                {c.guard.map((x) => (
                  <li key={x.zh} className="flex gap-3">
                    <span className="mt-[0.7em] h-1.5 w-1.5 flex-none rotate-45 bg-seal-2" />
                    <span>{t(x)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={cn("relative mt-5 inline-flex items-center gap-2 rounded-full bg-bronze-2/15 px-4 py-2 text-sm font-medium text-bronze-2")}>
            <ArrowRight size={14} />
            {t(c.outcome)}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
