import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: any
): Promise<any> => {
	const baseQuery = fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
	});

	try {
		const result: any = await baseQuery(args, api, extraOptions);

		if (result.error) {
			const errorData = result.error.data;
			const errorMessage =
				errorData?.message ||
				result.error.status.toString() ||
				"An error occured";

			// TODO: toast message
		}

		const isMutationRequest =
			(args as FetchArgs).method && (args as FetchArgs).method !== "GET";

		if (isMutationRequest) {
			const successMessage = result.data?.message;

			// TODO: toast message
		}

		if (result.data) {
			result.data = result.data.data;
		} else if (
			result.error?.status === 204 ||
			result.meta?.response?.status === 24
		) {
			return { data: null };
		}

		return result;
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : "Unknown Error occured";

		return { error: { status: "FETCH_ERROR", message: errorMessage } };
	}
};

export const api = createApi({
	baseQuery: customBaseQuery,
	reducerPath: "api",
	tagTypes: ["Gifts"],
	endpoints: (build) => ({
		/* GIFTS */
		getAllGifts: build.query<Gift[], void>({
			query: () => "gifts",
			providesTags: ["Gifts"],
		}),
		getGiftById: build.query<Gift, string>({
			query: (id) => `gifts/${id}`,
			providesTags: (results, error, id) => [
				{
					type: "Gifts",
					id,
				},
			],
		}),

		/* AUTH */
		registerUser: build.mutation<
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

					sessionStorage.setItem("auth-token", authToken);
					sessionStorage.setItem("first-name", firstName);
					sessionStorage.setItem("email", email);
				} catch (error) {
					console.error("Error registering user: ", error);

					// TODO: toast error message
				}
			},
		}),
	}),
});

export const {
	useGetAllGiftsQuery,
	useGetGiftByIdQuery,
	useRegisterUserMutation,
} = api;
