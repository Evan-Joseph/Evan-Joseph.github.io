import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "zh" | "en";
export type L = { zh: string; en: string };

/** Build a bilingual string object. */
export const l = (zh: string, en: string): L => ({ zh, en });

const ZH_COMPOUND_RE = new RegExp(
  [
    "共同第一作者",
    "第一作者",
    "第三作者",
    "第六作者",
    "独立作者",
    "独立著作权人",
    "项目负责人",
    "核心成员",
    "老计划员",
    "计划员",
    "主任医师）",
    "主任医师",
    "副研究员",
    "副教授",
    "软件著作权",
    "人工智能",
    "计算机科学",
    "工业落地",
    "确定性",
    "宣传片",
    "现场",
    "实测数据",
    "技能包",
    "选型",
    "定版",
    "失真模式",
    "加速框架",
    "优秀实践团队",
    "先进个人",
    "1 秒级",
    "一等奖",
    "二等奖",
    "三等奖",
    "金奖",
    "山东港口",
    "青岛港",
    "青岛大学",
  ].join("|"),
  "g",
);

/** Prevent CJK & English last-line orphans and mid-compound word splits. */
export function noOrphan(raw: string, lang: Lang): string {
  if (!raw) return raw;
  if (lang === "zh") {
    let s = raw
      // Non-breaking hyphen for GPT-4o, Qwen-VL, CCF-A, Top-2, CET-6, etc.
      .replace(/([A-Za-z0-9])-([A-Za-z0-9])/g, "$1\u2011$2")
      // Keep date ranges like "2023.09 – 2027.06" or "2025.11 – 至今" together
      .replace(/(\d{4}\.\d{2})\s*[–-]\s*(\d{4}\.\d{2}|至今)/g, (m) => m.replace(/\s+/g, "\u00A0").split("").join("\u2060"))
      // Keep role slashes like "第一作者 / 队长" bound
      .replace(/(?:共同第一|第一|第三|第六|独立|项目|产品)?(?:作者|负责人|主理人)\s*\/\s*(?:队长|开发者)/g, (m) =>
        m.replace(/\s+/g, "\u00A0").split("").join("\u2060"),
      )
      // Keep "编号 2026045907" / "登记号 2026R11L3615529" bound together
      .replace(/(编号|登记号)\s+([A-Za-z0-9\u2011-]+(?:\s+[A-Za-z0-9\u2011-]+)?)/g, (_m, k, v) =>
        `${k}\u00A0${v.replace(/\s+/g, "\u00A0")}`.split("").join("\u2060"),
      );

    // Protect atomic Chinese compound nouns from splitting across line breaks
    s = s.replace(ZH_COMPOUND_RE, (m) => m.replace(/\s+/g, "\u00A0").split("").join("\u2060"));

    if (raw.length < 10) return s;

    // Join the last 6-7 visible characters with Word Joiner (\u2060)
    const tailLen = Math.min(raw.length - 4, 7);
    if (tailLen >= 3) {
      let count = 0;
      let cutIdx = s.length;
      while (cutIdx > 0 && count < tailLen) {
        cutIdx--;
        if (s[cutIdx] !== "\u2060") count++;
      }
      const head = s.slice(0, cutIdx);
      const tail = s
        .slice(cutIdx)
        .replace(/\u2060/g, "")
        .replace(/\s+/g, "\u00A0")
        .split("")
        .join("\u2060");
      s = (head + "\u2060" + tail).replace(/\u2060+/g, "\u2060");
    }
    return s;
  } else {
    const s = raw.replace(/([A-Za-z0-9])-([A-Za-z0-9])/g, "$1\u2011$2");
    if (s.length < 24) return s;
    const parts = s.trim().split(/\s+/);
    if (parts.length < 4) return s;
    const last = parts.pop()!;
    const secondLast = parts.pop()!;
    if (last.length <= 9 && parts.length >= 2) {
      const thirdLast = parts.pop()!;
      return [...parts, `${thirdLast}\u00A0${secondLast}\u00A0${last}`].join(" ");
    }
    return [...parts, `${secondLast}\u00A0${last}`].join(" ");
  }
}

/* ---------------------------------- Language ---------------------------------- */

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** t(L) or t('中文', 'English') */
  t: (a: L | string, b?: string) => string;
};

const Ctx = createContext<I18nCtx>({
  lang: "zh",
  setLang: () => {},
  t: (a, b) => (typeof a === "string" ? (b ?? a) : a.zh),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem("sz-lang");
      if (saved === "zh" || saved === "en") return saved;
    } catch {
      /* ignore */
    }
    return "zh";
  });

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("sz-lang", next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title =
      lang === "zh"
        ? "高神舟 Shenzhou Gao · AI 产品主理人 & 智能体解决方案"
        : "Shenzhou Gao · AI Product Creator & Agent Solutions";
  }, [lang]);

  const t = useCallback(
    (a: L | string, b?: string) => {
      const raw = typeof a === "string" ? (lang === "zh" ? a : (b ?? a)) : a[lang];
      return noOrphan(raw, lang);
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);

/* ------------------------------------ Lens ------------------------------------ */

export type LensId = "recruiter" | "academic" | "explorer";

type LensCtx = { lens: LensId; setLens: (l: LensId) => void };
const LCtx = createContext<LensCtx>({ lens: "recruiter", setLens: () => {} });

export function LensProvider({ children }: { children: ReactNode }) {
  const [lens, setLensState] = useState<LensId>(() => {
    try {
      const saved = localStorage.getItem("sz-lens");
      if (saved === "recruiter" || saved === "academic" || saved === "explorer") return saved;
    } catch {
      /* ignore */
    }
    return "recruiter";
  });
  const setLens = useCallback((next: LensId) => {
    setLensState(next);
    try {
      localStorage.setItem("sz-lens", next);
    } catch {
      /* ignore */
    }
  }, []);
  const value = useMemo(() => ({ lens, setLens }), [lens, setLens]);
  return <LCtx.Provider value={value}>{children}</LCtx.Provider>;
}

export const useLens = () => useContext(LCtx);
