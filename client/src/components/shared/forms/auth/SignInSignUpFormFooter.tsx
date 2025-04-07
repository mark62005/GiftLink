import Link from "next/link";

interface SignInSignUpFormFooterProps {
	variant: "sign-in" | "sign-up";
}

function SignInSignUpFormFooter({ variant }: SignInSignUpFormFooterProps) {
	const labelText = variant === "sign-in" ? "New here" : "Already a member";
	const href = variant === "sign-in" ? "/sign-up" : "/sign-in";
	const buttonText = variant === "sign-in" ? "Register Here" : "Sign In";

	return (
		<p className="mt-4 text-center">
			{labelText}?{" "}
			<Link
				href={href}
				className="text-primary underline hover:text-primary/80 hover:underline-offset-2"
			>
				{buttonText}
			</Link>
		</p>
	);
}
export default SignInSignUpFormFooter;
