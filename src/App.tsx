import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, Moon, Compass, RefreshCw, AlertCircle } from "lucide-react";
import ParticleBackground from "./components/ParticleBackground";
import IntroScene from "./components/IntroScene";
import AmbientAudio from "./components/AmbientAudio";
import Timeline from "./components/Timeline";
import InteractiveStars from "./components/InteractiveStars";
import PhotoGallery from "./components/PhotoGallery";
import DigitalLetter from "./components/DigitalLetter";
import ClarificationScene from "./components/ClarificationScene";
import ApologyScene from "./components/ApologyScene";
import LastConstellation from "./components/LastConstellation";
import EasterEgg from "./components/EasterEgg";

export default function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isForgiven, setIsForgiven] = useState(false);
  const totalScenes = 9;

  const scrollProgress = ((currentScene + 1) / totalScenes) * 100;

  // Restart narrative handler
  const restartNarrative = () => {
    setCurrentScene(0);
    setIsForgiven(false); // reset forgiveness upon restart
    setShowMainContent(false);
  };

  const nextScene = () => {
    if (currentScene === 3 && !isForgiven) {
      // Require forgiveness before moving forward from scene 3
      return;
    }
    if (currentScene < totalScenes - 1) {
      setCurrentScene((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevScene = () => {
    if (currentScene > 0) {
      setCurrentScene((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-white selection:bg-pink-300/30 selection:text-white">
      
      {/* 1. Immersive Particle Background */}
      <ParticleBackground />

      {/* 2. Audio Player (starts when main content begins) */}
      <AmbientAudio startPlaying={showMainContent} />

      {/* 3. Hidden Easter Egg Star (Enabled throughout) */}
      <EasterEgg />

      <AnimatePresence mode="wait">
        {!showMainContent ? (
          /* Scene 1: Cinematic Loading and Typewriter Intro */
          <motion.div key="intro" exit={{ opacity: 0 }}>
            <IntroScene onComplete={() => setShowMainContent(true)} />
          </motion.div>
        ) : (
          /* Scene 2-9: Smooth-Scrolling Cinematic Narrative Layout */
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10 font-sans min-h-screen flex flex-col justify-between"
          >
            {/* Scroll/Scene Progress Indicator Bar (Apple style) */}
            <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-900/50 z-50">
              <div
                className="h-full bg-gradient-to-r from-[#FFD7E8] via-[#8EC5FF] to-[#FFD7E8] transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            {/* Glowing Big Moon Background Decorative element */}
            <div className="absolute top-[5%] left-[50%] -translate-x-1/2 w-80 h-80 rounded-full bg-radial from-slate-200/5 via-transparent to-transparent blur-[60px] pointer-events-none" />

            {/* Header branding */}
            <header className="absolute top-0 inset-x-0 h-24 flex items-center justify-between px-6 max-w-7xl mx-auto z-20">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={restartNarrative}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500/20 to-blue-500/20 flex items-center justify-center border border-white/10">
                  <Moon className="w-4 h-4 text-[#FFD7E8] fill-current" />
                </div>
                <span className="font-serif text-lg font-semibold tracking-wider text-[#FFD7E8] glow-text-pink">
                  Project Aurora
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 text-xs font-mono text-slate-400 text-right"
              >
                <div>
                  <span className="block text-[#FFD7E8] font-medium">For: Annisa Mariatul Qibtia 🌸</span>
                  <span className="block text-[10px] text-slate-500">From: Nazhmi deting aneh yang nyebelin.</span>
                </div>
              </motion.div>
            </header>

            {/* MAIN NARRATIVE CONTENT */}
            <main className="flex-1 max-w-4xl w-full mx-auto px-6 pt-32 pb-16 flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                <div className="w-full">
                  {currentScene === 0 && (
                    <motion.section
                      key="acknowledgment"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="min-h-[45vh] flex flex-col items-center justify-center text-center space-y-8 relative"
                    >
                      {/* Visual Cloud element (Vector CSS style) */}
                      <div className="absolute top-0 right-10 w-48 h-12 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute bottom-10 left-10 w-64 h-16 bg-[#8EC5FF]/5 rounded-full blur-3xl pointer-events-none" />

                      <div className="space-y-6">
                        <div className="inline-flex items-center justify-center gap-2 p-2 rounded-full bg-white/5 border border-white/10 text-[#8EC5FF] text-xs font-mono tracking-widest uppercase">
                          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                          <span>Kejujuran</span>
                        </div>

                        <h2 className="font-serif text-4xl md:text-6xl text-[#FFD7E8] font-medium leading-tight max-w-2xl mx-auto glow-text-pink">
                          Hai.
                        </h2>
                        
                        <div className="font-sans text-lg md:text-xl text-[#8EC5FF]/90 font-light max-w-xl mx-auto leading-relaxed space-y-4 pt-2">
                          <p>Kalau sekarang kamu lagi capek...</p>
                          <p>Tarik napas sebentar yaaaaaa</p>
                          <p className="text-white font-medium">Luangin waktu Buat Lihat Ini</p>
                          <p className="text-[#FFD7E8] text-base md:text-lg">Sekitar dua menit aja, Boleh ?</p>
                        </div>
                      </div>
                    </motion.section>
                  )}

                  {currentScene === 1 && (
                    <motion.section
                      key="milestones-timeline"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.6 }}
                      className="w-full"
                    >
                      <Timeline />
                    </motion.section>
                  )}

                  {currentScene === 2 && (
                    <motion.section
                      key="appreciation"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="relative w-full py-8"
                    >
                      <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-3xl blur-2xl opacity-55 pointer-events-none" />
                      
                      <div className="relative p-8 md:p-12 rounded-3xl glass-panel-accent border border-[#FFD7E8]/25 text-center space-y-6 max-w-2xl mx-auto">
                        <Heart className="w-8 h-8 text-pink-400 fill-pink-400/20 mx-auto animate-pulse" />
                        
                        <h3 className="font-serif text-2xl md:text-3xl text-white font-medium leading-relaxed">
                          "Aku bangga lihat perjuangan kamu."
                        </h3>
                        
                        <div className="font-sans text-base text-slate-300 font-light leading-relaxed max-w-md mx-auto space-y-2">
                          <p>Aku tahu ini bukan perjalanan yang gampang.</p>
                          <p>Tapi kamu udah sampai sejauh ini.</p>
                          <p>Itu artinya kamu memang layak berada di titik ini.</p>
                        </div>

                        <p className="font-sans text-sm md:text-base text-pink-300 font-medium leading-relaxed max-w-md mx-auto pt-4 border-t border-white/5">
                          Sedikit lagi ya. Kamu adalah cewek hebat yang pernah aku Temui. -Nazhmi si Aneh itu
                        </p>
                      </div>
                    </motion.section>
                  )}

                  {currentScene === 3 && (
                    <motion.section
                      key="apology"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="w-full max-w-2xl mx-auto py-8"
                    >
                      <ApologyScene isForgiven={isForgiven} setIsForgiven={setIsForgiven} />
                    </motion.section>
                  )}

                  {currentScene === 4 && (
                    <motion.section
                      key="clarification"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6 }}
                      className="w-full max-w-2xl mx-auto py-8"
                    >
                      <ClarificationScene />
                    </motion.section>
                  )}

                  {currentScene === 5 && (
                    <motion.section
                      key="star-constellation"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="w-full"
                    >
                      <InteractiveStars />
                    </motion.section>
                  )}

                  {currentScene === 6 && (
                    <motion.section
                      key="gallery"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="w-full"
                    >
                      <PhotoGallery />
                    </motion.section>
                  )}

                  {currentScene === 7 && (
                    <motion.section
                      key="digital-letter"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.6 }}
                      className="w-full"
                    >
                      <DigitalLetter />
                    </motion.section>
                  )}

                  {currentScene === 8 && (
                    <motion.section
                      key="outro"
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="text-center space-y-10 py-12 relative w-full"
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-[90px] pointer-events-none" />

                      <div className="space-y-6">
                        <span className="font-mono text-xs text-[#FFD7E8]/80 tracking-[0.25em] uppercase bg-[#FFD7E8]/10 px-3.5 py-1 rounded-full inline-block">
                          Langkah Terakhir
                        </span>

                        <div className="pt-4 w-full max-w-2xl mx-auto">
                          <LastConstellation />
                        </div>
                      </div>

                      {/* Confetti-like ambient sparklers */}
                      <div className="flex justify-center items-center gap-3 pt-4">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{
                              y: [-5, 5, -5],
                              opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.5 + i * 0.4,
                            }}
                            className="text-pink-300"
                          >
                            <Sparkles className="w-5 h-5" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Narrative re-start option */}
                      <div className="pt-12 border-t border-slate-900/60 max-w-xs mx-auto">
                        <button
                          onClick={restartNarrative}
                          className="group flex items-center justify-center gap-2 mx-auto text-xs font-mono text-slate-500 hover:text-[#8EC5FF] transition-colors duration-300 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-180" />
                          <span>Ulangi Perjalanan</span>
                        </button>
                      </div>
                    </motion.section>
                  )}
                </div>
              </AnimatePresence>

              {/* Elegant Navigation Controls (Tombol Hati Kecil buat melanjutkan) */}
              <div className="flex flex-col items-center justify-center gap-6 pt-12 mt-12 border-t border-slate-900/30">
                <div className="flex items-center justify-center gap-6 w-full max-w-md">
                  {currentScene > 0 && (
                    <button
                      onClick={prevScene}
                      className="px-5 py-2.5 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      Sebelumnya
                    </button>
                  )}
                  
                  {currentScene < totalScenes - 1 && (
                    <button
                      onClick={nextScene}
                      disabled={currentScene === 3 && !isForgiven}
                      className={`group relative flex items-center gap-3 px-7 py-3 rounded-full font-medium border shadow-[0_0_25px_rgba(255,215,232,0.12)] transition-all duration-300 active:scale-95 cursor-pointer ${
                        currentScene === 3 && !isForgiven
                          ? "opacity-40 cursor-not-allowed bg-slate-900/50 text-slate-500 border-slate-800"
                          : "bg-pink-500/10 text-[#FFD7E8] border-[#FFD7E8]/20 hover:border-[#FFD7E8]/50 hover:bg-pink-500/20"
                      }`}
                    >
                      <Heart className={`w-4 h-4 text-pink-400 fill-pink-400/30 group-hover:scale-125 group-hover:fill-pink-400/60 transition-all duration-300 animate-pulse ${
                        currentScene === 3 && !isForgiven ? "opacity-20 animate-none fill-none text-slate-600" : ""
                      }`} />
                      <span className="text-xs font-sans tracking-[0.2em] uppercase font-bold text-slate-100">
                        {currentScene === 3 && !isForgiven ? "Maafin Dulu" : "Lanjutkan"}
                      </span>
                    </button>
                  )}
                </div>
                
                {/* Dots Progress Indicator */}
                <div className="flex gap-2.5">
                  {Array.from({ length: totalScenes }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentScene(idx);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx === currentScene ? "w-8 bg-[#FFD7E8]" : "w-1.5 bg-slate-800 hover:bg-slate-700"
                      }`}
                      aria-label={`Go to scene ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </main>

            {/* Accessibility support / footer */}
            <footer className="border-t border-slate-950 py-8 bg-[#030510]/90 text-center text-xs font-mono text-slate-600 relative z-10">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p>© 2026 Project Aurora. Made for Annisa Mariatul Qibtia with care.</p>
                <div className="flex items-center gap-4">
                  <span className="hover:text-slate-400 cursor-help" title="Website ini menggunakan keyboard navigation friendly">
                    ♿ Accessibility Active
                  </span>
                  <span>•</span>
                  <span>Responsive Mode</span>
                </div>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
