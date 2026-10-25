import { useState } from "react";
import { Activity, Play, QrCode, Radio } from "lucide-react";
import { l, useI18n, type L } from "../i18n";
import { A, asset, VIDEOS, type Img } from "../data/assets";
import { LINKS } from "../data/profile";
import { BrowserFrame, Bullet, Chip, ExtLink, GithubIcon, Pic, PhoneFrame, SectionShell, Tabs } from "./ui";

type Ver = "a" | "b";
const VERSIONS: Record<Ver, { tab: L; name: L; spec: string; src: string }> = {
  a: {
    tab: l("版本 A · Opus 5.5 导演版", "Cut A · Opus 5.5 Director’s Cut"),
    name: l("Opus 5.5 导演版", "Opus 5.5 Director’s Cut"),
    spec: "1920×1080 · 60fps · 45s",
    src: VIDEOS.opus55,
  },
  b: {
    tab: l("版本 B · Fable 5.1 Max 叙事版", "Cut B · Fable 5.1 Max Narrative Cut"),
    name: l("Fable 5.1 Max 叙事版", "Fable 5.1 Max Narrative Cut"),
    spec: "1920×1080 · 60fps · 50s",
    src: VIDEOS.fable51max,
  },
};

const STILLS: Img[] = [A.suanle_promo_cover, A.suanle_divination, A.suanle_letgo, A.suanle_letgo_throw];

const STAGES: { label: L; sub: L; phones: { img: Img; name: L }[] }[] = [
  {
    label: l("聊", "Talk"),
    sub: l("掌柜听你说", "The Keeper listens"),
    phones: [{ img: A.suanle_ui_chat, name: l("掌柜对话", "Keeper chat") }],
  },
  {
    label: l("算", "Calculate"),
    sub: l("先排盘，再解读", "Chart first, interpret second"),
    phones: [
      { img: A.suanle_ui_hexagram, name: l("六爻摇卦", "Hexagram") },
      { img: A.suanle_ui_bazi, name: l("四柱八字", "Four Pillars") },
      { img: A.suanle_ui_kline, name: l("流年 K 线", "Life K-line") },
    ],
  },
  {
    label: l("放", "Let go"),
    sub: l("写下，揉掉，丢掉", "Write, crumple, toss"),
    phones: [
      { img: A.suanle_ui_letgo_write, name: l("写下执念", "Write it down") },
      { img: A.suanle_ui_letgo_ball, name: l("揉成纸团", "Crumple it") },
      { img: A.suanle_ui_letgo, name: l("投入竹篓", "Into the basket") },
    ],
  },
];
const ALL_PHONES = STAGES.flatMap((s) => s.phones.map((p) => p.img));

const CARDS: Img[] = [A.suanle_card_aphorism, A.suanle_card_letgo, A.suanle_card_dialogue, A.suanle_card_annual];

const STORY: { n: string; title: L; body: L }[] = [
  {
    n: "01",
    title: l("问题定义与反内耗交互流程", "Problem definition & anti-rumination interaction flow"),
    body: l(
      "针对年轻人在高频日常选择中的决策犹豫与情绪内耗，提出“算一算，然后，算了”的产品主张；设计“茶馆掌柜对话梳理处境 → 写下执念揉成纸团投入竹篓（配颂钵声效）→ 生成水墨宣纸箴言分享卡”的完整交互流程。",
      "Addressing decision hesitation and emotional rumination in everyday choices, the product centres on “calculate it — then, let it go.” The interaction flow: clarify your situation in dialogue with the Teahouse Keeper → write down the fixation, crumple it into a paper ball and toss it into the bamboo basket (with singing-bowl acoustics) → generate an ink-wash aphorism share card.",
    ),
  },
  {
    n: "02",
    title: l("9 套原型比选与“确定性排盘 + 模型解读”", "9-prototype evaluation & deterministic charting + LLM reading"),
    body: l(
      "并行调度多款主流大模型构建 9 套不同交互风格的原型版本，比选定版生产环境。针对大模型直接推算干支历法易出错的问题，采用前置确定性天文历法排盘计算，结合对话内按需唤起的六爻、八字、紫微、塔罗等 6 类交互卡片与结构化画像记录，消除排盘幻觉。",
      "Built 9 prototypes across different interaction styles using multiple mainstream LLMs in parallel before selecting the production build. Because LLMs frequently miscalculate traditional Chinese calendars, a deterministic astronomical-calendar engine computes the chart up front, paired with 6 on-demand in-chat interactive cards (hexagram / Bazi / Zi Wei / Tarot …) and structured profile logging.",
    ),
  },
  {
    n: "03",
    title: l("独立全栈开发、实时看台与线上收款", "Solo full-stack build, live cockpit and online payment"),
    body: l(
      "独立完成需求定义、水墨宣纸视觉设计、换机同步码机制、主理人实时运营看台（/curator）、云端部署、两支 1080p60 宣传片制作及线上打赏支付。",
      "Independently delivered product definition, ink-wash visual design, cross-device sync codes, the live curator cockpit (/curator), cloud deployment, two 1080p60 brand films and online tipping payment.",
    ),
  },
];

