import { getFormattedDate } from "@/lib/utils";
import GiftImage from "@/components/gifts/GiftImage";

interface DetailsSectionProps {
	gift: Gift;
}

function DetailsSection({ gift }: DetailsSectionProps) {
	const {
		name,
		image,
		category,
		condition,
		date_added,
		age_years,
		description,
	} = gift;

	return (
		<section className="border bg-white rounded-lg">
			<h2 className="w-full text-center py-3 bg-dark-blue text-zinc-100 text-2xl font-bold rounded-t-lg">
				{name}
			</h2>

			<GiftImage
				variant="details"
				imageUrl={image}
				name={name}
				width={300}
				height={300}
			/>

			<div className="flex flex-col justify-between gap-4 px-4 py-6">
				<p>
					<span className="font-semibold">Category</span>: {category}
				</p>
				<p>
					<span className="font-semibold">Condition</span>: {condition}
				</p>
				<p>
					<span className="font-semibold">Date Added</span>:{" "}
					{getFormattedDate(date_added)}
				</p>
				<p>
					<span className="font-semibold">Age (Years)</span>: {age_years}
				</p>
				<p className="text-wrap">
					<span className="font-semibold">Description</span>: {description}
				</p>
			</div>
		</section>
	);
}
export default DetailsSection;
