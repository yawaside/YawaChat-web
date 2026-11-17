import { Download, MonitorCheck, MousePointerClick, Radio } from "lucide-react";
import { DownloadButton, DownloadMeta } from "./DownloadButton";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    icon: Download,
    title: "Скачайте файл",
    text: "Нажмите «Скачать» — загрузится последняя версия YawaChat одним файлом .exe.",
  },
  {
    icon: MousePointerClick,
    title: "Запустите",
    text: "Установка не нужна: откройте скачанный файл, и приложение готово к работе.",
  },
  {
    icon: Radio,
    title: "Добавьте каналы",
    text: "Подключите свои площадки — вся лента сразу окажется в одном окне.",
  },
];

export default function Install() {
  return (
    <section id="install" className="border-t border-line">
      <div className="wrap py-16 sm:py-24">
        <SectionHeading title="Установка за три шага" lead="Один файл, без установщика и без регистрации." />

        <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-8">
          {STEPS.map((step, index) => (
            <li key={step.title} className="border-t border-line pt-5">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[17px] font-bold text-ink-faint [font-variant-numeric:tabular-nums]">
                  {index + 1}
                </span>
                <step.icon className="size-[18px] text-ink-faint" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-sans text-[17px] font-semibold leading-snug">{step.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex gap-3 rounded-[14px] bg-paper-2 p-5 sm:p-6">
          <MonitorCheck className="mt-0.5 size-5 shrink-0 text-ink-faint" aria-hidden="true" />
          <p className="max-w-[70ch] text-[15px] leading-relaxed text-ink-soft">
            Приложение работает на <strong className="font-semibold text-ink">Windows 10 и 11</strong>. Ему нужен компонент{" "}
            <strong className="font-semibold text-ink">Microsoft Edge WebView2</strong>: в Windows 11 он есть изначально, а
            если его нет — приложение само предложит установить его в один клик.
          </p>
        </div>

        <div className="mt-9">
          <DownloadButton variant="primary" />
          <DownloadMeta className="mt-3.5" />
        </div>
      </div>
    </section>
  );
}
