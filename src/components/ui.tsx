import { useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy, ZoomIn } from "lucide-react";
import { asset, type Img } from "../data/assets";
import { useI18n } from "../i18n";
import { cn } from "../utils/cn";
import { useOverlay } from "./Overlay";

/* ------------------------------- Section shell ------------------------------- */

export function SectionShell({
  id,
  no,
  kicker,
  title,
  intro,
  dark,
  children,
  className,
}: {
  id: string;
  no: number;
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        "relative scroll-mt-16 overflow-hidden py-14 sm:py-24 lg:py-28",
        dark ? "bg-night text-paper" : "text-ink",
        className,
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(900px 400px at 85% -5%, rgba(214,173,104,.14), transparent 60%), radial-gradient(700px 400px at 0% 100%, rgba(181,39,31,.12), transparent 60%)",
          }}
        />
      )}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-6 right-2 select-none font-mono text-[7.5rem] font-bold leading-none sm:right-10 sm:text-[15rem]",
          dark ? "text-paper/[0.04]" : "text-ink/[0.045]",
        )}
      >
        {String(no).padStart(2, "0")}
      </span>
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <header className="mb-9 max-w-5xl sm:mb-16">
          <p className={cn("mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] sm:mb-4", dark ? "text-bronze-2" : "text-seal")}>
            <span className="inline-block h-px w-8 bg-current" />
            <span>{String(no).padStart(2, "0")}</span>
            <span>{kicker}</span>
          </p>
          <h2 className="font-serif-cn text-[1.62rem] font-black leading-[1.24] tracking-tight sm:text-[2.65rem] sm:leading-[1.18]">{title}</h2>
          {intro && (
            <p className={cn("mt-4 max-w-3xl text-[15px] leading-relaxed sm:mt-5 sm:text-lg", dark ? "text-paper/70" : "text-ink-2")}>{intro}</p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

/* ---------------------------------- Chips ---------------------------------- */

export function Chip({
  children,
  tone = "paper",
  className,
}: {
  children: ReactNode;
  tone?: "paper" | "seal" | "bronze" | "dark" | "jade" | "outline-dark";
  className?: string;
}) {
  const tones = {
    paper: "bg-ink/[0.06] text-ink-2 border-ink/10",
    seal: "bg-seal/10 text-seal border-seal/25",
    bronze: "bg-bronze/12 text-bronze border-bronze/30",
    jade: "bg-jade/10 text-jade border-jade/25",
    dark: "bg-paper/10 text-paper/85 border-paper/15",
    "outline-dark": "bg-transparent text-bronze-2 border-bronze-2/40",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11.5px] font-medium leading-5",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------- Link btn --------------------------------- */

export function ExtLink({
  href,
  children,
  variant = "ghost",
  dark,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "text";
  dark?: boolean;
  className?: string;
}) {
  const base = "group inline-flex items-center gap-1.5 text-sm font-medium transition";
  const styles = {
    solid: dark
      ? "rounded-full bg-bronze-2 px-4 py-2 text-night hover:bg-paper"
      : "rounded-full bg-ink px-4 py-2 text-paper hover:bg-seal",
    ghost: dark
      ? "rounded-full border border-paper/25 px-4 py-2 text-paper hover:border-bronze-2 hover:text-bronze-2"
      : "rounded-full border border-ink/20 px-4 py-2 text-ink hover:border-seal hover:text-seal",
    text: dark ? "text-bronze-2 hover:text-paper" : "text-seal hover:text-ink",
  } as const;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, styles[variant], className)}>
      {children}
      <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

/* ---------------------------------- Image ---------------------------------- */

export function Pic({
  img,
  group,
  index,
  className,
  lazy = true,
  dark,
  rounded = "rounded-lg",
  noZoomIcon,
}: {
  img: Img;
  group?: readonly Img[];
  index?: number;
  className?: string;
  lazy?: boolean;
  dark?: boolean;
  rounded?: string;
  noZoomIcon?: boolean;
}) {
  const { openImages } = useOverlay();
  const { t } = useI18n();
  const list = group ?? [img];
  const start = index ?? Math.max(0, list.findIndex((x) => x.file === img.file));
  return (
    <button
      type="button"
      onClick={() => openImages(list, start)}
      aria-label={t(img.cap)}
      className={cn(
        "group relative block w-full cursor-zoom-in overflow-hidden",
        rounded,
        dark ? "skeleton-dark" : "skeleton",
        className,
      )}
      style={{ aspectRatio: `${img.w} / ${img.h}` }}
    >
      <img
        src={asset(img.file)}
        alt={t(img.cap)}
        width={img.w}
        height={img.h}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
      {!noZoomIcon && (
        <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
          <ZoomIn size={15} />
        </span>
      )}
    </button>
  );
}

/** Desktop screenshot in a browser chrome. */
export function BrowserFrame({
  url,
  children,
  dark,
  className,
}: {
  url?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "media-shadow overflow-hidden rounded-xl border",
        dark ? "border-paper/15 bg-night-3" : "border-ink/15 bg-paper-2",
        className,
      )}
    >
      <div className={cn("flex items-center gap-3 px-3.5 py-2.5", dark ? "bg-night-3" : "bg-paper-2")}>
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#e5584d]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#e5b04d]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#5fb865]" />
        </span>
        <span
          className={cn(
            "min-w-0 flex-1 truncate rounded-md px-3 py-0.5 text-center font-mono text-[11px]",
            dark ? "bg-black/30 text-paper/50" : "bg-paper text-mute",
          )}
        >
          {url ?? "·"}
        </span>
        <span className="w-10" />
      </div>
      {children}
    </div>
  );
}

