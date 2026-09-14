import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

type Tab = "single" | "monthly" | "halfyear";

export default function Packages() {
  const [tab, setTab] = useState<Tab>("single");

  return (
    <section id="packages" className="paper-bg section-seam relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime-soft/25 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-brand-700">
            <span>02</span>
            <span className="h-1 w-1 rounded-full bg-brand-700" />
            <span>Our Packages</span>
          </div>
          <h2 className="mt-5 text-4xl font-black leading-tight text-brand-800 md:text-5xl">
            健康<span className="hand-underline">直送餐桌</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-900/70 md:text-xl">
            揀選最適合你屋企嘅份量，由單次體驗到半年長訂，照顧不同需要。
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-brand-700/15 bg-white p-1 shadow-sm">
            {[
              { id: "single" as Tab, label: "單次體驗" },
              { id: "monthly" as Tab, label: "月訂菜包" },
              { id: "halfyear" as Tab, label: "半年訂購" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all md:px-7 md:text-base ${
                  tab === t.id
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                    : "text-brand-700 hover:bg-brand-500/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab panels */}
        <div className="mt-10">
          {tab === "single" && (
            <PackageCard
              title="單次體驗菜包"
              badge="歡迎試菜"
              badgeColor="bg-lime-soft/40 text-brand-800"
              desc="邊爐之友，適合首次試菜。"
              items={[
                { name: "3 斤", price: "$135 + $50 運費" },
                { name: "4 斤", price: "$180 + $50 運費" },
                { name: "5 斤", price: "$225 + $50 運費" },
                { name: "10 斤", price: "$450 + $50 運費" },
              ]}
              icon="🥬"
              accent="from-brand-500/10 to-lime-soft/10"
            />
          )}

          {tab === "monthly" && (
            <PackageCard
              title="月訂菜包"
              badge="已包運費"
              badgeColor="bg-brand-500/15 text-brand-700"
              desc="連續 4 星期，每星期配送一次。"
              items={[
                { name: "A ｜ 3 斤菜包 (4 次)", price: "$540" },
                { name: "B ｜ 4 斤菜包 (4 次)", price: "$720" },
                { name: "C ｜ 5 斤菜包 (4 次)", price: "$900" },
                { name: "D ｜ 10 斤菜包 (4 次)", price: "$1,500" },
              ]}
              icon="📦"
              accent="from-brand-500/15 to-brand-700/10"
              recommended
            />
          )}

          {tab === "halfyear" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-xl shadow-brand-800/10"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-8 text-paper md:p-12">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime-soft/20 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-5xl backdrop-blur">
                    🌱
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-bold uppercase tracking-widest backdrop-blur">
                      <span>★</span> 03 ｜ 半年訂購菜包
                    </div>
                    <h3 className="mt-2 text-2xl font-black md:text-3xl">長期訂購更划算</h3>
                    <p className="mt-2 max-w-md text-base text-paper/85 md:text-lg">
                      半年長訂享優惠價，穩定支持本地農業。詳情請 WhatsApp 查詢菜包。
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-6 md:grid-cols-3 md:p-10">
                {[
                  { icon: "💰", title: "更優惠價格", desc: "比月訂平均慳最多 15%" },
                  { icon: "🚚", title: "固定配送", desc: "預先安排每週送貨時間" },
                  { icon: "🌾", title: "支持本地", desc: "持續支持本地有機農夫" },
                ].map((b) => (
                  <div key={b.title} className="rounded-2xl bg-paper-2 p-5">
                    <div className="text-2xl">{b.icon}</div>
                    <div className="mt-2 text-base font-bold text-brand-800">{b.title}</div>
                    <div className="mt-1 text-sm text-brand-900/60">{b.desc}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-700/10 bg-paper-2/50 p-6 md:flex md:items-center md:justify-between md:p-10">
                <div>
                  <div className="text-base font-bold text-brand-800">價格及安排</div>
                  <div className="text-base text-brand-900/60">請聯絡 WhatsApp 查詢。</div>
                </div>
                <a
                  href="https://wa.me/85290881857"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-base font-bold text-white shadow-md shadow-brand-500/30 transition-all hover:bg-brand-600 md:mt-0"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.6 1.1 2.8.1.2 1.8 2.7 4.4 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.3L2 22l4.8-1.5c1.5.9 3.3 1.4 5.2 1.4 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.7 0-3.4-.5-4.8-1.4l-.3-.2-2.9.9.9-2.8-.2-.4c-1-1.5-1.5-3.2-1.5-5 0-4.9 4-8.8 8.8-8.8s8.8 4 8.8 8.8-3.9 8.9-8.8 8.9z"/>
                  </svg>
                  WhatsApp 查詢菜包
                </a>
              </div>
            </motion.div>
          )}
        </div>

        {/* Mini FAQ */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            { q: "菜包有幾重？", a: "每個菜包以「斤」為單位，可選 3 斤至 10 斤不等，適合不同家庭人數。" },
            { q: "可以揀款式嗎？", a: "菜包按當造收成配搭，沒有固定菜單，保證新鮮與時令。" },
            { q: "可以暫停送貨嗎？", a: "月訂及半年訂購可於配送前一週通知暫停，請透過 WhatsApp 安排。" },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl border border-brand-700/10 bg-white p-5">
              <div className="text-base font-bold text-brand-800">Q. {f.q}</div>
              <div className="mt-2 text-base leading-relaxed text-brand-900/70">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface PackageCardProps {
  title: string;
  badge: string;
  badgeColor: string;
  desc: string;
  items: { name: string; price: string }[];
  icon: string;
  accent: string;
  recommended?: boolean;
}

function PackageCard({ title, badge, badgeColor, desc, items, icon, accent, recommended }: PackageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-brand-700/15 bg-white shadow-xl shadow-brand-800/10"
    >
      {/* Header */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${accent} p-6 md:p-8`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm text-3xl">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-black text-brand-800 md:text-2xl">{title}</h3>
              <p className="mt-1 text-base text-brand-900/70 md:text-lg">{desc}</p>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ${badgeColor}`}>
            {badge}
          </span>
        </div>
        {recommended && (
          <div className="absolute right-6 top-6 hidden rounded-full bg-brand-500 px-3 py-1 text-sm font-bold uppercase tracking-wider text-white shadow-md md:block">
            ⭐ 熱門選擇
          </div>
        )}
      </div>

      {/* Items */}
      <ul className="divide-y divide-brand-700/10">
        {items.map((it, i) => (
          <li
            key={it.name}
            className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-paper-2/50 md:px-8 md:py-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10 text-sm font-bold text-brand-700">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-base font-bold text-brand-800 md:text-lg">{it.name}</span>
            </div>
            <span className="text-lg font-extrabold text-brand-700 md:text-xl">{it.price}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-brand-700/10 bg-paper-2/50 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="text-sm text-brand-900/70 md:text-base">
          * 價錢以單一訂單計算，送貨範圍不包括離島。
        </div>
        <Link
          to="/order"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-base font-bold text-white shadow-md shadow-brand-500/30 transition-all hover:bg-brand-600"
        >
          立即訂購
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
