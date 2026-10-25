import { ArrowDown, ArrowUpRight, FileText, MapPin, Sparkles } from "lucide-react";
import { useI18n, useLens, type LensId } from "../i18n";
import { A } from "../data/assets";
import { LENSES, LINKS, SECTION_META } from "../data/profile";
import { cn } from "../utils/cn";
import { LENS_ICON } from "./Nav";
import { useOverlay } from "./Overlay";
import { Chip, Pic, PhoneFrame } from "./ui";

export function Hero() {
  const { t, lang } = useI18n();
  const { openResume } = useOverlay();
  const phones = [A.suanle_ui_bazi, A.suanle_ui_chat, A.suanle_ui_letgo_ball];

  return (
    <header id="top" className="relative overflow-hidden pt-20 sm:pt-28">
      {/* ambient ink washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(620px 420px at 82% 28%, rgba(181,39,31,.10), transparent 65%), radial-gradient(760px 520px at 8% 0%, rgba(160,122,60,.16), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-8 px-5 pb-10 sm:gap-12 sm:px-8 sm:pb-16 lg:grid-cols-12 lg:pb-24">
        {/* Left */}
        <div className="lg:col-span-7" style={{ animation: "rise .9s cubic-bezier(.2,.7,.2,1) both" }}>
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-ink/12 bg-paper/70 py-1 pl-2.5 pr-3.5 text-[11.5px] backdrop-blur sm:gap-2.5 sm:py-1.5 sm:pl-3 sm:pr-4 sm:text-[13px]">
            <span className="relative grid h-2 w-2 flex-none place-items-center sm:h-2.5 sm:w-2.5">
              <span className="h-2 w-2 rounded-full bg-seal sm:h-2.5 sm:w-2.5" style={{ animation: "pulse-ring 2.4s ease-out infinite" }} />
            </span>
            <span className="truncate font-medium">
              {t("2027 届应届本科 · 校招 / 全职 · 现正求职", "Class of 2027 · new-grad full-time · open to offers")}
            </span>
          </div>

          <div className="mt-5 flex items-end gap-3 sm:mt-7 sm:gap-5">
            <h1
              className={cn(
                "font-serif-cn font-black tracking-tight",
                lang === "zh"
                  ? "whitespace-nowrap text-[4.1rem] sm:text-[7.5rem] lg:text-[9rem]"
                  : "whitespace-nowrap text-[2.35rem] sm:text-[4.8rem] lg:text-[5.2rem]",
                "leading-[0.98]",
              )}
            >
              {t("高神舟", "Shenzhou Gao")}
            </h1>
            <span className="seal mb-1.5 h-11 w-11 flex-none text-base sm:mb-3 sm:h-14 sm:w-14 sm:text-xl lg:h-20 lg:w-20 lg:text-3xl">
              {t("神舟", "SG")}
            </span>
          </div>
          <p className="mt-2.5 font-mono text-xs tracking-[0.14em] text-mute sm:mt-3 sm:text-sm sm:tracking-[0.3em]">
            {t("SHENZHOU GAO · @Evan-Joseph", "@Evan-Joseph · QINGDAO, CHINA")}
          </p>

          <div className="mt-5 space-y-2.5 sm:mt-8 sm:space-y-3">
            <p className="font-serif-cn text-[1.25rem] font-bold leading-snug sm:text-[2rem]">
              <span className="ink-mark">{t("AI 产品主理人 & 智能体解决方案", "AI Product Creator & Agent Solutions")}</span>
            </p>
            <p className="max-w-2xl text-[15px] leading-relaxed text-ink-2 sm:text-lg">
              {t(
                "0→1 独立产品交付 ｜ 多模态大模型评测与工业智能体。从需求定义、多模型原型比选、确定性规则设计、全栈开发部署，到 1080p60 宣传片与实时运营看台。",
                "0→1 independent product delivery | multimodal LLM evaluation & industrial AI systems. From problem definition, multi-model prototyping and deterministic rule design to full-stack deployment, 1080p60 brand films and live ops cockpits.",
              )}
            </p>
          </div>

          <div className="mt-5 sm:mt-7">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute sm:mb-2.5">
              {t("目标方向 · TARGET ROLES", "TARGET ROLES")}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                t("AI 产品经理", "AI Product Manager"),
                t("智能体（Agent）解决方案", "Agent Solutions"),
                t("前线部署工程师（FDE）", "Forward-Deployed Eng. (FDE)"),
                t("AI 原生应用负责人", "AI-Native App Lead"),
              ].map((r) => (
                <Chip key={r} tone="seal" className="px-2.5 py-0.5 text-[12px] sm:px-3 sm:py-1 sm:text-[13px]">
                  {r}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-1.5 sm:mt-8 sm:gap-3">
            <button
              onClick={openResume}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-2.5 text-[12.5px] font-semibold text-paper shadow-lg shadow-ink/20 transition hover:-translate-y-0.5 hover:bg-seal active:scale-[0.97] sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
            >
              <FileText size={14} />
              {t("预览简历", "View résumé")}
            </button>
            <a
              href={LINKS.suanle}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 rounded-full border border-ink/25 px-3 py-2.5 text-[12.5px] font-semibold transition hover:-translate-y-0.5 hover:border-seal hover:text-seal active:scale-[0.97] sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
            >
              <Sparkles size={14} />
              {t("体验《算了》", "Try Suanle")}
              <ArrowUpRight size={13} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#contact" className="px-1.5 py-2.5 text-[12.5px] font-semibold text-ink-2 underline decoration-seal/50 underline-offset-4 transition hover:text-seal active:scale-[0.97] sm:px-2 sm:py-3 sm:text-sm">
              {t("联系我", "Contact")}
            </a>
          </div>

          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] text-mute sm:mt-8 sm:text-[13px]">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} />
              {t("山东青岛 · 籍贯山东潍坊", "Qingdao, Shandong · from Weifang")}
            </span>
            <span>{t("青岛大学 · 计算机科学与技术（图灵拔尖创新班）", "Qingdao University · CS (Turing Honors Class)")}</span>
          </p>
        </div>

        {/* Right: phone trio */}
        <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5">
          <div className="relative aspect-[1/1.04]" style={{ animation: "rise 1.1s .15s cubic-bezier(.2,.7,.2,1) both" }}>
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-10 top-4 hidden select-none font-bold text-seal/55 xl:block",
                lang === "zh"
                  ? "vertical-text font-serif-cn text-lg"
                  : "font-mono text-[11px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]",
              )}
            >
              {t("算一算，然后，算了", "Calculate it, then, let it go")}
            </span>
            <div
              className="absolute left-[0%] top-[15%] w-[36%] [--r:-5deg]"
              style={{ animation: "float 8s ease-in-out infinite", transform: "rotate(-5deg)" }}
            >
              <PhoneFrame>
                <Pic img={phones[0]} group={phones} index={0} lazy={false} noZoomIcon rounded="rounded-none" />
              </PhoneFrame>
            </div>
            <div className="absolute left-[29%] top-0 z-10 w-[42%]" style={{ animation: "float 10s ease-in-out -1s infinite" }}>
              <PhoneFrame>
                <Pic img={phones[1]} group={phones} index={1} lazy={false} noZoomIcon rounded="rounded-none" />
              </PhoneFrame>
            </div>
            <div
              className="absolute right-[0%] top-[19%] w-[36%] [--r:5deg]"
              style={{ animation: "float 9s ease-in-out -3s infinite", transform: "rotate(5deg)" }}
            >
              <PhoneFrame>
                <Pic img={phones[2]} group={phones} index={2} lazy={false} noZoomIcon rounded="rounded-none" />
              </PhoneFrame>
            </div>

            <div className="absolute -left-1 bottom-[2%] z-20 rounded-xl border border-ink/10 bg-paper/90 px-3.5 py-2.5 shadow-xl backdrop-blur sm:left-[-4%]">
              <p className="font-mono text-[10px] uppercase tracking-widest text-mute">suanle.cc</p>
              <p className="font-serif-cn text-sm font-black leading-tight">{t("独立产品 · 已上线", "Solo product · live")}</p>
            </div>
            <div className="absolute -bottom-[2%] right-0 z-20 rounded-xl bg-ink px-3.5 py-2.5 text-paper shadow-xl sm:right-[-2%]">
              <p className="font-mono text-[10px] uppercase tracking-widest text-bronze-2">AAAI 2026 Oral</p>
              <p className="font-serif-cn text-sm font-black leading-tight">{t("共同第一作者 · CCF-A", "Co-first author · CCF-A")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1240px] justify-center pb-4">
        <a href="#lens" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-mute transition hover:text-seal">
          {t("向下探索", "Scroll")} <ArrowDown size={13} className="animate-bounce" />
        </a>
      </div>
    </header>
  );
}

