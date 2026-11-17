import { createContext, use, type ReactNode } from "react";
import { useReleases } from "./releases";

type ReleasesValue = ReturnType<typeof useReleases>;

const ReleasesContext = createContext<ReleasesValue | null>(null);

export function ReleasesProvider({ children }: { children: ReactNode }) {
  const value = useReleases();
  return <ReleasesContext value={value}>{children}</ReleasesContext>;
}

/** Доступ к данным о релизах. Провайдер — единственное место, которое знает, откуда они берутся. */
export function useReleasesValue() {
  const value = use(ReleasesContext);
  if (!value) throw new Error("useReleasesValue должен вызываться внутри ReleasesProvider");
  return value;
}
