import {combineReducers, configureStore} from '@reduxjs/toolkit'
import PostSlice from "../Slices/PostSlice";
import FeedbackSlice from "../Slices/FeedbackSlice";
import EB_POSTS from "../Slices/EB_PostSlice";

export const store = configureStore({
    reducer: combineReducers({
        // Posts: PostSlice,
        Posts: EB_POSTS,
        Feedback: FeedbackSlice,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;