import { apiSlice } from "../api/apiSlice";
import { BASE_PRIVATE_URL } from "../constants";

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: () => ({
        url: `${BASE_PRIVATE_URL}/brands`,
        method: "GET",
      }),
    }),

    createBrand: builder.mutation({
      query: (data) => ({
        url: `${BASE_PRIVATE_URL}/brands`,
        method: "POST",
        body: data,
      }),
    }),

    getBrandById: builder.query({
      query: (id) => ({
        url: `${BASE_PRIVATE_URL}/brands/${id}`,
        method: "GET",
      }),
    }),

    deactivateBrand: builder.mutation({
      query: (id) => ({
        url: `${BASE_PRIVATE_URL}/brands/${id}/deactivate`,
        method: "PATCH",
      }),
    }),

    updateBrand: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_PRIVATE_URL}/brands/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBrandQuery,
  useCreateBrandMutation,
  useGetBrandByIdQuery,
  useDeactivateBrandMutation,
  useUpdateBrandMutation,
} = brandApiSlice;
