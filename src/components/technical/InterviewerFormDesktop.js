import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CircularProgress } from '@material-ui/core';

//inputs
import FormikField from "../FormikField/FormikField";
import "../FormikField/FormikField.css";
import { CheckboxWithLabel, SimpleFileUpload } from "formik-material-ui";
import { Select } from "material-ui-formik-components/Select";

//Date and time input
import { DateTimePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


import Button from "@material-ui/core/Button";

import GridContainer from "../material-kit-components/Grid/GridContainer";
import GridItem from "../material-kit-components/Grid/GridItem";


import classNames from "classnames";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { MetaData, CustomHeader, CustomButton, Title, Subtitle, Template } from "../";
import Container from "@material-ui/core/Container";
import * as firebase from "firebase";
import Axios from "axios";
import TZ from "countries-and-timezones";
import * as Events from "../../pages/events";

// set an init value first so the input is "controlled" by default
const initVal = {
  host_name: "",
  host_email: "",
  host_bio: "",
  host_workExp: "",
  host_interviewExp: "",
  timezone_1: "",
  start_time_1: "",
  end_time_1: "",
  timezone_2: "",
  start_time_2: "",
  end_time_2: "",
  timezone_3: "",
  start_time_3: "",
  end_time_3: ""
};

let getCurrentLocationForTimeZone = function() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// here you can add make custom requirements for specific input fields
// you can add multiple rules as seen with the "name" scheme
// you can also add custom feedback messages in the parameters of each error function
const validationSchema = Yup.object().shape({
  host_name: Yup.string()
    .min(5, "Too Short")
    .required("Required"),
  host_email: Yup.string()
    .email("Please enter a valid email address")
    .trim().matches(/^[a-zA-Z0-9]+@(columbia|barnard)+.edu$/, 'Enter Columbia or Barnard email address')
    .required("Required"),
  host_bio: Yup.string()
    .required("Required")
    .max("50", "Please less than 250 characters"),
  host_workExp: Yup.string()
    .required("Required")
    .max("100", "Please less than 250 characters"),
  host_interviewExp: Yup.string()
    .required("Required")
    .max("100", "Please less than 250 characters"),
  timezone_1: Yup.string()
    .required("Required"),
  start_time_1: Yup.string()
    .required("Required"),
  end_time_1: Yup.string()
    .required("Required")
});

const TITLE = "ADD EVENT";
const defaultTimezone = "America/New_York";


function processTime(start_time, end_time){
    const range_1 = Math.floor(((end_time - start_time) / (1000 * 60 * 60)) % 24);
    var slots = []
    var stime_1 = start_time
    var etime_1 = end_time
    slots.push(stime_1.toString());
    if(start_time !== "" && end_time !== ""){
        for(var i = 0; i < range_1; i++){
            var time_1 = stime_1;
            var start = new Date(time_1);
            start.setHours(start.getHours()+1);
            slots.push(start.toString());
            stime_1 = start;
        }

        return slots;
    }
    else{
        return "";
    }
    

    //return slots;
}


let dst = function (loc = getCurrentLocationForTimeZone()) {

  // If user selects EST time:
  if (loc === "America/New_York") {
    const today = new Date();
    var DSTDateStart;
    var DSTDateEnd;
    switch (today.getFullYear()) {
      case 2020:
        DSTDateStart = new Date(Date.UTC(2020, 2, 8, 7));
        DSTDateEnd = new Date(Date.UTC(2020, 10, 1, 6));
        break;
      case 2021:
        DSTDateStart = new Date(Date.UTC(2021, 2, 14, 7));
        DSTDateEnd = new Date(Date.UTC(2021, 10, 7, 6));
        break;
      case 2022:
        DSTDateStart = new Date(Date.UTC(2022, 2, 13, 7));
        DSTDateEnd = new Date(Date.UTC(2022, 10, 6, 6));
        break;
    }
    if (today.getTime() >= DSTDateStart.getTime() && today.getTime() < DSTDateEnd.getTime()) {
      console.log("true");
      return true;
    }
    console.log("false");
    return false;
  }

  // If user selects local time:
  if (TZ.getTimezone(loc).utcOffset === TZ.getTimezone(loc).dstOffset) {
    return false;
  }
  const date = new Date();
  return date.getTimezoneOffset() < Events.stdTimezoneOffset();
}

let getTimezoneName = function(loc = getCurrentLocationForTimeZone(), dstN = null) {
  if(!dstN) {dstN=dst()}
  const gmt = TZ.getTimezone(loc).utcOffsetStr;
  var str = "GMT" + gmt;

  if (gmt === "-01:00")
    return "CAT";
  if (gmt === "-02:00")
    return "BET";
  if (gmt === "-03:00")
    return "AGT";
  if (gmt === "-03:30")
    return "CNT";
  if (gmt === "-04:00")
    return "PRT";
  if (gmt === "-05:00")
    return dst ? "EDT" : "EST";
  if (gmt === "-06:00")
    return dst ? "CDT" : "CST";
  if (gmt === "-07:00")
    return dst ? "MDT" : "MST";
  if (gmt === "-08:00")
    return dst ? "PDT" : "PST";
  if (gmt === "-09:00")
    return dst ? "ADT" : "AST";
  if (gmt === "-10:00")
    return dst ? "HDT" : "HST";
  if (gmt === "-11:00")
    return "MIT";
  if (gmt === "+12:00")
    return dst ? "NDT" : "NST";
  if (gmt === "+11:00")
    return dst ? "SDT" : "SST";
  if (gmt === "+10:00")
    return "AET";
  if (gmt === "+09:30")
    return dst ? "ACDT" : "ACST";
  if (gmt === "+09:00")
    return dst ? "JDT" : "JST";
  if (gmt === "+08:00")
    return "CTT";
  if (gmt === "+07:00")
    return dst ? "VDT" : "VST";
  if (gmt === "+06:00")
    return dst ? "BDT" : "BST";
  if (gmt === "+05:30")
    return dst ? "IDT" : "IST";
  if (gmt === "+05:00")
    return "PLT";
  if (gmt === "+04:00")
    return "NET";
  if (gmt === "+03:30")
    return "MET";
  if (gmt === "+03:00")
    return "EAT";
  if (gmt === "+02:00")
    return "EET";
  if (gmt === "+01:00")
    return "ECT";

  if (dstN)
    return str + " DST";
  return str;
}

function getTimezoneOptions() {
  if (getCurrentLocationForTimeZone() != defaultTimezone) {
    return [
      {
        value: getCurrentLocationForTimeZone()
          + "$" + dst(),
        label: "Mine: "
          + getTimezoneName()
      },
      {
        value: defaultTimezone
          + "$" + dst(defaultTimezone),
        label: "Default: "
          + getTimezoneName(defaultTimezone
            , dst(defaultTimezone))
      }
    ];
  } else {
    return [
      {
        value: defaultTimezone
          + "$" + dst(defaultTimezone),
        label: "Mine: "
          + getTimezoneName(defaultTimezone
            , dst(defaultTimezone))
      }
    ];
  }
}


const optionsTZ = getTimezoneOptions();

class InterviewerFormDesktop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      feedbackSubmit: false,
      errStatus: 0,
      activityIndicatory: false,
    };

    this.submitHandler = this.submitHandler.bind(this);
    //this.uploadData = this.uploadData.bind(this);
  }

  submitHandler(values) {
    const timechosen = values.start_time_1;
    //processTime(values["start_time_1"], values["end_time_1"]);
    this.uploadInterview(values);
  }

  uploadInterview(data){

    // const start = new Date(start_time);
    // start.setHours(start.getHours()+1);
    // const diff = end_time - start_time
    // //console.log(end_time - start_time);
    // console.log(start_time)
    // const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    // console.log(hours);

    //   const range_1 = Math.floor(((data["end_time_1"] - data["start_time_1"]) / (1000 * 60 * 60)) % 24);
    //   var slots_1 = []
    //   var stime_1 = data["start_time_1"]
    //   var etime_1 = data["end_time_1"]
    //   slots_1.push(stime_1.toString());
    //   for(var i = 0; i < range_1; i++){
    //     var time_1 = stime_1;
    //     var start = new Date(time_1);
    //     start.setHours(start.getHours()+1);
    //     slots_1.push(start.toString());
    //     stime_1 = start;
    //   }
      //console.log(slots_1)

    var slots = [];
    const db = firebase.firestore();
    slots.push(processTime(data["start_time_1"], data["end_time_1"]));
    slots.push(processTime(data["start_time_2"], data["end_time_2"]));
    slots.push(processTime(data["start_time_3"], data["end_time_3"]));

    console.log(data["end_time_1"]);
    console.log(data["end_time_2"]);
    console.log(data["end_time_3"]);


    // console.log(slot_1);
    // console.log(slot_2);
    // console.log(slot_3);

    console.log(slots);
    var times = []
    for(var k = 0; k < slots.length; k++){
        if(slots[k] !== ""){
            times = slots[k];
            console.log(slots[k]);
            console.log("Unempty Array");
            for(var j = 0; j < times.length - 1 && j + 1 < times.length ; j++){
                const interviewSlot = db.collection("technical").add({
                    host_name: data["host_name"],
                    host_email: data["host_email"],
                    attendee_email: "",
                    attendee_name: "",
                    available: true,
                    host_bio: data["host_bio"],
                    host_interviewExp: data["host_interviewExp"],
                    host_workExp: data["host_workExp"],
                    interview_comments: "",
                    timezone: "America/Los_Angeles$true",
                    start_date: slots[k][j],
                    end_date: slots[k][j+1]
                  });
                console.log(slots[k][j]);
                console.log(slots[k][j + 1]);
            }
        }
    }

    // const interviewSlot = db.collection("technical").add({
    //     host_name: data["host_name"],
    //     host_email: data["host_email"],
    //     attendee_email: "",
    //     attendee_name: "",
    //     available: true,
    //     host_bio: data["host_bio"],
    //     host_interviewExp: data["host_interviewExp"],
    //     host_workExp: data["host_workExp"],
    //     interview_comments: "",
    //     timezone: "America/Los_Angeles$true",
    //     start_date: slot_1[0],
    //     end_date: slot_1[1]
    //   });
    // var slots_1 = processTime(data["start_time_1"], data["end_time_1"]);
    // var slots_2 = processTime(data["start_time_2"], data["end_time_2"]);
    // var slots_3 = processTime(data["start_time_3"], data["end_time_3"]);

    
        
          

    // function writeUserData(userId, name, email, imageUrl) {
    //     firebase.database().ref('users/' + userId).set({
    //       username: name,
    //       email: email,
    //       profile_picture : imageUrl
    //     });
    // }

    // console.log(slots_1);
    // console.log(slots_2);
    // console.log(slots_3);
  }


  // upload to firebase here
  

  render() {
    if (this.state.activityIndicatory){
      return (
        <div style={{ backgroundColor: "white" }}>
          <div style={{ backgroundColor: "white" }}>
            <CustomHeader active={"schedule"} brand={"VIRTUAL CAMPUS"}/>
            <div style={{marginTop: '25%', marginLeft:'50%'}}>
              <CircularProgress />
            </div>
          </div>
        </div>
      )
    }
    else if (this.state.feedbackSubmit) {
      return (
        <Template title={'Add New Event'} active={"schedule"}>
          <div style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "1.5rem",
            lineHeight: "30px",
            color: "#0072CE",
            margin: "10px",
            textAlign: "center",
            paddingTop: "16%"
          }}>
            <div style={{ fontSize: "2.5rem" }}> {this.getHeadMessage()} </div>
            <br/>
            <br/>
            <div style={{
              color: "black",
              paddingLeft: "20%", paddingRight: "20%"
            }}> {this.getBodyMessage()}</div>
            <br/>
            <br/>
            <div style={{ color: "black", fontSize: "1rem" }}>
              Questions? Contact us at
              <a style={{ color: "#0072CE", display: "inline-block", paddingLeft: "0.3%" }}
                 href={"mailto:columbiavirtualcampus@gmail.com"}> columbiavirtualcampus@gmail.com.</a>
            </div>
            <br/>
            <br/>
            <Button
              style={{
                background: "white",
                border: "1px solid #FB750D",
                borderRadius: "10px",
                boxSizing: "border-box",
                color: "#FB750D",
                boxShadow: "none",
                paddingLeft: "10px",
                paddingRight: "10px"
              }}
              href={"/events/add-new-event"}>
              Add Another Event
            </Button>
          </div>
        </Template>);

    } else {
      return (
        <Template title={'Sign-up to be an Interviewer'} active={"schedule"}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Template active={'schedule'}> */}
            <div>
              <div style={{ backgroundColor: "white" }}>
                <Container>
                  {/* <div className={classes.container} style={{ paddingTop: '85px' }}> */}
                  <GridContainer spacing={10}>
                    <GridItem xs={4}>
                      <div style={{
                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                        fontSize: "36px", lineHeight: "54px", color: "#0072CE"
                      }}>
                        Host a New Event
                      </div>
                      <div style={{
                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                        fontSize: "14px", lineHeight: "21px"
                      }}>
                        Thank you for your interest in leading a virtual event or activity
                        through
                        CVC.
                        Please fill out the following form so we can provide you with the
                        necessary
                        resources and appropriate platform on our website!
                      </div>
                      <div style={{
                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                        fontSize: "14px", lineHeight: "21px", paddingTop: "66px"
                      }}>
                        Questions? Contact us at <br/>
                        <a href='mailto:columbiavirtualcampus@gmail.com'>columbiavirtualcampus@gmail.com</a>.
                      </div>
                    </GridItem>
                    <GridItem xs={8}>
                      <Formik
                        initialValues={initVal}
                        onSubmit={this.submitHandler}
                        validationSchema={validationSchema}
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
                                  Contact
                                </div>
                                <GridContainer>
                                  <GridItem sm={6}>
                                    <FormikField label="Full Name"
                                                 name="host_name"
                                                 error={errors.host_name}
                                                 touch={touched.host_name}
                                                 required></FormikField>
                                  </GridItem>
                                  <GridItem sm={6}>
                                    <FormikField label="Email" name="host_email"
                                                 error={errors.host_email}
                                                 touch={touched.host_email}
                                                 required></FormikField>
                                  </GridItem>
                                </GridContainer>
                              </div>


                              <div style={{ margin: "15px 0" }}>
                                <div style={{
                                  fontFamily: "Poppins",
                                  fontStyle: "normal",
                                  fontWeight: "normal",
                                  fontSize: "20px",
                                  lineHeight: "30px",
                                  color: "#0072CE"
                                }}>
                                  Technical Experience
                                </div>
                                <GridContainer>
                                  <GridItem sm={6}>
                                    <FormikField label="Previous Work Experience" name="host_workExp"
                                                 error={errors.host_workExp}
                                                 touch={touched.host_workExp}
                                                 required></FormikField>
                                  </GridItem>
                                  <GridItem sm={6}>
                                    <FormikField label="Previous Interview Experience"
                                                 name="host_interviewExp"
                                                 error={errors.host_interviewExp}
                                                 touch={touched.host_interviewExp}></FormikField>
                                  </GridItem>
                                </GridContainer>

                                <GridContainer>
                                  <GridItem>
                                    <FormikField label="Bio"
                                                 name="host_bio"
                                                 multiline rows="3"
                                                 error={errors.host_bio}
                                                 touch={touched.host_bio} required/>
                                  </GridItem>
                                </GridContainer>
                            </div>
                                <div style={{ margin: "15px 0" }}>
                                <div style={{
                                  fontFamily: "Poppins",
                                  fontStyle: "normal",
                                  fontWeight: "normal",
                                  fontSize: "20px",
                                  lineHeight: "30px",
                                  color: "#0072CE"
                                }}>
                                  Time Availability
                                </div>
                                <GridContainer>
                                  <GridItem sm={4}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={DateTimePicker}
                                        name="start_time_1"
                                        label="Start Time"
                                        required
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem sm={4}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={DateTimePicker}
                                        name="end_time_1"
                                        label="End Time"
                                        required
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem sm={4}>

                                    <Field
                                      name="timezone_1"
                                      label="Select Timezone"
                                      options={optionsTZ}
                                      component={Select}
                                      required
                                    />

                                  </GridItem>
                                  <GridItem sm={4}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={DateTimePicker}
                                        name="start_time_2"
                                        label="Start Time"
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem sm={4}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={DateTimePicker}
                                        name="end_time_2"
                                        label="End Time"
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem sm={4}>

                                    <Field
                                      name="timezone_2"
                                      label="Select Timezone"
                                      options={optionsTZ}
                                      component={Select}
                                    />

                                  </GridItem>
                                  <GridItem sm={4}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={DateTimePicker}
                                        name="start_time_3"
                                        label="Start Time"
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem sm={4}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={DateTimePicker}
                                        name="end_time_3"
                                        label="End Time"
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem sm={4}>

                                    <Field
                                      name="timezone_3"
                                      label="Select Timezone"
                                      options={optionsTZ}
                                      component={Select}
                                    />

                                  </GridItem>
                                </GridContainer>
                                <br/>
                            </div>

                              <GridContainer>
                                <GridItem sm={3}>
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
                                </GridItem>
                              </GridContainer>
                            </Form>
                          );
                        }}
                      </Formik>
                    </GridItem>
                  </GridContainer>
                  <div style={{ marginBottom: "50px" }}/>
                  {/* </div> */}
                </Container>
              </div>


            </div>

            {/* </Template > */}
          </MuiPickersUtilsProvider>
        </Template>

      );
    }
  }


}

export default InterviewerFormDesktop;
