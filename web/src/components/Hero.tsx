import Filmstrip from "./Filmstrip";
import { DownloadButton, DownloadMeta } from "./DownloadButton";

export default function Hero() {
  return (
    <section id="top" className="pt-10 sm:pt-14">
      <div className="wrap">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-10">
          <div>
            <h1 className="text-[clamp(2.05rem,4.5vw,3.5rem)]">Чат всех ваших стримов в одном окне</h1>
            <p className="mt-4 max-w-[54ch] text-[17px] leading-relaxed text-muted">
              YawaChat собирает чаты Twitch, YouTube, VK Видео Live, Kick, TikTok, Rutube и Boosty в одну ленту.
              Сообщения, донаты и подписки — в одном окне вместо семи вкладок.
            </p>
          </div>

          <div>
            <div className="panel p-4">
              <DownloadButton variant="primary" className="w-full" />
              <DownloadMeta className="mt-3" />
            </div>
            <a
              href="#versions"
              className="mt-3 inline-block text-[14px] font-medium text-brand-ink underline decoration-line underline-offset-4 transition-colors duration-150 hover:decoration-brand-ink"
            >
              Все версии и история изменений
            </a>
          </div>
        </div>
      </div>

      <Filmstrip />
    </section>
  );
}
