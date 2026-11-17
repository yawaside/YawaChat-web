import { Heart, PlayCircle, Radio, Send, Tv } from "lucide-react";
import { LINKS, PLATFORMS } from "../lib/data";
import SectionHead from "./SectionHead";

const CHANNELS = [
  { name: "Twitch", handle: PLATFORMS[0].handle, href: LINKS.twitch, icon: Radio, color: PLATFORMS[0].color },
  { name: "YouTube", handle: PLATFORMS[1].handle, href: LINKS.youtube, icon: PlayCircle, color: PLATFORMS[1].color },
  { name: "VK Видео Live", handle: PLATFORMS[2].handle, href: LINKS.vk, icon: Tv, color: PLATFORMS[2].color },
];

export default function Community() {
  return (
    <section id="community" className="wrap mt-20 sm:mt-28">
      <SectionHead
        label="Сообщество"
        title="Проект живёт на поддержку"
        lead="YawaChat бесплатный. Подписка и донат идут на новые площадки, функции и оформление."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          href={LINKS.donate}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-[20px] border border-white/10 bg-[linear-gradient(150deg,rgba(255,178,36,.16),rgba(255,178,36,.03))] p-5 transition-colors duration-150 hover:border-amber/40 sm:p-6"
        >
          <Heart className="size-5 text-amber" aria-hidden="true" />
          <h3 className="mt-3 text-[21px]">Поддержать донатом</h3>
          <p className="mt-1.5 max-w-[40ch] text-[14.5px] leading-relaxed text-muted">
            Любая сумма помогает проекту развиваться. Спасибо, что вы с нами.
          </p>
          <span className="mt-4 inline-flex min-h-10 items-center rounded-full bg-amber px-4 text-[13.5px] font-semibold text-[#2a1a00]">
            Поддержать
          </span>
        </a>

        <a
          href={LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-[20px] border border-white/10 bg-[linear-gradient(150deg,rgba(75,224,255,.14),rgba(75,224,255,.03))] p-5 transition-colors duration-150 hover:border-cyan/40 sm:p-6"
        >
          <Send className="size-5 text-cyan" aria-hidden="true" />
          <h3 className="mt-3 text-[21px]">Телеграм-группа приложения</h3>
          <p className="mt-1.5 max-w-[40ch] text-[14.5px] leading-relaxed text-muted">
            Вопросы, идеи, сообщения об ошибках и новости об обновлениях — всё в одном месте.
          </p>
          <span className="mt-4 inline-flex min-h-10 items-center rounded-full bg-cyan px-4 text-[13.5px] font-semibold text-[#04222a]">
            Присоединиться
          </span>
        </a>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <span className="text-[13.5px] text-faint">Мои трансляции</span>
        {CHANNELS.map((channel) => (
          <a
            key={channel.name}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 px-3.5 transition-colors duration-150 hover:bg-white/8"
          >
            <channel.icon className="size-4 shrink-0" style={{ color: channel.color }} aria-hidden="true" />
            <span className="text-[13.5px] font-medium">{channel.name}</span>
            <span className="text-[12.5px] text-faint">{channel.handle}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
