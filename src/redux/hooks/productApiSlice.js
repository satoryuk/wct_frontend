import { apiSlice } from "../api/apiSlice";
import { BASE_PRIVATE_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, per_page = 10, search = "" }) => ({
        url: `${BASE_PRIVATE_URL}/products`,
        method: "GET",
        params: {
          page,
          per_page,
          search,
        },
      }),
      transformResponse: (response) => {
        return {
          data:
            response.data?.data?.map((product) => ({
              ...product,
              category: product.category || null, // Ensure category exists
            })) || [],
          meta: {
            total: response.data?.total || 0,
            current_page: response.data?.current_page || 1,
            per_page: response.data?.per_page || 10,
            last_page: response.data?.last_page || 1,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ product_id }) => ({
                type: "Product",
                id: product_id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    deactivateProduct: builder.mutation({
      query: (id) => ({
        url: `${BASE_PRIVATE_URL}/products/${id}/deactivate`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${BASE_PRIVATE_URL}/products`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: [{ type: "Product", id: "List" }],
    }),

    getProductById: builder.query({
      query: (product_id) => ({
        url: `${BASE_PRIVATE_URL}/products/${product_id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data || response,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),

    updateProduct: builder.mutation({
      query: ({ product_id, data }) => ({
        url: `${BASE_PRIVATE_URL}/products/${product_id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (product_id) => ({
        url: `${BASE_PRIVATE_URL}/products/${product_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeactivateProductMutation,
} = productApiSlice;
