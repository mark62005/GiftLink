import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

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
				className={`${montserratSans.variable} antialiased relative min-h-screen w-screen overflow-x-hidden`}
			>
				{children}
			</body>
		</html>
	);
}
