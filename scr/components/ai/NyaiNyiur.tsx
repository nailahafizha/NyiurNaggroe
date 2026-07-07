"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Minimize2,
  Maximize2,
  Sparkles,
  Leaf,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/lib/stores/auth-store";
import Link from "next/link";

import { usePathname } from "next/navigation";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

const getContextualSuggestions = (pathname: string) => {
  if (pathname.includes("/mitra")) {
    return [
      "Bagaimana cara menaikkan omzet toko saya?",
      "Bagaimana mengoptimalkan stok briket kelapa?",
      "Tips menurunkan emisi karbon produksi kelapa?",
      "Bagaimana menjadi penjual terverifikasi?"
    ];
  }
  if (pathname.includes("/produk/")) {
    return [
      "Bagaimana cara memverifikasi kualitas Grade A?",
      "Apa beda briket kelapa premium ini dengan arang kayu biasa?",
      "Bagaimana cara menghitung kontribusi CO2 produk ini?",
      "Berapa minimal pemesanan untuk briket kelapa?"
    ];
  }
  if (pathname.includes("/produk")) {
    return [
      "Rekomendasikan briket kelapa kualitas terbaik",
      "Mana media tanam cocopeat terpopuler?",
      "Bagaimana cara kerja pencarian visual AI?",
      "Ada kerajinan kelapa khas daerah mana saja?"
    ];
  }
  if (pathname.includes("/edukasi")) {
    return [
      "Bagaimana cara belajar mengolah kelapa circular?",
      "Berapa skor minimal kelulusan kuis?",
      "Apa saja keuntungan memiliki Learning Points?",
      "Rekomendasikan artikel tentang VCO"
    ];
  }
  return [
    "Apa produk kelapa yang paling diminati?",
    "Bagaimana cara menjadi Mitra Nyiur?",
    "Apa manfaat cocopeat untuk pertanian?",
    "Briket kelapa vs arang biasa?",
  ];
};

const getContextualGreeting = (pathname: string) => {
  if (pathname.includes("/mitra")) {
    return "Halo Mitra Nyiur! 🌿 Saya asisten AI toko Anda. Butuh saran optimasi penjualan atau cara mengelola stok produk kelapa Anda hari ini?";
  }
  if (pathname.includes("/produk/")) {
    return "Halo! Ada pertanyaan tentang spesifikasi detail, sertifikasi eco, atau mutu kualitas Grade A dari produk kelapa ini?";
  }
  if (pathname.includes("/produk")) {
    return "Selamat datang di Marketplace Nyiur! 🥥 Butuh rekomendasi produk kelapa terbaik atau panduan pencarian produk sirkular?";
  }
  if (pathname.includes("/edukasi")) {
    return "Halo Sobat Belajar! 🧠 Butuh rangkuman artikel edukasi kelapa atau butuh tips menjawab kuis mingguan?";
  }
  return "Halo! Saya **Nyai Nyiur** 🌿 — asisten AI dari Nyiur Nanggroe.\n\nSaya siap membantu kamu menemukan produk kelapa terbaik, menjawab pertanyaan tentang ekonomi sirkular, atau membantu bisnismu berkembang.\n\nAda yang bisa saya bantu hari ini?";
};

function formatContent(content: string) {
  // Bold text
  return content
    .split("**")
    .map((part, i) =>
      i % 2 === 1 ? `<strong>${part}</strong>` : part
    )
    .join("");
}

