import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Smile } from "lucide-react";

interface ApologySceneProps {
  isForgiven: boolean;
  setIsForgiven: (val: boolean) => void;
}

export default function ApologyScene({ isForgiven, setIsForgiven }: ApologySceneProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [attemptCount, setAttemptCount] = useState(0);

  // Playful titles/labels for "Gak Dimaafin" when it runs away
  const messages = [
    "Eits, gak bisa ditekann! 😜",
    "Coba lagi kalau bisaa~ 🤫",
    "Hehehe, tombolnya pinter lari! 🏃‍♂️",
    "Ups! Hampir aja! ⚡",
    "Tetep gak bisa, harus dimaafin dong! ✨",
    "Gak ada pilihan lain selain dimaafin! ❤️"
  ];

  const handleNoButtonHover = () => {
    // Generate a new random translation within container limits
    const maxOffset = 130; // Max pixels to move left/right/up/down
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * maxOffset * 2;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setAttemptCount((prev) => prev + 1);
  };

  return (
    <div id="apology-scene" className="relative w-full min-h-[420px] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-3xl glass-panel-accent border border-[#FFD7E8]/15 py-12">
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {!isForgiven ? (
          <motion.div
            key="ask-forgiveness"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md mx-auto space-y-8 relative z-10"
          >
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-[#FFD7E8] tracking-[0.3em] uppercase bg-pink-500/10 px-4 py-1.5 rounded-full inline-block border border-pink-500/20">
                Pesan Penting 💌
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white font-medium leading-relaxed">
                Anisa, maafin aku soal obrolan semalem ya? 🥺
              </h3>
              <p className="font-sans text-sm text-[#8EC5FF]/80 leading-relaxed max-w-xs mx-auto">
                Aku bener-bener minta maaf. Tolong dimaafin yaaa...
              </p>
            </div>

            {/* Interactive Buttons Container */}
            <div className="relative min-h-[140px] flex items-center justify-center gap-6 mt-8">
              {/* Dimaafin Button */}
              <button
                id="btn-dimaafin"
                onClick={() => setIsForgiven(true)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-medium text-sm tracking-widest uppercase border border-pink-400/30 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white animate-pulse" />
                Dimaafin
              </button>

              {/* Gak Dimaafin Button (runs away) */}
              <motion.div
                animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute md:relative"
              >
                <button
                  id="btn-gak-dimaafin"
                  onMouseEnter={handleNoButtonHover}
                  onTouchStart={(e) => {
                    e.preventDefault(); // Prevent double triggering on mobile
                    handleNoButtonHover();
                  }}
                  onClick={handleNoButtonHover}
                  className="px-6 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 font-medium text-xs tracking-wider border border-white/5 transition-colors cursor-pointer select-none whitespace-nowrap"
                >
                  Gak Dimaafin
                </button>
              </motion.div>
            </div>

            {/* Hint message when user tries to click the run-away button */}
            {attemptCount > 0 && (
              <motion.p
                key={attemptCount}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-mono text-[10px] text-pink-300/80 min-h-[16px]"
              >
                {messages[(attemptCount - 1) % messages.length]}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="success-response"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl mx-auto space-y-6 relative z-10 py-4"
          >
            <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center border border-pink-500/20 mx-auto mb-2 animate-bounce">
              <Smile className="w-8 h-8 text-[#FFD7E8]" />
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-xl md:text-2xl text-[#FFD7E8] font-medium leading-relaxed">
                Alhamdulillah, Makasih Banyak ya! ❤️
              </h4>
              
              <div className="font-sans text-base md:text-lg text-slate-200 font-light leading-relaxed space-y-4 max-w-lg mx-auto">
                <p>
                  "Aku sempat ngomong sesuatu yang ternyata bikin kamu salah paham. Dan aku bersyukur kamu masih mau denger penjelasanku."
                </p>
                <p className="text-pink-300 font-medium">
                  Makasih ya.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <span className="font-mono text-[10px] text-slate-500 tracking-wider">
                Silakan klik tombol hati di bawah untuk melanjutkan perjalanan 🌸
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
