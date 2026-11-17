import { PLATFORMS } from "../lib/data";

export default function Platforms() {
  return (
    <section id="platforms" aria-label="Площадки" className="border-b border-white/10">
      <div className="wrap flex flex-wrap items-center gap-x-7 gap-y-2.5 py-5">
        <span className="text-[12.5px] text-faint">Семь площадок</span>
        {PLATFORMS.map((platform) => (
          <span key={platform.id} className="flex items-center gap-2 text-[14px] text-muted">
            <span
              className="size-[7px] rounded-full"
              style={{ backgroundColor: platform.color }}
              aria-hidden="true"
            />
            {platform.name}
          </span>
        ))}
        <span className="text-[12.5px] text-faint sm:ml-auto">Донаты: DonationAlerts и DonatePay</span>
      </div>
    </section>
  );
}
