import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: 'loginApi',
  // eslint-disable-next-line no-undef
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL}),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: ({ ...payload }) => ({
        url: `ventor`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAdminLoginMutation } = loginApi