import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MetaData, BLMCard, EventCard, EventModal, Template, CustomButton, Title } from "../../components";
import TZ from "countries-and-timezones";
import AddIcon from "@material-ui/icons/Add";
import firebase from "../../firebase";
import Iframe from 'react-iframe';
import GridItem from "../../components/material-kit-components/Grid/GridItem.js";
import GridContainer from "../../components/material-kit-components/Grid/GridContainer.js";


class cvcBlm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: null,
      count: 0,
      myEventsList: [],
      displayEvents: [],
      allTutors: [],

    };

    let currentComponent = this;
    fetch('https://sheets.googleapis.com/v4/spreadsheets/1YvtL6WqJAXR1ByDbcYemUr_DjUgwQ1Lwn6pfoQW4JEA/values/Sheet1!A2:E40?key=AIzaSyBTFCyJxfKW4sTDM_oJ8I_mkblJWiVWxpw')
            .then(function(response) {
              response.json().then(function(data) {

                  currentComponent.setState({allTutors:data["values"]})
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
  };


  // request = gapi.client.sheets.spreadsheets.values.batchGet(this.state.params)
  // .then(function(response) {
  //   // TODO: Change code below to process the `response` object:
  //   console.log(response.result);
  // }).catch(function(reason) {
  //   console.error('error: ' + reason.result.error.message);
  // });

  render() {

    console.log(this.state.allTutors)
    return (
      <Template active={"schedule"} title={"Events"}>
      <Title color={"blue"}>Learn and Donate</Title>

        <div style={{ textAlign: "center" }}>
          The Black Lives Matter movement is canfer please fill out something about the movement
          <br/>
          and its relevance at this moment. Also fix the other descriptions please.
          <br/>
          <br/>
          In order to support the movement, students and faculty at Columbia have offered to provide
          <br/>
          1:1 workshops, tutorials, and mentorship in exchange for a donation.
          <br/>
          <br/>
          The spreadsheet below lists available mentors. To sign up please make a donation to XXX organization.
          <br/>
          When you select an event, enter your email and upload a screenshot of your donation reciept and
          <br/>
          we will email you the Zoom link.
        </div>
        <br/>

        <GridContainer>

            {this.state.allTutors.map((ele,inde) => {
              return (
                <GridItem xs={6} sm={4} md={2}>
                  <BLMCard
                      website={ele[0]}
                      img={"https://i.imgur.com/2TtXDeX.jpg"}
                      title={ele[0]}
                      description={ele[0]}
                      iosLink={ele[0]}
                      androidLink={ele[0]}
                      tags={[ele[0]]}
                      share/>
                </GridItem>
                )
            })}


        </GridContainer>


        <div style={{display:"flex", justifyContent:"center"}}>
          <Iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTYFkksXtBunSIhpYZus5Bw6h3rbGH5eac29gOM14cCQmhLyVMl_AP2herWTshzp4syNjf0keLm9sUL/pubhtml?gid=646327213&amp;single=true&amp;widget=true&amp;headers=false"
                  width={'90%'} height={'600px'}/>
        </div>
      </Template>
    );
  }
}

export default cvcBlm;
