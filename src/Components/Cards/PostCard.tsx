import React, {ChangeEvent, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DeletePost} from "../../ReduxToolKit/Slices/PostSlice";
import PostDisplayCard from "./PostDisplay.card";
import PreviewDisplayCard from "./PreviewDisplay.card";
import {cleanState, enterEdit, inputChangeAction} from "../../ReduxToolKit/Slices/EB_PostSlice";
import {useEasybase} from "easybase-react";
import {RootState} from "../../ReduxToolKit/Store/Store";

interface CardProps {
    cardContext: 'Preview' | 'Post',
    title: string,
    description: string,
    postId: string,
    photo?: any,
    photoUpdate?: any
}

const PostCard = (props: CardProps) => {

    const {cardContext, title, description, photo, postId, photoUpdate} = props;
    const state = useSelector((state:RootState) => state.Posts );

    const dispatch = useDispatch();
    const { setImage, db, e,  } = useEasybase();

    const [cardState, setCardState] = useState({
        editMode: false,
        cardToEdit: '',
        cardToEditTitle: '',
    })

    const updatePostRecord = async () => {
        // console.log(cardState.cardToEdit);
        const res = await setImage(cardState.cardToEdit, "photo", photoUpdate[0], "Blog");
        if (res.success){
           const update = await db("Blog").where({ _key: cardState.cardToEdit })
               .set([{ title: "Pulper" }]).one()
            if (update)
            dispatch(cleanState())
        }
    }

    const editMode = (e: ChangeEvent<HTMLInputElement>, postId: string, title:string, description: string) => {
        const file = e.target.files;
        if (file && file[0].type.includes('image')){
            setCardState({...cardState, editMode: true, cardToEdit: postId, cardToEditTitle: title});
            dispatch(enterEdit({mode:true, postId}));
            const preview = window.URL.createObjectURL(file[0]);
            const payload = {
                name:"edit",
                file: file,
                preview, title, description
            };
            dispatch(inputChangeAction(payload));
        }

    }

    const deleteHandler = async (postId: string) => {
        // dispatch(DeletePost(postId));// Nest Js
        const remove = await db("Blog").delete().where({ _key: postId }).one();
        // console.log(remove)
    }

    const renderCard = () => {
        switch (cardContext){
            case "Preview":
                return  <PreviewDisplayCard
                    title={title}
                    description={description}
                    photo={photo}
                />

            case "Post":
                return <PostDisplayCard
                    title={title}
                    description={description}
                    postId={postId}
                    deleteHandler={deleteHandler}
                    updatePostPhoto={editMode}
                    photo={photo}
                    editMode={cardState.editMode}
                    updateRecord={updatePostRecord}
                />
        }
    }
    return renderCard();
}

export default PostCard;