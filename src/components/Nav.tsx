import { useEffect, useState } from "react";
import { BookOpen, Briefcase, Compass, FileText, Menu, X } from "lucide-react";
import { l, useI18n, useLens, type LensId } from "../i18n";
import { LENSES, SECTION_META, type SectionId } from "../data/profile";
import { cn } from "../utils/cn";
import { useOverlay } from "./Overlay";

export const LENS_ICON: Record<LensId, typeof Briefcase> = {
  recruiter: Briefcase,
  academic: BookOpen,
  explorer: Compass,
};

const LENS_SHORT: Record<LensId, ReturnType<typeof l>> = {
  recruiter: l("招聘", "Hiring"),
  academic: l("学术", "Academic"),
  explorer: l("作品", "Works"),
};

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  const key = ids.join(",");
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.38) cur = id;
      }
      setActive(cur);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={cn("inline-flex rounded-full bg-ink/[0.07] p-0.5 text-xs font-semibold ring-1 ring-ink/5", className)} role="group" aria-label="Language">
      {(["zh", "en"] as const).map((k) => (
        <button
          key={k}
          onClick={() => setLang(k)}
          aria-pressed={lang === k}
          className={cn(
            "rounded-full px-3 py-1.5 transition",
            lang === k ? "bg-ink text-paper shadow" : "text-ink-2 hover:text-ink",
          )}
        >
          {k === "zh" ? "中" : "EN"}
        </button>
      ))}
    </div>
  );
}

export function LensSwitch({ className, compact }: { className?: string; compact?: boolean }) {
  const { lens, setLens } = useLens();
  const { t } = useI18n();
  return (
    <div className={cn("inline-flex rounded-full bg-ink/[0.07] p-0.5 text-xs font-semibold ring-1 ring-ink/5", className)} role="group" aria-label={t("访客视角", "Visitor lens")}>
      {(Object.keys(LENSES) as LensId[]).map((k) => {
        const Icon = LENS_ICON[k];
        const on = lens === k;
        return (
          <button
            key={k}
            onClick={() => setLens(k)}
            aria-pressed={on}
            title={t(LENSES[k].name)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition",
              on ? "bg-seal text-white shadow" : "text-ink-2 hover:text-ink",
            )}
          >
            <Icon size={13} />
            {!compact && <span>{t(LENS_SHORT[k])}</span>}
          </button>
        );
      })}
    </div>
  );
}

export function Nav() {
  const { t } = useI18n();
  const { lens } = useLens();
  const { openResume } = useOverlay();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const order = LENSES[lens].order;
  const active = useActiveSection(order);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1240px] items-center gap-3 px-4 sm:h-16 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Home">
            <span className="seal h-8 w-8 text-[13px]">{t("神舟", "SG")}</span>
            <span className="hidden font-serif-cn text-[15px] font-black tracking-wide sm:block">
              {t("高神舟", "Shenzhou Gao")}
            </span>
          </a>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <LensSwitch />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <button
              onClick={openResume}
              className="hidden items-center gap-1.5 rounded-full border border-ink/20 px-3.5 py-1.5 text-xs font-semibold transition hover:border-seal hover:text-seal sm:inline-flex"
            >
              <FileText size={14} />
              {t("简历", "Résumé")}
            </button>
            <LangToggle />
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-paper transition hover:bg-seal"
              aria-label={t("目录", "Index")}
            >
              <Menu size={14} />
              <span className="hidden sm:inline">{t("目录", "Index")}</span>
            </button>
          </div>
        </div>
        <div className="progress-bar h-[2px] bg-seal" style={{ transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }} />
      </header>

      {/* Side rail */}
      <nav aria-label="Sections" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2.5 2xl:flex">
        {order.map((id, n) => (
          <a
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-2"
            aria-label={t(SECTION_META[id].label)}
          >
            <span
              className={cn(
                "rounded bg-ink px-2 py-0.5 text-[11px] font-medium text-paper opacity-0 shadow transition group-hover:opacity-100",
              )}
            >
              {t(SECTION_META[id].label)}
            </span>
            <span
              className={cn(
                "block rounded-full transition-all",
                active === id ? "h-2.5 w-6 bg-seal" : "h-1.5 w-1.5 bg-ink/30 group-hover:bg-ink/60",
              )}
              data-n={n}
            />
          </a>
        ))}
      </nav>

      {/* Index overlay */}
      {open && <IndexOverlay order={order} active={active} onClose={() => setOpen(false)} />}
    </>
  );
}

function IndexOverlay({ order, active, onClose }: { order: SectionId[]; active: string; onClose: () => void }) {
  const { t } = useI18n();
  const { lens } = useLens();
  const { openResume } = useOverlay();
  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-paper/97 backdrop-blur-xl" style={{ animation: "fade-in .2s ease both" }}>
      <div className="mx-auto max-w-[1100px] px-5 pb-16 pt-5 sm:px-8">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-seal">{t("目录 · INDEX", "INDEX")}</span>
          <button onClick={onClose} className="rounded-full p-2 transition hover:bg-ink/10" aria-label={t("关闭", "Close")}>
            <X size={22} />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <LensSwitch />
          <span className="text-sm text-mute">{t(LENSES[lens].name)}</span>
        </div>

        <ol className="mt-8 grid gap-x-10 sm:grid-cols-2">
          {order.map((id, n) => (
            <li key={id} className="border-t border-ink/12">
              <a
                href={`#${id}`}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-4 transition hover:pl-2"
              >
                <span className={cn("font-mono text-sm", active === id ? "text-seal" : "text-mute")}>{String(n + 1).padStart(2, "0")}</span>
                <span className="font-serif-cn text-xl font-bold sm:text-2xl group-hover:text-seal">{t(SECTION_META[id].label)}</span>
                {active === id && <span className="ml-auto h-2 w-2 rounded-full bg-seal" />}
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={() => {
              onClose();
              openResume();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-seal"
          >
            <FileText size={16} />
            {t("预览简历 PDF", "Preview résumé PDF")}
          </button>
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-2.5 text-sm font-semibold transition hover:border-seal hover:text-seal"
          >
            {t("联系我", "Get in touch")}
          </a>
        </div>
      </div>
    </div>
  );
}
