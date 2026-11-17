import { STYLE_NAMES } from "../lib/data";
import SectionHeading from "./SectionHeading";

const AIR_PALETTE = ["#f3eeff", "#c9b8ff", "#8b6cf0", "#4c3aa8"];
const STUDIO_PALETTE = ["#0a0b0e", "#23262d", "#a3e635", "#ecfccb"];

function AirPreview() {
  return (
    <div className="app-window-light p-3" aria-hidden="true">
      <div className="flex items-center gap-1.5 px-1 pb-2.5">
        <span className="size-1.5 rounded-full bg-[#241a55]/25" />
        <span className="size-1.5 rounded-full bg-[#241a55]/25" />
        <span className="size-1.5 rounded-full bg-[#241a55]/25" />
        <span className="ml-2 text-[10px] font-semibold text-[#241a55]/60">Воздух</span>
      </div>
      <div className="grid grid-cols-[54px_minmax(0,1fr)_46px] gap-2">
        <div className="space-y-1.5">
          <div className="h-4 rounded-[4px] bg-white/70" />
          <div className="h-4 rounded-[4px] bg-white/50" />
          <div className="h-4 rounded-[4px] bg-white/50" />
          <div className="h-4 rounded-[4px] bg-white/40" />
        </div>
        <div className="space-y-1.5 rounded-[8px] bg-white/75 p-2">
          <div className="space-y-1">
            <div className="h-2 w-16 rounded-full bg-[#8b6cf0]/70" />
            <div className="h-2 w-full rounded-full bg-[#241a55]/15" />
          </div>
          <div className="space-y-1 pt-1">
            <div className="h-2 w-12 rounded-full bg-[#8b6cf0]/50" />
            <div className="h-2 w-5/6 rounded-full bg-[#241a55]/15" />
          </div>
          <div className="space-y-1 pt-1">
            <div className="h-2 w-20 rounded-full bg-[#4c3aa8]/50" />
            <div className="h-2 w-2/3 rounded-full bg-[#241a55]/15" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-6 rounded-[5px] bg-white/70" />
          <div className="h-6 rounded-[5px] bg-white/50" />
          <div className="h-6 rounded-[5px] bg-white/40" />
        </div>
      </div>
    </div>
  );
}

function StudioPreview() {
  return (
    <div className="app-window p-3" aria-hidden="true">
      <div className="flex items-center gap-2 px-1 pb-2.5">
        <span className="size-4 rounded-[4px] bg-[#a3e635]/25" />
        <span className="size-4 rounded-[4px] bg-white/10" />
        <span className="size-4 rounded-[4px] bg-white/10" />
        <span className="size-4 rounded-[4px] bg-white/10" />
        <span className="ml-auto text-[10px] font-semibold text-white/55">Студия</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 rounded-[6px] bg-white/6 px-2 py-1.5">
          <span className="size-2 rounded-[2px] bg-[#9146ff]" />
          <span className="h-2 w-16 rounded-full bg-[#a3e635]/80" />
          <span className="h-2 flex-1 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center gap-2 rounded-[6px] bg-white/6 px-2 py-1.5">
          <span className="size-2 rounded-[2px] bg-[#ff3355]" />
          <span className="h-2 w-12 rounded-full bg-[#a3e635]/60" />
          <span className="h-2 flex-1 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center gap-2 rounded-[6px] bg-white/6 px-2 py-1.5">
          <span className="size-2 rounded-[2px] bg-[#25f4ee]" />
          <span className="h-2 w-20 rounded-full bg-[#a3e635]/70" />
          <span className="h-2 flex-1 rounded-full bg-white/20" />
        </div>
        <div className="flex items-center gap-2 rounded-[6px] bg-white/6 px-2 py-1.5">
          <span className="size-2 rounded-[2px] bg-[#f98a3d]" />
          <span className="h-2 w-14 rounded-full bg-[#a3e635]/50" />
          <span className="h-2 flex-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

function Swatches({ colors }: { colors: string[] }) {
  return (
    <div className="mt-4 flex max-w-[280px] gap-1.5" aria-hidden="true">
      {colors.map((color) => (
        <span key={color} className="swatch border border-ink/10" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

export default function Styles() {
  return (
    <section id="design" className="border-t border-line">
      <div className="wrap py-16 sm:py-24">
        <SectionHeading
          title="Выглядит так, как вам нравится"
          lead="Два вида окна и 25 стилей ленты, виджета OBS и оверлея. Один набор стилей действует сразу на всех трёх поверхностях."
        />

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
          <div>
            <AirPreview />
            <h3 className="mt-4 text-[21px]">Воздух</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
              Светлая лавандовая палитра. Разделы и каналы одной колонкой, лента карточкой и сводка эфира справа.
            </p>
            <Swatches colors={AIR_PALETTE} />
          </div>

          <div>
            <StudioPreview />
            <h3 className="mt-4 text-[21px]">Студия</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
              Тёмная тема с лаймовым акцентом. Разделы иконками, плотная шапка и лента почти во всю ширину.
            </p>
            <Swatches colors={STUDIO_PALETTE} />
          </div>
        </div>

        <div className="mt-12 rounded-[14px] bg-paper-2 p-5 sm:p-7">
          <h3 className="text-[19px]">25 стилей — от игровых чатов до неона и терминала</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {STYLE_NAMES.map((style) => (
              <li key={style} className="rounded-full border border-line bg-paper px-3 py-1 text-[13px] font-medium text-ink">
                {style}
              </li>
            ))}
            <li className="rounded-full border border-dashed border-ink/20 px-3 py-1 text-[13px] font-medium text-ink-faint">
              и другие
            </li>
          </ul>
          <p className="mt-5 max-w-[64ch] text-[15px] leading-relaxed text-ink-soft">
            Режим «Только чат» одной кнопкой убирает всё, кроме ленты — удобно на вертикальном мониторе или компактном
            втором экране. Свой шрифт добавляется ссылкой из Google Fonts.
          </p>
        </div>
      </div>
    </section>
  );
}
