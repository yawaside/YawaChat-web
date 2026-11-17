import { useEffect, useState } from "react";
import { Search, Shield } from "lucide-react";
import { DEMO_MESSAGES, PLATFORMS, type DemoMessage } from "../lib/data";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import logo from "../assets/logo.png?inline";

type Variant = "full" | "compact";

const MAX_LINES = 5;

function PlatformBadge({ index }: { index: number }) {
  const platform = PLATFORMS[index];
  return (
    <span
      className="mt-[3px] grid size-6 shrink-0 place-items-center rounded-[5px] text-[10px] font-bold"
      style={{ backgroundColor: platform.color, color: platform.darkBadge ? "#16121f" : "#ffffff" }}
    >
      {platform.short}
    </span>
  );
}

export function MessageRow({ message }: { message: DemoMessage }) {
  const { user, color, text, time, mod, donate, event } = message;

  if (donate) {
    return (
      <div className="feed-line flex items-start gap-2.5 rounded-[9px] border border-amber-300/35 bg-amber-300/10 px-2.5 py-2">
        <span className="mt-[3px] grid size-6 shrink-0 place-items-center rounded-[5px] bg-amber-300 text-[11px] font-bold text-[#3b2600]">
          ₽
        </span>
        <div className="min-w-0 flex-1 text-[13px] leading-snug">
          <span className="font-semibold text-amber-200">{donate.amount}</span>
          <span className="text-white/85"> — {user}: {text}</span>
          <span className="mt-0.5 block text-[11px] text-white/55">{donate.service}</span>
        </div>
        <span className="shrink-0 text-[11px] text-white/50 [font-variant-numeric:tabular-nums]">{time}</span>
      </div>
    );
  }

  return (
    <div className="feed-line flex items-start gap-2.5 rounded-[9px] px-2.5 py-2">
      <PlatformBadge index={message.platform} />
      <div className="min-w-0 flex-1 text-[13px] leading-snug">
        {event ? <span className="mr-1.5 rounded-[4px] bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70">{event}</span> : null}
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color }}>
          {mod ? <Shield className="size-3" aria-hidden="true" /> : null}
          {user}
        </span>
        <span className="text-white/85"> {text}</span>
      </div>
      <span className="shrink-0 text-[11px] text-white/50 [font-variant-numeric:tabular-nums]">{time}</span>
    </div>
  );
}

export default function ChatWindow({ variant = "full" }: { variant?: Variant }) {
  const reduced = usePrefersReducedMotion();
  const animated = variant === "full" && !reduced;
  const lines = variant === "full" ? MAX_LINES : 3;
  const [cursor, setCursor] = useState(lines);

  useEffect(() => {
    if (!animated) return;
    const id = window.setInterval(() => setCursor((value) => value + 1), 2800);
    return () => window.clearInterval(id);
  }, [animated]);

  const visible: number[] = [];
  for (let offset = 0; offset < lines; offset += 1) {
    visible.push(cursor - lines + 1 + offset);
  }

  return (
    <div className="app-window w-full" aria-hidden="true">
      <div className="flex items-center gap-2.5 border-b border-night-line px-4 py-3">
        <img src={logo} alt="" width={22} height={22} className="size-[22px] rounded-[6px]" />
        <span className="font-display text-[13px] font-bold tracking-tight">YawaChat</span>
        <span className="truncate text-[13px] text-white/55">Единая лента</span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-white/8 px-2 py-0.5 text-[11px] font-medium text-white/75">
          <span className="size-1.5 rounded-full bg-live" />
          в эфире
        </span>
      </div>

      {variant === "full" ? (
        <div className="flex flex-wrap gap-1.5 px-4 pt-3">
          {PLATFORMS.map((platform) => (
            <span
              key={platform.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-night-line px-2 py-0.5 text-[11px] text-white/70"
            >
              <span className="size-1.5 rounded-full" style={{ backgroundColor: platform.color }} />
              {platform.name.split(" ")[0]}
            </span>
          ))}
        </div>
      ) : null}

      <div
        className={`flex flex-col justify-end gap-1.5 overflow-hidden px-2 py-3 ${
          variant === "full" ? "h-[248px] sm:h-[266px]" : "h-[150px]"
        }`}
      >
        {visible.map((key) => (
          <MessageRow key={key} message={DEMO_MESSAGES[((key % DEMO_MESSAGES.length) + DEMO_MESSAGES.length) % DEMO_MESSAGES.length]} />
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-night-line px-4 py-2.5 text-[11px] text-white/50">
        <Search className="size-3.5" aria-hidden="true" />
        Поиск по ленте
        <span className="ml-auto">Иллюстрация</span>
      </div>
    </div>
  );
}
