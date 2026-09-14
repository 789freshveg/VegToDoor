import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  addImages,
  fileToCompressedDataUrl,
  removeImage,
  resetGallery,
  useGallery,
} from "../lib/gallery";

export default function Admin() {
  const gallery = useGallery();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setMsg(null);
    const added: { id: string; src: string; alt: string }[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      try {
        const src = await fileToCompressedDataUrl(file);
        added.push({
          id: `u${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          src,
          alt: file.name.replace(/\.[^.]+$/, ""),
        });
      } catch {
        /* skip broken file */
      }
    }
    if (added.length) {
      addImages(added);
      setMsg(`已上載 ${added.length} 張相片。`);
    } else {
      setMsg("未能上載相片，請選擇 JPG 或 PNG 檔案。");
    }
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <main className="white-bg min-h-screen pt-24 md:pt-28">
      <div className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base font-semibold text-brand-700 transition-colors hover:text-brand-500"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          返回首頁
        </Link>

        <h1 className="mt-6 text-3xl font-black text-brand-800 md:text-4xl">管理相片</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-900/70 md:text-lg">
          上載農場、蔬菜及配送相片，首 6 張會顯示於「關於有種直送」的相片牆（2 × 3）。
          相片會自動壓縮並儲存於瀏覽器內。
        </p>

        {/* Upload box */}
        <label className="mt-8 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-brand-700/25 bg-cream px-6 py-12 text-center transition-colors hover:border-brand-500 hover:bg-brand-500/5">
          <span className="text-4xl">📷</span>
          <span className="text-lg font-bold text-brand-800">
            {busy ? "處理中…" : "按此選擇相片"}
          </span>
          <span className="text-sm text-brand-700/70">支援 JPG / PNG，可一次選擇多張</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {msg && (
          <div className="mt-4 rounded-xl border border-brand-700/15 bg-brand-500/10 px-4 py-3 text-base font-semibold text-brand-800">
            {msg}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              resetGallery();
              setMsg("已還原預設相片。");
            }}
            className="rounded-full border border-brand-700/20 bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition-all hover:bg-brand-500 hover:text-white"
          >
            還原預設相片
          </button>
          <span className="text-sm text-brand-700/70">現時共 {gallery.length} 張相片</span>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((g) => (
            <div
              key={g.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-700/10 bg-white shadow-sm"
            >
              <img src={g.src} alt={g.alt} className="h-full w-full object-cover" />
              <button
                onClick={() => removeImage(g.id)}
                className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="刪除相片"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6l12 12M6 18L18 6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
