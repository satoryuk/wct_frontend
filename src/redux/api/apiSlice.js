import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // ✅ correct import
import { BASE_PRIVATE_URL, BASE_URL_LOCAL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_PRIVATE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
