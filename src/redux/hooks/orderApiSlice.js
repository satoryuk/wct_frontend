import { apiSlice } from "../api/apiSlice";
import { BASE_PRIVATE_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all orders with pagination
    getOrders: builder.query({
      query: ({ page = 1, per_page = 10, search = "" }) => ({
        url: `${BASE_PRIVATE_URL}/orders`,
        method: "GET",
        params: { page, per_page, search },
      }),
      providesTags: ["Order"],
    }),

    // Create a new order
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${BASE_PRIVATE_URL}/orders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    // Get order by ID
    getOrderById: builder.query({
      query: (id) => ({
        url: `${BASE_PRIVATE_URL}/orders/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Update order status
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${BASE_PRIVATE_URL}/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    // Get items for a specific order
    getOrderItems: builder.query({
      query: (orderId) => ({
        url: `${BASE_PRIVATE_URL}/orders/${orderId}/items`,
        method: "GET",
      }),
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),

    // Update an order
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_PRIVATE_URL}/orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    // Cancel/delete an order
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `${BASE_PRIVATE_URL}/orders/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useGetOrderItemsQuery,
  useUpdateOrderMutation,
  useCancelOrderMutation,
} = orderApiSlice;
