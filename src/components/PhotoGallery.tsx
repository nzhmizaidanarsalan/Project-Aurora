import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Sparkles, Pin, Trash2, Upload } from "lucide-react";

interface PolaroidItem {
  id: string;
  imageSrc: string;
  caption: string;
  date: string;
  rotation: number;
}

export default function PhotoGallery() {
  // Real generated Ghibli images, with local uploads added dynamically and saved to localStorage
  const [polaroids, setPolaroids] = useState<PolaroidItem[]>(() => {
    const saved = localStorage.getItem("annisa_memories");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load memories from localStorage", e);
      }
    }
    return [
      {
        id: "study",
        imageSrc: "/src/assets/images/cozy_night_study_1784354215235.jpg",
        caption: "Cozy Study Corner ✨",
        date: "Midnight Coffee",
        rotation: -3,
      },
      {
        id: "fireflies",
        imageSrc: "/src/assets/images/path_of_fireflies_1784354228528.jpg",
        caption: "Jalan Penuh Harapan 🌙",
        date: "Believe In Yourself",
        rotation: 4,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("annisa_memories", JSON.stringify(polaroids));
  }, [polaroids]);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle uploading photos to populate the Polaroid frame
  const handlePhotoUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const newPolaroid: PolaroidItem = {
          id: `custom-${Date.now()}`,
          imageSrc: e.target.result as string,
          caption: file.name.split(".")[0].substring(0, 20) || "My Memory 🌸",
          date: new Date().toLocaleDateString("id-ID", { month: "short", year: "numeric" }),
          rotation: (Math.random() - 0.5) * 8,
        };
        setPolaroids((prev) => [...prev, newPolaroid]);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = () => {
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoUpload(e.dataTransfer.files[0]);
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handlePhotoUpload(e.target.files[0]);
    }
  };

  const removePolaroid = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPolaroids((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="w-full space-y-10">
      <div className="text-center max-w-lg mx-auto">
        <span className="font-mono text-xs text-[#8EC5FF]/80 tracking-[0.2em] uppercase bg-[#8EC5FF]/10 px-3.5 py-1 rounded-full">
          Memory Lane
        </span>
        <h3 className="font-serif text-3xl text-[#FFD7E8] mt-3 mb-2 font-medium">
          Galeri Semangat & Memori
        </h3>
        <p className="font-sans text-sm text-slate-300">
          Beberapa visualisasi menenangkan khas Studio Ghibli. Kamu juga bisa memasukkan foto belajarmu, catatan penting, atau memorimu sendiri ke dalam galeri ini.
        </p>
      </div>

      {/* Grid containing Polaroids and drag-drop interface */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-center pt-4">
        
        {/* Render polaroids */}
        <AnimatePresence>
          {polaroids.map((polaroid) => (
            <motion.div
              key={polaroid.id}
              initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: hoveredId === polaroid.id ? 0 : polaroid.rotation,
                y: hoveredId === polaroid.id ? -12 : 0,
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
              }}
              onHoverStart={() => setHoveredId(polaroid.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="bg-white p-4 pb-8 rounded shadow-2xl relative group/card cursor-pointer border border-slate-200 w-full max-w-[280px] mx-auto select-none"
              style={{
                transformOrigin: "center bottom",
                transition: "box-shadow 0.3s ease",
              }}
            >
              {/* Push Pin */}
              <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 text-red-500/80 drop-shadow-md z-10">
                <Pin className="w-5 h-5 fill-current rotate-45" />
              </div>

              {/* Photo Frame Container */}
              <div className="bg-slate-950 w-full aspect-square overflow-hidden relative border border-slate-100 rounded-sm">
                <img
                  src={polaroid.imageSrc}
                  alt={polaroid.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlaid ambient lighting flare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              </div>

              {/* Caption & Date area in elegant retro handwritten feel */}
              <div className="pt-5 space-y-1 text-center font-serif text-slate-800">
                <p className="text-sm font-semibold tracking-wide truncate pr-2 pl-2">
                  {polaroid.caption}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{polaroid.date}</span>
                </div>
              </div>

              {/* Delete button for user uploaded files */}
              {polaroid.id.startsWith("custom-") && (
                <button
                  onClick={(e) => removePolaroid(polaroid.id, e)}
                  className="absolute bottom-2 right-2 p-1.5 rounded-full bg-red-100 text-red-600 border border-red-200 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 hover:bg-red-200 shadow-md"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Drag & Drop Upload Spot */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`h-[350px] w-full max-w-[280px] mx-auto rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-[#FFD7E8] bg-[#FFD7E8]/10 text-[#FFD7E8] shadow-[0_0_15px_rgba(255,215,232,0.2)]"
              : "border-slate-800 bg-[#030510]/30 text-slate-400 hover:border-[#8EC5FF]/50 hover:bg-[#8EC5FF]/5"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileSelect}
            accept="image/*"
            className="hidden"
          />

          <div className="p-4 rounded-full bg-slate-900/80 mb-4 border border-white/5 text-slate-300">
            <Camera className="w-8 h-8 animate-pulse text-[#8EC5FF]" />
          </div>

          <p className="font-serif text-base text-white font-medium mb-1">
            Tambah Memori Baru
          </p>
          <p className="font-sans text-xs text-slate-400 max-w-[180px] mx-auto leading-relaxed">
            Tarik & taruh fotomu di sini, atau klik untuk memilih file dari galerimu.
          </p>

          <div className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/5 text-[10px] font-mono uppercase tracking-wider text-slate-300">
            <Upload className="w-3 h-3 text-[#FFD7E8]" />
            <span>Upload Photo</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
