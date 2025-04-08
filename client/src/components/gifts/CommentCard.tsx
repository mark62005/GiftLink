interface CommentCardProps {
	comment: GiftComment;
}

function CommentCard({ comment }: CommentCardProps) {
	return (
		<div className="flex flex-col justify-around gap-3 py-3 pl-4 bg-background rounded-md border">
			<p className="font-semibold">{comment.author}:</p>
			<p className="">{comment.content}</p>
		</div>
	);
}
export default CommentCard;
