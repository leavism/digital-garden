import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";

export type IconKeys = keyof typeof icons;
type IconProps = React.ComponentProps<"svg"> & {
	className?: string;
};
type IconsType = {
	[key in IconKeys]: React.ElementType;
};

// Wrapper components for SVGs using Next.js Image optimisation
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

const icons = {
	ArrowUporight: ArrowUpRight,
	Plus: Plus,
	WhiteDaisyCorolla,
	WhiteDaisy,
	Sapling,
	Arrow,
};

export const Icons: IconsType = icons;
