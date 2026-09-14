import { useSyncExternalStore } from "react";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const KEY = "yzd_gallery_v1";

export const DEFAULT_GALLERY: GalleryImage[] = [
  { id: "d1", src: "/VegToDoor/images/farm.jpg", alt: "農場全景" },
  { id: "d2", src: "/VegToDoor/images/farmer.jpg", alt: "農夫採收" },
  { id: "d3", src: "/VegToDoor/images/veg1.jpg", alt: "時令蔬菜" },
  { id: "d4", src: "/VegToDoor/images/veg4.jpg", alt: "新鮮採摘" },
  { id: "d5", src: "/VegToDoor/images/veg5.jpg", alt: "清洗蔬菜" },
  { id: "d6", src: "/VegToDoor/images/veg3.jpg", alt: "蔬菜菜籃" },
];

let cache: GalleryImage[] = load();
const listeners = new Set<() => void>();

function load(): GalleryImage[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_GALLERY;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed as GalleryImage[];
  } catch {
    /* ignore */
  }
  return DEFAULT_GALLERY;
}

function persist(list: GalleryImage[]) {
  cache = list;
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage full — keep in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cache;
}

export function useGallery() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function addImages(items: GalleryImage[]) {
  persist([...items, ...cache].slice(0, 24));
}

export function removeImage(id: string) {
  persist(cache.filter((i) => i.id !== id));
}

export function resetGallery() {
  persist(DEFAULT_GALLERY);
}

/** Downscale + compress an uploaded file to a data URL so it fits in localStorage. */
export function fileToCompressedDataUrl(file: File, maxSize = 1400, quality = 0.78): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("讀取檔案失敗"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("圖片格式不支援"));
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("無法處理圖片"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
