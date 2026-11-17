import { startTransition, useId, useState, ViewTransition } from "react";
import { ChevronDown, Download, RefreshCw } from "lucide-react";
import { LINKS } from "../lib/data";
import { useReleasesValue } from "../lib/ReleasesContext";
import { formatCount, formatDate, formatSize, type Release } from "../lib/releases";
import Clause from "./Clause";

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
          <code key={index} className="bg-white/8 px-1 text-[0.92em]">
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
  if (!text.trim()) return <p className="text-[13.5px] text-faint">Описание не добавлено.</p>;

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
          <h4 key={`h-${index}`} className="mt-3 font-sans text-[12.5px] font-medium text-faint">
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

  return (
    <li className="border-t border-white/10 py-4">
      <div className="flex flex-wrap items-start gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-w-0 flex-1 items-start gap-3 text-left"
        >
          <ChevronDown
            className={`mt-1 size-3.5 shrink-0 text-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
          <span className="min-w-0">
            <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="font-display text-[16px] font-semibold tabular-nums">v{release.version}</span>
              {isLatest ? <span className="text-[12px] text-[#b8a6ff]">последняя</span> : null}
              {release.prerelease ? <span className="text-[12px] text-amber">предварительная</span> : null}
            </span>
            <span className="mt-1 flex flex-wrap gap-x-3 text-[12.5px] tabular-nums text-faint">
              <time dateTime={release.date}>{formatDate(release.date)}</time>
              {release.asset ? <span>{formatSize(release.asset.size)}</span> : null}
              {release.asset ? <span>{formatCount(release.asset.downloads)} скачиваний</span> : null}
            </span>
          </span>
        </button>

        {release.asset ? (
          <button
            type="button"
            onClick={() => download(release)}
            className="inline-flex min-h-8 items-center gap-1.5 text-[13.5px] text-muted underline decoration-white/25 underline-offset-[5px] transition-colors duration-150 hover:text-text hover:decoration-white/60"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Скачать
          </button>
        ) : null}
      </div>

      <div className="accordion mt-2" data-open={open}>
        <div>
          <div id={panelId} className="pb-1 pl-[26px]">
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
    <Clause
      id="versions"
      number="04"
      label="Релизы"
      meta="github"
      title="Все версии"
      lead="Скачайте последнюю сборку или любую из предыдущих."
    >
      {status === "error" ? (
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="max-w-[58ch] text-[14px] leading-relaxed text-muted">
            Список версий не загрузился — возможно, GitHub недоступен. Кнопка «Скачать» всё равно откроет страницу последнего
            релиза.
          </p>
          <button
            type="button"
            onClick={() => void reload()}
            className="inline-flex min-h-8 items-center gap-1.5 text-[13.5px] text-muted underline decoration-white/25 underline-offset-[5px] transition-colors hover:text-text"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Обновить
          </button>
        </div>
      ) : null}

      {status === "empty" ? (
        <div>
          <p className="max-w-[58ch] text-[14.5px] leading-relaxed text-muted">
            Как только выйдет первая версия, она появится здесь, а кнопка «Скачать» начнёт загрузку автоматически. Новости — в
            Telegram-группе.
          </p>
          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[14px] text-cyan underline decoration-cyan/40 underline-offset-[5px]"
          >
            Открыть Telegram
          </a>
        </div>
      ) : null}

      {status === "loading" ? (
        <div className="space-y-3" aria-hidden="true">
          {[0, 1, 2].map((row) => (
            <div key={row} className="h-12 animate-pulse bg-white/5" />
          ))}
        </div>
      ) : null}

      {status === "ready" ? (
        <>
          <ol>
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
              className="mt-4 text-[13.5px] text-muted underline decoration-white/25 underline-offset-[5px] transition-colors hover:text-text"
            >
              {showAll ? "Свернуть" : `Показать все (${releases.length})`}
            </button>
          ) : null}
        </>
      ) : null}
    </Clause>
  );
}
