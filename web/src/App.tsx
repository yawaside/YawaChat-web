import { ReleasesProvider } from "./lib/ReleasesContext";
import { useActiveSection } from "./lib/useActiveSection";
import { MobileBar, Rail, SECTION_IDS } from "./components/Rail";
import Hero from "./components/Hero";
import Platforms from "./components/Platforms";
import Features from "./components/Features";
import Themes from "./components/Themes";
import Versions from "./components/Versions";
import Community from "./components/Community";
import Footer from "./components/Footer";

export default function App() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <ReleasesProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[8px] focus:bg-brand focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white"
      >
        Перейти к содержимому
      </a>

      <MobileBar active={active} />
      <Rail active={active} />

      <div className="lg:pl-[76px] xl:pl-[228px]">
        <main id="main">
          <Hero />
          <Platforms />
          <Features />
          <Themes />
          <Versions />
          <Community />
        </main>
        <Footer />
      </div>
    </ReleasesProvider>
  );
}
