import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const links = [
  { id: "seasonal", label: "時令鮮菜" },
  { id: "packages", label: "菜包款式" },
  { id: "delivery", label: "運送安排" },
  { id: "order", label: "如何訂購" },
  { id: "about", label: "關於我們" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const go = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(id), 150);
    } else {
      scrollToId(id);
    }
  };

  const goHome = () => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-brand-700/10 bg-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2.5 md:px-8 md:py-3">
        <button
          onClick={goHome}
          className="group flex items-center gap-2.5 text-left"
          aria-label="返回首頁"
        >
          <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 shadow-md shadow-brand-700/20 transition-transform group-hover:rotate-12">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c-2 3-4 5-4 8a4 4 0 0 0 8 0c0-3-2-5-4-8z" />
              <path d="M12 14v8" />
              <path d="M9 19c0-2 1.5-3 3-3s3 1 3 3" />
            </svg>
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="text-xl font-black tracking-tight text-brand-800">有種直送</span>
            <span className="mt-1 text-xs font-medium text-brand-700/75">You Zhong · Direct From Farm</span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="text-base font-medium text-brand-800/80 transition-colors hover:text-brand-500"
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/order"
            onClick={() => setOpen(false)}
            className="rounded-full bg-brand-500 px-5 py-2.5 text-base font-semibold text-white shadow-md shadow-brand-500/30 transition-all hover:bg-brand-600 hover:shadow-lg"
          >
            立即訂購
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 text-brand-700"
          aria-label="選單"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-brand-700/10 bg-cream transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="rounded-lg px-3 py-3 text-left text-base font-medium text-brand-800 transition-colors hover:bg-brand-500/10"
            >
              {l.label}
            </button>
          ))}
          <Link
            to="/order"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-center text-base font-semibold text-white"
          >
            立即訂購
          </Link>
        </nav>
      </div>
    </header>
  );
}
