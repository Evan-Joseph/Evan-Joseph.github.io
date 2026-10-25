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
    title: l("痛点洞察与“单兵全链路”交付", "Sharp pain-point insight & solo end-to-end delivery"),
    body: l(
      "擅长从高频日常场景与复杂非标产业一线挖掘真实痛点，熟练驾驭 Claude Code、Codex、Cursor、Antigravity、扣子（Coze）与多模态生图/音视频工具链，一个人完成从需求调研、多模型原型竞技选型、高保真交互 Mock、确定性规则兜底设计、全栈开发部署，到 1080p60 品牌宣传片、商业计划书（BP）、运营看台与线上支付闭环的 0→1 完整交付。",
      "Finds real pain points in high-frequency daily scenarios and complex non-standard industries. Fluent with Claude Code, Codex, Cursor, Antigravity, Coze and multimodal image/audio/video toolchains — and delivers the full 0→1 loop alone: research, multi-model prototype contests, hi-fi interactive mocks, rule-based safeguards, full-stack deployment, a 1080p60 brand film, business plan (BP), ops cockpit and a live payment loop.",
    ),
    chips: [
      { text: l("算了 · 0→1 实例", "Suanle · a 0→1 case"), to: "#suanle" },
      { text: l("个人武器库", "Toolkit"), to: "#toolkit" },
    ],
  },
  {
    n: "贰",
    title: l("国企驻场交付与复杂规程数字化", "On-site delivery for large SOEs & digitizing complex procedures"),
    body: l(
      "具备深入港口与政企一线驻场调研的实战经验，能把数百页非标安全规程与老师傅口传经验转化为可量化、可回测、可热更新的产品规则规格（PRD）与智能推荐系统，并用真实生产快照回测与现场跟班实测可行率说话。",
      "Hands-on experience living on-site at ports and government/enterprise clients. Turns hundreds of pages of non-standard safety rules and veterans’ tacit know-how into quantifiable, back-testable, hot-updatable rule specs (PRD) and recommenders — and lets production-snapshot backtests and on-site feasibility tests do the talking.",
    ),
    chips: [
      { text: l("21+1 / 14 规则规格", "21+1 / 14 rule spec"), to: "#industrial" },
      { text: l("现场 90.0% (18/20)", "On-site 90.0% (18/20)"), to: "#industrial" },
    ],
  },
  {
    n: "叁",
    title: l("顶会评测认知与大模型幻觉治理", "Top-tier LLM-evaluation insight & hallucination-control instinct"),
    body: l(
      "以共同第一作者发表 CCF-A 类顶会 AAAI 2026 Oral，第三作者录用 ICML 2026，第六作者录用 EMNLP 2026 Findings，并独立开展结构化规则门控实验（leap-code）。通过对 20+ 款主流多模态大模型的系统性实测，建立对“能力上限、时空与顺序偏置幻觉盲区、结构化输出控制”的一手实证直觉，精准把握哪里放权给模型生成、哪里必须用确定性规则兜底。",
      "Co-first author of an AAAI 2026 Oral (CCF-A), third author at ICML 2026, sixth author at EMNLP 2026 Findings, and solo author of the structured rule-gating study (leap-code). Systematic tests of 20+ mainstream multimodal LLMs built first-hand intuition for capability ceilings, spatiotemporal and order-bias blind spots, and structured-output control — so he knows where to let the model generate and where deterministic rules must guard.",
    ),
    chips: [
      { text: l("论文与评测", "Papers & evaluation"), to: "#research" },
      { text: l("LEAP 开源", "LEAP open-source"), to: "#research" },
    ],
  },
];

const STEPS: { n: string; name: L; ev: L }[] = [
  { n: "01", name: l("需求与痛点调研", "Research & pain points"), ev: l("决策瘫痪 · 港口一线驻场调研", "Decision paralysis · on-site port research") },
  { n: "02", name: l("多模型原型竞技选型", "Multi-model prototype contest"), ev: l("9 套交互风格原型 → 1 个生产版", "9 interaction-style prototypes → 1 production build") },
  { n: "03", name: l("高保真交互 Mock", "Hi-fi interactive mocks"), ev: l("拖轮调度工作席与 AIS 态势大屏", "Tug workstation & AIS situation board") },
  { n: "04", name: l("确定性规则兜底设计", "Deterministic rule safeguards"), ev: l("天文历法排盘 · 21+1 一票否决", "Calendar engine · 21+1 veto rules") },
  { n: "05", name: l("全栈开发与部署", "Full-stack build & deploy"), ev: l("React · Hono · Cloudflare · PostgreSQL", "React · Hono · Cloudflare · PostgreSQL") },
  { n: "06", name: l("1080p60 品牌宣传片", "1080p60 brand film"), ev: l("两个版本，45s 与 50s", "Two cuts: 45s and 50s") },
  { n: "07", name: l("商业计划书（BP）", "Business plan (BP)"), ev: l("KouPilot 单人包揽 UI、演示视频与 BP", "KouPilot: UI, demo video and BP, solo") },
  { n: "08", name: l("运营看台搭建", "Ops cockpit"), ev: l("/curator：24h 吞吐、CPU/Mem、对话质量", "/curator: 24h throughput, CPU/Mem, dialogue quality") },
  { n: "09", name: l("线上支付闭环", "Live payment loop"), ev: l("线上打赏支付闭环", "Online tipping payment loop") },
];

