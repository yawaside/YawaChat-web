import { AIR_FEATURES, DEMO_MESSAGES } from "../lib/data";
import FeatureGlyph from "./FeatureGlyph";
import { MessageRow } from "./ChatWindow";

const OVERLAY_MESSAGES = [DEMO_MESSAGES[3], DEMO_MESSAGES[5]];

export default function Studio() {
  return (
    <section id="studio" className="bg-night text-white/75">
      <div className="wrap py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.65rem)] text-white">Эфир</h2>
            <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-white/60">
              Оверлей поверх игры, виджет для OBS и горячие клавиши. Всё это работает, пока вы в игре, и выглядит так, как
              вы настроили.
            </p>

            <ul className="mt-9 space-y-7">
              {AIR_FEATURES.map((feature) => (
                <li key={feature.title}>
                  <h3 className="flex items-center gap-2 font-sans text-[16px] font-semibold leading-snug text-white">
                    <FeatureGlyph icon={feature.icon} className="size-[18px] shrink-0 text-white/55" />
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 max-w-[48ch] text-[15px] leading-relaxed text-white/60">{feature.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-7">
            <figure className="m-0">
              <div className="checker rounded-[14px] border border-night-line p-6 sm:p-8">
                <div className="mx-auto max-w-[330px] rounded-[10px] border border-white/12 bg-night/85 p-2">
                  <div className="flex items-center justify-between px-1.5 pb-1.5 text-[10px] text-white/55">
                    <span>Оверлей</span>
                    <span className="[font-variant-numeric:tabular-nums]">1 248 зрителей</span>
                  </div>
                  {OVERLAY_MESSAGES.map((message, index) => (
                    <MessageRow key={index} message={message} />
                  ))}
                </div>
              </div>
              <figcaption className="mt-2.5 text-[13px] leading-relaxed text-white/55">
                Полупрозрачное окно поверх игры: мышь проходит насквозь. Иллюстрация.
              </figcaption>
            </figure>

            <figure className="m-0">
              <div className="app-window p-2.5">
                <div className="flex items-center gap-2 px-1.5 pb-2 text-[11px] text-white/55">
                  <span className="size-1.5 rounded-full bg-[#53fc18]" aria-hidden="true" />
                  Источник OBS
                  <span className="ml-auto">1920 × 1080</span>
                </div>
                {DEMO_MESSAGES.slice(6, 8).map((message, index) => (
                  <MessageRow key={index} message={message} />
                ))}
              </div>
              <figcaption className="mt-2.5 text-[13px] leading-relaxed text-white/55">
                Виджет для OBS — тот же стиль, что и в приложении. Иллюстрация.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
