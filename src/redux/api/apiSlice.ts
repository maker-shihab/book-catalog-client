import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-server-maker-shihab.vercel.app/api/v1",
  }),
  tagTypes: ["books", "reviews", "wishlists"],
  endpoints: () => ({}),
});
