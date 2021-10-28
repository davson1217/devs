import {createSlice} from "@reduxjs/toolkit";
import {api} from "../API/api";
import {showFeedback} from "./FeedbackSlice";
import {CardOptions, PostTypes} from "../../TypeContracts/Types";
import {PostSlice} from "./PostSlice";



interface SliceContract{
    posts: Array<PostTypes>,
    title: string,
    description: string;
    photo: { file: FileList | null, preview: string },
    editMode:{
        edit: boolean,
        post: string
    },
    cardOptions: CardOptions
}

const initialState:SliceContract = {
    posts: [],
    title: '',
    description: '',
    photo: {
        file: null,
        preview: ''
    },
    editMode: {
        edit:false,
        post: ''
    },
    cardOptions: {
        show: false,
        post: ''
    }
}


export const EB_POSTS = createSlice({
    name: "Posts",
    initialState,
    reducers:{
        inputChangeAction: (state,action) => {
            const {payload} = action;
            if (payload.name === 'file'){
                return{
                    ...state,
                    photo: payload
                }
            }else if (payload.name === 'edit'){
                return {
                    ...state,
                    photo: {
                        ...state.photo,
                        file: payload.file, preview: payload.preview
                    },
                    title: payload.title,
                    description: payload.description
                }
            }
            return{
                ...state,
                [payload.name]: payload.value,
            }
        },

        blogPosts: (state,action) => {
            return{
                ...state,
                posts:action.payload,
            }
        },

        cardOptions: (state, action) => {
            // console.log(action.payload)
          state.cardOptions =   action.payload;
        },

        enterEdit: (state,action) => {
            return {
                ...state,
                title: action.payload.title,
                description: action.payload.description,
                editMode:{
                    ...state.editMode,
                    edit: action.payload.edit,
                    post: action.payload.postId
                }
            }
        },

        cleanState: (state) => {
            return{
                ...state,
                title: '',
                description: '',
                photo: {
                    file: null,
                    preview: ''
                },
                editMode: {
                    edit:false,
                    post: ''
                }
            }
        }

    }
})

export const {cardOptions, enterEdit,blogPosts, inputChangeAction, cleanState} = EB_POSTS.actions;
export default EB_POSTS.reducer;