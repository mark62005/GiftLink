"use client";

import GiftCard from "@/components/gifts/GiftCard";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { useGetAllGiftsQuery } from "@/state/apis/giftsApi";

function GiftsGridSection() {
	// const gifts: Gift[] = [sampleGift, sampleGift, sampleGift, sampleGift];
	const { data: gifts, isLoading, isError } = useGetAllGiftsQuery();

	if (isLoading) return <>Loading...</>;
	if (isError || !gifts || !gifts) return <div>Error fetching gifts.</div>;

	return (
		<section className="py-15">
			<MaxWidthWrapper>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-3/4 mx-auto">
					{gifts.map((gift, index) => (
						<GiftCard
							key={index}
							gift={gift}
						/>
					))}
				</div>
			</MaxWidthWrapper>
		</section>
	);
}
export default GiftsGridSection;
