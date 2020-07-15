import React, { useCallback } from "react";
import { CircularProgress } from '@material-ui/core';

//form settings
import * as Yup from "yup";

//inputs
import { Field } from "formik"
import FormTitle from "../form-components/FormTitle"
import FormBody from "../form-components/FormBody"
import { Select } from "material-ui-formik-components/Select";
import FileUploadBtn from '../form-components/FileUploadBtn'

//Date and time input
import { DateTimePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// utils
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import {
  CustomHeader,
  Template,
  getOffset,
  convertDateToUTC,
  convertTimestampToDate,
  convertUTCToLocal,
  getTimezoneOptions
} from "..";

import EventCardDesktop from '../cards/eventCardsFeaturedAndCards/EventCardDesktop'
import EventCardMobile from '../cards/eventCardsFeaturedAndCards/EventCardMobile'
import Container from "@material-ui/core/Container";

// backend
import * as firebase from "firebase";
import Axios from "axios";
import TZ from "countries-and-timezones";
import * as Events from "../../pages/events";
import { PhoneCallback } from "@material-ui/icons";

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
  name: Yup.string()
    .min(5, "Too Short")
    .required("Required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Required"),
  event_link: Yup.string()
    .url("Please enter a valid URL")
    .required("Required"),
  event: Yup.string()
    .required("Required"),
  desc: Yup.string()
    .required("Required")
    .max("250", "Please less than 250 characters"),
  start_date: Yup.string()
    .required("Required"),
  end_date: Yup.string()
    .required("Required"),
  timezone: Yup.string()
    .required("Required"),
  agree: Yup.boolean("True")
    .required(),
  image_link: Yup.string()
    .trim().matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/, 'Enter valid image url (Ends with .jpg, .png)'),
  invite_link: Yup.string()
    .url("Please enter a valid URL")
});

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

const optionsTZ = getTimezoneOptions();

