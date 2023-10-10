import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV *****
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

const boardsApi = createApi({
    reducerPath: 'boards',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            // REMOVE FOR PROD, for testing only
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        // will auto build out a few custom hooks to use
        // etc useFetchBoardsQuery
        return {
            removeboard: builder.mutation({
                invalidatesTags: (result, error, board) => {
                    // happens to have userId on the board coming back
                    return [{type: 'Board', id: board.id}]
                },
                query: (board) => {
                    return {
                        url: `/boards/${board.id}`,
                        method: 'DELETE'
                    }
                }
            }),
            addBoard: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{type: 'UsersBoards', id: user.id}]
                },
                query: (user) => {
                    return {
                        url: '/boards',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    };
                }
            }),
            fetchBoards: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map(board => {
                        return {type: 'Board', id: board.id}
                    });
                    tags.push({type: 'UsersBoards', id: user.id});
                    return tags;
                },
                query: (user) => {
                    return {
                        url: '/boards',
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    }
                }
            }),
        }
    }
});

export const { 
    useFetchBoardsQuery, 
    useAddBoardMutation,
    useRemoveboardMutation
} = boardsApi;
export { boardsApi };