/* --------------------------- Lens selector + guide --------------------------- */

export function LensGuide() {
  const { t } = useI18n();
  const { lens, setLens } = useLens();
  const cfg = LENSES[lens];

  return (
    <section id="lens" className="relative scroll-mt-16 border-y border-ink/10 bg-paper-2/70 py-14 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-seal">{t("导览 · GUIDED VISIT", "GUIDED VISIT")}</p>
            <h2 className="font-serif-cn text-3xl font-black leading-tight sm:text-4xl">{t("按访问目的切换视图", "Choose a viewing lens")}</h2>
          </div>
          <p className="max-w-md text-sm text-ink-2">
            {t("切换视角后，页面将按对应关切重排 11 个章节的阅读顺序与核心指标。", "Switching lenses reorders all 11 chapters and headline metrics around your focus.")}
          </p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {(Object.keys(LENSES) as LensId[]).map((k) => {
            const Icon = LENS_ICON[k];
            const on = k === lens;
            return (
              <button
                key={k}
                onClick={() => setLens(k)}
                aria-pressed={on}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-5 text-left transition duration-300",
                  on
                    ? "border-ink bg-ink text-paper shadow-xl shadow-ink/20"
                    : "border-ink/15 bg-paper/70 hover:-translate-y-0.5 hover:border-ink/40",
                )}
              >
                <span className={cn("mb-4 grid h-10 w-10 place-items-center rounded-full", on ? "bg-seal text-white" : "bg-ink/8 text-ink")}>
                  <Icon size={18} />
                </span>
                <p className="font-serif-cn text-lg font-black">{t(LENSES[k].name)}</p>
                <p className={cn("mt-1.5 text-[13px] leading-relaxed", on ? "text-paper/70" : "text-ink-2")}>{t(LENSES[k].who)}</p>
                {on && (
                  <span className="absolute right-4 top-4 rounded-full bg-bronze-2 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-night">
                    {t("当前", "ACTIVE")}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <p className="mb-4 flex items-center gap-3 text-sm font-semibold">
            <span className="h-px w-8 bg-seal" />
            {t(cfg.question)}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {cfg.picks.map((p, n) => (
              <a
                key={p.title.zh}
                href={`#${p.to}`}
                className="group relative flex flex-col rounded-2xl border border-ink/12 bg-paper/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-seal/50 hover:shadow-xl hover:shadow-ink/10"
              >
                <span className="font-mono text-[11px] text-mute">{String(n + 1).padStart(2, "0")} → {t(SECTION_META[p.to].label)}</span>
                <span className="mt-3 font-serif-cn text-2xl font-black leading-tight text-seal">{p.stat}</span>
                <span className="mt-2 font-serif-cn text-base font-bold leading-snug">{t(p.title)}</span>
                <span className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-2">{t(p.note)}</span>
                <ArrowUpRight size={16} className="mt-4 self-end text-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-seal" />
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-widest text-mute">{t("当前章节顺序", "Chapter order")}</span>
            {cfg.order.map((id, n) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-ink/12 bg-paper/60 px-2.5 py-1 text-[12px] transition hover:border-seal hover:text-seal"
              >
                <span className="mr-1 font-mono text-mute">{String(n + 1).padStart(2, "0")}</span>
                {t(SECTION_META[id].label)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Metrics band --------------------------------- */

export function MetricsBand() {
  const { t } = useI18n();
  const { lens } = useLens();
  const cfg = LENSES[lens];
  return (
    <div className="relative overflow-hidden bg-night py-10 text-paper sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(700px 260px at 50% 0%, rgba(214,173,104,.14), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-bronze-2">
          {t(`核心指标 · ${t(cfg.name)}视角`, `KEY METRICS · ${cfg.name.en.toUpperCase()}`)}
        </p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
          {cfg.metrics.map((m) => (
            <div key={m.value + m.label.zh} className="border-l border-bronze-2/30 pl-4">
              <dt className="tabular-nums font-serif-cn text-[1.6rem] font-black leading-none text-bronze-2 sm:text-[2rem]">{m.value}</dt>
              <dd className="mt-2.5 text-[13px] leading-snug text-paper/70">{t(m.label)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
