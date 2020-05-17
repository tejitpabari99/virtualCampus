import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import PersonIcon from "@material-ui/icons/Person";
import Axios from "axios";
import React from "react";
import { MetaData, Template } from '../components';
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import CustomInput from "../components/material-kit-components/CustomInput/CustomInput.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";

class contactUs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            to: 'columbiavirtualcampus@gmail.com',
            subject: '',
            from: '',
            text: '',
            feedbackSubmit: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.state.from)
        const data = {
            from: this.state.from,
            subject: this.state.subject,
            text: this.state.text
        }

        Axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/contactUs', data)
            .then(res => {
                this.setState({ feedbackSubmit: true })
                console.log(res)
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        if (this.state.feedbackSubmit === false) {
            return (
                <Template active={'contact-us'}>
                    <MetaData title={'Contact Us'} />
                    <h3 style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }}><strong>Contact Us</strong></h3><br />
                    <div style={{ textAlign: 'center' }}>
                        Our Email: <a style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }} href={'mailto:columbiavirtualcampus@gmail.com'}>columbiavirtualcampus@gmail.com</a>
                        <br /><br />
                Our Facebook: <a style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }} href='https://bit.ly/virtual-campus-group'>https://bit.ly/virtual-campus-group</a>
                    </div>
                    <br />

                    <div style={{ minHeight: '10px' }} />

                    <div style={{ minHeight: '10px' }} />

                    <h3 style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }}><strong>Feedback</strong></h3>
                    <GridContainer style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Email"
                                id="material"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment: (<InputAdornment position="end"><EmailIcon style={{ fill: "#4284C8" }} /></InputAdornment>)
                                }}
                                value={this.state.from}
                                onChange={(val) => { this.setState({ from: val.target.value }) }}
                            />
                        </GridItem>
                        <br />
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Subject"
                                id="material"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment: (<InputAdornment position="end"><PersonIcon style={{ fill: "#4284C8" }} /></InputAdornment>)
                                }}
                                value={this.state.subject}
                                onChange={(val) => { this.setState({ subject: val.target.value }) }}
                            />
                        </GridItem>
                        <br />
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Message"
                                id="material"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment: (<InputAdornment position="end"><MessageIcon style={{ fill: "#4284C8" }} /></InputAdornment>)
                                }}
                                value={this.state.text}
                                onChange={(val) => { this.setState({ text: val.target.value }) }}
                                multiline
                            />
                        </GridItem>
                    </GridContainer>
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <Button color="vcColor" size="sm"
                            active={true} target={'_blank'} rel="noopener noreferrer"
                            onClick={this.handleClick}> Submit
                  </Button>
                    </div>
                </Template>
            );
        }
        else {
            return (
                <Template active={'contact-us'}>
                    <MetaData title={'Contact Us'} />

                    <h3 style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }}><strong>Contact Us</strong></h3><br />
                    <div style={{ textAlign: 'center' }}>
                        Our Email: <a style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }} href={'mailto:columbiavirtualcampus@gmail.com'}>columbiavirtualcampus@gmail.com</a>
                        <br /><br />
                  Our Facebook: <a style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }} href='https://bit.ly/virtual-campus-group'>https://bit.ly/virtual-campus-group</a>
                    </div>
                    <br />

                    <div style={{ minHeight: '10px' }} />

                    <div style={{ minHeight: '10px' }} />

                    <h3 style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }}><strong>Feedback</strong></h3>
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                        Thank you for submitting feedback! We really value your opinion.
                  <br /><br />
                  We will get back to you shortly after one of the board members processes it.
                  </div>
                    <div style={{ height: '300px' }}></div>
                </Template>
            );
        }

    }
}
export default contactUs;













