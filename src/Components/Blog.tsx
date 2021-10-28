import React, {useEffect} from 'react'
import {Grid} from "@mui/material";
import AddPostCard from "./Cards/AddPostCard";
import {useSelector} from "react-redux";
import {RootState} from "../ReduxToolKit/Store/Store";
// import {blogPosts, FetchPosts} from "../ReduxToolKit/Slices/PostSlice";
import {blogPosts} from "../ReduxToolKit/Slices/EB_PostSlice";
import {useDispatch} from "react-redux";
import PostLayout from "./PostLayout";
import ActionFeedback from "./Layout/ActionFeedback";
import { useEasybase } from 'easybase-react';

const Blog = () => {

  //  const {fetchingPosts } = useSelector((state:RootState) => state.Posts );

    const dispatch = useDispatch();
    const { useReturn, db } = useEasybase();
    const { frame } = useReturn(() => db("BLOG").return(), []);

    useEffect(()=>{
      dispatch(blogPosts(frame))
    },[dispatch, frame])

    return (
        <Grid container spacing={0}>
            <Grid container item lg={3}>
                <Grid item lg={3} sx={{
                    position: 'fixed'}}>
                    <AddPostCard/>
                </Grid>
            </Grid>

            <Grid container item lg={9} spacing={1}>
                <PostLayout fetchingAPI={false}/>
            </Grid>

            <ActionFeedback />
        </Grid>
    )
}

export default Blog