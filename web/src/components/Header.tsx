import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { DownloadButton } from "./DownloadButton";
import logo from "../assets/logo.png?inline";

const NAV = [
  { href: "#features", label: "Возможности" },
  { href: "#studio", label: "Эфир" },
  { href: "#design", label: "Оформление" },
  { href: "#install", label: "Установка" },
  { href: "#releases", label: "Релизы" },
  { href: "#community", label: "Сообщество" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      className={`sticky top-0 z-50 backdrop-blur-sm transition-[background-color,border-color] duration-200 ${
        scrolled || open ? "border-b border-line bg-paper/90" : "border-b border-transparent bg-paper/70"
      }`}
    >
      <div className="wrap flex h-16 items-center gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="" width={30} height={30} className="size-[30px] rounded-[8px]" />
          <span className="font-display text-[19px] font-bold tracking-tight">YawaChat</span>
        </a>

        <nav aria-label="Разделы страницы" className="ml-2 hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden lg:block">
          <DownloadButton variant="compact" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="ml-auto grid size-11 place-items-center rounded-[9px] border border-line bg-paper text-ink transition-colors duration-150 hover:bg-paper-2 lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-paper px-5 pb-8 pt-3 lg:hidden"
        >
          <nav aria-label="Разделы страницы" className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-[17px] font-medium text-ink"
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
