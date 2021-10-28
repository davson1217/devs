import React from 'react';
import {IconButton, Snackbar} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../ReduxToolKit/Store/Store";
import {closeFeedback} from "../../ReduxToolKit/Slices/FeedbackSlice";

const ActionFeedback = () => {

    const feedback = useSelector((state:RootState) => state.Feedback );
    const dispatch = useDispatch();

    const handleSnackClose = () => {
        dispatch(closeFeedback())
    }

    const snackAction = (
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
    )

    return (
        <Snackbar
            open={feedback.show}
            autoHideDuration={3000}
            message={feedback.message}
            onClose={handleSnackClose}
            action={snackAction}
        />
    )
}

export default ActionFeedback;