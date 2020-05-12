import React from "react"
import Template from "../components/all/Template";
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";
import {MetaData} from '../components'

export default function IndexPage() {
    return (
        <Template active={'contact-us'}>
            <MetaData title={'Contact Us'}/>
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
            <div style={{minHeight: '400px'}}/>
        </Template>
    );
}