/** Mobile screenshot in a phone bezel. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("media-shadow rounded-[2.1rem] bg-ink p-[5px] ring-1 ring-black/40", className)}>
      <div className="overflow-hidden rounded-[1.8rem]">{children}</div>
    </div>
  );
}

/* --------------------------------- Metrics --------------------------------- */

export function Metric({
  value,
  label,
  sub,
  dark,
  className,
}: {
  value: ReactNode;
  label: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative p-4 sm:p-6", dark ? "night-card" : "paper-card", "rounded-xl", className)}>
      <div
        className={cn(
          "tabular-nums font-serif-cn font-black tracking-tight",
          typeof value === "string" && value.length > 9 ? "text-xl sm:text-[1.7rem]" : "text-2xl sm:text-[2.5rem]",
          "leading-none",
          dark ? "text-bronze-2" : "text-seal",
        )}
      >
        {value}
      </div>
      <div className={cn("mt-2.5 text-sm font-medium leading-snug sm:mt-3", dark ? "text-paper" : "text-ink")}>{label}</div>
      {sub && <div className={cn("mt-1.5 text-xs leading-relaxed", dark ? "text-paper/55" : "text-mute")}>{sub}</div>}
    </div>
  );
}

/* ----------------------------------- Tabs ----------------------------------- */

export function Tabs<T extends string>({
  items,
  value,
  onChange,
  dark,
  className,
}: {
  items: { id: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        "no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1",
        dark ? "bg-paper/8 ring-1 ring-paper/10" : "bg-ink/[0.06] ring-1 ring-ink/5",
        className,
      )}
    >
      {items.map((it) => {
        const active = it.id === value;
        return (
          <button
            key={it.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.id)}
            className={cn(
              "flex-none whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition",
              active
                ? dark
                  ? "bg-bronze-2 text-night shadow"
                  : "bg-ink text-paper shadow"
                : dark
                  ? "text-paper/70 hover:text-paper"
                  : "text-ink-2 hover:text-ink",
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------- Copy to clipboard ------------------------------- */

export function CopyButton({ text, dark, label }: { text: string; dark?: boolean; label?: string }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          ta.remove();
        }
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
      className={cn(
        "inline-flex min-h-[32px] flex-none items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition active:scale-[0.96] sm:px-3",
        dark ? "border-paper/25 text-paper hover:border-bronze-2" : "border-ink/20 text-ink hover:border-seal hover:text-seal",
      )}
      aria-label={label ?? t("复制", "Copy")}
    >
      {done ? <Check size={13} /> : <Copy size={13} />}
      {done ? t("已复制", "Copied") : (label ?? t("复制", "Copy"))}
    </button>
  );
}

export function GithubIcon({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/* -------------------------------- Small helpers -------------------------------- */

export function Bullet({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <li className="flex gap-3">
      <span className={cn("mt-[0.7em] h-1.5 w-1.5 flex-none rotate-45", dark ? "bg-bronze-2" : "bg-seal")} />
      <span>{children}</span>
    </li>
  );
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={cn("font-mono text-[11px] uppercase tracking-[0.2em]", dark ? "text-bronze-2" : "text-seal")}>{children}</p>
  );
}