type CaseId = "suanle" | "hazmat" | "leap";
const CASES: Record<
  CaseId,
  { tab: L; title: L; flex: L[]; guard: L[]; outcome: L }
> = {
  suanle: {
    tab: l("《算了》", "Suanle"),
    title: l("大模型直接推算干支历法极易胡编", "LLMs fabricate Chinese calendar charts when asked to compute them"),
    flex: [
      l("茶馆掌柜的温润对话，梳理用户心境", "The Teahouse Keeper’s warm dialogue that sorts out the user’s mood"),
      l("对话中按需唤起六爻/八字/紫微/塔罗等 6 类交互卡片", "Six kinds of interactive cards (hexagram / Bazi / Zi Wei / Tarot …) summoned on demand in chat"),
      l("静默沉淀用户画像", "Quietly accumulated user profile"),
    ],
    guard: [
      l("前置确定性天文历法排盘计算：四柱八字与五行分布先算好，再交给模型解读", "Deterministic astronomical-calendar charting runs first — Four Pillars and Five Elements are computed before the model interprets"),
      l("排盘数据不由模型推算，从根源消除排盘幻觉", "Chart data is never computed by the model, eliminating charting hallucinations at the root"),
    ],
    outcome: l("上线运行，主理人看台实时监控吞吐与对话质量", "Live in production, monitored in real time from the curator cockpit"),
  },
  hazmat: {
    tab: l("危化品堆存", "Hazmat yard"),
    title: l("安全红线不能“大概率正确”", "Safety red lines can’t be “probably right”"),
    flex: [
      l("14 维防翻箱优选评分：把老计划员经验量化成可调参数", "14-dimension anti-reshuffle scoring — veterans’ experience as tunable parameters"),
      l("1 秒级策略参数热更新推演，调参即看效果", "1-second hot-update simulation: tune and see the effect immediately"),
      l("400 箱真实生产快照回测，大区 Top-2 命中率 90.0% ~ 95.75%", "400-container production-snapshot backtest: zone Top-2 hit rate 90.0% ~ 95.75%"),
    ],
    guard: [
      l("21+1 项一票否决安全红线，来自 IMDG《国际海运危险货物规则》", "21+1 one-vote-veto safety rules derived from the IMDG Code"),
      l("近 600 项自动化回归验证", "Nearly 600 automated regression checks"),
    ],
    outcome: l("2026.10.15 青岛港现场实测：18/20 落位被计划员采纳", "Qingdao Port, 15 Oct 2026: 18 of 20 placements accepted by planners"),
  },
  leap: {
    tab: l("LEAP 论文", "LEAP paper"),
    title: l("小模型的“思维链废话”不如一道门", "For compact models, a gate beats a rambling chain-of-thought"),
    flex: [
      l("小尺寸视觉语言模型生成动作蓝图（Action Blueprint）", "Compact vision-language model generates the Action Blueprint"),
    ],
    guard: [
      l("解析器规则门控（Parser-Gated Control）：严格匹配对照实验证明剥离冗余思维链更优", "Parser-Gated Control — a matched-control study shows stripping redundant chain-of-thought works better"),
      l("格式合规率 99.8%，高难任务规划得分 +12.90", "99.8% format compliance, +12.90 planning score on hard tasks"),
    ],
    outcome: l("响应耗时由 4.85s 降至 1.97s（缩短近 60%）", "Latency down from 4.85s to 1.97s (≈60% faster)"),
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
      kicker="CORE EDGE"
      title={
        <>
          {t("三道壁垒，", "Three moats, ")}
          <span className="ink-mark">{t("一份有证据的履历", "each backed by evidence")}</span>
        </>
      }
      intro={t(
        "厘清模型生成与确定性规则兜底的边界，将前沿多模态能力转化为可上线、可回测、经得起一线现场验收的产品与系统。",
        "Clear boundaries between model generation and deterministic rule safeguards — turning frontier multimodal capabilities into live, back-testable products accepted on the front line.",
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
          <h3 className="font-serif-cn text-2xl font-black sm:text-3xl">{t("0→1 全链路，一个人跑完", "The 0→1 pipeline, run by one person")}</h3>
          <span className="hidden font-mono text-xs uppercase tracking-widest text-mute sm:block">9 steps</span>
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
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-bronze-2">{t("方法论 · METHOD", "METHOD")}</p>
              <h3 className="font-serif-cn text-2xl font-black leading-tight sm:text-4xl">
                {t("哪里放权，哪里兜底", "Where to delegate, where to guard")}
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
                {t("放权 · FLEXIBLE", "DELEGATE · FLEXIBLE")}
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
                {t("兜底 · DETERMINISTIC GUARD", "GUARD · DETERMINISTIC")}
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
