import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as Events from "./events";

//inputs
import FormikField from "../components/FormikField/FormikField"
import "../components/FormikField/FormikField.css"
import { CheckboxWithLabel, SimpleFileUpload } from 'formik-material-ui';
import { Select } from 'material-ui-formik-components/Select'

//Date and time input
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


import Button from '@material-ui/core/Button';

import GridContainer from '../components/material-kit-components/Grid/GridContainer';
import GridItem from '../components/material-kit-components/Grid/GridItem'


import classNames from "classnames";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { MetaData, CustomHeader, CustomButton, Title, Subtitle } from "../components"
import Container from '@material-ui/core/Container';
import * as firebase from "firebase";
import Axios from "axios";

// set an init value first so the input is "controlled" by default
const initVal = {
    name: '',
    email: '',
    event: '',
    desc: '',
    other_tags: '',
    image_file: '',
    image_link: '',
    start_date: '',
    end_date: '',
    timezone: '',
    recurring: '',
    event_link: '',
    invite_link: '',
    comments: '',
    tag: '',
    games_tag: '',
    activism_tag: '',
    covid_tag: '',
    social_tag: '',
    fitness_tag: '',
    education_tag: '',
    agree: '',

}


// here you can add make custom requirements for specific input fields
// you can add multiple rules as seen with the "name" scheme
// you can also add custom feedback messages in the parameters of each error function
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Too Short')
        .required('Required'),
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Required'),
    event_link: Yup.string()
        .url('Please enter a valid URL')
        .required('Required'),
    event: Yup.string()
        .required('Required'),
    desc: Yup.string()
        .required('Required')
        .max('250', "Please less than 250 characters"),
    start_date: Yup.string()
        .required('Required'),
    end_date: Yup.string()
        .required('Required'),
    timezone: Yup.string()
        .required('Required'),
    agree: Yup.boolean('True')
        .required()

})

const TITLE = 'ADD EVENT';
const defaultTimezone = 'America/New_York';


function formatEmailText(jsonText) {
    var newText = "";
    Object.keys(jsonText).map((key, index) => (
        newText = newText + "\n<br>" + getText(key, jsonText[key])
    ))
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
            values[defKey] = values[defKey]  + key.replace("_tag", "") + ";";
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

    const defKey = 'other_tags';

    if (values[defKey].endsWith(";") === false && values[defKey] !== "") {
        values[defKey] = values[defKey] + ";";
    }

    Object.keys(values).map((key, index) => (
        values[defKey] = processATag(values, key, defKey),
        values = cleanTag(values, key)
    ))
    values[defKey] = values[defKey].replace("; ;", ";");
    values[defKey] = values[defKey].replace(";;", ";");
    if (values[defKey].endsWith(";")) {
        values[defKey] = values[defKey].substring(0, values[defKey].length - 1)
    }
    values['tags'] = values[defKey].split(";");
    delete values['tag'];
    delete values[defKey];
    return values;

}


function sendZoomEmail(id, name, from) {

    const emailData = {
        from: from,
        subject: "ZOOMLINK: " + name + ". ID: " + id,
        text: "Event " + name + " needs a zoom link!"
    }

    Axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail', emailData)
        .then(res => {
            console.log("Success")
        })
        .catch(error => {
            console.log("error")
        });
}

