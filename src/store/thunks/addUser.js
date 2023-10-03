import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { faker } from "@faker-js/faker";

const addUser = createAsyncThunk('users/add', async () => {
    const response = await axios.post('http://localhost:3005/users', {
        name: faker.person.fullName()
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