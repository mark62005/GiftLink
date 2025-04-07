import Link from "next/link";
import Image from "next/image";
import { cn, getFormattedDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GiftCardProps {
	gift: Gift;
}

function GiftCard({ gift }: GiftCardProps) {
	return (
		<Card className="h-[360px]">
			<CardContent className="h-full justify-between">
				<Image
					src={gift.image ? `/${gift.image}` : "/placeholder.jpg"}
					alt={`Image of ${gift.name}`}
					width={250}
					height={200}
					loading="lazy"
					className="w-full rounded-t-xl object-cover object-center h-[200px] border-b-2"
				/>

				<div className="ml-4">
					<h4 className="text-lg font-medium">{gift.name}</h4>

					<p
						className={cn(
							"my-2",
							gift.condition === "New" ? "text-green-500" : "text-warning"
						)}
					>
						{gift.condition}
					</p>

					<p className="">{getFormattedDate(gift.date_added)}</p>
				</div>

				<Link href={`/gifts/${gift.id}`}>
					<Button className="w-full rounded-lg">View Details</Button>
				</Link>
			</CardContent>
		</Card>
	);
}
export default GiftCard;
