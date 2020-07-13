import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import React, {useState} from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import {CustomTheme, EmailEvent} from "../";
const theme = CustomTheme;

const formatTime = function(hours, min) {
    let h = hours>12?hours-12:hours;
    let m = min<10?'0'+min.toString():min.toString();
    let add = hours>12?'PM':'AM';
    return h + ':' + m + add
};

const useStyles = makeStyles ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        maxWidth: 500,
        margin: 25
    },
    cardTitle,
    textMuted: {
        color: "#6c757d"
    },
    button:{
        boxShadow:"none",
        marginTop: 0,
        marginBottom: 10
    },
    addNewButton:{
        // float:'right',
        boxShadow:"none",
        fontSize: 20,
    },
});

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

export default function EventEventModal({open, closeDo, event}) {
    const classes = useStyles();

    return(
        <Modal
            style={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={closeDo}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <EmailEvent event={event} isModal={true}/>
            </Fade>
        </Modal>
    )
}