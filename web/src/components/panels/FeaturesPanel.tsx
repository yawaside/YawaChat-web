import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FEATURE_TABS, type Feature } from "../../lib/data";

/** Строка-раскрывашка: вся строка кликабельна, подробности появляются под ней. */
function FeatureRow({ feature }: { feature: Feature }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="border-t border-white/10 [break-inside:avoid]">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group w-full py-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
      >
        <span className="flex items-start justify-between gap-2">
          <span className="text-[14.5px] font-semibold leading-snug text-text">{feature.title}</span>
          <ChevronDown
            className={`mt-0.5 size-3.5 shrink-0 text-faint transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </span>

        <span className="mt-0.5 block text-[13.2px] leading-[1.45] text-muted transition-colors duration-150 group-hover:text-[#c4bde0]">
          {feature.short}
        </span>

        <span id={panelId} className="accordion block" data-open={open}>
          <span className="block">
            <span className="block pt-1.5 text-[13.2px] leading-[1.55] text-muted/90">{feature.text}</span>
          </span>
        </span>
      </button>
    </li>
  );
}

export default function FeaturesPanel() {
  const total = FEATURE_TABS.reduce((sum, tab) => sum + tab.features.length, 0);

  return (
    <div>
      <p className="max-w-[74ch] text-[15px] leading-relaxed text-muted">
        {total} функций, и все работают вместе. Коротко о каждой — нажмите на строку, чтобы раскрыть детали.
      </p>

      <div className="mt-3 columns-1 gap-x-8 sm:columns-2 xl:columns-3">
        {FEATURE_TABS.map((tab) => (
          <section key={tab.id} className="pb-2.5 [break-inside:avoid]">
            <h3 className="font-sans text-[11.5px] font-medium text-faint [break-after:avoid]">{tab.label}</h3>
            <ul>
              {tab.features.map((feature) => (
                <FeatureRow key={feature.title} feature={feature} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
