import type { ReactNode } from "react";

interface Props {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
}

export default function SectionHead({ label, title, lead }: Props) {
  return (
    <div className="max-w-[64ch]">
      <p className="text-[13.5px] font-medium text-cyan">{label}</p>
      <h2 className="mt-3 text-[clamp(1.75rem,3.6vw,2.7rem)]">{title}</h2>
      {lead ? <p className="mt-4 text-[16.5px] leading-relaxed text-muted">{lead}</p> : null}
    </div>
  );
}
