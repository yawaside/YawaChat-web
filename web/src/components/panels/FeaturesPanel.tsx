import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FEATURE_TABS, type Feature } from "../../lib/data";
import liveImage from "../../assets/live-studio.jpg?inline";

function FeatureItem({ feature }: { feature: Feature }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-4 border-t border-white/10 pt-3 first:mt-0">
      <dt className="text-[15.5px] font-semibold text-text">{feature.title}</dt>
      <dd className="mt-1">
        <p className="text-[14.2px] leading-[1.55] text-muted">{feature.short}</p>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-1 inline-flex min-h-7 items-center gap-1 text-[12.5px] text-faint transition-colors duration-150 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          {open ? "Свернуть" : "Подробнее"}
          <ChevronDown
            className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        <div className="accordion" data-open={open}>
          <div>
            <p id={panelId} className="pb-1 pt-1 text-[14.2px] leading-[1.62] text-muted/90">
              {feature.text}
            </p>
          </div>
        </div>
      </dd>
    </div>
  );
}

export default function FeaturesPanel() {
  const total = FEATURE_TABS.reduce((sum, tab) => sum + tab.features.length, 0);

  return (
    <div>
      <p className="max-w-[64ch] text-[15.5px] leading-relaxed text-muted">
        {total} функций, и все работают вместе. Коротко о каждой — нажмите «Подробнее», если нужны детали.
      </p>

      <figure className="mt-5 overflow-hidden rounded-[14px] border border-white/10">
        <img
          src={liveImage}
          alt="Стример за столом: игра на мониторе и колонка чата рядом"
          width={1600}
          height={686}
          loading="lazy"
          className="h-[clamp(140px,17vw,190px)] w-full object-cover object-[70%_50%]"
        />
      </figure>

      <div className="mt-7 grid gap-x-12 gap-y-7 sm:grid-cols-2">
        {FEATURE_TABS.map((tab) => (
          <section key={tab.id}>
            <h3 className="font-sans text-[12.5px] font-medium text-faint">{tab.label}</h3>
            <dl className="mt-2">
              {tab.features.map((feature) => (
                <FeatureItem key={feature.title} feature={feature} />
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
