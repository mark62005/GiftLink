import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
	className?: string;
	style?: CSSProperties;
	children: ReactNode;
}

function MaxWidthWrapper({ className, style, children }: MaxWidthWrapperProps) {
	return (
		<div
			className={cn(
				"h-full mx-auto w-full max-w-screen-xl px-4 md:px-20",
				className
			)}
			style={style}
		>
			{children}
		</div>
	);
}

export default MaxWidthWrapper;
