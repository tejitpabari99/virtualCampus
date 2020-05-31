import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as Events from "./events";

//inputs
import FormikField from "../components/FormikField/FormikField";

import "../components/FormikField/FormikField.css";
import { Select } from "material-ui-formik-components/Select";

//Date and time input
import { DateTimePicker } from "formik-material-ui-pickers";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";


import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { CustomHeader, CustomButton, Title, Subtitle } from "../components";
import Container from "@material-ui/core/Container";
import * as firebase from "firebase";
import Axios from "axios";
import FileUploadBtn from "../components/FormikField/FileUploadBtn";
import ButtonBase from "@material-ui/core/ButtonBase";
import { CheckboxWithLabel } from "formik-material-ui";

const classesSt = () => ({
  ...styles,
  toAll: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal"
    // marginBottom: '12px'
  },
  title: {
    fontSize: "36px",
    lineHeight: "54px",
    color: "#0072CE"
  },
  subtitle: {
    fontSize: "20px",
    lineHeight: "30px",
    color: "#0072CE"
  },
  detail: {
    fontSize: "14px",
    lineHeight: "21px"
  },
  section: {
    margin: "15px 0"
  },
  uploadBtn: {
    background: "white",
    border: "1px solid #0072CE",
    borderRadius: "10px",
    color: "#0072CE",
    boxShadow: "none",
    width: "100%",
    height: "40px",
    fontsize: "14px"
  },
  formField: {
    fontSize: "14px",
    lineHeight: "21px"
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "5px",
    // background: "white",
    // border: "1px solid #0072CE",
    // borderRadius: "10px",
    // color: "#0072CE",
    // boxShadow: "none",
    width: "92px",
    height: "40px",
    // fontsize: "12px",
    textTransform: "capitalize"
  },
  submitBtn: {
    background: "white",
    border: "1px solid #FB750D",
    borderRadius: "10px",
    boxSizing: "border-box",
    color: "#FB750D",
    boxShadow: "none",
    width: "100%"
  },
  customBtn: {
    background: 'white',
    border: '1px solid #0072CE',
    borderRadius: '10px',
    color: '#0072CE',
    boxShadow: 'none',
    width: "100%",
    height: '44px',
  },

});

// set an init value first so the input is "controlled" by default
const initVal = {
  name: "",
  email: "",
  event: "",
  desc: "",
  other_tags: "",
  image_file: "",
  image_link: "",
  start_date: "",
  end_date: "",
  timezone: "",
  recurring: "",
  event_link: "",
  invite_link: "",
  comments: "",
  tag: "",
  games_tag: "",
  activism_tag: "",
  covid_tag: "",
  social_tag: "",
  fitness_tag: "",
  education_tag: "",
  agree: ""

};


// here you can add make custom requirements for specific input fields
// you can add multiple rules as seen with the "name" scheme
// you can also add custom feedback messages in the parameters of each error function
const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .min(5, 'Too Short')
    .required('Required'),
  email: Yup
    .string()
    .email('Please enter a valid email address')
    .required('Required'),
  event_link: Yup
    .string()
    .url('Please enter a valid URL')
    .required('Required'),
  event: Yup
    .string()
    .required('Required'),
  desc: Yup
    .string()
    .required('Required')
    .max('250', "Please less than 250 characters"),
  agree: Yup
    .boolean()
    .oneOf([true], 'Must Agree to Columbia Event Policy')
  // .required()
})

const TITLE = "ADD EVENT";
const defaultTimezone = "America/New_York";


function formatEmailText(jsonText) {
  var newText = "";
  Object.keys(jsonText).map((key, index) => (
    newText = newText + "\n<br>" + getText(key, jsonText[key])
  ));
  return newText;
}

function getText(key, val) {
  key = key.replace("_", " ");
  if (val !== undefined && val !== "")
    return key + ": " + val;
  return key + ": not provided";
}

function processATag(values, key, defKey) {

  if (key.endsWith("_tag") && key !== defKey && values[key] !== "") {
    if (values[key] == true) {
      values[defKey] = values[defKey] + key.replace("_tag", "") + ";";
    }
  }

  return values[defKey];
}

