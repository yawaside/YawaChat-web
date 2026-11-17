import { MonitorCheck } from "lucide-react";
import { DownloadButton, DownloadMeta } from "./DownloadButton";
import SectionHead from "./SectionHead";

const STEPS = [
  { title: "Скачайте файл", text: "Один .exe — последняя версия приложения." },
  { title: "Запустите", text: "Установка не нужна: откройте скачанный файл." },
  { title: "Добавьте каналы", text: "Подключите площадки — лента соберётся сама." },
];

export default function Install() {
  return (
    <section id="install" className="wrap mt-20 sm:mt-28">
      <SectionHead
        label="Установка"
        title="Три шага и вы в эфире"
        lead="Без установщика, без регистрации и без настройки с нуля."
      />

      <ol className="mt-9 grid gap-6 sm:grid-cols-3 sm:gap-8">
        {STEPS.map((step, index) => (
          <li key={step.title} className="border-t border-line pt-5">
            <span className="font-display text-[15px] font-bold text-violet">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-sans text-[17px] font-semibold leading-snug">{step.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 rounded-[18px] border border-line/80 bg-bg-2/50 p-5 sm:p-6">
        <div className="flex min-w-[240px] flex-1 items-start gap-3">
          <MonitorCheck className="mt-0.5 size-5 shrink-0 text-cyan" aria-hidden="true" />
          <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-muted">
            Работает на <strong className="font-semibold text-text">Windows 10 и 11</strong>. Нужен компонент{" "}
            <strong className="font-semibold text-text">Microsoft Edge WebView2</strong>: в Windows 11 он уже есть, а если
            нет — приложение предложит установить его в один клик.
          </p>
        </div>
        <div>
          <DownloadButton variant="primary" />
          <DownloadMeta className="mt-2.5" />
        </div>
      </div>
    </section>
  );
}
