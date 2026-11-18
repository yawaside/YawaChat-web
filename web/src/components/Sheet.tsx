import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { X } from "lucide-react";

interface Props {
  number: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Мини-страница поверх главной: панель с отступами, основной сайт остаётся виден по краям.
 */
export default function Sheet({ number, title, onClose, children }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      restoreRef.current?.focus?.();
    };
  }, [onClose]);

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes?.length) return;
    const list = Array.from(nodes).filter((node) => node.offsetParent !== null);
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-3 pb-3 pt-[68px] sm:px-6 sm:pb-6 sm:pt-[82px]">
      <div
        className="absolute inset-0 bg-[#04030a]/72 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={trapFocus}
        className="sheet-in relative flex w-full max-w-[1060px] flex-col overflow-hidden rounded-[18px] border border-white/12 bg-[#0b0817] shadow-[0_48px_120px_-40px_rgba(0,0,0,0.95)] focus:outline-none"
      >
        <header className="flex items-start gap-5 border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
          <div className="min-w-0 flex-1">
            <p className="text-[12px] tabular-nums text-faint">{number}</p>
            <h2 id={titleId} className="mt-1 text-[clamp(1.25rem,2.6vw,1.8rem)]">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть раздел"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/12 text-muted transition-colors duration-150 hover:bg-white/8 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            <X className="size-4.5" aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8 sm:py-7">
          {children}
        </div>
      </div>
    </div>
  );
}
