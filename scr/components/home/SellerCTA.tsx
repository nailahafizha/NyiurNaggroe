"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Check, Store, TrendingUp, Globe, Shield } from "lucide-react";

const SELLER_BENEFITS = [
  { icon: Store, text: "Buka toko gratis dalam 10 menit" },
  { icon: TrendingUp, text: "AI Insight untuk optimalkan penjualan" },
  { icon: Globe, text: "Jangkau pembeli nasional & internasional" },
  { icon: Shield, text: "Pembayaran aman & terlindungi" },
];

export function SellerCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="section-padding bg-white"
      aria-label="Undangan bergabung sebagai Mitra Nyiur"
    >
      <div className="container-base">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-700 via-forest-600 to-leaf-500" />
          <div className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(250, 247, 240, 0.8) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          {/* Floating decorations */}
          <div className="absolute top-8 right-8 text-8xl opacity-10 select-none">🌴</div>
          <div className="absolute bottom-8 right-24 text-6xl opacity-10 select-none">🥥</div>

          {/* Content */}
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-cream text-xs font-medium mb-6">
                  🌿 Program Mitra Nyiur
                </div>

                <h2 className="font-display text-display-md font-bold text-white mb-4 leading-tight">
                  Jadikan Produk Kelapamu
                  <br />
                  <span className="text-amber-300">Dikenal Dunia</span>
                </h2>

                <p className="text-forest-100 text-base mb-8 leading-relaxed max-w-md">
                  Bergabunglah dengan 480+ UMKM yang telah mempercayakan
                  pertumbuhan bisnis mereka ke Nyiur Nanggroe. Gratis untuk
                  memulai, bayar hanya saat transaksi.
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  {SELLER_BENEFITS.map((benefit) => (
                    <div key={benefit.text} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-moss-400/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-moss-200" />
                      </div>
                      <span className="text-forest-100 text-sm">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/daftar-mitra"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-forest-700 font-semibold text-sm hover:bg-cream shadow-lg active:scale-[0.98] transition-all"
                  >
                    Daftar Gratis Sekarang
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/daftar-mitra"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/20 active:scale-[0.98] transition-all backdrop-blur-sm"
                  >
                    Pelajari Lebih Lanjut
                  </Link>
                </div>
              </div>

              {/* Right: Seller Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "Rp 12,4Jt", label: "Rata-rata omset/bulan", icon: "💰" },
                  { value: "480+", label: "Mitra aktif", icon: "🏪" },
                  { value: "4.8/5", label: "Rating kepuasan penjual", icon: "⭐" },
                  { value: "23 kota", label: "Jangkauan pengiriman", icon: "📦" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="font-display font-bold text-white text-xl mb-0.5">
                      {stat.value}
                    </div>
                    <div className="text-forest-200 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
