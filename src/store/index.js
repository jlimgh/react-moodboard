import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { formReducer, changeName } from "./slices/formSlice";
import { boardsApi } from "./apis/boardsApi";
import { photosApi } from "./apis/photosApi";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        form: formReducer,
        [boardsApi.reducerPath]: boardsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(boardsApi.middleware)
            .concat(photosApi.middleware)
    }
});

setupListeners(store.dispatch);

//use as central communication file for all react/redux import/export
export { changeName };
export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { 
    useFetchBoardsQuery, 
    useAddBoardMutation,
    useRemoveboardMutation
} from './apis/boardsApi';
export {
    useFetchPhotosQuery,
    useAddPhotoMutation,
    useRemovePhotoMutation
} from './apis/photosApi';
