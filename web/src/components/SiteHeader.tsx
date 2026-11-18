import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png?inline";
import { SECTIONS, type SectionId } from "../lib/sections";
import { DownloadButton } from "./DownloadButton";

interface Props {
  openSection: SectionId | null;
  onOpen: (id: SectionId) => void;
}

export default function SiteHeader({ openSection, onOpen }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const open = (id: SectionId) => {
    setMenuOpen(false);
    onOpen(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || menuOpen ? "border-b border-white/10 bg-bg/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-[68px] items-center gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="" width={32} height={32} className="size-8 rounded-[9px]" />
          <span className="font-display text-[17px] font-bold tracking-tight">YawaChat</span>
        </a>

        <nav aria-label="Разделы сайта" className="ml-3 hidden items-center gap-1 lg:flex">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => open(section.id)}
              aria-haspopup="dialog"
              aria-expanded={openSection === section.id}
              className={`rounded-full px-3 py-2 text-[14.5px] font-medium transition-colors duration-150 hover:bg-white/8 hover:text-text ${
                openSection === section.id ? "text-text" : "text-muted"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto hidden sm:block">
          <DownloadButton variant="compact" />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          className="ml-auto grid size-11 place-items-center rounded-full border border-white/15 text-text transition-colors duration-150 hover:bg-white/10 sm:ml-0 lg:hidden"
        >
          {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="site-menu"
          className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-bg px-5 pb-8 pt-2 lg:hidden"
        >
          <nav aria-label="Разделы сайта" className="flex flex-col">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => open(section.id)}
                className="flex items-baseline gap-3 border-b border-white/10 py-3.5 text-left text-[17px] font-medium"
              >
                <span className="text-[12px] tabular-nums text-faint">{section.number}</span>
                {section.label}
              </button>
            ))}
          </nav>
          <div className="mt-6">
            <DownloadButton variant="primary" className="w-full" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
