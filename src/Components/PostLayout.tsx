import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../ReduxToolKit/Store/Store";
import {Grid} from "@mui/material";
import PostCard from "./Cards/PostCard";
import Skeleton from "./Layout/Skeleton";

interface LayoutProps {
    fetchingAPI: boolean
}

const PostLayout = (props:LayoutProps) => {

    const {title, description, posts, photo, editMode } = useSelector((state:RootState) => state.Posts );
    const showPreview = title || description;
    // const { posts } = useSelector((state:RootState) => state.Posts );

    const renderPosts = () => {
        if (posts.length){
            return posts.map((post, index) => {
                return (
                    <Grid item lg={3} key={index}>
                        <PostCard
                            cardContext={"Post"}
                            description={post.description}
                            title={post.title}
                            postId={post._key}
                            photo={post.photo}
                            photoUpdate={photo.file}
                        />
                    </Grid>
                )
            })
        }
        return <React.Fragment/>
    }

    const renderPreview = (): JSX.Element => {
        if (showPreview && !editMode.edit){
            return <Grid item lg={3}>
                <PostCard cardContext={'Preview'} description={description} title={title} postId={''} photo={photo}/>
            </Grid>;
        }
        return <React.Fragment/>
    }

    const render = (): JSX.Element => {
        if (props.fetchingAPI){
            return <Skeleton/>
        }
        return (
            <React.Fragment>
                {renderPreview()}
                {renderPosts()}
            </React.Fragment>
        )
    }

    return render();
}

export default PostLayout;