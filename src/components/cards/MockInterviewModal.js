import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form} from "formik";
import * as Yup from "yup";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { CircularProgress } from '@material-ui/core';
import Axios from "axios";
import * as firebase from "firebase";
import * as jwt from "jsonwebtoken";

import FormikField from "../form-components/FormikField";
import Button from "../material-kit-components/CustomButtons/Button";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import {CustomTheme} from "../";
import GridItem from "../material-kit-components/Grid/GridItem.js";
import GridContainer from "../material-kit-components/Grid/GridContainer.js";

const theme = CustomTheme;

const formatTime = function(hours, min) {
    let h = hours>12?hours-12:hours;
    let m = min<10?'0'+min.toString():min.toString();
    let add = hours>12?'PM':'AM';
    return h + ':' + m + add
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .trim().matches(/^[a-zA-Z0-9]+@(columbia|barnard)+.edu$/, 'Enter Columbia or Barnard email address')
      .required("Required"),
    comments: Yup.string()
  });

  const initVal = {
      name: "", 
      email: "", 
      comments: "", 
  }

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

export default function MockInterviewModal({open, closeDo, event, setSubmitStatus}) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const submitHandler = async values => {
        setLoading(true);

        const name = values.name;
        const email = values.email;
        const comments = values.comments;
        const db = firebase.firestore();

        let lookUpEvent = await db.collection("technical")
            .where("host_email", "==", event.host_email)
            .where("start_date", "==", event.start_date_original)
            .get();
        if (lookUpEvent.size === 0){
            // if event cannot be found
            setLoading(false);
            setSubmitStatus('notFound');
            closeDo();
            window.scrollTo({ top: 0 });
            setTimeout(() => { window.location.reload(); }, 4500);
            return;
        } else if (!lookUpEvent.docs[0].data().available){
            // if event is not available
            setLoading(false);
            setSubmitStatus('booked');
            closeDo();
            window.scrollTo({ top: 0 });
            setTimeout(() => { window.location.reload(); }, 4500);
            return;
        }
        let lookUpHostEvent = await db.collection("technical")
            .where("host_email", "==", event.host_email)
            .get();
            
        const startOfWeek = new Date(event.start_date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()) // subtract to get earlier sunday
        startOfWeek.setHours(0,0,0,0); // set to midnight
    
        const endOfWeek = new Date(event.start_date);
        endOfWeek.setDate(startOfWeek.getDate() + 6) // add to get next saturday
        endOfWeek.setHours(23, 59, 59, 59)

        let count = 0
        let start;
        let end;
        let tempEvent;
        for(let i = 0; i < lookUpHostEvent.size; i++){
            tempEvent = lookUpHostEvent.docs[i].data();
            start = new Date(tempEvent.start_date);
            end = new Date(tempEvent.end_date);
            if(start > startOfWeek && end < endOfWeek && !tempEvent.available){
                count++;
            }
        }

        if (count >= tempEvent.week_availability){
            // if host is past limit
            setLoading(false);
            setSubmitStatus('max');
            closeDo();
            window.scrollTo({ top: 0 });
            setTimeout(() => { window.location.reload(); }, 4500);
            return;
        }
        lookUpEvent = lookUpEvent.docs[0];
        const localIntervieweeStartTime = `${event.start_date.toLocaleString()} ${event.timeZoneGMT}`;
        const URL = 'https://us-central1-columbia-virtual-campus.cloudfunctions.net/bookEvent';
        const token = jwt.sign({
            expiresIn: "24h",
            data: {
                eventId: lookUpEvent.id,
                name,
                email,
                comments,
                localIntervieweeStartTime
            }
          }, process.env.GATSBY_JWT_SECRET_KEY);
        const emailData = {
            from: "columbiavirtualcampus@gmail.com",
            to: email,
            subject: "ACTION REQUIRED: Complete your interview signup!",
            text: `Dear ${name},<br/><br/>
            Confirm your interview with ${event.host_name} at ${localIntervieweeStartTime}
            by clicking the link below. It will expire in 24 hours.<br/>
            <a href=${URL}?token=${token}>Click this link to confirm<a/><br/><br/>
            If you do not wish to confirm, no action is required.<br/><br/>
            Thanks,<br/>
            CVC`
          };
        Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", emailData)
            .then(res => {
                setLoading(false);
                setSubmitStatus('success');
                closeDo();
                window.scrollTo({ top: 0 });
            })
            .catch(err => {
                console.log(err);
                setSubmitStatus('failure');
                closeDo();
            });
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
                <div style={{backgroundColor: theme.palette.background.paper,
                    border: '2px solid #000',
                    boxShadow: theme.shadows[5],
                    padding: theme.spacing(2, 4, 3),
                    maxWidth: 500,
                    margin: 25}}>
                    <GridContainer style={{marginTop:0, marginBottom:0}}>
                        <GridItem xs={6}>
                            <h4 style={{color:"#4284C8"}} className={classes.cardTitle}>{event.host_name}</h4>
                        </GridItem>
                        <GridItem xs={6}>
                            <h5 style={{color:"black"}} >{formatTime(event.start_date.getHours(),event.start_date.getMinutes())} {event.timeZoneGMT}</h5>
                        </GridItem>
                    </GridContainer>
                    <div style={{ color: "#F1945B", backgroundColor: "#F1945B", height: 3, marginBottom: "0.7em"}}/>
                    <p>{event.host_bio}</p> 
                    <a href={event.resume}><p>{event.resume}</p></a> 
                    <Formik
                        validationSchema={validationSchema}
                        onSubmit={submitHandler}
                        initialValues={initVal}
                    >
                        {({ dirty, isValid, errors, touched }) => {
                          return (
                            <Form>
                                <div style={{ margin: "15px 0" }}>
                                    <div style={{
                                    fontFamily: "Poppins",
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    fontSize: "20px",
                                    lineHeight: "30px",
                                    color: "#0072CE"
                                    }}>
                                    Sign up for this session:
                                    </div>
                                    <FormikField label="Name" name="name"
                                                    error={errors.name}
                                                    touch={touched.name}
                                                    required></FormikField>
                                    <FormikField label="Columbia/Barnard Email" name="email"
                                                    error={errors.email}
                                                    touch={touched.email}
                                                    required></FormikField>
                                    <FormikField label="Comments for interviewer" name="comments"
                                                    error={errors.comments}
                                                    touch={touched.comments}
                                                    ></FormikField>
                                    { loading ? 
                                        <CircularProgress/> :
                                        
                                        <Button
                                        style={{
                                        background: "white",
                                        border: "1px solid #FB750D",
                                        borderRadius: "10px",
                                        boxSizing: "border-box",
                                        color: "#FB750D",
                                        boxShadow: "none",
                                        width: "100%"
                                        }}
                                        type="submit">
                                        Submit
                                        </Button>
                                    }
                                </div>
                            </Form>
                          );
                        }}
                    </Formik>
                </div>
            </Fade>
        </Modal>
    )
}