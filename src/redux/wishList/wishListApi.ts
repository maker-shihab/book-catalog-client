/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../api/apiSlice";

const wishListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getwishLists: builder.query({
      query: () => "/wishlist",
      providesTags: ["wishlists"],
    }),
    createWishList: builder.mutation({
      query: (data) => ({
        url: "/wishlist/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlists"],
    }),

    deleteWishList: builder.mutation({
      query: (id) => ({
        url: `wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlists"],
    }),
  }),
});

export const {
  useGetwishListsQuery,
  useCreateWishListMutation,
  useDeleteWishListMutation,
} = wishListApi;
