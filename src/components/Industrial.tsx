import { useState } from "react";
import { Award, ArrowRight, Anchor, Ship, Stethoscope, Bot, ScrollText, Waypoints } from "lucide-react";
import { l, useI18n, type L } from "../i18n";
import { A, type Img } from "../data/assets";
import { BrowserFrame, Bullet, Chip, ExtLink, Metric, Pic, SectionShell, Tabs } from "./ui";

type HzTab = "overview" | "map" | "xdt";
const HZ: Record<HzTab, { tab: L; img: Img; url: string }> = {
  overview: { tab: l("运行总览", "Overview"), img: A.hazmat_yard_overview, url: "debug-console / overview" },
  map: { tab: l("堆场俯视贝位图", "Bay map"), img: A.hazmat_yard_map, url: "debug-console / yard-map" },
  xdt: { tab: l("XDT 差异诊断台", "XDT diff console"), img: A.hazmat_xdt_diff, url: "hazmat-xdt.4c666.top" },
};
const HZ_ALL = [A.hazmat_yard_overview, A.hazmat_yard_map, A.hazmat_xdt_diff];

const FLOW: { n: string; title: L; body: L }[] = [
  {
    n: "01",
    title: l("候选贝位池", "Candidate slot pool"),
    body: l("覆盖 K/L/N/T 四大区、1467 个底层贝位与 4401 个物理层位", "K/L/N/T zones · 1,467 base bays · 4,401 physical tiers"),
  },
  { n: "02", title: l("21+1 一票否决", "21+1 veto rules"), body: l("IMDG 安全红线硬约束，不合规候选贝位直接出局", "IMDG safety red lines — non-compliant slots drop out") },
  { n: "03", title: l("14 维防翻箱评分", "14-dim anti-reshuffle score"), body: l("老计划员经验量化建模，支持 1 秒级策略参数热更新", "Planners’ know-how quantified; parameters hot-update in ~1s") },
  { n: "04", title: l("推荐与现场采纳", "Recommend & field confirmation"), body: l("输出大区 Top-2 推荐落位，由现场计划员确认下发", "Outputs zone Top-2 recommended placements for on-site planner confirmation") },
];

type TugTab = "dark" | "light";

