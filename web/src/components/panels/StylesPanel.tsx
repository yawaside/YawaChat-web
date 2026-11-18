import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Style {
  name: string;
  hint: string;
  /** Фон карточки. */
  surface: string;
  /** Плашка одного сообщения. */
  bubble: string;
  border: string;
  radius: string;
  name_radius: string;
  nick: string;
  text: string;
  meta: string;
  glow?: string;
  mono?: boolean;
  tracking?: string;
}

const STYLES: Style[] = [
  {
    name: "Неон",
    hint: "свечение и контур",
    surface: "radial-gradient(120% 120% at 18% 0%, #3a1e78 0%, #1a0f33 52%, #0a0714 100%)",
    bubble: "rgba(140,110,255,0.16)",
    border: "1px solid rgba(168,146,255,0.34)",
    radius: "10px",
    name_radius: "12px",
    nick: "#cdbcff",
    text: "#efe9ff",
    meta: "#a596cc",
    glow: "0 0 26px -6px rgba(124,92,255,0.55)",
  },
  {
    name: "Терминал",
    hint: "моно и зелёный",
    surface: "linear-gradient(155deg, #06180f, #020806)",
    bubble: "rgba(110,242,163,0.06)",
    border: "1px solid rgba(110,242,163,0.24)",
    radius: "3px",
    name_radius: "6px",
    nick: "#6ef2a3",
    text: "#bdf7d3",
    meta: "#4f9a72",
    mono: true,
  },
  {
    name: "Пиксель",
    hint: "8-битная сетка",
    surface: "linear-gradient(160deg, #181029, #0a0714)",
    bubble: "#241a3d",
    border: "1px solid #6b52a8",
    radius: "0px",
    name_radius: "2px",
    nick: "#ffd166",
    text: "#efe6ff",
    meta: "#9182c4",
    mono: true,
    tracking: "0.02em",
  },
  {
    name: "Стекло",
    hint: "размытие и свет",
    surface: "linear-gradient(140deg, #e4eaff 0%, #b9c4e4 58%, #8f9cc2 100%)",
    bubble: "rgba(255,255,255,0.62)",
    border: "1px solid rgba(255,255,255,0.85)",
    radius: "10px",
    name_radius: "14px",
    nick: "#3a3f7d",
    text: "#232741",
    meta: "#565d7d",
    glow: "0 10px 30px -18px rgba(10,12,30,0.6)",
  },
  {
    name: "Ретровейв",
    hint: "закат и сетка",
    surface: "linear-gradient(160deg, #ff4d9d 0%, #8b5cff 52%, #3fd4ff 100%)",
    bubble: "rgba(22,11,34,0.58)",
    border: "1px solid rgba(255,255,255,0.28)",
    radius: "10px",
    name_radius: "12px",
    nick: "#ffd166",
    text: "#fdf4ff",
    meta: "#e8d9ff",
  },
  {
    name: "Rust",
    hint: "для Rust и Tarkov",
    surface: "linear-gradient(150deg, #4d2610 0%, #2a1408 58%, #170b04 100%)",
    bubble: "rgba(255,180,120,0.10)",
    border: "1px solid rgba(255,170,110,0.28)",
    radius: "5px",
    name_radius: "8px",
    nick: "#ffb46b",
    text: "#f6ddc8",
    meta: "#b8804f",
  },
  {
    name: "Кибер",
    hint: "жёсткие формы",
    surface: "linear-gradient(160deg, #0a2933 0%, #061319 62%, #030a0d 100%)",
    bubble: "rgba(75,224,255,0.07)",
    border: "1px solid rgba(75,224,255,0.30)",
    radius: "0px",
    name_radius: "0px",
    nick: "#4be0ff",
    text: "#d9f8ff",
    meta: "#63929f",
  },
];

const MESSAGES = [
  { badge: "Tw", badgeBg: "#9146ff", badgeFg: "#ffffff", nick: "nightowl_k", text: "привет с Twitch" },
  { badge: "YT", badgeBg: "#ff3355", badgeFg: "#ffffff", nick: "Марина В.", text: "когда стрим?" },
  { badge: "₽", badgeBg: "#ffb224", badgeFg: "#2a1a00", nick: "Anon", text: "300 ₽ на микрофон" },
];

const REST = [
  "World of Tanks",
  "Tarkov",
  "Милая розовая",
  "Комикс",
  "Видеокассета",
  "Вне закона",
  "Вылазка",
  "Звёздочёт",
  "Охотник",
  "Плашки",
  "Приколото",
  "Скетчбук",
];

function StyleCard({ name, hint, surface, bubble, border, radius, name_radius, nick, text, meta, glow, mono, tracking }: Style) {
  return (
    <figure className="w-[224px]">
      <div className="p-2.5" style={{ background: surface, borderRadius: name_radius, boxShadow: glow }}>
        <div className="space-y-1.5">
          {MESSAGES.map((message) => (
            <div key={message.nick} className="flex items-start gap-1.5 px-1.5 py-1.5" style={{ background: bubble, border, borderRadius: radius }}>
              <span
                className="mt-[1px] grid size-[13px] shrink-0 place-items-center rounded-[2px] text-[7px] font-bold"
                style={{ background: message.badgeBg, color: message.badgeFg }}
                aria-hidden="true"
              >
                {message.badge}
              </span>
              <span
                className={`text-[10px] leading-[1.4] ${mono ? "font-mono" : ""}`}
                style={{ color: text, letterSpacing: tracking }}
              >
                <span className="font-semibold" style={{ color: nick }}>
                  {message.nick}
                </span>{" "}
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <p className={`mt-2 px-1 text-[9px] ${mono ? "font-mono" : ""}`} style={{ color: meta }}>
          донаты · 21:06
        </p>
      </div>
      <figcaption className="mt-2">
        <span className="block font-display text-[13.5px] font-semibold text-text">{name}</span>
        <span className="mt-0.5 block text-[11.5px] text-faint">{hint}</span>
      </figcaption>
    </figure>
  );
}

export default function StylesPanel() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [update]);

  const nudge = (direction: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.max(240, Math.round(el.clientWidth * 0.72)), behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-[56ch] text-[16px] leading-relaxed text-muted">
          Один набор стилей действует сразу на ленту, виджет OBS и оверлей: плашки, шрифт и цвета сообщений меняются вместе.
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={edges.start}
            aria-label="Предыдущие стили"
            className="grid size-9 place-items-center rounded-full border border-white/15 text-muted transition-colors duration-150 hover:bg-white/8 hover:text-text disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={edges.end}
            aria-label="Следующие стили"
            className="grid size-9 place-items-center rounded-full border border-white/15 text-muted transition-colors duration-150 hover:bg-white/8 hover:text-text disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={stripRef}
        className="strip mt-5 pr-1"
        role="region"
        aria-label="Примеры стилей, листается стрелками"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            nudge(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            nudge(-1);
          }
        }}
      >
        {STYLES.map((style) => (
          <StyleCard key={style.name} {...style} />
        ))}
      </div>

      <p className="mt-6 max-w-[70ch] text-[14.6px] leading-relaxed text-muted">
        <span className="text-faint">Ещё в наборе:</span> {REST.join(", ")} и другие.
      </p>

      <p className="mt-4 max-w-[70ch] text-[14.6px] leading-relaxed text-muted">
        Режим «Только чат» одной кнопкой убирает всё, кроме ленты — удобно на вертикальном мониторе или компактном втором
        экране. Свой шрифт добавляется ссылкой из Google Fonts.
      </p>
    </div>
  );
}
