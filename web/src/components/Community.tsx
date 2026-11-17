import { LINKS } from "../lib/data";
import Clause from "./Clause";

const ROWS = [
  {
    title: "Поддержать донатом",
    text: "Любая сумма помогает проекту развиваться: новые площадки, функции и оформление.",
    links: [{ label: "DonationAlerts", href: LINKS.donate }],
  },
  {
    title: "Telegram-группа",
    text: "Вопросы, идеи, сообщения об ошибках и новости об обновлениях — всё в одном месте.",
    links: [{ label: "Присоединиться", href: LINKS.telegram }],
  },
];

export default function Community() {
  return (
    <Clause
      id="community"
      number="05"
      label="Сообщество"
      title="Проект живёт на поддержку"
      lead="YawaChat бесплатный и без подписок. Донат и подписка идут на новые площадки и оформление."
    >
      <div className="border-t border-white/10">
        {ROWS.map((row) => (
          <div
            key={row.title}
            className="grid gap-x-10 gap-y-2 border-b border-white/10 py-5 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
          >
            <h3 className="font-sans text-[16.5px] font-semibold leading-snug">{row.title}</h3>
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <p className="max-w-[46ch] text-[14.6px] leading-relaxed text-muted">{row.text}</p>
              <span className="flex flex-wrap gap-x-5">
                {row.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14.5px] text-cyan underline decoration-cyan/35 underline-offset-[5px] transition-colors hover:decoration-cyan"
                  >
                    {link.label}
                  </a>
                ))}
              </span>
            </div>
          </div>
        ))}

        <div className="grid gap-x-10 gap-y-2 border-b border-white/10 py-5 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <h3 className="font-sans text-[16.5px] font-semibold leading-snug">Мои трансляции</h3>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <p className="max-w-[46ch] text-[14.6px] leading-relaxed text-muted">
              Как это работает вживую — на каналах, где я стримлю с YawaChat.
            </p>
            <span className="flex flex-wrap gap-x-5 gap-y-1">
              <a
                href={LINKS.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] text-muted underline decoration-white/25 underline-offset-[5px] transition-colors hover:text-text"
              >
                Twitch yawaside_
              </a>
              <a
                href={LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] text-muted underline decoration-white/25 underline-offset-[5px] transition-colors hover:text-text"
              >
                YouTube @YAWASIDE
              </a>
              <a
                href={LINKS.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14.5px] text-muted underline decoration-white/25 underline-offset-[5px] transition-colors hover:text-text"
              >
                VK Видео Live yawaside
              </a>
            </span>
          </div>
        </div>
      </div>
    </Clause>
  );
}