// //import DateFnsUtils from '@date-io/date-fns';
// // import Button from '@material-ui/core/Button';
// // import Grid from '@material-ui/core/Grid';
// // import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// // import { Field, Form, Formik } from "formik";
// // import { CheckboxWithLabel, SimpleFileUpload } from 'formik-material-ui';
// // //Date and time input
// // import { DateTimePicker } from 'formik-material-ui-pickers';
// // import { Select } from 'material-ui-formik-components/Select';
// // import InputAdornment from "@material-ui/core/InputAdornment";
// // import EmailIcon from "@material-ui/icons/Email";
// // import MessageIcon from "@material-ui/icons/Message";
// // import PersonIcon from "@material-ui/icons/Person";
// // import { default as React, default as React } from "react";
// // import { MetaData, Template } from '../components';
// // import Button from "../components/material-kit-components/CustomButtons/Button.js";
// // import CustomInput from "../components/material-kit-components/CustomInput/CustomInput.js";
// // import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
// // import GridItem from "../components/material-kit-components/Grid/GridItem.js";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import EmailIcon from "@material-ui/icons/Email";
// import MessageIcon from "@material-ui/icons/Message";
// import PersonIcon from "@material-ui/icons/Person";
// import React from "react";
// import { Helmet } from 'react-helmet';
// import { MetaData, Template } from '../components';
// import Button from "../components/material-kit-components/CustomButtons/Button.js";
// import CustomInput from "../components/material-kit-components/CustomInput/CustomInput.js";
// import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
// import GridItem from "../components/material-kit-components/Grid/GridItem.js";








// // set an init value first so the input is "controlled" by default
// const initVal = {
//     name: '',
//     org: '',
//     email: '',
//     org_webpage: '',
//     event: '',
//     event_link: '',
//     desc: '',
//     other_tag: '',
//     file: '',
//     image_link: '',
//     other_date: '',
//     invite_link: '',
//     comments: '',
//     date_tag: '',

// }


// // here you can add make custom requirements for specific input fields
// // you can add multiple rules as seen with the "name" scheme
// // you can also add custom feedback messages in the parameters of each error function
// // const validationSchema = Yup.object().shape({
// //     name: Yup.string()
// //         .min(5, 'Too Short')
// //         .required('Required'),
// //     org: Yup.string()
// //         .required('Required'),
// //     email: Yup.string()
// //         .email('Please enter a valid email address')
// //         .required('Required'),
// //     website: Yup.string()
// //         .url('Please enter a valid URL'),
// //     event: Yup.string()
// //         .required('Required'),
// //     desc: Yup.string()
// //         .required('Required')
// //         .max('250', "Please less than 250 characters")

// // })

// const TITLE = 'ADD EVENT'


// const AddEvent = (props) => {

//     const submitHandler = (values) => {
//         alert(JSON.stringify(values))

//         if (values['file'] != '') {
//             uploadImage(values)
//         }
//         else {
//             uploadData(values)
//         }
//     }

//     // upload to firebase here
//     function uploadData(values) {
//         console.log(values)
//     }

//     function uploadImage(values) {

//         const r = new XMLHttpRequest()
//         const d = new FormData()
//         // const e = document.getElementsByClassName('input-image')[0].files[0]
//         // var u
//         const clientID = 'df36f9db0218771'

//         d.append('image', values["file"])

//         // Boilerplate for POST request to Imgur
//         r.open('POST', 'https://api.imgur.com/3/image/')
//         r.setRequestHeader('Authorization', `Client-ID ${clientID}`)
//         r.onreadystatechange = function () {
//             if (r.status === 200 && r.readyState === 4) {
//                 let res = JSON.parse(r.responseText)
//                 // this is the link to the uploaded image
//                 let imgur = `https://i.imgur.com/${res.data.id}.png`

//                 values["file"] = imgur
//                 uploadData(values)

//             }
//         }
//         // send POST request to Imgur API
//         r.send(d)
//     }


