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
            // console.log("response data group", response?.data)
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
);

//--------Group invites--------------------------------
export const sendGroupInvitation = createAsyncThunk(
    "groupInvitations/sendInvitation",
    async (invitationData) => {
        try {
            console.log('invitationData', invitationData)
            const response = await axios.post(
                "http://localhost:8000/send-invite",
                invitationData
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

//--------Group Cancel invites--------------------------------
export const CancelGroupInvitation = createAsyncThunk(
    'post/CancelGroupInvitation',
    async (invitationData) => {
        try {
            console.log('invitationData', invitationData)
            const response = await axios.post(
                "http://localhost:8000/invite-cancel",
                invitationData
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

//--------Group Accept  invites--------------------------------
export const AcceptGroupInvitation = createAsyncThunk(
    'post/AcceptGroupInvitation',
    async (invitationData) => {
        try {
            console.log('invitationData', invitationData)
            const response = await axios.post(
                "http://localhost:8000/invite-accept",
                invitationData
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const groupSlice = createSlice({
    name: 'group',
    initialState: {
        group: [],
        loading: false,
        error: null,
        // successMessage: ""
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
            })

            //----------------------------Send Group Invitation--------------------------
            .addCase(sendGroupInvitation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendGroupInvitation.fulfilled, (state, action) => {
                state.loading = false;
                state.group = action?.payload;
                state.successMessage = action?.payload?.message;
                toast.success(action?.payload?.message);
            })
            .addCase(sendGroupInvitation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log("error", action.error.message)
                toast.error(action.error.message);
            })
            //----------------------------Send Group Invitation--------------------------
            .addCase(CancelGroupInvitation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(CancelGroupInvitation.fulfilled, (state, action) => {
                state.loading = false;
                state.group = action?.payload;
                state.successMessage = action?.payload?.message;
                toast.success(action?.payload?.message);
            })
            .addCase(CancelGroupInvitation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log("error", action.error.message)
                toast.error(action.error.message);
            })
            //----------------------------Accept Request Group Invitation--------------------------
            .addCase(AcceptGroupInvitation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AcceptGroupInvitation.fulfilled, (state, action) => {
                state.loading = false;
                state.group = action?.payload;
                state.successMessage = action?.payload?.message;
                toast.success(action?.payload?.message);
            })
            .addCase(AcceptGroupInvitation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log("error", action.error.message)
                toast.error(action?.error?.message);
            });
    },
});



export default groupSlice.reducer;
