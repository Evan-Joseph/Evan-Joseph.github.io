import { BadgeCheck, BookMarked, FlaskConical, GraduationCap, Timer, Zap } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { l, noOrphan, useI18n, type L } from "../i18n";
import { A } from "../data/assets";
import { LINKS } from "../data/profile";
import { Bullet, Chip, ExtLink, GithubIcon, Metric, Pic, SectionShell } from "./ui";
import { cn } from "../utils/cn";

type Pub = {
  venue: string;
  tier: L;
  status: L;
  role: L;
  title: string;
  authors?: ReactNode;
  body: L;
  take: L;
  links: { href: string; label: string }[];
  hot?: boolean;
};

const Me = ({ children }: { children: ReactNode }) => <b className="rounded bg-bronze-2/20 px-1 font-bold text-bronze-2">{children}</b>;

const PUBS: Pub[] = [
  {
    venue: "AAAI 2026 · Oral",
    tier: l("CCF-A 类顶会", "CCF-A conference"),
    status: l("已正式发表", "Published"),
    role: l("共同第一作者 (#2)", "Co-first author (#2)"),
    title: "SpatialLogic-Bench: A Diagnostic Benchmark for Task-Oriented Spatiotemporal Reasoning",
    authors: (
      <>
        Xiaoda Yang*, <Me>Shenzhou Gao*</Me>, Can Wang*, Peijian Zhang, et al.
      </>
    ),
    body: l(
      "主导构建面向复杂动态场景的多模态大模型时空推理诊断基准，引入前/反向双任务时序范式与多粒度滑窗评测；系统测评 GPT-4o、Gemini、Qwen-VL 等 20+ 款主流开源与闭源大模型，定位多步空间方位转换与因果推断的失真盲区；独立搭建高并发自动化评测流水线，独立完成全套科研信息架构图设计与 LaTeX 出版排版。",
      "Led the construction of a diagnostic benchmark for multimodal LLMs’ spatiotemporal reasoning in complex dynamic scenes, featuring forward/backward dual-task temporal paradigms and multi-granularity sliding-window evaluation. Systematically evaluated 20+ open and closed models including GPT-4o, Gemini and Qwen-VL to locate failure modes in multi-step spatial-orientation changes and causal inference. Independently built the high-concurrency automated evaluation pipeline and designed the full set of research architecture figures and camera-ready LaTeX layout.",
    ),
    take: l("定位多模态大模型在多步空间方位转换与因果推断上的能力边界与失真模式。", "Pinpoints capability boundaries and failure modes in multi-step spatial transformation and causal inference."),
    links: [
      { href: "https://doi.org/10.1609/aaai.v40i23.39022", label: "DOI" },
      { href: "https://ojs.aaai.org/index.php/AAAI/article/view/39022", label: "AAAI Proceedings" },
    ],
    hot: true,
  },
  {
    venue: "ICML 2026",
    tier: l("CCF-A 类顶会", "CCF-A conference"),
    status: l("正式录用", "Accepted"),
    role: l("第三作者（除共一外首位）", "Third author (first after co-first)"),
    title: "From Perception to Planning: Evolving Ego-Centric Task-Oriented Spatiotemporal Reasoning via Curriculum Learning",
    authors: (
      <>
        Xiaoda Yang*, Yuxiang Liu*, <Me>Shenzhou Gao</Me>, Can Wang, Peijian Zhang, et al.
      </>
    ),
    body: l(
      "构建三阶段渐进式课程学习框架，验证将长链路任务拆解为“基础感知 → 局部关联 → 全局规划”对提升多模态模型规划可靠性的显著增益。",
      "Built a three-stage progressive curriculum-learning framework, validating that decomposing long-horizon tasks into “basic perception → local association → global planning” markedly improves planning reliability.",
    ),
    take: l("直接指导复杂 Agent 工作流的分阶段状态拆解设计。", "Directly informs staged state decomposition in complex agent workflows."),
    links: [{ href: "https://arxiv.org/abs/2604.10517", label: "arXiv" }],
  },
  {
    venue: "EMNLP 2026 · Findings",
    tier: l("自然语言处理国际顶会", "Top NLP conference"),
    status: l("正式录用", "Accepted"),
    role: l("第六作者", "Sixth author"),
    title: "Diagnosing Order Dependence in Vision-Language Task-Progress Judgment with Equal-State Supervision",
    body: l(
      "诊断并缓解多模态大模型在评估任务进度时依赖输入帧顺序、忽略真实视觉状态的顺序偏置（Order Dependence）问题。",
      "Diagnosed and mitigated order dependence in vision-language task-progress judgment, where models rely on input frame order rather than actual visual state.",
    ),
    take: l("为多模态 Agent 状态校验门禁提供实证依据。", "Empirical grounding for state-verification gates in multimodal agents."),
    links: [{ href: "https://openreview.net/forum?id=7iS3Cxm7af", label: "OpenReview" }],
  },
];

