import React from 'react';
import {CardActions, IconButton} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {Add, Cancel} from "@mui/icons-material";
import {enterEdit} from "../../../ReduxToolKit/Slices/EB_PostSlice";
import {useDispatch} from "react-redux";

interface Props {
    update: () => void,
    postId: string
}

const ActionsUpdate = (props:Props) => {
    const dispatch = useDispatch();
    const exitEditMode = (postId: string) => {
        const payload = {
            edit: false,
            postId, title:'', description:''
        };
        dispatch(enterEdit(payload));
    }

    return (
        <CardActions disableSpacing sx={{display: 'flex' , justifyContent:'space-between', alignItems:'center'}}>
            <IconButton aria-label="add to favorites" onClick ={() => exitEditMode(props.postId)}>
                <Cancel />
            </IconButton>
            <IconButton aria-label="add to favorites">
                <Add onClick={props.update}/>
            </IconButton>
        </CardActions>
    )
}

export default ActionsUpdate