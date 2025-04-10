import { baseApi } from "./baseApi";

export const giftsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllGifts: builder.query<Gift[], void>({
			query: () => "gifts",
			providesTags: ["Gifts"],
		}),
		getGiftById: builder.query<Gift, string>({
			query: (id) => `gifts/${id}`,
			providesTags: (_results, _error, id) => [
				{
					type: "Gifts",
					id,
				},
			],
		}),
	}),
});

export const { useGetAllGiftsQuery, useGetGiftByIdQuery } = giftsApi;
