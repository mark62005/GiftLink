import * as z from "zod";

/* SIGN IN SCHEMA */
export const signInSchema = z.object({
	email: z
		.string({
			required_error: "Email is required.",
		})
		.trim()
		.email(
			"Invalid email address, please follow the format [example@domain.com]."
		),
	password: z
		.string({
			required_error: "Password is required.",
		})
		.trim()
		.min(8, "Password must be at least 8 characters."),
});

export type SignInFormData = z.infer<typeof signInSchema>;

/* SIGN UP SCHEMA */
export const signUpSchema = z.object({
	firstName: z
		.string({
			required_error: "First name is required.",
		})
		.trim()
		.min(2, "First name must be at least 2 characters."),
	lastName: z
		.string({
			required_error: "Last name is required.",
		})
		.trim()
		.min(2, "Last name must be at least 2 characters."),
	email: z
		.string({
			required_error: "Email is required.",
		})
		.trim()
		.email(
			"Invalid email address, please follow the format [example@domain.com]."
		),
	password: z
		.string({
			required_error: "Password is required.",
		})
		.trim()
		.min(8, "Password must be at least 8 characters."),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
