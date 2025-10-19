import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes:['Images'],
    endpoints: (builder) => ({
        getImages: builder.query({
            query: () => '/images',
            providesTags: ['Images'],
        }),
        addImage: builder.mutation({
            query: (newImage) => ({
                url: '/images',
                method: 'POST',
                body: newImage,
            }),
            invalidatesTags: ['Images'],
        }),
    }),
});

export const { useGetImagesQuery, useAddImageMutation } = api;