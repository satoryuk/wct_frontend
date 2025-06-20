import { apiSlice } from "../api/apiSlice";
import { BASE_PRIVATE_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: `${BASE_PRIVATE_URL}/categories`,
        method: "GET",
      }),
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: `${BASE_PRIVATE_URL}/categories`,
        method: "POST",
        body: data,
      }),
    }),

    getCategoryById: builder.query({
      query: (id) => ({
        url: `${BASE_PRIVATE_URL}/categories/${id}`,
        method: "GET",
      }),
    }),

    deactivateCategory: builder.mutation({
      query: (id) => ({
        url: `${BASE_PRIVATE_URL}/categories/${id}/deactivate`,
        method: "PATCH",
      }),
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_PRIVATE_URL}/categorys/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useDeactivateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApiSlice;
