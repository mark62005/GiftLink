import { baseApi } from "./baseApi";
import { STORAGE_KEYS } from "@/lib/constants";

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		registerUser: builder.mutation<
			string,
			{ firstName: string; lastName: string; email: string; password: string }
		>({
			query: (body) => ({
				url: "auth/register",
				method: "POST",
				body,
			}),
			onQueryStarted: async ({ firstName, email }, { queryFulfilled }) => {
				try {
					const { data: authToken } = await queryFulfilled;

					localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, authToken);
					localStorage.setItem(STORAGE_KEYS.FIRST_NAME, firstName);
					localStorage.setItem(STORAGE_KEYS.EMAIL, email);
				} catch (error) {
					console.error("Error registering user: ", error);

					// TODO: toast error message
				}
			},
		}),
		loginUser: builder.mutation<
			{ firstName: string; email: string; authToken: string },
			{ email: string; password: string }
		>({
			query: (body) => ({
				url: "auth/sign-in",
				method: "POST",
				body,
			}),
			onQueryStarted: async (_, { queryFulfilled }) => {
				try {
					const data = (await queryFulfilled).data;

					localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.authToken);
					localStorage.setItem(STORAGE_KEYS.FIRST_NAME, data.firstName);
					localStorage.setItem(STORAGE_KEYS.EMAIL, data.email);
				} catch (error) {
					console.error("Error signing in user: ", error);

					// TODO: toast error message
				}
			},
		}),
	}),
	overrideExisting: false,
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
