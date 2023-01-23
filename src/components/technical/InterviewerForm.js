import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CircularProgress } from '@material-ui/core';

//inputs
import FormikField from "../form-components/FormikField";
import { Select } from "material-ui-formik-components/Select";

//Date and time input
import { TimePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//import { TimePicker } from '@material-ui/pickers';

import Button from "@material-ui/core/Button";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import GridItem from "../material-kit-components/Grid/GridItem";

// import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { CustomHeader, Template } from "..";
import Container from "@material-ui/core/Container";
import TZ from "countries-and-timezones";
import * as Events from "../../pages/socialize";
import Axios, { post } from "axios";
import * as jwt from "jsonwebtoken";



// set an init value first so the input is "controlled" by default
const initVal = {
  host_name: "",
  host_email: "",
  host_bio: "",
  host_interviewExp: "",
  timezone: "",
  day_1: "",
  start_time_1: null,
  end_time_1: null,
  timezone_2: "",
  day_2: "",
  start_time_2: null,
  end_time_2: null,
  timezone_3: "",
  day_3: "",
  start_time_3: null,
  end_time_3: null,
  time_comments: "",
  resume: "",
  week_availability: ""
};

let getCurrentLocationForTimeZone = function () {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

const moment = require("moment");
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
    .max("50", "Please less than 50 characters"),
  host_interviewExp: Yup.string()
    .required("Required"),
  day_1: Yup.string()
    .required("Required"),
  timezone: Yup.string()
    .required("Required"),
  start_time_1: Yup.date()
    .required("Required")
    .nullable(),
  end_time_1: Yup.date()
    .required("Required")
    //.min(Yup.ref('start_time_1'), "End time must be after start time")
    .nullable(),
  resume: Yup.string()
    .url("Please enter a valid URL")
    .required("Required"),
  week_availability: Yup.string()
    .required("Required")
});

const defaultTimezone = "America/New_York";




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
      return true;
    }
    return false;
  }

  // If user selects local time:
  if (TZ.getTimezone(loc).utcOffset === TZ.getTimezone(loc).dstOffset) {
    return false;
  }
  const date = new Date();
  return date.getTimezoneOffset()
  // < Events.stdTimezoneOffset();
}

