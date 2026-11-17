import { startTransition, useId, useState, ViewTransition } from "react";
import { ChevronDown, Download, Package, RefreshCw } from "lucide-react";
import { LINKS } from "../lib/data";
import { useReleasesValue } from "../lib/ReleasesContext";
import { formatCount, formatDate, formatSize, type Release } from "../lib/releases";
import SectionHead from "./SectionHead";

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

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
          <code key={index} className="rounded-[4px] bg-white/8 px-1 text-[0.92em]">
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
          <h4 key={`h-${index}`} className="mt-3 text-[13px] font-semibold text-faint">
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
              <span className="font-display text-[17px] font-bold [font-variant-numeric:tabular-nums]">
                v{release.version}
              </span>
              {isLatest ? (
                <span className="rounded-full bg-violet/25 px-2 py-0.5 text-[11px] font-medium text-[#cdc2ff]">
                  последняя
                </span>
              ) : null}
              {release.prerelease ? (
                <span className="rounded-full bg-amber/15 px-2 py-0.5 text-[11px] font-medium text-amber">
                  предварительная
                </span>
              ) : null}
            </span>
            <span className="mt-1 block text-[12.5px] text-faint [font-variant-numeric:tabular-nums]">
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
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-[13px] font-medium transition-colors duration-150 hover:bg-white/10"
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
    <section id="versions" className="wrap mt-20 sm:mt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHead label="Релизы" title="Все версии" lead="Скачайте последнюю сборку или любую из предыдущих." />
        {status === "error" ? (
          <button
            type="button"
            onClick={() => void reload()}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/15 px-3.5 text-[13px] font-medium text-muted transition-colors duration-150 hover:bg-white/10"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Обновить
          </button>
        ) : (
          <span className="text-[12.5px] text-faint">github · yawachat-Releases</span>
        )}
      </div>

      {status === "loading" ? (
        <div className="mt-7 space-y-2" aria-hidden="true">
          {[0, 1, 2].map((row) => (
            <div key={row} className="h-14 animate-pulse rounded-[14px] bg-white/5" />
          ))}
        </div>
      ) : null}

      {status === "error" ? (
        <p className="mt-6 max-w-[64ch] rounded-[16px] border border-line bg-bg-2/60 p-5 text-[14.5px] leading-relaxed text-muted">
          Список версий не загрузился — возможно, GitHub недоступен. Кнопка «Скачать» всё равно откроет страницу последнего
          релиза.
        </p>
      ) : null}

      {status === "empty" ? (
        <div className="mt-6 rounded-[16px] border border-line bg-bg-2/60 p-5">
          <Package className="size-5 text-faint" aria-hidden="true" />
          <h3 className="mt-2 text-[18px] font-bold">Релизы скоро появятся</h3>
          <p className="mt-1.5 max-w-[58ch] text-[14.5px] leading-relaxed text-muted">
            Как только выйдет первая версия, она появится здесь, а кнопка «Скачать» начнёт загрузку автоматически. Новости
            — в Telegram-группе.
          </p>
          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-9 items-center rounded-full border border-white/15 px-3.5 text-[13px] font-medium transition-colors duration-150 hover:bg-white/10"
          >
            Открыть Telegram
          </a>
        </div>
      ) : null}

      {status === "ready" ? (
        <>
          <ol className="mt-6 divide-y divide-line/80 border-y border-line/80">
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
              className="mt-4 min-h-9 rounded-full border border-white/15 px-3.5 text-[13px] font-medium transition-colors duration-150 hover:bg-white/10"
            >
              {showAll ? "Свернуть" : `Показать все (${releases.length})`}
            </button>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
