import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { MetaData, CustomHeader, CustomButton, Title, Subtitle } from "../components"
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(styles);
const manualSt = makeStyles(() => ({
    toAll: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'normal',
        // marginBottom: '12px'
    },
    title: {
        fontSize: '36px',
        lineHeight: '54px',
        color: '#0072CE'
    },
    subtitle: {
        fontSize: '20px',
        lineHeight: '30px',
        color: '#0072CE'
    },
    detail: {
        fontSize: '14px',
        lineHeight: '21px',
    },
    section: {
        margin: '15px 0'
    },
    uploadBtn: {
        background: 'white',
        border: '1px solid #0072CE',
        borderRadius: '10px',
        boxSizing: "border-box",
        color: '#0072CE',
        boxShadow: 'none',
        width: "100%",
    },
    formField: {
        fontSize: '14px',
        lineHeight: '21px',
    },
    submitBtn: {
        background: 'white',
        border: '1px solid #FB750D',
        borderRadius: '10px',
        boxSizing: "border-box",
        color: '#FB750D',
        boxShadow: 'none',
        width: "100%",
    },

}));



// set an init value first so the input is "controlled" by default
const initVal = {
    name: '',
    email: '',
    event: '',
    desc: '',
    other_tag: '',
    image_file: '',
    image_link: '',
    start_date: '',
    end_date: '',
    recurring: '',
    event_link: '',
    invite_link: '',
    comments: '',
    tag: '',
    games: '',
    activism: '',
    covid: '',
    social: '',
    fitness: '',
    education: '',
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
    agree: Yup.boolean('True')
        .required()

})

const TITLE = 'ADD EVENT'


