import React from 'react'
import Card from '@mui/material/Card';
import {Button, CardActions, CardContent, CardMedia, TextField} from "@mui/material";
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from "../../ReduxToolKit/Store/Store";
import {cleanState, inputChangeAction} from "../../ReduxToolKit/Slices/EB_PostSlice";
import {useEasybase} from "easybase-react";

const AddPostCard = () => {
    const {title, description, photo, editMode} = useSelector((state:RootState)=> state.Posts)
    const dispatch = useDispatch();
    const { db } = useEasybase();

    const fileInputHandler = (files: any) => {
        if (files) {
            const file = files[0];
            if (file){
                const preview = window.URL.createObjectURL(file);
                const payload = {name:"file",file: file, preview};
                dispatch(inputChangeAction(payload));
            }else{
                if (photo && photo.preview ){
                     URL.revokeObjectURL(photo.preview);
                }
                const payload = {name:"file",file: null, preview:''};
                dispatch(inputChangeAction(payload));
            }
        }
    }

    const AddPostHandler = () => {
            db('BLOG').insert({title, description}).one();
            dispatch(cleanState())
    }

    return (
        <Card sx={{ maxWidth: 300}}>
            {/*<input type={'file'} onChange={(e) => fileInputHandler(e.target.files)}/>*/}
            <CardContent>
                <form encType={'multipart/form-data'} onSubmit={(e) => {
                    e.preventDefault();
                    AddPostHandler();
                    // dispatch(AddNewPost(title, description, photo.file? photo.file: null)); //NestJs Endpoint
                }}>
                    <TextField
                        fullWidth
                        sx={{mb:2}}
                        id="standard-helperText"
                        label="Title"
                        variant="standard"
                        value={editMode.edit? '' : title}
                        onChange={(e)=>dispatch(inputChangeAction({name:"title", value:e.target.value}))}
                    />
                    <TextField
                        multiline
                        fullWidth
                        id="standard-multiline-static"
                        label="Description"
                        rows={4}
                        variant="standard"
                        value={editMode.edit? '' : description}
                        onChange={(e)=>dispatch(inputChangeAction({name:"description", value:e.target.value}))}
                    />
                    <button disabled={!title || !description || editMode.edit}>Add Post</button>
                </form>
            </CardContent>
        </Card>
    )
}

export default AddPostCard;