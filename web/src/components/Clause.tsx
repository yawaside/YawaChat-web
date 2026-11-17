import type { ReactNode } from "react";

interface Props {
  id: string;
  number: string;
  label: string;
  title: string;
  lead?: string;
  meta?: string;
  children: ReactNode;
}

/**
 * Раздел документа: номер и подпись в узкой левой колонке, содержимое — справа.
 * Никаких карточек: секции отделены линейкой и полем.
 */
export default function Clause({ id, number, label, title, lead, meta, children }: Props) {
  return (
    <section id={id} className="border-t border-white/10">
      <div className="wrap py-12 sm:py-16">
        <div className="doc-grid">
          <header className="flex items-baseline gap-3 lg:sticky lg:top-24 lg:block lg:self-start">
            <span className="text-[12.5px] tabular-nums text-faint">{number}</span>
            <span className="text-[13.5px] text-muted lg:mt-1.5 lg:block">{label}</span>
            {meta ? <span className="hidden text-[12px] text-faint lg:mt-1 lg:block">{meta}</span> : null}
          </header>

          <div className="doc-body min-w-0">
            <h2 className="max-w-[26ch] text-[clamp(1.5rem,2.7vw,2.1rem)]">{title}</h2>
            {lead ? <p className="mt-3.5 max-w-[62ch] text-[16px] leading-relaxed text-muted">{lead}</p> : null}
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