const SOLUTIONS: {
  key: string;
  icon: typeof Bot;
  img?: Img;
  badge: L;
  title: L;
  sub?: L;
  period: string;
  role: L;
  body: L;
  chips: L[];
  awards: L[];
  link?: { href: string; label: L };
}[] = [
  {
    key: "yixianqian",
    icon: Stethoscope,
    img: A.medconnect_care,
    badge: l("远程会诊平台", "Remote consultation"),
    title: l("《医线牵》· 连接医患与医院协作网络", "MedConnect · linking patients and hospital collaboration networks"),
    sub: l(
      "赛事展示名：《医脉山海——面向跨区域基层患者的远程医疗协同与智能会诊系统》· 作品编号 2026045907",
      "Contest title: “Yimai Shanhai — Remote Collaborative & Intelligent Consultation System for Cross-regional Primary-care Patients” · entry no. 2026045907",
    ),
    period: "",
    role: l("", ""),
    body: l(
      "连接三甲医院专家与基层医疗机构的远程多方会诊平台，支持多方会诊看板、加密病历共享与四套临床主题（临床白 / 夜间黑 / 协作蓝 / 医护绿）实时切换。",
      "A remote multi-party consultation platform linking top-tier hospital specialists with primary-care institutions: a consultation board, encrypted record sharing and four live-switchable clinical themes (clinical white / night black / collaboration blue / caregiver green).",
    ),
    chips: [l("多方会诊看板", "Consultation board"), l("加密病历共享", "Encrypted records"), l("四套临床主题", "4 clinical themes")],
    awards: [],
    link: { href: "https://care.4c666.top", label: l("在线体验 care.4c666.top", "Live: care.4c666.top") },
  },
  {
    key: "lumbar",
    icon: ScrollText,
    img: A.lumbar_ai,
    badge: l("三维手术导航 · 腰椎 MRI", "3D surgical navigation · lumbar MRI"),
    title: l("《SurgiMind3D / 智脊析》三维手术导航与腰椎 MRI 智能辅助分析", "SurgiMind3D / Zhijixi · 3D surgical navigation & lumbar-MRI intelligent analysis"),
    sub: l(
      "界面原名 LumbarAI · 腰椎智能辅助分析系统｜第一作者作品 2026026666《智脊析——腰椎MRI结构化分析与诊断决策支持系统》",
      "UI name: LumbarAI · lumbar intelligent analysis system | first-author entry 2026026666 “Zhijixi — Structured Lumbar-MRI Analysis & Diagnostic Decision-Support System”",
    ),
    period: "",
    role: l("", ""),
    body: l(
      "支持 L1–S1 矢状位/轴位 MRI 多模态定位分割、Pfirrmann 退变分级与结构化诊断报告生成。",
      "Supports L1–S1 sagittal/axial MRI multimodal localization and segmentation, Pfirrmann degeneration grading and structured diagnostic reports.",
    ),
    chips: [l("L1–S1 定位分割", "L1–S1 segmentation"), l("Pfirrmann 分级", "Pfirrmann grading"), l("结构化报告", "Structured reports")],
    awards: [
      l("2026 中国国际大学生创新大赛（国创赛）青岛大学校赛金奖（《SurgiMind3D》核心成员）", "2026 China International College Students’ Innovation Competition · QDU campus Gold Prize (SurgiMind3D core member)"),
      l("国家软著《腰椎 MRI 影像分析系统 V1.0》· 登记号 2026R11L3615529", "Software copyright “Lumbar MRI Image Analysis System V1.0” · reg. no. 2026R11L3615529"),
    ],
    link: { href: "https://lumbar.4c666.top", label: l("在线展示 lumbar.4c666.top", "Live: lumbar.4c666.top") },
  },
  {
    key: "koupilot",
    icon: Bot,
    badge: l("Coze 智能体 · 二等奖", "Coze agent · 2nd prize"),
    title: l("KouPilot（智航学伴）· 大学生跨平台竞赛与生涯规划智能体", "KouPilot · cross-platform contest & career-planning agent for students"),
    period: "2026.01 – 2026.03",
    role: l("第一作者 / 项目负责人", "First author / project lead"),
    body: l(
      "针对大学生跨平台查找赛事通知分散、跨学院组队难、备赛缺少规划的问题，基于扣子（Coze）工作流编排四大模块，独立完成 UI 设计、实机演示视频与商业计划书（BP）。",
      "Addressing scattered contest notices, cross-school team formation and structured contest preparation for university students, I orchestrated four functional modules on Coze workflows and independently built the UI, live demo video and business plan (BP).",
    ),
    chips: [l("赛事智能检索", "Contest search"), l("简历诊断", "Résumé diagnosis"), l("互补组队撮合", "Complementary team matching"), l("备赛计划生成", "Prep-plan generation")],
    awards: [
      l("青岛银行·高校“扣子（Coze）”智能体创新大赛企业赛道二等奖（卓越典范奖）", "Qingdao Bank × universities “Coze” Agent Innovation Contest — Corporate Track 2nd Prize (Excellence Model Award)"),
      l("国家软件著作权《智能成长规划助手》（独立著作权人）", "National software copyright “Intelligent Growth Planning Assistant” (sole holder)"),
    ],
  },
  {
    key: "hezhongzhen",
    icon: Stethoscope,
    badge: l("多智能体 · 一等奖", "Multi-agent · 1st prize"),
    title: l("《合众诊》· 基于多智能体协同的医疗辅助会诊平台", "Hezhongzhen · multi-agent collaborative medical consultation platform"),
    period: "2025.03 – 2025.05",
    role: l("第一作者 / 队长兼主答辩", "First author / team lead & main presenter"),
    body: l(
      "设计主诊 Agent 引导补全病史，再由跨科室 Agent 交叉研判完成分诊的协同流程。",
      "Designed the collaboration flow where a primary-consult Agent guides history completion and cross-department Agents cross-examine to triage.",
    ),
    chips: [l("主诊 Agent", "Primary-consult agent"), l("跨科室交叉研判", "Cross-department review"), l("分诊流程", "Triage flow")],
    awards: [l("第 18 届中国大学生计算机设计大赛山东省一等奖（证书编号 4C2005 SD1905）", "18th China Collegiate Computing Contest · Shandong 1st Prize (cert. no. 4C2005 SD1905)")],
  },
];