export function Research({ no }: { no: number }) {
  const { t } = useI18n();

  return (
    <SectionShell
      id="research"
      no={no}
      dark
      kicker="RESEARCH & MODEL EVALUATION"
      title={
        <>
          {t("系统评测模型边界，", "Benchmarking model limits, ")}
          <span className="ink-mark-dark">{t("以实证指导架构设计", "guiding architecture with empirical data")}</span>
        </>
      }
      intro={t(
        "共同第一作者发表 AAAI 2026 Oral，另有 ICML 2026、EMNLP 2026 Findings 录用，并独立完成过程接口与符号契约诊断研究 LEAP（Neurocomputing 在审），以系统性评测实证支撑产品架构与边界判断。",
        "Co-first author of an AAAI 2026 Oral, with ICML 2026 and EMNLP 2026 Findings acceptances and the solo-led LEAP study on procedural interfaces and symbolic parser contracts (under review at Neurocomputing) — grounding product architecture and boundary decisions in systematic empirical evaluation.",
      )}
    >
      {/* profile links */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <ExtLink dark href={LINKS.openreview}>
          OpenReview
        </ExtLink>
        <ExtLink dark href={LINKS.orcid}>
          ORCID {LINKS.orcidId}
        </ExtLink>
        <ExtLink dark href={LINKS.github}>
          <GithubIcon size={14} />
          GitHub · Evan-Joseph
        </ExtLink>
        <span className="text-xs text-paper/50">* {t("共同第一作者 / 同等贡献", "equal contribution")}</span>
      </div>

      {/* publications */}
      <div className="space-y-5">
        {PUBS.map((p) => (
          <article key={p.venue} className="night-card grid gap-6 rounded-2xl p-6 md:grid-cols-12 md:p-8">
            <div className="md:col-span-3">
              <p className={cn("font-serif-cn text-2xl font-black leading-tight", p.hot ? "text-bronze-2" : "text-paper")}>{p.venue}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Chip tone="outline-dark">{t(p.tier)}</Chip>
                <Chip tone="dark">
                  <BadgeCheck size={12} />
                  {t(p.status)}
                </Chip>
              </div>
              <p className="mt-3 text-sm font-medium text-paper/80">{t(p.role)}</p>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-serif-cn text-lg font-bold italic leading-snug sm:text-xl">{noOrphan(p.title, "en")}</h3>
              {p.authors && <p className="mt-2 text-sm text-paper/65">{p.authors}</p>}
              <p className="mt-4 text-[14.5px] leading-[1.85] text-paper/80">{t(p.body)}</p>
              <p className="mt-3 flex gap-2 text-[13.5px] text-bronze-2">
                <Zap size={15} className="mt-0.5 flex-none" />
                <span>
                  <span className="font-semibold">{t("对产品的价值：", "Product takeaway: ")}</span>
                  {t(p.take)}
                </span>
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.links.map((k) => (
                  <ExtLink key={k.href} dark href={k.href} className="!px-3.5 !py-1.5 !text-[13px]">
                    {k.label}
                  </ExtLink>
                ))}
              </div>
            </div>
          </article>
        ))}

        {/* LEAP */}
        <article className="overflow-hidden rounded-2xl border border-bronze-2/40 bg-gradient-to-br from-bronze-2/10 to-transparent p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="font-serif-cn text-2xl font-black leading-tight text-bronze-2">LEAP</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Chip tone="outline-dark">{t("Neurocomputing 在审", "Neurocomputing · Under review")}</Chip>
                <Chip tone="outline-dark">{t("中科院二区 · CCF-C · JCR Q1", "CAS Q2 · CCF-C · JCR Q1")}</Chip>
                <Chip tone="dark">
                  <GithubIcon size={12} />
                  {t("代码与评测集已开源", "Code & eval set open")}
                </Chip>
              </div>
              <p className="mt-3 text-sm font-medium text-paper/80">{t("独立第一作者", "Sole first author")}</p>
            </div>
            <div className="md:col-span-9">
              <h3 className="font-serif-cn text-lg font-bold italic leading-snug sm:text-xl">
                {noOrphan(
                  "Structured Supervision Targets as a Procedural Interface for Reliable Parser-Gated Plan Generation in Compact Vision-Language Models",
                  "en",
                )}
              </h3>
              <p className="mt-2 text-sm text-paper/65">
                <span className="whitespace-nowrap">
                  <Me>Shenzhou Gao</Me> (First Author), Peijian Zhang
                </span>
                <span className="hidden text-paper/45 sm:inline"> · </span>
                <span className="mt-1 block text-xs text-paper/55 sm:mt-0 sm:inline sm:text-sm">
                  {t("项目代号 LEAP · 投稿至 Neurocomputing", "Codename LEAP · Submitted to Neurocomputing")}
                </span>
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.85] text-paper/80">
                {t(
                  "面向端侧小尺寸视觉语言模型（Qwen3-VL-2B）在严格符号解析门禁下易退化为散文拒答或循环截断的瓶颈，将训练期监督目标形式化为显式“过程接口（Procedural Interface）”。基于 151,230 条真实操作轨迹与 VLABench 零样本评测（45 项未见任务、4,500 条样本）开展严格同域匹配对照与两阶段符号契约诊断，证实跨域规划迁移收益源自有序动作步目标结构而非领域词表曝光。",
                  "Addressing prose refusals and loop truncations in compact edge VLMs (Qwen3-VL-2B) under strict symbolic parser gates, I formulate the training supervision target as an explicit Procedural Interface. Across 151,230 real-world manipulation trajectories and 4,500 zero-shot VLABench instances (45 unseen tasks), a matched-control and two-stage symbolic contract study proves that cross-domain planning transfer stems from explicit procedural step structure rather than domain vocabulary exposure.",
                )}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Metric
                  dark
                  value="96.00%"
                  label={t("严格 JSON 解析存活率", "strict JSON parse survival")}
                  sub={t("消除 91.2% 散文拒答 (102→9)", "−91.2% prose refusals (102→9)")}
                />
                <Metric
                  dark
                  value="38.90"
                  label={t("契约对齐六维宏平均分", "contract-aligned 6-D macro score")}
                  sub={t("超越 LoRA +5.32 分 (p < 0.0001)", "+5.32 over LoRA (p < 0.0001)")}
                />
                <Metric
                  dark
                  value="4,500"
                  label={t("零样本跨任务评测实例", "zero-shot unseen eval instances")}
                  sub={t("151,230 条轨迹严格匹配对照", "151,230-episode matched control")}
                />
              </div>
              <div className="mt-5">
                <ExtLink dark variant="solid" href="https://github.com/Evan-Joseph/leap-code">
                  <GithubIcon size={14} />
                  leap-code
                </ExtLink>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[A.leap_framework, A.leap_execution].map((img, n) => (
              <figure key={img.file}>
                <div className="overflow-hidden rounded-xl bg-white p-2 ring-1 ring-paper/10">
                  <Pic img={img} group={[A.leap_framework, A.leap_execution]} index={n} rounded="rounded-md" />
                </div>
                <figcaption className="mt-2 text-[12.5px] leading-snug text-paper/60">{t(img.cap)}</figcaption>
              </figure>
            ))}
          </div>
        </article>

        {/* under review */}
        <article className="night-card grid gap-6 rounded-2xl p-6 md:grid-cols-12 md:p-8">
          <div className="md:col-span-3">
            <p className="font-serif-cn text-2xl font-black leading-tight">
              <span className="whitespace-nowrap">ICLR 2027</span> &amp; <span className="whitespace-nowrap">ICASSP 2027</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Chip tone="dark">{t("在审", "Under review")}</Chip>
              <Chip tone="outline-dark">{t("合作研究", "Collaboration")}</Chip>
            </div>
          </div>
          <div className="md:col-span-9">
            <h3 className="font-serif-cn text-lg font-bold leading-snug sm:text-xl">
              {t("高分辨率多模态音视频生成加速与轻量化部署", "Accelerating and lightweight deployment of high-resolution multimodal audio-video generation")}
            </h3>
            <p className="mt-4 text-[14.5px] leading-[1.85] text-paper/80">
              {t(
                "针对生成式音视频大模型的高算力开销瓶颈，联合研发高效特征缓存与稀疏推理加速框架，实现单卡最高 54.67× 推理加速。",
                "Addressing the compute bottleneck of generative audio-video models, co-developed an efficient feature-caching and sparse-inference acceleration framework achieving up to 54.67× single-GPU speedup.",
              )}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-bronze-2/10 px-5 py-3">
                <Timer size={18} className="text-bronze-2" />
                <span className="font-mono text-sm">
                  318s <span className="text-paper/40">→</span> 5.8s
                </span>
                <span className="font-serif-cn text-xl font-black text-bronze-2">54.67×</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* grants */}
      <div className="mt-16">
        <h3 className="mb-6 flex items-center gap-3 font-serif-cn text-2xl font-black sm:text-3xl">
          <GraduationCap className="text-bronze-2" size={26} />
          {t("主持科研课题", "Principal-Investigator Research Grants")}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              icon: FlaskConical,
              tag: l("大创 · 重点立项 · 10,000 元资助 · 课题负责人 · 2026–2027", "Innovation project · Key grant · ¥10,000 · PI · 2026–2027"),
              title: l("面向视频过程理解的视觉语言模型世界表征能力评测研究", "Evaluating world-representation ability of vision-language models for video process understanding"),
            },
            {
              icon: BookMarked,
              tag: l("大创 · 已顺利结项 · 编号 X2025110650475 · 课题负责人 · 2025–2026.10", "Innovation project · Completed · no. X2025110650475 · PI · 2025 – Oct 2026"),
              title: l("基于 Wan 系列模型的轻量化重构与 3D 点阵研究", "Lightweight reconstruction and 3D point-lattice research based on Wan-series models"),
            },
            /* Pending issuance — uncomment (and restore FileText/Gauge imports + "& IP" heading) once certificates are approved:
            {
              icon: FileText,
              tag: l("国家软件著作权 · 独立著作权人 · 2026", "National software copyright · sole holder · 2026"),
              title: l("《智能成长规划助手》", "“Intelligent Growth Planning Assistant”"),
            },
            {
              icon: Gauge,
              tag: l("国家软件著作权 · 核心研发成员 · 登记号 2026R11L3615529 · 2026", "National software copyright · core developer · reg. no. 2026R11L3615529 · 2026"),
              title: l("《腰椎 MRI 影像分析系统 V1.0》", "“Lumbar MRI Image Analysis System V1.0”"),
            },
            */
          ].map((g, n) => (
            <Fragment key={n}>
              <div className="night-card flex gap-4 rounded-2xl p-5">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-bronze-2/15 text-bronze-2">
                  <g.icon size={20} />
                </span>
                <div>
                  <p className="font-mono text-[11px] leading-relaxed text-bronze-2">{t(g.tag)}</p>
                  <p className="mt-1.5 font-serif-cn text-base font-bold leading-snug">{t(g.title)}</p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <ul className="mt-6 space-y-1 text-sm text-paper/55">
          <Bullet dark>
            {t("主持 2 项大学生创新训练计划课题（重点资助立项 1 项、已结项 1 项）", "Principal Investigator of 2 collegiate innovation grants (1 key funded project, 1 completed)")}
          </Bullet>
        </ul>
      </div>
    </SectionShell>
  );
}