let getTimezoneName = function (loc = getCurrentLocationForTimeZone(), dstN = null) {
  if (!dstN) { dstN = dst() }
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

const interviewExp = [{ value: "0-5", label: "0-5" }, { value: "6-10", label: "6-10" },
{ value: "11-15", label: "11-15" }, { value: "16-20", label: "16-20" }, { value: "20+", label: "20+" }];

const daysOfWeek = [{ value: 0, label: "Sunday" }, { value: 1, label: "Monday" }, { value: 2, label: "Tuesday" },
{ value: 3, label: "Wednesday" }, { value: 4, label: "Thursday" }, { value: 5, label: "Friday" },
{ value: 6, label: "Saturday" }];

const weekAvailability = [{ value: 1, label: "1" }, { value: 2, label: "2" },
{ value: 3, label: "3" }, { value: 4, label: "4" }, { value: 5, label: "5" },
{ value: 6, label: "6" }, { value: 7, label: "7" }, { value: 8, label: "8" },
{ value: 9, label: "9" }, { value: 10, label: "10" }];


class InterviewerForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitStatus: '',
      activityIndicatory: false,
      end_time_1: null,
      end_time_2: null,
      end_time_3: null,
    };
    this.submitHandler = this.submitHandler.bind(this);

  }


  submitHandler(values) {
    this.setState({ activityIndicatory: true });
    const host_name = values.host_name;
    const host_email = values.host_email;
    const host_bio = values.host_bio;
    const host_interviewExp = values.host_interviewExp;
    const day_1 = values.day_1;
    const start_time_1 = new Date(values.start_time_1);
    start_time_1.setSeconds(0);
    const end_time_1 = new Date(values.end_time_1);
    end_time_1.setSeconds(0);
    const day_2 = values.day_2;
    let start_time_2 = values.start_time_2;
    let end_time_2 = values.end_time_2;
    const day_3 = values.day_3;
    let start_time_3 = values.start_time_3;
    let end_time_3 = values.end_time_3;
    const timezone = values.timezone;
    const time_comments = values.time_comments;
    const resume = values.resume;
    const week_availability = values.week_availability;

    if (end_time_1 <= start_time_1) {
      this.setState({ submitStatus: "timeError", activityIndicatory: false });
      return;
    }
    if (end_time_2 !== null && start_time_2 !== null && new Date(end_time_2) <= new Date(start_time_2)) {
      this.setState({ submitStatus: "timeError", activityIndicatory: false });
      return;
    }
    if (end_time_3 !== null && start_time_3 !== null && new Date(end_time_3) <= new Date(start_time_3)) {
      this.setState({ submitStatus: "timeError", activityIndicatory: false });
      return;
    }

    const range_1 = ` ${daysOfWeek[day_1].label} ${start_time_1.toLocaleTimeString('en-US')} - 
    ${end_time_1.toLocaleTimeString("en-US", { timeZoneName: 'short' })}`;
    let range_2;
    let range_3;
    if (start_time_2 !== null && end_time_2 !== null) {
      start_time_2 = new Date(start_time_2);
      end_time_2 = new Date(end_time_2);
      start_time_2.setSeconds(0);
      end_time_2.setSeconds(0);
      range_2 = `${daysOfWeek[day_2].label} ${start_time_2.toLocaleTimeString('en-US')} - 
      ${end_time_2.toLocaleTimeString("en-US", { timeZoneName: 'short' })}`;
    }
    if (start_time_3 !== null && end_time_3 !== null) {
      start_time_3 = new Date(start_time_3);
      end_time_3 = new Date(end_time_3);
      start_time_3.setSeconds(0);
      end_time_3.setSeconds(0);
      range_3 = `${daysOfWeek[day_3].label} ${start_time_3.toLocaleTimeString('en-US')} - 
      ${end_time_3.toLocaleTimeString("en-US", { timeZoneName: 'short' })}`
    }
    const URL = 'https://us-central1-columbia-virtual-campus.cloudfunctions.net/scheduleEvents';
    const token = jwt.sign({
      expiresIn: "24h",
      data: {
        host_name,
        host_email,
        host_bio,
        host_interviewExp,
        day_1,
        start_time_1,
        end_time_1,
        day_2,
        start_time_2,
        end_time_2,
        day_3,
        start_time_3,
        end_time_3,
        timezone,
        resume,
        time_comments,
        week_availability
      }
    }, process.env.GATSBY_JWT_SECRET_KEY);
    const emailData = {
      from: "columbiavirtualcampus@gmail.com",
      to: host_email,
      subject: "ACTION REQUIRED: Complete your interviewer signup!",
      text: `Dear ${host_name},<br/><br/>
        Thanks for your interest in being a mock interviewer! Complete your submission by confirming your weekly 
        availability from August 3rd to August 24th by clicking the link below (will expire in 24 hours).
        Should we find you a good fit for our program, we will get back to you with a schedule from the times you have given.
        <br/><br/>
        ${range_1}<br/>
        ${range_2 ? `${range_2} <br/>` : ''}
        ${range_3 ? `${range_3} <br/>` : ''}
        maximum interviews per week: ${week_availability}<br/><br/>

        <a href="${URL}?token=${token}">Click this link to confirm</a><br/><br/>
        If this information is not correct, please try submitting again. If you do not wish to complete your submission, no action is required.<br/><br/>
        Thanks,<br/>
        CVC`
    };

    Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", emailData, { timeout: 5000 })
      .then(res => {
        this.setState({ submitStatus: "success", activityIndicatory: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ submitStatus: "error", activityIndicatory: false });
      });
  }

  getHeadMessage() {
    if (this.state.submitStatus == "success") {
      return "Thank you! Complete your signup by checking your email for confirmation.";
    } else if (this.state.submitStatus == "timeError") {
      return "Sorry! There was an issue handling your time availability. ";
    } else {
      return "Oops... Sorry! There was an error handling your request.";
    }
  }

  getBodyMessage() {

    if (this.state.submitStatus == "success") {
      return "Thank you for expressing interest in being an interviewer for our Mock Technical Interview Event at CVC! " +
        " Please check your email to confirm your sign-up! " +
        " If there is anything that needs to be updated, please reach out to us. ";
    } else if (this.state.submitStatus == "timeError") {
      return "Please make sure your end time is after your start time and try again. " +
        " If the problem persists please reach out to us: ";
    }
    else {
      return "We were unable to process your request due to an unexpected error. " +
        "Please try again. If the problem persists please reach out to us!";
    }
  }

  render() {
    if (this.state.activityIndicatory) {
      return (
        //<Template>
        <div style={{ backgroundColor: "white" }}>
          <div style={{ backgroundColor: "white" }}>
            <CustomHeader active={"technical"} brand={"VIRTUAL CAMPUS"} />
            <div style={{ marginTop: '25%', marginLeft: '50%' }}>
              <CircularProgress />
            </div>
          </div>
        </div>
        //</Template>

      );
    }
    else if (this.state.submitStatus !== '') {
      return (
        <Template title={'Sign up to be an Interviewer'} active={"technical"}>
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
            <div style={{ fontSize: "2rem" }}> {this.getHeadMessage()} </div>
            <br />
            <br />
            <div style={{
              color: "black",
              paddingLeft: "20%", paddingRight: "20%"
            }}> {this.getBodyMessage()}</div>
            <br />
            <br />
            <div style={{ color: "black", fontSize: "1rem" }}>
              Questions? Contact us at
              <a style={{ color: "#0072CE", display: "inline-block", paddingLeft: "0.3%" }}
                href={"mailto:columbiavirtualcampus@gmail.com"}> columbiavirtualcampus@gmail.com.</a>
            </div>
            <br />
            <br />
            {this.state.submitStatus === "success" ?
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
                href={"/"}>
                Go Back to CVC Homepage
            </Button> :
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
                onClick={() => window.location.reload()}>
                Try again
            </Button>
            }

          </div>
        </Template>);

    } else {
      return (
        <Template title={'Sign up to be an Interviewer'} active={"technical"}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
              <div style={{ backgroundColor: "white" }}>
                <Container>
                  {/* <div className={classes.container} style={{ paddingTop: '85px' }}> */}
                  <GridContainer spacing={10}>
                    <GridItem xs={12} sm={12} md={4}>
                      <div style={{
                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                        fontSize: "36px", lineHeight: "54px", color: "#0072CE"
                      }}>
                        Sign up to be an Interviewer
                      </div>
                      <div style={{
                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                        fontSize: "14px", lineHeight: "21px"
                      }}>
                        Thank you for your interest in being an interviewer for mock technical
                        coding interviews (August 3rd to August 24th) through CVC.
                        Please fill out the following form so we can provide you with the
                        necessary resources and appropriate platform on our website!
                      </div>
                      <div style={{
                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                        fontSize: "24px", lineHeight: "36px", color: "#0072CE", paddingTop: "45px"
                      }}>
                        You control your commitment
                      </div>
                      <div style={{
                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                        fontSize: "14px", lineHeight: "21px"
                      }}>
                        Tell us how much you want to work and we'll match
                        you with interviewees!
                      </div>
                      <div style={{
                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                        fontSize: "24px", lineHeight: "36px", color: "#0072CE", paddingTop: "45px"
                      }}>
                        A new virtual space for students to connect  and develop
                        technical skills
                      </div>
                      <div style={{
                        fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                        fontSize: "14px", lineHeight: "21px"
                      }}>
                        Issues with this form? Fill this <a href={"https://forms.gle/UtYHJFR9jbhrLVJ99"}>form</a> out instead. Questions? Contact us at <br />
                        <a href='mailto:columbiavirtualcampus@gmail.com'>columbiavirtualcampus@gmail.com</a>.
                      </div>

                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <Formik
                        initialValues={initVal}
                        onSubmit={this.submitHandler}
                        validationSchema={validationSchema}
                      >
                        {({ dirty, isValid, errors, touched, handleChange }) => {
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
                                  <GridItem sm={6} md={6}>
                                    <FormikField label="Full Name"
                                      name="host_name"
                                      error={errors.host_name}
                                      touch={touched.host_name}
                                      required></FormikField>
                                  </GridItem>
                                  <GridItem sm={6} md={6}>
                                    <FormikField label="Columbia/Barnard Email" name="host_email"
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
                                <div style={{
                                  fontFamily: "Poppins",
                                  fontStyle: "normal",
                                  fontWeight: "normal",
                                  fontSize: "15px",
                                  lineHeight: "30px",
                                  color: "black"
                                }}>
                                  * Note: this information will be shared with potential interviewees.
                                </div>
                                <GridContainer>
                                  <GridItem sm={6} md={6}>
                                    <FormikField label="Bio"
                                      name="host_bio"
                                      error={errors.host_bio}
                                      touch={touched.host_bio} required />
                                  </GridItem>
                                  <GridItem sm={6} md={6}>
                                    <Field
                                      name="host_interviewExp"
                                      label="Technical Interviews Completed"
                                      options={interviewExp}
                                      component={Select}
                                      style={{
                                        marginTop: 0
                                      }}
                                      required
                                    />
                                  </GridItem>
                                </GridContainer>
                                <GridContainer>
                                  <GridItem sm={12} md={12}>
                                    <FormikField label="Resume Link or LinkedIn Profile"
                                      name="resume"
                                      error={errors.resume}
                                      touch={touched.resume} required />

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
                                <div style={{
                                  fontFamily: "Poppins",
                                  fontStyle: "normal",
                                  fontWeight: "normal",
                                  fontSize: "15px",
                                  lineHeight: "30px",
                                  color: "black"
                                }}>
                                  * This event will run from
                                  <strong> Monday, August 3rd</strong> to
                                  <strong> Monday, August 24th</strong>.
                                  Please provide your availability on a typical day of the week between those days.
                                  Ensure times are on the hour and ranges are at least one hour long.
                                </div>

                                <GridContainer>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <div style={{
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: "bold",
                                      fontSize: "15px",
                                      lineHeight: "30px",
                                      marginTop: "10px",
                                      paddingTop: "10px",
                                      color: "#F1945B"
                                    }}>
                                      Time Availability 1
                                </div>
                                  </GridItem>
                                  <GridItem xs={12} sm={3} md={3}>
                                    <Field
                                      name="day_1"
                                      label="Day of the Week"
                                      options={daysOfWeek}
                                      component={Select}
                                      required
                                    />
                                  </GridItem>
                                  <GridItem xs={6} sm={3} md={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={TimePicker}
                                        name="start_time_1"
                                        label="Start Time"
                                        error={errors.start_time_1}
                                        required
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem xs={6} sm={3} md={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={TimePicker}
                                        name="end_time_1"
                                        label="End Time"
                                        error={errors.end_time_1}
                                        required
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem xs={12} sm={3} md={3}>
                                    <Field
                                      name="timezone"
                                      label="Select Timezone"
                                      options={optionsTZ}
                                      component={Select}
                                      required
                                    />
                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <div style={{
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: "bold",
                                      fontSize: "15px",
                                      lineHeight: "30px",
                                      marginTop: "10px",
                                      paddingTop: "10px",
                                      color: "#F1945B"
                                    }}>
                                      Time Availability 2
                                    </div>
                                  </GridItem>
                                  <GridItem xs={12} sm={3} md={3}>
                                    <Field
                                      name="day_2"
                                      label="Day of the Week"
                                      options={daysOfWeek}
                                      component={Select}
                                    />
                                  </GridItem>
                                  <GridItem xs={6} sm={3} md={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={TimePicker}
                                        name="start_time_2"
                                        label="Start Time"
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem xs={6} sm={3} md={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={TimePicker}
                                        name="end_time_2"
                                        label="End Time"
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem xs={12} sm={3} md={3}>

                                    <Field
                                      name="timezone"
                                      label="Select Timezone"
                                      options={optionsTZ}
                                      component={Select}
                                    />

                                  </GridItem>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <div style={{
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: "bold",
                                      fontSize: "15px",
                                      lineHeight: "30px",
                                      marginTop: "10px",
                                      paddingTop: "10px",
                                      color: "#F1945B"
                                    }}>
                                      Time Availability 3
                                    </div>
                                  </GridItem>
                                  <GridItem xs={12} sm={3} md={3}>
                                    <Field
                                      name="day_3"
                                      label="Day of the Week"
                                      options={daysOfWeek}
                                      component={Select}
                                    />
                                  </GridItem>
                                  <GridItem xs={6} sm={3} md={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={TimePicker}
                                        name="start_time_3"
                                        label="Start Time"
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem xs={6} sm={3} md={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={TimePicker}
                                        name="end_time_3"
                                        label="End Time"
                                      />
                                    </div>
                                  </GridItem>
                                  <GridItem xs={12} sm={3} md={3}>
                                    <Field
                                      name="timezone"
                                      label="Select Timezone"
                                      options={optionsTZ}
                                      component={Select}
                                    />
                                  </GridItem>
                                </GridContainer>
                                <div style={{ padding: "10px" }}></div>
                                <GridContainer>
                                  <GridItem xs={12} sm={12} md={12}>
                                    <div style={{
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: "bold",
                                      fontSize: "15px",
                                      lineHeight: "30px",
                                      marginTop: "10px",
                                      paddingTop: "10px",
                                      color: "#F1945B"
                                    }}>
                                      Additional Information
                                    </div>
                                  </GridItem>
                                  <GridItem xs={12}>
                                    <div style={{
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: "normal",
                                      fontSize: "15px",
                                      lineHeight: "30px",
                                      color: "black"
                                    }}>
                                      What is the maximum number of interviews (each interview is 1 hour long) you would give per week?
                                    </div>

                                    <Field
                                      name="week_availability"
                                      label="Max interviews per week"
                                      options={weekAvailability}
                                      component={Select}
                                      required
                                      style={{
                                        marginTop: 0
                                      }}
                                    />
                                  </GridItem>
                                  <GridItem xs={12}>
                                    <FormikField label="Comments on Time Availability"
                                      name="time_comments"
                                      multiline rows="1" />
                                  </GridItem>
                                </GridContainer>
                                <br />
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
                  <div style={{ marginBottom: "50px" }} />
                  {/* </div> */}
                </Container>
              </div>
            </div>
          </MuiPickersUtilsProvider>
        </Template>

      );
    }
  }


}



export default InterviewerForm;
