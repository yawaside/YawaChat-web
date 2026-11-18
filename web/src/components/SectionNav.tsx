import { ArrowUpRight } from "lucide-react";
import { SECTIONS, type SectionId } from "../lib/sections";

export default function SectionNav({ onOpen }: { onOpen: (id: SectionId) => void }) {
  return (
    <section aria-labelledby="sections-title" className="border-b border-white/10">
      <div className="wrap py-10 sm:py-12">
        <h2 id="sections-title" className="font-sans text-[12.5px] font-medium text-faint">
          Разделы
        </h2>

        <ul className="mt-3">
          {SECTIONS.map((section) => (
            <li key={section.id} className="border-t border-white/10 last:border-b">
              <button
                type="button"
                onClick={() => onOpen(section.id)}
                aria-haspopup="dialog"
                className="group flex w-full items-baseline gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan"
              >
                <span className="w-6 shrink-0 text-[12.5px] tabular-nums text-faint">{section.number}</span>
                <span className="font-display text-[clamp(1.05rem,2.3vw,1.55rem)] font-semibold tracking-tight transition-colors duration-150 group-hover:text-cyan">
                  {section.label}
                </span>
                <span className="ml-auto hidden max-w-[40ch] text-right text-[13.5px] leading-snug text-muted sm:block">
                  {section.hint}
                </span>
                <ArrowUpRight
                  className="size-4 shrink-0 self-center text-faint transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
