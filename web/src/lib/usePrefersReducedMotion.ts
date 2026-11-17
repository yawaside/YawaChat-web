import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** Пользователь попросил меньше движения в системе — декор не анимируем. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
