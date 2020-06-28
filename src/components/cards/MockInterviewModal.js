import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form} from "formik";
import * as Yup from "yup";
import FormikField from "../FormikField/FormikField";
import Fade from "@material-ui/core/Fade";
import Button from "../material-kit-components/CustomButtons/Button";
import Modal from "@material-ui/core/Modal";
import React from "react";
import { cardTitle } from "../../assets/material-kit-assets/jss/material-kit-react";
import {CustomTheme} from "../";
import GridItem from "../material-kit-components/Grid/GridItem.js";
import GridContainer from "../material-kit-components/Grid/GridContainer.js";
import Axios from "axios";
import * as firebase from "firebase";

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
    // comments: Yup.string()
  });

  const initVal = {
      name: "", 
      email: "", 
    //   comments: "", 
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


export default function MockInterviewModal({open, closeDo, event}) {
    const classes = useStyles();

    const submitHandler = async values => {
        const name = values.name;
        const email = values.email;
        const db = firebase.firestore();
        console.log(event.start_date_original);
        let lookUpEvent = await db.collection("technical")
            .where("host_email", "==", event.host_email)
            .where("start_date", "==", event.start_date_original)
            .get();
        if (lookUpEvent.size == 0){
            alert("Could not find event!");
            window.location.reload()
            return;
        } else if (!lookUpEvent.docs[0].data().available){
            alert("Event already booked!");
            window.location.reload()
            return;
        }
        lookUpEvent = lookUpEvent.docs[0];
        const lookUpEventData = lookUpEvent.data();
        const URL = 'https://us-central1-columbia-virtual-campus.cloudfunctions.net/bookEvent';
        const emailData = {
            from: "columbiavirtualcampus@gmail.com",
            to: email,
            subject: "Complete your interview signup!",
            text: `Dear ${name},
            
            Confirm your interview with ${lookUpEventData.host_name} at ${lookUpEventData.start_date} by clicking this link:
            ${URL}?eventId=${lookUpEvent.id}&name=${name}&email=${email}`
          };
        Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", emailData)
          .then(res => {
              alert("Check your email for confirmation!");
          });
        closeDo();
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
                                    Signup for a mock interview here!
                                    </div>
                                    <FormikField label="Name" name="name"
                                                    error={errors.name}
                                                    touch={touched.name}
                                                    required></FormikField>
                                    <FormikField label="Email" name="email"
                                                    error={errors.email}
                                                    touch={touched.email}
                                                    required></FormikField>
                                    {/* <FormikField label="Comments for interviewer" name="comments"
                                                    error={errors.comments}
                                                    touch={touched.comments}
                                                    ></FormikField> */}
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
                                    <p>Check your email to confirm appointment.</p>
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