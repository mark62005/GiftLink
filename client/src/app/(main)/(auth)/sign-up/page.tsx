"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "@/state/api";
import { useAuthContext } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { MAIN_HEIGHT } from "@/lib/constants";
import { SignUpFormData, signUpSchema } from "@/lib/schemas";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomFormField } from "@/components/shared/forms/CustomFormField";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import SignInSignUpFormFooter from "@/components/shared/forms/auth/SignInSignUpFormFooter";

function SignUpPage() {
	const router = useRouter();
	const { setIsLoggedIn, setUsername } = useAuthContext();
	const [registerUser, { isLoading, error }] = useRegisterUserMutation();

	const methods = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: SignUpFormData) {
		const res = await registerUser(data);

		if (!error && res.data) {
			setIsLoggedIn(true);
			setUsername(data.firstName);

			router.push("/gifts");
		}

		// TODO: display error message
	}

	return (
		<MaxWidthWrapper
			className="flex justify-center items-center"
			style={{ minHeight: MAIN_HEIGHT }}
		>
			<div className="rounded-lg border p-6 bg-background flex flex-col justify-between gap-4 w-3/4 md:w-1/2 lg:w-5/11">
				<h2 className="text-xl md:text-2xl font-bold text-center">Register</h2>

				<Form {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className="space-y-5"
					>
						<CustomFormField
							name="firstName"
							label="First Name"
							placeholder="Enter First Name"
						/>
						<CustomFormField
							name="lastName"
							label="Last Name"
							placeholder="Enter Last Name"
						/>
						<CustomFormField
							name="email"
							label="Email"
							type="email"
							placeholder="Enter Email"
						/>
						<CustomFormField
							name="password"
							label="Password"
							type="password"
							placeholder="Enter Password"
						/>

						<Button
							type="submit"
							className="w-full mt-4"
							disabled={isLoading}
						>
							{isLoading ? "Loading..." : "Register"}
						</Button>
					</form>
				</Form>

				<SignInSignUpFormFooter variant="sign-up" />
			</div>
		</MaxWidthWrapper>
	);
}
export default SignUpPage;