//     return (
//         <Template active={'schedule'}>
//             <Helmet>
//                 <title>{TITLE}</title>
//                 <meta name="description" content="Virtual Campus for the Columbia Community" />
//                 <link rel="canonical" href="https://columbiavirtualcampus.com/" />
//                 <meta name="robots" content="index, follow" />
//                 <meta property="og:title" content="Columbia Virtual Campus" />
//                 <meta property="og:description" content="Virtual Campus for the Columbia Community" />
//                 <meta property="og:image" content='https://columbiavirtualcampus.com/static/graphic-7d5b8765ceb0dc19c9fa39db23824216.png' />
//                 <meta property="og:image:type" content="image/jpeg" />
//                 <meta property="og:image:alt" content="Columbia Virtual Campus" />
//                 <meta property="og:image:width" content="200" />
//                 <meta property="og:image:height" content="200" />
//             </Helmet>


//             <h1>Add Event</h1>

//             {/* <Formik
//                     initialValues={initVal}
//                     onSubmit={submitHandler}
//                 validationSchema={validationSchema}
//                 >
//                     {({ dirty, isValid, errors, touched }) => {
//                         return (

//                             <Form>
//                                 <Grid container spacing={3}>
//                                     <Grid item sm={4}>
//                                         <FormikField label="Name" name="name" error={errors.name} touch={touched.name} required />
//                                     </Grid>
//                                 </Grid>
//                                 <Grid container spacing={3}>
//                                     <Grid item sm={4}>
//                                         <FormikField label="Club / Organization" name="org" error={errors.org} touch={touched.org} required />
//                                     </Grid>
//                                     <Grid item sm={4}>
//                                         <FormikField label="Club / Organization Email" name="email" error={errors.email} touch={touched.email} required />
//                                     </Grid>
//                                     <Grid item sm={4}>
//                                         <FormikField label="Club / Organization Website" name="org_webpage" />
//                                     </Grid>
//                                 </Grid>

//                                 <Grid container spacing={3}>
//                                     <Grid item sm={6}>
//                                         <FormikField label="Event Name" name="event" error={errors.event} touch={touched.event} required />
//                                     </Grid>
//                                     <Grid item sm={6}>
//                                         <FormikField label="Event Link" name="event_link" />
//                                     </Grid>
//                                 </Grid>
//                                 <Grid container spacing={3}>
//                                     <Grid item sm={12}>
//                                         <FormikField label="Event Description" name="desc" rows="5" error={errors.desc} touch={touched.desc} required />
//                                     </Grid>
//                                 </Grid>

//                                 <Grid container spacing={3}>
//                                     <Grid item sm={6}>
//                                         Add event tags (if not given, will be decided by us)

//                                             <br />
//                                         <Field
//                                             component={CheckboxWithLabel}
//                                             name="games"
//                                             Label={{ label: 'Games' }}
//                                             indeterminate={false}
//                                             type="checkbox"
//                                         />
//                                         <br />
//                                         <Field
//                                             component={CheckboxWithLabel}
//                                             name="activism"
//                                             Label={{ label: 'Activism' }}
//                                             type="checkbox"
//                                             indeterminate={false}
//                                         />
//                                         <br />
//                                         <Field
//                                             component={CheckboxWithLabel}
//                                             name="covid"
//                                             Label={{ label: 'COVID' }}
//                                             type="checkbox"
//                                             indeterminate={false}
//                                         />
//                                         <br />
//                                         <Field
//                                             component={CheckboxWithLabel}
//                                             name="social"
//                                             Label={{ label: 'Social' }}
//                                             type="checkbox"
//                                             indeterminate={false}
//                                         />
//                                         <br />
//                                         <Field
//                                             component={CheckboxWithLabel}
//                                             name="fitness"
//                                             Label={{ label: 'Fitness' }}
//                                             type="checkbox"
//                                             indeterminate={false}
//                                         />
//                                         <br />
//                                         <Field
//                                             component={CheckboxWithLabel}
//                                             name="entreprenuership"
//                                             Label={{ label: 'Entreprenuership' }}
//                                             type="checkbox"
//                                             indeterminate={false}
//                                         />
//                                         <br />
//                                         <Field
//                                             component={CheckboxWithLabel}
//                                             name="education"
//                                             Label={{ label: 'Education' }}
//                                             type="checkbox"
//                                             indeterminate={false}
//                                         />

