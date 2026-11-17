import SectionHead from "./SectionHead";

interface Style {
  name: string;
  hint: string;
  background: string;
  ink: string;
  lines: [string, string][];
}

const STYLES: Style[] = [
  {
    name: "Неон",
    hint: "свечение и контур",
    background: "radial-gradient(120% 120% at 20% 0%, #7b5cff 0%, #25124e 45%, #0a0714 100%)",
    ink: "#eadfff",
    lines: [
      ["nightowl_k", "светится в темноте"],
      ["Марина В.", "контур на никах"],
    ],
  },
  {
    name: "Терминал",
    hint: "моно и зелёный",
    background: "linear-gradient(160deg, #0a1f14, #030a07)",
    ink: "#6ef2a3",
    lines: [
      ["root@obs", "$ chat --start"],
      ["mod", "правила в силе"],
    ],
  },
  {
    name: "Пиксель",
    hint: "8-битная сетка",
    background: "linear-gradient(160deg, #1d1435, #0a0714)",
    ink: "#ffd166",
    lines: [
      ["8bit_max", "HP 100/100"],
      ["pixel_cat", "+1 жизнь"],
    ],
  },
  {
    name: "Стекло",
    hint: "размытие и свет",
    background: "linear-gradient(160deg, #3a4166, #0d0f1c)",
    ink: "#e9eeff",
    lines: [
      ["Марина В.", "размытие и свет"],
      ["glasser", "прозрачные плашки"],
    ],
  },
  {
    name: "Ретровейв",
    hint: "закат и сетка",
    background: "linear-gradient(160deg, #ff4d9d, #7b5cff 55%, #4be0ff)",
    ink: "#160b22",
    lines: [
      ["dj_sunset", "закат по расписанию"],
      ["vaper", "сетка на фоне"],
    ],
  },
  {
    name: "Rust",
    hint: "для Rust и Tarkov",
    background: "linear-gradient(160deg, #8a4114, #2a1408)",
    ink: "#ffd6b0",
    lines: [
      ["tarkov_pro", "вылазка в 21:00"],
      ["rust_kid", "рейд через 5 минут"],
    ],
  },
  {
    name: "Кибер",
    hint: "жёсткие формы",
    background: "linear-gradient(160deg, #0d3a47, #08121a)",
    ink: "#4be0ff",
    lines: [
      ["neon_ghost", "доступ разрешён"],
      ["cipher", "канал защищён"],
    ],
  },
];

function StyleCard({ name, hint, background, ink, lines }: Style) {
  return (
    <figure
      className="relative w-[208px] shrink-0 overflow-hidden rounded-[18px] border border-white/10"
      style={{ background }}
    >
      <div className="flex h-[150px] flex-col justify-between p-3.5">
        <div className="space-y-1.5 text-[10.5px] leading-snug" style={{ color: ink }}>
          {lines.map(([nick, text], i) => (
            <p key={nick} style={{ opacity: i === 0 ? 0.85 : 0.6 }}>
              <span className="font-semibold">{nick}</span> {text}
            </p>
          ))}
        </div>
        <figcaption>
          <span className="font-display text-[17px] font-semibold leading-tight" style={{ color: ink }}>
            {name}
          </span>
          <span className="mt-0.5 block text-[11.5px]" style={{ color: ink, opacity: 0.6 }}>
            {hint}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

export default function Styles() {
  return (
    <section id="styles" className="wrap mt-20 sm:mt-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          label="Оформление"
          title="25 стилей на три поверхности"
          lead="Один набор стилей действует сразу на ленту, виджет OBS и оверлей — эфир выглядит цельно."
        />
        <p className="text-[13.5px] text-faint">листайте в сторону</p>
      </div>

      <div className="strip -mx-5 mt-8 px-5 sm:-mx-8 sm:px-8" role="list" aria-label="Примеры стилей">
        {STYLES.map((style) => (
          <div key={style.name} role="listitem">
            <StyleCard {...style} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14.5px] text-muted">
        <span>Rust</span>
        <span>World of Tanks</span>
        <span>Tarkov</span>
        <span>Стекло</span>
        <span>Милая розовая</span>
        <span>Комикс</span>
        <span>Видеокассета</span>
        <span>Вне закона</span>
        <span>Вылазка</span>
        <span>Звёздочёт</span>
        <span>Охотник</span>
        <span>Скетчбук</span>
        <span className="text-faint">и другие</span>
      </div>

      <p className="mt-5 max-w-[72ch] text-[15px] leading-relaxed text-muted">
        Режим «Только чат» одной кнопкой убирает всё, кроме ленты — удобно на вертикальном мониторе или компактном втором
        экране. Свой шрифт добавляется ссылкой из Google Fonts.
      </p>
    </section>
  );
}
