import { startTransition, useId, useState, ViewTransition } from "react";
import { ChevronDown, Download, MonitorCheck, Package, RefreshCw } from "lucide-react";
import { LINKS } from "../lib/data";
import { useReleasesValue } from "../lib/ReleasesContext";
import { formatCount, formatDate, formatSize, type Release } from "../lib/releases";
import { DownloadButton, DownloadMeta } from "./DownloadButton";
import SectionHeader from "./SectionHeader";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

const STEPS = [
  { title: "Скачайте файл", text: "Один .exe — последняя версия." },
  { title: "Запустите", text: "Установка не нужна, откройте файл." },
  { title: "Добавьте каналы", text: "Подключите площадки и следите за лентой." },
];

function Inline({ text }: { text: string }) {
  const parts = text.split(INLINE_PATTERN).filter(Boolean);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") ? (
          <strong key={index} className="font-semibold text-text">
            {part.slice(2, -2)}
          </strong>
        ) : part.startsWith("`") ? (
          <code key={index} className="rounded-[4px] bg-surface-2 px-1 text-[0.92em]">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

function Notes({ text }: { text: string }) {
  if (!text.trim()) return <p className="text-[14px] text-faint">Описание не добавлено.</p>;

  const blocks: React.ReactNode[] = [];
  let list: string[] = [];

  const flush = () => {
    if (!list.length) return;
    const items = list;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-2 list-disc space-y-1 pl-5">
        {items.map((item, index) => (
          <li key={index}>
            <Inline text={item} />
          </li>
        ))}
      </ul>,
    );
    list = [];
  };

  text
    .replace(/\r/g, "")
    .split("\n")
    .forEach((raw, index) => {
      const line = raw.trim();
      if (/^[-*]\s+/.test(line)) {
        list.push(line.replace(/^[-*]\s+/, ""));
        return;
      }
      flush();
      if (!line) return;
      if (/^#{1,6}\s+/.test(line)) {
        blocks.push(
          <h4 key={`h-${index}`} className="meta mt-3">
            {line.replace(/^#{1,6}\s+/, "")}
          </h4>,
        );
        return;
      }
      blocks.push(
        <p key={`p-${index}`} className="mt-1.5">
          <Inline text={line} />
        </p>,
      );
    });
  flush();

  return <div className="text-[14px] leading-relaxed text-muted">{blocks}</div>;
}

function ReleaseRow({ release, isLatest }: { release: Release; isLatest: boolean }) {
  const { download } = useReleasesValue();
  const [open, setOpen] = useState(isLatest);
  const panelId = useId();

  const details = [
    release.asset ? formatSize(release.asset.size) : "",
    release.asset ? `${formatCount(release.asset.downloads)} скачиваний` : "",
  ].filter(Boolean);

  return (
    <li className="py-4">
      <div className="flex flex-wrap items-start gap-x-4 gap-y-2.5">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-w-0 flex-1 items-start gap-2.5 text-left"
        >
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-[16px] font-bold [font-variant-numeric:tabular-nums]">v{release.version}</span>
              {isLatest ? (
                <span className="rounded-full bg-brand/20 px-2 py-0.5 text-[11px] font-medium text-brand-ink">последняя</span>
              ) : null}
              {release.prerelease ? (
                <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[11px] font-medium text-amber">
                  предварительная
                </span>
              ) : null}
            </span>
            <span className="meta mt-1 block">
              <time dateTime={release.date}>{formatDate(release.date)}</time>
              {details.length ? ` · ${details.join(" · ")}` : ""}
            </span>
          </span>
          <ChevronDown
            className={`ml-auto mt-0.5 size-4 shrink-0 text-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        {release.asset ? (
          <button
            type="button"
            onClick={() => download(release)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-[8px] border border-line px-3 text-[13px] font-medium text-text transition-colors duration-150 hover:bg-surface-2"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Скачать
          </button>
        ) : null}
      </div>

      <div className="accordion mt-2" data-open={open}>
        <div>
          <div id={panelId} className="pb-1">
            <Notes text={release.notes} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Versions() {
  const { releases, latest, status, reload } = useReleasesValue();
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? releases : releases.slice(0, 5);

  return (
    <section id="versions" className="wrap mt-16 sm:mt-24">
      <SectionHeader
        index="05 · версии"
        title="Установка и все сборки"
        lead="Приложению нужны Windows 10 или 11. Если нет компонента Microsoft Edge WebView2, оно само предложит установить его в один клик."
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-10">
        <div className="min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold">История версий</h3>
            {status === "error" ? (
              <button
                type="button"
                onClick={() => void reload()}
                className="meta inline-flex min-h-8 items-center gap-1.5 rounded-[7px] border border-line px-2.5 transition-colors duration-150 hover:bg-surface-2"
              >
                <RefreshCw className="size-3" aria-hidden="true" />
                обновить
              </button>
            ) : (
              <span className="meta">github · yawachat-Releases</span>
            )}
          </div>

          {status === "loading" ? (
            <div className="mt-4 space-y-2" aria-hidden="true">
              {[0, 1, 2].map((row) => (
                <div key={row} className="h-14 animate-pulse rounded-[9px] bg-surface" />
              ))}
            </div>
          ) : null}

          {status === "error" ? (
            <div className="panel mt-4 p-4">
              <p className="text-[14px] leading-relaxed text-muted">
                Список версий не загрузился — возможно, GitHub недоступен. Кнопка «Скачать» всё равно откроет страницу
                последнего релиза.
              </p>
            </div>
          ) : null}

          {status === "empty" ? (
            <div className="panel mt-4 p-4">
              <Package className="size-5 text-faint" aria-hidden="true" />
              <h4 className="mt-2 text-[16px] font-bold">Релизы скоро появятся</h4>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                Первая версия выйдет — и появится здесь, а кнопка «Скачать» начнёт загрузку автоматически. Новости в
                Telegram-группе.
              </p>
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-9 items-center rounded-[8px] bg-surface-2 px-3 text-[13px] font-medium transition-colors duration-150 hover:bg-line"
              >
                Открыть Telegram
              </a>
            </div>
          ) : null}

          {status === "ready" ? (
            <>
              <ol className="mt-4 divide-y divide-line border-y border-line">
                {shown.map((release) => (
                  <ViewTransition key={release.id} enter="vt-soft">
                    <ReleaseRow release={release} isLatest={latest?.id === release.id} />
                  </ViewTransition>
                ))}
              </ol>
              {releases.length > 5 ? (
                <button
                  type="button"
                  onClick={() => startTransition(() => setShowAll((value) => !value))}
                  className="mt-3 min-h-9 rounded-[8px] border border-line px-3 text-[13px] font-medium transition-colors duration-150 hover:bg-surface-2"
                >
                  {showAll ? "Свернуть" : `Показать все (${releases.length})`}
                </button>
              ) : null}
            </>
          ) : null}
        </div>

        <aside className="order-first space-y-4 lg:order-none">
          <div className="panel p-4">
            <DownloadButton variant="primary" className="w-full" />
            <DownloadMeta className="mt-3" />
          </div>

          <ol className="space-y-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="meta mt-0.5 shrink-0">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-[14px] font-semibold">{step.title}</span>
                  <span className="block text-[13.5px] leading-relaxed text-muted">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <p className="panel flex gap-2.5 p-4 text-[13px] leading-relaxed text-muted">
            <MonitorCheck className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
            Windows 10 и 11. Компонент WebView2 в Windows 11 уже есть.
          </p>
        </aside>
      </div>
    </section>
  );
}
