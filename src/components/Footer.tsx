export default function Footer() {
  return (
    <footer className="soil-bg relative overflow-hidden text-paper">
      <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <div className="grid items-center gap-6 md:grid-cols-12">
          {/* Brand */}
          <div className="flex items-center gap-3 md:col-span-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 shadow-md">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c-2 3-4 5-4 8a4 4 0 0 0 8 0c0-3-2-5-4-8z" />
                <path d="M12 14v8" />
                <path d="M9 19c0-2 1.5-3 3-3s3 1 3 3" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-lg font-black tracking-tight">有種直送</div>
              <div className="text-sm text-paper/60">You Zhong Direct · From Farm To Table</div>
            </div>
          </div>

          {/* Times */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-paper/85 md:col-span-4 md:text-base">
            <span>
              <span className="text-paper/55">截單 </span>
              <span className="font-bold">星期一 晚上 8:00</span>
            </span>
            <span className="hidden h-4 w-px bg-paper/25 md:inline" />
            <span>
              <span className="text-paper/55">配送 </span>
              <span className="font-bold">星期三 11:00–17:00</span>
            </span>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap items-center gap-3 md:col-span-3 md:justify-end">
            {[
              { name: "Instagram", href: "https://www.instagram.com/", icon: <InstagramIcon /> },
              { name: "Facebook", href: "https://www.facebook.com/", icon: <FacebookIcon /> },
              { name: "YouTube", href: "https://www.youtube.com/", icon: <YoutubeIcon /> },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                title={s.name}
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-paper/25 bg-paper/10 text-lime-soft transition-all hover:scale-105 hover:bg-lime-soft hover:text-brand-900"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-paper/15 pt-4 text-center text-xs text-paper/55 md:text-sm">
          © {new Date().getFullYear()} 有種直送 You Zhong Direct · 時令鮮菜，直送你的餐桌 · Made with 🌱 in Hong Kong
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5C.5 9.4.5 12 .5 12s0 2.6.4 4.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-4.5.4-4.5s0-2.6-.4-4.5zM10 15.5v-7l6 3.5-6 3.5z"/>
    </svg>
  );
}
