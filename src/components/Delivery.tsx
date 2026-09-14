import { motion } from "framer-motion";

const timeline = [
  {
    day: "星期一",
    time: "晚上 8:00",
    label: "截單時間",
    icon: "✂️",
    desc: "訂購表格提交截止",
  },
  {
    day: "星期三",
    time: "清晨採收",
    label: "農場清晨採摘",
    icon: "🌱",
    desc: "送貨當日清晨採收，保証新鮮",
  },
  {
    day: "星期三",
    time: "11:00–17:00",
    label: "配送到府",
    icon: "🚚",
    desc: "送至大廈管理處或自取點",
  },
];

const notes = [
  { icon: "📞", text: "到達前以電話／WhatsApp 通知顧客" },
  { icon: "🏢", text: "送至大廈管理處，請自行通知管理人員" },
  { icon: "🅿️", text: "或送到住所附近停車處自取，請提前安排" },
  { icon: "🗺️", text: "偏遠地區及離島暫不提供配送服務；如有特別情況，請致電商議", alert: true },
];

export default function Delivery() {
  return (
    <section id="delivery" className="white-bg section-seam relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime-soft/25 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-brand-700">
            <span>03</span>
            <span className="h-1 w-1 rounded-full bg-brand-700" />
            <span>Delivery</span>
          </div>
          <h2 className="mt-5 text-4xl font-black leading-tight text-brand-800 md:text-5xl">
            星期一<span className="text-brand-500">截單</span>，
            <span className="hand-underline">星期三見面</span>。
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-900/70 md:text-xl">
            配送安排簡單清楚，讓你放心訂購。
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-transparent via-brand-500/30 to-transparent md:block" />

          <div className="grid gap-5 md:grid-cols-3">
            {timeline.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card-lift relative overflow-hidden rounded-3xl border border-brand-700/10 bg-white p-6 shadow-md md:p-8"
              >
                <div className="absolute right-5 top-5">
                  <div className="rounded-full bg-brand-500 px-3 py-1 text-sm font-bold text-white">
                    {t.day}
                  </div>
                </div>

                <div className="text-4xl">{t.icon}</div>
                <div className="mt-4 text-sm font-bold uppercase tracking-widest text-brand-500">
                  Step 0{i + 1}
                </div>
                <div className="mt-1 text-2xl font-black text-brand-800 md:text-3xl">{t.time}</div>
                <div className="mt-2 text-lg font-bold text-brand-700">{t.label}</div>
                <p className="mt-2 text-base leading-relaxed text-brand-900/70">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coverage area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 grid overflow-hidden rounded-3xl border border-brand-700/10 bg-white shadow-lg md:grid-cols-5"
        >
          <div className="relative bg-gradient-to-br from-brand-700 to-brand-800 p-8 text-paper md:col-span-2 md:p-10">
            <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-lime-soft/20 blur-2xl" />
            <div className="text-4xl">📍</div>
            <h3 className="mt-4 text-xl font-black md:text-2xl">配送範圍</h3>
            <p className="mt-2 text-base text-paper/85 md:text-lg">
              覆蓋香港島、九龍及新界，為你送到家門口。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["香港島", "九龍", "新界"].map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-bold backdrop-blur"
                >
                  ✓ {a}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-paper-2/50 p-6 md:col-span-3 md:p-8">
            <div className="text-base font-bold text-brand-800">配送備註</div>
            <ul className="mt-4 space-y-3">
              {notes.map((n, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-base">
                    {n.icon}
                  </span>
                  <span
                    className={`pt-2 text-base leading-relaxed md:text-lg ${
                      "alert" in n && n.alert ? "font-bold" : "text-brand-900/80"
                    }`}
                    style={"alert" in n && n.alert ? { color: "#ff7832" } : undefined}
                  >
                    {n.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
