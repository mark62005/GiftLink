import CommentCard from "@/components/gifts/CommentCard";

const sampleComments: GiftComment[] = [
	{
		_id: "C001",
		authorId: "U001",
		author: "John Doe",
		content: "I would like this!",
	},
	{
		_id: "C002",
		authorId: "U002",
		author: "Jane Smith",
		content: "Just DMed you.",
	},
	{
		_id: "C003",
		authorId: "U003",
		author: "Alice Johnson",
		content: "I will take it if it's still available.",
	},
	{
		_id: "C004",
		authorId: "U004",
		author: "Mike Brown",
		content: "This is a good one!",
	},
	{
		_id: "C005",
		authorId: "U005",
		author: "Sarah Wilson",
		content:
			"My family can use one. DM me if it is still available. Thank you!",
	},
];

function CommentsSection() {
	// TODO: Fetch comments from database

	return (
		<section className="flex flex-col justify-between gap-3 w-full max-w-[610px]">
			<h3 className="text-2xl font-semibold">Comments</h3>

			{sampleComments.map((comment) => (
				<CommentCard
					comment={comment}
					key={comment._id}
				/>
			))}
		</section>
	);
}
export default CommentsSection;
