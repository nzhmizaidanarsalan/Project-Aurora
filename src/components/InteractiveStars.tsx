import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Sparkles, MessageCircleHeart } from "lucide-react";

interface StarMessage {
  id: number;
  label: string;
  message: string;
  top: string;
  left: string;
  delay: number;
  glow: string;
}

const STAR_MESSAGES: StarMessage[] = [
  {
    id: 1,
    label: "Star of Strength",
    message: "Semangat ya! Kamu sudah sejauh ini, dan itu bukti kalau kamu kuat.",
    top: "15%",
    left: "20%",
    delay: 0.1,
    glow: "rgba(255, 215, 232, 0.4)",
  },
  {
    id: 2,
    label: "Star of Belief",
    message: "Aku percaya kamu bisa melewati BTCLS, OSCE, dan UKOM dengan luar biasa.",
    top: "35%",
    left: "75%",
    delay: 0.3,
    glow: "rgba(142, 197, 255, 0.4)",
  },
  {
    id: 3,
    label: "Star of Hope",
    message: "One step closer. Masa depan cerah sebagai perawat hebat menunggumu.",
    top: "65%",
    left: "15%",
    delay: 0.5,
    glow: "rgba(255, 255, 255, 0.5)",
  },
  {
    id: 4,
    label: "Star of Care",
    message: "Jangan lupa makan dan minum yang cukup ya di sela-sela belajarmu.",
    top: "75%",
    left: "80%",
    delay: 0.2,
    glow: "rgba(255, 215, 232, 0.4)",
  },
  {
    id: 5,
    label: "Star of Rest",
    message: "Istirahat juga penting. Tidur yang nyenyak malam ini, ya.",
    top: "45%",
    left: "45%",
    delay: 0.4,
    glow: "rgba(142, 197, 255, 0.4)",
  },
  {
    id: 6,
    label: "Star of Support",
    message: "Ingat, kamu tidak berjuang sendirian. Doaku selalu menyertaimu.",
    top: "20%",
    left: "60%",
    delay: 0.6,
    glow: "rgba(255, 255, 255, 0.4)",
  },
];

export default function InteractiveStars() {
  const [activeStar, setActiveStar] = useState<StarMessage | null>(null);

  return (
    <div className="relative w-full min-h-[450px] rounded-3xl glass-panel-blue p-8 flex flex-col justify-between overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute inset-0 bg-radial from-blue-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Header and instruction */}
      <div className="relative z-10 text-center max-w-md mx-auto mb-8">
        <span className="font-mono text-xs text-[#8EC5FF]/80 tracking-[0.2em] uppercase bg-[#8EC5FF]/10 px-3.5 py-1 rounded-full">
          Touch the Constellations
        </span>
        <h3 className="font-serif text-2xl text-[#FFD7E8] mt-3 mb-2 font-medium">
          Sentuhan Bintang Semangat
        </h3>
        <p className="font-sans text-xs text-slate-300">
          Klik pada bintang-bintang yang berpijar di langit malam ini untuk membaca pesan hangat yang kutitipkan di sana.
        </p>
      </div>

      {/* Star Field Container */}
      <div className="relative flex-1 min-h-[250px] w-full border border-white/5 rounded-2xl bg-[#030510]/50 overflow-hidden">
        {STAR_MESSAGES.map((star) => {
          const isActive = activeStar?.id === star.id;
          return (
            <motion.button
              key={star.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 80,
                delay: star.delay,
              }}
              onClick={() => setActiveStar(isActive ? null : star)}
              style={{ top: star.top, left: star.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
            >
              {/* Pulse Outer Aura */}
              <span
                className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle, ${star.glow} 0%, transparent 70%)`,
                }}
              />

              {/* Glowing ring */}
              <motion.div
                animate={{
                  scale: isActive ? [1, 1.4, 1] : [1, 1.15, 1],
                  opacity: isActive ? [0.8, 0.4, 0.8] : [0.5, 0.8, 0.5],
                }}
                transition={{
                  repeat: Infinity,
                  duration: isActive ? 2 : 3 + star.id,
                  ease: "easeInOut",
                }}
                className={`absolute -inset-2.5 rounded-full border ${
                  isActive ? "border-[#FFD7E8]/60 bg-[#FFD7E8]/10" : "border-[#8EC5FF]/20"
                }`}
              />

              {/* Star Core Icon */}
              <motion.div
                whileHover={{ scale: 1.3, rotate: 15 }}
                className={`relative z-10 p-1.5 rounded-full transition-colors duration-300 ${
                  isActive
                    ? "text-[#FFD7E8] drop-shadow-[0_0_10px_#FFD7E8]"
                    : "text-[#8EC5FF] group-hover:text-[#FFD7E8]"
                }`}
              >
                <Star className={`w-5 h-5 ${isActive ? "fill-current" : "fill-none"}`} />
              </motion.div>

              {/* Small Star Name Label */}
              <span className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-slate-400 tracking-wider bg-slate-950/70 px-1.5 py-0.5 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {star.label}
              </span>
            </motion.button>
          );
        })}

        {/* Message Presentation Panel inside Starfield */}
        <AnimatePresence mode="wait">
          {activeStar ? (
            <motion.div
              key={activeStar.id}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-panel-accent border border-[#FFD7E8]/35 shadow-[0_4px_24px_rgba(255,215,232,0.12)] flex items-start gap-3 z-20 pointer-events-auto"
            >
              <div className="p-2 rounded-lg bg-[#FFD7E8]/10 text-[#FFD7E8] shrink-0 mt-0.5">
                <MessageCircleHeart className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-1 space-y-1 text-left">
                <span className="font-mono text-[10px] text-[#FFD7E8]/80 uppercase tracking-widest font-semibold block">
                  {activeStar.label}
                </span>
                <p className="font-sans text-sm text-[#FFFFFF] leading-relaxed font-light">
                  {activeStar.message}
                </p>
              </div>
              <button
                onClick={() => setActiveStar(null)}
                className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-white/5"
              >
                ✕
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-500 font-sans text-xs tracking-wide"
            >
              <div className="text-center space-y-1.5 px-6">
                <Sparkles className="w-4 h-4 text-slate-500 mx-auto animate-pulse" />
                <p>Silakan klik salah satu bintang di atas...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
