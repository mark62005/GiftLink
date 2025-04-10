import { cn } from "@/lib/utils";
import Image from "next/image";

interface GiftImageProps {
	variant: "card" | "details";
	imageUrl?: string;
	name: string;
	width: number;
	height: number;
	className?: string;
}

function GiftImage({
	variant,
	imageUrl,
	name,
	width,
	height,
	className,
}: GiftImageProps) {
	return (
		<Image
			src={imageUrl ? `/${imageUrl}` : "/placeholder.jpg"}
			alt={`Image of ${name}`}
			width={width}
			height={height}
			priority={variant === "details" ? true : false}
			loading={variant === "card" ? "lazy" : undefined}
			className={cn(
				"w-full md:object-cover object-contain object-center border-b-2",
				className
			)}
		/>
	);
}
export default GiftImage;
