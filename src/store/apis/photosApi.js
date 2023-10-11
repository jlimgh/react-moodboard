// @reduxjs/toolkit/query" does not give custom hooks, but @reduxjs/toolkit/query/react does
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005'
    }),
    endpoints(builder) {
        return {
            fetchPhotos: builder.query({
                providesTags: (result, error, board) => {
                    const tags = result.map((photo) => {
                        return { type: 'Photo', id: photo.id}
                    });
                    tags.push({type: 'BoardPhoto', id: board.id});
                    return tags;
                },
                query: (board) => {
                    return {
                        url: '/photos',
                        params: {
                            boardId: board.id
                        },
                        method: 'GET'
                    }
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, board) => {
                    return [{ type: 'BoardPhoto', id: board.id}];
                },
                query: (board) => {
                    return {
                        url: '/photos',
                        method: 'POST',
                        body: {
                            boardId: board.id,
                            url: faker.image.abstract(150, 150, true)
                        }
                    }
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id}];
                },
                query: (photo) => {
                    return {
                        method: 'DELETE',
                        url: `/photos/${photo.id}`
                    }
                }
            })
        }
    }
});

export const {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
} = photosApi;
export { photosApi };