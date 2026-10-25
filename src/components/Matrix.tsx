import { useState } from "react";
import { Boxes } from "lucide-react";
import { l, useI18n, type L } from "../i18n";
import { A, type Img } from "../data/assets";
import { Chip, ExtLink, GithubIcon, Pic, SectionShell, Tabs } from "./ui";
import { cn } from "../utils/cn";

type Cat = "all" | "learn" | "campus" | "agent" | "app";

type Shot = { img: Img; label: L; href?: string };
type Prod = {
  id: string;
  cat: Exclude<Cat, "all">;
  name: L;
  alias?: L;
  desc: L;
  stats?: { v: string; k: L }[];
  tags: string[];
  shots: Shot[];
  links: { href: string; label: L; repo?: boolean }[];
  big?: string;
};

const PRODUCTS: Prod[] = [
  {
    id: "open-timer",
    cat: "learn",
    name: l("沉浸时钟 · Open-Timer", "Immersive Clock · Open-Timer"),
    alias: l("亦称：22408 沉浸心流时钟", "a.k.a. 22408 Flow-State Clock"),
    desc: l(
      "自托管的备考心流计时与全天流体时间轴工作台。内建 2027 考研倒计时、9 段日常作息节律条、7 科（数学 / 英语 / 数据结构 / 计组 / 操作系统 / 计网 / 政治）药丸切换、Flowtime 弹性休息结算（专注时长 ÷ 5）、全天无重叠流体“时间轴”（15m–1h 缩放），以及 14 天趋势柱状图与打卡日历热力图“回顾”。",
      "A self-hosted flow timer and all-day fluid timeline workbench for exam prep. It has a 2027 grad-exam countdown, a 9-segment daily rhythm bar, 7 subject pills (math / English / data structures / computer organization / OS / networks / politics), Flowtime flexible-break settlement (focus time ÷ 5), a non-overlapping all-day fluid “Timeline” (15m–1h zoom), and a “Review” with 14-day trend bars and a check-in calendar heatmap.",
    ),
    tags: ["React 18", "Hono", "Cloudflare D1", "R2"],
    shots: [
      { img: A.open_timer, label: l("主界面", "Main view") },
      { img: A.open_timer_review, label: l("时间轴与回顾", "Timeline & review") },
    ],
    links: [
      { href: "https://clock.4c666.top", label: l("在线体验", "Live") },
      { href: "https://github.com/Evan-Joseph/open-timer", label: l("开源仓库", "Repo"), repo: true },
    ],
  },
  {
    id: "yanji",
    cat: "learn",
    name: l("22408 · 研记", "22408 · Yanji"),
    alias: l("页面标题：22408 · 识记与真题研习", "Page title: “22408 · Recall & Past-Paper Study”"),
    desc: l(
      "覆盖政治、英二、数二与 408 计算机统考四科的识记与真题工作台。首创 v8 连续信息流五分钟物理冷却机制、FSRS-6 动态间隔重复调度，以及 6 套 408 硬件/算法交互可视化沙盒（IEEE 754、5 级流水线、Cache 映射、虚拟页表、KMP 自动机、页置换）。另有独立科目姊妹站。",
      "A recall and past-paper workbench covering Politics, English II, Math II and the CS-408 unified exam. It pioneers a v8 continuous-feed five-minute physical cooldown, FSRS-6 dynamic spaced-repetition scheduling and 6 interactive 408 hardware/algorithm sandboxes (IEEE 754, 5-stage pipeline, cache mapping, virtual page table, KMP automaton, page replacement). Standalone sister sites cover single subjects.",
    ),
    stats: [
      { v: "1,513", k: l("学习项", "study items") },
      { v: "1,613", k: l("历年真题", "past questions") },
      { v: "148 / 962", k: l("408 考点 / 闪卡", "408 topics / cards") },
    ],
    tags: ["FSRS-6", "v8 cooldown", "408 sandboxes"],
    shots: [
      { img: A.kaoyan_22408, label: l("全科主站", "Main site") },
      { img: A.kaoyan_politics, label: l("政治识记", "Politics recall"), href: "https://kaoyan-politics.pages.dev" },
      { img: A.math2_flashcards, label: l("考研数学识记", "Math recall"), href: "https://math2-flashcards.pages.dev" },
    ],
    links: [
      { href: "https://kaoyan-22408-flashcards.pages.dev", label: l("全科主站", "Main site") },
      { href: "https://kaoyan-politics.pages.dev", label: l("政治识记", "Politics") },
      { href: "https://math2-flashcards.pages.dev", label: l("数学识记", "Math") },
      { href: "https://github.com/Evan-Joseph/kaoyan-22408-flashcards", label: l("主站仓库", "Main repo"), repo: true },
      { href: "https://github.com/Evan-Joseph/math2-flashcards", label: l("数学仓库", "Math repo"), repo: true },
    ],
  },
  {
    id: "haile",
    cat: "campus",
    name: l("泓园 7 号楼洗衣房 · 海乐生活抢占助手 v3", "Hongyuan Bldg 7 Laundry · Haile Life Grabber v3"),
    alias: l("控制台原名：泓园7号楼 · 海乐生活洗衣机抢占控制台", "Console name: “Hongyuan Bldg 7 · Haile Life Washer-Grabbing Console”"),
    desc: l(
      "面向青岛大学浮山校区泓园 7 号楼千名学生高峰期共用 5 台洗衣机与 1 台烘干机的排队场景，梳理设备状态流转并实现短信验证码登录、三档自适应脉冲轮询（>60s 巡航、10–60s 临近、≤10s 高频脉冲 0.2–0.3s 锁单）、防重复下单守卫、SSE 实时推送与一键拉起海乐 App 支付，已在宿舍楼稳定运行超半年。",
      "Built for a 1,000-student dormitory at Qingdao University’s Fushan campus sharing 5 washers and 1 dryer during peak hours. Models device state transitions and implements SMS-code login, three-tier adaptive pulse polling (>60s cruise, 10–60s approach, ≤10s high-frequency 0.2–0.3s lock-in), duplicate-order guards, SSE live push and one-tap Haile app payment launch — running stably in the dorm for over six months.",
    ),
    stats: [
      { v: "5 + 1", k: l("洗衣机 + 烘干机", "washers + dryer") },
      { v: "0.2–0.3s", k: l("高频脉冲锁单", "pulse lock-in") },
      { v: "6+", k: l("月稳定服务", "months in service") },
    ],
    tags: ["SSE", "Adaptive polling"],
    shots: [
      { img: A.haile_bot_matrix, label: l("桌面宽屏", "Desktop") },
      { img: A.haile_bot_mobile, label: l("移动端", "Mobile") },
    ],
    links: [
      { href: "https://haile-bot.4c666.top", label: l("在线体验", "Live") },
      { href: "https://github.com/Evan-Joseph/haile-bot", label: l("开源仓库", "Repo"), repo: true },
    ],
  },
  {
    id: "mission",
    cat: "agent",
    name: l("竞赛矩阵 · 竞赛规划看板 V3", "Competition Matrix · Contest Planning Board V3"),
    desc: l(
      "基于 Cloudflare Pages + D1 + 大模型联网搜索构建的大学生竞赛指挥舱，纳管 62 项赛事的日历排期、战术白板与 AI Action Card 补丁确认。",
      "A contest command cockpit for students, built on Cloudflare Pages + D1 + LLM web search. It manages 62 contests with calendar scheduling, a tactics whiteboard and AI Action Card patch confirmation.",
    ),
    stats: [{ v: "62", k: l("项赛事纳管", "contests managed") }],
    tags: ["Cloudflare Pages", "D1", "LLM web search"],
    shots: [{ img: A.mission_control, label: l("指挥舱", "Cockpit") }],
    links: [{ href: "https://github.com/Evan-Joseph/competition-mission-control", label: l("开源仓库", "Repo"), repo: true }],
  },
  {
    id: "skills",
    cat: "agent",
    big: "26",
    name: l("跨端 Agent 技能库 · agent-workflow-skills", "Cross-platform Agent Skill Library · agent-workflow-skills"),
    desc: l(
      "将 PRD 与公文排版、高保真 UI 构建、学术文献核验、音视频剪辑与浏览器自动化封装为 26 个跨平台（Claude Code / Codex / Antigravity）标准化技能包。",
      "Packages PRD and official-document typesetting, hi-fi UI building, academic-reference verification, audio/video editing and browser automation into 26 standardized skill packs across Claude Code, Codex and Antigravity.",
    ),
    stats: [{ v: "26", k: l("标准化技能包", "skill packs") }],
    tags: ["Claude Code", "Codex", "Antigravity"],
    shots: [],
    links: [{ href: "https://github.com/Evan-Joseph/agent-workflow-skills", label: l("开源仓库", "Repo"), repo: true }],
  },
  {
    id: "gpvton",
    cat: "app",
    name: l("GP-VTON++ 虚拟试衣双视口工作台与方案评审", "GP-VTON++ Virtual Try-On Dual-Viewport Workbench & Design Review"),
    desc: l(
      "包含人物与服装上传、GPU 队列推理及并排对比的时尚模特虚拟试衣工作台，并支持五套前端方向桌面 + 手机同屏双视口同步交互与 Cloudflare KV 实时投票。",
      "A fashion-model virtual try-on workbench with person and garment upload, GPU-queue inference and side-by-side comparison. Five front-end directions run in synchronized desktop + phone dual viewports with real-time Cloudflare KV voting.",
    ),
    tags: ["GPU queue", "Cloudflare KV"],
    shots: [{ img: A.gpvton_review, label: l("双视口评审", "Dual-viewport review") }],
    links: [
      { href: "https://gpvton-review.pages.dev", label: l("在线体验", "Live") },
      { href: "https://github.com/Evan-Joseph/gp-vton-virtual-try-on", label: l("开源仓库", "Repo"), repo: true },
    ],
  },
  {
    id: "ppt",
    cat: "agent",
    name: l("PPT 提示词增强", "PPT Prompt Enhancer"),
    desc: l(
      "将一句话需求转化为含场景、结构、配色与字体的专业结构化 PPT 提示词，支持全自动 / 半自动 / 数据图表三模式与多模型切换。",
      "Turns a one-line request into a professional, structured PPT prompt covering scenario, structure, palette and typography, with auto / semi-auto / data-chart modes and multi-model switching.",
    ),
    tags: ["Prompt engineering", "Multi-model"],
    shots: [{ img: A.ppt_enhancer, label: l("三模式", "Three modes") }],
    links: [{ href: "https://ppt-prompt-enhancer.pages.dev", label: l("在线体验", "Live") }],
  },
  {
    id: "junzi",
    cat: "app",
    name: l("君子之交 · 教师端工作台与查重证据台", "Junzi · Teacher Workbench & Plagiarism Evidence Desk"),
    desc: l(
      "React 19 + Spring Boot 3.5 三端协同的课程作业管理平台，支持 AI 作业海报生成、92% 雷同检测的力导向查重证据台与受控 AI 助教。",
      "A three-sided course-assignment platform on React 19 + Spring Boot 3.5, with AI assignment-poster generation, a force-directed plagiarism evidence desk (92% similarity detection) and a controlled AI teaching assistant.",
    ),
    tags: ["React 19", "Spring Boot 3.5"],
    shots: [{ img: A.junzi_deck, label: l("教师端", "Teacher desk") }],
    links: [{ href: "https://junzi.4c666.top", label: l("在线体验", "Live") }],
  },
];

