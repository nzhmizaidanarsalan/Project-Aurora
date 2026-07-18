import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Heart } from "lucide-react";

interface IntroSceneProps {
  onComplete: () => void;
}

export default function IntroScene({ onComplete }: IntroSceneProps) {
  const [loadingStage, setLoadingStage] = useState<"stars" | "typing1" | "typing2" | "ready">("stars");
  const [progress, setProgress] = useState(0);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const fullText1 = "Hi Annisa Mariatul Qibtia.";
  const fullText2 = "Aku bikin ini bukan buat nambah beban pikiran kamu.";

  // Loading progress
  useEffect(() => {
    if (loadingStage !== "stars") return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoadingStage("typing1"), 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loadingStage]);

  // Typewriter 1: "Hi Annisa."
  useEffect(() => {
    if (loadingStage !== "typing1") return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText1.length) {
        setText1(fullText1.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoadingStage("typing2"), 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [loadingStage]);

  // Typewriter 2: "Aku bikin ini bukan buat nambah beban pikiran kamu."
  useEffect(() => {
    if (loadingStage !== "typing2") return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText2.length) {
        setText2(fullText2.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoadingStage("ready"), 1200);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [loadingStage]);

  return (
    <div id="intro-container" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050816] px-6 text-center select-none overflow-hidden">
      {/* Absolute Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

      <AnimatePresence mode="wait">
        {loadingStage === "stars" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center space-y-8"
          >
            {/* Pulsing Loading Stars (Glow) */}
            <div className="flex space-x-3 items-center justify-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.3, opacity: 0.1 }}
                  animate={{
                    scale: [0.6, 1.2, 0.6],
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                  className="text-[#FFD7E8]"
                >
                  <Sparkles className={`w-5 h-5 ${i === 2 ? "w-8 h-8 text-[#8EC5FF]" : ""}`} />
                </motion.div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs text-[#8EC5FF]/70 tracking-[0.25em] uppercase">
                Preparing Night Sky
              </p>
              <div className="w-48 h-[2px] bg-slate-950 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-300 via-pink-200 to-[#8EC5FF]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="font-mono text-[10px] text-slate-500">{Math.min(progress, 100)}%</p>
            </div>
          </motion.div>
        )}

        {(loadingStage === "typing1" || loadingStage === "typing2" || loadingStage === "ready") && (
          <motion.div
            key="story"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 1 }}
            className="max-w-xl mx-auto flex flex-col items-center justify-center space-y-8 min-h-[250px]"
          >
            <div className="space-y-6">
              {/* "Hi Annisa." */}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#FFD7E8] font-medium leading-tight tracking-wide min-h-[60px] glow-text-pink">
                {text1}
              </h1>

              {/* "Aku bikin ini bukan buat nambah beban pikiran kamu." */}
              <p className="font-sans text-lg md:text-xl text-[#8EC5FF]/90 font-light leading-relaxed tracking-wide min-h-[70px] max-w-md mx-auto">
                {text2}
                {loadingStage === "typing2" && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-1.5 h-5 bg-[#8EC5FF] ml-1 align-middle"
                  />
                )}
              </p>
            </div>

            {/* Premium Interactive Button */}
            {loadingStage === "ready" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                className="pt-6"
              >
                <button
                  onClick={onComplete}
                  className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD7E8]/10 via-pink-500/10 to-[#8EC5FF]/10 text-white font-medium border border-[#FFD7E8]/30 overflow-hidden shadow-[0_0_30px_rgba(255,215,232,0.15)] transition-all duration-500 hover:border-[#8EC5FF]/50 hover:shadow-[0_0_40px_rgba(142,197,255,0.3)] active:scale-95 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD7E8]/5 to-[#8EC5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <Heart className="w-4 h-4 text-[#FFD7E8] fill-[#FFD7E8]/20 group-hover:scale-110 group-hover:fill-[#FFD7E8]/40 transition-all duration-300" />
                  
                  <span className="text-sm font-sans tracking-widest uppercase text-slate-100 font-semibold">
                    Lanjutkan
                  </span>
                  
                  <ArrowRight className="w-4 h-4 text-[#8EC5FF] group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
