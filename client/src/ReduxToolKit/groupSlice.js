import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const createGroup = createAsyncThunk(
    'post/createGroup',
    async (postId) => {
        // console.log("postId", postId)

        try {
            const response = await axios.post(`http://localhost:8000/create-group`, postId);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
);

//get user create by group
export const getUserCreateGroup = createAsyncThunk(
    'post/getUserCreateGroup',
    async (userId) => {
        // console.log("userId", userId)

        try {
            const response = await axios.get(`http://localhost:8000/user-groups/${userId}`);
            // console.log("response data", response?.data)
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
);

const groupSlice = createSlice({
    name: 'group',
    initialState: {
        group: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action?.payload?.message;
                toast.success(action?.payload?.message);
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                // toast.error("kindly Login user Id");
                toast.error(action.error.message);
            })

            //--------get user create by group------------------------
            .addCase(getUserCreateGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserCreateGroup.fulfilled, (state, action) => {
                state.loading = false;
                state.group = action?.payload;
                state.successMessage = action?.payload?.message;
                toast.success(action?.payload?.message);
            })
            .addCase(getUserCreateGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log("error", action.error.message)

                // toast.error(action.error.message);
            });
    },
});



export default groupSlice.reducer;
