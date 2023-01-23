import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";
import Button from "../material-kit-components/CustomButtons/Button";
import Modal from "@material-ui/core/Modal";
import React, { useState } from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import {CustomTheme, AddCalendar, EmailEvent} from "../";
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
    button3:{
        boxShadow:"none",
        backgroundColor:"#BFD8E950",
        margin:"15px",
        marginLeft:"0px",
        marginTop: 0,
        marginBottom: 10
    },
    addNewButton:{
        // float:'right',
        boxShadow:"none",
        fontSize: 20,
    },
    learnMoreModal: {
        boxShadow:"none",
        fontSize: 15,
    }
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

export default function EventModal({open, closeDo, event}) {
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
                <div style={{backgroundColor: theme.palette.background.paper,
                    border: '2px solid #000',
                    boxShadow: theme.shadows[5],
                    padding: theme.spacing(2, 4, 3),
                    maxWidth: 500,
                    margin: 25}}>
                    <h4 style={{color:"#4284C8"}} className={classes.cardTitle}>{event.event}</h4>
                    <Button
                        className={classes.button3}
                        size="sm"
                        round
                        disabled
                    >
                        {months[event.start_date.getMonth()].toUpperCase()} {event.start_date.getDate()}, {event.start_date.getFullYear()}
                    </Button>
                    <Button
                        className={classes.button3}
                        size="sm"
                        round
                        disabled
                    >
                        {formatTime(event.start_date.getHours(),event.start_date.getMinutes())} {event.timeZoneGMT}
                    </Button>
                    {event.tags.map((ele, ind) => {
                        return (
                            <Button
                                key={ind}
                                color="vcColor"
                                className={classNames(classes.navLink, classes.button)}
                                size="sm"
                                round
                                disabled
                                active={true}
                            >
                                {ele}
                            </Button>
                        )
                    })}
                    <div style={{ color: "#4284C8", marginBottom: 5,flexDirection: 'row', display:'flex' }}>
                        <div style={{fontSize:15}}><strong>Website: </strong></div>
                        {event.event_link &&
                        <div style={{marginLeft:5}}>
                            <a href={event.event_link} target={'_blank'} rel="noopener noreferrer"
                               style={{ color: "#4284C8", textDecoration: 'underline' }}>{event.event}</a>
                        </div>
                        }
                        {!event.event_link && <div style={{marginLeft:5}}/>}
                    </div>
                    {/* <div style={{ color: "#4284C8", marginBottom: 5, flexDirection: 'row', display:'flex' }}>
                        <div style={{fontSize:15}}><strong>Event Link: </strong></div>
                        {event.invite_link &&
                        <div style={{marginLeft:5}}>
                            <a href={event.invite_link} target={'_blank'} rel="noopener noreferrer"
                               style={{ color: "#4284C8", textDecoration: 'underline' }}>Attend</a>
                        </div> 
                        }
                        {!event.invite_link && <div style={{marginLeft:5}}>TBA</div>}
                    </div> */}
                    <p style={{color:"#4284C8"}}>{event.desc}</p>
                    <p style={{color:"#4284C8", marginBottom: 5, marginTop: 10}}>
                        <strong>Hosted By: </strong> {event.name}
                    </p>

                    {/* <p style={{color:"#4284C8", marginBottom: 5, marginTop: 20}}>
                        <strong>Submit your .edu email to receive event link and details: </strong>
                    </p>
                    <CustomInput labelText="Email"/>
                    <CustomButton text="Send" style={{marginTop: 20, marginLeft: 10, width: 80, height: 40}} size={"small"}/> */}
                    <EmailEvent event={event} isModal={false} />

                    <div style={{color:"#4284C8", marginBottom: 5, marginTop: 10}}>
                        <strong><AddCalendar info={event} /> </strong>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}