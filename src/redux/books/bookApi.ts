/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/book",
      providesTags: ["books"],
    }),
    getLatestBooks: builder.query({
      query: () => "/book/latest",
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "/book/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    bookReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `book/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetLatestBooksQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useBookReviewMutation,
  useDeleteBookMutation,
} = bookApi;
