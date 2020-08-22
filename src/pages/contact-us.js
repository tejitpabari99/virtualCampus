import React from "react";
import {CustomButton, CustomFooter, CustomHeader, Template, Title} from "../components";
import CustomInput from "../components/material-kit-components/CustomInput/CustomInput.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import InputAdornment from "@material-ui/core/InputAdornment";
import { CircularProgress } from '@material-ui/core';
import Axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import InstaIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

class contactUs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            to: "columbiavirtualcampus@gmail.com",
            subject: "",
            from: "",
            text: "",
            activityIndicatory: false,
            feedbackSubmit: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({activityIndicatory:true});
        const data = {
            from: this.state.from,
            subject: 'CONTACT US: ' + this.state.subject,
            text: this.state.text
        }

        Axios.post("https://us-central1-columbia-virtual-campus.cloudfunctions.net/sendEmail", data)
            .then(res => {
                this.setState({ activityIndicatory: false });
                this.setState({ feedbackSubmit: true });
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        return (
            <div style={{backgroundColor: "white"}}>
            <Template active={"contact-us"} title={"Contact Us"}>
                <Title color={'blue'}>Contact Us</Title>
                <div style={{ textAlign: "center" }}>
                    Our Email: <a style={{ textAlign: "center", color: "#4284C8" }}
                                  href={"mailto:columbiavirtualcampus@gmail.com"}>columbiavirtualcampus@gmail.com</a>
                    <div style={{ minHeight: "5px" }} />
                    Our Facebook: <a style={{ textAlign: "center", color: "#4284C8" }}
                                     href='https://bit.ly/virtual-campus-group'>https://bit.ly/virtual-campus-group</a>
                </div>

                <div style={{ minHeight: "20px" }} />

                <h3 style={{ textAlign: "center", color: "#4284C8" }}><strong>Feedback</strong></h3>
                {this.state.activityIndicatory &&

                <div style={{ backgroundColor: "white" }}>
                    <div style={{ backgroundColor: "white" }}>
                        <CustomHeader active={"schedule"} brand={"VIRTUAL CAMPUS"}/>
                        <div style={{marginTop: '3%', marginLeft:'49%'}}>
                            <CircularProgress />
                        </div>
                    </div>
                </div>
                }

                {!this.state.feedbackSubmit && !this.state.activityIndicatory &&

                <div>
                    <GridContainer style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Email"
                                id="material"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end"><EmailIcon style={{ fill: "#4284C8" }} /></InputAdornment>)
                                }}
                                value={this.state.from}
                                onChange={(val) => {
                                    this.setState({ from: val.target.value });
                                }}
                            />
                        </GridItem>
                        <br />
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Subject"
                                id="material"
                                formControlProps={{ fullWidth: true }}
                                inputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end"><PersonIcon style={{ fill: "#4284C8" }} /></InputAdornment>)
                                }}
                                value={this.state.subject}
                                onChange={(val) => {
                                    this.setState({ subject: val.target.value });
                                }}
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
                                    endAdornment: (
                                        <InputAdornment position="end"><MessageIcon style={{ fill: "#4284C8" }} /></InputAdornment>)
                                }}
                                value={this.state.text}
                                onChange={(val) => {
                                    this.setState({ text: val.target.value });
                                }}
                                multiline
                            />
                        </GridItem>
                    </GridContainer>
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                        <CustomButton text={"Submit"} color={"orange"} size={"small"} onClick={this.handleClick} />
                    </div>
                </div>}
                {this.state.feedbackSubmit && !this.state.activityIndicatory &&
                <div>
                    <div style={{ minHeight: "20px" }}/>
                    <div style={{ textAlign: "center" }}>
                        Thank you for submitting feedback! We really value your opinion.
                        <br/><br/>
                        We will get back to you shortly after one of the board members processes it.
                    </div>
                    <div style={{ height: "300px" }} />
                </div>
                }

            </Template>

            <CustomFooter />
            </div>
        );
    }
}

export default contactUs;
