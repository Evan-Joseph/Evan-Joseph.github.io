import type { ReactElement } from "react";
import { I18nProvider, LensProvider, useLens } from "./i18n";
import { LENSES, type SectionId } from "./data/profile";
import { OverlayProvider } from "./components/Overlay";
import { Nav } from "./components/Nav";
import { Hero, LensGuide, MetricsBand } from "./components/Hero";
import { Strengths } from "./components/Strengths";
import { Suanle } from "./components/Suanle";
import { Industrial } from "./components/Industrial";
import { Stone } from "./components/Stone";
import { Health } from "./components/Health";
import { Matrix } from "./components/Matrix";
import { Research } from "./components/Research";
import { Education } from "./components/Education";
import { Honors } from "./components/Honors";
import { Toolkit } from "./components/Toolkit";
import { Contact, Footer } from "./components/Contact";

const RENDER: Record<SectionId, (no: number) => ReactElement> = {
  strengths: (no) => <Strengths no={no} />,
  suanle: (no) => <Suanle no={no} />,
  industrial: (no) => <Industrial no={no} />,
  stone: (no) => <Stone no={no} />,
  health: (no) => <Health no={no} />,
  matrix: (no) => <Matrix no={no} />,
  research: (no) => <Research no={no} />,
  education: (no) => <Education no={no} />,
  honors: (no) => <Honors no={no} />,
  toolkit: (no) => <Toolkit no={no} />,
  contact: (no) => <Contact no={no} />,
};

function Page() {
  const { lens } = useLens();
  const order = LENSES[lens].order;
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LensGuide />
        <MetricsBand />
        {order.map((id, n) => (
          <div key={id}>{RENDER[id](n + 1)}</div>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <LensProvider>
        <OverlayProvider>
          <Page />
        </OverlayProvider>
      </LensProvider>
    </I18nProvider>
  );
}
