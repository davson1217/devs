import React from 'react'
import Card from "@mui/material/Card";
import {ButtonBase, CardContent, CardMedia, Typography} from "@mui/material";

interface CardProps {
    photo: any,
    title: string,
    description: string,
}

const PreviewDisplayCard = (props: CardProps) => {
    const {photo, title, description} = props;
    const readMore = description.length >= 170 ? <ButtonBase> ...Read More</ButtonBase> : "";

    const previewMedia = photo && photo.preview ?
        <CardMedia component="img" height="200" image={photo.preview} alt={"camera"}/> :
        <CardMedia component="img" height="200" image="assets/noimage.jpeg" alt={"camera"}/>;

    return (
        <Card sx={{ maxWidth: 300, opacity:0.7}}>
            {previewMedia}
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">{title}</Typography>
                <Typography variant="body2" color="text.secondary">{description.slice(0,170)}{readMore}</Typography>
            </CardContent>
        </Card>
    )
}

export default PreviewDisplayCard;