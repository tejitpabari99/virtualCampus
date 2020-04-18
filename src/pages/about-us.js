import React from "react"
import Template from "../components/template";
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";

import lionbase from "../assets/img/lionbase.png";

import TeamSection from "../components/about-us-sections/team.js";

import { Helmet } from 'react-helmet'

const TITLE = 'About Us'

export default function IndexPage() {
    return (
        <Template active={'about-us'}>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <link href="../assets/material-kit-assets/css/material-kit-react.css.map" rel="stylesheet"/>
            <Card>
                <CardBody>
                    <h3 style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}><strong>About Us</strong></h3>
                    <div style={{minHeight: '10px'}}/>
                    <div style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}>
                        Virtual Campus is an inclusive, vibrant hub of Columbia student voices designed to address the
                        need for community during the COVID-19 pandemic. <br/><br/>

                        Even though Columbia and Barnard students are now spread out all over the world, we are still a
                        community - here to support, engage, and enrich each other’s lives. In light of recent events,
                        most of the normal campus activities have been suspended, but we can still maintain our community
                        through virtual campus experiences. <br/><br/>

                        We welcome any and all creative contributions by the student body to be proudly displayed on our
                        landing page. Please feel free to shoot any of the founders a message, or submit your project
                        here.
                    </div>
                    <div style={{minHeight: '30px'}}/>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <h3 style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}><strong>Our Mission</strong></h3>
                    <div style={{minHeight: '10px'}}/>
                    <div style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}>
                        Let’s come together to:
                        <ol>
                            <li>Help students cope with social isolation (eg. fun activities, communication portals,
                                articles,
                                videos, etc)
                            </li>
                            <li>Help students continue to learn, work and live to the best of their abilities.</li>
                            <li>Maintain and adapt campus activities that support the community.</li>
                        </ol>
                    </div>
                    <div style={{minHeight: '30px'}}/>
                </CardBody>
            </Card>
            <div style={{minHeight: '80px'}}/>
        </Template>
    );
}
