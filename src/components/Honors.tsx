import { useState } from "react";
import { Award, Medal, Star, Trophy, Users } from "lucide-react";
import { l, useI18n } from "../i18n";
import { HONORS, type HonorCat } from "../data/honors";
import { Chip, SectionShell, Tabs } from "./ui";
import { cn } from "../utils/cn";

type Filter = "all" | HonorCat;

const CAT_ICON = { scholarship: Medal, practice: Users, competition: Trophy } as const;
const CAT_LABEL = {
  scholarship: l("奖学金", "Scholarship"),
  practice: l("实践与团学", "Practice & League"),
  competition: l("学科竞赛", "Contest"),
} as const;

export function Honors({ no }: { no: number }) {
  const { t } = useI18n();
  const [f, setF] = useState<Filter>("all");
  const list = HONORS.filter((h) => f === "all" || h.cat === f);
  const count = (c: HonorCat) => HONORS.filter((h) => h.cat === c).length;

  return (
    <SectionShell
      id="honors"
      no={no}
      className="bg-paper-2/60"
      kicker="VERIFIED HONORS & AWARDS"
      title={
        <>
          {t("每一项荣誉，", "Every honor ")}
          <span className="ink-mark">{t("都有红头文件与编号可查", "traceable to an official notice or entry number")}</span>
        </>
      }
      intro={t(
        "奖学金、校院级表彰与学科竞赛，按时间倒序排列，可按类别筛选。",
        "Scholarships, university/college commendations and contests, newest first — filter by category.",
      )}
    >
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Tabs
          value={f}
          onChange={setF}
          items={[
            { id: "all" as Filter, label: `${t("全部", "All")} · ${HONORS.length}` },
            { id: "competition" as Filter, label: `${t(CAT_LABEL.competition)} · ${count("competition")}` },
            { id: "scholarship" as Filter, label: `${t(CAT_LABEL.scholarship)} · ${count("scholarship")}` },
            { id: "practice" as Filter, label: `${t(CAT_LABEL.practice)} · ${count("practice")}` },
          ]}
        />
        <span className="flex items-center gap-1.5 text-sm text-mute">
          <Star size={14} className="fill-seal text-seal" />
          {t("标星为国家级 / 省级 / 校赛金奖等重点奖项", "Starred: national / provincial / campus-gold highlights")}
        </span>
      </div>

      <ol className="relative">
        <span aria-hidden className="absolute bottom-2 left-[6rem] top-2 hidden w-px bg-ink/15 sm:block" />
        {list.map((h) => {
          const Icon = CAT_ICON[h.cat];
          return (
            <li key={h.title.zh} className="group relative grid gap-2 py-3 sm:grid-cols-[5rem_1fr] sm:gap-8">
              <div className="font-mono text-sm font-bold text-ink-2 sm:pt-5 sm:text-right">{h.date}</div>
              <span
                aria-hidden
                className={cn(
                  "absolute left-[5.625rem] top-[1.7rem] z-10 hidden h-3 w-3 rounded-full border-2 border-paper sm:block",
                  h.star ? "bg-seal" : "bg-ink/40",
                )}
              />
              <div
                className={cn(
                  "paper-card relative rounded-2xl p-5 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg sm:ml-3",
                  h.star && "border-seal/30",
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone={h.star ? "seal" : "paper"}>
                    <Icon size={12} />
                    {t(CAT_LABEL[h.cat])}
                  </Chip>
                  <Chip tone="bronze">{t(h.level)}</Chip>
                  {h.star && <Award size={16} className="ml-auto text-seal" />}
                </div>
                <h3 className="mt-3 font-serif-cn text-[1.05rem] font-bold leading-snug">{t(h.title)}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{t(h.detail)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
