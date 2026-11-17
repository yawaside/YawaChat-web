import { Shield } from "lucide-react";
import { PLATFORMS, type DemoMessage } from "../lib/data";

export function PlatformBadge({ index, size = 24 }: { index: number; size?: number }) {
  const platform = PLATFORMS[index];
  return (
    <span
      className="grid shrink-0 place-items-center rounded-[5px] font-bold"
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
      <div className="feed-line border border-amber/30 bg-amber/10">
        <span className="grid size-6 shrink-0 place-items-center rounded-[5px] bg-amber text-[11px] font-bold text-[#2a1a00]">
          ₽
        </span>
        <div className="min-w-0 flex-1">
          <span className="font-semibold text-amber">{donate.amount}</span>
          <span className="text-white/80"> — {user}: {text}</span>
          <span className="meta mt-0.5 block text-[10.5px]">{donate.service}</span>
        </div>
        <span className="meta shrink-0 text-[10.5px]">{time}</span>
      </div>
    );
  }

  return (
    <div className="feed-line">
      <PlatformBadge index={message.platform} />
      <div className="min-w-0 flex-1">
        {event ? (
          <span className="mr-1.5 rounded-[4px] bg-white/10 px-1.5 py-0.5 text-[10px] text-white/70">{event}</span>
        ) : null}
        <span className="inline-flex items-center gap-1 font-semibold" style={{ color }}>
          {mod ? <Shield className="size-3" aria-hidden="true" /> : null}
          {user}
        </span>
        <span className="text-white/80"> {text}</span>
      </div>
      <span className="meta shrink-0 text-[10.5px]">{time}</span>
    </div>
  );
}
