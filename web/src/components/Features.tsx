import {
  Layers,
  Coins,
  BellRing,
  Gift,
  PlusCircle,
  Mic,
  Gamepad2,
  Clapperboard,
  ShieldCheck,
  Tv,
  Sparkles,
  Keyboard,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { FEATURES, PLATFORMS, type FeatureIcon } from "../lib/data";

const ICONS: Record<FeatureIcon, LucideIcon> = {
  layers: Layers,
  coins: Coins,
  bell: BellRing,
  gift: Gift,
  plus: PlusCircle,
  mic: Mic,
  gamepad: Gamepad2,
  obs: Clapperboard,
  shield: ShieldCheck,
  vk: Tv,
  spark: Sparkles,
  keyboard: Keyboard,
  life: LifeBuoy,
};

export function SectionTitle({ kicker, title, text }: { kicker: string; title: React.ReactNode; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
      <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/80">{kicker}</div>
      <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-violet-100/65 sm:text-lg">{text}</p>}
    </div>
  );
}

export function PlatformsStrip() {
  const row = [...PLATFORMS, ...PLATFORMS, ...PLATFORMS, ...PLATFORMS];
  return (
    <div className="relative border-y border-white/10 bg-white/[0.02] py-5">
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marquee flex w-max gap-4">
          {row.map((p, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/80"
            >
              <span
                className="grid size-6 place-items-center rounded-md text-[10px] font-extrabold text-[#0b0820]"
                style={{ background: p.color }}
              >
                {p.short}
              </span>
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionTitle
        kicker="Возможности"
        title={
          <>
            Всё для стрима — <span className="grad-text">в одном приложении</span>
          </>
        }
        text="Лента, донаты, озвучка, оверлей и модерация. Ничего лишнего и ничего не нужно устанавливать."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = ICONS[f.icon];
          return (
            <article
              key={f.title}
              className={`glass group relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/20 ${
                f.big ? "sm:col-span-2" : ""
              }`}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full opacity-20 blur-3xl transition group-hover:opacity-40"
                style={{ background: f.accent }}
              />
              <div
                className="relative mb-4 grid size-12 place-items-center rounded-2xl"
                style={{ background: `${f.accent}22`, color: f.accent, boxShadow: `inset 0 0 0 1px ${f.accent}44` }}
              >
                <Icon className="size-6" />
              </div>
              <h3 className="relative text-lg font-bold leading-snug">{f.title}</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-violet-100/65">{f.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
