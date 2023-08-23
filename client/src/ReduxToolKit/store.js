import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postReducer from './postSlice';
import likeReducer from './PostLikes';
import commentSlice from './commentSlice';
import searchReducer from './searchReducer'
import friendReducer from './friendList'
import groupReducer from './groupSlice'


const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        like: likeReducer,
        comment: commentSlice,
        search: searchReducer,
        friend: friendReducer,
        group: groupReducer,

    },
});

export default store;
