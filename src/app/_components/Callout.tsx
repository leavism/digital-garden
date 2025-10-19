import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface CalloutProps {
	variant?: "info" | "warning" | "success";
	title: string;
	children: React.ReactNode;
	className?: string;
}

const calloutConfig = {
	info: {
		icon: Info,
		bgColor: "bg-callout-info-bg",
		borderColor: "border-callout-info-main",
		textColor: "text-callout-info-main",
	},
	warning: {
		icon: AlertTriangle,
		bgColor: "bg-callout-warning-bg",
		borderColor: "border-callout-warning-main",
		textColor: "text-callout-warning-main",
	},
	success: {
		icon: CheckCircle,
		bgColor: "bg-callout-success-bg",
		borderColor: "border-callout-success-main",
		textColor: "text-callout-success-main",
	},
};

export function Callout({
	variant = "info",
	title,
	children,
	className,
}: CalloutProps) {
	const config = calloutConfig[variant];
	const Icon = config.icon;

	return (
		<div
			className={cn(
				"not-prose my-6 rounded-lg border-2 border-dashed p-6",
				config.bgColor,
				config.borderColor,
				className,
			)}
		>
			<div className="mb-3 flex items-center gap-3">
				<Icon className={cn("h-6 w-6", config.textColor)} />
				<h3 className={cn("font-semibold text-lg", config.textColor)}>
					{title}
				</h3>
			</div>
			<div className={cn("leading-relaxed", config.textColor)}>{children}</div>
		</div>
	);
}
