import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { asset } from "../lib/asset";

/* ─── Instagram config ─────────────────────────────────────────────
 * Your public profile. Every tile / button links here by default.
 */
const IG_USERNAME = "789.catdogcat";
const IG_PROFILE_URL = `https://www.instagram.com/${IG_USERNAME}/`;

/* To show the REAL latest 8 posts automatically, paste an Instagram
 * access token below (leave "" to use the curated preview instead).
 *
 * How to get one (≈5 min, free):
 *  1. developers.facebook.com → 建立 App → 加入「Instagram API with Instagram Login」
 *  2. Graph API Explorer → 選取你的 App → 權限勾選 instagram_basic → 產生 Token
 *  3. 換成長期 Token（60 日）：
 *     https://graph.instagram.com/access_token?grant_type=ig_exchange_token
 *       &client_secret=你的APP_SECRET&access_token=剛才的TOKEN
 *  4. 貼上引號內即可，網站會自動拉取最新貼文；失敗時自動回落到預覽圖。
 */
const INSTAGRAM_ACCESS_TOKEN = "";

interface Tile {
  img: string;
  caption: string;
  href: string;
  isVideo?: boolean;
  live?: boolean;
}

/* Curated fallback tiles — always link to the real profile. */
const FALLBACK_TILES: Tile[] = [
  { img: "/images/veg1.jpg", caption: "今季第一造菜心，新鮮採摘 ☀️", href: IG_PROFILE_URL },
  { img: "/images/veg2.jpg", caption: "芥蘭當造，爽甜無渣", href: IG_PROFILE_URL },
  { img: "/images/veg3.jpg", caption: "農場直送到家 📦", href: IG_PROFILE_URL },
  { img: "/images/veg4.jpg", caption: "本地農夫嘅心血，每一棵都係故事", href: IG_PROFILE_URL },
  { img: "/images/veg5.jpg", caption: "今期菜包開箱 🥬", href: IG_PROFILE_URL },
  { img: "/images/veg6.jpg", caption: "清晨嘅農場，露水仲未乾", href: IG_PROFILE_URL },
  { img: "/images/farm.jpg", caption: "香港仲有好多有心種嘅人", href: IG_PROFILE_URL },
  { img: "/images/farmer.jpg", caption: "農夫阿權同佢嘅芥蘭 🌱", href: IG_PROFILE_URL },
];

interface IgMedia {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  media_type?: string;
}

async function fetchLivePosts(): Promise<Tile[]> {
  const fields = "id,caption,media_url,thumbnail_url,permalink,media_type";
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=8&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`IG API ${res.status}`);
  const json = (await res.json()) as { data?: IgMedia[] };
  const tiles: Tile[] = [];
  for (const m of json.data ?? []) {
    const isVideo = m.media_type === "VIDEO" || m.media_type === "REELS";
    const img = isVideo ? m.thumbnail_url ?? m.media_url : m.media_url;
    if (!img) continue;
    tiles.push({
      img,
      caption: m.caption?.split("\n")[0] ?? "睇吓我哋嘅最新貼文",
      href: m.permalink ?? IG_PROFILE_URL,
      isVideo,
      live: true,
    });
    if (tiles.length >= 8) break;
  }
  if (tiles.length === 0) throw new Error("empty");
  return tiles;
}

