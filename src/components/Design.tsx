import { STYLE_NAMES } from "../lib/data";
import { SectionTitle } from "./Features";
import { Sun, Moon, Palette, Maximize2 } from "lucide-react";

export default function Design() {
  return (
    <section id="design" className="relative border-y border-white/10 bg-[#0e0a27]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionTitle
          kicker="Оформление"
          title={
            <>
              Выглядит так, <span className="grad-text">как вам нравится</span>
            </>
          }
          text="Два вида окна и 25 стилей ленты, виджета OBS и оверлея. Один набор стилей действует на всех трёх поверхностях."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-violet-300/30 bg-gradient-to-br from-[#e8e0ff] to-[#cfc2ff] p-6 text-[#241a55]">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-white/70">
                <Sun className="size-5 text-violet-600" />
              </span>
              <h3 className="font-display text-xl font-bold">Воздух</h3>
            </div>
            <p className="leading-relaxed text-[#241a55]/80">
              Светлая лавандовая палитра. Разделы и каналы одной колонкой, лента карточкой и сводка эфира справа.
            </p>
            <div className="mt-5 flex gap-2">
              {["#f3eeff", "#c9b8ff", "#8b6cf0", "#4c3aa8"].map((c) => (
                <span key={c} className="size-8 rounded-full ring-2 ring-white/70" style={{ background: c }} />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-lime-300/20 bg-gradient-to-br from-[#14161a] to-[#0a0b0e] p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-lime-300/15">
                <Moon className="size-5 text-lime-300" />
              </span>
              <h3 className="font-display text-xl font-bold">Студия</h3>
            </div>
            <p className="leading-relaxed text-white/70">
              Тёмная тема с лаймовым акцентом. Разделы иконками, плотная шапка и лента почти во всю ширину.
            </p>
            <div className="mt-5 flex gap-2">
              {["#0a0b0e", "#23262d", "#a3e635", "#ecfccb"].map((c) => (
                <span key={c} className="size-8 rounded-full ring-2 ring-white/20" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>

        <div className="glass mt-4 rounded-3xl p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <Palette className="size-5 text-pink-300" />
            <h3 className="text-lg font-bold">25 стилей — от игровых чатов до неона и терминала</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {STYLE_NAMES.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-white/80"
              >
                {s}
              </span>
            ))}
            <span className="rounded-full border border-dashed border-white/20 px-3.5 py-1.5 text-sm font-semibold text-white/50">
              и другие
            </span>
          </div>
          <p className="mt-5 flex items-start gap-3 text-[15px] leading-relaxed text-violet-100/65">
            <Maximize2 className="mt-1 size-4 shrink-0 text-cyan-300" />
            Режим «Только чат» одной кнопкой убирает всё, кроме ленты — удобно на вертикальном мониторе или компактном
            втором экране. Свой шрифт добавляется ссылкой из Google Fonts.
          </p>
        </div>
      </div>
    </section>
  );
}
