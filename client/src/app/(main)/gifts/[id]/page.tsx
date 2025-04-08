"use client";

import { useParams } from "next/navigation";
import { useGetGiftByIdQuery } from "@/state/api";
import { MAIN_HEIGHT } from "@/lib/constants";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import DetailsSection from "./(sections)/DetailsSection";
import CommentsSection from "./(sections)/CommentsSection";

function GiftDetailsPage() {
	const params = useParams();
	const id = params.id as string;
	const { data: gift, isLoading, isError } = useGetGiftByIdQuery(id);

	if (isLoading) return <div>Loading...</div>;
	if (isError || !gift) return <div>Error fetching gift.</div>;

	return (
		<MaxWidthWrapper style={{ minHeight: MAIN_HEIGHT }}>
			<div className="flex flex-col items-center justify-around py-15 gap-8 mx-auto w-5/6 lg:w-2/3">
				<DetailsSection gift={gift} />
				<CommentsSection />
			</div>
		</MaxWidthWrapper>
	);
}
export default GiftDetailsPage;
