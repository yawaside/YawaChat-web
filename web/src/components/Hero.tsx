import { DEMO_MESSAGES } from "../lib/data";
import FeedLine from "./FeedLine";
import { DownloadButton, DownloadMeta } from "./DownloadButton";
import heroImage from "../assets/hero-desk.jpg?inline";
import logo from "../assets/logo.png?inline";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt=""
          width={1560}
          height={878}
          fetchPriority="high"
          className="h-full w-full object-cover object-[64%_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#08060f_16%,rgba(8,6,15,.9)_44%,rgba(8,6,15,.42)_76%,rgba(8,6,15,.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,15,.85)_0%,rgba(8,6,15,.72)_45%,#08060f_92%)] lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,transparent,#08060f)]" />
      </div>

      <div className="wrap grid gap-10 pb-14 pt-28 sm:pt-32 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center lg:gap-12 lg:pb-24 lg:pt-36">
        <div>
          <p className="text-[14px] font-medium text-cyan">Windows 10 и 11, бесплатно</p>

          <h1 className="mt-4 text-[clamp(2.2rem,5.2vw,3.9rem)]">Чат всех ваших стримов в одном окне</h1>

          <p className="mt-5 max-w-[46ch] text-[17.5px] leading-relaxed text-muted">
            YawaChat собирает чаты Twitch, YouTube, VK Видео Live, Kick, TikTok, Rutube и Boosty в одну ленту. Сообщения,
            донаты и подписки — в одном окне вместо семи вкладок.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <DownloadButton variant="primary" />
            <a
              href="#versions"
              className="text-[15px] font-medium underline decoration-white/25 underline-offset-4 transition-colors duration-150 hover:decoration-cyan"
            >
              Все версии
            </a>
          </div>

          <DownloadMeta className="mt-3.5" />
        </div>

        <div className="glass p-3 sm:p-4">
          <div className="flex items-center gap-2.5 px-1 pb-2.5">
            <img src={logo} alt="" width={22} height={22} className="size-[22px] rounded-[6px]" />
            <span className="text-[13px] font-semibold">Единая лента</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full border border-cyan/30 px-2 py-0.5 text-[11px] text-cyan">
              <span className="live-dot size-1.5 rounded-full bg-cyan" />
              в эфире
            </span>
          </div>
          <div className="flex flex-col gap-1" aria-hidden="true">
            {DEMO_MESSAGES.slice(0, 6).map((message, index) => (
              <FeedLine key={index} message={message} />
            ))}
          </div>
          <p className="mt-2 px-1 text-[11.5px] text-faint">Иллюстрация ленты: так выглядит общий чат</p>
        </div>
      </div>
    </section>
  );
}
