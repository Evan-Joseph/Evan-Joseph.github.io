import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Download, ExternalLink, Maximize2, Minimize2, X } from "lucide-react";
import { asset, CV_URL, type Img } from "../data/assets";
import { useI18n } from "../i18n";
import { cn } from "../utils/cn";

type OverlayCtx = {
  openImages: (list: readonly Img[], index?: number) => void;
  openResume: () => void;
};

const Ctx = createContext<OverlayCtx>({ openImages: () => {}, openResume: () => {} });
export const useOverlay = () => useContext(Ctx);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [box, setBox] = useState<{ list: readonly Img[]; index: number } | null>(null);
  const [resume, setResume] = useState(false);

  const openImages = useCallback((list: readonly Img[], index = 0) => setBox({ list, index }), []);
  const openResume = useCallback(() => setResume(true), []);
  const value = useMemo(() => ({ openImages, openResume }), [openImages, openResume]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {box && <Lightbox list={box.list} start={box.index} onClose={() => setBox(null)} />}
      {resume && <ResumeModal onClose={() => setResume(false)} />}
    </Ctx.Provider>
  );
}

function useLockScroll() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
}

/* -------------------------------- Lightbox -------------------------------- */

function Lightbox({ list, start, onClose }: { list: readonly Img[]; start: number; onClose: () => void }) {
  const { t } = useI18n();
  const [idx, setIdx] = useState(start);
  const [zoom, setZoom] = useState(false);
  const touch = useRef<number | null>(null);
  const isSvg = (f: string) => f.endsWith(".svg");
  useLockScroll();

  const go = useCallback(
    (d: number) => {
      setZoom(false);
      setIdx((i) => (i + d + list.length) % list.length);
    },
    [list.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && list.length > 1) go(-1);
      else if (e.key === "ArrowRight" && list.length > 1) go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, list.length, onClose]);

  const img = list[idx];
  const src = asset(img.file);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-md"
      style={{ animation: "fade-in .2s ease both" }}
      role="dialog"
      aria-modal="true"
      onTouchStart={(e) => {
        touch.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touch.current == null || zoom || list.length < 2) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 60) go(dx > 0 ? -1 : 1);
        touch.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-paper/80 sm:px-6">
        <span className="font-mono text-xs tracking-wider">
          {String(idx + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
          <span className="ml-3 text-paper/40">
            {img.w}×{img.h}
          </span>
        </span>
        <div className="flex items-center gap-1">
          {!isSvg(img.file) && (
            <button
              onClick={() => setZoom((z) => !z)}
              className="rounded-full p-2 transition hover:bg-white/10"
              aria-label={zoom ? t("适应窗口", "Fit to window") : t("原始尺寸", "Actual size")}
              title={zoom ? t("适应窗口", "Fit to window") : t("原始尺寸", "Actual size")}
            >
              {zoom ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
          )}
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 transition hover:bg-white/10"
            aria-label={t("打开原图", "Open original")}
            title={t("打开原图", "Open original")}
          >
            <ExternalLink size={18} />
          </a>
          <button onClick={onClose} className="rounded-full p-2 transition hover:bg-white/10" aria-label={t("关闭", "Close")}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div
        className={cn("relative min-h-0 flex-1", zoom ? "overflow-auto" : "flex items-center justify-center overflow-hidden")}
        onClick={(e) => {
          if (e.target === e.currentTarget && !zoom) onClose();
        }}
      >
        <img
          key={img.file}
          src={src}
          alt={t(img.cap)}
          width={img.w}
          height={img.h}
          draggable={false}
          onClick={() => !isSvg(img.file) && setZoom((z) => !z)}
          className={cn(
            "select-none",
            zoom
              ? "mx-auto block max-w-none cursor-zoom-out"
              : "max-h-full max-w-full cursor-zoom-in object-contain px-2 sm:px-6",
          )}
          style={
            zoom
              ? { width: Math.min(img.w, 2400), height: "auto", animation: "pop .25s ease both" }
              : { animation: "pop .25s ease both", aspectRatio: `${img.w}/${img.h}` }
          }
        />
        {list.length > 1 && !zoom && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-paper backdrop-blur transition hover:bg-black/80 sm:left-5"
              aria-label="Prev"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-paper backdrop-blur transition hover:bg-black/80 sm:right-5"
              aria-label="Next"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      <div className="px-4 pb-4 pt-3 sm:px-6">
        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-paper/85">{t(img.cap)}</p>
        {list.length > 1 && (
          <div className="no-scrollbar mx-auto mt-3 flex max-w-full justify-start gap-2 overflow-x-auto sm:justify-center">
            {list.map((it, n) => (
              <button
                key={it.file}
                onClick={() => {
                  setZoom(false);
                  setIdx(n);
                }}
                className={cn(
                  "h-12 flex-none overflow-hidden rounded-md border-2 transition",
                  n === idx ? "border-bronze-2 opacity-100" : "border-transparent opacity-50 hover:opacity-90",
                )}
                style={{ aspectRatio: `${it.w}/${it.h}` }}
                aria-label={`#${n + 1}`}
              >
                <img src={asset(it.file)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Resume preview ------------------------------ */

function ResumeModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  useLockScroll();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-0 backdrop-blur-md sm:p-6"
      style={{ animation: "fade-in .2s ease both" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="flex h-full w-full max-w-5xl flex-col overflow-hidden bg-paper sm:h-[92vh] sm:rounded-2xl"
        style={{ animation: "pop .25s ease both" }}
      >
        <div className="flex flex-wrap items-center gap-3 border-b border-ink/10 px-4 py-3 sm:px-6">
          <span className="seal h-8 w-8 text-sm">{t("简", "CV")}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif-cn text-base font-bold">{t("求职简历 · 高神舟", "Résumé · Shenzhou Gao")}</p>
            <p className="truncate font-mono text-[11px] text-mute">Shenzhou_Gao_CV.pdf</p>
          </div>
          <a
            href={CV_URL}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-seal"
          >
            <Download size={15} />
            {t("下载 PDF", "Download PDF")}
          </a>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm transition hover:border-ink sm:inline-flex"
          >
            <ExternalLink size={15} />
            {t("新窗口打开", "Open in new tab")}
          </a>
          <button onClick={onClose} className="rounded-full p-2 transition hover:bg-ink/10" aria-label={t("关闭", "Close")}>
            <X size={20} />
          </button>
        </div>
        <div className="relative min-h-0 flex-1 bg-paper-3">
          <iframe title="Resume PDF" src={`${CV_URL}#view=FitH`} className="absolute inset-0 h-full w-full border-0" />
          <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs text-mute/80">
            {t("若浏览器无法内嵌预览，请使用上方按钮下载或新窗口打开。", "If your browser can’t embed the PDF, use the buttons above to download or open it.")}
          </p>
        </div>
      </div>
    </div>
  );
}
