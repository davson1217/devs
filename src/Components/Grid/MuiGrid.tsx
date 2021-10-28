import React from 'react'
import Item from './Item'
import {ButtonBase, Grid} from "@mui/material";

const MuiGrid = () => {
    return (
        <Grid container spacing={2}>

            <Grid item lg={"auto"}>
                <ButtonBase>
                    <Item name={'Item One '}/>
                </ButtonBase>
            </Grid>

            <Grid item lg={6}>
                <Item name={'Item Two'}/>
            </Grid>

            <Grid item lg>
                <Item name="Item Three with a description"/>
            </Grid>

        </Grid>
    )
}

export default MuiGrid;