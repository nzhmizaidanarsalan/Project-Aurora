import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, AlertCircle, Play, Pause, ChevronRight } from "lucide-react";

interface ClarificationLine {
  text: string;
  duration: number;
  hasHeart?: boolean;
}

const LINES: ClarificationLine[] = [
  { text: "Aku gak berharap...", duration: 2500 },
  { text: "Kamu langsung percaya.", duration: 2500 },
  { text: "Karena...", duration: 2000 },
  { text: "Percaya...", duration: 2000 },
  { text: "Dibangun oleh waktu.", duration: 3000 },
  { text: "Dan aku...", duration: 2500 },
  { text: "Gak keberatan...", duration: 2500 },
  { text: "Nunggu itu. ❤️", duration: 3500 },
  { text: "Jadi...", duration: 2000 },
  { text: "Untuk sekarang...", duration: 2500 },
  { text: "Fokus dulu ya.", duration: 2500 },
  { text: "Ke BTCLS.", duration: 2000 },
  { text: "Ke OSCE.", duration: 2000 },
  { text: "Ke UKOM.", duration: 2000 },
  { text: "Aku bakal dukung dari jauh. ❤️", duration: 4000 }
];

export default function ClarificationScene() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const currentLine = LINES[index];
    const timer = setTimeout(() => {
      if (index < LINES.length - 1) {
        setIndex((prev) => prev + 1);
      } else {
        // Loop back or hold on last line
        setIsPlaying(false);
      }
    }, currentLine.duration);

    return () => clearTimeout(timer);
  }, [index, isPlaying]);

  const goToNext = () => {
    if (index < LINES.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0);
      setIsPlaying(true);
    }
  };

  const goToPrev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full min-h-[450px] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-3xl glass-panel-accent border border-[#FFD7E8]/10 py-12">
      {/* Absolute faint background lights */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD7E8]/2 to-transparent pointer-events-none" />

      {/* Floating Sparkles decorative */}
      <div className="absolute top-8 left-8 text-[#FFD7E8]/20 animate-pulse">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute bottom-8 right-8 text-[#8EC5FF]/20 animate-pulse">
        <AlertCircle className="w-5 h-5" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center justify-between min-h-[220px]">
        {/* Subtle Category Header */}
        <span className="font-mono text-[9px] text-[#FFD7E8]/60 tracking-[0.3em] uppercase bg-[#FFD7E8]/5 px-3 py-1 rounded-full mb-6">
          Klarifikasi Jujur • Nazhmi
        </span>

        {/* Animated Sequential Text Display */}
        <div className="flex-1 flex items-center justify-center py-6 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.h3
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="font-serif text-2xl md:text-3xl text-white font-light leading-relaxed tracking-wide"
            >
              {LINES[index].text}
            </motion.h3>
          </AnimatePresence>
        </div>

        {/* Controller and Progress Dots */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrev}
              disabled={index === 0}
              className="p-1.5 rounded-full hover:bg-white/5 text-slate-500 hover:text-slate-300 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer"
              title="Previous sentence"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-[#FFD7E8]/10 text-[#FFD7E8] border border-[#FFD7E8]/25 hover:bg-[#FFD7E8]/20 transition-all cursor-pointer"
              title={isPlaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={goToNext}
              className="p-1.5 rounded-full hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-all cursor-pointer"
              title="Next sentence"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Miniature index dots */}
          <div className="flex gap-1.5">
            {LINES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === index ? "w-4 bg-[#FFD7E8]" : "w-1 bg-slate-800 hover:bg-slate-700"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <p className="font-mono text-[9px] text-slate-500 tracking-wider">
            {isPlaying ? "Autoplay aktif (bisa dipause/klik manual)" : "Selesai diputar. Klik tombol play untuk mengulangi"}
          </p>
        </div>
      </div>
    </div>
  );
}
