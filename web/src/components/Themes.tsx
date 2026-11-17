import { useState } from "react";
import { STYLE_NAMES } from "../lib/data";
import SectionHeader from "./SectionHeader";

interface Theme {
  label: string;
  description: string;
  bg: string;
  surface: string;
  text: string;
  muted: string;
  line: string;
  accent: string;
  palette: string[];
}

const THEMES = {
  air: {
    label: "Воздух",
    description: "Светлая лавандовая палитра: разделы и каналы одной колонкой, лента карточкой и сводка эфира справа.",
    bg: "#efe9ff",
    surface: "#ffffff",
    text: "#241a55",
    muted: "rgba(36, 26, 85, 0.62)",
    line: "rgba(36, 26, 85, 0.14)",
    accent: "#7c5cff",
    palette: ["#efe9ff", "#c9b8ff", "#8b6cf0", "#4c3aa8"],
  },
  studio: {
    label: "Студия",
    description: "Тёмная тема с лаймовым акцентом: разделы иконками, плотная шапка и лента почти во всю ширину.",
    bg: "#0a0b0e",
    surface: "#16181d",
    text: "#ecfccb",
    muted: "rgba(236, 252, 203, 0.62)",
    line: "rgba(236, 252, 203, 0.14)",
    accent: "#a3e635",
    palette: ["#0a0b0e", "#23262d", "#a3e635", "#ecfccb"],
  },
} satisfies Record<string, Theme>;

type ThemeId = keyof typeof THEMES;

const NICKNAMES = ["nightowl_k", "Марина В.", "ВанёкGames", "kickfan_77"];

function ThemePreview({ theme }: { theme: Theme }) {
  return (
    <div
      className="rounded-[12px] border p-2.5 transition-colors duration-200"
      style={{ backgroundColor: theme.bg, borderColor: theme.line }}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 px-1 pb-2">
        <span className="size-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
        <span className="text-[10.5px] font-semibold" style={{ color: theme.muted }}>
          YawaChat
        </span>
        <span className="ml-auto text-[10.5px]" style={{ color: theme.muted }}>
          {theme.label}
        </span>
      </div>
      <div className="grid grid-cols-[74px_minmax(0,1fr)] gap-2">
        <div className="flex flex-col gap-1">
          {["Лента", "Каналы", "Донаты", "Голос"].map((item, index) => (
            <span
              key={item}
              className="truncate rounded-[5px] px-2 py-1 text-[10px]"
              style={{
                backgroundColor: index === 0 ? theme.accent : theme.surface,
                color: index === 0 ? theme.bg : theme.muted,
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1 rounded-[8px] p-2" style={{ backgroundColor: theme.surface }}>
          {NICKNAMES.map((name, index) => (
            <div key={name} className="flex items-baseline gap-1.5 text-[10.5px] leading-relaxed">
              <span className="shrink-0 font-semibold" style={{ color: theme.accent }}>
                {name}
              </span>
              <span className="truncate" style={{ color: theme.muted }}>
                {index === 0 ? "Лента едет ровно, спасибо!" : "Сообщение из общего чата"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Themes() {
  const [themeId, setThemeId] = useState<ThemeId>("air");
  const theme: Theme = THEMES[themeId];

  return (
    <section id="look" className="wrap mt-16 sm:mt-24">
      <SectionHeader
        index="04 · оформление"
        title="Два вида окна и 25 стилей"
        lead="Один набор стилей действует сразу на ленту, виджет OBS и оверлей — эфир выглядит цельно."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-10">
        <div>
          <div role="group" aria-label="Тема оформления" className="flex gap-1.5">
            {(Object.keys(THEMES) as ThemeId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setThemeId(id)}
                aria-pressed={themeId === id}
                className={`min-h-10 rounded-[9px] border px-3.5 text-[13.5px] font-medium transition-colors duration-150 ${
                  themeId === id ? "border-brand/60 bg-brand/15 text-text" : "border-line text-muted hover:text-text"
                }`}
              >
                {THEMES[id].label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{theme.description}</p>

          <div className="mt-4 flex gap-1.5" aria-hidden="true">
            {theme.palette.map((color) => (
              <span
                key={color}
                className="h-8 flex-1 rounded-[6px] border border-white/10"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <ThemePreview theme={theme} />
      </div>

      <div className="mt-8 border-t border-line pt-5">
        <h3 className="text-[15px] font-semibold">
          25 стилей — от игровых чатов до неона и терминала
        </h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {STYLE_NAMES.map((style) => (
            <li key={style} className="chip">
              {style}
            </li>
          ))}
          <li className="chip border-dashed">и другие</li>
        </ul>
        <p className="mt-4 max-w-[70ch] text-[14.5px] leading-relaxed text-muted">
          Режим «Только чат» одной кнопкой убирает всё, кроме ленты — удобно на вертикальном мониторе или компактном
          втором экране. Свой шрифт добавляется ссылкой из Google Fonts.
        </p>
      </div>
    </section>
  );
}
