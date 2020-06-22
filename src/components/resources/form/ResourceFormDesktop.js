import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import FormikField from "../../FormikField/FormikField"
// import "../components/form.css"
import { CheckboxWithLabel } from 'formik-material-ui';
import FileUploadBtn from '../../FormikField/FileUploadBtn'
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';


import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { CustomHeader } from "../.."
import Container from '@material-ui/core/Container';
import firebase from "../../../firebase";

import Categories from "./FormCategories"
const MainCategories = Categories.FormCategories;

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
        width: '435px',
        height: '66px',
        left: '55px',
        top: '101px',
    },
    subtitle: {
        fontSize: '20px',
        lineHeight: '30px',
        color: '#0072CE',
        width: '243px',
        height: '30px',
        left: '584px',
        top: '114px',
    },
    detail: {
        width: '400px',
        height: '63px',
        left: '55px',
        color: '#000000',
        fontSize: '14px',
        lineHeight: '21px',
    },
    section: {
        margin: '15px 0'
    },
    uploadBtn: {
        right: '5.42%',
        top: '25.72%',
        bottom: '70.59%',
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
        margin: "1vh 0 0 0",
        willChange: "box-shadow, transform",
        transition:
            "box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        touchAction: "manipulation",
        cursor: "pointer",
        background: "#FFFFFF",
        width: "121px",
        height: "36px",
        marginLeft: '-10px',
        marginTop: '16px'
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
        right: '25px',
        borderRadius: '10px',
        color: '#0072CE !important',
        border: "1px solid #0072CE",
        "&:hover,&:focus": {
            color: 'white !important',
            backgroundColor: '#0072CE',
            boxShadow: "0 14px 26px -12px #0072CE50"
        },
        fontSize: 'min(1vw, 12px)',
        textTransform: 'none',
        marginLeft: '12px'
    },
    dot: {
        fontSize: '16pt',
        color: '#FD6464',
        borderRadius: '50%',
        position: 'absolute',
        width: '5px',
        height: '5px',
        marginLeft: '16px',
        paddingTop: '5px'
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
    needs_tag: '',
    career_tag: '',
    covid_tag: '',
    health_tag: '',
    social_tag: '',
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

const ResourceFormDesktop = (props) => {
    const classes = useStyles();
    const manual = manualSt();

    const submitHandler = (values) => {
        let vals = JSON.stringify(values);
        console.log(vals);
        console.log(values);
        alert(vals);

        if (values['file'] != '') {
            uploadImage(values);
        }
        else {
            uploadData(values);
        }
    };

    // const imgFileUploadHandler = (fileName) => {
    //     // console.log("congrats, you clicked me.")
    //     this.setState({
    //         imgFileValue: fileName
    //     })
    // }

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
                <Container maxWidth='lg' style={{ paddingTop: '76px' }}>
                    {/* <Grid container spacing={8}>
                        <Grid item xs={4}>
                            <div className={classNames(manual.toAll, manual.title)}>Add a New Resource</div>
                            <div className={classNames(manual.toAll, manual.detail)}>
                                Thank you for your interest in sharing your project through CVC.
                                Please fill out the following form so we can thoroughly promote your resource on our website!
                            </div>
                            <div className={classNames(manual.toAll, manual.detail)} style={{ paddingTop: '87px' }}>
                                Questions? Contact us at: <a style={{ textAlign: "center", color: "#4284C8" }}
                                    href={"mailto:columbiavirtualcampus@gmail.com"}>columbiavirtualcampus@gmail.com</a>.
                            </div>
                        </Grid> */}
                        <Grid container spacing={10}>
                            <Grid item xs={4}>
                                <div style={{
                                    fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                                    fontSize: "36px", lineHeight: "54px", color: "#0072CE"
                                }}>
                                    Add a New Resource
                          </div>
                                <div style={{
                                    fontFamily: "Poppins", fontStyle: "normal", fontWeight: "normal",
                                    fontSize: "14px", lineHeight: "21px"
                                }}>
                                    Thank you for your interest in sharing your project through CVC.
                                    Please fill out the following form so we can thoroughly promote your resource on our website!
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
                            <Formik initialValues={initVal} onSubmit={submitHandler} validationSchema={validationSchema}>
                                {({ dirty, isValid, errors, touched }) => {
                                    return (
                                        <Form>
                                            <div className={manual.section}>
                                                <div className={classNames(manual.toAll, manual.subtitle)}>Contact</div>
                                                <Grid container spacing={2}>
                                                    <Grid item sm={6}>
                                                        <FormikField label="Name / Organization" name="name" error={errors.name} touch={touched.name} required ></FormikField>
                                                    </Grid>
                                                    <Grid item sm={6}>
                                                        <div>
                                                            <FormikField label="Email" name="email" error={errors.email} touch={touched.email} required ></FormikField>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>

                                            <div className={manual.section}>
                                                <div className={classNames(manual.toAll, manual.subtitle)} style={{ marginTop: '30px' }}>Resource</div>
                                                <Grid container spacing={2} >
                                                    <Grid item sm={6}>
                                                        <FormikField label="Project Name" name="project_name" error={errors.project_name} touch={touched.project_name} required ></FormikField>
                                                    </Grid>
                                                    <Grid item sm={6}>
                                                        <div>
                                                            <FormikField
                                                                label="Logo / Image Link"
                                                                name="image_link"
                                                                error={errors.image_link}
                                                                touch={touched.image_link}
                                                            // value={this.state.imgFileValue}
                                                            />
                                                        </div>
                                                    </Grid>
                                                    {/*<Grid item sm={2}>*/}
                                                    {/*    /!* <Field component={SimpleFileUpload} name="file" className="input-image" label="Image Upload" /> *!/*/}
                                                    {/*    /!* <CustomButton text={"Upload File"} color={"blue"} size={"small"}/> *!/*/}
                                                    {/*    /!* <Field*/}
                                                    {/*        name='image_file'*/}
                                                    {/*        component={FileUpload}*/}
                                                    {/*    /> *!/*/}
                                                    {/*    /!* <input*/}
                                                    {/*        name='image_file'*/}
                                                    {/*        type='file'*/}
                                                    {/*        id='file_upload'*/}
                                                    {/*        style={{ display: 'none' }}*/}
                                                    {/*    />*/}
                                                    {/*    <label htmlFor="file_upload">*/}
                                                    {/*        <div>*/}
                                                    {/*            <Button className={classNames(manual.toAll, manual.uploadBtn)} variant="outlined" component="span">*/}
                                                    {/*                Upload File*/}
                                                    {/*            </Button>*/}
                                                    {/*        </div>*/}
                                                    {/*    </label> *!/*/}
                                                    {/*    <FileUploadBtn*/}
                                                    {/*        text="Upload"*/}
                                                    {/*        name='file'*/}
                                                    {/*        label='Image Upload'*/}
                                                    {/*        id="fileUpload"*/}
                                                    {/*    // onChange={this.imgFileUploadHandler}*/}
                                                    {/*    />*/}

                                                    {/*</Grid>*/}
                                                </Grid>

                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <FormikField label="Description" name="desc" multiline rows="4" error={errors.desc} touch={touched.desc} required />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <FormikField label="Project Link" name="project_link" error={errors.project_link} touch={touched.project_link} required />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={2}>
                                                    <Grid item sm={2}>
                                                        <div className={manual.dot} style={{ paddingTop: '9px' }}>•</div>
                                                        <div style={{ marginLeft: '35px', paddingTop: '9px', height: '15px', width: '70px' }}>Category</div>
                                                    </Grid>
                                                    <Grid item sm={10}>
                                                        <div className="buttons">
                                                            {/* {Object.keys(MainCategories).map(category => {
                                                                return (
                                                                    <Button name="category" className={classNames(manual.toAll, manual.categoryBtn)}>{MainCategories[category]['title']}</Button>
                                                                );
                                                            })} */}
                                                            <Grid item sm={11}>
                                                                <Field
                                                                    component={CheckboxWithLabel}
                                                                    name="needs_tag"
                                                                    Label={{ label: "Needs" }}
                                                                    type="checkbox"
                                                                    indeterminate={false}
                                                                />
                                                                <Field
                                                                    component={CheckboxWithLabel}
                                                                    name="career_tag"
                                                                    Label={{ label: "Career" }}
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
                                                                    name="health_tag"
                                                                    Label={{ label: "Health" }}
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
                                                            </Grid>
                                                        </div>
                                                    </Grid>
                                                    <Grid item sm={12}>
                                                        <FormikField label="Other Tags (Seperate each by semicolon)"
                                                            placeholder="Separate Each Tag by Semicolon"
                                                            name="other_tags" />
                                                    </Grid>
                                                </Grid>
                                            </div>

                                            <div className={manual.section} style={{ marginTop: '30px' }}>
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

                                            <Grid container spacing={2}>
                                                <Grid item sm={3}>
                                                    <Button
                                                        className={manual.submitBtn}
                                                        disabled={!isValid}
                                                        type="submit">
                                                        Submit
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </Grid>
                    </Grid>
                    <div style={{ marginBottom: "50px" }} />
                    {/* </div> */}
                </Container>
            </div>
        </div >
    );
};

export default ResourceFormDesktop;