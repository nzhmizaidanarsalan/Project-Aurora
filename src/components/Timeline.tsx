import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Clock, BookOpen, GraduationCap, ArrowUpRight, Sparkles } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  status: "completed" | "current" | "upcoming";
  icon: any;
  date: string;
  description: string;
  advice: string;
  color: string;
  glow: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "btcls",
    title: "BTCLS",
    subtitle: "Basic Trauma & Cardiac Life Support",
    status: "current",
    icon: Clock,
    date: "Sedang Berjalan",
    description: "Sertifikasi penanganan trauma dan kegawatdaruratan jantung. Langkah penting yang membuktikan kesiapanmu di situasi kritis.",
    advice: "Kamu sedang berjuang keras melewati pelatihan fisik dan mental ini! Nikmati setiap prosesnya karena kamu pasti bisa melaluinya dengan hebat.",
    color: "#8EC5FF",
    glow: "rgba(142, 197, 255, 0.25)",
  },
  {
    id: "enrichment",
    title: "Pengkayaan",
    subtitle: "Enrichment & Try Out Classes",
    status: "current",
    icon: Clock,
    date: "Sedang Berjalan",
    description: "Pendalaman materi komprehensif, latihan soal, dan try out berkala untuk menguji kesiapan klinis serta teori keperawatan.",
    advice: "Jangan merasa cemas kalau try out terasa sulit. Setiap soal salah adalah pelajaran baru. Nikmati proses belajarmu perlahan-lahan ya.",
    color: "#FFD7E8",
    glow: "rgba(255, 215, 232, 0.25)",
  },
  {
    id: "osce",
    title: "OSCE",
    subtitle: "Objective Structured Clinical Examination",
    status: "upcoming",
    icon: BookOpen,
    date: "Segera Hadir",
    description: "Ujian praktek klinik terstruktur langsung di laboratorium. Pengujian skill komunikasi terapeutik, steril, dan tindakan medis asli.",
    advice: "Kuncinya adalah ketenangan dan percaya diri. Tanganmu yang gemetar nanti akan terbiasa memberikan kesembuhan. Kamu pasti bisa!",
    color: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.2)",
  },
  {
    id: "ukom",
    title: "UKOM",
    subtitle: "Uji Kompetensi Keperawatan",
    status: "upcoming",
    icon: GraduationCap,
    date: "Gerbang Kelulusan",
    description: "Ujian negara penentu kelayakan registrasi sebagai perawat profesional (Ners). Langkah final perjuangan akademismu.",
    advice: "Ini adalah puncak dari seluruh perjuanganmu selama bertahun-tahun. Gelar perawat profesional sudah di depan mata. Sedikit lagi!",
    color: "#FFD7E8",
    glow: "rgba(255, 215, 232, 0.3)",
  },
];

export default function Timeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(MILESTONES[0]); // Default to "BTCLS" as current

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Interactive Timeline list (Left on large screen, top on mobile) */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="space-y-2">
          <span className="font-mono text-xs text-[#FFD7E8]/80 tracking-[0.2em] uppercase bg-[#FFD7E8]/10 px-3.5 py-1 rounded-full">
            Journey Milestones
          </span>
          <h3 className="font-serif text-3xl text-white font-medium">Peta Perjuanganmu</h3>
          <p className="font-sans text-sm text-[#8EC5FF]/80 leading-relaxed max-w-lg">
            Empat tahapan krusial yang sedang dan akan kamu lalui. Klik tiap tahapan untuk melihat detail pesan penguat di baliknya.
          </p>
        </div>

        {/* Timeline Path container */}
        <div className="relative pl-6 space-y-8 before:absolute before:left-[14px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#8EC5FF]/40 before:via-[#FFD7E8]/30 before:to-slate-800">
          {MILESTONES.map((milestone) => {
            const IconComponent = milestone.icon;
            const isSelected = selectedMilestone.id === milestone.id;
            
            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedMilestone(milestone)}
                className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 select-none group border ${
                  isSelected
                    ? "bg-[#050816]/60 border-[#FFD7E8]/30 shadow-[0_0_15px_rgba(255,215,232,0.08)]"
                    : "border-transparent hover:bg-white/5 hover:border-white/5"
                }`}
              >
                {/* Node Dot / Icon */}
                <div className="absolute left-[-22px] z-10">
                  <motion.div
                    animate={
                      milestone.status === "current"
                        ? { scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }
                        : {}
                    }
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 ${
                      milestone.status === "completed"
                        ? "bg-[#8EC5FF] border-[#8EC5FF]"
                        : milestone.status === "current"
                        ? "bg-[#FFD7E8] border-[#FFD7E8]"
                        : "bg-slate-900 border-slate-700"
                    }`}
                  >
                    {milestone.status === "completed" && (
                      <span className="block w-1.5 h-1.5 rounded-full bg-[#050816]" />
                    )}
                    {milestone.status === "current" && (
                      <span className="block w-1.5 h-1.5 rounded-full bg-[#050816] animate-ping" />
                    )}
                  </motion.div>
                </div>

                {/* Left Side Icon */}
                <div
                  className="p-3 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: isSelected ? `${milestone.color}15` : "rgba(255, 255, 255, 0.03)",
                    color: milestone.color,
                  }}
                >
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Titles */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-lg font-medium text-white group-hover:text-[#FFD7E8] transition-colors duration-200">
                      {milestone.title}
                    </h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      milestone.status === "completed"
                        ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        : milestone.status === "current"
                        ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                        : "bg-slate-800 text-slate-400 border border-slate-700/50"
                    }`}>
                      {milestone.date}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-slate-400 truncate max-w-[220px] md:max-w-none">
                    {milestone.subtitle}
                  </p>
                </div>

                {/* Click Hint Arrow */}
                <ArrowUpRight className={`w-4 h-4 text-slate-500 transition-all duration-300 ${
                  isSelected ? "text-[#FFD7E8] translate-x-0.5 -translate-y-0.5" : "group-hover:text-slate-300"
                }`} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Expanded Milestone Details Panel (Right side/bottom) */}
      <div className="flex-1">
        <motion.div
          key={selectedMilestone.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-full glass-panel-accent border border-[#FFD7E8]/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden"
          style={{
            boxShadow: `0 8px 32px rgba(5, 8, 22, 0.4), inset 0 0 20px ${selectedMilestone.glow}`,
          }}
        >
          {/* Subtle light leak pattern */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-radial from-white/5 to-transparent pointer-events-none" />

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-white/5" style={{ color: selectedMilestone.color }}>
                {<selectedMilestone.icon className="w-6 h-6" />}
              </span>
              <div>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">
                  Milestone Details
                </span>
                <h3 className="font-serif text-2xl text-white font-medium">
                  {selectedMilestone.title}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-mono text-[#8EC5FF] uppercase tracking-wider mb-1">Materi & Penjelasan</p>
                <p className="font-sans text-sm text-slate-300 leading-relaxed font-light">
                  {selectedMilestone.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#030510]/80 border border-white/5 relative">
                <Sparkles className="absolute top-3 right-3 w-4 h-4 text-[#FFD7E8] opacity-40 animate-pulse" />
                <p className="text-[10px] font-mono text-[#FFD7E8] uppercase tracking-wider mb-1.5">Note Penguat</p>
                <p className="font-sans text-sm text-[#FFD7E8]/90 italic leading-relaxed font-light">
                  "{selectedMilestone.advice}"
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Status: {selectedMilestone.date}</span>
            <span className="text-[#FFD7E8]">Stay strong, Annisa Mariatul Qibtia.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
