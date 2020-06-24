import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CircularProgress } from '@material-ui/core';

//inputs
import FormikField from "../FormikField/FormikField";
import { CheckboxWithLabel, SimpleFileUpload } from "formik-material-ui";
import { Select } from "material-ui-formik-components/Select";

//Date and time input
import { DateTimePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FileUploadBtn from '../FormikField/FileUploadBtn'
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import { CustomHeader, Template } from "../";
import Container from "@material-ui/core/Container";
import * as firebase from "firebase";
import Axios from "axios";

import { getTimezoneOptions } from "../all/TimeFunctions"

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


const optionsTZ = getTimezoneOptions();


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

class EventFormDesktop extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      feedbackSubmit: false,
      errStatus: 0,
      activityIndicatory: false,
      imgFileValue: "",
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  submitHandler(values) {
    if (values["file"] !== "" && values["file"] !== undefined) {
      this.uploadImage(values);
    } else {
      this.setState({ activityIndicatory: true });
      const b = this.uploadData(values);
    }
  }

  imgFileUploadHandler = (fileName) => {
    console.log("congrats, you clicked me.")
    console.log("Filename: " + fileName)
    this.setState({
      imgFileValue: fileName
    })
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
    const zoomUrl = "https://zoom.us/oauth/authorize?response_type=code&client_id=OApwkWCTsaV3C4afMpHhQ&redirect_uri=https%3A%2F%2Fcolumbiavirtualcampus.com%2Fevents%2Fhandle-approve&state="
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
        approvalUrl.concat(newEventRef.id))
        + "\n<br> USER REQUESTED ZOOM LINK, click here to create zoom meeting: "
          + zoomUrl.concat(newEventRef.id) ;
    if (data["zoomLink"]) {
      emailData["text"].concat("\n<br> USER REQUESTED ZOOM LINK, click here to create zoom meeting: ",
          zoomUrl.concat(newEventRef.id));
    }
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
      //sendZoomEmail(newEventRef.id, data["event"], from);
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
    r.onreadystatechange = function () {
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

  getFileName() {
    if (this.state.imgFileValue !== "") {
      return this.state.imgFileValue;
    }
    return ""
  }

  handleImageUpload(){
    console.log(this.inputElement);
    this.inputElement.props.label="Image Uploaded";
    this.inputElement.touch = true;
  }

  render() {
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
            <div>
              <div style={{ backgroundColor: "white" }}>
                <Container>
                  {/* <div className={classes.container} style={{ paddingTop: '85px' }}> */}
                  <Grid container spacing={10}>
                    <Grid item xs={4}>
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
                        Questions? Contact us at <br />
                        <a href='mailto:columbiavirtualcampus@gmail.com'>columbiavirtualcampus@gmail.com</a>.
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
                                <Grid container spacing={2}>
                                  <Grid item sm={6}>
                                    <FormikField label="Name / Organization"
                                      name="name"
                                      error={errors.name}
                                      touch={touched.name}
                                      required></FormikField>
                                  </Grid>
                                  <Grid item sm={6}>
                                    <FormikField label="Email" name="email"
                                      error={errors.email}
                                      touch={touched.email}
                                      required></FormikField>
                                  </Grid>
                                </Grid >
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
                                  Event
                                </div>
                                <Grid container spacing={2}>
                                  <Grid item sm={6}>
                                    <FormikField label="Event Name" name="event"
                                      error={errors.event}
                                      touch={touched.event}
                                      required></FormikField>
                                  </Grid>
                                  <Grid item sm={6}>
                                    <FormikField label="Logo / Image Link (Preferred: Imgur URL)"
                                                 name="image_link"
                                                 error={errors.image_link}
                                                 touch={touched.image_link}
                                    />
                                  </Grid>
                                  {/*<Grid item sm={4}>
                                    <FormikField label={this.getFileName() === "" ? "Logo / Image Link (Preferred: Imgur URL)" : this.getFileName()}

                                      name="image_link"
                                      error={errors.image_link}
                                      touch={touched.image_link}
                                      value={this.getFileName()}
                                    />
                                  </Grid>
                                  <Grid item sm={2}> */}
                                    {/* <Field component={SimpleFileUpload} name="file" className="input-image" label="Image Upload" /> */}
                                  {/*<FileUploadBtn text="Upload" name='file' label='Image Upload' id="fileUpload" onChange={this.imgFileUploadHandler} />
                                  </Grid>*/}
                                </Grid >

                                <Grid container spacing={2}>
                                  <Grid item sm={12}>
                                    <FormikField label="Event Description"
                                      name="desc"
                                      multiline rows="5"
                                      error={errors.desc}
                                      touch={touched.desc} required />
                                  </Grid>
                                </Grid >
                                <Grid container spacing={2}>
                                  <Grid item sm={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={DateTimePicker}
                                        name="start_date"
                                        label="Start Time"
                                        required
                                      />
                                    </div>
                                  </Grid>
                                  <Grid item sm={3}>
                                    <div style={{ margin: "16px 0 8px" }}>
                                      <Field
                                        component={DateTimePicker}
                                        name="end_date"
                                        label="End Time"
                                        required
                                      />
                                    </div>
                                  </Grid>
                                  <Grid item sm={3}>

                                    <Field
                                      name="timezone"
                                      label="Select Timezone"
                                      options={optionsTZ}
                                      component={Select}
                                      required
                                    />

                                  </Grid>
                                </Grid >
                                <Grid container spacing={2}>
                                  <Grid item sm={6}>
                                    <FormikField label="Website / Event Link"
                                      name="event_link"
                                      error={errors.event_link}
                                      touch={touched.event_link}
                                      required />
                                  </Grid>
                                  <Grid item sm={6}>
                                    <FormikField
                                      label="Video Call / Media Link (Zoom, Twitch, etc.)"
                                      name="invite_link" />
                                  </Grid>
                                </Grid >
                                <Field
                                  component={CheckboxWithLabel}
                                  name="zoomLink"
                                  Label={{ label: "Request a Zoom Pro link (Only valid if no Video Call link given)" }}
                                  type="checkbox"
                                  indeterminate={false}
                                />
                                <br />
                                <Grid container spacing={2}>
                                  <Grid item sm={1}>
                                    <div style={{ paddingTop: "9px" }}>Tags</div>
                                  </Grid>
                                  <Grid item sm={11}>
                                    <Field
                                      component={CheckboxWithLabel}
                                      name="activism_tag"
                                      Label={{ label: "Activism" }}
                                      type="checkbox"
                                      indeterminate={false}
                                    />
                                    <Field
                                      component={CheckboxWithLabel}
                                      name="covid_tag"
                                      Label={{ label: "COVID" }}
                                      type="checkbox"
                                      indeterminate={false}
                                    />
                                    <Field
                                      component={CheckboxWithLabel}
                                      name="social_tag"
                                      Label={{ label: "Social" }}
                                      type="checkbox"
                                      indeterminate={false}
                                    />
                                    <Field
                                      component={CheckboxWithLabel}
                                      name="health_tag"
                                      Label={{ label: "Health" }}
                                      type="checkbox"
                                      indeterminate={false}
                                    />
                                    <Field
                                      component={CheckboxWithLabel}
                                      name="education_tag"
                                      Label={{ label: "Education" }}
                                      type="checkbox"
                                      indeterminate={false}
                                    />
                                  </Grid>
                                </Grid >
                                <Grid container spacing={2}>
                                  <Grid item sm={12}>
                                    <FormikField label="Other Tags (Seperate each by semicolon)"
                                      placeholder="Separate Each Tag by Semicolon"
                                      name="other_tags" />
                                  </Grid>
                                </Grid >
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
                                  Additional
                                  Information
                                </div>
                                <Grid container spacing={2}>
                                  <Grid item sm={12}>
                                    <FormikField label="Comments" name="comments"
                                      multiline
                                      rows="5" error={errors.comments}
                                      touch={touched.comments} />
                                  </Grid>
                                </Grid >
                                <div>
                                  By hosting an event you agree to the <a
                                    href="https://bit.ly/events-policy-docs"
                                    target="_blank">Columbia Events Policy</a>.
                                </div>
                                <Field
                                  component={CheckboxWithLabel}
                                  name="agree"
                                  Label={{ label: "I agree to the Columbia Events Policy" }}
                                  type="checkbox"
                                  indeterminate={false}
                                  required
                                />
                              </div>

                              <Grid container spacing={2}>
                                <Grid item sm={3}>
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
                                </Grid>
                              </Grid >
                            </Form>
                          );
                        }}
                      </Formik>
                    </Grid>
                  </Grid >
                  <div style={{ marginBottom: "50px" }} />
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

export default EventFormDesktop;