export default function Seasonal() {
  const [tiles, setTiles] = useState<Tile[]>(FALLBACK_TILES);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!INSTAGRAM_ACCESS_TOKEN) return;
    let alive = true;
    fetchLivePosts()
      .then((t) => {
        if (!alive) return;
        setTiles(t);
        setIsLive(true);
      })
      .catch(() => {
        /* keep fallback tiles */
      });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="seasonal" className="white-bg section-seam relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime-soft/25 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-brand-700">
            <span>01</span>
            <span className="h-1 w-1 rounded-full bg-brand-700" />
            <span>Seasonal Fresh</span>
          </div>
          <h2 className="mt-5 text-4xl font-black leading-tight text-brand-800 md:text-5xl">
            回歸食物本質，<br className="md:hidden" />
            <span className="hand-underline">食得安心健康</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-900/70 md:text-xl">
            每個菜包最少包括 <span className="font-bold text-brand-700">3 款時令蔬菜</span>，
            由農場按當造收成搭配。季節會變，收成會變，我們把每季時令蔬菜交到你手上。
            <span className="font-semibold text-brand-700">沒有固定菜單。</span>
          </p>

          {/* Live handle chip — taps straight to the account */}
          <a
            href={IG_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-700/20 bg-white px-4 py-2 text-base font-bold text-brand-700 shadow-sm transition-all hover:scale-105 hover:border-brand-500 hover:bg-brand-500 hover:text-white"
          >
            <InstagramIcon />
            @{IG_USERNAME}
            {isLive && (
              <span className="flex items-center gap-1 text-sm font-semibold text-brand-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
                最新貼文
              </span>
            )}
          </a>

          <p className="mt-4 text-sm italic text-brand-700/70 md:text-base">
            * 菜包會按農場當造收成及供應情況配搭，實際內容或會因天氣與收成而調整。
            菜包詳情請留意 Instagram 及 Facebook。
          </p>
        </div>

        {/* Instagram grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 md:grid-cols-4 md:gap-5">
          {tiles.map((p, i) => (
            <motion.a
              key={`${p.href}-${i}`}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-lift group relative aspect-square overflow-hidden rounded-2xl border border-brand-700/10 bg-white shadow-sm"
            >
              <img
                src={p.live ? p.img : asset(p.img)}
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Video badge */}
              {p.isVideo && (
                <span className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur">
                  <svg className="h-4 w-4 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-900/90 via-brand-900/30 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-4">
                <p className="line-clamp-2 text-sm font-medium text-white md:text-base">
                  {p.caption}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-lime-soft">
                  在 Instagram 觀看
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </div>
              </div>

              {/* Instagram icon corner */}
              <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-sm transition-opacity duration-300 group-hover:opacity-100 md:opacity-0">
                <InstagramIcon />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA + socials — mobile stacked / desktop split */}
        <div className="mt-12">
          {/* Mobile: row 1 = 查看更多 */}
          <div className="flex justify-center md:hidden">
            <a
              href={IG_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-base font-bold text-paper shadow-lg shadow-brand-700/20 transition-all hover:bg-brand-800 hover:shadow-xl"
            >
              查看更多
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile: row 2 = 追蹤我們 */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:hidden">
            <span className="w-full text-center text-base font-semibold text-brand-800/80">
              追蹤我們
            </span>
            <SocialPill label="Instagram" icon={<InstagramIcon />} href={IG_PROFILE_URL} />
            <SocialPill label="Facebook" icon={<FacebookIcon />} href="https://www.facebook.com/" />
            <SocialPill label="YouTube" icon={<YoutubeIcon />} href="https://www.youtube.com/" />
          </div>

          {/* Desktop: 追蹤我們 (left) — 查看更多 (right) */}
          <div className="hidden items-center justify-between gap-6 md:flex">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-base font-bold text-brand-800/80">追蹤我們：</span>
              <SocialPill label="Instagram" icon={<InstagramIcon />} href={IG_PROFILE_URL} />
              <SocialPill label="Facebook" icon={<FacebookIcon />} href="https://www.facebook.com/" />
              <SocialPill label="YouTube" icon={<YoutubeIcon />} href="https://www.youtube.com/" />
            </div>
            <a
              href={IG_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-base font-bold text-paper shadow-lg shadow-brand-700/20 transition-all hover:bg-brand-800 hover:shadow-xl md:text-lg"
            >
              查看更多
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialPill({ label, icon, href }: { label: string; icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full border border-brand-700/20 bg-white px-5 py-3 font-semibold text-brand-700 transition-all hover:scale-105 hover:border-brand-500 hover:bg-brand-500 hover:text-white"
    >
      <span className="h-5 w-5">{icon}</span>
      {label}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5C.5 9.4.5 12 .5 12s0 2.6.4 4.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-4.5.4-4.5s0-2.6-.4-4.5zM10 15.5v-7l6 3.5-6 3.5z"/>
    </svg>
  );
}
