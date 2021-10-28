import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Feedback {
        show: boolean;
        context: string;
        message: string;
}

const initialState:Feedback = {
        show: false,
        context: '',
        message: ''
}

export const FeedbackSlice = createSlice({
    name: "Feedback",
    initialState,
    reducers:{
        showFeedback: (state,action:PayloadAction<Feedback>) => {
            const {show, context, message} = action.payload;
            return {...state, show, context, message};
        },
        closeFeedback: (state) => {
            return{
                ...state,
                show: false,
                context:'',
                message:''
            }
        }
    }
})

export const {showFeedback, closeFeedback} =  FeedbackSlice.actions;
export default FeedbackSlice.reducer;