import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFormattedDate(timestamp: number): string {
	const date = new Date(timestamp * 1000);
	return date.toLocaleString("default", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}
