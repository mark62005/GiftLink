import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux";
import { STORAGE_KEYS } from "@/lib/constants";

const customBaseQuery = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: any
): Promise<any> => {
	const baseQuery = fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const token =
				typeof window !== "undefined"
					? localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
					: null;

			const state = getState() as RootState;
			const authToken = state.auth.token || token;

			if (authToken) {
				headers.set("Authorization", `Bearer ${authToken}`);
			}
			return headers;
		},
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

export const baseApi = createApi({
	baseQuery: customBaseQuery,
	reducerPath: "api",
	tagTypes: ["Gifts", "Users"],
	endpoints: (builder) => ({}),
});
