import { Heart, Send, Radio, PlayCircle, Tv, MessageCircle } from "lucide-react";
import { LINKS } from "../lib/data";
import logo from "../assets/logo.png?inline";
import { SectionTitle } from "./Features";

const CHANNELS = [
  { name: "Twitch", handle: "yawaside_", href: LINKS.twitch, icon: Radio, color: "#9146ff" },
  { name: "YouTube", handle: "@YAWASIDE", href: LINKS.youtube, icon: PlayCircle, color: "#ff3355" },
  { name: "VK Видео Live", handle: "yawaside", href: LINKS.vk, icon: Tv, color: "#2d8cff" },
];

export default function Community() {
  return (
    <>
      <section id="community" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionTitle
          kicker="Сообщество"
          title={
            <>
              Поддержать и <span className="grad-text">быть на связи</span>
            </>
          }
          text="YawaChat — бесплатный проект. Подписка и донат помогают добавлять новые площадки, функции и оформление."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <a
            href={LINKS.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl border border-amber-300/25 bg-gradient-to-br from-amber-400/15 to-orange-500/10 p-6 transition hover:-translate-y-1 sm:p-8"
          >
            <Heart className="mb-4 size-9 text-amber-300" />
            <h3 className="font-display text-xl font-bold">Поддержать донатом</h3>
            <p className="mt-2 leading-relaxed text-white/65">
              Любая сумма помогает проекту развиваться. Спасибо, что вы с нами!
            </p>
            <span className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-amber-300 px-5 text-sm font-bold text-[#2a1a00] transition group-hover:brightness-110">
              Поддержать
            </span>
          </a>

          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl border border-sky-300/25 bg-gradient-to-br from-sky-400/15 to-blue-500/10 p-6 transition hover:-translate-y-1 sm:p-8"
          >
            <Send className="mb-4 size-9 text-sky-300" />
            <h3 className="font-display text-xl font-bold">Телеграм-группа приложения</h3>
            <p className="mt-2 leading-relaxed text-white/65">
              Вопросы, идеи, сообщения об ошибках и новости об обновлениях — всё в одном месте.
            </p>
            <span className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-sky-400 px-5 text-sm font-bold text-[#04223a] transition group-hover:brightness-110">
              Присоединиться
            </span>
          </a>
        </div>

        <h3 className="mb-4 mt-14 flex items-center justify-center gap-2 text-center text-lg font-bold text-white/90">
          <MessageCircle className="size-5 text-violet-300" /> Мои трансляции
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {CHANNELS.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-4 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-white/25"
            >
              <span
                className="grid size-12 shrink-0 place-items-center rounded-xl"
                style={{ background: `${c.color}26`, color: c.color }}
              >
                <c.icon className="size-6" />
              </span>
              <span className="min-w-0">
                <span className="block font-bold">{c.name}</span>
                <span className="block truncate text-sm text-white/55">{c.handle}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#080618] pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={40} height={40} className="size-10 rounded-xl" />
            <div>
              <div className="font-display font-bold">
                Yawa<span className="grad-text">Chat</span>
              </div>
              <div className="text-xs text-white/45">Чат всех ваших стримов в одном окне</div>
            </div>
          </div>
          <div className="text-sm text-white/45">Лицензия MIT · © YawaSide</div>
        </div>
      </footer>
    </>
  );
}
