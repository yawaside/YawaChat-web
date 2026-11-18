import { useCallback, useEffect, useState } from "react";
import { ReleasesProvider } from "./lib/ReleasesContext";
import { getSection, isSectionId, type SectionId } from "./lib/sections";
import SiteHeader from "./components/SiteHeader";
import Cover from "./components/Cover";
import Platforms from "./components/Platforms";
import Footer from "./components/Footer";
import Sheet from "./components/Sheet";
import FeaturesPanel from "./components/panels/FeaturesPanel";
import StylesPanel from "./components/panels/StylesPanel";
import InstallPanel from "./components/panels/InstallPanel";
import VersionsPanel from "./components/panels/VersionsPanel";
import CommunityPanel from "./components/panels/CommunityPanel";

function SectionPanel({ id }: { id: SectionId }) {
  switch (id) {
    case "features":
      return <FeaturesPanel />;
    case "styles":
      return <StylesPanel />;
    case "install":
      return <InstallPanel />;
    case "versions":
      return <VersionsPanel />;
    case "community":
      return <CommunityPanel />;
  }
}

export default function App() {
  const [openSection, setOpenSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (isSectionId(fromHash)) setOpenSection(fromHash);

    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setOpenSection(isSectionId(hash) ? hash : null);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const open = useCallback((id: SectionId) => {
    setOpenSection(id);
    window.history.replaceState(null, "", `#${id}`);
  }, []);

  const close = useCallback(() => {
    setOpenSection(null);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }, []);

  const section = openSection ? getSection(openSection) : null;

  return (
    <ReleasesProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-violet focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white"
      >
        Перейти к содержимому
      </a>

      <SiteHeader openSection={openSection} onOpen={open} />

      <main id="main">
        <Cover />
        <Platforms />
      </main>

      <Footer />

      {section && openSection ? (
        <Sheet key={section.id} number={section.number} title={section.title} onClose={close}>
          <SectionPanel id={openSection} />
        </Sheet>
      ) : null}
    </ReleasesProvider>
  );
}
