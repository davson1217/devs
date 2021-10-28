import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface FirstSliceState{
    username: string
}

const initialState:FirstSliceState = {
    username: ""
}

export const FirstSlice = createSlice({
    name: "FirstSlice",
    initialState,
    reducers: {
        modifyUsername: (state,action:PayloadAction<string>) => {
            state.username = action.payload;
        }
    },
})

export const { modifyUsername } = FirstSlice.actions;
export default FirstSlice.reducer;