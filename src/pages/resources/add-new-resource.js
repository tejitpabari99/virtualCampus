import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FormControlLabel, Radio, LinearProgress } from '@material-ui/core';

import { RadioGroup } from 'formik-material-ui';
import FormikField from "../../components/FormikField/FormikField"
// import "../components/form.css"
import { CheckboxWithLabel } from 'formik-material-ui';
import FileUploadBtn from '../../components/FormikField/FileUploadBtn'
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPage.js";
import { CustomHeader } from "../../components"
import Container from '@material-ui/core/Container';
import firebase from "../../../firebase";
import Categories from "../../components/resources/form/FormCategories"


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
        .required(),

    // added category validation for radio group
    category: Yup.string()
        .required()

});

const ResourceFormDesktop = (props) => {
    const classes = useStyles();
    const manual = manualSt();
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const handleChange = (event) => {
        setValue(event.target.value);
        
      };
    
    // added state variable to keep track of current category
    var state = {
        needs: false,
        covid: false,
        career: false,
        health: false,
        social: false,
      };
    const submitHandler = (values, {resetForm}) => {
        
        let vals = JSON.stringify(values);
        
        // had to create new object to upload to firestore
        var new_entry = {
            
            // added name and email fields for new entries--
            // useful info to store in Firestore moving forward

            name: "",
            email: "",

            category: {
                category: "",
                tags: [],
            },
            
            description: "",
            img: "",
            links: {
                androidLink: "",
                cardLink: "",
                facebook: "",
                iosLink: "",
                website: "",
            },
            reviewed: false,
            title: ""
        };
        
        for (var prop in values) {
            
            // finding tags
            var tag_idx = prop.indexOf('tag');
            if (tag_idx != -1)
            {
                new_entry['category']['tags'].push(prop.slice(0, tag_idx-1));

            }

            // name field
            if (prop === "name" || prop === "email")
            {
                new_entry[prop] = values[prop];
            }
            
            // etc.
            if (prop === "desc")
            {
                new_entry["description"] = values[prop];
            }
            else if (prop === "image_link")
            {
                new_entry["img"] = values[prop];
            }
            else if (prop === "project_name")
            {
                new_entry["title"] = values[prop];
            }
            else if (prop === "project_link")
            {
                new_entry["links"]["website"] = values[prop];                    
            }

            else if (prop == "other_tags")
            {
                new_entry["category"]["tags"] = values[prop].split(";");
            }
            // }            
          }
        new_entry["category"]["category"] = values['category'].toString();

        
        // alert(JSON.stringify(new_entry));
        
        // calling function uploadData to send to firestore
        uploadData(new_entry);
        
        // resetting the form once an entry has been submitted
        resetForm({values: ''});
    };


    // upload to firebase here
    function uploadData(values) {

        // calling firestore and adding new values
        var db = firebase.firestore();
        db.collection("resources").add(values);
        
        
    }

    // now that posting image files isn't an option, this function is obsolete....?
    function uploadImage(values) {
        const r = new XMLHttpRequest();
        const d = new FormData();
        // const e = document.getElementsByClassName('input-image')[0].files[0]
        // var u
        const clientID = 'df36f9db0218771';

        d.append('image', values["img"]);

        // Boilerplate for POST request to Imgur
        r.open('POST', 'https://api.imgur.com/3/image/');
        r.setRequestHeader('Authorization', `Client-ID ${clientID}`);
        r.onreadystatechange = function () {
            if (r.status === 200 && r.readyState === 4) {
                let res = JSON.parse(r.responseText);
                // this is the link to the uploaded image
                let imgur = `https://i.imgur.com/${res.data.id}.png`;

                values["img"] = imgur;
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
                                                            
                                                            
                                                                <Field component={RadioGroup} row={true} name="category" value={value} onChange={handleChange} required>
                                                                <FormControlLabel
                                                                    value="basic needs"
                                                                    control={<Radio row/>}
                                                                    label = "Needs"
                                                                    onClick ={()=>{
                                                                        
                                                                        // had to use state variable to keep track of current category 
                                                                        state.needs=true;
                                                                        state.covid=false;
                                                                        state.health=false;
                                                                        state.social=false;
                                                                        state.career=false;
            
                                                                    }}
                                                                    
                                                                    
                                                                />
                                                                <FormControlLabel
                                                                    value="jobs, internships, & learning"
                                                                    control={<Radio row/>}
                                                                    label = "Career"
                                                                    onClick ={()=>{    

                                                                        state.needs=false;
                                                                        state.covid=false;
                                                                        state.health=false;
                                                                        state.social=false;
                                                                        state.career=true;            
                                                                    }}
                                                                    
                                                                    
                                                                />
                                                                <FormControlLabel
                                                                    value="covid- 19"
                                                                    control={<Radio row/>}
                                                                    label = "COVID"
                                                                    onClick ={()=>{
                                                                        
                                                                        state.needs=false;
                                                                        state.covid=true;
                                                                        state.health=false;
                                                                        state.social=false;
                                                                        state.career=false;
            
                                                                    }}
                                                                    
                                                                />
                                                                <FormControlLabel
                                                                    value="health"
                                                                    control={<Radio row/>}
                                                                    label = "Health"
                                                                    onClick ={()=>{
                                                                        
                                                                        state.needs=false;
                                                                        state.covid=false;
                                                                        state.health=true;
                                                                        state.social=false;
                                                                        state.career=false;
            
                                                                    }}
                                                                    
                                                                />
                                                                <FormControlLabel
                                                                    value="social"
                                                                    control={<Radio row/>}
                                                                    label = "Social"
                                                                    onClick ={()=>{
                                                                        
                                                                        state.needs=false;
                                                                        state.covid=false;
                                                                        state.health=false;
                                                                        state.social=true;
                                                                        state.career=false;
            
                                                                    }}
                                                                    
                                                                />
                                                                
                                                                </Field>
                                                                
                                                            </Grid>
                                                        </div>
                                                    </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                    <Grid item sm={2}>
                                                        <div className={manual.dot} style={{ paddingTop: '9px' }}>•</div>
                                                        <div style={{ marginLeft: '35px', paddingTop: '9px', height: '15px', width: '70px' }}>Tags</div>
                                                    </Grid>
                                                    <Grid item sm={10}>
                                                    
  
                                                        <div className="buttons">
                                                            
                                                            <Grid item sm={11}>
                                                            
                                                            {/* if the current category is needs: */}
                                                            {state.needs
                                                            ? <span >
                                                                <Field
                                                                    component={CheckboxWithLabel}
                                                                    name="finances_tag"
                                                                    checked = {false}
                                                                    Label={{ label: "Finances" }}
                                                                    type="checkbox"
                                                                    indeterminate={false}
                                                                />

                                                                <Field
                                                                    component={CheckboxWithLabel}
                                                                    name="columbia_tag"
                                                                    checked = {false}
                                                                    Label={{ label: "Columbia" }}
                                                                    type="checkbox"
                                                                    indeterminate={false}
                                                                />

                                                                <Field
                                                                    component={CheckboxWithLabel}
                                                                    name="international students_tag"
                                                                    checked = {false}
                                                                    Label={{ label: "International Students" }}
                                                                    type="checkbox"
                                                                    indeterminate={false}
                                                                />

                                                                <Field
                                                                    component={CheckboxWithLabel}
                                                                    name="food_tag"
                                                                    checked = {false}
                                                                    Label={{ label: "Food" }}
                                                                    type="checkbox"
                                                                    indeterminate={false}
                                                                />
                                                                    </span>
                                                                : ""  
                                                                }
                                                                
                                                                {/* if the current category is career: */}
                                                                {state.career
                                                                ?   <span >
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="jobs_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Jobs" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="internship_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Internship" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="volunteer_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Volunteer" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="international students_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "International Students" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="columbia_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Columbia" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                    </span>
                                                                : ""  
                                                                }


                                                                {/* if the current category is covid: */}
                                                                {state.covid
                                                                ?   <span >
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="updates_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Updates" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="columbia_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Columbia" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                    </span>
                                                                : ""  
                                                                }

                                                                {/* if the current category is health: */}
                                                                {state.health
                                                                ?   <span >
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="mental_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Mental" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="physical_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Physical" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="columbia_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Columbia" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                    </span>
                                                                : ""  
                                                                }

                                                                {/* if the current category is social: */}
                                                                {state.social
                                                                ?   <span >
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="recreation_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Recreation" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="connected_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Connected" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="columbia_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Columbia" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="games_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "Games" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                        <Field
                                                                            component={CheckboxWithLabel}
                                                                            name="international students_tag"
                                                                            checked = {false}
                                                                            Label={{ label: "International Students" }}
                                                                            type="checkbox"
                                                                            indeterminate={false}
                                                                        />
                                                                    </span>
                                                                : ""  
                                                                }
                                                                
                                                            </Grid>
                                                        </div>
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