export function NyaiNyiur() {
  const pathname = usePathname();
  const user = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  // Other pages (e.g. Edukasi via /edukasi?ai=1) can ask this widget to
  // open itself without us needing a shared global store just for this.
  useEffect(() => {
    const handleOpenRequest = () => setIsOpen(true);
    window.addEventListener("nyiur:open-ai-chat", handleOpenRequest);
    return () => window.removeEventListener("nyiur:open-ai-chat", handleOpenRequest);
  }, []);
  const [isMinimized, setIsMinimized] = useState(false);
  const [guestQuestionCount, setGuestQuestionCount] = useState(0);

  const GUEST_QUESTION_LIMIT = 5;
  const GUEST_COUNT_KEY = "nyiur_guest_ai_question_count";

  // Load how many questions this guest has already asked (persists across
  // sessions in this browser so the limit can't be reset just by reloading).
  useEffect(() => {
    if (typeof window === "undefined" || user) return;
    const stored = parseInt(localStorage.getItem(GUEST_COUNT_KEY) || "0", 10);
    setGuestQuestionCount(Number.isNaN(stored) ? 0 : stored);
  }, [user]);
  
  // Custom context-aware values
  const suggestions = getContextualSuggestions(pathname);
  const greeting = getContextualGreeting(pathname);

  const initialMessage: Message = {
    id: "welcome",
    role: "assistant",
    content: greeting,
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Sync greeting when path changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: greeting,
        timestamp: new Date(),
      }
    ]);
    setShowSuggestions(true);
  }, [pathname, greeting]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Guests get a limited number of free questions, then we ask them to
    // create an account instead of quietly burning API quota forever.
    if (!user && guestQuestionCount >= GUEST_QUESTION_LIMIT) {
      setShowSuggestions(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "user",
          content: content.trim(),
          timestamp: new Date(),
        },
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Kamu sudah mencapai batas tanya-jawab gratis untuk tamu 🙏\n\nYuk **buat akun dulu** biar bisa lanjut ngobrol sama saya tanpa batas, sekalian dapat rekomendasi produk yang lebih personal!",
          timestamp: new Date(),
        },
      ]);
      setInput("");
      return;
    }

    if (!user) {
      const nextCount = guestQuestionCount + 1;
      setGuestQuestionCount(nextCount);
      if (typeof window !== "undefined") {
        localStorage.setItem(GUEST_COUNT_KEY, String(nextCount));
      }
    }

    setShowSuggestions(false);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add streaming placeholder
    const assistantId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.slice(1), userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Response not OK");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  accumulated += parsed.text;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: accumulated, isStreaming: true }
                        : m
                    )
                  );
                }
              } catch {
                // ignore parse errors
              }
            }
          }
        }
      }

      // Mark streaming as done
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "Maaf, saya sedang tidak bisa menjawab saat ini. Silakan coba lagi sebentar ya 🙏",
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetConversation = () => {
    setMessages([initialMessage]);
    setShowSuggestions(true);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              scale: { type: "spring", stiffness: 400, damping: 25 },
              opacity: { duration: 0.2 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="fixed bottom-6 right-6 z-50 touch-none"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-2xl bg-forest-600 text-white shadow-glass-lg hover:bg-forest-500 hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center group cursor-grab active:cursor-grabbing"
              aria-label="Buka Nyai Nyiur — Asisten AI"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
              >
                <Bot className="w-6 h-6" />
              </motion.div>

              {/* Notification dot */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </span>

              {/* Tooltip on hover */}
              <div className="absolute right-full mr-3 bg-charcoal-800 text-white text-xs font-medium px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                Nyai Nyiur — Tanya Apa Saja 🌿
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-charcoal-800" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? "auto" : undefined,
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-3xl overflow-hidden shadow-2xl",
              "bg-white border border-border/60",
              isMinimized && "shadow-glass"
            )}
            role="dialog"
            aria-label="Nyai Nyiur — Asisten AI Kelapa"
            aria-modal="false"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-forest-600 text-white">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm">Nyai Nyiur</span>
                  <span className="flex items-center gap-1 text-[10px] text-forest-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-moss-300 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-forest-200 text-[10px]">
                  Asisten AI Kelapa · Nyiur Nanggroe
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetConversation}
                  className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
                  aria-label="Reset percakapan"
                  title="Reset"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
                  aria-label={isMinimized ? "Perbesar" : "Perkecil"}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Minimize2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
                  aria-label="Tutup asisten AI"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="h-72 overflow-y-auto p-4 space-y-3 bg-cream/50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-2.5",
                        message.role === "user" ? "flex-row-reverse" : ""
                      )}
                    >
                      {/* Avatar */}
                      {message.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Leaf className="w-3.5 h-3.5 text-forest-600" />
                        </div>
                      )}

                      {/* Bubble */}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed",
                          message.role === "user"
                            ? "bg-forest-600 text-white rounded-tr-sm shadow-sm"
                            : "bg-white border border-border/60 text-charcoal-700 rounded-tl-sm shadow-sm"
                        )}
                      >
                        {message.isStreaming && message.content === "" ? (
                          <div className="flex items-center gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-charcoal-300"
                                animate={{ y: [0, -4, 0] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: formatContent(message.content).replace(
                                /\n/g,
                                "<br/>"
                              ),
                            }}
                          />
                        )}
                        {message.isStreaming && message.content && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                            className="inline-block w-0.5 h-3 bg-forest-400 ml-0.5 align-middle"
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Suggested Prompts */}
                  {showSuggestions && messages.length === 1 && (
                    <div className="space-y-1.5">
                      <p className="text-[10px] text-charcoal-400 font-medium px-1">
                        Pertanyaan populer:
                      </p>
                      {suggestions.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => sendMessage(prompt)}
                          className="w-full text-left text-xs px-3 py-2 rounded-xl bg-white border border-border/60 text-charcoal-600 hover:text-forest-600 hover:border-forest-200 hover:bg-forest-50 transition-all duration-150"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-border/60 bg-white">
                  <div className="flex gap-2 items-end">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Tanya Nyai Nyiur..."
                      rows={1}
                      className="flex-1 resize-none text-xs text-charcoal bg-mist rounded-xl px-3.5 py-2.5 border border-border focus:outline-none focus:ring-2 focus:ring-forest-500/30 focus:border-forest-500 transition-all placeholder:text-charcoal-300 max-h-24"
                      style={{ minHeight: "38px" }}
                      aria-label="Ketik pesan untuk Nyai Nyiur"
                      disabled={isLoading}
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || isLoading}
                      className="w-9 h-9 rounded-xl bg-forest-600 text-white flex items-center justify-center hover:bg-forest-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all flex-shrink-0"
                      aria-label="Kirim pesan"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-charcoal-400 mt-1.5 text-center">
                    Nyai Nyiur dapat membuat kesalahan. Verifikasi informasi penting.
                  </p>
                  {!user && (
                    <p className="text-[10px] mt-1 text-center">
                      {guestQuestionCount >= GUEST_QUESTION_LIMIT ? (
                        <Link href="/daftar" className="font-semibold text-forest-600 hover:underline">
                          Buat akun gratis untuk terus bertanya →
                        </Link>
                      ) : (
                        <span className="text-charcoal-400">
                          Sisa {GUEST_QUESTION_LIMIT - guestQuestionCount} pertanyaan gratis sebagai tamu
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
