import { DONATION_SERVICES, PLATFORMS } from "../lib/data";

export default function PlatformRow() {
  return (
    <section aria-label="Поддерживаемые площадки" className="border-y border-line bg-paper-2/70">
      <div className="wrap py-5">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 lg:grid-cols-7">
          {PLATFORMS.map((platform) => (
            <li key={platform.id} className="flex items-center gap-2">
              <span className="size-[10px] shrink-0 rounded-[3px]" style={{ backgroundColor: platform.paper }} aria-hidden="true" />
              <span className="min-w-0 truncate text-[14px] font-medium">{platform.name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-ink-faint">Донаты: {DONATION_SERVICES.join(" и ")}</p>
      </div>
    </section>
  );
}
