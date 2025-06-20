import { Result } from "postcss";
import { apiSlice } from "../api/apiSlice";
import { BASE_PRIVATE_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `${BASE_PRIVATE_URL}/users`,
        method: "GET",
      }),
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: `${BASE_PRIVATE_URL}/users`,
        method: "POST",
        body: data,
      }),
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `${BASE_PRIVATE_URL}/users/${id}`,
        method: "GET",
      }),
    }),

    deactivateUser: builder.mutation({
      query: (id) => ({
        url: `${BASE_PRIVATE_URL}/users/${id}/deactivate`,
        method: "PATCH",
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${BASE_PRIVATE_URL}/users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useDeactivateUserMutation,
  useUpdateUserMutation,
} = userApiSlice;
