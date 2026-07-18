import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MailOpen, Sparkles, Heart } from "lucide-react";

export default function DigitalLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center space-y-8 py-6">
      <div className="text-center space-y-2">
        <span className="font-mono text-xs text-[#FFD7E8]/80 tracking-[0.2em] uppercase bg-[#FFD7E8]/10 px-3.5 py-1 rounded-full">
          The Sincere Message
        </span>
        <h3 className="font-serif text-3xl text-white font-medium">Surat Terbuka untuk Annisa Mariatul Qibtia</h3>
        <p className="font-sans text-sm text-[#8EC5FF]/80 max-w-xs md:max-w-md mx-auto">
          Klik amplop di bawah ini untuk membuka sebuah surat yang ditulis tulus dari dalam hati.
        </p>
      </div>

      {/* Envelope Area Container */}
      <div className="relative w-full aspect-[4/3] max-w-sm flex items-center justify-center select-none pt-4">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED ENVELOPE DESIGN */
            <motion.div
              key="closed"
              onClick={() => setIsOpen(true)}
              className="relative w-80 h-48 rounded-2xl glass-panel-accent border border-[#FFD7E8]/30 shadow-[0_20px_50px_rgba(255,215,232,0.1)] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(255,215,232,0.2)]"
              whileHover={{ y: -4 }}
            >
              {/* Back side panel of envelope lines */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-1/2 h-full border-r border-b border-[#FFD7E8]/10 bg-gradient-to-tr from-transparent to-[#FFD7E8]/5 origin-top-left -skew-y-12" />
                <div className="absolute top-0 right-0 w-1/2 h-full border-l border-b border-[#FFD7E8]/10 bg-gradient-to-tl from-transparent to-[#FFD7E8]/5 origin-top-right skew-y-12" />
              </div>

              {/* Glowing Heart Seal (Action trigger) */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 10px rgba(255, 215, 232, 0.2)",
                    "0 0 25px rgba(255, 215, 232, 0.5)",
                    "0 0 10px rgba(255, 215, 232, 0.2)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="z-10 p-4 rounded-full bg-gradient-to-r from-pink-400 to-[#FFD7E8] text-slate-950 border-2 border-white shadow-xl cursor-pointer"
              >
                <Heart className="w-6 h-6 fill-current text-pink-600" />
              </motion.div>

              <div className="z-10 mt-3 text-center">
                <p className="font-serif text-xs text-[#FFD7E8] tracking-widest font-semibold uppercase animate-pulse">
                  Buka Surat
                </p>
                <div className="flex items-center justify-center gap-1 mt-1 text-[9px] font-mono text-slate-400 tracking-wider">
                  <Mail className="w-3 h-3 text-[#8EC5FF]" />
                  <span>dari: Seseorang yang Mendoakanmu</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* OPENED ENVELOPE / PAPER ANIMATION */
            <motion.div
              key="opened"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full flex flex-col items-center"
            >
              {/* Paper Slide Up out of Envelope */}
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 70, damping: 15 }}
                className="bg-white text-slate-800 p-6 md:p-8 rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-slate-100 w-80 md:w-[440px] text-left relative z-20 pointer-events-auto"
              >
                {/* Floating ambient aesthetic stamp */}
                <div className="absolute top-4 right-4 flex flex-col items-end opacity-20 font-mono text-[8px] text-slate-800">
                  <span className="border-2 border-dashed border-slate-800 p-1 font-bold rounded-md rotate-12">
                    POSTAGE PAID
                  </span>
                  <span>17.07.26</span>
                </div>

                <div className="space-y-4">
                  {/* Salutation */}
                  <h4 className="font-serif text-xl md:text-2xl text-slate-900 border-b border-slate-100 pb-3 font-semibold tracking-wide flex items-center gap-2">
                    Dear Annisa Mariatul Qibtia,
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  </h4>

                  {/* Letter body */}
                  <div className="font-sans text-xs md:text-sm text-slate-700 leading-relaxed font-normal space-y-3.5 h-[280px] overflow-y-auto pr-1">
                    <p>
                      Aku tahu belakangan ini hari-harimu terasa begitu padat dan melelahkan. Di antara tumpukan materi BTCLS, jadwal kelas pengkayaan yang padat, persiapan OSCE, dan kecemasan menghadapi UKOM, rasanya waktu berjalan begitu cepat sekaligus menegangkan.
                    </p>
                    <p>
                      Melalui lembaran surat digital ini, aku hanya ingin menyampaikan satu hal sederhana:{" "}
                      <strong className="text-slate-900 font-semibold underline decoration-pink-300 decoration-2">
                        Aku sangat bangga melihat betapa gigihnya kamu berjuang selama ini.
                      </strong>
                    </p>
                    <p>
                      Setiap keluh kesah, waktu tidur yang berkurang, dan kekhawatiran yang singgah, adalah anak tangga yang sedang kamu susun satu per satu menuju impianmu sebagai seorang Ners yang hebat. Perjalanan ini memang melelahkan, tapi percayalah, kapasitas dirimu jauh lebih besar dari rasa lelahmu.
                    </p>
                    <p>
                      Jangan pernah ragu pada kemampuanmu sendiri ya. Saat semuanya terasa terlalu bising, tarik napas dalam-dalam, istirahat sejenak, lalu ingatlah bahwa kamu sudah menempuh jarak sejauh ini. Kamu hebat sekali.
                    </p>
                    <p>
                      Lalui ujian demi ujian ini dengan tenang, satu per satu. Aku di sini akan selalu mendukungmu, menemani langkahmu, dan mendoakan kelancaran untuk setiap proses yang kamu hadapi.
                    </p>
                    <p>
                      Sedikit lagi, Annisa Mariatul Qibtia. Berjuanglah dengan penuh keyakinan. Aku menanti senyum kelegaanmu di garis akhir kelulusan nanti.
                    </p>
                  </div>

                  {/* Sign off */}
                  <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs text-slate-500 font-mono">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-pink-500 fill-current" />
                      <span>Always beside you,</span>
                    </div>
                    <span className="font-serif font-bold text-slate-800 text-sm italic">Aku.</span>
                  </div>
                </div>
              </motion.div>

              {/* Envelope back container behind paper */}
              <div className="w-80 h-16 bg-[#050816]/80 rounded-b-2xl border-x border-b border-[#FFD7E8]/10 absolute bottom-[-16px] z-10 shadow-lg" />

              {/* Close Button to return */}
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 font-mono text-[10px] text-slate-400 hover:text-white uppercase tracking-widest bg-slate-950/60 border border-white/5 px-4 py-2 rounded-full transition-all duration-300 hover:border-[#FFD7E8]/30 flex items-center gap-1.5 cursor-pointer"
              >
                <MailOpen className="w-3 h-3 text-[#FFD7E8]" />
                <span>Tutup & Lipat Surat</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
