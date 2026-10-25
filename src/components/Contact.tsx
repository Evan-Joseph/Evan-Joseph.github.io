import { useState } from "react";
import { ArrowUp, Briefcase, Download, Eye, FileText, GraduationCap, Mail, Phone } from "lucide-react";
import { useI18n, useLens } from "../i18n";
import { CV_URL } from "../data/assets";
import { CONTACT, LINKS } from "../data/profile";
import { Chip, CopyButton, ExtLink, GithubIcon, SectionShell } from "./ui";
import { useOverlay } from "./Overlay";
import { cn } from "../utils/cn";

export function Contact({ no }: { no: number }) {
  const { t } = useI18n();
  const { lens } = useLens();
  const { openResume } = useOverlay();
  const [inline, setInline] = useState(false);

  const cards = [
    {
      key: "job",
      icon: Briefcase,
      label: t("求职主力邮箱", "Primary email for jobs"),
      value: CONTACT.jobEmail,
      href: `mailto:${CONTACT.jobEmail}`,
      rec: lens === "recruiter" || lens === "explorer",
    },
    {
      key: "acad",
      icon: GraduationCap,
      label: t("学术联系邮箱", "Academic email"),
      value: CONTACT.acadEmail,
      href: `mailto:${CONTACT.acadEmail}`,
      rec: lens === "academic",
    },
    {
      key: "phone",
      icon: Phone,
      label: t("电话 / 微信", "Phone / WeChat"),
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
      rec: false,
    },
  ];

  return (
    <SectionShell
      id="contact"
      no={no}
      kicker="RÉSUMÉ & CONTACT"
      title={
        <>
          {t("求职简历与", "Résumé & ")}
          <span className="ink-mark">{t("直接联系通道", "direct contact")}</span>
        </>
      }
      intro={t(
        "2027 届应届本科校招 / 全职。目标方向：AI 产品经理、智能体（Agent）解决方案、前线部署工程师（FDE）、AI 原生应用负责人。现居山东青岛。",
        "Class of 2027, new-grad full-time. Targeting AI Product Manager, Agent Solutions, Forward-Deployed Engineer (FDE) and AI-Native App Lead roles. Based in Qingdao, Shandong.",
      )}
    >
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Résumé */}
        <div className="lg:col-span-7">
          <div className="paper-card overflow-hidden rounded-3xl">
            <div className="flex flex-wrap items-center gap-4 border-b border-ink/10 p-5 sm:p-8">
              <span className="seal h-12 w-12 text-lg sm:h-14 sm:w-14 sm:text-xl">{t("简历", "CV")}</span>
              <div className="min-w-0 flex-1">
                <p className="font-serif-cn text-lg font-black sm:text-xl">{t("求职简历 · PDF", "Résumé · PDF")}</p>
                <p className="font-mono text-xs text-mute">Shenzhou_Gao_CV.pdf</p>
              </div>
              <div className="flex w-full gap-2 sm:w-auto">
                <button
                  onClick={openResume}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-seal active:scale-[0.97] sm:flex-initial sm:px-5"
                >
                  <Eye size={16} />
                  {t("全屏预览", "Full preview")}
                </button>
                <a
                  href={CV_URL}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/25 px-4 py-2.5 text-sm font-semibold transition hover:border-seal hover:text-seal active:scale-[0.97] sm:flex-initial sm:px-5"
                >
                  <Download size={16} />
                  {t("下载", "Download")}
                </a>
              </div>
            </div>
            <div className="p-5 sm:p-8">
              {inline ? (
                <div className="overflow-hidden rounded-xl border border-ink/10 bg-paper-3">
                  <iframe title="Resume" src={`${CV_URL}#view=FitH`} className="h-[560px] w-full border-0 sm:h-[720px]" loading="lazy" />
                </div>
              ) : (
                <button
                  onClick={() => setInline(true)}
                  className="group relative grid h-48 w-full place-items-center overflow-hidden rounded-xl border border-dashed border-ink/25 bg-paper/60 transition hover:border-seal sm:h-56"
                >
                  <span className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0 1px, transparent 1px 22px)" }} />
                  <span className="relative flex flex-col items-center gap-2 text-ink-2 transition group-hover:text-seal">
                    <FileText size={36} strokeWidth={1.3} />
                    <span className="text-sm font-semibold">{t("点击在此处内嵌预览简历", "Click to preview the résumé inline")}</span>
                  </span>
                </button>
              )}
              <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
                {[t("AI 产品经理", "AI Product Manager"), t("智能体解决方案", "Agent Solutions"), t("前线部署工程师（FDE）", "Forward-Deployed Engineer"), t("AI 原生应用负责人", "AI-Native App Lead")].map((r) => (
                  <Chip key={r} tone="seal">
                    {r}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="space-y-3.5 sm:space-y-4 lg:col-span-5">
          {cards.map((c) => (
            <div
              key={c.key}
              className={cn("paper-card relative flex items-center gap-3 rounded-2xl p-4 transition sm:gap-4 sm:p-5", c.rec && "border-seal/40 shadow-lg shadow-seal/10")}
            >
              <span className={cn("grid h-10 w-10 flex-none place-items-center rounded-xl sm:h-12 sm:w-12", c.rec ? "bg-seal text-white" : "bg-ink/8 text-ink")}>
                <c.icon size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-[11.5px] font-medium text-mute sm:text-[12px]">
                  {c.label}
                  {c.rec && <span className="rounded bg-seal px-1.5 py-px font-mono text-[10px] font-bold uppercase text-white">{t("推荐", "Suggested")}</span>}
                </p>
                <a href={c.href} className="mt-0.5 block break-all font-mono text-[13px] font-bold leading-snug transition hover:text-seal sm:truncate sm:text-[15px]">
                  {c.value}
                </a>
              </div>
              <CopyButton text={c.value} />
            </div>
          ))}

          <div className="paper-card rounded-2xl p-5">
            <p className="mb-3 flex items-center gap-2 text-[12px] font-medium text-mute">
              <Mail size={14} />
              {t("在线主页与学术主页", "Homepages & academic profiles")}
            </p>
            <div className="flex flex-wrap gap-2">
              <ExtLink href={LINKS.site} className="!px-3.5 !py-1.5 !text-[13px]">
                evan-joseph.github.io
              </ExtLink>
              <ExtLink href={LINKS.github} className="!px-3.5 !py-1.5 !text-[13px]">
                <GithubIcon size={13} />
                GitHub
              </ExtLink>
              <ExtLink href={LINKS.openreview} className="!px-3.5 !py-1.5 !text-[13px]">
                OpenReview
              </ExtLink>
              <ExtLink href={LINKS.orcid} className="!px-3.5 !py-1.5 !text-[13px]">
                ORCID
              </ExtLink>
            </div>
            <p className="mt-3 font-mono text-[11px] text-mute">ORCID {LINKS.orcidId}</p>
          </div>

          <p className="px-1 text-[13px] leading-relaxed text-ink-2">
            {t(
              "山东青岛 · 籍贯山东潍坊。求职类事宜请联系 foxmail 邮箱或电话 / 微信；学术合作请使用学校邮箱。",
              "Based in Qingdao, Shandong (from Weifang). For jobs, use the foxmail address or phone/WeChat; for academic collaboration, use the university address.",
            )}
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative border-t border-ink/10 bg-paper-2 py-10">
      <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-4">
          <span className="seal h-11 w-11 text-base">{t("神舟", "SG")}</span>
          <div>
            <p className="font-serif-cn text-base font-black">{t("高神舟 · Shenzhou Gao", "Shenzhou Gao")}</p>
            <p className="text-xs text-mute">
              {t("AI 产品主理人 & 智能体解决方案 · 青岛大学 2027 届", "AI Product Creator & Agent Solutions · Qingdao University, Class of 2027")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink-2">
          <a className="font-mono hover:text-seal" href={LINKS.site} target="_blank" rel="noopener noreferrer">
            evan-joseph.github.io
          </a>
          <span className="text-mute">© 2026 {t("高神舟", "Shenzhou Gao")}</span>
          <a href="#top" className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-3 py-1.5 font-medium transition hover:border-seal hover:text-seal">
            <ArrowUp size={14} />
            {t("回到顶部", "Back to top")}
          </a>
        </div>
      </div>
    </footer>
  );
}
