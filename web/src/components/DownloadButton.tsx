import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Clock3, Download, Loader2 } from "lucide-react";
import { useReleasesValue } from "../lib/ReleasesContext";
import { EDITIONS, EDITION_ORDER, formatSize, RELEASES_PAGE, type Edition } from "../lib/releases";

type Variant = "primary" | "compact";

interface Props {
  variant?: Variant;
  className?: string;
}

const FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

/**
 * Кнопка скачивания с подменю: в релизе две сборки — портативная и установщик.
 * Нажатие открывает выбор, пункт меню запускает загрузку файла.
 */
export function DownloadButton({ variant = "primary", className = "" }: Props) {
  const { latest, status, download } = useReleasesValue();
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<"none" | "started">("none");
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<HTMLButtonElement[]>([]);
  const menuId = useId();

  const loading = status === "loading";
  const empty = status === "empty" || (status === "ready" && !latest);
  const editions = latest ? EDITION_ORDER.filter((edition) => latest.assets[edition]) : [];
  const hasMenu = editions.length > 0;

  useEffect(() => {
    if (!open) return;
    itemsRef.current[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open]);

  const handleMainClick = () => {
    if (loading) return;
    if (hasMenu) {
      setOpen((value) => !value);
      return;
    }
    if (empty) {
      window.location.href = RELEASES_PAGE;
      return;
    }
    download();
  };

  const choose = (edition: Edition) => {
    setOpen(false);
    if (download(undefined, edition)) {
      setFeedback("started");
      window.setTimeout(() => setFeedback("none"), 6000);
    }
  };

  const label = loading
    ? "Проверяем версию…"
    : empty
      ? "Релизов пока нет"
      : feedback === "started"
        ? "Загрузка началась"
        : variant === "compact"
          ? "Скачать"
          : "Скачать для Windows";

  const Icon = loading ? Loader2 : empty ? Clock3 : feedback === "started" ? Check : Download;

  const shell =
    variant === "primary"
      ? "min-h-[54px] gap-2.5 rounded-full bg-violet px-6 text-[15.5px] hover:bg-[#6544e6]"
      : "min-h-10 gap-2 rounded-full bg-violet px-4 text-[13.5px] hover:bg-[#6544e6]";

  const menuSide = variant === "primary" ? "left-0" : "right-0";

  return (
    <div ref={wrapRef} className={`relative inline-flex ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleMainClick}
        aria-haspopup={hasMenu ? "menu" : undefined}
        aria-expanded={hasMenu ? open : undefined}
        aria-controls={hasMenu ? menuId : undefined}
        disabled={loading}
        className={`inline-flex w-full items-center justify-center font-semibold text-white transition-[background-color,transform] duration-150 active:translate-y-px disabled:cursor-wait disabled:opacity-75 ${shell} ${FOCUS_RING}`}
      >
        <Icon className={variant === "primary" ? "size-[18px] shrink-0" : "size-4 shrink-0"} aria-hidden="true" />
        <span>{label}</span>
        {hasMenu ? (
          <ChevronDown
            className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""} ${
              variant === "primary" ? "size-[18px] -mr-1" : "size-4"
            }`}
            aria-hidden="true"
          />
        ) : null}
      </button>

      {open && hasMenu && latest ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Выберите сборку"
          className={`absolute top-[calc(100%+10px)] ${menuSide} z-50 w-[min(344px,calc(100vw-2.5rem))] overflow-hidden rounded-[14px] border border-white/12 bg-[#120d22] text-left shadow-[0_28px_70px_-24px_rgba(0,0,0,0.95)]`}
        >
          {editions.map((edition, index) => {
            const asset = latest.assets[edition];
            return (
              <button
                key={edition}
                ref={(node) => {
                  if (node) itemsRef.current[index] = node;
                }}
                type="button"
                role="menuitem"
                onClick={() => choose(edition)}
                className="flex w-full items-start gap-3 border-b border-white/8 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-white/8 focus-visible:bg-white/8 focus-visible:outline-none"
              >
                <Download className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[14.5px] font-semibold text-text">{EDITIONS[edition].label}</span>
                    <span className="shrink-0 text-[12.5px] tabular-nums text-faint">
                      {asset ? formatSize(asset.size) : ""}
                    </span>
                  </span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">{EDITIONS[edition].hint}</span>
                  <span className="sr-only">{asset?.name}</span>
                </span>
              </button>
            );
          })}
          <p className="px-4 py-2.5 text-[12px] text-faint">
            Версия {latest.version} —{" "}
            <a
              href={RELEASES_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline decoration-white/25 underline-offset-4 transition-colors hover:text-text"
            >
              все версии
            </a>
          </p>
        </div>
      ) : null}

      <span className="sr-only" role="status" aria-live="polite">
        {feedback === "started" ? "Загрузка файла началась" : ""}
      </span>
    </div>
  );
}

export function DownloadMeta({ className = "" }: { className?: string }) {
  const { latest, status } = useReleasesValue();

  const line = (() => {
    if (status === "loading") return "Смотрим список релизов…";
    if (status === "empty") return "Первая сборка появится здесь же";
    if (status === "error" || !latest) return "Скачивание со страницы релизов";

    const sizes = EDITION_ORDER.filter((edition) => latest.assets[edition]).map((edition) => {
      const asset = latest.assets[edition];
      return `${EDITIONS[edition].short.toLowerCase()} ${asset ? formatSize(asset.size) : ""}`.trim();
    });

    const base = `v${latest.version}`;
    return sizes.length ? `${base} — ${sizes.join(", ")}` : base;
  })();

  return (
    <p className={`text-[13.5px] text-faint [font-variant-numeric:tabular-nums] ${className}`}>{line}</p>
  );
}
