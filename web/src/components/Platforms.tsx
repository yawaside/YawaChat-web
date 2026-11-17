import { DONATION_SERVICES, PLATFORMS } from "../lib/data";

export default function Platforms() {
  return (
    <section id="platforms" aria-label="Поддерживаемые площадки" className="border-y border-line/70 bg-bg-2/50">
      <div className="wrap py-6">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 sm:grid-cols-4 lg:grid-cols-7">
          {PLATFORMS.map((platform) => (
            <li key={platform.id} className="flex items-center gap-2.5">
              <span
                className="size-2.5 shrink-0 rounded-[3px]"
                style={{ backgroundColor: platform.color, boxShadow: `0 0 12px ${platform.color}` }}
                aria-hidden="true"
              />
              <span className="min-w-0 truncate text-[14.5px] font-medium">{platform.name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-faint">Донаты: {DONATION_SERVICES.join(" и ")}</p>
      </div>
    </section>
  );
}
