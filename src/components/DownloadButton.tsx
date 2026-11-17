import { useState } from "react";
import { CheckCircle2, Download, Loader2, Clock } from "lucide-react";
import { useRel } from "../lib/ReleasesContext";
import { formatSize } from "../lib/releases";
import { cn } from "../utils/cn";

interface Props {
  size?: "md" | "lg";
  full?: boolean;
  showMeta?: boolean;
  className?: string;
}

export default function DownloadButton({ size = "lg", full, showMeta, className }: Props) {
  const { latest, status, download } = useRel();
  const [started, setStarted] = useState(false);
  const [soon, setSoon] = useState(false);

  const loading = status === "loading";
  const empty = status === "empty" || (status === "ready" && !latest);

  const onClick = () => {
    if (loading) return;
    const ok = download();
    if (ok) {
      setStarted(true);
      setSoon(false);
      setTimeout(() => setStarted(false), 6000);
    } else {
      setSoon(true);
    }
  };

  const meta = latest ? [`v${latest.version}`, latest.asset ? formatSize(latest.asset.size) : ""].filter(Boolean).join(" · ") : "";

  return (
    <div className={cn("flex flex-col", full ? "w-full" : "items-start", className)}>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className={cn(
          "grad-btn group relative inline-flex items-center justify-center gap-3 rounded-2xl font-bold text-[#0b0820] shadow-[0_10px_40px_-8px_rgba(139,92,246,0.7)] transition active:scale-[0.98] hover:brightness-110 hover:shadow-[0_14px_50px_-6px_rgba(139,92,246,0.9)] disabled:opacity-80 cursor-pointer disabled:cursor-wait",
          size === "lg" ? "min-h-14 px-7 text-base sm:text-lg" : "min-h-11 px-5 text-sm",
          full && "w-full",
        )}
      >
        {loading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : empty ? (
          <Clock className="size-5" />
        ) : started ? (
          <CheckCircle2 className="size-5" />
        ) : (
          <Download className="size-5 transition group-hover:translate-y-0.5" />
        )}
        <span className="flex flex-col items-start leading-tight text-left">
          <span>
            {loading ? "Проверяем версию…" : empty ? "Скоро в релизах" : started ? "Загрузка началась" : "Скачать для Windows"}
          </span>
          {size === "lg" && meta && !loading && !empty && (
            <span className="text-xs font-semibold opacity-70">{meta}</span>
          )}
        </span>
      </button>

      {showMeta && (
        <p className="mt-3 text-sm text-violet-200/60">
          {soon || empty
            ? "Первый релиз ещё готовится — загляните в Telegram, чтобы не пропустить."
            : "Бесплатно · Windows 10 и 11 · установка не нужна"}
        </p>
      )}
    </div>
  );
}
