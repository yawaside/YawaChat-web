import { createContext, useContext, type ReactNode } from "react";
import { useReleases } from "./releases";

type Ctx = ReturnType<typeof useReleases>;
const ReleasesCtx = createContext<Ctx | null>(null);

export function ReleasesProvider({ children }: { children: ReactNode }) {
  const value = useReleases();
  return <ReleasesCtx.Provider value={value}>{children}</ReleasesCtx.Provider>;
}

export function useRel() {
  const v = useContext(ReleasesCtx);
  if (!v) throw new Error("ReleasesProvider missing");
  return v;
}
