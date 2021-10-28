import {createSlice} from "@reduxjs/toolkit";
import {api} from "../API/api";
import {showFeedback} from "./FeedbackSlice";

type UIPost = {
    title: string,
    description: string,

}

interface post extends UIPost{
    _id: string
}

interface SliceContract extends UIPost{
    posts: Array<post>,
    fetchingPosts: boolean,
    photo: {
        file: File | null,
        preview: string
    },
    testPhoto: string
}

const initialState:SliceContract = {
    title: "",
    description: "",
    photo: {
        file: null,
        preview: ''
    },
    posts: [],
    fetchingPosts: false,
    testPhoto: ''
}

export const PostSlice = createSlice({
    name: "PostCreate",
    initialState,
    reducers:{
        inputChangeAction: (state,action) => {
            if (action.payload.name === 'file'){
                return{
                    ...state,
                    photo: action.payload
                }
            }
            return{
                ...state,
                [action.payload.name]: action.payload.value,
            }
        },
        addPost: (state) => {
            return{
                ...state,
                title: '',
                description: ''
            }
        },
        blogPosts: (state,action) => {
            return{
                ...state,
                posts:action.payload,
                fetchingPosts: false,
            }
        },
        fetchPostProcess: (state) => {
            state.fetchingPosts = !state.fetchingPosts;
        },
        testPhoto: (state, action) => {
            state.testPhoto = action.payload
        }
    }
})

export const AddNewPost = (title:string, description: string, photo:any) => async (dispatch: any) => {
    const payload = {title, description, photo};
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('file', photo);
    const id = await api.post('blog', data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }).catch((error:any)=>console.log(error));
    dispatch(addPost());
    FeedBack(dispatch,'POST_ADDED', 'Post added successfully');
    if (id){
        dispatch(FetchPosts());
    }
}

const FeedBack = (dispatch:any, context:string, message:string) => {
    return setTimeout(()=>{
        return dispatch(showFeedback({
            show: true, context, message
        }));
    }, 1500);
}

export const FetchPhoto = async (fileName: string) => {
    const post = await fetch('http://localhost:8080/blog/photo', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(fileName)
    }).then((response:Response)=>{})

}

export const FetchPosts = () => async (dispatch: any) => {
    dispatch(fetchPostProcess());
   const posts:any = await api.get('blog').catch((error)=>console.log(error));
   const stream = posts.data[0].postPhoto
   let reader = stream.getReader();
    console.log(reader);
    setTimeout(() => {
        if (posts){
            dispatch(blogPosts(posts.data));
        }
    },1000);
}

export const DeletePost = (postId: string) => async (dispatch: any) => {
    await api.delete('blog',{headers:{}, params:{id: postId}}).catch((error)=>console.log(error));
    FeedBack(dispatch,'POST_DELETED', 'Post deleted');
    dispatch(FetchPosts());
}

export const {inputChangeAction, addPost, blogPosts, fetchPostProcess, testPhoto} = PostSlice.actions;
export default PostSlice.reducer;

