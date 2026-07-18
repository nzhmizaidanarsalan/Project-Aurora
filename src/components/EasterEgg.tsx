import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Sparkles, Heart } from "lucide-react";

export default function EasterEgg() {
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play a beautiful, escalating chime sound when clicked
  const playChime = (pitchIndex: number) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioContextClass();
      audioCtxRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pentatonic pitch escalation (C5, D5, E5, G5, A5, C6)
      const pitches = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      const freq = pitches[Math.min(pitchIndex, pitches.length - 1)];

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Sweet vibey echo delay
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.6);
    } catch (e) {
      // Audio context might fail on some browsers
    }
  };

  const handleStarClick = () => {
    const nextCount = clickCount + 1;
    playChime(nextCount - 1);

    if (nextCount >= 5) {
      setClickCount(0);
      setShowSecret(true);
      // Final romantic major chord shimmer
      setTimeout(() => playChime(5), 150);
    } else {
      setClickCount(nextCount);
    }
  };

  return (
    <>
      {/* Tiny Hidden Interactive Star in the bottom left corner */}
      <div id="hidden-easter-egg-star" className="fixed bottom-6 left-6 z-40 select-none">
        <button
          onClick={handleStarClick}
          className="group relative p-2.5 rounded-full hover:bg-white/5 transition-all duration-300 cursor-pointer focus:outline-none"
          title="A secret constellation..."
        >
          {/* Subtle glow background */}
          <span className="absolute inset-0 rounded-full bg-pink-500/0 group-hover:bg-pink-500/5 blur-sm transition-all duration-300" />
          
          <Star
            className={`w-3.5 h-3.5 transition-all duration-500 ${
              clickCount > 0
                ? "text-[#FFD7E8] scale-125 rotate-45 drop-shadow-[0_0_8px_#FFD7E8]"
                : "text-slate-700 hover:text-[#8EC5FF]/60"
            }`}
          />

          {/* Tiny incremental bubble */}
          {clickCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[8px] font-mono font-bold px-1 rounded-full bg-pink-500/20 text-[#FFD7E8] border border-[#FFD7E8]/20 animate-bounce">
              {clickCount}
            </span>
          )}
        </button>
      </div>

      {/* Secret Message Overlay Dialog */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl"
          >
            {/* Ambient colorful star glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-pink-500/10 blur-[80px]" />

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative w-full max-w-sm glass-panel-accent border border-[#FFD7E8]/30 rounded-2xl p-6 md:p-8 text-center space-y-6 shadow-[0_20px_50px_rgba(255,215,232,0.15)]"
            >
              <div className="flex justify-center">
                <div className="relative p-3.5 rounded-full bg-[#FFD7E8]/10 text-[#FFD7E8]">
                  <Sparkles className="w-6 h-6 animate-spin-slow" />
                  <Heart className="w-3.5 h-3.5 text-pink-500 absolute bottom-1 right-1 animate-pulse" />
                </div>
              </div>

              <div className="space-y-3">
                <span className="font-mono text-[9px] text-[#FFD7E8]/80 uppercase tracking-widest font-semibold bg-[#FFD7E8]/10 px-2.5 py-0.5 rounded-full">
                  Secret Confession
                </span>
                
                {/* Sincere Confession Text */}
                <p className="font-serif text-lg text-white leading-relaxed font-light italic">
                  "Aku memang suka sama kamu. <br className="hidden md:inline" />
                  Tapi... <br className="hidden md:inline" />
                  Aku lebih pengen lihat kamu berhasil dulu."
                </p>
              </div>

              <div className="flex justify-center text-red-400">
                <Heart className="w-6 h-6 fill-current animate-bounce" />
              </div>

              <button
                onClick={() => setShowSecret(false)}
                className="w-full font-mono text-xs text-slate-950 bg-gradient-to-r from-[#FFD7E8] to-[#8EC5FF] font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all duration-300 focus:outline-none"
              >
                Simpan Rahasia Ini ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
