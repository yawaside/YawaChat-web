import ChatWindow from "./ChatWindow";
import { DownloadButton, DownloadMeta } from "./DownloadButton";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-16">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div>
          <h1 className="text-[clamp(2.3rem,5.3vw,4rem)]">Чат всех ваших стримов в одном окне</h1>

          <p className="mt-5 max-w-[46ch] text-[18px] leading-relaxed text-ink-soft sm:text-[19px]">
            YawaChat собирает чаты Twitch, YouTube, VK Видео Live, Kick, TikTok, Rutube и Boosty в одну ленту. Сообщения,
            донаты и подписки — в одном окне вместо семи вкладок.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <DownloadButton variant="primary" />
            <a
              href="#releases"
              className="text-[15px] font-medium text-brand-ink underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-brand"
            >
              Все версии
            </a>
          </div>

          <DownloadMeta className="mt-3.5" />
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-6 -bottom-5 top-20 rounded-[18px] bg-brand sm:inset-x-10 sm:left-8"
            aria-hidden="true"
          />
          <div className="relative">
            <ChatWindow variant="full" />
          </div>
        </div>
      </div>
    </section>
  );
}
