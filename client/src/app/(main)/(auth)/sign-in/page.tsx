"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/state/redux";
import { useLoginUserMutation } from "@/state/api";
import { MAIN_HEIGHT, STORAGE_KEYS } from "@/lib/constants";
import { SignInFormData, signInSchema } from "@/lib/schemas";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomFormField } from "@/components/shared/forms/CustomFormField";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import SignInSignUpFormFooter from "@/components/shared/forms/auth/SignInSignUpFormFooter";
import { loginSucceeded } from "@/state/slices/authSlice";

function SignInPage() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [loginUser, { isLoading }] = useLoginUserMutation();

	const methods = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: SignInFormData) {
		try {
			const { authToken, firstName } = await loginUser(data).unwrap();

			if (authToken) {
				const email = localStorage.getItem(STORAGE_KEYS.EMAIL) ?? "";
				const user: User = {
					firstName,
					email,
					lastName: "",
				};

				dispatch(loginSucceeded({ token: authToken, user }));

				router.push("/gifts");
			}
		} catch (error) {
			console.error("Error signing in user: ", error);
			// TODO: display error message
		}
	}

	return (
		<MaxWidthWrapper
			className="flex justify-center items-center"
			style={{ minHeight: MAIN_HEIGHT }}
		>
			<div className="rounded-lg border p-6 bg-background flex flex-col justify-between gap-4 w-3/4 md:w-1/2 lg:w-5/11">
				<h2 className="text-xl md:text-2xl font-bold text-center">Login</h2>

				<Form {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className="space-y-5"
					>
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
							Login
						</Button>
					</form>
				</Form>

				<SignInSignUpFormFooter variant="sign-in" />
			</div>
		</MaxWidthWrapper>
	);
}
export default SignInPage;
