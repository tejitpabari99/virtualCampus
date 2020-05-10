import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";
import Button from "../material-kit-components/CustomButtons/Button";
import Modal from "@material-ui/core/Modal";
import React from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import CustomTheme from "../all/CustomTheme";
const theme = CustomTheme;

const formatTime = function(hours, min) {
    let h = hours>12?hours-12:hours;
    let m = min<10?'0'+min.toString():min.toString();
    let add = hours>12?'PM':'AM';
    return h + ':' + m + add
};

const useStyles = () => ({
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
        marginTop: 10,
        marginBottom: 10
    },
    button3:{
        boxShadow:"none",
        backgroundColor:"#BFD8E950",
        margin:"15px",
        marginLeft:"0px",
        marginTop: 10,
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
                    <h4 style={{color:"#4284C8"}} className={classes.cardTitle}>{event.title}</h4>
                    <Button
                        className={classNames(classes.navLink, classes.button3)}
                        size="sm"
                        round
                        disabled
                    >
                        {months[event.startTime.getMonth()].toUpperCase()} {event.startTime.getDate()}, {event.startTime.getFullYear()}
                    </Button>
                    <Button
                        className={classNames(classes.navLink, classes.button3)}
                        size="sm"
                        round
                        disabled
                    >
                        {formatTime(event.startTime.getHours(),event.startTime.getMinutes())} EST
                    </Button>
                    {event.tags.map((ele, ind) => {
                        return (
                            <Button
                                id={ind}
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
                        {event.website &&
                        <div style={{marginLeft:5}}>
                            <a href={event.website} target={'_blank'} rel="noopener noreferrer"
                               style={{ color: "#4284C8", textDecoration: 'underline' }}>{event.hostedBy}</a>
                        </div>
                        }
                        {!event.website && <div style={{marginLeft:5}}/>}
                    </div>
                    <div style={{ color: "#4284C8", marginBottom: 5, flexDirection: 'row', display:'flex' }}>
                        <div style={{fontSize:15}}><strong>Event Link: </strong></div>
                        {event.eventLink.length>0 &&
                        <div style={{marginLeft:5}}>
                            {event.eventLink.map((link, ind) => {
                                return (
                                    <div>
                                        <a href={link.link} target={'_blank'} rel="noopener noreferrer"
                                            style={{ color: "#4284C8", textDecoration: 'underline' }}>{link.title}</a>
                                        {link.hasOwnProperty('pass') && <span> ({link.pass})</span>}
                                    </div>
                                )
                            })}
                        </div>
                        }
                        {event.eventLink.length===0 && <div style={{marginLeft:5}}>TBA</div>}
                    </div>
                    <p style={{color:"#4284C8"}}>{event.description}</p>
                    <p style={{color:"#4284C8", marginBottom: 5, marginTop: 10}}>
                        <strong>Hosted By: </strong> {event.hostedBy}
                    </p>
                </div>
            </Fade>
        </Modal>
    )
}