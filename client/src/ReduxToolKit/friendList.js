import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Get All User
export const getAllUser = createAsyncThunk(
    'user/getAllUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/All-User');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//request send
export const sendFriendRequest = createAsyncThunk(
    'user/sendFriendRequest',
    async (userData, { rejectWithValue }) => {
        try {
            // console.log("🚀 userData:", userData);
            const response = await axios.post(`http://localhost:8000/send-request`, userData);
            console.log('response?.data', response?.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

//received friend request
export const cancelFriendRequest = createAsyncThunk(
    'user/cancelFriendRequest',
    async (userData, { rejectWithValue }) => {
        try {
            console.log("🚀 userData:", userData);
            const response = await axios.post(`http://localhost:8000/request-cancel`, userData);
            console.log('response?.data', response?.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);


//received friend request
export const acceptFriendRequest = createAsyncThunk(
    'user/acceptFriendRequest',
    async (userData, { rejectWithValue }) => {
        try {

            const response = await axios.post(`http://localhost:8000/acceptRequest`, userData);
            console.log('response?.data', response?.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);



//Get All friend request getRequestedUsers
export const getRequestedUsers = createAsyncThunk(
    'user/getRequestedUsers',
    async (userId, { rejectWithValue }) => {
        try {

            const response = await axios.post(`http://localhost:8000/request${userId}`);
            console.log('response?.data', response?.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

//status check send request
export const statusCheckRequest = createAsyncThunk(
    'user/statusCheckRequest',
    async (userId, { rejectWithValue }) => {
        console.log("-----User: " + userId)
        try {

            const response = await axios.get(`http://localhost:8000/status/${userId}`);
            console.log('response?.data', response?.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);






const allUserSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        users: [], // Changed from 'user' to 'users' to store an array of users
        error: null,
        isAuthenticated: false,
        statusCheckRequest: null,
        friendRequests: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //--------------------Get All Users --------------------
            .addCase(getAllUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Changed from 'posts' to 'users'
                // toast.success(action.payload.message);
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message; // Changed from 'action?.payload?.message'
                // toast.error(action?.error?.message);
            })

            //--------------------Send Friend Request --------------------

            .addCase(sendFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.friendRequests = action?.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(sendFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                toast.error(action.payload?.message);
            })

            //--------------------cancel Friend Request --------------------
            .addCase(cancelFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.friendRequests = action?.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(cancelFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                toast.error(action.payload?.message);
            })
            //--------------------Received Friend Request --------------------

            .addCase(acceptFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.friendRequests = action?.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(acceptFriendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                toast.error(action.payload?.message);
            })
            //--------------------getRequestedUsers Request --------------------

            .addCase(getRequestedUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRequestedUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.friendRequests = action?.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(getRequestedUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                toast.error(action.payload?.message);
            })

            //--------------------status check request --------------------

            .addCase(statusCheckRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(statusCheckRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.statusCheckRequest = action?.payload;
                toast.success(action?.payload?.message);
            })
            .addCase(statusCheckRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
                toast.error(action.payload?.message);
            });


    },
});

export default allUserSlice.reducer;
