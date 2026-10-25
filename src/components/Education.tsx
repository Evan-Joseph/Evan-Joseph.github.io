import { Languages, School, Users } from "lucide-react";
import { l, useI18n, type L } from "../i18n";
import { Chip, Metric, SectionShell } from "./ui";
import { cn } from "../utils/cn";

const COURSES: { name: L; score: number }[] = [
  { name: l("人工智能通识与实践", "AI Fundamentals & Practice"), score: 100 },
  { name: l("计算机组成与结构", "Computer Organization & Architecture"), score: 96 },
  { name: l("人工智能数学基础", "Mathematical Foundations of AI"), score: 96 },
  { name: l("程序设计与算法实践", "Programming & Algorithm Practice"), score: 95 },
  { name: l("离散数学", "Discrete Mathematics"), score: 93 },
  { name: l("数据库系统原理", "Database System Principles"), score: 92 },
  { name: l("形式语言与计算理论", "Formal Languages & Theory of Computation"), score: 90 },
];

function RankStrip({ rank, total = 20, label, sub }: { rank: number; total?: number; label: string; sub: string }) {
  return (
    <div className="paper-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-serif-cn text-lg font-black">{label}</p>
        <p className="flex-none whitespace-nowrap font-serif-cn text-4xl font-black leading-none text-seal">
          {rank}
          <span className="text-xl text-ink/40"> / {total}</span>
        </p>
      </div>
      <div className="mt-5 flex items-end gap-1.5" aria-hidden>
        {Array.from({ length: total }, (_, n) => (
          <span
            key={n}
            className={cn(
              "flex-1 rounded-sm transition",
              n + 1 === rank ? "h-7 bg-seal" : n + 1 < rank ? "h-5 bg-ink/35" : "h-3 bg-ink/12",
            )}
          />
        ))}
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-ink-2">{sub}</p>
    </div>
  );
}

export function Education({ no }: { no: number }) {
  const { t } = useI18n();
  return (
    <SectionShell
      id="education"
      no={no}
      kicker="EDUCATION"
      title={
        <>
          {t("图灵拔尖班里的", "Ranked ")}
          <span className="ink-mark">{t("综测第 2 / 20", "2nd of 20 in the Turing Honors Class")}</span>
        </>
      }
      intro={t(
        "青岛大学 · 计算机科学技术学院 · 计算机科学与技术（图灵拔尖创新班），2023.09 – 2027.06。2023 级全院选拔、独立成班仅 20 人，任副班长，2027 届全日制本科大四在读。",
        "Qingdao University · School of Computer Science and Technology · Computer Science (Turing Honors Innovation Class), Sep 2023 – Jun 2027. A school-wide selected cohort of just 20 students; vice monitor; full-time undergraduate, Class of 2027.",
      )}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <RankStrip
          rank={2}
          label={t("2025–2026 学年 · 综合素质测评", "2025–26 · Comprehensive evaluation")}
          sub={t(
            "拔尖班前 10%。大三上综测 69.07 分列 2/20，大三下综测 71.11 分列 2/20；双创智育加分触顶满分，体育与劳育均满分。",
            "Top 10% of the honors class. Term 1 score 69.07 ranked 2/20, Term 2 score 71.11 ranked 2/20; innovation & intellectual bonus capped at full marks, physical and labor education both full marks.",
          )}
        />
        <RankStrip
          rank={5}
          label={t("2025–2026 学年 · 学业成绩", "2025–26 · Academic performance")}
          sub={t(
            "拔尖班前 25%。大三下学期单学期加权均分 91.72，零挂科。",
            "Top 25% of the honors class. Term-2 weighted average 91.72 for the semester, with zero failed courses.",
          )}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Metric value="86.19" label={t("全学程累计加权均分", "Cumulative weighted average")} sub={t("满分 100", "out of 100")} />
        <Metric value="3.46" label={t("累计 GPA", "Cumulative GPA")} sub={t("满分 4.00", "out of 4.00")} />
        <Metric value="6 / 20" label={t("累计学业排名", "Cumulative academic rank")} />
        <Metric value="564" label={t("CET-6 成绩", "CET-6 score")} sub={t("CET-4：567", "CET-4: 567")} />
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="mb-6 font-serif-cn text-2xl font-black">{t("专业核心高分课程 · 零挂科", "Core courses · zero failures")}</h3>
          <ul className="space-y-4">
            {COURSES.map((c) => (
              <li key={c.name.zh}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium">{t(c.name)}</span>
                  <span className="font-mono font-bold text-seal">{c.score}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full origin-left rounded-full bg-gradient-to-r from-seal to-bronze"
                    style={{ width: `${c.score}%`, animation: "grow-x 1.2s cubic-bezier(.2,.7,.2,1) both" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 lg:col-span-5">
          <div className="paper-card flex gap-4 rounded-2xl p-5">
            <School className="mt-0.5 flex-none text-seal" size={22} />
            <div>
              <p className="font-serif-cn text-base font-black">{t("图灵拔尖创新班", "Turing Honors Innovation Class")}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                {t("2023 级全院选拔，独立成班仅 20 人", "School-wide selection, an independent class of only 20 (2023 intake)")}
              </p>
            </div>
          </div>
          <div className="paper-card flex gap-4 rounded-2xl p-5">
            <Users className="mt-0.5 flex-none text-seal" size={22} />
            <div>
              <p className="font-serif-cn text-base font-black">{t("副班长 · 团干部", "Vice monitor · League cadre")}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                {t("23 计科图灵班副班长，获“优秀团干部”“先进班集体”“先进团支部”", "Vice monitor of the 2023 CS Turing Class; “Outstanding League Cadre”, “Advanced Class”, “Advanced League Branch”")}
              </p>
            </div>
          </div>
          <div className="paper-card flex gap-4 rounded-2xl p-5">
            <Languages className="mt-0.5 flex-none text-seal" size={22} />
            <div>
              <p className="font-serif-cn text-base font-black">{t("英文学术能力", "Academic English")}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                {t("CET-6 564、CET-4 567；具备流利的英文顶会论文撰写与审稿答辩（Rebuttal）能力", "CET-6 564, CET-4 567; fluent in writing top-conference papers in English and handling reviewer rebuttals")}
              </p>
              <div className="mt-3 flex gap-2">
                <Chip tone="seal">CET-6 564</Chip>
                <Chip tone="paper">CET-4 567</Chip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
