import { BrainCircuit, Clapperboard, Cloud, FlaskRound, Layers3, TerminalSquare } from "lucide-react";
import { l, useI18n, type L } from "../i18n";
import { Chip, ExtLink, GithubIcon, SectionShell } from "./ui";

const GROUPS: { icon: typeof Cloud; title: L; sub: L; items: L[] }[] = [
  {
    icon: TerminalSquare,
    title: l("AI 编码与 Agent 搭档", "AI coding & agent partners"),
    sub: l("多模型并行，先竞技再收敛", "Multiple models in parallel — contest first, converge later"),
    items: [l("Claude Code", "Claude Code"), l("Codex", "Codex"), l("Cursor", "Cursor"), l("Antigravity", "Antigravity"), l("扣子（Coze）", "Coze")],
  },
  {
    icon: Clapperboard,
    title: l("多模态创作", "Multimodal creation"),
    sub: l("从视觉、声音到成片", "From visuals and sound to the finished film"),
    items: [l("多模态生图", "Multimodal image generation"), l("音视频工具链", "Audio / video toolchain"), l("1080p60 宣传片", "1080p60 promo films"), l("水墨宣纸视觉", "Ink-wash visual language")],
  },
  {
    icon: Cloud,
    title: l("全栈与部署", "Full-stack & deployment"),
    sub: l("一个人能把东西真正上线", "Enough to take a product live alone"),
    items: [
      l("React 18 / 19", "React 18 / 19"),
      l("Hono", "Hono"),
      l("Spring Boot 3.5", "Spring Boot 3.5"),
      l("PostgreSQL", "PostgreSQL"),
      l("Cloudflare Pages / D1 / R2 / KV", "Cloudflare Pages / D1 / R2 / KV"),
      l("SSE 实时推送", "SSE live push"),
    ],
  },
  {
    icon: FlaskRound,
    title: l("评测与规则方法", "Evaluation & rule methods"),
    sub: l("把“感觉靠谱”变成“数字靠谱”", "Turning “feels right” into “measures right”"),
    items: [
      l("严格匹配对照实验", "Matched-control studies"),
      l("解析器规则门控", "Parser-gated control"),
      l("生产快照回测", "Production-snapshot backtests"),
      l("自动化回归验证", "Automated regression suites"),
      l("FSRS-6 间隔重复", "FSRS-6 spaced repetition"),
    ],
  },
];

const SKILLS: L[] = [
  l("PRD 与公文排版", "PRD & official-document typesetting"),
  l("高保真 UI 构建", "Hi-fi UI building"),
  l("学术文献核验", "Academic-reference verification"),
  l("音视频剪辑", "Audio / video editing"),
  l("浏览器自动化", "Browser automation"),
];

export function Toolkit({ no }: { no: number }) {
  const { t } = useI18n();
  return (
    <SectionShell
      id="toolkit"
      no={no}
      dark
      kicker="TOOLKIT"
      title={
        <>
          {t("个人武器库：", "The toolkit: ")}
          <span className="ink-mark-dark">{t("把经验沉淀成可复用的技能", "turning experience into reusable skills")}</span>
        </>
      }
      intro={t(
        "工具会换，方法会留下。常用的工具链、工程栈与评测方法，以及一套已开源的跨平台 Agent 技能库。",
        "Tools change; methods stay. The toolchains, engineering stack and evaluation methods I reach for — plus an open-sourced cross-platform agent skill library.",
      )}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {GROUPS.map((g) => (
          <article key={g.title.zh} className="night-card rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-bronze-2/50">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-bronze-2/15 text-bronze-2">
                <g.icon size={20} />
              </span>
              <div>
                <h3 className="font-serif-cn text-lg font-black leading-tight">{t(g.title)}</h3>
                <p className="text-[12.5px] text-paper/55">{t(g.sub)}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {g.items.map((x) => (
                <Chip key={x.zh} tone="dark" className="px-3 py-1 text-[13px]">
                  {t(x)}
                </Chip>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-3xl border border-bronze-2/40 bg-gradient-to-br from-bronze-2/12 via-transparent to-seal/10 p-6 sm:p-10">
        <div className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-serif-cn text-[6rem] font-black leading-none text-bronze-2 sm:text-[8rem]">26</p>
            <p className="-mt-1 font-mono text-xs uppercase tracking-[0.2em] text-paper/60">{t("标准化技能包", "standardized skill packs")}</p>
          </div>
          <div className="md:col-span-8">
            <p className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bronze-2">
              <Layers3 size={14} /> agent-workflow-skills
            </p>
            <h3 className="font-serif-cn text-2xl font-black leading-snug sm:text-3xl">
              {t("跨 Claude Code / Codex / Antigravity 的 Agent 技能库", "An agent skill library across Claude Code, Codex and Antigravity")}
            </h3>
            <p className="mt-3 text-[14.5px] leading-[1.85] text-paper/75">
              {t(
                "把反复出现的工作流沉淀为标准化技能包：任何一个 Agent 平台都能直接调用，不必每次重新“教”一遍。",
                "Recurring workflows are distilled into standardized skill packs that any agent platform can call directly — no re-teaching every time.",
              )}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <Chip key={s.zh} tone="outline-dark">
                  <BrainCircuit size={12} />
                  {t(s)}
                </Chip>
              ))}
            </div>
            <div className="mt-6">
              <ExtLink dark variant="solid" href="https://github.com/Evan-Joseph/agent-workflow-skills">
                <GithubIcon size={14} />
                agent-workflow-skills
              </ExtLink>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
