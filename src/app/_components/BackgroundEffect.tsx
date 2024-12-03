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
  particleCreationThreshold: 0.8,
  changesBeforeAsterisk: 7,
  fontSize: 14,
  wanderSpeed: 2,
  wanderRadius: 500,
  wanderInterval: 10,
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

interface WanderPoint {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const getRandomCanvasPosition = (width: number, height: number) => {
  return {
    x: random.nextInt(width),
    y: random.nextInt(height),
  };
};

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
  if (!particle.isAsterisk) {
    const shouldChangeLetter =
      currentTime - particle.lastChangeTime > CONFIG.letterChangeInterval;
    if (shouldChangeLetter) {
      particle.character =
        CONFIG.characters[random.nextInt(CONFIG.characters.length)] ?? "h";
      particle.letterChanges++;
      particle.lastChangeTime = currentTime;

      if (particle.letterChanges >= CONFIG.changesBeforeAsterisk) {
        particle.character = "*";
        particle.isAsterisk = true;
        particle.asteriskStartTime = currentTime;
      }
    }

    ctx.fillStyle = `rgba(0, 0, 0, ${particle.alpha})`;
    return true;
  }

  const asteriskAge = particle.asteriskStartTime
    ? currentTime - particle.asteriskStartTime
    : 0;

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
  const wanderPointRef = useRef<WanderPoint>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize canvas size first
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    wanderPointRef.current = {
      x: random.next() * window.innerWidth,
      y: random.next() * window.innerHeight,
      targetX: random.next() * window.innerWidth,
      targetY: random.next() * window.innerHeight,
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Initialize or update wander point position on resize
      if (!wanderPointRef.current) {
        const randomStart = getRandomCanvasPosition(
          canvas.width,
          canvas.height,
        );
        wanderPointRef.current = {
          x: randomStart.x,
          y: randomStart.y,
          targetX: randomStart.x,
          targetY: randomStart.y,
        };
      }
    };

    const updateWanderTarget = () => {
      if (!wanderPointRef.current) return;
      wanderPointRef.current.targetX = Math.min(
        Math.max(
          wanderPointRef.current.x + random.nextSpread(CONFIG.wanderRadius),
          0,
        ),
        canvas.width,
      );
      wanderPointRef.current.targetY = Math.min(
        Math.max(
          wanderPointRef.current.y + random.nextSpread(CONFIG.wanderRadius),
          0,
        ),
        canvas.height,
      );
    };

    const moveWanderPoint = () => {
      if (!wanderPointRef.current) return;
      const dx = wanderPointRef.current.targetX - wanderPointRef.current.x;
      const dy = wanderPointRef.current.targetY - wanderPointRef.current.y;

      wanderPointRef.current.x += dx * CONFIG.wanderSpeed * 0.01;
      wanderPointRef.current.y += dy * CONFIG.wanderSpeed * 0.01;

      if (Math.random() > CONFIG.particleCreationThreshold) {
        particles.current.push(
          createParticle({
            x: wanderPointRef.current.x,
            y: wanderPointRef.current.y,
          }),
        );
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (
        isMouseMoving.current &&
        Math.random() > CONFIG.particleCreationThreshold
      ) {
        particles.current.push(createParticle(mousePos.current));
      }

      ctx.font = `${CONFIG.fontSize}px ${playfair.style.fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

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

    resizeCanvas();

    const wanderInterval = setInterval(updateWanderTarget, 1000);
    const moveInterval = setInterval(moveWanderPoint, CONFIG.wanderInterval);

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }
      clearInterval(wanderInterval);
      clearInterval(moveInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
