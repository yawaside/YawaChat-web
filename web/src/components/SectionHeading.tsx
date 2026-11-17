import type { ReactNode } from "react";

interface Props {
  title: ReactNode;
  lead?: ReactNode;
  /** Заголовок уровня h2 по умолчанию; h3 — для вложенных блоков. */
  as?: "h2" | "h3";
  className?: string;
}

export default function SectionHeading({ title, lead, as: Tag = "h2", className = "" }: Props) {
  return (
    <div className={`max-w-[62ch] ${className}`}>
      <Tag className="text-[clamp(1.75rem,3.4vw,2.65rem)]">{title}</Tag>
      {lead ? <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-ink-soft sm:text-[18px]">{lead}</p> : null}
    </div>
  );
}
