import { ReleasesProvider } from "./lib/ReleasesContext";
import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import Platforms from "./components/Platforms";
import Features from "./components/Features";
import Live from "./components/Live";
import Styles from "./components/Styles";
import Install from "./components/Install";
import Versions from "./components/Versions";
import Community from "./components/Community";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ReleasesProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-violet focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-white"
      >
        Перейти к содержимому
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <Platforms />
        <Features />
        <Live />
        <Styles />
        <Install />
        <Versions />
        <Community />
      </main>

      <Footer />
    </ReleasesProvider>
  );
}