export function Suanle({ no }: { no: number }) {
  const { t } = useI18n();
  const [ver, setVer] = useState<Ver>("a");
  const v = VERSIONS[ver];

  return (
    <SectionShell
      id="suanle"
      no={no}
      kicker="FLAGSHIP · SOLO PRODUCT"
      className="bg-paper-2/60"
      title={
        <span className="flex items-center gap-3.5 sm:gap-5">
          <img src={asset("suanle_logo.svg")} alt="Suanle logo" className="h-12 w-12 flex-none rounded-lg sm:h-[4.5rem] sm:w-[4.5rem]" />
          <span className="flex flex-col sm:block">
            <span>{t("《算了》", "Suanle")}</span>
            <span className="mt-0.5 text-[1.18rem] text-seal sm:ml-3 sm:mt-0 sm:text-[inherit]">{t("算一算，然后，算了", "Calculate, then let go")}</span>
          </span>
        </span>
      }
      intro={t(
        "沉浸式 AI 互动决策与反内耗 Web 产品。独立产品主理人 · 2026.09 – 2026.10，已线上运行，附主理人实时运营看台。",
        "An immersive AI decision companion and anti-rumination web product. Solo product owner · Sep – Oct 2026, live online with a real-time curator cockpit.",
      )}
    >
      {/* Theater + info */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Tabs
              value={ver}
              onChange={setVer}
              items={(Object.keys(VERSIONS) as Ver[]).map((k) => ({ id: k, label: t(VERSIONS[k].tab) }))}
            />
            <Chip tone="seal">
              <Play size={11} /> {v.spec}
            </Chip>
          </div>
          <div className="media-shadow overflow-hidden rounded-2xl bg-black ring-1 ring-black/20">
            <video
              key={ver}
              className="aspect-video w-full"
              controls
              playsInline
              preload="none"
              poster={asset(A.suanle_promo_cover.file)}
            >
              <source src={v.src} type="video/mp4" />
            </video>
          </div>
          <p className="mt-3 text-sm text-mute">
            {t(`1080p 60fps 品牌宣传片 · ${t(v.name)}（逐帧精修）`, `1080p 60fps brand film · ${v.name.en} (frame-by-frame polished)`)}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {STILLS.slice(1).map((s, n) => (
              <div key={s.file}>
                <Pic img={s} group={STILLS} index={n + 1} className="media-shadow" />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-mute">{t("点击剧照可放大查看 · 宣传片剧照", "Click a still to enlarge · promo-film stills")}</p>
        </div>

        <aside className="space-y-5 lg:col-span-4">
          <div className="paper-card rounded-2xl p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-seal">{t("线上体验", "TRY IT LIVE")}</p>
            <div className="mt-4 flex flex-col items-start gap-2.5">
              <ExtLink href={LINKS.suanle} variant="solid" className="w-full justify-between">
                suanle.cc <Radio size={14} className="ml-auto" />
              </ExtLink>
              <ExtLink href={LINKS.curator} className="w-full justify-between">
                {t("主理人运营看台 /curator", "Curator cockpit /curator")}
              </ExtLink>
              <ExtLink href={LINKS.suanleRepo} className="w-full justify-between">
                <span className="inline-flex items-center gap-2">
                  <GithubIcon size={14} />
                  {t("开源仓库与架构文档", "Repo & architecture docs")}
                </span>
              </ExtLink>
            </div>
            <div className="mt-5 flex items-center gap-4 rounded-xl bg-paper p-4">
              <img src={asset(A.suanle_qrcode.file)} alt={t(A.suanle_qrcode.cap)} className="h-24 w-24 rounded-md" loading="lazy" />
              <div>
                <p className="flex items-center gap-1.5 text-sm font-bold">
                  <QrCode size={15} className="text-seal" />
                  {t("手机扫码体验", "Scan to try")}
                </p>
                <p className="mt-1 font-mono text-[11px] text-mute">www.suanle.cc</p>
              </div>
            </div>
          </div>

          <div className="paper-card rounded-2xl p-6 text-sm leading-relaxed text-ink-2">
            <ul className="space-y-2.5">
              <Bullet>{t("角色：独立产品主理人", "Role: solo product owner")}</Bullet>
              <Bullet>{t("周期：2026.09 – 2026.10", "Timeline: Sep – Oct 2026")}</Bullet>
              <Bullet>{t("9 套并行原型 → 1 个生产版", "9 parallel prototypes → 1 production build")}</Bullet>
              <Bullet>{t("6 类对话内交互卡片", "6 kinds of in-chat interactive cards")}</Bullet>
            </ul>
          </div>
        </aside>
      </div>

      {/* Story */}
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {STORY.map((s) => (
          <article key={s.n} className="relative border-t-2 border-ink pt-5">
            <span className="font-mono text-sm font-bold text-seal">{s.n}</span>
            <h3 className="mt-2 font-serif-cn text-lg font-black leading-snug">{t(s.title)}</h3>
            <p className="mt-3 text-[14.5px] leading-[1.85] text-ink-2">{t(s.body)}</p>
          </article>
        ))}
      </div>

      {/* Phone journey */}
      <div className="mt-14 sm:mt-20">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2 sm:mb-8 sm:gap-4">
          <h3 className="font-serif-cn text-2xl font-black sm:text-3xl">{t("实机界面：聊 · 算 · 放", "Live UI: talk · calculate · let go")}</h3>
          <span className="font-mono text-[11px] text-mute sm:hidden">{t("← 左右滑动查看 7 屏 →", "← Swipe 7 screens →")}</span>
          <span className="hidden font-mono text-xs uppercase tracking-widest text-mute sm:block">860 × 1864 · 2x Retina</span>
        </div>
        <div className="snap-x-row no-scrollbar -mx-5 gap-0 px-5 pb-4 sm:-mx-8 sm:px-8">
          {STAGES.map((st, si) => (
            <div key={st.label.zh} className="mr-8 flex-none last:mr-0">
              <div className="mb-4 flex items-baseline gap-3 border-b border-ink/15 pb-2">
                <span className="seal h-8 w-8 text-base">{t(st.label.zh, String(si + 1))}</span>
                <span className="text-sm font-semibold">
                  {t("", `${st.label.en} — `)}
                  {t(st.sub)}
                </span>
                <span className="ml-auto font-mono text-[11px] text-mute">0{si + 1}</span>
              </div>
              <div className="flex gap-4">
                {st.phones.map((p) => (
                  <figure key={p.img.file} className="w-[170px] sm:w-[200px]">
                    <PhoneFrame>
                      <Pic img={p.img} group={ALL_PHONES} rounded="rounded-none" />
                    </PhoneFrame>
                    <figcaption className="mt-3 text-center text-[13px] font-medium text-ink-2">{t(p.name)}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share cards */}
      <div className="mt-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h3 className="font-serif-cn text-2xl font-black sm:text-3xl">{t("水墨宣纸分享卡", "Ink-wash share cards")}</h3>
          <span className="hidden text-sm text-mute sm:block">{t("四种版式 · 一键分享", "Four layouts · one-tap sharing")}</span>
        </div>
        <div className="columns-2 gap-4 lg:columns-4">
          {CARDS.map((c, n) => (
            <figure key={c.file} className="mb-4 break-inside-avoid">
              <Pic img={c} group={CARDS} index={n} className="media-shadow" rounded="rounded-md" />
              <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-wider text-mute">
                {t(["签文 A", "释怀 B", "对谈 C", "流年 D"][n], ["Aphorism A", "Let-go B", "Dialogue C", "Annual D"][n])}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Cockpit */}
      <div className="mt-20 grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <BrowserFrame url="www.suanle.cc/curator">
            <Pic img={A.suanle_curator_cockpit} lazy rounded="rounded-none" />
          </BrowserFrame>
        </div>
        <div className="lg:col-span-5">
          <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-seal">
            <Activity size={14} /> OPS COCKPIT
          </p>
          <h3 className="font-serif-cn text-2xl font-black leading-snug sm:text-3xl">{t("主理人实时运营看台", "A live cockpit for the curator")}</h3>
          <p className="mt-4 text-[15px] leading-[1.85] text-ink-2">
            {t(
              "线上产品兼具交互体验与全链路可观测性。/curator 看台将实时运行状态与对话质量汇总于同一块屏幕，支撑单人常态化运维线上产品。",
              "Combining interactive experience with end-to-end observability, /curator brings runtime health and dialogue quality onto a single screen so one person can operate the live product day to day.",
            )}
          </p>
          <ul className="mt-5 space-y-2.5 text-[14.5px] text-ink-2">
            <Bullet>{t("24h 吞吐波形", "24-hour throughput waveform")}</Bullet>
            <Bullet>{t("CPU / Mem 监控", "CPU / Mem monitoring")}</Bullet>
            <Bullet>{t("PostgreSQL 数据行数", "PostgreSQL row counts")}</Bullet>
            <Bullet>{t("对话质量分析", "Dialogue-quality analysis")}</Bullet>
          </ul>
          <div className="mt-6">
            <ExtLink href={LINKS.curator} variant="solid">
              {t("打开看台", "Open cockpit")}
            </ExtLink>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
