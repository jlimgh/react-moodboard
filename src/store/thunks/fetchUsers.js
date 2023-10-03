import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');
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

export { fetchUsers };