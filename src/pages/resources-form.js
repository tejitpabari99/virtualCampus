import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import FormikField from "../components/FormikField/FormikField"
import "../components/FormikField/FormikField.css"
import "../components/form.css"
import { CheckboxWithLabel } from 'formik-material-ui';
//import { CheckboxWithLabel, SimpleFileUpload } from 'formik-material-ui';
import Button from '@material-ui/core/Button';

import GridContainer from '../components/material-kit-components/Grid/GridContainer';
import GridItem from '../components/material-kit-components/Grid/GridItem'

import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { CustomHeader } from "../components"
import Container from '@material-ui/core/Container';
import firebase from "../firebase";

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
        color: '#0072CE',
        position: 'absolute',
        width: '435px',
        height: '105px',
        left: '-30px',
        top: '43px'
    },
    subtitle: {
        fontSize: '20px',
        lineHeight: '30px',
        color: '#0072CE'
    },
    detail: {
        position: 'absolute',
        width: '435px',
        height: '63px',
        left: '-30px',
        top: '105px',
        color: '#000000',
        fontSize: '14px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontFamily: 'Poppins',
        lineHeight: '21px',
    },
    section: {
        margin: '15px 0'
    },
    uploadBtn: {
        borderRadius: '10px',
        boxSizing: "border-box",
        color: '#0072CE !important',
        border: "1px solid #0072CE",
        "&:hover,&:focus": {
          color: 'white !important',
          backgroundColor: '#0072CE',
          boxShadow: "0 14px 26px -12px #0072CE50"
        },
        fontSize: 'min(2vw, 15px)',
        padding: "1vh min(2vw,20px)",
        margin: "0.5vh 0 0 0",
        willChange: "box-shadow, transform",
        transition:
          "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        touchAction: "manipulation",
        cursor: "pointer",
        background: "#FFFFFF",
        width: "108px"
    },
    formField: {
        fontSize: '14px',
        lineHeight: '21px',
    },
    submitBtn: {
        borderRadius: '10px',
        width: "100%",
        color: '#FB750D !important',
        boxSizing: "border-box",
        border: "1px solid #FB750D",
        "&:hover,&:focus": {
          color: 'white !important',
          backgroundColor: '#F1945B',
          boxShadow: "0 14px 26px -12px #FB750D50"
        },
        fontSize: 'min(2vw, 15px)',
        padding: "1vh min(2vw,15px)"
    },
    categoryBtn: {
        borderRadius: '10px',
        color: '#0072CE !important',
        border: "1px solid #0072CE",
        "&:hover,&:focus": {
          color: 'white !important',
          backgroundColor: '#0072CE',
          boxShadow: "0 14px 26px -12px #0072CE50"
        },
        fontFamily: 'Poppins',
        fontSize: 'min(1vw, 12px)',
        fontStyle: 'normal',
        fontWeight: 'normal',
        padding: "1vh min(1vw,1.5px)",
        width: '110px',
        height: '30px',
        textTransform: 'none'
    },
}));

// set an init value first so the input is "controlled" by default
const initVal = {
    name: '',
    email: '',
    project_name: '',
    desc: '',
    image_file: '',
    image_link: '',
    project_link: '',
    comments: '',
    category: '',
    needs: '',
    career: '',
    covid: '',
    health: '',
    social: '',
    other_tag: '',
    agree: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Too Short')
        .required('Required'),
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Required'),
    project_link: Yup.string()
        .url('Please enter a valid URL')
        .required('Required'),
    project_name: Yup.string()
        .required('Required'),
    desc: Yup.string()
        .required('Required')
        .max('250', "Please enter less than 250 characters"),
    agree: Yup.boolean('True')
        .required()

});

