import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Event, RegisterUser, UsersByEvent } from '../types'

export const mainApi = createApi({
  reducerPath: 'main/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4444/api',
  }),
  tagTypes: ['Event', 'User'],
  endpoints: build => ({
    getEvents: build.query<
      Event[],
      { limit?: string; skip?: string; sortBy?: string; sortOrder?: string }
    >({
      query: ({ limit, skip, sortBy, sortOrder }) => ({
        url: '/events',
        params: {
          limit,
          skip,
          sortBy,
          sortOrder,
        },
      }),
      providesTags: () => ['Event'],
    }),
    getUsersByEvent: build.query<UsersByEvent, string>({
      query: eventId => ({
        url: `/events/${eventId}`,
      }),
      providesTags: () => ['User'],
    }),
    searchUsersByEvent: build.query<
      UsersByEvent,
      { eventId: string; query?: string }
    >({
      query: ({ eventId, query }) => ({
        url: `/events/${eventId}/search`,
        params: { query: query },
      }),
    }),
    registerUser: build.mutation<void, RegisterUser>({
      query: (userData: RegisterUser) => ({
        url: '/register',
        method: 'POST',
        body: {
          userData,
        },
      }),
      invalidatesTags: ['Event', 'User'],
    }),
  }),
})
