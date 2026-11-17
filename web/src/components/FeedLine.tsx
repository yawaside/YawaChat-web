import { Shield } from "lucide-react";
import { PLATFORMS, type DemoMessage } from "../lib/data";

export function PlatformBadge({ index, size = 22 }: { index: number; size?: number }) {
  const platform = PLATFORMS[index];
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[4px] font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: platform.color,
        color: platform.darkBadge ? "#0b0f1c" : "#ffffff",
        fontSize: size <= 20 ? 9 : 10,
      }}
      aria-hidden="true"
    >
      {platform.short}
    </span>
  );
}

export default function FeedLine({ message }: { message: DemoMessage }) {
  const { user, color, text, time, mod, donate, event } = message;

  if (donate) {
    return (
      <div className="feed-line">
        <span className="grid size-[22px] shrink-0 place-items-center rounded-[4px] bg-amber text-[11px] font-bold text-[#2a1a00]">
          ₽
        </span>
        <div className="min-w-0 flex-1">
          <span className="font-semibold text-amber">{donate.amount}</span>
          <span className="text-white/85">
            {" — "}
            {user}: {text}
          </span>
          <span className="mt-0.5 block text-[11px] text-faint">{donate.service}</span>
        </div>
        <span className="shrink-0 text-[11px] tabular-nums text-faint">{time}</span>
      </div>
    );
  }

  return (
    <div className="feed-line">
      <PlatformBadge index={message.platform} />
      <div className="min-w-0 flex-1">
        {event ? (
          <span className="mr-1.5 text-[10.5px] tracking-wide text-faint">{event}</span>
        ) : null}
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color }}>
          {mod ? <Shield className="size-3" aria-hidden="true" /> : null}
          {user}
        </span>
        <span className="text-white/85"> {text}</span>
      </div>
      <span className="shrink-0 text-[11px] tabular-nums text-faint">{time}</span>
    </div>
  );
}
