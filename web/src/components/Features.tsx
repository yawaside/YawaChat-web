import { FEATURE_GROUPS, type Feature } from "../lib/data";
import FeatureGlyph from "./FeatureGlyph";
import SectionHeading from "./SectionHeading";

export function FeatureItem({ feature }: { feature: Feature }) {
  return (
    <div>
      <h4 className="flex items-center gap-2 text-[16px] font-semibold leading-snug">
        <FeatureGlyph icon={feature.icon} className="size-[18px] shrink-0 text-ink-faint" />
        {feature.title}
      </h4>
      <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{feature.text}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="wrap py-16 sm:py-24">
      <SectionHeading
        title="Что умеет YawaChat"
        lead="Лента, донаты, озвучка и модерация — в одном приложении. Ничего не нужно докупать и настраивать с нуля."
      />

      <div className="mt-11 space-y-10">
        {FEATURE_GROUPS.map((group) => (
          <div key={group.id} className="grid gap-5 border-t border-line pt-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
            <h3 className="font-sans text-[15px] font-semibold leading-relaxed text-ink-faint">{group.title}</h3>
            <div className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
              {group.features.map((feature) => (
                <FeatureItem key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
