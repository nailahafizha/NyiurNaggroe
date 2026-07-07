"use client";

import { motion } from "framer-motion";
import { Sparkles, RefreshCcw, Users } from "lucide-react";

const CARDS = [
  {
    icon: Sparkles,
    title: "Marketplace Bertenaga AI",
    description: "Membantu pengguna menemukan produk kelapa lebih cepat lewat teknologi cerdas.",
    color: "amber"
  },
  {
    icon: RefreshCcw,
    title: "Ekonomi Sirkular",
    description: "Mengubah limbah kelapa menjadi peluang ekonomi.",
    color: "moss"
  },
  {
    icon: Users,
    title: "Memberdayakan Komunitas Lokal",
    description: "Menghubungkan petani, UMKM, koperasi, dan pembeli.",
    color: "forest"
  }
];

export function WhyNyiurNanggroe() {
  return (
    <section className="section-padding bg-cream relative overflow-hidden" id="why-nyiur">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-moss-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />

      <div className="container-base relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-charcoal mb-4">
            Kenapa Nyiur Nanggroe?
          </h2>
          <p className="text-charcoal-400 text-lg">
            Kami membangun masa depan industri kelapa lewat keberlanjutan dan inovasi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card-base p-8 group relative overflow-hidden"
              >
                {/* Hover gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-mist to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
                    ${card.color === 'amber' ? 'bg-amber-50 text-amber-500' : 
                      card.color === 'moss' ? 'bg-moss-50 text-moss-500' : 
                      'bg-forest-50 text-forest-600'} 
                    group-hover:scale-110 transition-transform duration-500 shadow-sm`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold font-display text-charcoal mb-3">
                    {card.title}
                  </h3>
                  
                  <p className="text-charcoal-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
