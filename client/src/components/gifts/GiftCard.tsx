import Link from "next/link";
import { cn, getFormattedDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GiftImage from "./GiftImage";

interface GiftCardProps {
	gift: Gift;
}

function GiftCard({ gift }: GiftCardProps) {
	return (
		<Card className="h-[360px]">
			<CardContent className="h-full justify-between">
				<GiftImage
					variant="card"
					imageUrl={gift.image}
					name={gift.name}
					width={250}
					height={200}
					className="h-[200px] rounded-t-xl"
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

				<Link href={`/gifts/${gift._id}`}>
					<Button className="w-full rounded-lg">View Details</Button>
				</Link>
			</CardContent>
		</Card>
	);
}
export default GiftCard;
