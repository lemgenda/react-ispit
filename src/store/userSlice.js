import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk za dohvaćanje podataka korisnika
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (username, { rejectWithValue }) => {
        try {
            const userRes = await axios.get(`https://api.github.com/users/${username}`);
            const reposRes = await axios.get(`https://api.github.com/users/${username}/repos`);

            return {
                user: userRes.data,
                repos: reposRes.data,
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Došlo je do greške');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        user: null,
        repos: [],
        loading: false,
        error: null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        resetUser: (state) => {
            state.username = '';
            state.user = null;
            state.repos = [];
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.repos = action.payload.repos;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Došlo je do greške';
            });
    },
});

export const { setUsername, resetUser, clearError } = userSlice.actions;
export default userSlice.reducer;