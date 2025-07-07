"use client";
import { random } from "@/utils/FastRandom";
import Playfair_Display from "next/font/local";
import { useEffect, useRef } from "react";

const playfair = Playfair_Display({
	src: "./../../../public/fonts/PlayfairDisplay-VariableFont_wght.ttf",
});

const CONFIG = {
	// Visual appearance
	characters: "huysdigitalgarden".split(""),
	colors: ["#FFC502", "#A8B331", "#D9D9D9"],
	fontSize: 16,

	// Particle behavior
	particleSpread: 200,
	particleCreationThreshold: 0.8,
	letterChangeInterval: 10, // How many frames between letter changes
	changesBeforeAsterisk: 10, // How many changes before becoming an asterisk
	fadeDelay: 700, // Frames to wait before fading
	fadeSpeed: 0.05, // How quickly to fade out

	// Wander behavior
	wanderSpeed: 0.25, // How quickly to move toward target (0-1)
	wanderRadius: 300, // How far to randomly wander
} as const;

interface Particle {
	x: number;
	y: number;
	char: string;
	color: string;
	alpha: number;
	age: number;
	isAsterisk: boolean;
	letterChanges: number;
}

export default function CanvasBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect((): (() => void) => {
		const canvas = canvasRef.current;
		if (!canvas) return () => {};

		const ctx = canvas.getContext("2d");
		if (!ctx) return () => {};

		const particles: Particle[] = [];
		let mouseX = 0;
		let mouseY = 0;
		let wanderX = window.innerWidth / 2;
		let wanderY = window.innerHeight / 2;

		// Resize handler
		const resizeCanvas = (): void => {
			if (!canvas) return;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		// Track mouse movement
		const handleMouseMove = (e: MouseEvent): void => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			// Create particles on mouse move
			if (random.next() > CONFIG.particleCreationThreshold) {
				createParticle(mouseX, mouseY);
			}
		};

		const createParticle = (x: number, y: number): void => {
			particles.push({
				x: x + random.nextSpread(CONFIG.particleSpread),
				y: y + random.nextSpread(CONFIG.particleSpread),
				char: CONFIG.characters[random.nextInt(CONFIG.characters.length)] ?? "",
				color: CONFIG.colors[random.nextInt(CONFIG.colors.length)] ?? "",
				alpha: 1,
				age: 0,
				isAsterisk: false,
				letterChanges: 0,
			});
		};

		// Update wander point
		const updateWanderPoint = (): void => {
			// Create new random target coordinate to move point towards
			const targetX = wanderX + random.nextSpread(CONFIG.wanderRadius);
			const targetY = wanderY + random.nextSpread(CONFIG.wanderRadius);

			// Move toward target at configurable speed
			wanderX += (targetX - wanderX) * CONFIG.wanderSpeed;
			wanderY += (targetY - wanderY) * CONFIG.wanderSpeed;

			// Ensure wander point stays on screen
			wanderX = Math.max(0, Math.min(canvas.width, wanderX));
			wanderY = Math.max(0, Math.min(canvas.height, wanderY));

			// Create particles at wander point
			if (random.next() > CONFIG.particleCreationThreshold) {
				createParticle(wanderX, wanderY);
			}
		};

		// Animation loop
		const animate = (): void => {
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			updateWanderPoint();

			ctx.font = `${CONFIG.fontSize}px ${playfair.style.fontFamily}`;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			// Update and render particles
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				if (!p) continue;
				p.age++;

				// Change to asterisk after enough letter changes
				if (p.letterChanges >= CONFIG.changesBeforeAsterisk && !p.isAsterisk) {
					p.char = "*";
					p.isAsterisk = true;
				}

				// Start fading after becoming an asterisk
				if (p.isAsterisk) {
					if (p.age > CONFIG.fadeDelay) {
						p.alpha -= CONFIG.fadeSpeed;
					}
					ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255)
						.toString(16)
						.padStart(2, "0")}`;
				} else {
					ctx.fillStyle = `rgba(0, 0, 0, ${p.alpha})`;
					// Change letter based on interval
					if (p.age % CONFIG.letterChangeInterval === 0) {
						p.char =
							CONFIG.characters[random.nextInt(CONFIG.characters.length)] ?? "";
						p.letterChanges++;
					}
				}

				// Remove faded particles
				if (p.alpha <= 0) {
					particles.splice(i, 1);
					continue;
				}

				ctx.fillText(p.char, p.x, p.y);
			}

			requestAnimationFrame(animate);
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
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="-z-10 pointer-events-none hidden md:block fixed inset-0"
		/>
	);
}
