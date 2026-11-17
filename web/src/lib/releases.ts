import { useCallback, useEffect, useState } from "react";

const API = "https://api.github.com/repos/yawaside/yawachat-Releases/releases?per_page=30";
/** Если API недоступен — страница «последний релиз» сама перенаправит на актуальную версию. */
const FALLBACK = "https://github.com/yawaside/yawachat-Releases/releases/latest";

const CACHE_KEY = "yawachat-releases-v2";
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

export type ReleasesStatus = "loading" | "ready" | "empty" | "error";

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

const dateFormat = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });
const sizeFormat = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });
const countFormat = new Intl.NumberFormat("ru-RU");

function pickAsset(assets: RawAsset[]): Asset | null {
  if (!assets?.length) return null;
  const rank = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.endsWith(".exe")) return 0;
    if (lower.endsWith(".msi")) return 1;
    if (lower.endsWith(".zip")) return 2;
    return 3;
  };
  let best = assets[0];
  for (const asset of assets) {
    if (rank(asset.name) < rank(best.name)) best = asset;
  }
  return { name: best.name, size: best.size, url: best.browser_download_url, downloads: best.download_count };
}

function normalize(raw: RawRelease[]): Release[] {
  const out: Release[] = [];
  for (const release of raw) {
    if (release.draft) continue;
    out.push({
      id: release.id,
      version: release.tag_name.replace(/^v/i, ""),
      title: release.name || release.tag_name,
      date: release.published_at || release.created_at,
      notes: release.body || "",
      prerelease: release.prerelease,
      asset: pickAsset(release.assets),
    });
  }
  return out;
}

export function formatDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : dateFormat.format(date);
}

export function formatSize(bytes: number) {
  if (!bytes) return "";
  const mb = bytes / 1024 / 1024;
  return mb >= 1 ? `${sizeFormat.format(mb)} МБ` : `${sizeFormat.format(bytes / 1024)} КБ`;
}

export function formatCount(count: number) {
  return countFormat.format(count);
}

/** Запускает скачивание файла, не уводя человека со страницы. */
export function startDownload(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => link.remove(), 1000);
}

function readCache(): Release[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { t, data } = JSON.parse(raw) as { t: number; data: Release[] };
    return Date.now() - t < CACHE_TTL && Array.isArray(data) && data.length ? data : null;
  } catch {
    return null;
  }
}

export function useReleases() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [status, setStatus] = useState<ReleasesStatus>("loading");

  const load = useCallback(async () => {
    setStatus("loading");

    const cached = readCache();
    if (cached) {
      setReleases(cached);
      setStatus("ready");
      return;
    }

    try {
      const response = await fetch(API, { headers: { Accept: "application/vnd.github+json" } });
      if (!response.ok) throw new Error(String(response.status));
      const data = normalize((await response.json()) as RawRelease[]);
      setReleases(data);
      setStatus(data.length ? "ready" : "empty");
      if (data.length) {
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data }));
        } catch {
          /* приватный режим — кэш не нужен */
        }
      }
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
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
