import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
	className?: string;
	children: ReactNode;
}

function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
	return (
		<div
			className={cn(
				"h-full mx-auto w-full max-w-screen-xl px-4 md:px-20",
				className
			)}
		>
			{children}
		</div>
	);
}

export default MaxWidthWrapper;
