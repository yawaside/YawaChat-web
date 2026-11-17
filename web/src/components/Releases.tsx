import { startTransition, useId, useState, ViewTransition } from "react";
import { ChevronDown, Download, Package, RefreshCw } from "lucide-react";
import { LINKS } from "../lib/data";
import { useReleasesValue } from "../lib/ReleasesContext";
import { formatCount, formatDate, formatSize, type Release } from "../lib/releases";
import { DownloadButton, DownloadMeta } from "./DownloadButton";
import SectionHeading from "./SectionHeading";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

function Inline({ text }: { text: string }) {
  const parts = text.split(INLINE_PATTERN).filter(Boolean);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") ? (
          <strong key={index} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : part.startsWith("`") ? (
          <code key={index} className="rounded-[4px] bg-paper-2 px-1 text-[0.92em]">
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

function ReleaseNotes({ text }: { text: string }) {
  if (!text.trim()) return <p className="text-[15px] text-ink-faint">Описание не добавлено.</p>;

  const blocks: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (!list.length) return;
    const items = list;
    blocks.push(
      <ul key={`list-${blocks.length}`} className="my-2 list-disc space-y-1 pl-5">
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
      flushList();
      if (!line) return;
      if (/^#{1,6}\s+/.test(line)) {
        blocks.push(
          <h4 key={`h-${index}`} className="mt-4 font-sans text-[13px] font-semibold text-ink-faint">
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
  flushList();

  return <div className="text-[15px] leading-relaxed text-ink-soft">{blocks}</div>;
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
    <li className="py-5">
      <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-w-0 flex-1 items-start gap-3 text-left"
        >
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-display text-[20px] font-bold leading-none">v{release.version}</span>
              {isLatest ? (
                <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand-ink">последняя</span>
              ) : null}
              {release.prerelease ? (
                <span className="rounded-full bg-amber/10 px-2 py-0.5 text-[11px] font-semibold text-amber">предварительная</span>
              ) : null}
            </span>
            <span className="mt-1.5 block text-[13px] text-ink-faint [font-variant-numeric:tabular-nums]">
              <time dateTime={release.date}>{formatDate(release.date)}</time>
              {details.length ? `, ${details.join(", ")}` : ""}
            </span>
          </span>
          <ChevronDown
            className={`ml-auto size-4 shrink-0 text-ink-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        {release.asset ? (
          <button
            type="button"
            onClick={() => download(release)}
            className="inline-flex min-h-10 items-center gap-2 rounded-[9px] border border-line bg-paper px-3.5 text-[14px] font-semibold text-ink transition-colors duration-150 hover:border-ink/25 hover:bg-paper-2"
          >
            <Download className="size-4" aria-hidden="true" />
            Скачать
          </button>
        ) : null}
      </div>

      <div className="accordion mt-3" data-open={open}>
        <div>
          <div id={panelId} className="pb-1">
            <ReleaseNotes text={release.notes} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Releases() {
  const { releases, latest, status, reload } = useReleasesValue();
  const [showAll, setShowAll] = useState(false);
  const shown = showAll ? releases : releases.slice(0, 5);

  return (
    <section id="releases" className="border-t border-line">
      <div className="wrap py-16 sm:py-24">
        <div className="max-w-[820px]">
          <SectionHeading
            title="Релизы"
            lead="Скачайте последнюю версию или любую из предыдущих. Все сборки собраны в одном месте."
          />

          <div className="mt-8">
            <DownloadButton variant="primary" />
            <DownloadMeta className="mt-3.5" />
          </div>

          {status === "loading" ? (
            <div className="mt-10 space-y-3" aria-hidden="true">
              {[0, 1, 2].map((row) => (
                <div key={row} className="h-16 animate-pulse rounded-[10px] bg-paper-2" />
              ))}
            </div>
          ) : null}

          {status === "error" ? (
            <div className="mt-10 rounded-[14px] bg-paper-2 p-6">
              <p className="text-[15px] text-ink-soft">
                Не удалось загрузить список версий — возможно, GitHub временно недоступен. Кнопка «Скачать» всё равно
                откроет страницу последнего релиза.
              </p>
              <button
                type="button"
                onClick={() => void reload()}
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-[9px] border border-line bg-paper px-4 text-[14px] font-semibold text-ink transition-colors duration-150 hover:bg-paper-2"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                Попробовать снова
              </button>
            </div>
          ) : null}

          {status === "empty" ? (
            <div className="mt-10 rounded-[14px] bg-paper-2 p-6">
              <Package className="size-6 text-ink-faint" aria-hidden="true" />
              <h3 className="mt-3 text-[19px]">Релизы скоро появятся</h3>
              <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft">
                Как только выйдет первая версия, она появится здесь, а кнопка «Скачать» начнёт загрузку автоматически.
                Новости — в Telegram-группе.
              </p>
              <a
                href={LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-10 items-center rounded-[9px] bg-ink px-4 text-[14px] font-semibold text-paper transition-colors duration-150 hover:bg-night-2"
              >
                Открыть Telegram
              </a>
            </div>
          ) : null}

          {status === "ready" ? (
            <>
              <ol className="mt-8 divide-y divide-line border-y border-line">
                {shown.map((release) => (
                  <ViewTransition key={release.id} enter="vt-soft">
                    <ReleaseRow release={release} isLatest={latest?.id === release.id} />
                  </ViewTransition>
                ))}
              </ol>

              {releases.length > 5 ? (
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => startTransition(() => setShowAll((value) => !value))}
                    className="min-h-10 rounded-[9px] border border-line px-4 text-[14px] font-semibold text-ink transition-colors duration-150 hover:bg-paper-2"
                  >
                    {showAll ? "Свернуть" : `Показать все версии (${releases.length})`}
                  </button>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
