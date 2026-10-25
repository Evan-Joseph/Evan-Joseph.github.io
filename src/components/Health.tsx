import { Award, BarChart3, FlaskConical, Globe2, Stethoscope } from "lucide-react";
import { l, useI18n, type L } from "../i18n";
import { A, type Img } from "../data/assets";
import { Chip, ExtLink, GithubIcon, Pic, SectionShell } from "./ui";

const FIGS: { img: Img; tag: L }[] = [
  { img: A.health_quadrant, tag: l("图 1 · 四象限分型", "Fig. 1 · Quadrant typology") },
  { img: A.health_trajectories, tag: l("图 2 · 金砖五国轨迹", "Fig. 2 · BRICS trajectories") },
  { img: A.health_warning, tag: l("图 3 · 2026 高危预警", "Fig. 3 · 2026 risk warning") },
  { img: A.health_scenarios, tag: l("图 4 · 2030 情景推演", "Fig. 4 · 2030 scenarios") },
];
const FIG_IMGS = FIGS.map((f) => f.img);

const TYPES: { zh: string; en: string; tone: "jade" | "bronze" | "seal" | "paper" }[] = [
  { zh: "固若金汤型", en: "Rock-solid", tone: "jade" },
  { zh: "负重致远型", en: "Burdened but enduring", tone: "bronze" },
  { zh: "风雨飘摇型", en: "Storm-tossed", tone: "seal" },
  { zh: "捉襟见肘型", en: "Stretched thin", tone: "paper" },
];

export function Health({ no }: { no: number }) {
  const { t } = useI18n();
  return (
    <SectionShell
      id="health"
      no={no}
      kicker="GLOBAL HEALTH DATA STUDY"
      title={
        <>
          {t("从“治得上”到“治得起”：", "From “treatable” to “affordable”: ")}
          <span className="ink-mark">{t("203 个国家的慢病承接陷阱", "the chronic-disease trap across 203 countries")}</span>
        </>
      }
      intro={t(
        "《从治得上到治得起——全球健康转型中的慢病承接陷阱、国家分型与干预优先级研究》。第一作者 / 队长 · 2026.01 – 2026.06。",
        "“From Treatable to Affordable: Chronic-Disease Absorption Traps, Country Typology and Intervention Priorities in the Global Health Transition.” First author / team lead · Jan – Jun 2026.",
      )}
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[15px] leading-[1.9] text-ink-2">
            {t(
              "整合 GBD、WHO 与世界银行 2000–2023 年全球 203 个国家与地区宏观卫生数据，构建“健康转型压力指数 × 卫生承接能力指数”二维评价框架，完成全球四象限国家分型、金砖五国演化轨迹、2026 短期高危预警排序与 2030 政策干预情景推演。",
              "Integrating 2000–2023 macro-health data for 203 countries and territories from GBD, WHO and the World Bank, the study builds a two-dimensional framework — Health-Transition Pressure Index × Health-System Absorption Index — and delivers a global four-quadrant typology, BRICS evolution trajectories, a 2026 short-term high-risk ranking and 2030 policy-intervention scenarios.",
            )}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { v: "203", k: l("国家与地区", "countries & territories") },
              { v: "2000–2023", k: l("数据跨度", "data span") },
              { v: "4", k: l("象限分型", "quadrant types") },
            ].map((m) => (
              <div key={m.v} className="paper-card rounded-xl p-3.5">
                <p className="whitespace-nowrap font-serif-cn text-lg font-black leading-none text-seal sm:text-xl">{m.v}</p>
                <p className="mt-2 text-[12px] leading-snug text-ink-2">{t(m.k)}</p>
              </div>
            ))}
          </div>

          <p className="mb-2.5 mt-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            <Globe2 size={13} /> {t("四类国家分型", "FOUR COUNTRY TYPES")}
          </p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((x) => (
              <Chip key={x.zh} tone={x.tone} className="px-3 py-1 text-[13px]">
                {t(x.zh, x.en)}
              </Chip>
            ))}
          </div>

          <div className="mt-7 space-y-3 rounded-2xl border border-ink/12 bg-paper/60 p-5 text-[13.5px] leading-relaxed text-ink-2">
            <p className="flex gap-2.5">
              <Award size={16} className="mt-0.5 flex-none text-seal" />
              <span>
                {t(
                  "第 19 届中国大学生计算机设计大赛（大数据应用主题赛）山东省二等奖 · 作品编号 2026025555",
                  "19th China Collegiate Computing Contest (Big Data Application theme) · Shandong 2nd Prize · entry no. 2026025555",
                )}
              </span>
            </p>
            <p className="flex gap-2.5">
              <Stethoscope size={16} className="mt-0.5 flex-none text-seal" />
              <span>
                {t(
                  "三甲医院临床专家（青岛市海慈医疗集团科研科副主任胡勇主任医师）审阅，杨环副教授签字推荐",
                  "Reviewed by a Grade-A tertiary hospital clinician (Chief Physician Hu Yong, Deputy Director of Research, Qingdao Haici Medical Group) and endorsed in writing by Associate Prof. Yang Huan",
                )}
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <ExtLink variant="solid" href="https://www.heywhale.com/org/4C2026/competition/work-detail?work=69eaf383acdef02a88d7d9b0">
              <BarChart3 size={14} />
              {t("和鲸官方作品页", "HeyWhale work page")}
            </ExtLink>
            <ExtLink href="https://github.com/Evan-Joseph/4c-health-insight-showcase">
              <GithubIcon size={14} />
              {t("开源仓库与复现框架", "Repo & reproduction framework")}
            </ExtLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {FIGS.map((f, n) => (
              <figure key={f.img.file} className="paper-card flex flex-col rounded-2xl p-3">
                <Pic img={f.img} group={FIG_IMGS} index={n} rounded="rounded-lg" />
                <figcaption className="px-1 pb-1 pt-3">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-seal">
                    <FlaskConical size={12} />
                    {t(f.tag)}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-ink-2">{t(f.img.cap.zh.replace(/^图 \d · /, ""), f.img.cap.en.replace(/^Fig\. \d · /, ""))}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
