import React from "react"
import {MetaData, TeamSection, Template, Title} from "../components";
import IconButton from '@material-ui/core/IconButton';
import InstaIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default function IndexPage() {
    return (
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

            <div style={{width: "130%", height: "250px", backgroundColor: "#0072CE", color: "white", marginTop: "100px", marginLeft: "-20%"}} />
                <h2 style={{color: "white", fontSize: "36px", marginTop: "-180px", marginLeft: "80px"}}> Columbia Virtual Campus </h2>
                <h2 style={{color: "white", fontSize: "26px", marginTop: "0px", marginLeft: "80px"}}> Columbia, <i>virtually</i>.</h2>
            <div style={{color: "white", marginTop: "-105px", fontSize: "14px", marginLeft: "780px"}}>
                <a href={""} style={{color: "white"}}> Home </a> <br/>
                <a href={"/coding-interviews"} style={{color: "white"}}> Coding Interviews </a> <br/>
                <a href={"/events"} style={{color: "white"}}> Socialize </a> <br/>
                <a href={"/resources"} style={{color: "white"}}> Resources </a> <br/>
                <a href={"/about-us"} style={{color: "white"}}> About Us </a> <br/>
                <a href={"/contact-us"} style={{color: "white"}}> Contact Us </a> <br/>
            </div>

            <div style={{color: "white", marginTop: "-145px", fontSize: "14px", marginLeft: "980px"}}>
                <a href={"/events/add-new-event"} style={{color: "white"}}> Host an Event </a> <br/>
                <a href={"/resources/add-new-resource"} style={{color: "white"}}> Add a Resource </a> <br/>
                <a href={"/coding-interviews/add-interviewer"} style={{color: "white"}}> Be a Mock Interviewer </a> <br/>
            </div>

            <div>
              <IconButton style={{marginLeft: "1200px", marginTop: "-100px", width: "100px", height: "100px", marginBottom: "-20px"}} href={"https://www.instagram.com/columbiavirtualcampus/"}>
                  <InstaIcon style={{color: "white", fontSize: 70}}/>
              </IconButton>
              <IconButton style={{marginLeft: "1290px", marginTop: "-150px", width: "100px", height: "100px", marginBottom: "-20px"}} href={"https://www.facebook.com/columbiavirtualcampus/"}>
                  <FacebookIcon style={{color: "white", fontSize: 70}}/>
              </IconButton>
              <IconButton style={{marginLeft: "1380px", marginTop: "-200px", width: "100px", height: "100px", marginBottom: "-20px"}} href={"https://www.linkedin.com/company/columbia-virtual-campus/"}>
                  <LinkedInIcon style={{color: "white", fontSize: 70}}/>
              </IconButton>
              <IconButton style={{marginLeft: "1470px", marginTop: "-245px", width: "100px", height: "100px", marginBottom: "-20px"}} href={"mailto:columbiavirtualcampus@gmail.com"}>
                  <MailOutlineIcon style={{color: "white", fontSize: 70}}/>
              </IconButton>
            </div>

        </Template>
    );
}
