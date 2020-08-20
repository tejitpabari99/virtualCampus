import React from "react"
import TemplateResources from "../components/all/TemplateResources";
import {Title} from "../components";
import ResourcesList from "../components/resources/resourcesList/ResourcesList";
import ResourcesFeatured from "../components/resources/featured/ResourcesFeatured";
import IconButton from '@material-ui/core/IconButton';
import InstaIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default function Resources() {
    return (
        <TemplateResources active={'resources'} title={'Resources'}>
          <Title color={'blue'}>Resources</Title>
            <div style={{paddingTop: '3%'}}>
                <ResourcesFeatured />
            </div>
            <div style={{paddingLeft: '3%', paddingRight: '3%'}}>
                <ResourcesList />
            </div>

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

        </TemplateResources>
    );
}