export function Industrial({ no }: { no: number }) {
  const { t } = useI18n();
  const [hz, setHz] = useState<HzTab>("overview");
  const [tug, setTug] = useState<TugTab>("dark");
  const tugImg = tug === "dark" ? A.tug_dispatch_dark : A.tug_dispatch_light;
  const tugGroup = [A.tug_dispatch_dark, A.tug_dispatch_light];

  return (
    <SectionShell
      id="industrial"
      no={no}
      dark
      kicker="INDUSTRIAL AI & AGENT SOLUTIONS"
      title={
        <>
          {t("把规程、经验与调度，", "Turning procedures, experience and dispatching into ")}
          <span className="ink-mark-dark">{t("做成能被现场验收的系统", "systems the field will accept")}</span>
        </>
      }
      intro={t(
        "两个山东港口集团项目，一组垂直领域智能体方案：从驻场调研、规则建模到现场实测，数字都来自真实生产数据与一线反馈。",
        "Two Shandong Port Group projects and a set of vertical-domain agent solutions — from on-site research and rule modeling to field tests, every number comes from real production data and frontline feedback.",
      )}
    >
      {/* ---------------- Hazmat ---------------- */}
      <article>
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="outline-dark">
            <Anchor size={12} /> {t("山东港口集团", "Shandong Port Group")}
          </Chip>
          <Chip tone="dark">{t("需求调研、规则建模与交付负责人", "Requirements, rule modeling & delivery lead")}</Chip>
          <Chip tone="dark">2025.11 – {t("至今", "present")}</Chip>
        </div>
        <h3 className="mt-5 max-w-4xl font-serif-cn text-2xl font-black leading-snug sm:text-4xl">
          {t("危险品集装箱智能堆存与推荐系统", "Hazmat Container Smart Stacking & Recommendation System")}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-paper/60">
          {t(
            "系统界面原名：《危险品库堆场算法联调调试台》与《甲方 XDT 与乙方地图数据库表建模范围差异可视化》",
            "Interface names: “Hazmat Yard Algorithm Debug Console” and “Client XDT vs. Vendor Map-DB Modeling Scope Diff Visualization”",
          )}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            dark
            value="21+1 / 14"
            label={t("把数百页 IMDG 与老计划员经验抽象为规格", "Hundreds of IMDG pages + veteran know-how distilled into a spec")}
            sub={t("21+1 项一票否决安全红线 + 14 维防翻箱优选评分", "21+1 one-vote-veto safety rules + a 14-dimension anti-reshuffle score")}
          />
          <Metric
            dark
            value="50,000+"
            label={t("清洗治理“幽灵在场箱”异常数据", "“Ghost container” records cleaned")}
            sub={t("生产库中已离场未销账的 5 万余条；1 秒级策略热更新推演看板与近 600 项自动化回归验证", "50k+ departed-but-unreconciled records; 1-second hot-update simulation board and ~600 automated regression checks")}
          />
          <Metric
            dark
            value="90.0% ~ 95.75%"
            label={t("大区 Top-2 推荐命中率", "Zone Top-2 recommendation hit rate")}
            sub={t("400 箱真实生产快照回测集", "On a 400-container real production snapshot backtest set")}
          />
          <div className="relative overflow-hidden rounded-xl border border-bronze-2/60 bg-bronze-2/10 p-5 sm:p-6">
            <Award className="absolute right-4 top-4 text-bronze-2/60" size={20} />
            <div className="font-serif-cn text-2xl font-black leading-none tracking-tight text-bronze-2 sm:text-[1.7rem]">90.0% (18/20)</div>
            <div className="mt-3 text-sm font-medium leading-snug">{t("青岛港现场实测落位采纳与可行率", "Field-test acceptance & feasibility at Qingdao Port")}</div>
            <div className="mt-1.5 text-xs leading-relaxed text-paper/60">
              {t("2026 年 10 月 15 日赴青岛港驻场跟随计划员实测 20 箱，推荐落位现场采纳 18 箱", "On 15 Oct 2026, on-site at Qingdao Port with planners, 20 containers tested — 18 recommended placements accepted")}
            </div>
          </div>
        </div>

        {/* flow */}
        <ol className="mt-8 grid gap-3 md:grid-cols-4">
          {FLOW.map((f, n) => (
            <li key={f.n} className="night-card relative rounded-xl p-5">
              <span className="font-mono text-xs text-bronze-2">{f.n}</span>
              <p className="mt-1 font-serif-cn text-base font-black">{t(f.title)}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-paper/65">{t(f.body)}</p>
              {n < FLOW.length - 1 && <ArrowRight size={16} className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-bronze-2 md:block" />}
            </li>
          ))}
        </ol>

        {/* screens */}
        <div className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Tabs dark value={hz} onChange={setHz} items={(Object.keys(HZ) as HzTab[]).map((k) => ({ id: k, label: t(HZ[k].tab) }))} />
            <ExtLink dark href="https://hazmat-xdt.4c666.top">
              {t("线上诊断台 hazmat-xdt.4c666.top", "Live console hazmat-xdt.4c666.top")}
            </ExtLink>
          </div>
          <BrowserFrame dark url={HZ[hz].url}>
            <Pic key={hz} img={HZ[hz].img} group={HZ_ALL} dark rounded="rounded-none" lazy={false} />
          </BrowserFrame>
          <p className="mt-3 text-sm text-paper/60">{t(HZ[hz].img.cap)}</p>
        </div>
      </article>

      {/* ---------------- Tug ---------------- */}
      <article className="mt-24 grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="outline-dark">
              <Ship size={12} /> {t("山东港口集团 · 青岛港", "Shandong Port Group · Qingdao Port")}
            </Chip>
            <Chip tone="dark">2025.10 – 2026.06</Chip>
          </div>
          <h3 className="mt-5 font-serif-cn text-2xl font-black leading-snug sm:text-3xl">
            {t("智能拖轮调度与轮驳分配系统", "Intelligent Tug Dispatch & Assignment System")}
          </h3>
          <p className="mt-2 text-sm text-paper/60">
            {t("原型设计与可视交付主力 · 界面原名《拖轮调度工作席》", "Prototype & visual-delivery lead · UI name “Tug Dispatch Workstation”")}
          </p>
          <p className="mt-5 text-[15px] leading-[1.85] text-paper/80">
            {t(
              "面向港口与政企客户在需求对齐、方案汇报与竞标演示阶段的交互验证需求，构建高保真拖轮调度工作席与全港 AIS 多船动态轨迹态势大屏，直观呈现编组枚举、约束诊断与指令下发全流程。",
              "Built for port and enterprise stakeholders during requirement alignment, executive reviews and bid demonstrations: a hi-fi interactive tug-dispatch workstation and port-wide AIS multi-vessel trajectory board demonstrating crew enumeration, constraint diagnosis and command dispatch end to end.",
            )}
          </p>
          <ul className="mt-5 space-y-2.5 text-[14.5px] text-paper/80">
            <Bullet dark>{t("自动枚举 561 套编组方案", "561 crew-assignment plans enumerated automatically")}</Bullet>
            <Bullet dark>{t("输出距离优先 / 均衡疲劳优先 / 安全综合优先三套推荐", "Three recommendations: distance-first / balanced-fatigue-first / safety-first")}</Bullet>
            <Bullet dark>{t("北主航道吃水超标一票否决诊断", "North-channel draft-limit veto diagnosis")}</Bullet>
            <Bullet dark>{t("支撑人工编组留痕下发", "Manual crew assignment with an audit trail")}</Bullet>
            <Bullet dark>
              {t("含调度大屏 / 知识助手 / PAD 中控 / 拖轮 PAD，深浅双主题", "Dispatch board / knowledge assistant / PAD console / tug PAD — dark & light themes")}
            </Bullet>
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="mb-4 flex justify-end">
            <Tabs
              dark
              value={tug}
              onChange={setTug}
              items={[
                { id: "dark" as TugTab, label: t("深色主题", "Dark") },
                { id: "light" as TugTab, label: t("浅色主题", "Light") },
              ]}
            />
          </div>
          <BrowserFrame dark url="tug-dispatch-workstation">
            <Pic key={tug} img={tugImg} group={tugGroup} index={tug === "dark" ? 0 : 1} dark rounded="rounded-none" />
          </BrowserFrame>
          <p className="mt-3 text-sm text-paper/60">{t(tugImg.cap)}</p>
        </div>
      </article>

      {/* ---------------- Agents & domain solutions ---------------- */}
      <div className="mt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h3 className="flex items-center gap-3 font-serif-cn text-2xl font-black sm:text-3xl">
            <Waypoints className="text-bronze-2" size={26} />
            {t("智能体与垂直领域方案", "Agents & vertical-domain solutions")}
          </h3>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {SOLUTIONS.map((s) => (
            <article key={s.key} className="night-card flex flex-col overflow-hidden rounded-2xl">
              {s.img ? (
                <Pic img={s.img} dark rounded="rounded-none" />
              ) : (
                <div className="relative grid h-36 place-items-center overflow-hidden bg-gradient-to-br from-bronze/25 via-night-3 to-seal/25">
                  <s.icon size={56} className="text-bronze-2/70" strokeWidth={1.2} />
                  <span className="absolute left-5 top-4 font-mono text-[11px] uppercase tracking-widest text-paper/40">{s.period}</span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="outline-dark">{t(s.badge)}</Chip>
                  {s.period && !s.img && <span className="font-mono text-xs text-paper/50">{s.period}</span>}
                </div>
                <h4 className="mt-3 font-serif-cn text-lg font-black leading-snug">{t(s.title)}</h4>
                {s.sub && <p className="mt-1.5 text-xs leading-relaxed text-paper/50">{t(s.sub)}</p>}
                {s.role.zh && <p className="mt-2 text-xs font-medium text-bronze-2">{t(s.role)}</p>}
                <p className="mt-3 text-[14px] leading-[1.8] text-paper/75">{t(s.body)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.chips.map((c) => (
                    <Chip key={c.zh} tone="dark">
                      {t(c)}
                    </Chip>
                  ))}
                </div>
                {s.awards.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-paper/10 pt-4 text-[13px] text-paper/80">
                    {s.awards.map((a) => (
                      <li key={a.zh} className="flex gap-2.5">
                        <Award size={15} className="mt-0.5 flex-none text-bronze-2" />
                        <span>{t(a)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.link && (
                  <div className="mt-5">
                    <ExtLink dark href={s.link.href}>
                      {t(s.link.label)}
                    </ExtLink>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
