import React from 'react'
import {Grid, Typography, Skeleton} from "@mui/material";

const SkeletonLayout = () => {
    return(
        <Grid item lg={3}>
            <Skeleton variant="rectangular" height={200} />
            <Typography variant={'h3'}>
                <Skeleton variant="text" />
            </Typography>
            <Skeleton variant="rectangular" height={60} />
        </Grid>
    )
}

export default SkeletonLayout;