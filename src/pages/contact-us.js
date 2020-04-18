import React from "react"
import Template from "../components/template";
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";
import { Helmet } from 'react-helmet'

const TITLE = 'Contact Us'
export default function IndexPage() {
    return (
        <Template active={'contact-us'}>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <Card>
                <CardBody>
                    <h3 style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}><strong>Contribute Your Project!</strong></h3>
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSd-EgoZRBqIgJ2P1tHtPQjT9Kz6y0r7eenkJHLcJcSpsOdrFA/viewform?embedded=true"
                        width='100%' height="571" frameBorder="0" marginHeight="0" marginWidth="0">Loading…
                    </iframe>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <h3 style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}><strong>Contact Us</strong></h3><br/>
                    Our email: <a style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}} href={'mailto:columbiavirtualcampus@gmail.com'}>virtualcampuscovid@gmail.com</a>
                    <br/><br/>
                    Our Facebook: <a style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}} href='https://bit.ly/virtual-campus-group'>https://bit.ly/virtual-campus-group</a>
                    <br/><br/>
                    Our Slack group: <a style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}} href='https://bit.ly/virtual-campus-slack'>https://bit.ly/virtual-campus-slack</a>
                    <br/><br/>
                    Our design challenge: <a style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}href='https://bit.ly/design-challenge-rsvp'>https://bit.ly/design-challenge-rsvp</a>
                </CardBody>
                <div style={{minHeight: '30px'}}/>
            </Card>
            <div style={{minHeight: '60px'}}/>
        </Template>
    );
}
