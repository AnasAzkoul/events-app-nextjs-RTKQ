import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery(`http://localhost:3000/`),
  tagTypes: [`comment`, `email`], 
  endpoints: (build) => ({
    addEmail: build.mutation({
      query(body) {
        return {
          url: `/api/newsletter`,
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
    addComment: build.mutation({
      query(data) {
        const { id, ...patch } = data;
        return {
          url: `/api/comments/${id}`,
          method: 'POST',
          body: JSON.stringify(patch),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
      invalidatesTags: ['comment'], 
    }),
    getComments: build.query({
      query: (id) => ({url: `/api/comments/${id}`}),
      providesTags: ['comment'], 
      transformResponse: (response, meta, arg) => response.comments,
    }),
  }),
});

export const { useAddEmailMutation, useAddCommentMutation, useGetCommentsQuery } = eventsApi;
