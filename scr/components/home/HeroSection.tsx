"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ShoppingBag,
  Store,
  Leaf,
  Activity,
  Users
} from "lucide-react";

const HERO_STATS = [
  { value: "480+", label: "Penjual Aktif", icon: Users },
  { value: "2.400+", label: "Produk", icon: ShoppingBag },
  { value: "12 Ton", label: "Karbon Terhemat", icon: Leaf },
  { value: "15k+", label: "Transaksi", icon: Activity },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-forest-900"
      aria-label="Hero section — Nyiur Nanggroe"
    >
      {/* Background parallax layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-600" />

        {/* Radial glow */}
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #52B788 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #C68642 0%, transparent 70%)" }}
        />

        {/* Floating coconut elements */}
        <FloatingElement className="absolute top-32 right-[15%] w-32 h-32 opacity-10" delay={0}>
          <CoconutSVG />
        </FloatingElement>
        <FloatingElement className="absolute bottom-40 left-[10%] w-24 h-24 opacity-10" delay={1.5}>
          <LeafSVG />
        </FloatingElement>
        <FloatingElement className="absolute top-1/2 left-[40%] w-16 h-16 opacity-5" delay={0.8}>
          <CoconutSVG />
        </FloatingElement>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container-base pt-32 pb-20 md:pt-40 md:pb-32"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Text & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-cream-50 text-sm font-medium mb-6 glass"
            >
              <Leaf className="w-3.5 h-3.5 text-moss-300" aria-hidden="true" />
              AI-Powered Circular Economy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
            >
              Dari Sisa Nyiur <br />
              <span className="text-gradient-amber inline-block py-1">
                Menjadi Nilai
              </span> <br />
              untuk Nanggroe.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-cream-100/80 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light"
            >
              Memberdayakan ekosistem kelapa Aceh lewat marketplace bertenaga AI, edukasi, dan inovasi ekonomi sirkular.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/produk"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-amber text-white font-semibold text-base hover:bg-amber-400 shadow-amber hover:shadow-lg active:scale-[0.98] transition-all duration-300 w-full sm:w-auto"
              >
                <ShoppingBag className="w-5 h-5" />
                Explore Marketplace
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/daftar-mitra"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-transparent text-white border border-white/30 font-medium text-base hover:bg-white/10 active:scale-[0.98] transition-all duration-300 w-full sm:w-auto glass"
              >
                <Store className="w-5 h-5" />
                Become Mitra Nyiur
              </Link>
            </motion.div>
          </div>

          {/* Right: Animated Statistics */}
          <div className="lg:col-span-5 xl:col-span-4 w-full mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {HERO_STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className="glass-dark p-6 rounded-2xl flex flex-col items-start group hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-forest-700/50 flex items-center justify-center mb-4 text-amber-300 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="font-display font-bold text-2xl md:text-3xl text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-cream-100/60 text-sm font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/40 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-amber-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Floating element wrapper
function FloatingElement({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Coconut SVG
function CoconutSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className="text-cream w-full h-full">
      <ellipse cx="50" cy="55" rx="30" ry="35" opacity="0.6" />
      <path d="M50 20 C40 30 25 45 25 60 Q25 90 50 90 Q75 90 75 60 C75 45 60 30 50 20Z" />
      <path d="M50 20 Q60 5 80 10 Q65 20 50 20Z" opacity="0.5" />
      <path d="M50 20 Q40 5 20 10 Q35 20 50 20Z" opacity="0.5" />
    </svg>
  );
}

// Leaf SVG
function LeafSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className="text-moss-400 w-full h-full">
      <path d="M50 90 C50 90 10 60 10 35 C10 15 30 5 50 10 C70 5 90 15 90 35 C90 60 50 90 50 90Z" />
      <line x1="50" y1="90" x2="50" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
    </svg>
  );
}

