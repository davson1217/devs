import React, {ChangeEvent, useRef, useEffect} from 'react';
import {ButtonBase, CardActions, CardContent, CardMedia, IconButton, TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../ReduxToolKit/Store/Store";
import {cardOptions, inputChangeAction} from "../../ReduxToolKit/Slices/EB_PostSlice";
import Actions from "./comps/Actions.card";
import ActionsUpdate from "./comps/UpdateActions";

interface CardProps {
    postId: string,
    title: string,
    description: string,
    photo: string,
    editMode: boolean,
    updatePostPhoto: (event: ChangeEvent<HTMLInputElement>, postId:string, title:string, description:string) => void,
    updateRecord: () => void,
    deleteHandler: (id: string) => void,
}

const PostDisplayCard = (props: CardProps) => {

    const {postId, photo, updatePostPhoto, description, title, deleteHandler, updateRecord} = props;
    const reduxState = useSelector((state:RootState)=> state.Posts)

    const dispatch = useDispatch();
    const photoPreview = reduxState.photo;
    const {editMode} = reduxState;
    const photoInput:any = useRef();
    const showActions = reduxState.cardOptions.show && reduxState.cardOptions.post === postId;
    let editing = editMode.edit && postId === editMode.post;
    // const readMore = description.length >= 170 ? <ButtonBase> ...Read More</ButtonBase> : "";

    const triggerFileSelector = () => photoInput.current.click();
    const hiddenInput = <input id={"fileInput" + postId} hidden type="file" onChange={(e)=>updatePostPhoto(e, postId, title, description)} ref={photoInput}/>
    let PostPhoto = photo ? <CardMedia component="img" height="200" image={photo} alt={"camera"} onClick={triggerFileSelector}/> :
        <CardMedia component="img" height="200" image='assets/noimage.jpeg' alt={"camera"} onClick={triggerFileSelector}/>;


    let actions = showActions? <Actions deleteHandler={deleteHandler} postId={postId} title={title} description={description}/> : null;
    if (editing){
        PostPhoto = <CardMedia component="img" height="200" image='assets/upload.jpeg' alt={"camera"} onClick={triggerFileSelector} sx={{cursor:'pointer'}}/>;
        actions = showActions? <ActionsUpdate update={()=> {}} postId={postId}/> : null;

        if (photoPreview.preview){
            // PostPhoto = <CardMedia component="img" height="200" image={photoPreview.preview} alt={"camera"} onClick={triggerFileSelector}/>;
            // cardActions = <ActionsUpdate update={updateRecord} />
        }
    }

    return (
        <Card sx={{ maxWidth: 300, opacity:editing? 0.8 : 1, boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'}}
              onMouseEnter={()=> dispatch(cardOptions({show:true, post:postId}))}
              onMouseLeave={()=> dispatch(cardOptions({show:false, post:''}))}
        >
            {hiddenInput}
            {PostPhoto}
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">{title}</Typography>
                <Typography variant="body2" color="text.secondary">{description}</Typography>
            </CardContent>
            <hr/>
            {actions}
        </Card>
    )
}
export default PostDisplayCard;