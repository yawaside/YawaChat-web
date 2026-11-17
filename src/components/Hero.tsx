import { PLATFORMS, DONATION_SERVICES } from "../lib/data";
import logo from "../assets/logo.png?inline";
import DownloadButton from "./DownloadButton";
import ChatDemo from "./ChatDemo";
import { useRel } from "../lib/ReleasesContext";
import { formatDate } from "../lib/releases";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { latest } = useRel();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-32 top-10 size-[420px] rounded-full bg-violet-600/25 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 top-40 size-[380px] rounded-full bg-cyan-400/15 blur-[110px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <div className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-violet-200 sm:text-sm lg:mx-0">
            <span className="size-2 rounded-full bg-emerald-400" />
            {latest ? `Версия ${latest.version} · ${formatDate(latest.date)}` : "Бесплатное приложение для Windows"}
          </div>

          <h1 className="font-display text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Чат всех ваших стримов <span className="grad-text">в одном окне</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-violet-100/70 sm:text-lg lg:mx-0">
            YawaChat собирает чаты со всех площадок, где вы ведёте трансляцию, в одну живую ленту. Сообщения, донаты и
            подписки — в одном месте, без десятка открытых окон.
          </p>

          <div className="mt-8 flex flex-col items-center gap-2 lg:items-start">
            <DownloadButton showMeta className="items-center lg:items-start" />
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2 lg:justify-start">
            {PLATFORMS.map((p) => (
              <span
                key={p.name}
                className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white/85 sm:text-sm"
              >
                <span className="size-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }} />
                {p.name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs text-white/50 sm:text-sm">
            Донаты: {DONATION_SERVICES.join(" · ")}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <img
            src={logo}
            alt="Логотип YawaChat"
            width={512}
            height={512}
            className="floaty absolute -right-3 -top-14 z-10 size-24 rounded-[1.4rem] shadow-[0_20px_50px_-10px_rgba(139,92,246,0.8)] sm:-right-6 sm:-top-16 sm:size-32"
          />
          <ChatDemo />
        </div>
      </div>

      <a href="#features" aria-label="Вниз" className="relative mx-auto mt-14 hidden w-fit text-white/40 sm:block">
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </section>
  );
}
