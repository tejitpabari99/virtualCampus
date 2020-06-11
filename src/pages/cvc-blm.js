import React from "react";
import { Helmet } from "react-helmet";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Template, CustomButton, Title, TutorExpansionMapping, Search, TutorSearchMapping } from "../components";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import Subtitle from "../components/text/Subtitle";
import Heading from "../components/text/Heading";
import Group1 from "../assets/images/blm/Group 1.png"
import Group2 from "../assets/images/blm/Group 2.png"
import Group3 from "../assets/images/blm/Group 3.png"
import Group4 from "../assets/images/blm/Group 4.png"
import Group34 from "../assets/images/blm/Group 34.png"
import { CircularProgress } from '@material-ui/core';
import firebase from '../firebase'
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";
import CardHeader from "../components/material-kit-components/Card/CardHeader.js";
import Link from '@material-ui/core/Link';

import Fuse from 'fuse.js';
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = () => ({
  links:{
    color: '#0072CE',
    "&:hover":{
      color:'#1D2C4D',
      cursor:'pointer'
    }
  }
})

class cvcBlm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allTutors: {},
      tutorSearch: [],
      tutorSearchOrg: [],
      searchVal: "",
      activityIndicator: true,
      tutorSearchError: '',
      donationCompleted: 0,
      donationGoal: 0,
      donationReceived: 0,
      tutorsPop: {},
      tutorsAllSec: {},
      defaultSearchInput:'',
      inputElement:null
    };

    this.fetchData = this.fetchData.bind(this);
    this.processData = this.processData.bind(this);
    this.searchFunc = this.searchFunc.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);
    this.fetchDonationCompletedData = this.fetchDonationCompletedData.bind(this);

    // this.fetchDonationCompletedData();
    this.fetchData();
  };

  async fetchDonationCompletedData() {
    let db = firebase.firestore();
    try {
      const response = await db.collection('pop-up').doc('blm').get();
      const responseData = response.data();
      const donationGoal = parseInt(responseData.donationGoal);
      const donationReceived = parseInt(responseData.donationReceived);
      this.setState({
        donationCompleted: parseInt((donationReceived * 100) / donationGoal),
        donationReceived: donationReceived, donationGoal: donationGoal
      });
    }
    catch (e) {
      console.log('Progress Error', e)
    }
  }


  fetchData() {
    let that = this;
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1lKaDRHeC2NHewyeh87podHwo1Ya4qAtYr9VAYI71s50/values/Tutor Profiles!A2:F500?key=" + process.env.GATSBY_GOOGLE_SHEET_KEY)
      .then(function (response) {
        response.json().then(function (data) {
          console.log("Success");
          let tutorData = that.processData(data["values"]);
          let allTutors = tutorData[0],
            tutorSearch = tutorData[1];
          let subjects = ["College Experience", "Jobs and Internship Applications: Interviews, Resumes, Networking", "Writing/Editing Help", "Programming", "Undergrad/Grad admissions", "Research"];
          that.setState({ allTutors: allTutors, tutorSearchOrg: tutorSearch, activityIndicator:false});
          let tutorsPop = {};
          let tutorsAllSec = {};
          for (let key in allTutors) {
            if (allTutors.hasOwnProperty(key)) {
              if (subjects.includes(key)) { tutorsPop[key] = allTutors[key] }
              else { tutorsAllSec[key] = allTutors[key] }
            }
          }
          that.setState({ tutorsPop: tutorsPop, tutorsAllSec: tutorsAllSec });
        });
      })
      .catch(error => {
        this.setState({ activityIndicator: false });
        console.error("There was an error!", error);
      });
  };

  processData(data) {
    if (data) {
      let new_dict = {};
      let tutorSearch = [];
      for (let i = 0; i < data.length; i += 1) {
        if (data[i] && data[i][1]) {
          let subject = data[i][1];
          let data_entry = {
            name: data[i][0],
            subject: data[i][1],
            desc: data[i][2],
            profile: data[i][3],
            resume: data[i][4],
            website: data[i][5]
          };
          if (new_dict.hasOwnProperty(subject)) {
            new_dict[subject].push(data_entry);
          } else {
            new_dict[subject] = [data_entry];
          }
          tutorSearch.push(data_entry);
        }
      }
      return [new_dict, tutorSearch];
    }
    return [{}, {}];
  }

  searchFunc(val, changeDefaultSearchVal=true) {
    if(changeDefaultSearchVal){
      this.setState({defaultSearchInput:''});
    }
    if(!val || val.length===0){
      return this.setState({tutorSearch:[], activityIndicator:false, tutorSearchError:''});
    }
    else if(val.length<=2){
      return this.setState({tutorSearch:[], activityIndicator:false, tutorSearchError:'Search term must be more than 2 characters'});
    }

    this.setState({activityIndicator:true});
    const options = {
      threshold: 0.2,
      distance: 1000,
      keys: ['desc', 'subject', 'name']
    };

    const fuse = new Fuse(this.state.tutorSearchOrg, options);
    const output = fuse.search(val);
    const tutorSearch = [],
      tutorSearchTab = {};
    for (let i = 0; i < output.length; i += 1) {
      if (output[i].item.name && !tutorSearchTab.hasOwnProperty(output[i].item.name)) {
        tutorSearch.push(output[i]);
        tutorSearchTab[output[i].item.name] = 0;
      }
    }
    if (!tutorSearch || tutorSearch.length <= 0) {
      return this.setState({ tutorSearch: [], activityIndicator: false, tutorSearchError: 'No Results found' });
    }
    this.setState({ tutorSearch: tutorSearch, activityIndicator: false, tutorSearchError: '' });
  }

  setSearchInput(input){
    this.setState({defaultSearchInput:input});
    this.inputElement.state.searchVal = input;
    this.inputElement.props.onClick(input);
  }

  render() {
    const {classes} = this.props;
    return (
      <Template active={"cvc-blm"} title={"#BLM"}>
        <Helmet>
          <meta property="og:title" content="Columbia Virtual Campus #BLM" />
          <meta property="og:url" content="http://columbiavirtualcampus.com/cvc-blm" />
          <meta property="og:description" content="Support the Black Community" />
        </Helmet>
        <div style={{marginBottom:20, width:'100%'}}>
          {
            this.state.donationCompleted !== 0 &&
            <div style={{ maxWidth: "70%", marginLeft: "auto", marginRight: "auto", }}>
              <Heading color={"blue"} style={{ marginTop: "10px" }}>
                Donation Received
              </Heading>
              <div style={{ display: 'inline' }}>
                <LinearProgress variant="determinate" value={this.state.donationCompleted}
                  style={{ width: '90%', display: 'inline-block', marginRight: 10, verticalAlign: 'middle' }} />
                <span>${this.state.donationReceived} of {this.state.donationGoal}</span>
              </div>

            </div>
          }
        </div>

        <div style={{ backgroundColor: "black", paddingTop: "40px", paddingBottom: "40px" }}>
          <Title color={"blue"}>#BLM</Title>
          <GridContainer
            style={{
              maxWidth: "90%",
              display: "flex",
              flexDirection: "horizontal",
              justifyContent: "space-between",
              marginTop: "2em",
            }}
          >
            <GridItem xs={12} sm={9}>
              <Subtitle
                color={"white"}
                style={{
                  maxWidth: "70%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "left",
                  fontSize: "calc(12px + 1vw)",
                  lineHeight: "1.1em",
                }}
              >
                <div style={{ marginBottom: "15px" }}>
                  In light of the recent murders of George Floyd, Ahmaud Arbery,
                  and Breonna Taylor, Columbia Virtual Campus stands in solidarity
                  with black students, faculty, staff, and affiliates.
              </div>
                <div style={{ color: "gray" }}>
                  We recognize the horrific history of antiblack racism worldwide,
                  and through our tutoring program, we hope to uplift black voices
                  and provide financial support for organizations led by and in
                  support of black people.
              </div>
              </Subtitle>
            </GridItem>
            <GridItem xs={12} sm={3} style={{ textAlign: "left" }}>
              <img src={Group1} style={{ maxWidth: "80%", height: "auto" }} />
            </GridItem>
          </GridContainer>
          <Title color={"blue"} style={{ marginTop: "3em" }}>
            Our Tutoring Program
        </Title>
          <Subtitle color={"white"} style={{ fontSize: "28px", lineHeight: "1em" }}>
            What we are doing to support the movement.
        </Subtitle>
          <GridContainer
            style={{
              maxWidth: "90%",
              display: "flex",
              flexDirection: "horizontal",
              justifyContent: "space-between",
              marginTop: "5em",
            }}
          >
            <GridItem xs={12} sm={6} style={{ textAlign: "right" }}>
              <img src={Group34} style={{ maxWidth: "70%", height: "auto" }} />
            </GridItem>
            <GridItem xs={12} sm={6}>
              <Subtitle
                color={"white"}
                style={{
                  maxWidth: "70%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  lineHeight: "1.1em",
                  textAlign: "left",
                  fontSize: "calc(12px + 1vw)",
                }}
              >
                <div style={{ color: "white", marginBottom: "15px" }}>
                  DONATE WHAT YOU CAN for 30 minutes with any tutor!
              </div>
                <div style={{ color: "#0072CE", marginBottom: "15px" }}>
                  Through our tutoring program, you can recieve academic mentorship while donating to Black Lives Matter causes.
              </div>
                <div style={{ color: "gray", marginBottom: "15px" }}>
                  Columbia Virtual Campus is offering a one-on-one mentorship service in which 100% of fees are donated to
                  organizations supporting the black community.
              </div>
              </Subtitle>
            </GridItem>
          </GridContainer>

          <Title color={"blue"} style={{ marginTop: "3em" }}>How to Sign Up</Title>
          <div style={{ display: "flex", flexDirection: "horizontal", justifyContent: "center", marginTop: 10 }}>
            <GridContainer
              spacing={2}
              style={{
                maxWidth: "90%", display: "flex", flexDirection: "horizontal",
                justifyContent: "space-between", marginTop: 0
              }}>
              <GridItem xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
                <Card style={{ paddingTop: "30px", height: "90%" }}>
                  <CardHeader>
                    <img src={Group3} style={{ maxWidth: "100%", height: "auto" }} />
                  </CardHeader>
                  <CardBody>
                    <div style={{ fontSize: "20px" }}> Step 1: </div>
                    <Subtitle color={"blue"} style={{ fontSize: "36px" }}> Book a tutor  </Subtitle>
                    <div style={{ marginBottom: "2em", fontSize: "20px" }}>
                      Choose a tutor from the list below and register for an available time.
                      Click on their name to see their schedules as well as their profile and resume!
                    </div>
                    <div style={{ textAlign: "center", marginBottom: "20px" }}>
                      <CustomButton text={"Sign up for classes"} size={"medium"} color={"orange"} />
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
                <Card style={{ paddingTop: "100px", height: "90%" }}>
                  <CardHeader>
                    <img src={Group4} />
                  </CardHeader>
                  <CardBody>
                    <div style={{ fontSize: "20px" }}> Step 2: </div>
                    <Subtitle color={"blue"} style={{ fontSize: "36px" }}> Donate  </Subtitle>
                    <div style={{ marginBottom: "20px", fontSize: "20px" }}>
                      DONATE WHAT YOU CAN to the approved organization listed in your tutoring session confirmation email.
                      Each donation grants you access to 30 minutes of mentorship.
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
                <Card style={{ paddingTop: "90px", height: "90%" }}>
                  <CardHeader>
                    <img src={Group2} />
                  </CardHeader>
                  <CardBody>
                    <div style={{ fontSize: "20px" }}> Step 3: </div>
                    <Subtitle color={"blue"} style={{ fontSize: "36px" }}> Email Receipt  </Subtitle>
                    <div style={{ marginBottom: "20px", fontSize: "20px" }}>
                      Reply to your tutoring session confirmation email from columbiavirtualcampus@gmail.com with your
                      donation receipt to access your session with ease. You’re all set to see your tutor!
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        
        <Heading color={"blue"} style={{ marginTop: "60px" }}>
          Available Sessions
        </Heading>
        <Subtitle color={"black"}
          style={{
            maxWidth: "65%",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "18px",
            lineHeight: "28px"
          }}>
          For each section, these vounteers are willing to provide tutoring,
          review/edit your work, or answer any questions within that domain.
          Click on their names to know their schedules
        </Subtitle>


        <div style={{ marginBottom: 30, textAlign: "center" }}>

          <Search data={this.state.data}
                  ref={input => this.inputElement = input}
                  onClick={(val) => {this.searchFunc(val)}}
                  onCancel={()=> {this.searchFunc('')}}
          />
          <div style={{textAlign:'center', marginTop: 20, fontSize:20}}>Click on a Tutor's name to book them</div>
        </div>
        {this.state.activityIndicator &&
          <CircularProgress style={{ marginLeft: '50%' }} />
        }
        {!this.state.activityIndicator &&
          <div>
            {this.state.tutorSearch.length > 0 && !this.state.tutorSearchError ?
              <div style={{ display: 'flex', flexDirection: 'horizontal', justifyContent: 'center' }}>
                <div style={{ width: '85%' }}>
                  <TutorSearchMapping tutorSearch={this.state.tutorSearch} />
                </div>
              </div> :
              this.state.tutorSearchError ?
                <div style={{ width: '100%', textAlign: 'center', color: 'red' }}>{this.state.tutorSearchError}</div> :
                <div style={{ display: 'flex', flexDirection: 'horizontal', justifyContent: 'center' }}>
                  <div style={{ maxWidth: '85%' }}>
                    <div style={{ marginBottom: '3%' }} >
                      <Subtitle color={"black"}
                        style={{
                          maxWidth: "65%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          fontSize: "18px",
                          lineHeight: "28px"
                        }}>
                        Most Popular
                      </Subtitle>
                      <TutorExpansionMapping allTutors={this.state.tutorsPop} /></div>
                    <Subtitle color={"black"}
                      style={{
                        maxWidth: "65%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        fontSize: "18px",
                        lineHeight: "28px"
                      }}>
                      All Sessions
                    </Subtitle>
                    <TutorExpansionMapping allTutors={this.state.allTutors} />
                  </div>
                </div>
            }
          </div>

        }
      </Template>
    );
  }
}

export default withStyles(useStyles)(cvcBlm);
