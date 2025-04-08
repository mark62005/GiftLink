import Header from "@/components/shared/Header";
import { HEADER_HEIGHT, MAIN_HEIGHT } from "@/lib/constants";
import { ReactNode } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<Header />
			<main
				className="bg-zinc-50"
				style={{ marginTop: HEADER_HEIGHT, minHeight: MAIN_HEIGHT }}
			>
				{children}
			</main>
		</>
	);
}
