import { useState } from "react";
import { Check, Clock3, Download, Loader2 } from "lucide-react";
import { useReleasesValue } from "../lib/ReleasesContext";
import { formatSize } from "../lib/releases";

type Variant = "primary" | "compact" | "icon";

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

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        aria-label={label}
        className={`grid size-11 place-items-center rounded-[10px] bg-brand text-white transition-colors duration-150 hover:bg-[#7c6dff] disabled:opacity-70 ${className}`}
      >
        <Icon className="size-[18px]" aria-hidden="true" />
        <Status announcement={feedback} />
      </button>
    );
  }

  const styles =
    variant === "primary"
      ? "min-h-12 gap-2.5 rounded-[10px] bg-brand px-5 text-[15.5px] text-white hover:bg-[#7c6dff]"
      : "min-h-10 gap-2 rounded-[9px] bg-brand px-3.5 text-[13.5px] text-white hover:bg-[#7c6dff]";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center justify-center font-semibold transition-[background-color,transform] duration-150 active:translate-y-px disabled:cursor-wait disabled:opacity-75 ${styles} ${className}`}
    >
      <Icon className={variant === "primary" ? "size-[17px] shrink-0" : "size-4 shrink-0"} aria-hidden="true" />
      <span>{label}</span>
      <Status announcement={feedback} />
    </button>
  );
}

function Status({ announcement }: { announcement: "none" | "started" | "soon" }) {
  return (
    <span className="sr-only" role="status" aria-live="polite">
      {announcement === "started" ? "Загрузка файла началась" : ""}
      {announcement === "soon" ? "Релизов пока нет" : ""}
    </span>
  );
}

export function DownloadMeta({ className = "" }: { className?: string }) {
  const { latest, status } = useReleasesValue();

  const line = (() => {
    if (status === "loading") return "Смотрим список релизов";
    if (status === "error" || !latest) return "Windows 10 и 11";
    return [`v${latest.version}`, latest.asset ? formatSize(latest.asset.size) : "", "Windows 10 и 11"].filter(Boolean).join("  ·  ");
  })();

  return (
    <p className={`meta ${className}`}>
      {line}
      {latest || status === "loading" ? "  ·  бесплатно, без установки" : ""}
    </p>
  );
}