//                                         <FormikField label="Other Tag" name="other_tag" />
//                                     </Grid>
//                                 </Grid>

//                                 <br /><br />
//                                 <Grid container spacing={3}>
//                                     Image for event/club (Logo/picture to be displayed on the website. If no image is provided, we will choose a default image. You can give a file or a link)
//                                         <Grid item sm={6}>
//                                         <br />
//                                         <Field component={SimpleFileUpload} name="file" className="input-image" label="Image Upload" />
//                                         {}

//                                     </Grid>
//                                     <Grid item sm={6}>
//                                         <FormikField label="Image Link" name="image_link" />
//                                     </Grid>
//                                 </Grid>


//                                 <Grid container spacing={3}>
//                                     <br />
//                                     <br />
//                                     Provide a start and end time for your event (if end time is not provided, it will default to 1 hour)
//                                         <Grid item sm={6}>
//                                         <Field
//                                             component={DateTimePicker}
//                                             name="start_date"
//                                             label="Start Time"
//                                         />
//                                     </Grid>
//                                 </Grid>
//                                 <br />
//                                 <Grid container spacing={3}>
//                                     <Grid item sm={6}>
//                                         <Field
//                                             component={DateTimePicker}
//                                             name="end_date"
//                                             label="End Time"
//                                         />

//                                     </Grid>
//                                 </Grid>

//                                 <br />
//                                 <br />
//                                 <br />
//                                 <Grid container spacing={8}>
//                                     <Grid item sm={6}>
//                                         If this is a recurring event, please select how often.
//                                             <Field
//                                             name="date_tag"
//                                             label="Select Recurring"
//                                             options={[
//                                                 { value: 'weekly', label: 'Weekly' },
//                                                 { value: 'monthly', label: 'Monthly' },
//                                                 { value: 'daily', label: 'Daily' },
//                                                 { value: 'other_recurring', label: 'Other' },
//                                             ]}
//                                             component={Select}
//                                         />


//                                     </Grid>
//                                     <Grid item sm={6}>

//                                         If other, please specify how often the event will take place.
//                                               <FormikField label="Other Date" name="other_date" />

//                                     </Grid>
//                                 </Grid>

//                                 <br />
//                                 <br />
//                                 <Grid container spacing={3}>
//                                     <Grid item sm={12}>
//                                         Add Zoom, Google Hangouts, etc. links for the event here
//                                             <FormikField label="Event Invite Link" name="invite_link" />
//                                     </Grid>
//                                 </Grid>


//                                 <br />
//                                 <Grid container spacing={3}>
//                                     <Grid item sm={12}>
//                                         <FormikField label="Additional Comments" name="comments" />
//                                     </Grid>
//                                 </Grid>
//                                 <br />
//                                 <br />

//                                 <Grid container spacing={3}>
//                                     <Grid item sm={12}>
//                                         <h3> Events Policy </h3>


//                                             Thank you for your interest in featuring your event on Columbia Virtual Campus! We are excited about getting to know you and your student group.

//                                             <br />
//                                         <br />
//                                             As you may know, CVC is a student-run, student-led initiative. As of this moment, CVC is not formally affiliated with Columbia University, and does not fall under the jurisdiction of University Event Management, Office of University Life, or the Office of Multicultural Affairs.
//                                             <br />
//                                         <br />
//                                             Please be advised that by requesting that your event is featured on our website and social media, you are agreeing to the following terms:
//                                             <br />
//                                         <br />
//                                             1. Your event must not contain content, speech, iconography, or behavior that is discriminatory on the basis of sex, gender, race, ethnicity, nationality, sexuality, disability, immigration status, or religious identity.
//                                             <br />2. Your event must not contain hate speech (defined as any attempt to spread, incite, promote or justify hatred, discrimination, or violence towards a group or individual). Hateful slogans, dog-whistles, symbols, insignia, and gestures are encompassed under this term.
//                                             <br />3. CVC reserves the right to review your event and its content, as well as any invited speakers, performers, or special guests. Should we find any issue with your event, we are more than willing to work with you, provide our feedback, and accept any revisions.

