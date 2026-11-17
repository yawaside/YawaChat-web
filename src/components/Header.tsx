import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png?inline";
import DownloadButton from "./DownloadButton";

const NAV = [
  { href: "#features", label: "Возможности" },
  { href: "#design", label: "Оформление" },
  { href: "#install", label: "Установка" },
  { href: "#releases", label: "Релизы" },
  { href: "#community", label: "Сообщество" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? "border-b border-white/10 bg-[#0b0820]/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="" width={36} height={36} className="size-9 rounded-xl" />
          <span className="font-display text-lg font-bold tracking-tight">
            Yawa<span className="grad-text">Chat</span>
          </span>
        </a>

        <nav className="ml-8 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden sm:block">
          <DownloadButton size="md" />
        </div>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 sm:ml-0 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-[#0b0820] px-4 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 text-lg font-bold text-white/90"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="mt-6" onClick={() => setTimeout(() => setOpen(false), 400)}>
            <DownloadButton full showMeta />
          </div>
        </div>
      )}
    </header>
  );
}
