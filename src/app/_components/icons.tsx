/**
 * Centralized icon management component
 *
 * This module provides a unified interface for all icons used in the application,
 * combining both Lucide React icons and custom SVG assets.
 *
 * @example
 * ```tsx
 * import { Icons } from "@/app/_components/icons";
 *
 * // Lucide icons
 * <Icons.Plus className="h-6 w-6" />
 * <Icons.ArrowUporight className="h-4 w-4 text-blue-500" />
 *
 * // Custom SVG icons (with preserved aspect ratios)
 * <Icons.WhiteDaisyCorolla className="h-32 w-auto" />
 * <Icons.Sapling className="w-24 h-auto opacity-50" />
 * ```
 *
 * - Type-safe icon access with autocomplete
 * - Centralized management for all icon sources (ie SVG and lucide-react)
 * - Consistent API across different icon libraries
 * - Easy refactoring and swapping of icons
 * - Proper aspect ratio preservation for custom SVGs
 */

import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";

/**
 * Union type of all available icon keys
 * Provides autocomplete and type safety when using Icons
 */
export type IconKeys = keyof typeof icons;

/**
 * Props accepted by icon components
 * @property className - Tailwind CSS classes for styling (e.g., "h-6 w-6 text-blue-500")
 */
type IconProps = React.ComponentProps<"svg"> & {
	className?: string;
};

/**
 * Type definition for the Icons object
 * Ensures all icons are React components
 */
type IconsType = {
	[key in IconKeys]: React.ElementType;
};

/**
 * Custom SVG wrapper components using Next.js Image optimization
 * Width and height are set to match the original SVG viewBox for proper aspect ratio
 */
const WhiteDaisyCorolla = ({ className }: IconProps) => (
	<Image
		src="/white-daisy-corolla.svg"
		alt="white daisy corolla"
		width={642}
		height={576}
		className={className}
	/>
);

const WhiteDaisy = ({ className }: IconProps) => (
	<Image
		src="/white-daisy.svg"
		alt="white daisy"
		width={608}
		height={1152}
		className={className}
	/>
);

const Sapling = ({ className }: IconProps) => (
	<Image
		src="/sapling.svg"
		alt="sapling"
		width={768}
		height={705}
		className={className}
	/>
);

const Arrow = ({ className }: IconProps) => (
	<Image
		src="/arrow.svg"
		alt="arrow"
		width={9}
		height={8}
		className={className}
	/>
);

/**
 * Icon registry
 * Add new icons here to make them available throughout the application
 *
 * @lucide - Icons from lucide-react (imported directly)
 * @custom - Custom SVG icons wrapped with Next.js Image component
 */
const icons = {
	// Lucide icons
	ArrowUporight: ArrowUpRight,
	Plus: Plus,

	// Custom SVG icons
	WhiteDaisyCorolla, // 642×576 aspect ratio
	WhiteDaisy, // 608×1152 aspect ratio
	Sapling, // 768×705 aspect ratio
	Arrow, // 9×8 aspect ratio
};

/**
 * Exported Icons object
 */
export const Icons: IconsType = icons;
