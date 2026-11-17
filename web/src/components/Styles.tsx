import Clause from "./Clause";

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
  {
    name: "Терминал",
    hint: "моно и зелёный",
    background: "linear-gradient(160deg, #0a1f14, #030a07)",
    ink: "#6ef2a3",
  },
  {
    name: "Пиксель",
    hint: "8-битная сетка",
    background: "linear-gradient(160deg, #1d1435, #0a0714)",
    ink: "#ffd166",
  },
  {
    name: "Стекло",
    hint: "размытие и свет",
    background: "linear-gradient(160deg, #3a4166, #0d0f1c)",
    ink: "#e9eeff",
  },
  {
    name: "Ретровейв",
    hint: "закат и сетка",
    background: "linear-gradient(160deg, #ff4d9d, #7b5cff 55%, #4be0ff)",
    ink: "#160b22",
  },
  {
    name: "Rust",
    hint: "для Rust и Tarkov",
    background: "linear-gradient(160deg, #8a4114, #2a1408)",
    ink: "#ffd6b0",
  },
  {
    name: "Кибер",
    hint: "жёсткие формы",
    background: "linear-gradient(160deg, #0d3a47, #08121a)",
    ink: "#4be0ff",
  },
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
    <figure className="w-[158px]">
      <div className="flex h-[158px] items-end overflow-hidden rounded-[10px] p-3" style={{ background }}>
        <span className="font-display text-[16px] font-semibold leading-tight" style={{ color: ink }}>
          {name}
        </span>
      </div>
      <figcaption className="mt-2 text-[12px] leading-snug text-faint">{hint}</figcaption>
    </figure>
  );
}

export default function Styles() {
  return (
    <Clause
      id="styles"
      number="02"
      label="Оформление"
      meta="25 наборов"
      title="25 стилей на ленту, OBS и оверлей"
      lead="Один набор стилей действует сразу на ленту, виджет OBS и оверлей — эфир выглядит цельно."
    >
      <div className="strip" role="list" aria-label="Примеры стилей">
        {STYLES.map((style) => (
          <div key={style.name} role="listitem">
            <Swatch {...style} />
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-[70ch] text-[14.6px] leading-relaxed text-muted">
        <span className="text-faint">Ещё в наборе:</span>{" "}
        {REST.map((name, index) => (
          <span key={name}>
            {name}
            {index < REST.length - 1 ? ", " : ""}
          </span>
        ))}
        {" "}и другие.
      </p>

      <p className="mt-4 max-w-[70ch] text-[14.6px] leading-relaxed text-muted">
        Режим «Только чат» одной кнопкой убирает всё, кроме ленты — удобно на вертикальном мониторе или компактном втором
        экране. Свой шрифт добавляется ссылкой из Google Fonts.
      </p>
    </Clause>
  );
}
