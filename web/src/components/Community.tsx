import { Heart, PlayCircle, Radio, Send, Tv } from "lucide-react";
import { LINKS, PLATFORMS } from "../lib/data";
import SectionHeader from "./SectionHeader";

const CHANNELS = [
  { name: "Twitch", handle: PLATFORMS[0].handle, href: LINKS.twitch, icon: Radio, color: PLATFORMS[0].color },
  { name: "YouTube", handle: PLATFORMS[1].handle, href: LINKS.youtube, icon: PlayCircle, color: PLATFORMS[1].color },
  { name: "VK Видео Live", handle: PLATFORMS[2].handle, href: LINKS.vk, icon: Tv, color: PLATFORMS[2].color },
];

export default function Community() {
  return (
    <section id="community" className="wrap mt-16 sm:mt-24">
      <SectionHeader
        index="06 · сообщество"
        title="Проект живёт на поддержку"
        lead="YawaChat бесплатный. Подписка и донат идут на новые площадки, функции и оформление."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          href={LINKS.donate}
          target="_blank"
          rel="noopener noreferrer"
          className="panel group flex flex-col p-5 transition-colors duration-150 hover:border-line-strong hover:bg-surface-2"
        >
          <div className="flex items-center gap-2.5">
            <Heart className="size-4 text-amber" aria-hidden="true" />
            <h3 className="text-[16.5px] font-bold">Поддержать донатом</h3>
            <span className="meta ml-auto">donationalerts</span>
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Любая сумма помогает проекту развиваться. Спасибо, что вы с нами.
          </p>
          <span className="mt-4 inline-flex min-h-9 w-fit items-center rounded-[8px] bg-surface-2 px-3 text-[13px] font-medium transition-colors duration-150 group-hover:bg-line">
            Поддержать
          </span>
        </a>

        <a
          href={LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="panel group flex flex-col p-5 transition-colors duration-150 hover:border-line-strong hover:bg-surface-2"
        >
          <div className="flex items-center gap-2.5">
            <Send className="size-4 text-cyan" aria-hidden="true" />
            <h3 className="text-[16.5px] font-bold">Телеграм-группа приложения</h3>
            <span className="meta ml-auto">telegram</span>
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Вопросы, идеи, сообщения об ошибках и новости об обновлениях — всё в одном месте.
          </p>
          <span className="mt-4 inline-flex min-h-9 w-fit items-center rounded-[8px] bg-surface-2 px-3 text-[13px] font-medium transition-colors duration-150 group-hover:bg-line">
            Присоединиться
          </span>
        </a>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="meta mr-1">Мои трансляции</span>
        {CHANNELS.map((channel) => (
          <a
            key={channel.name}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-[9px] border border-line px-3 transition-colors duration-150 hover:bg-surface-2"
          >
            <channel.icon className="size-4 shrink-0" style={{ color: channel.color }} aria-hidden="true" />
            <span className="text-[13.5px] font-medium">{channel.name}</span>
            <span className="meta">{channel.handle}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
