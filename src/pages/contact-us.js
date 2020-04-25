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
              <meta name="description" content="Virtual Campus for the Columbia Community" />
              <link rel="canonical" href="https://columbiavirtualcampus.com/" />
              <meta name="robots" content="index, follow" />
              <meta property="og:title" content="Columbia Virtual Campus" />
              <meta property="og:description" content="Virtual Campus for the Columbia Community" />
              <meta property="og:image" content='https://columbiavirtualcampus.com/static/graphic-7d5b8765ceb0dc19c9fa39db23824216.png' />
              <meta property="og:image:type" content="image/jpeg" />
              <meta property="og:image:alt" content="Columbia Virtual Campus" />
              <meta property="og:image:width" content="200" />
              <meta property="og:image:height" content="200" />
            </Helmet>
            <Card>
                <CardBody>
                    <h3 style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}><strong>Contact Us</strong></h3><br/>
                    Our email: <a style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}} href={'mailto:columbiavirtualcampus@gmail.com'}>columbiavirtualcampus@gmail.com</a>
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
