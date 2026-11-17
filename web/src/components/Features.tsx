import { FEATURE_TABS } from "../lib/data";
import Clause from "./Clause";

export default function Features() {
  const total = FEATURE_TABS.reduce((sum, tab) => sum + tab.features.length, 0);

  return (
    <Clause
      id="features"
      number="01"
      label="Возможности"
      meta={`${total} функций`}
      title="Одно окно вместо семи вкладок"
      lead="Лента, донаты, озвучка, оверлей и модерация — по полкам, как в инструкции."
    >
      <div>
        {FEATURE_TABS.map((tab) => (
          <section key={tab.id} className="mt-7 first:mt-0">
            <h3 className="font-sans text-[13px] font-medium text-faint">{tab.label}</h3>
            <dl className="mt-2 grid gap-x-12 gap-y-5 sm:grid-cols-2">
              {tab.features.map((feature) => (
                <div key={feature.title} className="border-t border-white/10 pt-3">
                  <dt className="text-[15.5px] font-semibold text-text">{feature.title}</dt>
                  <dd className="mt-1.5 text-[14.4px] leading-[1.62] text-muted">{feature.text}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </Clause>
  );
}
