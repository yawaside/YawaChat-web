import liveImage from "../assets/live-studio.jpg?inline";

const FACTS = [
  ["Прозрачный фон", "плашки без рамки ложатся на игру"],
  ["Свой шрифт", "подключается ссылкой из Google Fonts"],
  ["Режим «Только чат»", "для вертикального монитора"],
];

export default function Live() {
  return (
    <section id="live" className="relative isolate mt-20 overflow-hidden sm:mt-28">
      <img
        src={liveImage}
        alt="Стример за столом: игра на мониторе и колонка чата рядом"
        width={1600}
        height={686}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[72%_50%]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,#08060f_6%,rgba(8,6,15,.94)_34%,rgba(8,6,15,.55)_62%,rgba(8,6,15,.3)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-[linear-gradient(180deg,#08060f,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-[linear-gradient(0deg,#08060f,transparent)]" />

      <div className="wrap flex min-h-[420px] flex-col justify-end py-16 sm:min-h-[480px] sm:py-20">
        <h2 className="max-w-[17ch] text-[clamp(1.75rem,4vw,2.85rem)]">Чат живёт на экране, а не во вкладке</h2>
        <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-muted">
          Виджет OBS и игровой оверлей берут оформление из того же набора стилей, что и основное окно: шрифт, цвет плашек и
          звук доната совпадают.
        </p>

        <dl className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-3 sm:max-w-[820px]">
          {FACTS.map(([term, text]) => (
            <div key={term} className="border-t border-white/15 pt-3">
              <dt className="text-[15px] font-semibold text-text">{term}</dt>
              <dd className="mt-1 text-[13.5px] leading-snug text-faint">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
