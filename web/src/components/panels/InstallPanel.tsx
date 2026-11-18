import { EDITIONS, EDITION_ORDER, type Edition } from "../../lib/releases";
import { DownloadButton, DownloadMeta } from "../DownloadButton";

const STEPS = [
  { title: "Скачайте файл", text: "Портативная версия или установщик — на выбор." },
  { title: "Запустите", text: "Портативная запускается сразу, установщик проведёт мастер за пару кликов." },
  { title: "Добавьте каналы", text: "Подключите площадки — лента соберётся сама." },
];

const BUILD_TEXT: Record<Edition, string> = {
  portable: "Один .exe: распакуйте в любую папку и запускайте. В систему ничего не ставится, настройки хранятся рядом.",
  installer:
    "Мастер Inno Setup: ярлыки в меню «Пуск», запись в списке программ Windows и штатное удаление. Удобно, если приложение должно быть «как обычное».",
};

export default function InstallPanel() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <DownloadButton />
        <DownloadMeta />
      </div>

      <ol className="mt-9">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="grid gap-x-6 gap-y-1 border-t border-white/10 py-4 first:border-t-0 sm:grid-cols-[40px_minmax(0,0.85fr)_minmax(0,1.3fr)]"
          >
            <span className="text-[13px] tabular-nums text-faint">0{index + 1}</span>
            <h3 className="font-sans text-[16.5px] font-semibold leading-snug">{step.title}</h3>
            <p className="text-[14.6px] leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>

      <dl className="mt-6 grid gap-x-12 gap-y-5 border-t border-white/10 pt-6 sm:grid-cols-2">
        {EDITION_ORDER.map((edition) => (
          <div key={edition}>
            <dt className="text-[15.5px] font-semibold text-text">{EDITIONS[edition].label}</dt>
            <dd className="mt-1.5 text-[14.4px] leading-relaxed text-muted">{BUILD_TEXT[edition]}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-7 max-w-[62ch] text-[14.4px] leading-relaxed text-faint">
        Нужен компонент <span className="font-semibold text-muted">Microsoft Edge WebView2</span>: в Windows 11 он уже есть, а
        если нет — приложение предложит установить его в один клик.
      </p>
    </div>
  );
}
