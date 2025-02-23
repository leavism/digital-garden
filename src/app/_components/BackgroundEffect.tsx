"use client";
import { useEffect, useRef } from "react";
import { Playfair_Display } from "next/font/google";
import { random } from "~/utils/FastRandom";

const playfair = Playfair_Display({ subsets: ["latin"] });

/**
 * Configuration for particle animation behavior
 */
type Config = {
  /** Characters displayed before turning into asterisk. */
  characters: string[];
  /** Color palette for asterisks. */
  colors: string[];
  /** Maximum distance in pixels particles can spread from spawn point. */
  particleSpread: number;
  /** Milliseconds between character changes. */
  letterChangeInterval: number;
  /** Milliseconds before asterisk begins fading. */
  fadeDelay: number;
  /** Alpha reduction per frame while fading (0-1). */
  fadeSpeed: number;
  /** Probability threshold for spawning new particles (0-1). */
  particleCreationThreshold: number;
  /** Number of character shifts before becoming asterisk. */
  changesBeforeAsterisk: number;
  /** Font size in pixels. */
  fontSize: number;
  /** Movement speed of wandering point. */
  wanderSpeed: number;
  /** Maximum distance wandering point can move. */
  wanderRadius: number;
  /** Milliseconds between wander target updates. */
  wanderInterval: number;
};

/**
 * Represents a single animated particle in the canvas
 */
interface Particle {
  /** Current position coordinates. */
  position: Point;
  /** Current displayed character. */
  character: string;
  /** Color used when particle becomes an asterisk. */
  color: string;
  /** Current opacity value (0-1). */
  alpha: number;
  /** Number of times the character has changed. */
  letterChanges: number;
  /** Timestamp of last character change. */
  lastChangeTime: number;
  /** Whether particle has transformed into an asterisk. */
  isAsterisk: boolean;
  /** Timestamp when particle became an asterisk. */
  asteriskStartTime: number | null;
}

interface Point {
  x: number;
  y: number;
}

interface WanderPoint extends Point {
  target: Point;
}

// Configuration
const CONFIG: Config = {
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
};

// Particle management
class ParticleManager {
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  createParticle(position: Point): Particle {
    return {
      position: {
        x: position.x + random.nextSpread(CONFIG.particleSpread),
        y: position.y + random.nextSpread(CONFIG.particleSpread),
      },
      character: random.pick(CONFIG.characters),
      color: random.pick(CONFIG.colors),
      alpha: 1,
      letterChanges: 0,
      lastChangeTime: performance.now(),
      isAsterisk: false,
      asteriskStartTime: null,
    };
  }

  updateParticle(particle: Particle, currentTime: number): boolean {
    if (!particle.isAsterisk) {
      if (currentTime - particle.lastChangeTime > CONFIG.letterChangeInterval) {
        particle.character = random.pick(CONFIG.characters);
        particle.letterChanges++;
        particle.lastChangeTime = currentTime;

        if (particle.letterChanges >= CONFIG.changesBeforeAsterisk) {
          particle.character = "*";
          particle.isAsterisk = true;
          particle.asteriskStartTime = currentTime;
        }
      }
      this.ctx.fillStyle = `rgba(0, 0, 0, ${particle.alpha})`;
      return true;
    }

    const asteriskAge = particle.asteriskStartTime
      ? currentTime - particle.asteriskStartTime
      : 0;
    if (asteriskAge > CONFIG.fadeDelay) {
      particle.alpha = Math.max(0, particle.alpha - CONFIG.fadeSpeed);
      if (particle.alpha <= 0) return false;
    }

    this.ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255)
      .toString(16)
      .padStart(2, "0")}`;

    return true;
  }

  draw() {
    this.ctx.font = `${CONFIG.fontSize}px ${playfair.style.fontFamily}`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.particles = this.particles.filter((particle) => {
      const keepParticle = this.updateParticle(particle, performance.now());
      if (keepParticle) {
        this.ctx.fillText(
          particle.character,
          particle.position.x,
          particle.position.y,
        );
      }
      return keepParticle;
    });
  }

  addParticle(position: Point) {
    if (Math.random() > CONFIG.particleCreationThreshold) {
      this.particles.push(this.createParticle(position));
    }
  }
}

// Canvas management
class CanvasManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particleManager: ParticleManager;
  private wanderPoint: WanderPoint;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.particleManager = new ParticleManager(this.ctx);
    // Update canvas size before initializing WanderPoint
    this.resize();
    this.wanderPoint = this.initializeWanderPoint();
  }

  private initializeWanderPoint(): WanderPoint {
    return {
      x: random.next() * this.canvas.width,
      y: random.next() * this.canvas.height,
      target: {
        x: random.next() * this.canvas.width,
        y: random.next() * this.canvas.height,
      },
    };
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  updateWanderTarget() {
    this.wanderPoint.target = {
      x: Math.min(
        Math.max(
          this.wanderPoint.x + random.nextSpread(CONFIG.wanderRadius),
          0,
        ),
        this.canvas.width,
      ),
      y: Math.min(
        Math.max(
          this.wanderPoint.y + random.nextSpread(CONFIG.wanderRadius),
          0,
        ),
        this.canvas.height,
      ),
    };
  }

  moveWanderPoint() {
    const dx = this.wanderPoint.target.x - this.wanderPoint.x;
    const dy = this.wanderPoint.target.y - this.wanderPoint.y;

    this.wanderPoint.x += dx * CONFIG.wanderSpeed * 0.01;
    this.wanderPoint.y += dy * CONFIG.wanderSpeed * 0.01;

    this.particleManager.addParticle(this.wanderPoint);
  }

  draw(mousePos: Point | null, isMouseMoving: boolean) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (isMouseMoving && mousePos) {
      this.particleManager.addParticle(mousePos);
    }

    this.particleManager.draw();
  }
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<CanvasManager>();
  const mousePos = useRef<Point | null>(null);
  const isMouseMoving = useRef(false);
  const animationFrameId = useRef<number>();
  const mouseTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    managerRef.current = new CanvasManager(canvas);
    const manager = managerRef.current;

    manager.resize();

    const animate = () => {
      manager.draw(mousePos.current, isMouseMoving.current);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      isMouseMoving.current = true;

      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }

      mouseTimeout.current = setTimeout(() => {
        isMouseMoving.current = false;
      }, CONFIG.letterChangeInterval);
    };

    const wanderInterval = setInterval(
      () => manager.updateWanderTarget(),
      1000,
    );
    const moveInterval = setInterval(
      () => manager.moveWanderPoint(),
      CONFIG.wanderInterval,
    );

    window.addEventListener("resize", () => manager.resize());
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", () => manager.resize());
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
