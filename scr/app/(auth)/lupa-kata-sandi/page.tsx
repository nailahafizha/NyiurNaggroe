"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending recovery email
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl space-y-6"
    >
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl font-display font-bold text-charcoal-800">
          Lupa Kata Sandi?
        </h1>
        <p className="text-sm text-charcoal-500">
          Masukkan alamat email Anda untuk menerima instruksi pemulihan kata sandi.
        </p>
      </div>

      {sent ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center space-y-3.5"
        >
          <div className="flex justify-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-charcoal-800">Email Pemulihan Dikirim</h3>
            <p className="text-xs text-charcoal-500 leading-relaxed">
              Kami telah mengirim tautan pemulihan kata sandi ke <span className="font-semibold">{email}</span>. Silakan periksa kotak masuk dan folder spam Anda.
            </p>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-charcoal-700 block">
              Alamat Email Terdaftar
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all pr-10"
              />
              <Mail className="absolute right-3.5 top-3.5 w-4 h-4 text-charcoal-300 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary justify-center py-3.5 shadow-lg shadow-forest-600/10"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Mengirim email...
              </>
            ) : (
              "Kirim Tautan Pemulihan"
            )}
          </button>
        </form>
      )}

      <div className="text-center pt-2 border-t border-border/40">
        <Link
          href="/masuk"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-forest-600 hover:text-forest-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Halaman Masuk
        </Link>
      </div>
    </motion.div>
  );
}
