import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Landing() {
	return (
		<main>
			<Image
				src="/background-colors.jpg"
				alt="Background image of landing page"
				fill
				priority
				className="object-cover object-center z-[-99] blur-sm"
			/>

			<div className="h-screen max-w-screen-lg mx-auto flex flex-col justify-center items-center z-1">
				<h1 className="text-5xl md:text-6xl font-bold text-custom-blue drop-shadow-lg mb-4">
					GiftLink
				</h1>
				<h2 className="text-2xl md:text-3xl font-medium mb-6">
					Share Gifts and Joy!
				</h2>
				<p className="text-slate-800 text-lg md:text-xl max-w-2xl mb-8 text-center italic leading-relaxed drop-shadow-sm">
					"Sharing is the essence of community. It is through giving that we
					enrich and perpetuate both our lives and the lives of others."
				</p>

				<Link href="/gifts">
					<Button>Get Started</Button>
				</Link>
			</div>
		</main>
	);
}
