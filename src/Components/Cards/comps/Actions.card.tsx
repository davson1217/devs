import React from 'react';
import {CardActions, IconButton} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useDispatch} from "react-redux";
import {enterEdit} from "../../../ReduxToolKit/Slices/EB_PostSlice";

interface Props {
    deleteHandler: (id:string) => void,
    postId: string,
    title: string,
    description:string
}

const Actions = (props:Props) => {
    const {title, description} = props;
    const dispatch = useDispatch();
    const enterEditMode = (postId: string) => {
        const payload = {
            edit: true,
            postId, title, description
        };
        dispatch(enterEdit(payload));
    }

    return (
        <CardActions disableSpacing sx={{display: 'flex' , justifyContent:'space-between', alignItems:'center'}}>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share" onClick={()=>props.deleteHandler(props.postId)}>
                <DeleteIcon />
            </IconButton>
            <IconButton aria-label="share" onClick={()=>enterEditMode(props.postId)}>
                <EditIcon />
            </IconButton>
        </CardActions>
    )
}

export default Actions