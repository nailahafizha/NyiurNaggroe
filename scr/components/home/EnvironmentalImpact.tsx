"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function EnvironmentalImpact() {
  const [count, setCount] = useState(0);
  const [targetWaste, setTargetWaste] = useState(12450); // kg, fallback demo value
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  // Pull the real figure from the database when available; fall back to
  // the demo value above if the API isn't reachable yet.
  useEffect(() => {
    fetch("/api/impact")
      .then((res) => res.json())
      .then((json) => {
        if (json?.success && json?.data?.total_waste_diverted) {
          setTargetWaste(Math.round(json.data.total_waste_diverted));
        }
      })
      .catch(() => {
        // Diamkan saja — tetap tampilkan nilai demo di atas.
      });
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2500; // 2.5 detik
    const increment = targetWaste / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetWaste) {
        setCount(targetWaste);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, targetWaste]);

  return (
    <section 
      id="impact"
      className="relative py-32 overflow-hidden bg-forest-900 bg-center bg-cover"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2000&auto=format&fit=crop')"
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-forest-950/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-transparent to-charcoal-900/90" />

      <div className="container-base relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="font-display text-2xl md:text-3xl text-forest-200 uppercase tracking-widest mb-6 font-semibold">
            Dampak Lingkungan Kita
          </h2>
          
          <div className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-8 drop-shadow-2xl">
            {count.toLocaleString('id-ID')}
            <span className="text-4xl md:text-6xl lg:text-7xl text-amber-400 ml-2">kg+</span>
          </div>

          <p className="text-2xl md:text-4xl text-cream font-light leading-snug">
            Bersama, kita telah mengalihkan <span className="font-bold text-white">ratusan ton sampah kelapa</span> dari tempat pembuangan akhir dan mengubahnya jadi produk yang bermanfaat.
          </p>

          <a
            href="/dampak"
            className="inline-block mt-8 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-colors"
          >
            Lihat Rincian Dampak →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
