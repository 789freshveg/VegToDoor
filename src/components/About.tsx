import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGallery } from "../lib/gallery";

export default function About() {
  const gallery = useGallery();

  return (
    <section id="about" className="white-bg section-seam relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-lime-soft/25 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-brand-700">
            <span>05</span>
            <span className="h-1 w-1 rounded-full bg-brand-700" />
            <span>About Us</span>
          </div>
          <h2 className="mt-5 text-4xl font-black leading-tight text-brand-800 md:text-5xl">
            回歸食物本質，<span className="hand-underline">睇得到的信任</span>。
          </h2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Left: copy */}
          <div className="md:col-span-5">
            <div className="space-y-4 text-lg leading-relaxed text-brand-900/80 md:text-xl">
              <p>
                「<span className="font-bold text-brand-700">有種直送</span>」是本地菜共購平台，連結
                <span className="font-bold text-brand-700">「有心種」</span>
                的農夫及
                <span className="font-bold text-brand-700">「有心買」</span>
                重視食材來源的顧客，將香港時令蔬菜由農田直送到餐桌。
              </p>
              <p>
                透過時令菜包與農夫故事，讓大家
                <span className="font-semibold text-brand-700">看得見生產過程</span>，
                建立「睇得到嘅信任」，並支持本地農業、健康、環保的生活方式。
              </p>
            </div>

            {/* Values */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: "🌍", label: "本地農業" },
                { icon: "💚", label: "健康環保" },
                { icon: "🤝", label: "信任透明" },
              ].map((v) => (
                <div key={v.label} className="rounded-2xl bg-brand-500/5 p-4 text-center">
                  <div className="text-2xl">{v.icon}</div>
                  <div className="mt-2 text-base font-bold text-brand-800">{v.label}</div>
                </div>
              ))}
            </div>

            {/* Partner farm */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 overflow-hidden rounded-3xl border border-brand-700/10 bg-white shadow-md"
            >
              <div className="relative h-40 overflow-hidden md:h-44">
                <img src="/images/farm.jpg" alt="合作農場" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <div className="text-sm font-bold uppercase tracking-widest text-lime-soft">
                    Partner Farm
                  </div>
                  <div className="text-xl font-black md:text-2xl">康苗有機農菜</div>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <div className="text-base font-bold text-brand-800">合作農場</div>
                <p className="mt-2 text-base leading-relaxed text-brand-900/70 md:text-lg">
                  本地有機認證農場，堅持以可持續方式種植時令蔬菜，確保每棵菜都係用心栽種。
                  ［合作農場介紹內容待補］
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: gallery 2 x 3 */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {gallery.slice(0, 6).map((g, i) => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="card-lift group relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-700/10 bg-white shadow-sm"
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex flex-col items-center gap-2">
              <p className="text-center text-sm text-brand-700/70 md:text-base">
                * 圖片清單方便日後替換農場、蔬菜及配送照片
              </p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-700/20 bg-white px-4 py-2 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-500 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                </svg>
                管理相片
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
