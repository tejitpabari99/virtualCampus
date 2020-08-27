import React from "react"
import {CustomFooter, MetaData, TeamSection, Template, Title} from "../components";
import IconButton from '@material-ui/core/IconButton';
import InstaIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default function IndexPage() {
    return (
        <div style={{backgroundColor: "white"}} >
            <Template active={'about-us'} title={'About Us'}>
                <div style={{textAlign:'center', width:'60%', marginLeft:'auto', marginRight:'auto', marginTop:'5%'}}>
                  <Title>About Us</Title>
                    <div>
                        <div style={{minHeight: '20px'}}/>
                        <h6 style={{textAlign:'center', color:"#999", fontSize: "18px", textTransform:"none"}}>
                            We created Columbia Virtual Campus at a time when remote living posed challenges for many students across
                            the world who no longer had access to the resources and liveliness that one finds on campus.
                            Through this website, we hope to recreate a sense of community, purpose, and normalcy for students
                            that are now spread across the world.
                        </h6>
                    </div>
                </div>

                <div style={{minHeight: '80px'}}/>

              <Title>Our Team</Title>
                <TeamSection />
                <div style={{minHeight: '60px'}}/>

            </Template>
            <CustomFooter />
        </div>
    );
}