class EventFormMobile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      feedbackSubmit: false,
      errStatus: 0,
      imgFileValue: "",
      activityIndicatory: false,
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.uploadData = this.uploadData.bind(this);
  }

  submitHandler(values) {
    if (this.state.imgurLink !== "") {
      values['image_link'] = this.state.imgurLink
    }
    console.log(values)
    this.setState({ activityIndicatory: true });
    const b = this.uploadData(values);
  }

  // upload to firebase here
  uploadData(data) {

    data["approved"] = false;
    data["start_date"] = data["start_date"].toString();
    data["end_date"] = data["end_date"].toString();
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

        Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", emailData)
          .then(res => {
            console.log("Success 1");
            Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", clientEmailData)
              .then(res => {
                console.log("Success 2");
                this.setState({ feedbackSubmit: true, activityIndicatory: false });
              })
              .catch(error => {
                this.setState({ errStatus: 3 });
                console.log("Updated error");
              });
          })
          .catch(error => {
            this.setState({ errStatus: 1 });
            console.log("Updated error");
          });
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        alert("Failed to properly request your event. Please try adding the event again. If the problem persists please contact us!");
      });

    if (data["zoomLink"]) {
      sendZoomEmail(newEventRef.id, data["event"], from);
    }

    return emailData["text"];
  }

  imgFileUploadHandler = (fileList) => {
    // console.log("congrats, you clicked me.")
    const fileName = fileList[0].name
    const file = fileList[0]
    console.log("Filename: " + fileName)
    // console.log("File: " + file)

    this.uploadImage(file)
    this.setState({
      imgFileValue: fileName
    })
  }

  uploadImage = (file) => {
    let imgur = ""
    const r = new XMLHttpRequest();
    const d = new FormData();
    const clientID = "df36f9db0218771";

    d.append("image", file);

    // Boilerplate for POST request to Imgur
    r.open("POST", "https://api.imgur.com/3/image/");
    r.setRequestHeader("Authorization", `Client-ID ${clientID}`);
    r.onreadystatechange = () => {
      if (r.status === 200 && r.readyState === 4) {
        let res = JSON.parse(r.responseText);
        // this is the link to the uploaded image
        imgur = `https://i.imgur.com/${res.data.id}.png`;

        this.setState({ imgurLink: imgur })

        this.updateEvent(undefined)
      }
    };
    // send POST request to Imgur API
    r.send(d);
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

  getFileName() {
    if (this.state.imgFileValue !== "") {
      return this.state.imgFileValue;
    }
    return ""
  }

  handleImageUpload() {
    console.log(this.inputElement);
    this.inputElement.props.label = "Image Uploaded";
    this.inputElement.touch = true;
  }

  render() {
    const date = new Date();

    if (this.state.activityIndicatory) {
      return (
        <div style={{ backgroundColor: "white" }}>
          <div style={{ backgroundColor: "white" }}>
            <CustomHeader active={"schedule"} brand={"VIRTUAL CAMPUS"} />
            <div style={{ marginTop: '25%', marginLeft: '50%' }}>
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
        <Template title={'Add New Event'} active={"schedule"}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Template active={'schedule'}> */}
            <Container>
              <FormTitle
                title="Host a New Event"
                desc="Thank you for your interest in leading a virtual event or activity through CVC. Please fill out the following form so we can provide you with the necessary resources and appropriate platform on our website!"
              />
              <FormBody
                submit={this.submitHandler}
                onChange={this.updateEvent}
                title="Events"
                entryTitle="Event Name"
                initVal={initVal}
                validationSchema={validationSchema}
                imgUpload={this.imgFileUploadHandler}
                fileName={this.getFileName()}
              >
                <Grid container spacing={2}>
                  <Grid item sm={4} xs={6}>
                    <div style={{ margin: "16px 0 8px" }}>
                      <Field
                        component={DateTimePicker}
                        name="start_date"
                        label="Start Time"
                        required
                      />
                    </div>
                  </Grid>
                  <Grid item sm={4} xs={6}>
                    <div style={{ margin: "16px 0 8px" }}>
                      <Field
                        component={DateTimePicker}
                        name="end_date"
                        label="End Time"
                        required
                      />
                    </div>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <Field
                      name="timezone"
                      label="Select Timezone"
                      options={optionsTZ}
                      component={Select}
                      required
                    />
                  </Grid>
                </Grid>
              </FormBody>
              <div style={{ marginBottom: "50px" }} />
            </Container>
            {/* </Template > */}
          </MuiPickersUtilsProvider>
          <Container>
            <h2 style={{ color: "#0072CE", display: "inline" }}>
              Preview of Your Event&nbsp;
              <div style={{ color: "#0072CE", display: "inline" }}>
                - Date/Time is not updated in previews:
              </div>
            </h2>
            <br />
            <h5 style={{ color: "#0072CE" }}>Desktop Version:</h5>
            <Grid >
              <div style={{ marginBottom: "5%" }}>
                <h3 style={{ textAlign: "left", color: "#F1945B", fontSize: "20px", fontWeight: 100 }}>
                  {/* {this.getMonthName()} {date.getFullYear()} */}
                </h3>
                <div style={{ color: "#F1945B", backgroundColor: "#F1945B", height: 3 }} />
                {/* <EventCardDesktop ele={this.getSampleEvent()} key={0} /> */}
              </div>
            </Grid>
            <h5 style={{ color: "#0072CE" }}>Mobile Version (Similar to iPhone X):</h5>
            <Grid>
              <div style={{ marginBottom: "5%", width: "380px", wordWrap: "break-word", textAlign: "left" }}>
                <h3 style={{ textAlign: "left", color: "#F1945B", fontSize: "20px", fontWeight: 100 }}>
                  {/* {this.getMonthName()} {date.getFullYear()} */}
                </h3>
                <div style={{ color: "#F1945B", backgroundColor: "#F1945B", height: 3 }} />
                {/* <EventCardMobile ele={this.getSampleEvent()} key={0} /> */}
              </div>
            </Grid>
          </Container>
        </Template >

      );
    }
  }
}

export default EventFormMobile;