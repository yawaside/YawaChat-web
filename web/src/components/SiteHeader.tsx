import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png?inline";
import { DownloadButton } from "./DownloadButton";

const NAV = [
  { href: "#platforms", label: "Площадки" },
  { href: "#features", label: "Возможности" },
  { href: "#styles", label: "Оформление" },
  { href: "#versions", label: "Релизы" },
  { href: "#community", label: "Сообщество" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open ? "border-b border-line/70 bg-bg/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-[68px] items-center gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="" width={32} height={32} className="size-8 rounded-[9px]" />
          <span className="font-display text-[17px] font-bold tracking-tight">YawaChat</span>
        </a>

        <nav aria-label="Разделы страницы" className="ml-3 hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14.5px] font-medium text-muted transition-colors duration-150 hover:text-text"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden sm:block">
          <DownloadButton variant="compact" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="site-menu"
          className="ml-auto grid size-11 place-items-center rounded-full border border-white/15 text-text transition-colors duration-150 hover:bg-white/10 sm:ml-0 lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div
          id="site-menu"
          className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto overscroll-contain border-t border-line bg-bg px-5 pb-8 pt-2 lg:hidden"
        >
          <nav aria-label="Разделы страницы" className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-[17px] font-medium"
              >
                {item.label}
              </a>
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
