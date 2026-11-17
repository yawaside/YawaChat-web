import { DONATION_SERVICES, PLATFORMS } from "../lib/data";
import { PlatformBadge } from "./FeedLine";
import SectionHeader from "./SectionHeader";
import logo from "../assets/logo.png?inline";

export default function Platforms() {
  return (
    <section id="platforms" className="wrap mt-16 sm:mt-24">
      <SectionHeader
        index="02 · площадки"
        title="Семь источников сходятся в одну ленту"
        lead="Приложение читает публичный чат без входа в аккаунт. Вход нужен только там, где вы хотите отвечать и управлять наградами."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_110px_minmax(0,290px)] lg:items-stretch lg:gap-0">
        <ul className="flex flex-col gap-1.5 lg:self-center">
          {PLATFORMS.map((platform, index) => (
            <li
              key={platform.id}
              className="flex items-center gap-3 rounded-[9px] border border-line bg-surface px-3 py-2"
            >
              <PlatformBadge index={index} size={20} />
              <span className="text-[14.5px] font-medium">{platform.name}</span>
              <span className="meta ml-auto">чат</span>
            </li>
          ))}
        </ul>

        <svg
          className="hidden h-full w-full lg:block"
          viewBox="0 0 110 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {PLATFORMS.map((platform, index) => {
            const y = ((index + 0.5) / PLATFORMS.length) * 100;
            return (
              <path
                key={platform.id}
                d={`M0 ${y} C 55 ${y}, 62 50, 110 50`}
                fill="none"
                stroke="var(--color-line-strong)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        <div className="panel flex flex-col justify-center gap-3 p-4 lg:self-center">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" width={24} height={24} className="size-6 rounded-[6px]" />
            <span className="text-[15px] font-bold">Единая лента</span>
            <span className="ml-auto flex items-center gap-1.5 text-[12px] text-cyan">
              <span className="live-dot size-1.5 rounded-full bg-cyan" />
              в эфире
            </span>
          </div>
          <p className="text-[13.5px] leading-relaxed text-muted">
            Сообщения, донаты, подписки и награды идут одним потоком — с площадкой, цветом ника и значками модератора.
          </p>
          <div className="meta flex flex-wrap gap-x-3 gap-y-1">
            <span>поиск</span>
            <span>фильтр по площадке</span>
            <span>скрытие событий</span>
          </div>
        </div>
      </div>

      <p className="meta mt-5">Донаты: {DONATION_SERVICES.join(" и ")}</p>
    </section>
  );
}
