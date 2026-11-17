import { useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { DEMO_MESSAGES, PLATFORMS, SLIDES } from "../lib/data";
import FeedLine, { PlatformBadge } from "./FeedLine";
import logo from "../assets/logo.png?inline";

const STEP_FALLBACK = 534;

function Frame({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <div className="screen" aria-hidden="true">
      <div className="screen-bar">
        <img src={logo} alt="" width={14} height={14} className="size-3.5 rounded-[3px]" />
        <span className="text-[#c7cee2]">{title}</span>
        <span className="ml-auto">{meta}</span>
      </div>
      {children}
    </div>
  );
}

function FeedScreen() {
  return (
    <Frame title="Единая лента" meta="7 площадок">
      <div className="flex flex-wrap gap-1.5 border-b border-line px-3 py-2.5">
        {PLATFORMS.map((platform) => (
          <span key={platform.id} className="chip py-[2px] text-[11px]">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: platform.color }} />
            {platform.name.split(" ")[0]}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1 px-2 py-2.5">
        {DEMO_MESSAGES.slice(0, 5).map((message, index) => (
          <FeedLine key={index} message={message} />
        ))}
      </div>
      <div className="meta flex items-center gap-2 border-t border-line px-3 py-2 text-[11px]">
        <Search className="size-3.5" aria-hidden="true" />
        Поиск по ленте
      </div>
    </Frame>
  );
}

function MoneyScreen() {
  const rows = [
    { amount: "300 ₽", user: "Аноним", service: "DonationAlerts", note: "На новый микрофон!" },
    { amount: "150 ₽", user: "Марина В.", service: "DonatePay", note: "Спасибо за стрим" },
    { amount: "1 000 ₽", user: "nightowl_k", service: "DonationAlerts", note: "На сбор нового ПК" },
  ];
  return (
    <Frame title="Донаты" meta="2 сервиса">
      <div className="border-b border-line px-3 py-3">
        <div className="flex items-baseline justify-between">
          <span className="meta">Собрано за эфир</span>
          <span className="text-[20px] font-bold text-amber [font-variant-numeric:tabular-nums]">1 450 ₽</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[29%] rounded-full bg-amber" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-2.5 py-2.5">
        {rows.map((row) => (
          <div key={row.user + row.amount} className="feed-line bg-white/[0.03]">
            <span className="grid size-6 shrink-0 place-items-center rounded-[5px] bg-amber text-[11px] font-bold text-[#2a1a00]">
              ₽
            </span>
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-amber [font-variant-numeric:tabular-nums]">{row.amount}</span>
              <span className="text-white/75"> — {row.user}: {row.note}</span>
              <span className="meta mt-0.5 block text-[10.5px]">{row.service}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-line px-3 py-2">
        <span className="meta">Звук донатов</span>
        <div className="flex gap-1.5">
          {["Монетки", "Фанфары", "Аркада"].map((sound, index) => (
            <span
              key={sound}
              className={`chip px-2 py-[2px] text-[11px] ${index === 0 ? "border-cyan/50 text-cyan" : ""}`}
            >
              {sound}
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function OverlayScreen() {
  return (
    <Frame title="Игровой оверлей" meta="прозрачный фон">
      <div className="relative h-[292px] overflow-hidden bg-[radial-gradient(120%_100%_at_20%_0%,#1b2a4a_0%,#0a0f1b_60%)] px-4 py-4">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="relative ml-auto w-[86%] rounded-[9px] border border-white/15 bg-[#080b14]/85 p-2">
          <div className="meta flex items-center justify-between px-1 pb-1.5 text-[10px]">
            <span>Оверлей</span>
            <span className="text-cyan">1 248 зрителей</span>
          </div>
          {DEMO_MESSAGES.slice(3, 6).map((message, index) => (
            <FeedLine key={index} message={message} />
          ))}
        </div>
        <div className="meta absolute bottom-3 left-4 text-[10px]">Иллюстрация: окно поверх игры</div>
      </div>
    </Frame>
  );
}

function ObsScreen() {
  return (
    <Frame title="Источник OBS" meta="1920 × 1080">
      <div className="px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="meta text-[10.5px]">Стиль</span>
          {["Неон", "Стекло", "Терминал", "Кибер"].map((style, index) => (
            <span key={style} className={`chip px-2 py-[2px] text-[11px] ${index === 0 ? "border-brand-ink/60 text-brand-ink" : ""}`}>
              {style}
            </span>
          ))}
        </div>
        <div className="mt-2.5 rounded-[9px] border border-line bg-white/[0.02] p-2">
          {DEMO_MESSAGES.slice(7, 10).map((message, index) => (
            <FeedLine key={index} message={message} />
          ))}
          <div className="feed-line">
            <PlatformBadge index={1} />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-white/80">StreamFan</span>
              <span className="text-white/60"> — подписка на 3 месяца</span>
            </div>
            <span className="meta shrink-0 text-[10.5px]">21:09</span>
          </div>
        </div>
      </div>
      <div className="meta border-t border-line px-3 py-2 text-[11px]">Прозрачный фон, свой шрифт и цвета</div>
    </Frame>
  );
}

const SCREENS = [FeedScreen, MoneyScreen, OverlayScreen, ObsScreen];

export default function Filmstrip() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const step = () => {
    const first = scroller.current?.firstElementChild as HTMLElement | null;
    return first ? first.getBoundingClientRect().width + 14 : STEP_FALLBACK;
  };

  const go = (direction: 1 | -1) => {
    scroller.current?.scrollBy({ left: direction * step(), behavior: "smooth" });
  };

  const onScroll = () => {
    const element = scroller.current;
    if (!element) return;
    const next = Math.round(element.scrollLeft / step());
    setIndex(Math.max(0, Math.min(SLIDES.length - 1, next)));
  };

  return (
    <div className="mt-10">
      <div className="mb-3 flex items-center justify-end gap-3 px-5 sm:px-8">
        <span className="meta">
          {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Предыдущий экран"
            className="grid size-9 place-items-center rounded-[8px] border border-line text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-text"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Следующий экран"
            className="grid size-9 place-items-center rounded-[8px] border border-line text-muted transition-colors duration-150 hover:bg-surface-2 hover:text-text"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        tabIndex={0}
        role="group"
        aria-label="Экраны приложения"
        className="strip px-5 pb-2 sm:px-8"
      >
        {SCREENS.map((Screen, position) => (
          <figure key={SLIDES[position].id} className="m-0 w-[min(88vw,520px)]">
            <Screen />
            <figcaption className="mt-3 text-[14px] leading-relaxed text-muted">
              <span className="meta mr-2">{String(position + 1).padStart(2, "0")}</span>
              <span className="font-semibold text-text">{SLIDES[position].title}</span> — {SLIDES[position].note}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
