import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const FORM_URL = "https://form.jotform.com/262508546542056";
const MIN_FORM_HEIGHT = 3600;

/** Listens to Jotform's postMessage protocol so the iframe grows to fit the whole form. */
function useJotformAutoHeight() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_FORM_HEIGHT);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string" || !e.data.includes(":")) return;
      if (!/jotform/i.test(e.origin)) return;

      const [action, value] = e.data.split(":");
      if (action === "setHeight" || action === "setMinHeight") {
        const next = parseInt(value, 10);
        if (!Number.isNaN(next) && next > 0) {
          // Add padding so the submit button is never clipped.
          setHeight(Math.max(next + 120, MIN_FORM_HEIGHT));
        }
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return { iframeRef, height };
}

interface SummaryItem {
  icon: string;
  title: string;
  tag: string;
  tagColor: string;
  desc: string;
  layout?: "split" | "stacked";
  rows: { l: string; r: string }[];
}

const summaries: SummaryItem[] = [
  {
    icon: "🥬",
    title: "單次體驗",
    tag: "歡迎試菜",
    tagColor: "bg-lime-soft/40 text-brand-800",
    desc: "邊爐之友，適合首次試菜。",
    layout: "split",
    rows: [
      { l: "3 斤", r: "$135 + $50 運費" },
      { l: "4 斤", r: "$180 + $50 運費" },
      { l: "5 斤", r: "$225 + $50 運費" },
      { l: "10 斤", r: "$450 + $50 運費" },
    ],
  },
  {
    icon: "📦",
    title: "月訂菜包",
    tag: "已包運費",
    tagColor: "bg-brand-500/15 text-brand-700",
    desc: "連續 4 星期，每星期配送一次，最受歡迎方案。",
    layout: "split",
    rows: [
      { l: "A｜3 斤 (4 次)", r: "$540" },
      { l: "B｜4 斤 (4 次)", r: "$720" },
      { l: "C｜5 斤 (4 次)", r: "$900" },
      { l: "D｜10 斤 (4 次)", r: "$1,500" },
    ],
  },
  {
    icon: "🌱",
    title: "半年菜包",
    tag: "長期優惠",
    tagColor: "bg-brand-700/15 text-brand-800",
    desc: "長期訂購更划算，穩定支持本地農業。",
    layout: "stacked",
    rows: [
      { l: "價格及安排", r: "請 WhatsApp 商議" },
      { l: "配送安排", r: "與月訂相同（每週三）" },
    ],
  },
  {
    icon: "🚚",
    title: "送貨安排",
    tag: "港九新界",
    tagColor: "bg-khaki-light text-earth",
    desc: "星期一截單，星期三送貨。",
    layout: "stacked",
    rows: [
      { l: "截單時間", r: "星期一 晚上 8:00" },
      { l: "配送時間", r: "星期三 11:00–17:00" },
      { l: "配送範圍", r: "香港島／九龍／新界" },
    ],
  },
];

export default function OrderPage() {
  const { iframeRef, height } = useJotformAutoHeight();

  return (
    <main className="white-bg min-h-screen pt-24 md:pt-28">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-base font-semibold text-brand-700 transition-colors hover:text-brand-500"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          返回首頁
        </Link>

        {/* Header */}
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime-soft/25 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-brand-700">
            <span>Order Now</span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight text-brand-800 md:text-5xl">
            立即<span className="hand-underline">訂購</span>菜包
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-900/70 md:text-xl">
            揀好菜包，填寫訂購表格，完成付款，安排星期三送貨到家。
          </p>
        </div>

        {/* Summary boxes */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {summaries.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-lift flex flex-col overflow-hidden rounded-3xl border border-brand-700/10 bg-white shadow-md"
            >
              <div className="border-b border-brand-700/10 bg-paper-2/60 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                    {s.icon}
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-bold ${s.tagColor}`}>
                    {s.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-black text-brand-800">{s.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-brand-900/60">{s.desc}</p>
              </div>

              {s.layout === "stacked" ? (
                /* Stacked layout for 半年菜包 & 送貨安排: label top, value bottom to prevent narrow cramped columns */
                <ul className="flex-1 divide-y divide-brand-700/10">
                  {s.rows.map((r) => (
                    <li key={r.l} className="flex flex-col gap-1 px-5 py-3 text-base">
                      <span className="text-sm font-bold text-brand-700/80">{r.l}</span>
                      <span className="font-extrabold text-brand-800">{r.r}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                /* Split layout for 單次體驗 & 月訂菜包 */
                <ul className="flex-1 divide-y divide-brand-700/10">
                  {s.rows.map((r) => (
                    <li key={r.l} className="flex items-center justify-between gap-3 px-5 py-3 text-base">
                      <span className="font-semibold text-brand-800">{r.l}</span>
                      <span className="text-right font-bold text-brand-700">{r.r}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Order steps reminder */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-brand-700/10 bg-paper-2/50 px-6 py-5 text-center">
          <p className="text-base leading-relaxed text-brand-900/75 md:text-lg">
            💡 未確定方案？可以先
            <a
              href="https://wa.me/85290881857"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1 font-bold text-brand-700 underline decoration-lime-soft decoration-2 underline-offset-4 hover:text-brand-500"
            >
              WhatsApp 查詢菜包
            </a>
            ，了解更多再落單。
          </p>
        </div>

        {/* 訂購表格 embed - made taller and seamless */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 overflow-hidden rounded-3xl border border-brand-700/10 bg-white shadow-xl shadow-brand-800/10"
        >
          <div className="flex flex-col items-start justify-between gap-3 border-b border-brand-700/10 bg-brand-700 px-6 py-5 text-paper md:flex-row md:items-center md:px-8">
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-lime-soft">
                訂購表格
              </div>
              <h2 className="mt-1 text-2xl font-black md:text-3xl">填寫訂購資料</h2>
            </div>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-base font-bold backdrop-blur transition-all hover:bg-white/25"
            >
              於新視窗開啟表格
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </div>

          <div className="bg-paper-2/30 p-2 md:p-4">
            <iframe
              ref={iframeRef}
              title="有種直送 訂購表格"
              src={FORM_URL}
              className="w-full rounded-2xl bg-white"
              style={{ height: `${height}px`, border: "none" }}
              scrolling="no"
              loading="lazy"
            />
          </div>

          {/* Fallback if the embedded form is still clipped */}
          <div className="border-t border-brand-700/10 bg-paper-2/50 px-6 py-4 text-center md:px-8">
            <p className="text-sm text-brand-900/70 md:text-base">
              如表格未能完整顯示，請
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-1 font-bold text-brand-700 underline decoration-lime-soft decoration-2 underline-offset-4 hover:text-brand-500"
              >
                按此於新視窗開啟訂購表格
              </a>
              。
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