function Card({ p }: { p: Prod }) {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const shot = p.shots[i];
  const group = p.shots.map((s) => s.img);
  const portrait = shot ? shot.img.h > shot.img.w : false;

  return (
    <article className="paper-card flex flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
      {shot ? (
        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/[0.06]">
            {portrait ? (
              <div className="absolute inset-0 flex items-center justify-center py-3">
                <div className="h-full">
                  <Pic key={shot.img.file} img={shot.img} group={group} index={i} className="h-full w-auto media-shadow" rounded="rounded-2xl" />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0">
                <Pic key={shot.img.file} img={shot.img} group={group} index={i} className="!h-full" rounded="rounded-none" />
              </div>
            )}
          </div>
          {p.shots.length > 1 && (
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-gradient-to-t from-black/55 to-transparent p-3 pt-8">
              {p.shots.map((s, n) => (
                <button
                  key={s.img.file}
                  onClick={() => setI(n)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold backdrop-blur transition",
                    n === i ? "bg-paper text-ink" : "bg-black/45 text-paper hover:bg-black/70",
                  )}
                >
                  {t(s.label)}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="relative grid aspect-[16/10] w-full place-items-center overflow-hidden bg-gradient-to-br from-ink via-night-3 to-seal/80">
          <span className="font-serif-cn text-[7rem] font-black leading-none text-bronze-2/90">{p.big}</span>
          <span className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-widest text-paper/50">agent-workflow-skills</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-serif-cn text-lg font-black leading-snug">{t(p.name)}</h4>
        {p.alias && <p className="mt-1 text-xs text-mute">{t(p.alias)}</p>}
        <p className="mt-3 text-[14px] leading-[1.8] text-ink-2">{t(p.desc)}</p>

        {p.stats && (
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {p.stats.map((s) => (
              <div key={s.v}>
                <dt className="font-serif-cn text-xl font-black text-seal">{s.v}</dt>
                <dd className="text-[11.5px] text-mute">{t(s.k)}</dd>
              </div>
            ))}
          </dl>
        )}

        {shot && p.shots.length > 1 && <p className="mt-4 border-l-2 border-seal/40 pl-3 text-[12.5px] leading-relaxed text-mute">{t(shot.img.cap)}</p>}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((x) => (
            <Chip key={x}>{x}</Chip>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {p.links.map((k, n) => (
            <ExtLink key={k.href} href={k.href} variant={n === 0 && !k.repo ? "solid" : "ghost"} className="!px-3.5 !py-1.5 !text-[13px]">
              {k.repo && <GithubIcon size={13} />}
              {t(k.label)}
            </ExtLink>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Matrix({ no }: { no: number }) {
  const { t } = useI18n();
  const [cat, setCat] = useState<Cat>("all");
  const list = PRODUCTS.filter((p) => cat === "all" || p.cat === cat);

  return (
    <SectionShell
      id="matrix"
      no={no}
      className="bg-paper-2/60"
      kicker="INDEPENDENT PRODUCT MATRIX"
      title={
        <>
          {t("面向高频场景，", "Built for daily friction, ")}
          <span className="ink-mark">{t("独立开发并上线运行的 8 款产品与工具", "8 live products and developer tools")}</span>
        </>
      }
      intro={t(
        "覆盖备考效率、校园高频刚需、Agent 工程工具链与垂直 AI 应用，全部已上线部署并附开源仓库。",
        "Spanning exam preparation, campus utility, agent engineering toolchains and vertical AI apps — all deployed live with open-source repositories.",
      )}
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          value={cat}
          onChange={setCat}
          items={[
            { id: "all" as Cat, label: t("全部", "All") },
            { id: "learn" as Cat, label: t("备考与效率", "Study & focus") },
            { id: "campus" as Cat, label: t("校园生活", "Campus life") },
            { id: "agent" as Cat, label: t("Agent 工具链", "Agent tooling") },
            { id: "app" as Cat, label: t("AI 应用平台", "AI apps") },
          ]}
        />
        <span className="flex items-center gap-2 text-sm text-mute">
          <Boxes size={15} />
          {list.length} / {PRODUCTS.length}
        </span>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {list.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>
    </SectionShell>
  );
}