const AddEvent = (props) => {
    const classes = useStyles();
    const manual = manualSt();


    const submitHandler = (values) => {
        let vals = JSON.stringify(values)

        alert(vals)
        console.log(vals)

        if (values['file'] != '') {
            uploadImage(values)
        }
        else {
            uploadData(values)
        }
    }

    // upload to firebase here
    function uploadData(values) {
        console.log(values)
    }

    function uploadImage(values) {

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
                uploadData(values)

            }
        }
        // send POST request to Imgur API
        r.send(d)
    }


    return (

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* <Template active={'schedule'}> */}
            <div>
                <CustomHeader active={'schedule'} brand={"VIRTUAL CAMPUS"}></CustomHeader>
                <div className={classNames(classes.mainOther, manual.main)}>
                    <Container maxWidth='lg' style={{ paddingTop: '85px' }}>
                        {/* <div className={classes.container} style={{ paddingTop: '85px' }}> */}
                        <GridContainer spacing={10}>
                            <GridItem xs={4}>
                                <div className={classNames(manual.toAll, manual.title)}>Host a New Event</div>
                                <div className={classNames(manual.toAll, manual.detail)}>
                                    Thank you for your interest in leading a virtual event or activity through CVC.
                                    Please fill out the following form so we can provide you with the necessary
                                    resources and appropriate platform on our website!
                            </div>
                                <div className={classNames(manual.toAll, manual.detail)} style={{ paddingTop: '66px' }}>
                                    Questions? Contact us at <br />
                                    <a href='mailto:columbiavirtualcampus@gmail.com'>columbiavirtualcampus@gmail.com</a>.
                            </div>
                            </GridItem>
                            <GridItem xs={8}>
                                <Formik
                                    initialValues={initVal}
                                    onSubmit={submitHandler}
                                    validationSchema={validationSchema}
                                >
                                    {({ dirty, isValid, errors, touched }) => {
                                        return (
                                            <Form>
                                                <div className={manual.section}>
                                                    <div className={classNames(manual.toAll, manual.subtitle)}>Contact</div>
                                                    <GridContainer >
                                                        <GridItem sm={6}>
                                                            <FormikField label="Name / Organization" name="name" error={errors.name} touch={touched.name} required ></FormikField>
                                                        </GridItem>
                                                        <GridItem sm={6}>
                                                            <FormikField label="Email" name="email" error={errors.email} touch={touched.email} required ></FormikField>
                                                        </GridItem>
                                                    </GridContainer>
                                                </div>


                                                <div className={manual.section}>
                                                    <div className={classNames(manual.toAll, manual.subtitle)}>Event</div>
                                                    <GridContainer >
                                                        <GridItem sm={6}>
                                                            <FormikField label="Event Name" name="event" error={errors.event} touch={touched.event} required ></FormikField>
                                                        </GridItem>
                                                        <GridItem sm={4}>
                                                            <FormikField label="Logo / Image Link" name="image_link" error={errors.image_link} touch={touched.image_link} ></FormikField>
                                                        </GridItem>
                                                        <GridItem sm={2}>
                                                            {/* <Field component={SimpleFileUpload} name="file" className="input-image" label="Image Upload" /> */}
                                                            <Button
                                                                className={classNames(manual.toAll, manual.uploadBtn)}
                                                            >
                                                                <input
                                                                    type='file'
                                                                    style={{ display: "none" }}
                                                                />
                                                                Upload File
                                                            </Button>
                                                        </GridItem>
                                                    </GridContainer>

                                                    <GridContainer>
                                                        <GridItem>
                                                            <FormikField label="Event Description" name="desc" multiline rows="5" error={errors.desc} touch={touched.desc} required />
                                                        </GridItem>
                                                    </GridContainer>
                                                    <GridContainer>
                                                        <GridItem sm={3}>
                                                            <div style={{ margin: '16px 0 8px' }}>

                                                                <Field
                                                                    component={DateTimePicker}
                                                                    name="start_date"
                                                                    label="Start Time"
                                                                />
                                                            </div>

                                                        </GridItem>
                                                        <GridItem sm={3}>
                                                            <div style={{ margin: '16px 0 8px' }}>
                                                                <Field
                                                                    component={DateTimePicker}
                                                                    name="end_date"
                                                                    label="End Time"
                                                                />
                                                            </div>
                                                        </GridItem>
                                                        <GridItem sm={6}>
                                                            <Field
                                                                name="recurring"
                                                                label="Select Recurring"
                                                                options={[
                                                                    { value: 'never', label: 'Never' },
                                                                    { value: 'daily', label: 'Daily' },
                                                                    { value: 'weekly', label: 'Weekly' },
                                                                    { value: 'monthly', label: 'Monthly' },
                                                                    { value: 'other_recurring', label: 'Other' },
                                                                ]}
                                                                component={Select}
                                                            />
                                                        </GridItem>
                                                    </GridContainer>
                                                    <div style={{ paddingTop: "18px" }}>
                                                        Please provide AT LEAST ONE of the following links for your event.
                                                    </div>
                                                    <GridContainer spacing={3}>
                                                        <GridItem sm={6}>
                                                            <FormikField label="Website / Event Link" name="event_link" error={errors.event_link} touch={touched.event_link} required />
                                                        </GridItem>
                                                        <GridItem sm={6}>
                                                            <FormikField label="Video Call / Media Link (Zoom, Twitch, etc.)" name="invite_link" />
                                                        </GridItem>
                                                    </GridContainer>
                                                    <br />
                                                    <GridContainer spacing={3}>
                                                        <GridItem sm={1}>
                                                            <div style={{ paddingTop: '9px' }}>Tags</div>
                                                        </GridItem>
                                                        <GridItem sm={11}>
                                                            <Field
                                                                component={CheckboxWithLabel}
                                                                name="games"
                                                                Label={{ label: 'Games' }}
                                                                indeterminate={false}
                                                                type="checkbox"
                                                            />
                                                            <Field
                                                                component={CheckboxWithLabel}
                                                                name="activism"
                                                                Label={{ label: 'Activism' }}
                                                                type="checkbox"
                                                                indeterminate={false}
                                                            />
                                                            <Field
                                                                component={CheckboxWithLabel}
                                                                name="covid"
                                                                Label={{ label: 'COVID' }}
                                                                type="checkbox"
                                                                indeterminate={false}
                                                            />
                                                            <Field
                                                                component={CheckboxWithLabel}
                                                                name="social"
                                                                Label={{ label: 'Social' }}
                                                                type="checkbox"
                                                                indeterminate={false}
                                                            />
                                                            <Field
                                                                component={CheckboxWithLabel}
                                                                name="fitness"
                                                                Label={{ label: 'Fitness' }}
                                                                type="checkbox"
                                                                indeterminate={false}
                                                            />
                                                            <Field
                                                                component={CheckboxWithLabel}
                                                                name="education"
                                                                Label={{ label: 'Education' }}
                                                                type="checkbox"
                                                                indeterminate={false}
                                                            />
                                                        </GridItem>
                                                    </GridContainer>
                                                    <GridContainer>
                                                        <GridItem sm={12}>
                                                            <FormikField label="Other Tags" placeholder="Separate Each Tag by Semicolon" name="other_tag" />
                                                        </GridItem>
                                                    </GridContainer>
                                                </div>


                                                <div className={manual.section}>
                                                    <div className={classNames(manual.toAll, manual.subtitle)}>Additional Information</div>
                                                    <GridContainer>
                                                        <GridItem sm={12}>
                                                            <FormikField label="Comments" name="comments" multiline rows="5" error={errors.comments} touch={touched.comments} />
                                                        </GridItem>
                                                    </GridContainer>
                                                    <div>
                                                        By hosting an event you agree to the <a href="https://www.essential-policies.columbia.edu/university-event-policies" target="_blank">Columbia Events Policy</a>.
                                                    </div>
                                                    <Field
                                                        component={CheckboxWithLabel}
                                                        name="agree"
                                                        Label={{ label: 'I agree to the Columbia Events Policy' }}
                                                        type="checkbox"
                                                        indeterminate={false}
                                                        required
                                                    />
                                                </div>

                                                <GridContainer>
                                                    <GridItem sm={3}>
                                                        <Button
                                                            className={manual.submitBtn}
                                                            disabled={!isValid}
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
                        <div style={{ marginBottom: "50px" }} />
                        {/* </div> */}
                    </Container>
                </div>


            </div>

            {/* </Template > */}
        </MuiPickersUtilsProvider >

    );

}

export default AddEvent;
