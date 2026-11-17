import { ReleasesProvider } from "./lib/ReleasesContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features, { PlatformsStrip } from "./components/Features";
import Design from "./components/Design";
import Install from "./components/Install";
import Releases from "./components/Releases";
import Community from "./components/Community";

export default function App() {
  return (
    <ReleasesProvider>
      <div className="min-h-dvh bg-[#0b0820] text-[#e9e6ff]">
        <Header />
        <main>
          <Hero />
          <PlatformsStrip />
          <Features />
          <Design />
          <Install />
          <Releases />
          <Community />
        </main>
      </div>
    </ReleasesProvider>
  );
}
