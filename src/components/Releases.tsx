import { useState } from "react";
import { ChevronDown, Download, RefreshCw, Package } from "lucide-react";
import { SectionTitle } from "./Features";
import DownloadButton from "./DownloadButton";
import { useRel } from "../lib/ReleasesContext";
import { formatDate, formatSize, type Release } from "../lib/releases";
import { LINKS } from "../lib/data";

function inline(text: string, key: number) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <span key={key}>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <b key={i} className="text-white">
            {p.slice(2, -2)}
          </b>
        ) : p.startsWith("`") ? (
          <code key={i} className="rounded bg-white/10 px-1 text-[0.9em]">
            {p.slice(1, -1)}
          </code>
        ) : (
          p
        ),
      )}
    </span>
  );
}

function Notes({ text }: { text: string }) {
  const lines = text.replace(/\r/g, "").split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      const items = list;
      out.push(
        <ul key={`ul${out.length}`} className="my-2 list-disc space-y-1.5 pl-5">
          {items.map((l, i) => (
            <li key={i}>{inline(l, i)}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  lines.forEach((raw, i) => {
    const l = raw.trim();
    if (/^[-*]\s+/.test(l)) return list.push(l.replace(/^[-*]\s+/, ""));
    flush();
    if (!l) return;
    if (/^#{1,6}\s+/.test(l))
      out.push(
        <h4 key={i} className="mt-4 text-sm font-bold uppercase tracking-wide text-cyan-300/80">
          {l.replace(/^#{1,6}\s+/, "")}
        </h4>,
      );
    else out.push(<p key={i}>{inline(l, i)}</p>);
  });
  flush();
  return <div className="space-y-1 text-[15px] leading-relaxed text-violet-100/70">{out}</div>;
}

function Row({ r, isLatest, defaultOpen }: { r: Release; isLatest: boolean; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const { download } = useRel();
  return (
    <li className="glass overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center gap-3 p-4 sm:p-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-violet-500/20 text-violet-300">
            <Package className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-display text-base font-bold sm:text-lg">v{r.version}</span>
              {isLatest && (
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
                  Последняя
                </span>
              )}
              {r.prerelease && (
                <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                  Предварительная
                </span>
              )}
            </span>
            <span className="block text-xs text-white/50 sm:text-sm">{formatDate(r.date)}</span>
          </span>
          <ChevronDown className={`ml-auto size-5 shrink-0 text-white/40 transition ${open ? "rotate-180" : ""}`} />
        </button>

        {r.asset && (
          <button
            type="button"
            onClick={() => download(r)}
            className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-violet-300/30 bg-violet-500/15 px-4 text-sm font-bold text-violet-100 transition hover:bg-violet-500/30 sm:w-auto"
          >
            <Download className="size-4" />
            Скачать{r.asset.size ? ` · ${formatSize(r.asset.size)}` : ""}
          </button>
        )}
      </div>
      {open && (
        <div className="border-t border-white/10 px-4 py-4 sm:px-5">
          {r.notes.trim() ? <Notes text={r.notes} /> : <p className="text-sm text-white/50">Описание не добавлено.</p>}
        </div>
      )}
    </li>
  );
}

export default function Releases() {
  const { releases, latest, status, reload } = useRel();
  const [all, setAll] = useState(false);
  const shown = all ? releases : releases.slice(0, 5);

  return (
    <section id="releases" className="border-t border-white/10 bg-[#0e0a27]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionTitle
          kicker="Релизы"
          title={
            <>
              Все версии <span className="grad-text">YawaChat</span>
            </>
          }
          text="Всегда можно скачать последнюю версию или любую из предыдущих."
        />

        <div className="mb-8 flex justify-center">
          <DownloadButton showMeta className="items-center" />
        </div>

        {status === "loading" && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass h-[76px] animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="glass rounded-2xl p-6 text-center">
            <p className="text-violet-100/70">Не удалось загрузить список версий.</p>
            <button
              type="button"
              onClick={reload}
              className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-bold hover:bg-white/10"
            >
              <RefreshCw className="size-4" /> Повторить
            </button>
          </div>
        )}

        {status === "empty" && (
          <div className="glass rounded-2xl p-8 text-center">
            <Package className="mx-auto mb-3 size-8 text-violet-300" />
            <h3 className="text-lg font-bold">Релизы скоро появятся</h3>
            <p className="mt-2 text-violet-100/65">
              Как только выйдет первая версия, она появится здесь, а кнопка «Скачать» начнёт загрузку автоматически.
              Новости — в Telegram-группе.
            </p>
            <a
              href={LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-sky-500/20 px-5 text-sm font-bold text-sky-200 hover:bg-sky-500/30"
            >
              Открыть Telegram
            </a>
          </div>
        )}

        {status === "ready" && (
          <>
            <ul className="space-y-3">
              {shown.map((r, i) => (
                <Row key={r.id} r={r} isLatest={latest?.id === r.id} defaultOpen={i === 0} />
              ))}
            </ul>
            {releases.length > 5 && (
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => setAll((v) => !v)}
                  className="min-h-11 cursor-pointer rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-bold hover:bg-white/10"
                >
                  {all ? "Свернуть" : `Показать все (${releases.length})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