function getTimezoneOptions() {
    if (Events.getCurrentLocationForTimeZone() != defaultTimezone) {
        return [
            {
                value: Events.getCurrentLocationForTimeZone()
                    + "$" + Events.dst(),
                label: 'Mine: '
                    + Events.getTimezoneName()
            },
            {
                value: defaultTimezone
                    + "$" + Events.dst(defaultTimezone),
                label: 'Default: '
                    + Events.getTimezoneName(defaultTimezone
                        , Events.dst(defaultTimezone))
            }
        ];
    } else {
        return [
            {
                value: defaultTimezone
                    + "$" + Events.dst(defaultTimezone),
                label: 'Mine: '
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
            errStatus: 0
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.uploadData = this.uploadData.bind(this);
    }

    submitHandler(values) {
        if (values['file'] !== '' && values['file'] !== undefined) {
            this.uploadImage(values)
        }
        else {
            const b = this.uploadData(values)
            this.setState({ feedbackSubmit: true })
        }
    }


    // upload to firebase here
    uploadData(data) {

        data['approved'] = false;
        const from = data['email'];
        const subject = "NEW EVENT: " + data['event'];
        const clientSubject = "Your CVC Event Details: " + data['event'];
        data = processTags(data);
        const text = formatEmailText(data);
        const approvalUrl = 'https://us-central1-columbia-virtual-campus.cloudfunctions.net/approveEvent?eventId=';
        const clientEmailData = {
            to: from,
            from: 'columbiavirtualcampus@gmail.com',
            subject: clientSubject,
            text: text
        }

        const emailData = {
            from: from,
            subject: subject,
            text: text
        }


        const db = firebase.firestore();
        const newEventRef = db.collection('events').doc();
        clientEmailData['text'] = "Your New Event Request!\n<br>Here's what we are currently processing:\n <br>" +
                emailData['text'] + "\n<br>NOTE: The correct timezone is in the \'timezone\': field!\n<br><br>"
                + "Please contact us if any of the above needs corrected or if you have any questions!"
                + "\n<br>\n<br>Best,\n<br>The CVC Team"
        emailData['text'] = "New Event Request!\n <br>" +
                emailData['text'].concat('\n<br> NOTE: The correct timezone is in the \'timezone\': field!'
                +'<br><br>Click here to approve this event: ',
                approvalUrl.concat(newEventRef.id))
        emailData['subject'] += ". ID: " + newEventRef.id;
        newEventRef.set(data)
            .then(ref => {
                console.log("Document written", ref)

                Axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail', emailData)
                    .then(res => {
                        console.log("Success");
                    })
                    .catch(error => {
                        this.setState({errStatus: 1})
                        console.log("Updated error");
                    });
            })
            .catch(function (error) {
                console.error("Error adding document: ", error)
                alert("Failed to properly request your event. Please try adding the event again. If the problem persists please contact us!")
            });
        Axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail', clientEmailData)
            .then(res => {
                console.log("Success");
            })
            .catch(error => {
                this.setState({errStatus: 3})
                console.log("Updated error");
            });

        if (data['invite_link'] === '') {
            sendZoomEmail(newEventRef.id, data['event'], from);
        }

        return emailData['text'];
    }

    uploadImage(values) {

        const r = new XMLHttpRequest()
        const d = new FormData()
        // const e = document.getElementsByClassName('input-image')[0].files[0]
        // var u
        const clientID = 'df36f9db0218771'

        d.append('image', values["file"])

        // Boilerplate for POST request to Imgur
        r.open('POST', 'https://api.imgur.com/3/image/')
        r.setRequestHeader('Authorization', `Client-ID ${clientID}`)
        r.onreadystatechange = function () {
            if (r.status === 200 && r.readyState === 4) {
                let res = JSON.parse(r.responseText)
                // this is the link to the uploaded image
                let imgur = `https://i.imgur.com/${res.data.id}.png`

                values["file"] = imgur
                this.uploadData(values)

            }
        }
        // send POST request to Imgur API
        r.send(d)

        return true
    }

    getHeadMessage() {

        if (this.state.errStatus === 4) {
            return "Oops... Sorry! There was an error handling your request."
        } else if (this.state.errStatus  === 3 || this.state.errStatus  === 1) {
            return "Thank You! Further Action Required!"
        } else if (this.state.errStatus  === 2) {
            return "Oops... Sorry! There was an error handling your request."
        } else {
            return "Thank You!"
        }
    }

    getBodyMessage() {

        if (this.state.errStatus === 4) {
            return "We were unable to process your request due to an unexpected error. " +
                    "Please try again. If the problem persists please reach out to us:"
        } else if (this.state.errStatus  === 3 || this.state.errStatus  === 1) {
            return "Please contact us about approving your event! We were unable to automatically email our team."
                    + " Please reach out to us at:"
        } else if (this.state.errStatus  === 2) {
            return "We were unable to process your request. Please try again. " +
                    "If the problem persists please reach out to us:"
        } else {
            return "We look forward to hosting your event on CVC! " +
                    "If there is anything that needs to be updated, please reach out to us."
        }
    }


    render()
    {
        if (this.state.feedbackSubmit) {
            return (
                <div style={{backgroundColor: 'white'}}>
                <CustomHeader active={'schedule'} brand={"VIRTUAL CAMPUS"}></CustomHeader>
                    <div style={{
                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '1.5rem',
                        lineHeight: '30px',
                        color: '#0072CE',
                        margin: '10px',
                        textAlign: 'center',
                        paddingTop: '16%',
                    }}>
                        <div style={{fontSize: '2.5rem'}}> {this.getHeadMessage()} </div>
                        <br/>
                        <br/>
                        <div style={{color: 'black',
                                     paddingLeft: '20%', paddingRight: '20%'}}> {this.getBodyMessage()}</div>
                        <br/>
                        <br/>
                        <div style={{color: 'black', fontSize: '1rem'}}>
                            Questions? Contact us at
                            <a style={{color: '#0072CE', display: 'inline-block', paddingLeft:'0.3%'}}
                               href={'mailto:columbiavirtualcampus@gmail.com'}> columbiavirtualcampus@gmail.com.</a>
                        </div>
                        <br/>
                        <br/>
                        <Button
                            style={{
                                background: 'white',
                                border: '1px solid #FB750D',
                                borderRadius: '10px',
                                boxSizing: "border-box",
                                color: '#FB750D',
                                boxShadow: 'none',
                                paddingLeft: '10px',
                                paddingRight: '10px'
                            }}
                            href={'/form'}>
                            Add Another Event
                        </Button>
                    </div>
                </div>)

        } else {
            return (
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {/* <Template active={'schedule'}> */}
                        <div>
                            <CustomHeader active={'schedule'} brand={"VIRTUAL CAMPUS"}></CustomHeader>
                            <div style={{backgroundColor: 'white'}}>
                                <Container maxWidth='lg' style={{paddingTop: '85px'}}>
                                    {/* <div className={classes.container} style={{ paddingTop: '85px' }}> */}
                                    <GridContainer spacing={10}>
                                        <GridItem xs={4}>
                                            <div style={{
                                                fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 'normal',
                                                fontSize: '36px', lineHeight: '54px', color: '#0072CE'
                                            }}>
                                                Host a New Event
                                            </div>
                                            <div style={{
                                                fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 'normal',
                                                fontSize: '14px', lineHeight: '21px',
                                            }}>
                                                Thank you for your interest in leading a virtual event or activity
                                                through
                                                CVC.
                                                Please fill out the following form so we can provide you with the
                                                necessary
                                                resources and appropriate platform on our website!
                                            </div>
                                            <div style={{
                                                fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 'normal',
                                                fontSize: '14px', lineHeight: '21px', paddingTop: '66px'
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
                                                {({dirty, isValid, errors, touched}) => {
                                                    return (
                                                        <Form>
                                                            <div style={{margin: '15px 0'}}>
                                                                <div style={{
                                                                    fontFamily: 'Poppins',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 'normal',
                                                                    fontSize: '20px',
                                                                    lineHeight: '30px',
                                                                    color: '#0072CE'
                                                                }}>
                                                                    Contact
                                                                </div>
                                                                <GridContainer>
                                                                    <GridItem sm={6}>
                                                                        <FormikField label="Name / Organization"
                                                                                     name="name"
                                                                                     error={errors.name}
                                                                                     touch={touched.name}
                                                                                     required></FormikField>
                                                                    </GridItem>
                                                                    <GridItem sm={6}>
                                                                        <FormikField label="Email" name="email"
                                                                                     error={errors.email}
                                                                                     touch={touched.email}
                                                                                     required></FormikField>
                                                                    </GridItem>
                                                                </GridContainer>
                                                            </div>


                                                            <div style={{margin: '15px 0'}}>
                                                                <div style={{
                                                                    fontFamily: 'Poppins',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 'normal',
                                                                    fontSize: '20px',
                                                                    lineHeight: '30px',
                                                                    color: '#0072CE'
                                                                }}>
                                                                    Event
                                                                </div>
                                                                <GridContainer>
                                                                    <GridItem sm={6}>
                                                                        <FormikField label="Event Name" name="event"
                                                                                     error={errors.event}
                                                                                     touch={touched.event}
                                                                                     required></FormikField>
                                                                    </GridItem>
                                                                    <GridItem sm={4}>
                                                                        <FormikField label="Logo / Image Link"
                                                                                     name="image_link"
                                                                                     error={errors.image_link}
                                                                                     touch={touched.image_link}></FormikField>
                                                                    </GridItem>
                                                                    <GridItem sm={2}>
                                                                        {/* <Field component={SimpleFileUpload} name="file" className="input-image" label="Image Upload" /> */}
                                                                        <Button
                                                                            style={{
                                                                                fontFamily: 'Poppins',
                                                                                fontStyle: 'normal',
                                                                                fontWeight: 'normal',
                                                                                background: 'white',
                                                                                border: '1px solid #0072CE',
                                                                                borderRadius: '10px',
                                                                                boxSizing: "border-box",
                                                                                color: '#0072CE',
                                                                                boxShadow: 'none',
                                                                                width: "100%",
                                                                            }}
                                                                        >
                                                                            <input
                                                                                type='file'
                                                                                style={{display: "none"}}
                                                                            />
                                                                            Upload File
                                                                        </Button>
                                                                    </GridItem>
                                                                </GridContainer>

                                                                <GridContainer>
                                                                    <GridItem>
                                                                        <FormikField label="Event Description"
                                                                                     name="desc"
                                                                                     multiline rows="5"
                                                                                     error={errors.desc}
                                                                                     touch={touched.desc} required/>
                                                                    </GridItem>
                                                                </GridContainer>
                                                                <GridContainer>
                                                                    <GridItem sm={3}>
                                                                        <div style={{margin: '16px 0 8px'}}>

                                                                            <Field
                                                                                component={DateTimePicker}
                                                                                name="start_date"
                                                                                label="Start Time"
                                                                                required
                                                                            />
                                                                        </div>

                                                                    </GridItem>
                                                                    <GridItem sm={3}>
                                                                        <div style={{margin: '16px 0 8px'}}>
                                                                            <Field
                                                                                component={DateTimePicker}
                                                                                name="end_date"
                                                                                label="End Time"
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </GridItem>
                                                                    <GridItem sm={3}>

                                                                        <Field
                                                                            name="timezone"
                                                                            label="Select Timezone"
                                                                            options={optionsTZ}
                                                                            component={Select}
                                                                            required
                                                                        />

                                                                    </GridItem>
                                                                    <GridItem sm={3}>
                                                                        <Field
                                                                            name="recurring"
                                                                            label="Select Recurring"
                                                                            options={[
                                                                                {value: 'never', label: 'Never'},
                                                                                {value: 'daily', label: 'Daily'},
                                                                                {value: 'weekly', label: 'Weekly'},
                                                                                {value: 'monthly', label: 'Monthly'},
                                                                                {
                                                                                    value: 'other_recurring',
                                                                                    label: 'Other'
                                                                                },
                                                                            ]}
                                                                            component={Select}
                                                                        />
                                                                    </GridItem>
                                                                </GridContainer>
                                                                <div style={{paddingTop: "18px"}}>
                                                                    Please provide AT LEAST ONE of the following links
                                                                    for
                                                                    your
                                                                    event.
                                                                </div>
                                                                <GridContainer spacing={3}>
                                                                    <GridItem sm={6}>
                                                                        <FormikField label="Website / Event Link"
                                                                                     name="event_link"
                                                                                     error={errors.event_link}
                                                                                     touch={touched.event_link}
                                                                                     required/>
                                                                    </GridItem>
                                                                    <GridItem sm={6}>
                                                                        <FormikField
                                                                            label="Video Call / Media Link (Zoom, Twitch, etc.)"
                                                                            name="invite_link"/>
                                                                    </GridItem>
                                                                </GridContainer>
                                                                <br/>
                                                                <GridContainer spacing={3}>
                                                                    <GridItem sm={1}>
                                                                        <div style={{paddingTop: '9px'}}>Tags</div>
                                                                    </GridItem>
                                                                    <GridItem sm={11}>
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="games_tag"
                                                                            Label={{label: 'Games'}}
                                                                            indeterminate={false}
                                                                            type="checkbox"
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="activism_tag"
                                                                            Label={{label: 'Activism'}}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="covid_tag"
                                                                            Label={{label: 'COVID'}}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="social_tag"
                                                                            Label={{label: 'Social'}}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="fitness_tag"
                                                                            Label={{label: 'Fitness'}}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="education_tag"
                                                                            Label={{label: 'Education'}}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                    </GridItem>
                                                                </GridContainer>
                                                                <GridContainer>
                                                                    <GridItem sm={12}>
                                                                        <FormikField label="Other Tags"
                                                                                     placeholder="Separate Each Tag by Semicolon"
                                                                                     name="other_tags"/>
                                                                    </GridItem>
                                                                </GridContainer>
                                                            </div>


                                                            <div style={{margin: '15px 0'}}>
                                                                <div style={{
                                                                    fontFamily: 'Poppins',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 'normal',
                                                                    fontSize: '20px',
                                                                    lineHeight: '30px',
                                                                    color: '#0072CE'
                                                                }}>
                                                                    Additional
                                                                    Information
                                                                </div>
                                                                <GridContainer>
                                                                    <GridItem sm={12}>
                                                                        <FormikField label="Comments" name="comments"
                                                                                     multiline
                                                                                     rows="5" error={errors.comments}
                                                                                     touch={touched.comments}/>
                                                                    </GridItem>
                                                                </GridContainer>
                                                                <div>
                                                                    By hosting an event you agree to the <a
                                                                    href="https://www.essential-policies.columbia.edu/university-event-policies"
                                                                    target="_blank">Columbia Events Policy</a>.
                                                                </div>
                                                                <Field
                                                                    component={CheckboxWithLabel}
                                                                    name="agree"
                                                                    Label={{label: 'I agree to the Columbia Events Policy'}}
                                                                    type="checkbox"
                                                                    indeterminate={false}
                                                                    required
                                                                />
                                                            </div>

                                                            <GridContainer>
                                                                <GridItem sm={3}>
                                                                    <Button
                                                                        style={{
                                                                            background: 'white',
                                                                            border: '1px solid #FB750D',
                                                                            borderRadius: '10px',
                                                                            boxSizing: "border-box",
                                                                            color: '#FB750D',
                                                                            boxShadow: 'none',
                                                                            width: "100%"
                                                                        }}
                                                                        type="submit">
                                                                        Submit
                                                                    </Button>
                                                                </GridItem>
                                                            </GridContainer>
                                                        </Form>
                                                    )
                                                }}
                                            </Formik>
                                        </GridItem>
                                    </GridContainer>
                                    <div style={{marginBottom: "50px"}}/>
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

export default AddEvent;