//                                             <br />

//                                         <Field
//                                             required
//                                             component={CheckboxWithLabel}
//                                             name="agree"
//                                             Label={{ label: 'I agree to the Events Policy stated above' }}
//                                             type="checkbox"
//                                             indeterminate={false}
//                                         />
//                                     </Grid>
//                                 </Grid>
//                                 <br />
//                                 <br />

//                                 <Button
//                                     disabled={!dirty || !isValid}
//                                     color="primary"
//                                     type="submit"
//                                 >
//                                     Submit
//                                     </Button>
//                             </Form>
//                         )
//                     }}
//                 </Formik>
//  */}




//             <MetaData title={'Schedule Event'} />
//             <h3 style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }}><strong>Contact Us</strong></h3><br />
//             <div style={{ textAlign: 'center' }}>
//                 Our Email: <a style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }} href={'mailto:columbiavirtualcampus@gmail.com'}>columbiavirtualcampus@gmail.com</a>
//                 <br /><br />
//                 Our Facebook: <a style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }} href='https://bit.ly/virtual-campus-group'>https://bit.ly/virtual-campus-group</a>
//             </div>
//             <br />

//             <div style={{ minHeight: '10px' }} />

//             <div style={{ minHeight: '10px' }} />

//             <h3 style={{ textAlign: "center", color: "#4284C8", fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif' }}><strong>Feedback</strong></h3>
//             <GridContainer style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 <GridItem xs={12} sm={12} md={4}>
//                     <CustomInput
//                         labelText="Email"
//                         id="material"
//                         formControlProps={{
//                             fullWidth: true
//                         }}
//                         inputProps={{
//                             endAdornment: (<InputAdornment position="end"><EmailIcon style={{ fill: "#4284C8" }} /></InputAdornment>)
//                         }}
//                         value={this.state.from}
//                         onChange={(val) => { this.setState({ from: val.target.value }) }}
//                     />
//                 </GridItem>
//                 <br />
//                 <GridItem xs={12} sm={12} md={4}>
//                     <CustomInput
//                         labelText="Subject"
//                         id="material"
//                         formControlProps={{
//                             fullWidth: true
//                         }}
//                         inputProps={{
//                             endAdornment: (<InputAdornment position="end"><PersonIcon style={{ fill: "#4284C8" }} /></InputAdornment>)
//                         }}
//                         value={this.state.subject}
//                         onChange={(val) => { this.setState({ subject: val.target.value }) }}
//                     />
//                 </GridItem>
//                 <br />
//                 <GridItem xs={12} sm={12} md={4}>
//                     <CustomInput
//                         labelText="Message"
//                         id="material"
//                         formControlProps={{
//                             fullWidth: true
//                         }}
//                         inputProps={{
//                             endAdornment: (<InputAdornment position="end"><MessageIcon style={{ fill: "#4284C8" }} /></InputAdornment>)
//                         }}
//                         value={this.state.text}
//                         onChange={(val) => { this.setState({ text: val.target.value }) }}
//                         multiline
//                     />
//                 </GridItem>
//             </GridContainer>
//             <br />
//             <div style={{ textAlign: 'center' }}>
//                 <Button color="vcColor" size="sm"
//                     active={true} target={'_blank'} rel="noopener noreferrer"
//                     onClick={this.submitHandler}> Submit
//                   </Button>
//             </div>

//             <div style={{ minHeight: '60px' }} />
//         </Template >

//     );

// }

// export default AddEvent;