"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-cream relative overflow-hidden" id="cta">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-forest-900/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-base relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-charcoal-900 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          {/* Inner Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-forest-500/30 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px]" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Siap Mengubah <span className="text-gradient-amber">Masa Depan Industri Kelapa?</span>
            </h2>
            <p className="text-charcoal-300 text-lg md:text-xl mb-12">
              Bergabunglah dengan ribuan pembeli dan penjual yang sudah menjadi bagian dari revolusi ekonomi sirkular.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/daftar-mitra" 
                className="w-full sm:w-auto px-8 py-4 bg-forest-600 hover:bg-forest-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-forest-900/20"
              >
                <Store className="w-5 h-5" /> Mulai Berjualan
              </Link>
              <Link 
                href="/produk" 
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" /> Mulai Belanja <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
