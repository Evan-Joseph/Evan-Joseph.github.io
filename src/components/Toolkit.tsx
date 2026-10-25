import { BrainCircuit, Clapperboard, Cloud, FlaskRound, Layers3, TerminalSquare } from "lucide-react";
import { l, useI18n, type L } from "../i18n";
import { Chip, ExtLink, GithubIcon, SectionShell } from "./ui";

const GROUPS: { icon: typeof Cloud; title: L; sub: L; items: L[] }[] = [
  {
    icon: TerminalSquare,
    title: l("AI 编程与 Agent 协同环境", "AI coding & agent environments"),
    sub: l("多模型并行原型开发与交叉验证", "Multi-model parallel prototyping & cross-verification"),
    items: [l("Claude Code", "Claude Code"), l("Codex", "Codex"), l("Cursor", "Cursor"), l("Antigravity", "Antigravity"), l("扣子（Coze）", "Coze")],
  },
  {
    icon: Clapperboard,
    title: l("多模态设计与成片工具链", "Multimodal design & video toolchain"),
    sub: l("从品牌视觉、分镜生图到 1080p60 宣传片", "From visual identity and storyboarding to 1080p60 brand films"),
    items: [l("多模态生图", "Multimodal image generation"), l("音视频工具链", "Audio / video toolchain"), l("1080p60 宣传片", "1080p60 promo films"), l("水墨宣纸视觉", "Ink-wash visual language")],
  },
  {
    icon: Cloud,
    title: l("全栈开发与云端部署", "Full-stack development & edge deployment"),
    sub: l("独立完成前后端研发、边缘部署与线上运维", "Full-stack build, edge deployment & live operations"),
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
    title: l("评测实验与确定性规则建模", "Evaluation & deterministic rule modeling"),
    sub: l("对照实验、解析器规则门控与生产快照回测", "Controlled experiments, parser-gated control & production backtests"),
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
      kicker="ENGINEERING & TOOLING"
      title={
        <>
          {t("工程栈与工具链：", "Engineering stack & tooling: ")}
          <span className="ink-mark-dark">{t("把高频工作流封装为可复用技能包", "packaging workflows into reusable skills")}</span>
        </>
      }
      intro={t(
        "日常主力使用的开发工具链、全栈架构与评测方法，以及已开源的 26 个跨平台 Agent 标准化技能包。",
        "Primary development toolchains, full-stack architecture and evaluation methods, alongside 26 open-source cross-platform agent skill packs.",
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
                "将高频研发与文档工作流封装为包含运行时契约、质量门禁与执行脚本的标准化技能包，支持在 Claude Code、Codex 与 Antigravity 中直接挂载调用。",
                "Packages recurring engineering and documentation workflows into standardized skill packs with runtime contracts, quality gates and execution scripts — ready to mount directly in Claude Code, Codex and Antigravity.",
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
