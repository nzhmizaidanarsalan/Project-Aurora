import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  color: string;
}

interface HeartParticle {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  progress: number;
  delay: number;
  pulseOffset: number;
}

export default function LastConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [stage, setStage] = useState<number>(0); 
  // 0: Dark ambient, 1: Shooting stars, 2: Swarming to center, 3: Heart outline breathing, 4: Narrative reveal
  const [showLetters, setShowLetters] = useState<boolean>(false);

  // Refs to hold dynamic simulation variables
  const particlesRef = useRef<HeartParticle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const stageRef = useRef<number>(0);

  // Keep stageRef updated for access inside canvas loop
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  // Timed state sequence
  useEffect(() => {
    // Stage 0 -> 1 (Ambient -> Shooting Stars) after 1.5s
    const t1 = setTimeout(() => {
      setStage(1);
    }, 1500);

    // Stage 1 -> 2 (Shooting stars -> Swarm to Center) after 4s
    const t2 = setTimeout(() => {
      setStage(2);
    }, 4000);

    // Stage 2 -> 3 (Gathering -> Heart outline complete) after 6.5s
    const t3 = setTimeout(() => {
      setStage(3);
    }, 6500);

    // Transition to Stage 4 (Narrative reveal) after 8s
    const t4 = setTimeout(() => {
      setStage(4);
    }, 8000);

    // Fade in text sequence shortly after Stage 4 begins
    const t5 = setTimeout(() => {
      setShowLetters(true);
    }, 9000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Initialize and run Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high density display pixel ratio
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Setup particles representing the Heart shape
    const setupParticles = () => {
      const pCount = 90; // Stable, premium count
      const particles: HeartParticle[] = [];
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = 130; // centered in upper area so there is room for the message below

      // Heart scale factor
      const scaleFactor = rect.width < 500 ? 5.5 : 7.2;

      for (let i = 0; i < pCount; i++) {
        // Parametric angle
        const t = (i / pCount) * Math.PI * 2;
        
        // Heart parametric equation:
        // x = 16 * sin^3(t)
        // y = 13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t)
        const hX = 16 * Math.pow(Math.sin(t), 3);
        const hY = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);

        // Convert coordinates to canvas (invert y-axis)
        const targetX = centerX + hX * scaleFactor;
        const targetY = centerY - hY * scaleFactor;

        // Start coordinates from random edges of screen
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.max(rect.width, rect.height) * 0.8;
        const startX = centerX + Math.cos(angle) * distance;
        const startY = centerY + Math.sin(angle) * distance;

        particles.push({
          x: startX,
          y: startY,
          startX,
          startY,
          targetX,
          targetY,
          size: Math.random() * 1.5 + 1.2,
          color: Math.random() > 0.45 ? "#FFD7E8" : "#8EC5FF",
          progress: 0,
          delay: Math.random() * 0.6,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = particles;
    };

    setupParticles();

    // Spawn initial shooting stars
    const spawnShootingStar = (): ShootingStar => {
      const container = containerRef.current;
      const width = container ? container.getBoundingClientRect().width : 600;
      return {
        x: Math.random() * width,
        y: -50,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 2 + 1.8, // elegant and slow, not overly fast
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.1, // diagonal
        opacity: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.5 ? "#FFD7E8" : "#8EC5FF",
      };
    };

    // Keep ambient background stars ticking
    const ambientStars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 40; i++) {
      const container = containerRef.current;
      const w = container ? container.getBoundingClientRect().width : 600;
      const h = container ? container.getBoundingClientRect().height : 500;
      ambientStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.2 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    let time = 0;

    // Simulation Draw Loop
    const draw = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // 1. Draw Ambient Twinkling Stars
      ambientStars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed = -star.speed;
        }
        ctx.fillStyle = `rgba(142, 197, 255, ${Math.max(0, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      const currentStage = stageRef.current;

      // 2. Draw & Update Shooting Stars (Starts at stage 1 or 2)
      if (currentStage >= 1 && currentStage <= 2) {
        // Periodically spawn
        if (shootingStarsRef.current.length < 3 && Math.random() < 0.015) {
          shootingStarsRef.current.push(spawnShootingStar());
        }

        shootingStarsRef.current.forEach((star, index) => {
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;
          star.opacity -= 0.003; // Fade trail slowly

          if (star.opacity <= 0 || star.x > width + 100 || star.y > height + 100) {
            shootingStarsRef.current[index] = spawnShootingStar();
          }

          // Draw shooting star trail gradient
          const grad = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          grad.addColorStop(0, star.color);
          grad.addColorStop(1, "transparent");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(
            star.x - Math.cos(star.angle) * star.length,
            star.y - Math.sin(star.angle) * star.length
          );
          ctx.stroke();
        });
      }

      // 3. Update & Draw Heart Particles (Starts gathering at Stage 2)
      if (currentStage >= 2) {
        particlesRef.current.forEach((p) => {
          if (currentStage === 2) {
            // Smooth custom cubic ease interpolation toward target coordinates
            p.progress = Math.min(1, p.progress + 0.012);
            const ease = 1 - Math.pow(1 - p.progress, 3); // Cubic ease out
            p.x = p.startX + (p.targetX - p.startX) * ease;
            p.y = p.startY + (p.targetY - p.startY) * ease;
          } else if (currentStage >= 3) {
            // Heart outline mode: Breath/pulse effect + floating micro vibration
            const pulse = Math.sin(time * 1.5 + p.pulseOffset) * 2;
            const sizeFactor = currentStage === 4 ? 0.95 : 1; // scale slightly on QR reveal
            
            // Re-calculate target to sustain center alignment on resize
            const centerX = width / 2;
            const centerY = 130;
            const scaleFactor = (width < 500 ? 5.5 : 7.2) * sizeFactor;
            
            // Re-generate correct heart position formula
            const t = (particlesRef.current.indexOf(p) / particlesRef.current.length) * Math.PI * 2;
            const hX = 16 * Math.pow(Math.sin(t), 3);
            const hY = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);

            const baseTargetX = centerX + hX * scaleFactor;
            const baseTargetY = centerY - hY * scaleFactor;

            // Soft pulse push away from center
            const dx = baseTargetX - centerX;
            const dy = baseTargetY - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const dirX = dist > 0 ? dx / dist : 0;
            const dirY = dist > 0 ? dy / dist : 0;

            p.x = baseTargetX + dirX * pulse;
            p.y = baseTargetY + dirY * pulse;
          }

          // Render glowing constellation point
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        });
      }

      animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [stage]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[580px] flex flex-col items-center justify-start text-center overflow-hidden rounded-3xl bg-[#050816]/95 border border-[#FFD7E8]/10 py-12 px-6"
    >
      {/* Background canvas for starry animations */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Floating glowing light leaks */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-[#8EC5FF]/5 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-[#FFD7E8]/5 blur-[80px] pointer-events-none z-0" />

      {/* Spacing for the Heart Constellation (rendered on canvas) to sit nicely above the letters */}
      <div className="relative z-10 w-full h-[200px]" />

      {/* Premium Cinematic Letters Container beneath the heart */}
      <div className="relative z-10 w-full max-w-lg mt-4 min-h-[200px] flex flex-col items-center justify-start">
        <AnimatePresence>
          {showLetters && (
            <motion.div
              key="final-cinematic-letters"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.6,
                    delayChildren: 0.3,
                  }
                }
              }}
              className="space-y-6 w-full"
            >
              <motion.p 
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 1 }}
                className="font-serif text-base md:text-lg text-slate-200 font-light tracking-wide leading-relaxed"
              >
                Makasih Udah Luangin Waktu buat Liat Website sederhana ini, Moga Suka ya.
              </motion.p>

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 1 }}
                className="space-y-2"
              >
                <p className="text-xl md:text-2xl text-[#FFD7E8] font-serif font-medium">
                  Sekarang...
                </p>
                <p className="text-slate-400 font-sans text-sm">Tutup website ini, dan.....</p>
              </motion.div>

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 1.2 }}
                className="space-y-3 py-5 border-y border-white/5 font-serif italic text-white text-base md:text-lg max-w-md mx-auto"
              >
                <p>"Datanglah Ketika Kamu Merasa Kalah."</p>
                <p>"Datanglah Ketika Kamu Merasa Lelah."</p>
                <p>"Datanglah Kapanmu Kamu Mau."</p>
              </motion.div>

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 1.2 }}
                className="space-y-2"
              >
                <p className="text-pink-300 font-serif font-medium text-lg tracking-wider">
                  Aku Selalu disini, Untuk kamu. ❤️
                </p>
                <p className="text-slate-300 font-serif font-light text-base">
                  Aku akan tetap ada di sini. ❤️
                </p>
              </motion.div>

              <motion.div 
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 1.4 }}
                className="pt-4 space-y-1 font-mono text-[10px] text-slate-500"
              >
                <p>Dari <span className="text-[#FFD7E8] font-semibold">Nazhmi Zaidan Arsalan</span></p>
                <p>Dibuat Dengan Sepenuh Hati dengan Ditemani Secangkir Kopi. ☕</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

