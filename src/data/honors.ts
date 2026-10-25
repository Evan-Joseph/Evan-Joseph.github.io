import { l, type L } from "../i18n";

export type HonorCat = "scholarship" | "practice" | "competition";

export type Honor = {
  date: string;
  cat: HonorCat;
  level: L;
  title: L;
  detail: L;
  star?: boolean;
};

const nat = l("国家级", "National");
const prov = l("省级", "Provincial");
const uni = l("校级", "University");
const col = l("院级", "College");

export const HONORS: Honor[] = [
  {
    date: "2026.10",
    cat: "scholarship",
    level: nat,
    star: true,
    title: l("2025–2026 学年国家励志奖学金", "National Encouragement Scholarship, 2025–2026"),
    detail: l("基于综测 2/20、学业 5/20 正式评定", "Awarded on the basis of comprehensive rank 2/20 and academic rank 5/20"),
  },
  {
    date: "2026.06",
    cat: "competition",
    level: prov,
    star: true,
    title: l("第 19 届中国大学生计算机设计大赛 · 山东省二等奖（人工智能应用赛道）", "19th China Collegiate Computing Contest · Shandong 2nd Prize (AI Application track)"),
    detail: l("《石室史诗》· 第一作者 / 队长 · 作品编号 2026034567", "“Stone Chamber Epic” · first author / team lead · entry no. 2026034567"),
  },
  {
    date: "2026.06",
    cat: "competition",
    level: prov,
    star: true,
    title: l("第 19 届中国大学生计算机设计大赛 · 山东省二等奖（大数据应用主题赛）", "19th China Collegiate Computing Contest · Shandong 2nd Prize (Big Data Application theme)"),
    detail: l("《从治得上到治得起》· 第一作者 / 队长 · 作品编号 2026025555", "“From Treatable to Affordable” · first author / team lead · entry no. 2026025555"),
  },
  {
    date: "2026.05",
    cat: "scholarship",
    level: col,
    title: l("计算机科学技术学院罡金奖学金“双创之星”", "Gangjin Scholarship “Star of Innovation & Entrepreneurship”, School of CS"),
    detail: l("院级拔尖双创专项奖", "College-level special award for top innovation & entrepreneurship"),
  },
  {
    date: "2026.05",
    cat: "competition",
    level: uni,
    star: true,
    title: l("2026 中国国际大学生创新大赛（国创赛）· 青岛大学校赛金奖", "2026 China International College Students’ Innovation Competition · QDU Campus Gold Prize"),
    detail: l("《SurgiMind3D》· 核心成员", "“SurgiMind3D” · core member"),
  },
  {
    date: "2026.04",
    cat: "practice",
    level: uni,
    title: l("青岛大学寒假大学生“返家乡”社会实践“先进个人” & 校级“优秀实践团队”", "QDU Winter “Return Home” Social Practice — Advanced Individual & Outstanding Team"),
    detail: l("石语新传实践团 · 《青大团字〔2026〕5号》红头表彰", "Shiyu Xinchuan practice team · Official commendation, Qingda Tuan Zi [2026] No. 5"),
  },
  {
    date: "2026.03",
    cat: "competition",
    level: l("企业赛道", "Corporate track"),
    star: true,
    title: l("青岛银行·高校“扣子（Coze）”智能体创新大赛 · 企业赛道二等奖（卓越典范奖）", "Qingdao Bank × Universities “Coze” Agent Innovation Contest · Corporate Track 2nd Prize (Excellence Model Award)"),
    detail: l("《KouPilot》· 项目负责人 / 第一作者", "“KouPilot” · project lead / first author"),
  },
  {
    date: "2025–2026",
    cat: "scholarship",
    level: uni,
    title: l("青岛大学本科生优秀学业奖学金（2 次）", "QDU Undergraduate Academic Excellence Scholarship (×2)"),
    detail: l("2025–2026 学年第一学期校级优秀二等奖学金；2024–2025 学年第二学期校级优秀三等奖学金", "2nd-class (Term 1, 2025–26) and 3rd-class (Term 2, 2024–25) university-level awards"),
  },
  {
    date: "2025.11",
    cat: "practice",
    level: uni,
    title: l("暑期“三下乡”校级“优秀实践团队” & 学院“AI+行业探索计划”三等奖", "Summer “Three Going to the Countryside” — Outstanding Team & School “AI+Industry Exploration” 3rd Prize"),
    detail: l("《智眸鉴史：AI 赋能党史智慧挖掘与传承新章》· 核心技术研发成员 · 《青大团字〔2025〕16号》", "“Zhimou Jianshi: AI for mining and passing on Party-history wisdom” · core technical developer · Qingda Tuan Zi [2025] No. 16"),
  },
  {
    date: "2025.09",
    cat: "competition",
    level: uni,
    title: l("青岛大学 2025 年电子校园卡主题卡面设计大赛 · 校级一等奖", "QDU 2025 E-Campus-Card Theme Design Contest · University 1st Prize"),
    detail: l("独立作者", "Sole author"),
  },
  {
    date: "2025.05",
    cat: "competition",
    level: prov,
    star: true,
    title: l("第 18 届中国大学生计算机设计大赛 · 山东省一等奖", "18th China Collegiate Computing Contest · Shandong 1st Prize"),
    detail: l("《合众诊》· 第一作者 / 队长兼主答辩 · 证书编号 4C2005 SD1905", "“Hezhongzhen” · first author / team lead & main presenter · cert. no. 4C2005 SD1905"),
  },
  {
    date: "2024–2025",
    cat: "practice",
    level: uni,
    title: l("“优秀团干部”（2024 年度）、“优秀团员”（2023 年度）、“先进班集体”、“先进团支部”", "“Outstanding League Cadre” (2024), “Outstanding League Member” (2023), “Advanced Class” and “Advanced League Branch”"),
    detail: l("任 23 计科图灵班副班长", "Vice monitor of the 2023 CS Turing Class"),
  },
  {
    date: "2024.04",
    cat: "competition",
    level: prov,
    title: l("第 15 届蓝桥杯全国软件和信息技术专业人才大赛 · 山东省二等奖", "15th Lanqiao Cup National Software & IT Talent Contest · Shandong 2nd Prize"),
    detail: l("C/C++ 程序设计大学 B 组", "C/C++ Programming, University Group B"),
  },
];
