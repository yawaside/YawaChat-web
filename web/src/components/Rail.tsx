import { Layers, MessageCircle, Palette, Radio, SlidersHorizontal, Tag } from "lucide-react";
import { DownloadButton } from "./DownloadButton";
import logo from "../assets/logo.png?inline";

export const NAV = [
  { id: "top", label: "Обзор", icon: Radio },
  { id: "platforms", label: "Площадки", icon: Layers },
  { id: "features", label: "Возможности", icon: SlidersHorizontal },
  { id: "look", label: "Оформление", icon: Palette },
  { id: "versions", label: "Версии", icon: Tag },
  { id: "community", label: "Сообщество", icon: MessageCircle },
] as const;

export const SECTION_IDS = NAV.map((item) => item.id);

export function Rail({ active }: { active: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[76px] flex-col border-r border-line bg-surface/70 backdrop-blur lg:flex xl:w-[228px]">
      <a href="#top" className="flex h-16 items-center gap-3 border-b border-line px-5">
        <img src={logo} alt="" width={28} height={28} className="size-7 shrink-0 rounded-[7px]" />
        <span className="hidden text-[16px] font-bold tracking-tight xl:block">YawaChat</span>
      </a>

      <nav aria-label="Разделы страницы" className="flex flex-col gap-1 p-3">
        {NAV.map((item) => {
          const isActive = active === item.id;
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`flex items-center justify-center gap-3 rounded-[9px] px-3 py-2.5 text-[14px] transition-colors duration-150 xl:justify-start ${
                isActive
                  ? "bg-surface-2 text-text"
                  : "text-muted hover:bg-surface-2/60 hover:text-text"
              }`}
            >
              <Icon className={`size-[18px] shrink-0 ${isActive ? "text-brand-ink" : "text-faint"}`} aria-hidden="true" />
              <span className="hidden xl:block">{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-line p-3">
        <div className="hidden xl:block">
          <DownloadButton variant="primary" className="w-full" />
          <p className="meta mt-2.5 px-1 leading-relaxed">
            Windows 10 и 11
            <br />
            бесплатно, без установки
          </p>
        </div>
        <DownloadButton variant="icon" className="mx-auto xl:hidden" />
      </div>
    </aside>
  );
}

export function MobileBar({ active }: { active: string }) {
  return (
    <div className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur lg:hidden">
      <div className="flex h-14 items-center gap-3 px-4">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="" width={26} height={26} className="size-[26px] rounded-[6px]" />
          <span className="text-[15px] font-bold tracking-tight">YawaChat</span>
        </a>
        <div className="ml-auto">
          <DownloadButton variant="icon" />
        </div>
      </div>
      <nav aria-label="Разделы страницы" className="strip gap-2 px-4 pb-2.5">
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[13px] transition-colors duration-150 ${
              active === item.id
                ? "border-brand/60 bg-brand/15 text-text"
                : "border-line text-muted"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
