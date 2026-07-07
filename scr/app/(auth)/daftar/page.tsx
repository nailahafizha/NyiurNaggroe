"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Shield } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "Indonesia",
    province: "",
    city: "",
    acceptTerms: false,
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Kata sandi harus minimal 8 karakter.");
      return;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError("Kata sandi harus mengandung minimal 1 huruf kapital.");
      return;
    }
    if (!/[0-9]/.test(formData.password)) {
      setError("Kata sandi harus mengandung minimal 1 angka.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.acceptTerms) {
      setError("Anda harus menyetujui Ketentuan Layanan.");
      return;
    }

    setLoading(true);

    try {
      const res = await register({
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        country: formData.country,
        province: formData.province,
        city: formData.city,
      });

      if (res.success) {
        router.push("/selamat-datang");
      } else {
        // Show specific error from API
        setError(res.error ?? "Terjadi kesalahan saat pendaftaran.");
        // If validation error is about password, go back to step 1
        if (res.error?.toLowerCase().includes("sandi") || res.error?.toLowerCase().includes("kapital") || res.error?.toLowerCase().includes("password")) {
          setStep(1);
        }
      }
    } catch (err) {
      setError("Koneksi gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl space-y-6">
      {/* Header and Step Indicators */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-display font-bold text-charcoal-800">
          Buat Akun Baru
        </h1>
        <div className="flex items-center justify-center gap-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 1 ? "w-8 bg-forest-600" : "w-2 bg-charcoal-200"
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 2 ? "w-8 bg-forest-600" : "w-2 bg-charcoal-200"
            }`}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3.5 text-xs text-center font-medium">
          ⚠️ {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 15 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleNext}
            className="space-y-4"
          >
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700 block">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                placeholder="Nama lengkap sesuai KTP"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700 block">
                Alamat Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700 block">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="Min. 8 karakter, ada kapital & angka"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-charcoal-700 block">
                  Konfirmasi Sandi
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  placeholder="Ulangi sandi"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary justify-center py-3.5 mt-2"
            >
              Lanjutkan <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-charcoal-700 block">
                Nomor Telepon / WhatsApp
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="Contoh: 081234567890"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Country / Province / City */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal-700 block">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    required
                    placeholder="Aceh, dll."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-charcoal-700 block">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    placeholder="Banda Aceh, dll."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-charcoal placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-3 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="mt-1 rounded border-border text-forest-600 focus:ring-forest-500"
              />
              <span className="text-xs text-charcoal-500 leading-normal">
                Saya menyetujui <Link href="/syarat-ketentuan" className="font-bold text-forest-600 hover:underline">Ketentuan Layanan</Link> dan{" "}
                <Link href="/privasi" className="font-bold text-forest-600 hover:underline">Kebijakan Privasi</Link> Nyiur Nanggroe.
              </span>
            </label>

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary py-3.5 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary justify-center py-3.5 shadow-lg shadow-forest-600/10"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Mendaftar...
                  </>
                ) : (
                  <>
                    Buat Akun <Shield className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-charcoal-500 pt-2 border-t border-border/40">
        Sudah memiliki akun?{" "}
        <Link
          href="/masuk"
          className="font-bold text-forest-600 hover:text-forest-700 transition-colors"
        >
          Masuk di Sini
        </Link>
      </p>
    </div>
  );
}
