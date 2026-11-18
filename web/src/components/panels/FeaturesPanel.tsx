import { FEATURE_TABS } from "../../lib/data";
import liveImage from "../../assets/live-studio.jpg?inline";

export default function FeaturesPanel() {
  const total = FEATURE_TABS.reduce((sum, tab) => sum + tab.features.length, 0);

  return (
    <div>
      <p className="max-w-[64ch] text-[16px] leading-relaxed text-muted">
        {total} функций, и все работают вместе: подключили площадку — лента собралась сама, включили озвучку — голос читает
        чат поверх игры.
      </p>

      <figure className="mt-6 overflow-hidden rounded-[14px] border border-white/10">
        <img
          src={liveImage}
          alt="Стример за столом: игра на мониторе и колонка чата рядом"
          width={1600}
          height={686}
          loading="lazy"
          className="h-[clamp(150px,24vw,260px)] w-full object-cover object-[70%_50%]"
        />
      </figure>

      <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {FEATURE_TABS.map((tab) => (
          <section key={tab.id}>
            <h3 className="font-sans text-[12.5px] font-medium text-faint">{tab.label}</h3>
            <dl className="mt-2">
              {tab.features.map((feature) => (
                <div key={feature.title} className="mt-4 border-t border-white/10 pt-3 first:mt-0">
                  <dt className="text-[15.5px] font-semibold text-text">{feature.title}</dt>
                  <dd className="mt-1.5 text-[14.4px] leading-[1.62] text-muted">{feature.text}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
