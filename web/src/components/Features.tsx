import { DEMO_MESSAGES } from "../lib/data";
import FeedLine from "./FeedLine";
import FeatureGlyph from "./FeatureGlyph";
import SectionHead from "./SectionHead";
import type { FeatureIcon } from "../lib/data";

const EXTRA: { icon: FeatureIcon; title: string }[] = [
  { icon: "sparkles", title: "События канала" },
  { icon: "gift", title: "Звуки наград за баллы" },
  { icon: "plus", title: "Награды из приложения" },
  { icon: "keyboard", title: "Горячие клавиши" },
  { icon: "tv", title: "VK Видео с входом" },
  { icon: "life", title: "Диагностика неполадок" },
];

function Waveform() {
  const heights = [30, 62, 44, 88, 54, 100, 40, 72, 34, 58, 90, 46, 66, 28, 52, 78];
  return (
    <div className="flex h-11 items-end gap-1" aria-hidden="true">
      {heights.map((height, index) => (
        <span
          key={index}
          className="w-full rounded-full bg-[linear-gradient(180deg,#4be0ff,#7b5cff)]"
          style={{ height: `${height * 0.44}px`, opacity: 0.35 + height / 220 }}
        />
      ))}
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="wrap mt-20 sm:mt-28">
      <SectionHead
        label="Что внутри"
        title="Одно окно вместо семи"
        lead="Лента, донаты, озвучка, оверлей и модерация. Ничего не нужно докупать и настраивать с нуля."
      />

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <article className="tile sm:col-span-2 lg:col-span-4 lg:row-span-2">
          <h3 className="tile-title">Семь площадок в одной ленте</h3>
          <p className="tile-text max-w-[44ch]">
            Сообщения идут одним потоком: иконка площадки, цвет ника, значки модератора и подписчика, смайлы и стикеры,
            включая анимированные смайлы 7TV. Есть поиск по ленте, фильтр по площадкам и скрытие служебных событий.
          </p>
          <div className="mt-4 flex flex-col gap-1 rounded-[14px] border border-white/8 bg-black/40 p-2" aria-hidden="true">
            {DEMO_MESSAGES.slice(2, 6).map((message, index) => (
              <FeedLine key={index} message={message} />
            ))}
          </div>
        </article>

        <article className="tile lg:col-span-2">
          <h3 className="tile-title">Донаты</h3>
          <p className="mt-2 font-display text-[34px] font-bold leading-none text-amber [font-variant-numeric:tabular-nums]">
            300 ₽
          </p>
          <p className="tile-text">
            DonationAlerts и DonatePay в одном формате: площадка, имя или «Аноним», сумма и сообщение. Свой звук для
            каждой площадки и порог включения.
          </p>
        </article>

        <article className="tile lg:col-span-2">
          <h3 className="tile-title">Озвучка</h3>
          <div className="my-3">
            <Waveform />
          </div>
          <p className="tile-text">
            Голоса Edge TTS и системные голоса Windows: скорость, громкость, фильтры ссылок и команд, чёрный и белый
            списки авторов.
          </p>
        </article>

        <article className="tile lg:col-span-2">
          <h3 className="tile-title">Игровой оверлей</h3>
          <div
            className="relative my-3 h-[70px] overflow-hidden rounded-[12px] bg-[radial-gradient(120%_120%_at_10%_0%,#1d2b4a,#0a0714_70%)]"
            aria-hidden="true"
          >
            <div className="absolute inset-x-3 bottom-3 rounded-[8px] border border-white/15 bg-black/55 p-1.5 backdrop-blur">
              <div className="h-1.5 w-16 rounded-full bg-[#c4b5fd]" />
              <div className="mt-1 h-1.5 w-24 rounded-full bg-white/25" />
            </div>
          </div>
          <p className="tile-text">
            Прозрачное окно поверх игры: мышь проходит насквозь, видна статистика эфира, для TikTok — зрители и лайки.
          </p>
        </article>

        <article className="tile lg:col-span-2">
          <h3 className="tile-title">Виджет OBS</h3>
          <p className="mt-2 font-display text-[30px] font-bold leading-none [font-variant-numeric:tabular-nums]">
            1920<span className="text-muted"> × </span>1080
          </p>
          <p className="tile-text">
            Отдельный источник для трансляции со своим оформлением — чат на экране зрителей выглядит так, как вы
            настроите.
          </p>
        </article>

        <article className="tile lg:col-span-2">
          <h3 className="tile-title">Модерация</h3>
          <div className="my-3 flex flex-wrap gap-1.5" aria-hidden="true">
            {["бан", "таймаут", "медленный режим", "только подписчики"].map((action) => (
              <span key={action} className="rounded-full border border-white/12 px-2.5 py-1 text-[12px] text-muted">
                {action}
              </span>
            ))}
          </div>
          <p className="tile-text">
            Чат-бот и автоответы на команды, удаление сообщений и режимы чата Twitch — прямо из общей ленты.
          </p>
        </article>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
        {EXTRA.map((item) => (
          <li key={item.title} className="flex items-center gap-2 text-[14.5px] text-muted">
            <FeatureGlyph icon={item.icon} className="size-4 shrink-0 text-faint" />
            {item.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
