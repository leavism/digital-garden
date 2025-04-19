/**
 * A relatively faster (to Math.random) pseudo-random number generator implementation
 * Uses a custom algo with 4 state variables for generating random numbers.
 * Not cryptographically secure, just good for simulations for my background effect.
 */
export class FastRandom {
	private a: number;
	private b: number;
	private c: number;
	private d: number;

	constructor(seed = Date.now()) {
		this.a = seed;
		this.b = seed ^ 0x123456789;
		this.c = seed ^ 0x87654321;
		this.d = seed ^ 0x42424242;
	}

	/**
	 * Generates next random number between 0 and 1.
	 * Uses bit manipulation (shifts and XORs) to update internal state and generate random value.
	 * @returns A pseudo-random number between 0 (inclusive) and 1 (exclusive)
	 */
	next(): number {
		// These shifts and XORs are somewhat arbitrary,
		// They'll produce a number with a very long period before repeating
		const t = this.b << 9;
		const r = this.a * 5;
		this.c = this.c ^ (this.c >>> 11);
		this.d = this.d ^ (this.d << 3);
		this.a = this.b ^ (this.b >>> 19);
		this.b = this.c + (this.c << 8);
		this.c = this.d + r;
		this.d = t + this.a;
		return (this.d >>> 0) / 4294967296;
	}

	/**
	 * Generates random integer between 0 (inclusive) and max (exclusive).
	 * @param max Upper bound (exclusive) for the random integer
	 * @returns Random integer between 0 and max-1
	 */
	nextInt(max: number): number {
		return Math.floor(this.next() * max);
	}

	/**
	 * Generates random number centered around 0 with given spread.
	 * @param spread Total range of possible values (result will be between -spread/2 and +spread/2)
	 * @returns Random number between -spread/2 and +spread/2
	 */
	nextSpread(spread: number): number {
		return (this.next() - 0.5) * spread;
	}
}

// Singleton instance for conventient global use
export const random = new FastRandom();
