import React from "react";
import { Helmet } from "react-helmet";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Template, CustomButton, Title, TutorExpansionMapping, Search, TutorSearchMapping } from "../components";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import Subtitle from "../components/text/Subtitle";
import Heading from "../components/text/Heading";
import Group1 from "../assets/images/blm/Group 1.png"
import Group34 from "../assets/images/blm/Group 34.png"
import Group66 from "../assets/images/blm/Group 66.png"
import { CircularProgress } from '@material-ui/core';
import firebase from '../firebase'

import Fuse from 'fuse.js';
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = () => ({
  CustomButtons: {
    color: '#0072CE',
    "&:hover": {
      color: '#1D2C4D',
      cursor: 'pointer'
    }
  }
})

const companies={
  "Microsoft":"Microsoft",
  "Facebook":"Facebook",
  "Google":"Google",
  "Paypal":"Paypal",
  "Reddit":"Reddit",
  "MongoDB":"Mongo",
  "Blizzard":"Blizzard",
  "Activision":"Activision",
  "Rockstar Games":"Rockstar",
  "Ernst & Young":"Ernst",
  "Bank of America":"America",
  "Goldman Sachs":"Goldman",
  "McKinsey":"McKinsey",
  "Mercer":"Mercer",
  "Deloitte":"Deloitte",
  "Johnson & Johnson": "Johnson",
  "Thrive Global":"Thrive",
  "Exxon Mobil":"Exxon",
  "BASF":"BASF",
  "Joe Biden":"Biden",
  "Saturday Night Live":"Saturday",
  "The Observer":"Observer",
  "Esquire":"Esquire",
};

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
      defaultSearchInput: '',
      inputElement: null
    };

    this.fetchData = this.fetchData.bind(this);
    this.processData = this.processData.bind(this);
    this.searchFunc = this.searchFunc.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);
    this.fetchDonationCompletedData = this.fetchDonationCompletedData.bind(this);

    // this.fetchDonationCompletedData();
    this.fetchData();
    this.myRef = React.createRef()  
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
          that.setState({ allTutors: allTutors, tutorSearchOrg: tutorSearch, activityIndicator: false });
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

  searchFunc(val, changeDefaultSearchVal = true) {
    if (changeDefaultSearchVal) {
      this.setState({ defaultSearchInput: '' });
    }
    if (!val || val.length === 0) {
      return this.setState({ tutorSearch: [], activityIndicator: false, tutorSearchError: '' });
    }
    else if (val.length <= 2) {
      return this.setState({ tutorSearch: [], activityIndicator: false, tutorSearchError: 'Search term must be more than 2 characters' });
    }

    this.setState({ activityIndicator: true });
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

  setSearchInput(input) {
    this.setState({ defaultSearchInput: input });
    this.inputElement.state.searchVal = input;
    this.inputElement.props.onClick(input);
  }

  scrollToMyRef() {
    window.scrollTo(0, this.myRef.current.offsetTop);
  }

  render() {
    const { classes } = this.props;
    return (
      <Template active={"cvc-blm"} title={"#BLM"} styleContainer={{paddingLeft:0, paddingRight:0}}>
        <Helmet>
          <meta property="og:title" content="Columbia Virtual Campus #BLM" />
          <meta property="og:url" content="http://columbiavirtualcampus.com/cvc-blm" />
          <meta property="og:description" content="Support the Black Community" />
        </Helmet>

        <div style={{ backgroundColor: "black", paddingTop: "40px", paddingBottom: "60px" }}>
          <Title color={"blue"}>#BLM</Title>
          <GridContainer
            style={{
              marginTop: "1.5em",
              marginLeft:'auto',
              marginRight:'auto'
            }}
          >
            <GridItem xs={12} sm={9}>
              <div
                style={{
                  color:'white',
                  maxWidth: "85%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "left",
                  lineHeight: "1.1em",
                }}
              >
                <div style={{ marginBottom: "15px", fontSize:'max(14px,2vw)', lineHeight:'max(15px,2.4vw)', marginTop:'20px' }}>
                  In light of the recent murders of George Floyd, Ahmaud Arbery,
                  and Breonna Taylor, Columbia Virtual Campus stands in solidarity
                  with black students, faculty, staff, and affiliates.
                </div>
                <div style={{ color: "gray", fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,12px)', marginTop:'2vw' }}>
                  We recognize the horrific history of antiblack racism worldwide,
                  and through our tutoring program, we hope to uplift black voices
                  and provide financial support for organizations led by and in
                  support of black people.
                </div>
              </div>
            </GridItem>
            <GridItem xs={12} sm={3} style={{ textAlign: "center" }}>
              <img src={Group1} style={{ width:'max(15vw,180px)', height:'auto', marginTop:'20px' }} />
            </GridItem>
          </GridContainer>
          <GridContainer
            style={{ marginTop: "5vw", }}
          >
            <GridItem xs={12} sm={5} style={{ textAlign: "center", width:'85%', marginLeft:'auto', marginRight:'auto'}}>
                <img src={Group34} style={{ maxWidth: "100%",height: "auto", width:"72%", marginTop:'20px'}} />
                <br/>
                <div style={{marginTop:"1em"}}>
                  <CustomButton style={{margin:"1em", width: "13em"}} text={"Microsoft"}
                                color={'orangeInvert'} size={'medium'} onClick={() => { this.scrollToMyRef(); this.setSearchInput('Microsoft');}}/>
                  <CustomButton style={{margin:"1em", width: "13em"}} text={"Google"}
                                color={'orangeInvert'} size={'medium'} onClick={() => { this.scrollToMyRef(); this.setSearchInput('Google')}}/>
                  <CustomButton style={{margin:"1em", width: "13em"}} text={"Goldman Sachs"}
                                color={'orangeInvert'} size={'medium'} onClick={() => { this.scrollToMyRef(); this.setSearchInput('Goldman')}}/>
                  <CustomButton style={{margin:"1em", width: "13em"}} text={"McKinsey"}
                                color={'orangeInvert'} size={'medium'} onClick={() => { this.scrollToMyRef(); this.setSearchInput('McKinsey')}}/>
                  <CustomButton style={{margin:"1em", width: "13em"}} text={"Blizzard"}
                                color={'orangeInvert'} size={'medium'} onClick={() => { this.scrollToMyRef(); this.setSearchInput('Blizzard')}}/>
                  <CustomButton style={{margin:"1em", width: "13em"}} text={"The Observer"}
                                color={'orangeInvert'} size={'medium'} onClick={() => { this.scrollToMyRef(); this.setSearchInput('The Observer')}}/>
              </div>
            </GridItem>
            <GridItem xs={12} sm={7}>
              <div
                style={{
                  color:'white',
                  maxWidth: "85%",
                  marginTop:'20px',
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "left",
                  fontSize: "calc(12px + 1vw)",
                  lineHeight: "1.1em",
                }}
              >
                <Title color={"blue"} style={{marginBottom:'3vw', fontSize:'max(3vw, 24px)', textAlign:'left'}}>Our Mentorship Program</Title>
                <div style={{ marginBottom: "15px", fontSize:'max(14px,2vw)', lineHeight:'max(15px,2.4vw)' }}>
                  <strong> DONATE WHAT YOU CAN </strong><br/> for 30 minutes with any mentor!
                </div>
                <div style={{ color: "gray", fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,12px)', marginTop:'1vw' }}>
                  Columbia Virtual Campus is offering a one-on-one mentorship service in which 100% of fees are donated to
                  organizations supporting the black community.
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>
        <div style={{background:`url(${Group66}) no-repeat`, width:"100%", backgroundSize:"100%",}}> 
          <GridContainer style={{marginTop: 0, marginBottom: 0}}>
            <GridItem xs={2}></GridItem>
            <GridItem xs={2} style={{paddingLeft: 0, paddingRight: 0}}>
              <Subtitle color={"black"} style={{fontSize:'max(1.5vw,12px)'}}>total donations</Subtitle>
            </GridItem>
            <GridItem xs={3} style={{paddingLeft: 0, paddingRight: 0}}>
              <Title color={"black"} style={{marginBottom:"20px", fontSize:'max(4vw,28x)'}}>$1100</Title>
            </GridItem>
            <GridItem xs={2} style={{paddingLeft: 0, paddingRight: 0}}>
              <Subtitle color={"black"}  style={{fontSize:'max(1.5vw,12px)'}}>and counting!</Subtitle>
            </GridItem>
            <GridItem xs={2} ></GridItem>
          </GridContainer>
        </div>
        <Heading color={"blue"} style={{ margin: "40px" }}>
          Available Sessions
        </Heading>
        <div style={{maxWidth:"85%", marginLeft: "auto", marginRight: "auto"}} ref={this.myRef}>
          <Subtitle color={"black"}
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,16px)',
                      textAlign: "left",
                    }}>
            <ol style={{paddingLeft:'15px'}}>
              <li><strong> Choose a mentor </strong> from below and register for a time. </li>
              <li><strong> Receive an email </strong> with a CustomButton to make your donation before you begin your session. </li>
              <li><strong> Donate any amount </strong> to access your session with these amazing mentors! </li>
            </ol>
          </Subtitle>
          <Search data={this.state.data}
                  ref={input => this.inputElement = input}
                  onClick={(val) => { this.searchFunc(val) }}
                  onCancel={() => { this.searchFunc('') }}
          />
          <br/>
          <GridContainer style = {{marginTop:"2em", paddingLeft:15, paddingRight:0}}>
            <GridItem xs={12} sm={2} style={{paddingRight:0}}>
              Filter by company:
            </GridItem>
            <GridItem xs={12} sm={10} style={{paddingLeft:0}}>
              {Object.keys(companies).map((value, index) =>
                <CustomButton text={value} color={'blue'} key={index} style={{
                  fontSize: "0.7em", margin: "0.5em"}} onClick={() => { this.setSearchInput(companies[value]) }}/>
              )}
            </GridItem>
          </GridContainer>
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
                                maxWidth: "70%",
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