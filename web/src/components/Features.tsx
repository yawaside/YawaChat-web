import { useRef, useState } from "react";
import { FEATURE_TABS, type Feature } from "../lib/data";
import FeatureGlyph from "./FeatureGlyph";
import SectionHeader from "./SectionHeader";

function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <div className="border-t border-line pt-4">
      <h4 className="flex items-center gap-2 text-[15.5px] font-semibold leading-snug">
        <FeatureGlyph icon={feature.icon} className="size-[17px] shrink-0 text-faint" />
        {feature.title}
      </h4>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{feature.text}</p>
    </div>
  );
}

export default function Features() {
  const [activeId, setActiveId] = useState(FEATURE_TABS[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = FEATURE_TABS.find((tab) => tab.id === activeId) ?? FEATURE_TABS[0];

  const focusTab = (position: number) => {
    setActiveId(FEATURE_TABS[position].id);
    tabRefs.current[position]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const position = FEATURE_TABS.findIndex((tab) => tab.id === activeId);
    const last = FEATURE_TABS.length - 1;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusTab(position === last ? 0 : position + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusTab(position === 0 ? last : position - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(last);
        break;
      default:
        break;
    }
  };

  return (
    <section id="features" className="wrap mt-16 sm:mt-24">
      <SectionHeader
        index="03 · возможности"
        title="Пять групп — тринадцать возможностей"
        lead="Выберите раздел: слева — что умеет приложение, справа — как это выглядит в работе."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-10">
        <div
          role="tablist"
          aria-label="Разделы возможностей"
          aria-orientation="vertical"
          className="noscroll flex gap-1.5 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible"
        >
          {FEATURE_TABS.map((tab, index) => {
            const selected = tab.id === active.id;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                role="tab"
                type="button"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={onKeyDown}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[9px] border px-3 py-2 text-left text-[14px] transition-colors duration-150 lg:border-0 lg:border-l-2 lg:rounded-none lg:px-4 ${
                  selected
                    ? "border-brand/60 bg-brand/12 text-text lg:border-l-brand-ink lg:bg-transparent"
                    : "border-line text-muted hover:text-text lg:border-l-line"
                }`}
              >
                {tab.label}
                <span className="meta ml-auto hidden lg:block">{tab.features.length}</span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`} tabIndex={0}>
          <h3 className="text-[clamp(1.15rem,2vw,1.5rem)]">{active.title}</h3>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 sm:gap-x-10">
            {active.features.map((feature) => (
              <FeatureRow key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
