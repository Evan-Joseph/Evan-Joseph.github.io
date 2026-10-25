import { useState } from "react";
import { Award, Camera, Landmark, MessageSquareText, Pickaxe, QrCode, ScanSearch, Users } from "lucide-react";
import { l, useI18n, type L } from "../i18n";
import { A, asset, type Img } from "../data/assets";
import { BrowserFrame, Bullet, Chip, ExtLink, GithubIcon, Pic, SectionShell, Tabs } from "./ui";
import { cn } from "../utils/cn";

type Ver = "a" | "b";

const VERS: Record<
  Ver,
  {
    tab: L;
    name: L;
    style: L;
    url: string;
    host: string;
    shots: Img[];
    feats: { icon: typeof Pickaxe; title: L; body: L }[];
  }
> = {
  a: {
    tab: l("版本 A · 暗黑青铜 3D 考古", "Version A · Dark-bronze 3D archaeology"),
    name: l("暗黑青铜 · 3D 沉浸考古与拍照识图展厅", "Dark bronze · 3D immersive dig & photo-recognition exhibition"),
    style: l("《石室史诗》", "Stone Chamber Epic"),
    url: "https://stone.4c666.top",
    host: "stone.4c666.top",
    shots: [A.stone_hall, A.stone_3d_view, A.stone_vision, A.stone_ai_guide],
    feats: [
      { icon: Pickaxe, title: l("虚拟考古发掘引导", "Virtual archaeological dig"), body: l("从“挖出来”开始的沉浸式入口", "An immersive entry that begins with “digging it up”") },
      { icon: ScanSearch, title: l("拓片无级放大对比探照镜", "Rubbing comparison lens"), body: l("拓片与石刻无级放大，对照细节", "Continuous zoom to compare rubbing and relief details") },
      { icon: Landmark, title: l("武梁祠石刻三维立体检视台", "3D inspection table"), body: l("武梁祠汉画像石三维立体检视", "3D inspection of Wu Liang Shrine reliefs") },
      { icon: Camera, title: l("现场拍照识图台", "On-site photo recognition"), body: l("移动端拍照，秒级匹配 76 件馆藏数字档案", "Snap on mobile; match 76 digital records in seconds") },
      {
        icon: MessageSquareText,
        title: l("有据可查的流式 AI 导览", "Source-grounded streaming AI guide"),
        body: l("绑定馆藏权威释文与《鲁迅藏汉画珍赏》考据资料，游客可实时追问", "Grounded in curatorial texts and “Treasured Han Reliefs from Lu Xun’s Collection”; visitors can ask follow-ups live"),
      },
    ],
  },
  b: {
    tab: l("版本 B · 宣纸雅韵三馆展厅", "Version B · Rice-paper three-museum hall"),
    name: l("宣纸雅韵 · 76 件馆藏全量三馆数字展厅版", "Rice-paper elegance · full 76-piece, three-museum digital hall"),
    style: l("《石刻文化发现》", "Stone Carving Culture Discovery"),
    url: "https://qdu-stone.pages.dev",
    host: "qdu-stone.pages.dev",
    shots: [A.stone_exhibit_home, A.stone_exhibit_hall, A.stone_exhibit_detail],
    feats: [
      {
        icon: Landmark,
        title: l("三馆汇聚", "Three museums, one hall"),
        body: l("武氏墓群石刻博物馆、济宁市博物馆、巨野县博物馆", "Wu Family Tombs Stone-Carving Museum, Jining Museum and Juye County Museum"),
      },
      { icon: ScanSearch, title: l("分类检索与石刻展柜", "Categorized search & display cases"), body: l("76 件馆藏全量数字化目录", "A full digital catalogue of 76 collection pieces") },
      { icon: MessageSquareText, title: l("高清拓片与考据详情", "HD rubbings & scholarship"), body: l("官方介绍、书籍/PDF 考据详情页", "Official descriptions with book/PDF references") },
    ],
  },
};

