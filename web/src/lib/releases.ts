import { useCallback, useEffect, useState } from "react";

const API = "https://api.github.com/repos/yawaside/yawachat-Releases/releases?per_page=30";
// Запасной вариант, если API недоступен: страница «последний релиз» сама перенаправит на актуальную версию.
const FALLBACK = "https://github.com/yawaside/yawachat-Releases/releases/latest";
const CACHE_KEY = "yawachat-releases-v1";
const CACHE_TTL = 5 * 60 * 1000;

export interface Asset {
  name: string;
  size: number;
  url: string;
  downloads: number;
}

export interface Release {
  id: number;
  version: string;
  title: string;
  date: string;
  notes: string;
  prerelease: boolean;
  asset: Asset | null;
}

type Status = "loading" | "ready" | "empty" | "error";

interface RawAsset {
  name: string;
  size: number;
  browser_download_url: string;
  download_count: number;
}
interface RawRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  published_at: string | null;
  created_at: string;
  assets: RawAsset[];
}

function pickAsset(assets: RawAsset[]): Asset | null {
  if (!assets?.length) return null;
  const rank = (n: string) => {
    const s = n.toLowerCase();
    if (s.endsWith(".exe")) return 0;
    if (s.endsWith(".msi")) return 1;
    if (s.endsWith(".zip")) return 2;
    return 3;
  };
  const sorted = [...assets].sort((a, b) => rank(a.name) - rank(b.name));
  const a = sorted[0];
  return { name: a.name, size: a.size, url: a.browser_download_url, downloads: a.download_count };
}

function normalize(raw: RawRelease[]): Release[] {
  return raw
    .filter((r) => !r.draft)
    .map((r) => ({
      id: r.id,
      version: r.tag_name.replace(/^v/i, ""),
      title: r.name || r.tag_name,
      date: r.published_at || r.created_at,
      notes: r.body || "",
      prerelease: r.prerelease,
      asset: pickAsset(r.assets),
    }));
}

export function formatSize(bytes: number) {
  if (!bytes) return "";
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? `${mb.toFixed(mb >= 100 ? 0 : 1)} МБ` : `${Math.round(bytes / 1024)} КБ`;
}

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return "";
  }
}

/** Запускает скачивание файла без перехода на другую страницу. */
export function startDownload(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => a.remove(), 1000);
}

export function useReleases() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { t, data } = JSON.parse(cached) as { t: number; data: Release[] };
        if (Date.now() - t < CACHE_TTL && data.length) {
          setReleases(data);
          setStatus("ready");
          return;
        }
      }
    } catch {
      /* ignore */
    }
    try {
      const res = await fetch(API, { headers: { Accept: "application/vnd.github+json" } });
      if (!res.ok) throw new Error(String(res.status));
      const data = normalize((await res.json()) as RawRelease[]);
      setReleases(data);
      if (!data.length) {
        setStatus("empty");
        return;
      }
      setStatus("ready");
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const latest = releases.find((r) => !r.prerelease && r.asset) ?? releases.find((r) => r.asset) ?? null;

  /** Скачивает последний релиз сразу. Возвращает false, если скачивать пока нечего. */
  const download = useCallback(
    (release?: Release | null) => {
      const target = release ?? latest;
      if (target?.asset) {
        startDownload(target.asset.url);
        return true;
      }
      if (status === "error") {
        window.location.href = FALLBACK;
        return true;
      }
      return false;
    },
    [latest, status],
  );

  return { releases, latest, status, download, reload: load };
}
