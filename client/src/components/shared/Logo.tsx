import Link from "next/link";

function Logo() {
	return (
		<Link
			href="/"
			className="p-2 text-primary hover:text-primary/80"
		>
			<h1 className="text-xl font-bold uppercase">GiftLink</h1>
		</Link>
	);
}
export default Logo;
