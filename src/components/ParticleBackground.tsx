import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

interface Firefly {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedX: number;
  speedY: number;
  angle: number;
  angleSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  speed: number;
  opacity: number;
  active: boolean;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let fireflies: Firefly[] = [];
    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      length: 0,
      speed: 0,
      opacity: 0,
      active: false,
    };

    const colors = ["#FFFFFF", "#FFD7E8", "#8EC5FF"];

    const initElements = (width: number, height: number) => {
      // Density-based counts
      const starCount = Math.min(Math.floor((width * height) / 4000), 180);
      const fireflyCount = Math.min(Math.floor((width * height) / 12000), 45);

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        twinkleSpeed: 0.005 + Math.random() * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      fireflies = Array.from({ length: fireflyCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1.2,
        alpha: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -0.15 - Math.random() * 0.3, // gently floating upwards
        angle: Math.random() * Math.PI * 2,
        angleSpeed: 0.01 + Math.random() * 0.02,
        color: Math.random() > 0.4 ? "#FFD7E8" : "#8EC5FF", // Pink or blue fireflies
      }));
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initElements(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const triggerShootingStar = () => {
      if (shootingStar.active) return;
      const width = canvas.width;
      const height = canvas.height;

      shootingStar = {
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.4,
        dx: Math.random() * 4 + 6, // moving rightwards
        dy: Math.random() * 2 + 3, // moving downwards
        length: Math.random() * 80 + 50,
        speed: Math.random() * 10 + 12,
        opacity: 1,
        active: true,
      };
    };

    // Randomly trigger shooting stars
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        triggerShootingStar();
      }
    }, 12000);

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setMouse({ x: -1000, y: -1000 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Subtle Dark Ambient Gradients on the Canvas to keep it looking ultra-premium
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.3,
        10,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, "#080c24");
      gradient.addColorStop(0.5, "#050816");
      gradient.addColorStop(1, "#03040c");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(star.alpha, 0.9));
        ctx.fill();
      });

      // 3. Draw and Update Shooting Star
      if (shootingStar.active) {
        ctx.globalAlpha = shootingStar.opacity;
        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.dx * 8,
          shootingStar.y - shootingStar.dy * 8
        );
        grad.addColorStop(0, "#FFFFFF");
        grad.addColorStop(0.3, "#8EC5FF");
        grad.addColorStop(1, "rgba(5, 8, 22, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.dx * 3,
          shootingStar.y - shootingStar.dy * 3
        );
        ctx.stroke();

        // Update positions
        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.opacity -= 0.015;

        if (
          shootingStar.opacity <= 0 ||
          shootingStar.x > canvas.width ||
          shootingStar.y > canvas.height
        ) {
          shootingStar.active = false;
        }
      }

      // 4. Draw and Update Fireflies (Organic soft glowing particles)
      ctx.globalAlpha = 1;
      fireflies.forEach((ff) => {
        ff.angle += ff.angleSpeed;
        
        // Sway sideways gently using sine waves, and float upwards
        const currentSpeedX = ff.speedX + Math.sin(ff.angle) * 0.15;
        ff.x += currentSpeedX;
        ff.y += ff.speedY;

        // Interactive mouse repulsion: drift slightly away from the mouse
        if (mouse.x > -500) {
          const dx = ff.x - mouse.x;
          const dy = ff.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            ff.x += (dx / dist) * force * 1.5;
            ff.y += (dy / dist) * force * 1.5;
          }
        }

        // Warp screen wrap around for continuous ambient cycle
        if (ff.y < -10) {
          ff.y = canvas.height + 10;
          ff.x = Math.random() * canvas.width;
        }
        if (ff.x < -10) ff.x = canvas.width + 10;
        if (ff.x > canvas.width + 10) ff.x = -10;

        // Draw firefly with glowing overlay
        const glowRadius = ff.size * 2.8;
        const radialGrad = ctx.createRadialGradient(
          ff.x,
          ff.y,
          0.1,
          ff.x,
          ff.y,
          glowRadius
        );
        radialGrad.addColorStop(0, ff.color);
        radialGrad.addColorStop(0.3, ff.color + "55"); // transparent hex
        radialGrad.addColorStop(1, "rgba(5, 8, 22, 0)");

        ctx.beginPath();
        ctx.arc(ff.x, ff.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = radialGrad;
        ctx.fill();
      });

      // 5. Draw Cursor Glow / Moonlight Radial Aura (Apple aesthetics)
      if (mouse.x > -500) {
        ctx.globalAlpha = 1;
        const cursorGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          220
        );
        cursorGlow.addColorStop(0, "rgba(142, 197, 255, 0.08)");
        cursorGlow.addColorStop(0.5, "rgba(255, 215, 232, 0.03)");
        cursorGlow.addColorStop(1, "rgba(5, 8, 22, 0)");
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1; // reset alpha
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(shootingStarInterval);
    };
  }, [mouse]);

  return (
    <canvas
      id="aurora-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
