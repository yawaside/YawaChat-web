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
      ? "min-h-[54px] gap-2.5 rounded-full bg-violet px-7 text-[15.5px] hover:bg-[#6544e6]"
      : "min-h-10 gap-2 rounded-full bg-violet px-4 text-[13.5px] hover:bg-[#6544e6]";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center justify-center font-semibold text-white transition-[background-color,transform] duration-150 active:translate-y-px disabled:cursor-wait disabled:opacity-75 ${styles} ${className}`}
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

export function DownloadMeta({ className = "" }: { className?: string }) {
  const { latest, status } = useReleasesValue();

  const line = (() => {
    if (status === "loading") return "Смотрим список релизов…";
    if (status === "error" || !latest) return "Windows 10 и 11, без установки";
    return [`v${latest.version}`, latest.asset ? formatSize(latest.asset.size) : "", "Windows 10 и 11"]
      .filter(Boolean)
      .join(", ");
  })();

  return (
    <p className={`text-[13.5px] text-faint [font-variant-numeric:tabular-nums] ${className}`}>{line}</p>
  );
}
