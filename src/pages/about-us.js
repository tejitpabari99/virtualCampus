import React from "react"
import Template from "../components/template";

import TeamSection from "../components/about-us-sections/TeamSection.js";

import { Helmet } from 'react-helmet'
import { makeStyles } from "@material-ui/core/styles";
// <link href="../assets/material-kit-assets/css/material-kit-react.css.map" rel="stylesheet"/>

const custClass = makeStyles(() => ({
    toAll:{
        fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.25em',
        WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', margin:"0px"
    }
}));

const TITLE = 'About Us';
export default function IndexPage() {

    const custStyle = custClass();
    return (
        <Template active={'about-us'}>
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
            <div style={{textAlign:'center', width:'60%', marginLeft:'auto', marginRight:'auto', marginTop:'5%'}}>
                <h3 style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }}
                    className={custStyle.toAll}> ABOUT US
                </h3>
                <div>
                    <div style={{minHeight: '20px'}}/>
                    <div style={{fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif', textAlign:'center', color:"#999"}}>
                        We created Columbia Virtual Campus at time when remote living posed challenges for many students across
                        the world who no longer had access to the resources and liveliness that one finds on campus.
                        Through this website, we hope to recreate a sense of community, purpose, and normalcy for students
                        that are now spread across the world.
                    </div>
                </div>
            </div>
            <div style={{minHeight: '80px'}}/>

            <h3 style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }}
                className={custStyle.toAll}> OUR TEAM
            </h3>
            <TeamSection ></TeamSection>
            <div style={{minHeight: '60px'}}/>
        </Template>
    );
}
