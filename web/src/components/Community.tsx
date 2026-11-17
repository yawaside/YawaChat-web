import { Heart, PlayCircle, Radio, Send, Tv } from "lucide-react";
import { LINKS, PLATFORMS } from "../lib/data";
import SectionHeading from "./SectionHeading";

const CHANNELS = [
  { name: "Twitch", handle: PLATFORMS[0].handle, href: LINKS.twitch, icon: Radio, color: PLATFORMS[0].paper },
  { name: "YouTube", handle: PLATFORMS[1].handle, href: LINKS.youtube, icon: PlayCircle, color: PLATFORMS[1].paper },
  { name: "VK Видео Live", handle: PLATFORMS[2].handle, href: LINKS.vk, icon: Tv, color: PLATFORMS[2].paper },
];

export default function Community() {
  return (
    <section id="community" className="border-t border-line">
      <div className="wrap py-16 sm:py-24">
        <SectionHeading
          title="Сообщество"
          lead="YawaChat — бесплатный проект. Подписка и донат помогают добавлять новые площадки, функции и оформление."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <a
            href={LINKS.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-[14px] bg-paper-2 p-6 transition-colors duration-150 hover:bg-paper-2/70 sm:p-7"
          >
            <Heart className="size-5 text-amber" aria-hidden="true" />
            <h3 className="mt-4 text-[21px]">Поддержать донатом</h3>
            <p className="mt-1.5 max-w-[42ch] text-[15px] leading-relaxed text-ink-soft">
              Любая сумма помогает проекту развиваться. Спасибо, что вы с нами.
            </p>
            <span className="mt-5 inline-flex min-h-10 w-fit items-center rounded-[9px] bg-ink px-4 text-[14px] font-semibold text-paper transition-colors duration-150 group-hover:bg-night-2">
              Поддержать
            </span>
          </a>

          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-[14px] bg-paper-2 p-6 transition-colors duration-150 hover:bg-paper-2/70 sm:p-7"
          >
            <Send className="size-5 text-brand-ink" aria-hidden="true" />
            <h3 className="mt-4 text-[21px]">Телеграм-группа приложения</h3>
            <p className="mt-1.5 max-w-[42ch] text-[15px] leading-relaxed text-ink-soft">
              Вопросы, идеи, сообщения об ошибках и новости об обновлениях — всё в одном месте.
            </p>
            <span className="mt-5 inline-flex min-h-10 w-fit items-center rounded-[9px] bg-ink px-4 text-[14px] font-semibold text-paper transition-colors duration-150 group-hover:bg-night-2">
              Присоединиться
            </span>
          </a>
        </div>

        <h3 className="mt-14 font-sans text-[15px] font-semibold text-ink-faint">Мои трансляции</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {CHANNELS.map((channel) => (
            <li key={channel.name}>
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[12px] border border-line px-4 py-3 transition-colors duration-150 hover:bg-paper-2"
              >
                <channel.icon className="size-5 shrink-0" style={{ color: channel.color }} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold leading-tight">{channel.name}</span>
                  <span className="block truncate text-[13px] text-ink-faint">{channel.handle}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
