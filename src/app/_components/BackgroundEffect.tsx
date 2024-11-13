"use client";
import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { random } from "~/utils/FastRandom";
const playfair = Playfair_Display({ subsets: ["latin"] });

// Configuration constants
const CONFIG = {
  characters: "huysdigitalgarden".split(""),
  colors: ["#FFC502", "#A8B331", "#D9D9D9"],
  particleSpread: 200,
  letterChangeInterval: 100,
  fadeDelay: 5000,
  fadeSpeed: 0.05,
  particleCreationThreshold: 0.5,
  changesBeforeAsterisk: 10,
  fontSize: 14,
} as const;

interface Particle {
  x: number;
  y: number;
  character: string;
  color: string;
  alpha: number;
  letterChanges: number;
  lastChangeTime: number;
  isAsterisk: boolean;
  asteriskStartTime: number | null;
}

interface MousePosition {
  x: number;
  y: number;
}

const createParticle = (mousePos: MousePosition): Particle => {
  return {
    x: mousePos.x + random.nextSpread(CONFIG.particleSpread),
    y: mousePos.y + random.nextSpread(CONFIG.particleSpread),
    character:
      CONFIG.characters[random.nextInt(CONFIG.characters.length)] ?? "h",
    color: CONFIG.colors[random.nextInt(CONFIG.colors.length)] ?? "#FFC502",
    alpha: 1,
    letterChanges: 0,
    lastChangeTime: performance.now(),
    isAsterisk: false,
    asteriskStartTime: null,
  };
};

const updateParticle = (
  particle: Particle,
  currentTime: number,
  ctx: CanvasRenderingContext2D,
): boolean => {
  // Handle letter phase
  if (!particle.isAsterisk) {
    const shouldChangeLetter =
      currentTime - particle.lastChangeTime > CONFIG.letterChangeInterval;
    if (shouldChangeLetter) {
      particle.character =
        CONFIG.characters[random.nextInt(CONFIG.characters.length)] ?? "h";
      particle.letterChanges++;
      particle.lastChangeTime = currentTime;

      // Transform to asterisk if enough changes
      if (particle.letterChanges >= CONFIG.changesBeforeAsterisk) {
        particle.character = "*";
        particle.isAsterisk = true;
        particle.asteriskStartTime = currentTime;
      }
    }

    ctx.fillStyle = `rgba(0, 0, 0, ${particle.alpha})`;
    return true;
  }

  // Handle asterisk phase
  const asteriskAge = particle.asteriskStartTime
    ? currentTime - particle.asteriskStartTime
    : 0;

  // Start fading after delay
  if (asteriskAge > CONFIG.fadeDelay) {
    particle.alpha = Math.max(0, particle.alpha - CONFIG.fadeSpeed);
    if (particle.alpha <= 0) return false;
  }

  ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;

  return true;
};

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const isMouseMoving = useRef(false);
  const animationFrameId = useRef<number>();
  const mouseTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles only when mouse is moving
      if (
        isMouseMoving.current &&
        Math.random() > CONFIG.particleCreationThreshold
      ) {
        particles.current.push(createParticle(mousePos.current));
      }

      ctx.font = `${CONFIG.fontSize}px ${playfair.style.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Update and render particles
      particles.current = particles.current.filter((particle) => {
        const keepParticle = updateParticle(particle, performance.now(), ctx);
        if (keepParticle) {
          ctx.fillText(particle.character, particle.x, particle.y);
        }
        return keepParticle;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY,
      };

      isMouseMoving.current = true;

      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }

      mouseTimeout.current = setTimeout(() => {
        isMouseMoving.current = false;
      }, CONFIG.letterChangeInterval);
    };

    // Initialize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
