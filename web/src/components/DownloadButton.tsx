import { useState } from "react";
import { Check, Clock3, Download, Loader2 } from "lucide-react";
import { useReleasesValue } from "../lib/ReleasesContext";
import { formatSize } from "../lib/releases";

type Variant = "primary" | "compact";

interface Props {
  variant?: Variant;
  className?: string;
}

export function DownloadButton({ variant = "primary", className = "" }: Props) {
  const { latest, status, download } = useReleasesValue();
  const [feedback, setFeedback] = useState<"none" | "started" | "soon">("none");

  const loading = status === "loading";
  const empty = status === "empty" || (status === "ready" && !latest);

  const handleClick = () => {
    if (loading) return;
    if (download()) {
      setFeedback("started");
      window.setTimeout(() => setFeedback("none"), 6000);
    } else {
      setFeedback("soon");
    }
  };

  const label = loading
    ? "Проверяем версию…"
    : empty
      ? "Скоро в релизах"
      : feedback === "started"
        ? "Загрузка началась"
        : "Скачать для Windows";

  const Icon = loading ? Loader2 : empty ? Clock3 : feedback === "started" ? Check : Download;

  const styles =
    variant === "primary"
      ? "min-h-14 gap-3 rounded-[10px] bg-brand px-6 text-[17px] text-white hover:bg-brand-ink sm:px-7"
      : "min-h-11 gap-2 rounded-[9px] bg-brand px-4 text-sm text-white hover:bg-brand-ink";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`group inline-flex items-center justify-center font-semibold transition-[background-color,transform] duration-150 active:translate-y-px disabled:cursor-wait disabled:opacity-75 ${styles} ${className}`}
    >
      <Icon className={variant === "primary" ? "size-[18px] shrink-0" : "size-4 shrink-0"} aria-hidden="true" />
      <span>{label}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {feedback === "started" ? "Загрузка файла началась" : ""}
        {feedback === "soon" ? "Релизов пока нет" : ""}
      </span>
    </button>
  );
}

interface MetaProps {
  className?: string;
}

export function DownloadMeta({ className = "" }: MetaProps) {
  const { latest, status } = useReleasesValue();
  const version = latest ? `Версия ${latest.version}` : "";
  const size = latest?.asset ? formatSize(latest.asset.size) : "";

  const line = (() => {
    if (status === "loading") return "Заглядываем в список релизов…";
    if (status === "error" || !latest) return "Windows 10 и 11, установка не нужна";
    return [version, size, "Windows 10 и 11"].filter(Boolean).join(", ");
  })();

  return (
    <p className={`text-sm text-ink-faint [font-variant-numeric:tabular-nums] ${className}`}>
      {line}
      {latest || status === "loading" ? (
        <>
          <br />
          Бесплатно, без установки
        </>
      ) : null}
    </p>
  );
}
