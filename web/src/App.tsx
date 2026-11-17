import { ReleasesProvider } from "./lib/ReleasesContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PlatformRow from "./components/PlatformRow";
import Features from "./components/Features";
import Studio from "./components/Studio";
import Styles from "./components/Styles";
import Install from "./components/Install";
import Releases from "./components/Releases";
import Community from "./components/Community";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ReleasesProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[9px] focus:bg-ink focus:px-4 focus:py-2.5 focus:text-[14px] focus:font-semibold focus:text-paper"
      >
        Перейти к содержимому
      </a>

      <Header />

      <main id="main">
        <Hero />
        <PlatformRow />
        <Features />
        <Studio />
        <Styles />
        <Install />
        <Releases />
        <Community />
      </main>

      <Footer />
    </ReleasesProvider>
  );
}
