import { apiSlice } from "../api/apiSlice";
import { BASE_PRIVATE_URL } from "../constants";

export const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get inventory list with pagination
    getInventory: builder.query({
      query: ({ page = 1, per_page = 10, search = "" } = {}) => ({
        url: `${BASE_PRIVATE_URL}/inventory`,
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
            response.data?.map((product) => ({
              id: product.product_id,
              name: product.product_name,
              stock: product.stock_qty,
              status: product.status === 1, // Convert to boolean
              stockStatus: product.stock_status,
            })) || [],
          meta: {
            total: response.total || 0,
            currentPage: response.current_page || 1,
            perPage: response.per_page || 10,
            lastPage: response.last_page || 1,
          },
          links: response.links || [],
        };
      },

      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Inventory",
                id,
              })),
              { type: "Inventory", id: "LIST" },
            ]
          : [{ type: "Inventory", id: "LIST" }],
    }),


    // Get inventory statistics (for your cards)
    getInventoryStats: builder.query({
      query: () => ({
        url: `${BASE_PRIVATE_URL}/inventory/stats`, // You might need to create this endpoint
        method: "GET",
      }),
      transformResponse: (response) => {
        // If you don't have a stats endpoint, we can calculate from getInventory
        if (!response.data) {
          const { data } = inventoryApiSlice.endpoints.getInventory.select()(
            {}
          );
          const inventoryData = data?.data || [];

          return {
            totalProducts: inventoryData.length,
            outOfStock: inventoryData.filter((p) => p.stock === 0).length,
            activeProducts: inventoryData.filter((p) => p.status && p.stock > 0)
              .length,
          };
        }

        return {
          totalProducts: response.data.total_products || 0,
          outOfStock: response.data.out_of_stock || 0,
          activeProducts: response.data.active_products || 0,
        };
      },
      providesTags: ["InventoryStats"],
    }),
  }),
});

export const {
  useGetInventoryQuery,
  useGetInventoryStatsQuery,
  useLazyGetInventoryQuery,
  useLazyGetInventoryStatsQuery,
} = inventoryApiSlice;