const AddResource = (props) => {
    const classes = useStyles();
    const manual = manualSt();

    const submitHandler = (values) => {
        let vals = JSON.stringify(values);
        console.log(vals);
        alert(vals);

        if (values['file'] != '') {
            uploadImage(values);
        }
        else {
            uploadData(values);
        }
    };

    // upload to firebase here
    function uploadData(values) {
        var db = firebase.firestore();
        var path = values["valueHash"];
        var newResourceRef = db.collection("resources");
        console.log(values);
    }

    function uploadImage(values) {
        const r = new XMLHttpRequest();
        const d = new FormData();
        // const e = document.getElementsByClassName('input-image')[0].files[0]
        // var u
        const clientID = 'df36f9db0218771';

        d.append('image', values["file"]);

        // Boilerplate for POST request to Imgur
        r.open('POST', 'https://api.imgur.com/3/image/');
        r.setRequestHeader('Authorization', `Client-ID ${clientID}`);
        r.onreadystatechange = function () {
            if (r.status === 200 && r.readyState === 4) {
                let res = JSON.parse(r.responseText);
                // this is the link to the uploaded image
                let imgur = `https://i.imgur.com/${res.data.id}.png`;

                values["file"] = imgur;
                uploadData(values);
            }
        };
        // send POST request to Imgur API
        r.send(d);
    }

    return (
        <div>
            <CustomHeader active={'resources'} brand={"VIRTUAL CAMPUS"}></CustomHeader>
            <div className={classNames(classes.mainOther, manual.main)}>
                <Container maxWidth='lg' style={{ paddingTop: '76px', paddingLeft: '78px'}}>
                    <GridContainer spacing={10}>
                        <GridItem xs={4}>
                            <div className={classNames(manual.toAll, manual.title)}>Add a New Resource</div>
                            <div className={classNames(manual.toAll, manual.detail)}>
                                Thank you for your interest in sharing your project through CVC.
                                Please fill out the following form so we can thoroughly promote your resource on our website!
                            </div>
                            <div className={classNames(manual.toAll, manual.detail)} style={{ width: '435px', height: '42px', left: '-30px', top: '200px', paddingTop: '66px' }}>
                                Questions? Contact us at: <a style={{ textAlign: "center", color: "#4284C8" }}
                                    href={"mailto:columbiavirtualcampus@gmail.com"}>columbiavirtualcampus@gmail.com</a>
                            </div>
                        </GridItem>

                        <GridItem xs={8}>
                            <Formik initialValues={initVal} onSubmit={submitHandler} validationSchema={validationSchema}>
                                {({ dirty, isValid, errors, touched }) => {
                                    return (
                                        <Form>
                                            <div className={manual.section}>
                                                <div className={classNames(manual.toAll, manual.subtitle)}>Contact</div>
                                                <GridContainer>
                                                    <GridItem sm={6}>
                                                        <FormikField label="Name / Organization" name="name" error={errors.name} touch={touched.name} required ></FormikField>
                                                    </GridItem>
                                                    <GridItem sm={6}>
                                                        <div style={{marginLeft: '-10px'}}>
                                                            <FormikField label="Email" name="email" error={errors.email} touch={touched.email} required ></FormikField>
                                                        </div>
                                                    </GridItem>
                                                </GridContainer>
                                            </div>

                                            <div className={manual.section}>
                                                <div className={classNames(manual.toAll, manual.subtitle)} style={{marginTop: '25px'}}>Resource</div>
                                                <GridContainer>
                                                    <GridItem sm={6}>
                                                        <FormikField label="Project Name" name="project_name" error={errors.project_name} touch={touched.project_name} required ></FormikField>
                                                    </GridItem>
                                                    <GridItem sm={4}>
                                                        <div style={{marginLeft: '-10px'}}>
                                                            <FormikField label="Logo / Image Link" name="image_link" error={errors.image_link} touch={touched.image_link}></FormikField>
                                                        </div>
                                                    </GridItem>
                                                    <GridItem sm={1}>
                                                        {/* <Field component={SimpleFileUpload} name="file" className="input-image" label="Image Upload" /> */}
                                                        {/* <CustomButton text={"Upload File"} color={"blue"} size={"small"}/> */}
                                                        {/* <Field
                                                            name='image_file'
                                                            component={FileUpload}
                                                        /> */}
                                                        <input
                                                            name='image_file'
                                                            type='file'
                                                            id='file_upload'
                                                            style={{ display: 'none' }}
                                                        />
                                                        <label htmlFor="file_upload">
                                                            <div style={{marginLeft: '-10px', paddingTop: '7px'}}>
                                                                <Button className={classNames(manual.toAll, manual.uploadBtn)} variant="outlined" component="span">
                                                                        Upload File
                                                                </Button>
                                                            </div>
                                                        </label>
                                                    </GridItem>
                                                </GridContainer>

                                                <GridContainer>
                                                    <GridItem>
                                                        <FormikField label="Description" name="desc" multiline rows="4" error={errors.desc} touch={touched.desc} required />
                                                    </GridItem>
                                                </GridContainer>
                                                <GridContainer>
                                                    <GridItem>
                                                        <FormikField label="Project Link" name="project_link" error={errors.project_link} touch={touched.project_link} required />
                                                    </GridItem>
                                                </GridContainer>
                                                <br />

                                                <GridContainer>
                                                    <GridItem sm={1}>
                                                        <div style={{ paddingTop: '3px' }}>Category</div>
                                                    </GridItem>
                                                    <GridItem sm={8}>
                                                       <div className="buttons">
                                                            <Button className={manual.categoryBtn} name="needs" style={{ marginLeft: '20px' }}>Basic Needs</Button>
                                                            <Button className={manual.categoryBtn} name="career" style={{ width: '72px', marginLeft: '10px' }}>Career</Button>
                                                            <Button className={manual.categoryBtn} name="covid" style={{ width: '85px', marginLeft: '10px' }}>COVID-19</Button>
                                                            <Button className={manual.categoryBtn} name="health" style={{ width: '71px', marginLeft: '10px' }}>Health</Button>
                                                            <Button className={manual.categoryBtn} name="social" style={{ width: '68px', marginLeft: '10px' }}>Social</Button>
                                                       </div>
                                                    </GridItem>
                                                    <GridItem sm={3}>
                                                        <div style={{marginLeft: '-25px', marginTop: '-20px'}}>
                                                            <FormikField label="Other" name="other_tag"></FormikField>
                                                        </div>
                                                    </GridItem>
                                                </GridContainer>
                                            </div>

                                            <div className={manual.section} style={{marginTop: '30px'}}>
                                                <div>
                                                    By adding a resource, you agree to the <a style={{ textAlign: "center", color: "#4284C8" }}
                                                    href="https://policylibrary.columbia.edu/acceptable-usage-information-resources-policy" target="_blank">
                                                    Columbia Resources Policy</a>.
                                                </div>
                                                <Field
                                                    component={CheckboxWithLabel}
                                                    name="agree"
                                                    Label={{ label: 'I agree to the Columbia Resources Policy.' }}
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
    );
};

export default AddResource;