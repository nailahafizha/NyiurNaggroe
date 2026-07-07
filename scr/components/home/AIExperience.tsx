"use client";

import { motion } from "framer-motion";
import { Camera, Bot, ArrowRight, Upload, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function AIExperience() {
  return (
    <section className="section-padding bg-charcoal-900 relative overflow-hidden" id="ai-experience">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-forest-950 to-forest-900 opacity-90" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(250, 247, 240, 0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-base relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-500/20 border border-forest-400/30 text-forest-200 text-xs font-medium mb-6">
              <Bot className="w-4 h-4 text-amber-400" />
              Ekosistem Cerdas
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
              Rasakan Kekuatan <span className="text-gradient-amber">AI</span>
            </h2>
            <p className="text-charcoal-300 text-lg leading-relaxed">
              Nyiur Nanggroe didukung kecerdasan buatan canggih agar perjalanan berkelanjutan Anda lebih cerdas, cepat, dan mudah.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Visual Search WorkFlow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              AI Visual Search
            </h3>
            <p className="text-charcoal-300 mb-8">
              Menemukan produk kelapa tapi tidak tahu namanya? Cukup unggah foto, dan AI kami akan langsung menemukan produk serupa di marketplace.
            </p>

            {/* Timeline */}
            <div className="relative border-l border-forest-700/50 ml-4 space-y-8 pb-4">
              <div className="relative pl-8">
                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-charcoal-800 border-2 border-forest-500 flex items-center justify-center">
                  <Upload className="w-3 h-3 text-forest-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">Upload</h4>
                <p className="text-sm text-charcoal-400">Upload any coconut product image.</p>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-charcoal-800 border-2 border-amber-500 flex items-center justify-center">
                  <Search className="w-3 h-3 text-amber-400" />
                </div>
                <h4 className="text-white font-semibold mb-1">AI Detects</h4>
                <p className="text-sm text-charcoal-400">Our vision model identifies the material and product type.</p>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-forest-600 border-2 border-forest-400 flex items-center justify-center shadow-[0_0_15px_rgba(45,106,79,0.5)]">
                  <ShoppingBag className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-1">Marketplace Results</h4>
                <p className="text-sm text-charcoal-400">Discover matching products from our Mitra Nyiur.</p>
              </div>
            </div>

            <Link href="/produk?visual=1" className="inline-flex items-center gap-2 mt-8 text-amber-400 hover:text-amber-300 font-medium transition-colors">
              Try Visual Search <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 bg-charcoal-800/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-forest-500/10 rounded-full blur-3xl" />
            <div className="relative bg-charcoal-900 border border-white/5 rounded-2xl p-6 shadow-2xl">
              <div className="border-2 border-dashed border-charcoal-700 rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6">
                <Camera className="w-12 h-12 text-charcoal-600 mb-4" />
                <p className="text-charcoal-400 text-sm">Drag and drop an image here</p>
                <div className="mt-4 px-4 py-2 bg-charcoal-800 rounded-lg text-xs text-white">Browse Files</div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-charcoal-800 rounded w-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-forest-600 to-amber-500"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <p className="text-xs text-center text-charcoal-500">Scanning image with AI...</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nyai Nyiur Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
           <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-forest-900 border border-forest-700/50 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="relative flex flex-col gap-4">
               <div className="bg-charcoal-900/80 p-4 rounded-xl border border-white/10 ml-8 shadow-lg">
                 <p className="text-sm text-charcoal-300">How do I start selling cocopeat on the platform?</p>
               </div>
               <div className="flex items-start gap-3 mr-8">
                 <div className="w-8 h-8 rounded-full bg-forest-600 flex items-center justify-center flex-shrink-0 mt-1">
                   <Bot className="w-4 h-4 text-white" />
                 </div>
                 <div className="bg-white text-charcoal p-4 rounded-xl rounded-tl-sm shadow-lg">
                   <p className="text-sm leading-relaxed">It's easy! 🌿 You can start by registering as a <strong>Mitra Nyiur</strong>. I can guide you through the process step-by-step.</p>
                 </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              Kenalan dengan Nyai Nyiur
            </h3>
            <p className="text-charcoal-300 mb-6 leading-relaxed">
              Asisten cerdas yang tersedia di setiap halaman platform. Nyai Nyiur membantu Anda memahami prinsip ekonomi sirkular, menemukan produk yang tepat, dan membimbing penjual memaksimalkan dampaknya.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-charcoal-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Tersedia 24/7 di setiap halaman
              </li>
              <li className="flex items-center gap-3 text-charcoal-300">
                <div className="w-1.5 h-1.5 rounded-full bg-forest-400" /> Tanya soal metrik keberlanjutan
              </li>
              <li className="flex items-center gap-3 text-charcoal-300">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Paham mendalam soal produk kelapa
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
