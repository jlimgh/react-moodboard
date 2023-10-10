import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { boardsApi } from "./apis/boardsApi";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        [boardsApi.reducerPath]: boardsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(boardsApi.middleware)
    }
});

setupListeners(store.dispatch);

//use as central communication file for all react/redux import/export
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { 
    useFetchBoardsQuery, 
    useAddBoardMutation,
    useRemoveboardMutation
} from './apis/boardsApi';
