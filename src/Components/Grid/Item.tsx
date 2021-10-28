import React from 'react'
import {Card, CardContent, Typography} from "@mui/material";

type Props = {
    name:string
}

const Item = ({name}: Props) => {
    return(
        <Card>
            <CardContent>
                <Typography sx={{padding:"20px", textAlign: "center", fontSize: "16px"}}>{name.toUpperCase()}</Typography>
            </CardContent>
        </Card>
    )
}

export default Item;