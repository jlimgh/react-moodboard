import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { faker } from "@faker-js/faker";

const addUser = createAsyncThunk('users/add', async (payload) => {
    console.log('payload in addUser thunk: ', payload);
    const response = await axios.post('http://localhost:3005/users', {
        name: payload.name
    });

    // DEV ONLY
    await pause(2000);

    return response.data;
});

// DEV *****
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

export { addUser };