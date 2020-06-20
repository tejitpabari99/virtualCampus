import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";
import Button from "../material-kit-components/CustomButtons/Button";
import Modal from "@material-ui/core/Modal";
import React, {useState} from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import {CustomTheme, AddCalendar} from "../";
import CustomInput from "../material-kit-components/CustomInput/CustomInput.js";
import CustomButton from '../buttons/CustomButton';
import Axios from "axios";
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

    const [email, setEmail] = useState(0);
    const [emailNotSubmitted, setEmailNotSubmitted] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    const subject = "Event Link and Website for " + event.event
    const text = event.name + " welcomes you to join " + event.event + "<br/><br/>" + 
        "Start Date: " + months[event.start_date.getMonth()] + " " + event.start_date.getDate() + "<br/>" +
        "End Date: " + months[event.end_date.getMonth()] + " " + event.end_date.getDate() + "<br/>" +
        "Time: " + formatTime(event.start_date.getHours(), event.start_date.getMinutes()) +
        " - " + formatTime(event.end_date.getHours(), event.end_date.getMinutes()) + " " + event.timeZoneGMT + "<br/><br/>" + 
        "Event Link: " + event.invite_link + "<br/>" +
        "Event Website: " + event.event_link + "<br/><br/>" +
        "For more events like this check out Columbia Virtual Campus at http://columbiavirtualcampus.com/"

    const emailData = {
        to: "",
        from: "columbiavirtualcampus@gmail.com",
        subject: subject,
        text: text,
    };

    const handleSubmit = () => {
        emailData["to"] = email
        setSubmitLoading(true)

        Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", emailData)
          .then(res => {
            setEmailNotSubmitted(false)
            console.log(res)
          })
          .catch(error => {
            console.log(error)
          });

    }
    

    const handleCheckEmail = (val) => {
        setEmail(val.target.value)
        let temp = val.target.value
        if ( temp.substr(-3) !== "edu")
        {
            setEmailError(true)
            setButtonDisabled(true)
        }
        else {
            setEmailError(false)
            setButtonDisabled(false)
        }
    }

    let modalContent = null
    if (emailNotSubmitted) {
        modalContent = (
            <div style={{backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
                maxWidth: 500,
                margin: 25}}>
                <h4 style={{color:"#4284C8"}} className={classes.cardTitle}>{event.event}</h4>
                <p style={{color:"#4284C8", marginBottom: 5, marginTop: 15}}>
                    <strong>Submit your .edu email to receive event link and details </strong>
                </p>
                <CustomInput
                    labelText="Email"
                    onChange={(val) => {handleCheckEmail(val)}}
                    error={emailError}/>
                <CustomButton text="Send" style={{marginTop: 20, marginLeft: 10, width: 80, height: 40}} 
                    size={"small"}  onClick={handleSubmit} disabled={buttonDisabled} />
                {emailError && <div style={{color: "red", fontSize: 10, marginTop: -10}}>Must be .edu email</div>}
                {submitLoading && <div style={{fontSize: 10, marginTop: -10}}>Submission processing . . .</div>}
            </div>
        )
    } else {
        modalContent = (
            <div style={{backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3),
                maxWidth: 500,
                margin: 25}}>
                <h4 style={{color:"#4284C8"}} className={classes.cardTitle}>{event.event}</h4>
                <p style={{color:"#4284C8", marginBottom: 5, marginTop: 15}}>
                    <strong>Your email has been submitted!</strong>
                </p>
                <p style={{color:"#4284C8", marginBottom: 5, marginTop: 15, fontSize: 12}}>
                    Check your email for event invitation (this may take a few minutes)
                </p>
            </div>
        )
    }

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
                {modalContent}
            </Fade>
        </Modal>
    )
}