function cleanTag(values, key) {
  if (key.endsWith("_tag")) {
    delete values[key];
  }
  return values;
}

function processTags(values) {

  const defKey = "other_tags";

  if (values[defKey].endsWith(";") === false && values[defKey] !== "") {
    values[defKey] = values[defKey] + ";";
  }

  Object.keys(values).map((key, index) => (
    values[defKey] = processATag(values, key, defKey),
      values = cleanTag(values, key)
  ));
  values[defKey] = values[defKey].replace("; ;", ";");
  values[defKey] = values[defKey].replace(";;", ";");
  if (values[defKey].endsWith(";")) {
    values[defKey] = values[defKey].substring(0, values[defKey].length - 1);
  }
  values["tags"] = values[defKey].split(";");
  delete values["tag"];
  delete values[defKey];
  return values;
}


function sendZoomEmail(id, name, from) {

  const emailData = {
    from: from,
    subject: "ZOOMLINK: " + name + ". ID: " + id,
    text: "Event " + name + " needs a zoom link!"
  };

  Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", emailData)
    .then(res => {
      console.log("Success");
    })
    .catch(error => {
      console.log("error");
    });
}

function getTimezoneOptions() {
  if (Events.getCurrentLocationForTimeZone() != defaultTimezone) {
    return [
      {
        value: Events.getCurrentLocationForTimeZone()
          + "$" + Events.dst(),
        label: "Mine: "
          + Events.getTimezoneName()
      },
      {
        value: defaultTimezone
          + "$" + Events.dst(defaultTimezone),
        label: "Default: "
          + Events.getTimezoneName(defaultTimezone
            , Events.dst(defaultTimezone))
      }
    ];
  } else {
    return [
      {
        value: defaultTimezone
          + "$" + Events.dst(defaultTimezone),
        label: "Mine: "
          + Events.getTimezoneName(defaultTimezone
            , Events.dst(defaultTimezone))
      }
    ];
  }
}

const optionsTZ = getTimezoneOptions();

