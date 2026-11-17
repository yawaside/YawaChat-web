import { useEffect, useState } from "react";
import { DEMO_MESSAGES, PLATFORMS } from "../lib/data";
import { Radio, Search, Shield } from "lucide-react";

interface Item {
  key: number;
  idx: number;
}

export default function ChatDemo() {
  const [items, setItems] = useState<Item[]>(() => [0, 1, 2].map((i) => ({ key: i, idx: i })));

  useEffect(() => {
    let k = 3;
    const t = setInterval(() => {
      setItems((prev) => {
        const next = [...prev, { key: k, idx: k % DEMO_MESSAGES.length }];
        k++;
        return next.slice(-5);
      });
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass w-full overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(139,92,246,0.45)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <Radio className="size-4 text-pink-300" />
        <span className="text-sm font-bold">Единая лента</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" /> в эфире
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 px-4 pt-3">
        {PLATFORMS.map((p) => (
          <span
            key={p.name}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-white/80"
          >
            <span className="size-1.5 rounded-full" style={{ background: p.color }} />
            {p.name.split(" ")[0]}
          </span>
        ))}
      </div>

      <div className="flex h-[300px] flex-col justify-end gap-2 overflow-hidden px-4 py-4 sm:h-[330px]">
        {items.map((it) => {
          const m = DEMO_MESSAGES[it.idx];
          const p = PLATFORMS[m.p];
          return (
            <div
              key={it.key}
              className={`msg-in flex items-start gap-2.5 rounded-2xl px-3 py-2 ${
                m.donate ? "border border-amber-300/30 bg-amber-300/10" : "bg-white/[0.04]"
              }`}
            >
              <span
                className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg text-[10px] font-extrabold text-[#0b0820]"
                style={{ background: p.color }}
              >
                {p.short}
              </span>
              <div className="min-w-0 text-[13px] leading-snug sm:text-sm">
                <span className="inline-flex items-center gap-1 font-bold" style={{ color: m.color }}>
                  {m.mod && <Shield className="size-3" />}
                  {m.user}
                </span>
                <span className="text-white/85"> {m.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3 text-xs text-white/40">
        <Search className="size-3.5" /> Поиск по ленте
        <span className="ml-auto">Иллюстрация</span>
      </div>
    </div>
  );
}