const CATALOG = [
  { label: l("前石室", "Front Chamber"), n: 16 },
  { label: l("后石室", "Rear Chamber"), n: 15 },
  { label: l("武梁祠及阙铭", "Wu Liang Shrine & Que inscriptions"), n: 45 },
];

export function Stone({ no }: { no: number }) {
  const { t } = useI18n();
  const [ver, setVer] = useState<Ver>("a");
  const [shot, setShot] = useState(0);
  const v = VERS[ver];
  const dark = ver === "a";
  const cur = v.shots[Math.min(shot, v.shots.length - 1)];

  return (
    <SectionShell
      id="stone"
      no={no}
      dark={dark}
      className={cn(dark ? "bg-[#1a1209]" : "bg-paper-2/60", "transition-colors duration-500")}
      kicker="STONE CHAMBER EPIC · DIGITAL EXHIBITION"
      title={
        <>
          {t("让东汉画像石", "Making Han stone reliefs ")}
          <span className={dark ? "ink-mark-dark" : "ink-mark"}>{t("看得见，也看得懂", "seen — and understood")}</span>
        </>
      }
      intro={t(
        "《石室史诗——武氏墓群石刻数字展陈与多模态 AI 平台》（亦称《石刻文化发现》）。针对东汉画像石纹理剥落、典故晦涩导致游客“看得见却看不懂”的痛点，做了两个风格迥异、同步在线的数字展厅。第一作者 / 队长 · 2026.01 – 2026.06。",
        "“Stone Chamber Epic — Digital Exhibition & Multimodal AI Platform for the Wu Family Tombs Reliefs” (also “Stone Carving Culture Discovery”). Eastern Han reliefs are eroded and their allusions obscure, so visitors see but don’t understand — hence two contrasting digital halls, both live online. First author / team lead · Jan – Jun 2026.",
      )}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          dark={dark}
          value={ver}
          onChange={(k) => {
            setVer(k);
            setShot(0);
          }}
          items={(Object.keys(VERS) as Ver[]).map((k) => ({ id: k, label: t(VERS[k].tab) }))}
        />
        <ExtLink dark={dark} variant="solid" href={v.url}>
          {t("进入线上展厅", "Enter live hall")} · {v.host}
        </ExtLink>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <BrowserFrame dark={dark} url={v.host}>
            <Pic key={cur.file} img={cur} group={v.shots} index={Math.min(shot, v.shots.length - 1)} dark={dark} rounded="rounded-none" lazy={false} />
          </BrowserFrame>
          <p className={cn("mt-3 text-sm", dark ? "text-paper/65" : "text-mute")}>{t(cur.cap)}</p>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {v.shots.map((s, n) => (
              <button
                key={s.file}
                onClick={() => setShot(n)}
                aria-label={t(s.cap)}
                className={cn(
                  "relative overflow-hidden rounded-lg border-2 transition",
                  n === shot ? (dark ? "border-bronze-2" : "border-seal") : "border-transparent opacity-60 hover:opacity-100",
                )}
                style={{ aspectRatio: `${s.w}/${s.h}` }}
              >
                <img src={asset(s.file)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <aside className="space-y-5 lg:col-span-4">
          <div className={cn("rounded-2xl p-6", dark ? "night-card" : "paper-card")}>
            <Chip tone={dark ? "outline-dark" : "seal"}>{t(v.style)}</Chip>
            <h3 className="mt-3 font-serif-cn text-lg font-black leading-snug">{t(v.name)}</h3>
            <ul className="mt-5 space-y-4">
              {v.feats.map((f) => (
                <li key={f.title.zh} className="flex gap-3">
                  <span className={cn("grid h-9 w-9 flex-none place-items-center rounded-lg", dark ? "bg-bronze-2/15 text-bronze-2" : "bg-seal/10 text-seal")}>
                    <f.icon size={17} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-bold leading-snug">{t(f.title)}</span>
                    <span className={cn("block text-[13px] leading-relaxed", dark ? "text-paper/65" : "text-ink-2")}>{t(f.body)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {ver === "b" && (
            <div className="paper-card rounded-2xl p-6">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-seal">{t("76 件馆藏构成", "THE 76 PIECES")}</p>
              <div className="flex h-3 overflow-hidden rounded-full bg-ink/10">
                {CATALOG.map((c, n) => (
                  <span key={c.label.zh} style={{ width: `${(c.n / 76) * 100}%` }} className={["bg-seal", "bg-bronze", "bg-ink"][n]} />
                ))}
              </div>
              <ul className="mt-4 space-y-2 text-[13.5px]">
                {CATALOG.map((c, n) => (
                  <li key={c.label.zh} className="flex items-center gap-2.5">
                    <span className={cn("h-2.5 w-2.5 rounded-sm", ["bg-seal", "bg-bronze", "bg-ink"][n])} />
                    <span className="flex-1">{t(c.label)}</span>
                    <span className="font-mono font-bold">{c.n}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-4 rounded-xl bg-paper p-3">
                <img src={asset(A.stone_qrcode.file)} alt={t(A.stone_qrcode.cap)} className="h-20 w-20 rounded" loading="lazy" />
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-bold">
                    <QrCode size={14} className="text-seal" />
                    {t("扫码逛展厅", "Scan to visit")}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-mute">qdu-stone.pages.dev</p>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Awards */}
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <div className={cn("rounded-2xl p-6", dark ? "night-card" : "paper-card")}>
          <Award className={dark ? "text-bronze-2" : "text-seal"} size={22} />
          <p className="mt-3 font-serif-cn text-base font-black leading-snug">
            {t("第 19 届中国大学生计算机设计大赛（人工智能应用赛道）山东省二等奖", "19th China Collegiate Computing Contest (AI Application track) · Shandong 2nd Prize")}
          </p>
          <p className={cn("mt-2 text-xs", dark ? "text-paper/55" : "text-mute")}>{t("作品编号 2026034567 · 第一作者 / 队长", "Entry no. 2026034567 · first author / team lead")}</p>
        </div>
        <div className={cn("rounded-2xl p-6", dark ? "night-card" : "paper-card")}>
          <Landmark className={dark ? "text-bronze-2" : "text-seal"} size={22} />
          <p className="mt-3 font-serif-cn text-base font-black leading-snug">
            {t("山东嘉祥武氏墓群石刻博物馆馆长朱卫华副研究员实名签字推荐", "Personally endorsed in writing by Associate Research Fellow Zhu Weihua, Director of the Wu Family Tombs Stone-Carving Museum, Jiaxiang")}
          </p>
          <p className={cn("mt-2 text-xs", dark ? "text-paper/55" : "text-mute")}>{t("来自馆方的权威背书", "Authoritative backing from the museum")}</p>
        </div>
        <div className={cn("rounded-2xl p-6", dark ? "night-card" : "paper-card")}>
          <Users className={dark ? "text-bronze-2" : "text-seal"} size={22} />
          <p className="mt-3 font-serif-cn text-base font-black leading-snug">
            {t("带领“石语新传实践团”获评青岛大学 2026 年寒假社会实践“先进个人”及校级“优秀实践团队”", "Led the “Shiyu Xinchuan” practice team to QDU 2026 Winter Social Practice “Advanced Individual” and “Outstanding Team”")}
          </p>
          <p className={cn("mt-2 text-xs", dark ? "text-paper/55" : "text-mute")}>{t("《青大团字〔2026〕5号》", "Qingda Tuan Zi [2026] No. 5")}</p>
        </div>
      </div>
      <ul className={cn("mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm", dark ? "text-paper/70" : "text-ink-2")}>
        <Bullet dark={dark}>{t("流式 AI 导览 + 拍照识图 + 76 件馆藏", "Streaming AI guide + photo recognition + 76 pieces")}</Bullet>
        <li>
          <ExtLink dark={dark} variant="text" href="https://github.com/Evan-Joseph/stone-carving-discovery-app">
            <GithubIcon size={14} />
            stone-carving-discovery-app
          </ExtLink>
        </li>
      </ul>
    </SectionShell>
  );
}
