import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Style {
  name: string;
  hint: string;
  background: string;
  ink: string;
}

const STYLES: Style[] = [
  {
    name: "Неон",
    hint: "свечение и контур",
    background: "radial-gradient(120% 120% at 20% 0%, #7b5cff 0%, #25124e 45%, #0a0714 100%)",
    ink: "#eadfff",
  },
  { name: "Терминал", hint: "моно и зелёный", background: "linear-gradient(160deg, #0a1f14, #030a07)", ink: "#6ef2a3" },
  { name: "Пиксель", hint: "8-битная сетка", background: "linear-gradient(160deg, #1d1435, #0a0714)", ink: "#ffd166" },
  { name: "Стекло", hint: "размытие и свет", background: "linear-gradient(160deg, #3a4166, #0d0f1c)", ink: "#e9eeff" },
  {
    name: "Ретровейв",
    hint: "закат и сетка",
    background: "linear-gradient(160deg, #ff4d9d, #7b5cff 55%, #4be0ff)",
    ink: "#160b22",
  },
  { name: "Rust", hint: "для Rust и Tarkov", background: "linear-gradient(160deg, #8a4114, #2a1408)", ink: "#ffd6b0" },
  { name: "Кибер", hint: "жёсткие формы", background: "linear-gradient(160deg, #0d3a47, #08121a)", ink: "#4be0ff" },
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

function Swatch({ name, hint, background, ink }: Style) {
  return (
    <figure className="w-[168px]">
      <div className="h-[168px] overflow-hidden rounded-[10px] p-3" style={{ background }}>
        <span className="flex h-full items-end">
          <span className="font-display text-[16px] font-semibold leading-tight" style={{ color: ink }}>
            {name}
          </span>
        </span>
      </div>
      <figcaption className="mt-2 text-[12px] leading-snug text-faint">{hint}</figcaption>
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
          Один набор стилей действует сразу на ленту, виджет OBS и оверлей — эфир выглядит цельно.
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
          <Swatch key={style.name} {...style} />
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
