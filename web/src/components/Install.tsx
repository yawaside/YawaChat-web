import { Download, MousePointerClick, Radio, MonitorCheck } from "lucide-react";
import { SectionTitle } from "./Features";
import DownloadButton from "./DownloadButton";

const STEPS = [
  { icon: Download, title: "Скачайте файл", text: "Нажмите «Скачать» — загрузится последняя версия YawaChat в виде одного .exe файла." },
  { icon: MousePointerClick, title: "Запустите", text: "Установка не нужна: просто откройте скачанный файл." },
  { icon: Radio, title: "Добавьте каналы", text: "Подключите свои площадки и начинайте работу — вся лента сразу в одном окне." },
];

export default function Install() {
  return (
    <section id="install" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionTitle
        kicker="Установка"
        title={
          <>
            Три шага — и <span className="grad-text">вы в эфире</span>
          </>
        }
      />

      <ol className="grid gap-4 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="glass relative rounded-3xl p-6">
            <span className="font-display absolute right-5 top-4 text-5xl font-extrabold text-white/[0.06]">{i + 1}</span>
            <span className="mb-4 grid size-12 place-items-center rounded-2xl bg-violet-500/20 text-violet-300">
              <s.icon className="size-6" />
            </span>
            <h3 className="text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-violet-100/65">{s.text}</p>
          </li>
        ))}
      </ol>

      <div className="glass mt-4 flex items-start gap-4 rounded-3xl p-5 sm:p-6">
        <MonitorCheck className="mt-0.5 size-6 shrink-0 text-cyan-300" />
        <p className="text-[15px] leading-relaxed text-violet-100/70">
          Приложение работает на <b className="text-white">Windows 10 и 11</b>. Ему нужен компонент{" "}
          <b className="text-white">Microsoft Edge WebView2</b>: в Windows 11 он есть изначально, а если его нет —
          приложение само предложит установить его в один клик.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <DownloadButton showMeta className="items-center" />
      </div>
    </section>
  );
}
