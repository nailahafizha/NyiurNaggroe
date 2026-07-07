"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, BookOpen, Clock, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ARTICLES = [
  {
    title: "Cara Ekspor Briket Kelapa ke Eropa",
    category: "Panduan Ekspor",
    type: "Kursus",
    readTime: "45 menit",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
    icon: PlayCircle
  },
  {
    title: "Praktik Budidaya Kelapa Berkelanjutan",
    category: "Budidaya",
    type: "Artikel",
    readTime: "8 menit",
    image: "https://images.unsplash.com/photo-1596328546171-77e37b5f28c5?q=80&w=1000&auto=format&fit=crop",
    icon: BookOpen
  },
  {
    title: "Memahami Grade Cocopeat untuk Hidroponik",
    category: "Pengetahuan Produk",
    type: "Artikel",
    readTime: "12 menit",
    image: "https://images.unsplash.com/photo-1585246757049-74e2d42df5d5?q=80&w=1000&auto=format&fit=crop",
    icon: BookOpen
  }
];

export function Education() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-white relative" id="education">
      <div className="container-base relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-charcoal mb-4">
              Kuasai <span className="text-gradient-forest">Industri Kelapa</span>
            </h2>
            <p className="text-charcoal-400 text-lg">
              Jelajahi kumpulan kursus, artikel, dan panduan ekspor yang dirancang untuk petani dan UMKM.
            </p>
          </div>
          <Link href="/edukasi" className="group flex items-center gap-2 font-semibold text-forest-600 hover:text-forest-700 transition-colors">
            Lihat Semua Materi <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group card-base overflow-hidden cursor-pointer flex flex-col h-full hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-mist">
                  <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-charcoal-900/0 transition-colors z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-charcoal-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1 bg-white">
                  <div className="flex items-center gap-4 text-sm text-charcoal-400 mb-4">
                    <span className="flex items-center gap-1.5 font-medium text-forest-600">
                      <Icon className="w-4 h-4" /> {article.type}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-charcoal mb-4 group-hover:text-forest-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold text-charcoal-600">Mulai Belajar</span>
                    <ArrowRight className="w-5 h-5 text-forest-600" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