class AddEvent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      feedbackSubmit: false,
      errStatus: 0,
      imgUploadField:'',
      eduTagActive:false,
      zoomField:''
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.uploadData = this.uploadData.bind(this);
  }

  submitHandler(values) {
    if (values["file"] !== "" && values["file"] !== undefined) {
      this.uploadImage(values);
    } else {
      const b = this.uploadData(values);
      this.setState({ feedbackSubmit: true });
    }
  }


  // upload to firebase here
  uploadData(data) {

    data["approved"] = false;
    const from = data["email"];
    const subject = "NEW EVENT: " + data["event"];
    const clientSubject = "Your CVC Event Details: " + data["event"];
    data = processTags(data);
    const text = formatEmailText(data);
    const approvalUrl = "https://us-central1-columbia-virtual-campus.cloudfunctions.net/approveEvent?eventId=";
    const clientEmailData = {
      to: from,
      from: "columbiavirtualcampus@gmail.com",
      subject: clientSubject,
      text: text
    };

    const emailData = {
      from: from,
      subject: subject,
      text: text
    };


    const db = firebase.firestore();
    const newEventRef = db.collection("events").doc();
    clientEmailData["text"] = "Your New Event Request!\n<br>Here's what we are currently processing:\n <br>" +
      emailData["text"] + "\n<br>NOTE: The correct timezone is in the \'timezone\': field!\n<br><br>"
      + "Please contact us if any of the above needs corrected or if you have any questions!"
      + "\n<br>\n<br>Best,\n<br>The CVC Team";
    emailData["text"] = "New Event Request!\n <br>" +
      emailData["text"].concat("\n<br> NOTE: The correct timezone is in the 'timezone': field!"
        + "<br><br>Click here to approve this event: ",
        approvalUrl.concat(newEventRef.id));
    emailData["subject"] += ". ID: " + newEventRef.id;
    newEventRef.set(data)
      .then(ref => {
        console.log("Document written", ref);

        Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", emailData)
          .then(res => {
            console.log("Success");
          })
          .catch(error => {
            this.setState({ errStatus: 1 });
            console.log("Updated error");
          });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        alert("Failed to properly request your event. Please try adding the event again. If the problem persists please contact us!");
      });
    Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", clientEmailData)
      .then(res => {
        console.log("Success");
      })
      .catch(error => {
        this.setState({ errStatus: 3 });
        console.log("Updated error");
      });

    if (data["invite_link"] === "") {
      sendZoomEmail(newEventRef.id, data["event"], from);
    }

    return emailData["text"];
  }

  uploadImage(values) {

    const r = new XMLHttpRequest();
    const d = new FormData();
    // const e = document.getElementsByClassName('input-image')[0].files[0]
    // var u
    const clientID = "df36f9db0218771";

    d.append("image", values["file"]);

    // Boilerplate for POST request to Imgur
    r.open("POST", "https://api.imgur.com/3/image/");
    r.setRequestHeader("Authorization", `Client-ID ${clientID}`);
    r.onreadystatechange = function() {
      if (r.status === 200 && r.readyState === 4) {
        let res = JSON.parse(r.responseText);
        // this is the link to the uploaded image
        let imgur = `https://i.imgur.com/${res.data.id}.png`;

        values["file"] = imgur;
        this.uploadData(values);

      }
    };
    // send POST request to Imgur API
    r.send(d);

    return true;
  }

  getHeadMessage() {

    if (this.state.errStatus === 4) {
      return "Oops... Sorry! There was an error handling your request.";
    } else if (this.state.errStatus === 3 || this.state.errStatus === 1) {
      return "Thank You! Further Action Required!";
    } else if (this.state.errStatus === 2) {
      return "Oops... Sorry! There was an error handling your request.";
    } else {
      return "Thank You!";
    }
  }

  getBodyMessage() {

    if (this.state.errStatus === 4) {
      return "We were unable to process your request due to an unexpected error. " +
        "Please try again. If the problem persists please reach out to us:";
    } else if (this.state.errStatus === 3 || this.state.errStatus === 1) {
      return "Please contact us about approving your event! We were unable to automatically email our team."
        + " Please reach out to us at:";
    } else if (this.state.errStatus === 2) {
      return "We were unable to process your request. Please try again. " +
        "If the problem persists please reach out to us:";
    } else {
      return "We look forward to hosting your event on CVC! " +
        "If there is anything that needs to be updated, please reach out to us.";
    }
  }


  render() {
    const { classes } = this.props;

    if (this.state.feedbackSubmit) {
      return (
        <div style={{ backgroundColor: "white" }}>
          <CustomHeader active={"schedule"} brand={"VIRTUAL CAMPUS"}/>
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
              href={"/form"}>
              Add Another Event
            </Button>
          </div>
        </div>);

    } else {
      return (
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Template active={'schedule'}> */}
            <div>
              <CustomHeader active={"schedule"} brand={"VIRTUAL CAMPUS"}/>
              <div className={classNames(classes.mainOther, classes.main)}>
                <Container maxWidth='lg' style={{ paddingTop: "85px" }}>
                  {/* <div className={classes.container} style={{ paddingTop: '85px' }}> */}
                  <Grid container spacing={10}>
                    <Grid item xs={4}>
                      <div className={classNames(classes.toAll, classes.title)}>Host a New Event</div>
                      <div className={classNames(classes.toAll, classes.detail)}>
                        Thank you for your interest in leading a virtual event or activity through CVC.
                        Please fill out the following form so we can provide you with the necessary
                        resources and appropriate platform on our website!
                      </div>
                      <div className={classNames(classes.toAll, classes.detail)} style={{ paddingTop: "66px" }}>
                        Questions? Contact us at <br/>
                        <a href='mailto:columbiavirtualcampus@gmail.com'
                           style={{ color: "#0072CE" }}>columbiavirtualcampus@gmail.com</a>.
                      </div>
                    </Grid>
                    <Grid item xs={8}>
                      <Formik
                        initialValues={initVal}
                        onSubmit={this.submitHandler}
                        validationSchema={validationSchema}
                      >
                        {({ dirty, isValid, errors, touched }) => {
                          return (
                            <Form>
                              {/* CONTACT SECTION */}
                              <div className={classes.section}>
                                <div className={classNames(classes.toAll, classes.subtitle)}>Contact</div>
                                <Grid container spacing={2}>
                                  <Grid item sm={6}>
                                    <FormikField label="Name / Organization" name="name" error={errors.name}
                                                 touch={touched.name} required/>
                                  </Grid>
                                  <Grid item sm={6}>
                                    <FormikField label="Email" name="email" error={errors.email} touch={touched.email}
                                                 required/>
                                  </Grid>
                                </Grid>
                              </div>


                              {/* EVENT DETAILS SECTION */}
                              <div className={classes.section}>
                                <div className={classNames(classes.toAll, classes.subtitle)}>Event</div>
                                <Grid container spacing={2}>
                                  <Grid item sm={6}>
                                    <FormikField label="Event Name" name="event" error={errors.event}
                                                 touch={touched.event} required/>
                                  </Grid>
                                  <Grid item sm={4}>
                                    <FormikField label="Logo / Image Link" name="image_link" error={errors.image_link}
                                                 touch={touched.image_link} value={this.state.imgUploadField} onChange={(event) => {this.setState({imgUploadField:event.target.value})}}/>
                                  </Grid>
                                  <Grid item sm={2}>
                                    {/* <Field component={SimpleFileUpload} name="file" className="input-image" label="Image Upload" /> */}
                                    <FileUploadBtn text="Upload" name='file' label='Image Upload' id="fileUpload" onClick={() => {this.setState({imgUploadField:'File Upload'})}}/>
                                  </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                  <Grid item sm={12}>
                                    <FormikField label="Event Description" name="desc" multiline rows="5"
                                                 error={errors.desc} touch={touched.desc} required/>
                                  </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                  <Grid item sm={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        name="start_date"
                                        label="Start Date and Time"
                                        component={DateTimePicker}
                                      />
                                    </div>
                                  </Grid>
                                  <Grid item sm={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={DateTimePicker}
                                        name="end_date"
                                        label="End Date and Time"
                                      />
                                    </div>
                                  </Grid>
                                </Grid>
                                {/*<div style={{ margin: "10px", marginLeft: "0px", marginBottom: "0px" }}>*/}
                                {/*  <Field*/}
                                {/*    name="recurring"*/}
                                {/*    type="checkbox"*/}
                                {/*    indeterminate={false}*/}
                                {/*  />*/}
                                {/*  <div style={{ display: "inline", marginLeft: "10px", fontSize: "14px" }}>This is a*/}
                                {/*    recurring event.*/}
                                {/*  </div>*/}
                                {/*</div>*/}
                                {/*<Grid container spacing={2}>*/}
                                {/*  <Grid item sm={6}>*/}
                                {/*    <Field*/}
                                {/*      name="recurring"*/}
                                {/*      label="Select Recurring"*/}
                                {/*      options={[*/}
                                {/*        { value: "never", label: "Never" },*/}
                                {/*        { value: "daily", label: "Daily" },*/}
                                {/*        { value: "weekly", label: "Weekly" },*/}
                                {/*        { value: "monthly", label: "Monthly" },*/}
                                {/*        { value: "other_recurring", label: "Other" }*/}
                                {/*      ]}*/}
                                {/*      component={Select}*/}
                                {/*    />*/}
                                {/*  </Grid>*/}
                                {/*  <Grid item sm={6}>*/}
                                {/*    <div style={{ margin: "16px 0 8px" }}>*/}
                                {/*      <Field*/}
                                {/*        component={DatePicker}*/}
                                {/*        name="end_date"*/}
                                {/*        label="End Date"*/}
                                {/*      />*/}
                                {/*    </div>*/}
                                {/*  </Grid>*/}
                                {/*</Grid>*/}
                                <Grid container spacing={2}>
                                  <Grid item sm={12}>
                                    <div style={{ marginTop: "20px" }}>
                                      Please provide AT LEAST ONE of the following links for your event.
                                    </div>
                                  </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                  <Grid item sm={5}>
                                    <FormikField label="Website / Event Link" name="event_link" error={errors.event_link} touch={touched.event_link} required />
                                  </Grid>
                                  <Grid item sm={5}>
                                    {console.log(this.state.zoomField)}
                                    <FormikField label="Video Call / Media Link (Zoom, Twitch, etc.)" error={errors.event_link}
                                                 touch={touched.event_link} name="media_link"
                                                 value={this.state.zoomField} onChange={(event) => {this.setState({zoomField:event.target.value})}}/>
                                  </Grid>
                                  <Grid item sm={2}>
                                    <div style={{ margin: '2px 0 8px' }}>
                                      <ButtonBase className={classes.customBtn}><span style={{ fontSize: '14px' }} onClick={() => {this.setState({zoomField:'Zoom Link Requested'})}}>
                                        Request Zoom Link</span>
                                      </ButtonBase>
                                    </div>
                                  </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                  <Grid item sm={1}>
                                    <div style={{ paddingTop: "9px" }}>Tags</div>
                                  </Grid>
                                  <Grid item sm={8} style={{ flexDirection: "row", flexWrap: "wrap", marginLeft:'-10px' }}>
                                    {console.log(this.state.eduTagActive)}
                                    <CustomButton className={classes.tags} color={!this.state.eduTagActive?'blue':'blueActive'} text={'Education'}
                                                  onClick={() => {this.setState({eduTagActive:!this.state.eduTagActive})}}/>
                                    <Button className={classes.tags} variant="outlined">Activism</Button>
                                    <Button className={classes.tags} variant="outlined">COVID</Button>
                                    <Button className={classes.tags} variant="outlined">Social</Button>
                                    <Button className={classes.tags} variant="outlined">Fitness</Button>
                                  </Grid>
                                  <Grid item sm={3}>
                                    <FormikField label="Other" placeholder="Separate Each Tag by Semicolon"
                                                 name="other_tag" />
                                  </Grid>
                                </Grid>

                              </div>


                              <div className={classes.section}>
                                <div className={classNames(classes.toAll, classes.subtitle)}>Additional Information
                                </div>
                                <Grid container spacing={2}>
                                  <Grid item sm={12}>
                                    <FormikField label="Comments" name="comments" multiline rows="5"
                                                 error={errors.comments} touch={touched.comments}/>
                                  </Grid>
                                </Grid>
                                <div>
                                  By hosting an event you agree to the <a
                                  href="https://www.essential-policies.columbia.edu/university-event-policies"
                                  target="_blank" style={{ color: "#0072CE" }}>Columbia Events Policy</a>.
                                </div>
                                <div style={{ margin: "5px", marginLeft: "-3px" }}>
                                  <Field
                                    component={CheckboxWithLabel}
                                    name="agree"
                                    type="checkbox"
                                    indeterminate={false}
                                    required
                                  />
                                  <div style={{ display: "inline", marginLeft: "-15px", fontSize: "14px" }}>
                                    I agree to the <a
                                    href="https://www.essential-policies.columbia.edu/university-event-policies"
                                    target="_blank" style={{ color: "#0072CE" }}>
                                    Columbia Events Policy
                                  </a>
                                  </div>
                                </div>
                              </div>

                              <Grid container spacing={2}>
                                <Grid item sm={3}>
                                  <Button
                                    className={classes.submitBtn}
                                    // disabled={!isValid}
                                    type="submit"
                                    id='submit'
                                    size='large'
                                  >
                                    Submit
                                  </Button>
                                </Grid>
                              </Grid>
                            </Form>
                          );
                        }}
                      </Formik>
                    </Grid>
                  </Grid>
                  <div style={{ marginBottom: "50px" }}/>
                  {/* </div> */}
                </Container>
              </div>


            </div>

            {/* </Template > */}
          </MuiPickersUtilsProvider>
        </div>

      );
    }
  }


}

export default withStyles(classesSt)(AddEvent);
