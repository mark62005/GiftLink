import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const montserratSans = Montserrat({
	variable: "--font-montserrat-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "GiftLink | Give & Get Free Household Items Near You",
	description:
		"GiftLink connects generous givers with eco-conscious seekers. Browse, share, and claim free household items in your area. Sign up to reduce waste and find your next great gift—for free!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${montserratSans.variable} antialiased relative overflow-x-hidden`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
