import type { ReactNode } from "react";

interface Props {
  index: string;
  title: ReactNode;
  lead?: ReactNode;
}

export default function SectionHeader({ index, title, lead }: Props) {
  return (
    <header className="border-t border-line pt-5">
      <p className="meta">{index}</p>
      <h2 className="mt-2.5 text-[clamp(1.55rem,3vw,2.35rem)]">{title}</h2>
      {lead ? <p className="mt-3 max-w-[62ch] text-[16.5px] leading-relaxed text-muted">{lead}</p> : null}
    </header>
  );
}
