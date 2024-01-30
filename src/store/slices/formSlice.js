import { createSlice } from '@reduxjs/toolkit';
import { addUser } from '../thunks/addUser';
// import { addGift } from './giftsSlice';

const formSlice = createSlice({
    name: 'form',
    initialState: {
        name: '',
        // cost: 0
    },
    reducers: {
        changeName(state, action) {
            state.name = action.payload;
        },
        // changeCost(state, action) {
        //     state.cost = action.payload;
        // }
    },
    extraReducers(builder) {
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.name = '';
            // state.cost = 0;
        })
    }   

});

export const { changeName } = formSlice.actions;
export const formReducer = formSlice.reducer;