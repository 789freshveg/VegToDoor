import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const seasonal = [
  "菜心",
  "芥蘭",
  "白菜仔",
  "西蘭花",
  "茄子",
  "番茄",
  "青瓜",
  "粟米",
  "番薯葉",
  "紅菜頭",
  "秋葵",
  "甘藍",
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Full-bleed background image — farm wide shot */}
      <div className="absolute inset-0">
        <img
          src="/images/farm.jpg"
          alt="香港本地農場"
          className="h-full w-full object-cover"
        />
        {/* Neutral dark mask only — no green tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-32 md:px-8 md:pb-16 md:pt-40">
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-banner" />
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-banner md:text-base">
              Seasonal · Local · Direct
            </span>
          </motion.div>

          {/* Brand + English subtitle, left aligned */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-5 text-5xl font-black leading-[1.02] tracking-tight text-white md:text-7xl"
          >
            有種直送
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="mt-2 text-base font-semibold tracking-wide text-white/75 md:text-lg"
          >
            You Zhong · Direct From Farm
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-5 text-2xl font-bold leading-snug text-banner md:text-3xl"
          >
            時令鮮菜，直送你的餐桌
            <br />
            回歸食物本質，睇得到的信任。
          </motion.h2>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-8"
          >
            <Link
              to="/order"
              className="group inline-flex items-center gap-2 rounded-md bg-brand-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-black/25 transition-all hover:bg-brand-600 md:text-lg"
            >
              立即訂購
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-base font-semibold text-white/90 md:text-lg"
          >
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-banner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              香港本地農場
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-banner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
                <circle cx="7" cy="18" r="1.6" />
                <circle cx="17" cy="18" r="1.6" />
              </svg>
              星期三直送
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-banner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3c-2 3-4 5-4 8a4 4 0 0 0 8 0c0-3-2-5-4-8z" />
                <path d="M12 15v6" />
              </svg>
              每包最少 3 款
            </span>
          </motion.div>
        </div>
      </div>

      {/* Marquee — 今季出產 */}
      <div className="relative z-10 overflow-hidden bg-banner py-4 md:py-5">
        <div className="absolute left-0 top-0 z-20 flex h-full items-center gap-3 bg-gradient-to-r from-banner via-banner to-transparent pl-5 pr-10 md:pl-8">
          <span className="whitespace-nowrap text-lg font-black uppercase tracking-widest text-brand-800 md:text-xl">
            今季出產
          </span>
        </div>
        <div className="flex w-max animate-marquee items-center gap-10 pl-40 md:pl-56">
          {[...seasonal, ...seasonal].map((v, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8">
              <span className="whitespace-nowrap text-xl font-bold text-brand-900 md:text-2xl">{v}</span>
              <span className="text-brand-700">✳</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
