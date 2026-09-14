import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    n: "01",
    title: "選擇菜包方案",
    desc: "月購、單次體驗或半年訂購，揀適合你屋企的份量。",
    icon: "🛒",
  },
  {
    n: "02",
    title: "填寫訂購表格",
    desc: "在訂菜表格填寫配送資料、菜包選擇及聯絡方法。",
    icon: "📝",
  },
  {
    n: "03",
    title: "完成付款",
    desc: "選擇銀行轉賬、轉數快、PayMe 或 AlipayHK。",
    icon: "💳",
  },
  {
    n: "04",
    title: "上載付款證明",
    desc: "於訂菜表格上載入數紙或付款截圖，以便核對款項。",
    icon: "📤",
  },
  {
    n: "05",
    title: "星期三直送到家",
    desc: "WhatsApp 確認訂單後，司機會在到達前致電或通知。",
    icon: "🚚",
  },
];

const methods = [
  {
    id: "bank",
    name: "銀行轉賬",
    steps: [
      "登入你的網上銀行或到 ATM",
      "輸入以下收款戶口資料",
      "完成轉賬後截圖入數紙",
      "於訂菜表格上載截圖作付款證明",
    ],
    details: {
      bank: "匯豐銀行 HSBC",
      account: "123-456-789",
      holder: "有種直送 You Zhong Direct",
    },
    icon: "🏦",
  },
  {
    id: "fps",
    name: "轉數快 (FPS)",
    steps: [
      "打開銀行 App 選擇「轉數快」",
      "輸入 FPS 識別碼 (手機號碼)",
      "輸入金額及確認付款",
      "截圖後於訂菜表格上傳",
    ],
    details: {
      fps: "+852 9088 1857",
      note: "請於備註填寫訂單姓名",
    },
    icon: "⚡",
  },
  {
    id: "payme",
    name: "PayMe",
    steps: [
      "打開 PayMe App",
      "掃描以下 QR Code 或搜尋電話",
      "輸入金額並確認付款",
      "截圖後於訂菜表格上傳",
    ],
    details: {
      payme: "+852 9088 1857",
      note: "支援滙豐 PayMe",
    },
    icon: "📱",
  },
  {
    id: "alipay",
    name: "AlipayHK",
    steps: [
      "打開 AlipayHK App",
      "掃描以下 QR Code",
      "輸入金額並完成付款",
      "截圖後於訂菜表格上傳",
    ],
    details: {
      alipay: "+852 9088 1857",
      note: "支付寶香港",
    },
    icon: "💙",
  },
];

export default function Order() {
  const [method, setMethod] = useState(methods[0].id);
  const current = methods.find((m) => m.id === method)!;

  return (
    <section id="order" className="paper-bg section-seam relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime-soft/25 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-brand-700">
            <span>04</span>
            <span className="h-1 w-1 rounded-full bg-brand-700" />
            <span>How to Order</span>
          </div>
          <h2 className="mt-5 text-4xl font-black leading-tight text-brand-800 md:text-5xl">
            如何<span className="hand-underline">訂購</span>及付款
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-900/70 md:text-xl">
            5 個簡單步驟，由揀菜包到收貨，全程清晰。
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-5 md:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-lift relative overflow-hidden rounded-2xl border border-brand-700/10 bg-white p-5 shadow-sm"
            >
              <div className="absolute -right-4 -top-4 text-7xl font-black text-brand-500/5">
                {s.n}
              </div>
              <div className="text-3xl">{s.icon}</div>
              <div className="mt-3 text-sm font-bold uppercase tracking-widest text-brand-500">
                Step {s.n}
              </div>
              <div className="mt-1 text-lg font-bold text-brand-800">{s.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-brand-900/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Connector arrow */}
        <div className="my-12 flex items-center justify-center">
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
          <span className="mx-3 text-brand-500">▼</span>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
        </div>

        {/* Payment methods */}
        <div className="overflow-hidden rounded-3xl border border-brand-700/10 bg-white shadow-xl shadow-brand-800/10">
          {/* Tab buttons */}
          <div className="border-b border-brand-700/10 bg-paper-2/50 p-3 md:p-5">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all md:text-base ${
                    method === m.id
                      ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                      : "bg-white text-brand-700 hover:bg-brand-500/5"
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <motion.div
            key={method}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 p-6 md:grid-cols-2 md:gap-10 md:p-10"
          >
            {/* Steps */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-lime-soft/25 px-3 py-1 text-sm font-bold uppercase tracking-widest text-brand-700">
                付款教學
              </div>
              <h3 className="mt-3 text-2xl font-black text-brand-800 md:text-3xl">{current.name}</h3>
              <ol className="mt-6 space-y-3">
                {current.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-base leading-relaxed text-brand-900/80 md:text-lg">
                      {s}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Details / QR */}
            <div className="rounded-2xl bg-paper-2 p-5 md:p-8">
              <div className="text-center">
                <div className="text-sm font-bold uppercase tracking-widest text-brand-700">
                  {current.name}
                </div>
                <div className="mt-1 text-lg font-black text-brand-800 md:text-xl">
                  收款資料 / QR Code
                </div>
              </div>

              {/* Faux QR code */}
              <div className="mx-auto mt-5 flex aspect-square w-44 items-center justify-center rounded-2xl bg-white p-3 shadow-md md:w-52">
                <div className="grid h-full w-full grid-cols-12 grid-rows-12 gap-[1px]">
                  {Array.from({ length: 144 }).map((_, i) => {
                    const isCorner =
                      (i < 36 && (i % 12 < 3)) ||
                      (i < 36 && (i % 12 > 8)) ||
                      (i >= 108 && (i % 12 < 3));
                    return (
                      <div
                        key={i}
                        className={`${
                          isCorner || Math.random() > 0.55
                            ? "bg-brand-800"
                            : "bg-transparent"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 space-y-2 text-base">
                {Object.entries(current.details).map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm">
                    <span className="text-sm font-semibold uppercase tracking-wider text-brand-700/60">
                      {k}
                    </span>
                    <span className="text-right font-bold text-brand-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
