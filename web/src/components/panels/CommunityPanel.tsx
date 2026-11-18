import { ArrowUpRight, HeartHandshake, MonitorPlay, Send, Tv, Video } from "lucide-react";
import { LINKS } from "../../lib/data";

interface Link {
  label: string;
  note: string;
  href: string;
  color: string;
  Icon: typeof Tv;
  wide?: boolean;
}

const LINKS_LIST: Link[] = [
  {
    label: "Поддержать донатом",
    note: "DonationAlerts — любая сумма",
    href: LINKS.donate,
    color: "#ffb224",
    Icon: HeartHandshake,
    wide: true,
  },
  { label: "Telegram-группа", note: "вопросы, идеи, новости", href: LINKS.telegram, color: "#29a9eb", Icon: Send },
  { label: "Twitch", note: "yawaside_", href: LINKS.twitch, color: "#9146ff", Icon: Tv },
  { label: "YouTube", note: "@YAWASIDE", href: LINKS.youtube, color: "#ff3355", Icon: Video },
  { label: "VK Видео Live", note: "yawaside", href: LINKS.vk, color: "#2d8cff", Icon: MonitorPlay },
];

export default function CommunityPanel() {
  return (
    <div>
      <p className="max-w-[60ch] text-[16px] leading-relaxed text-muted">
        YawaChat бесплатный и без подписок. Донат и подписка идут на новые площадки, функции и оформление — а на каналах
        видно, как приложение работает вживую.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {LINKS_LIST.map(({ label, note, href, color, Icon, wide }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center gap-4 overflow-hidden rounded-[16px] border border-white/10 px-4 py-4 transition-colors duration-150 hover:border-white/25 ${
              wide ? "sm:col-span-2" : ""
            }`}
            style={{ background: `linear-gradient(135deg, ${color}1f, rgba(255,255,255,0.02) 62%)` }}
          >
            <span
              className="grid size-11 shrink-0 place-items-center rounded-[12px]"
              style={{ backgroundColor: `${color}24`, color }}
              aria-hidden="true"
            >
              <Icon className="size-5" />
            </span>

            <span className="min-w-0 flex-1">
              <span className={`block font-semibold text-text ${wide ? "text-[16.5px]" : "text-[15px]"}`}>{label}</span>
              <span className="mt-0.5 block truncate text-[13px] text-faint">{note}</span>
            </span>

            <ArrowUpRight
              className="size-4 shrink-0 text-faint transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>

      <p className="mt-6 text-[13px] text-faint">Ссылки открываются в новой вкладке.</p>
    </div>
  );
}
