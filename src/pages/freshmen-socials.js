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
import TitleImg from "../assets/images/freshmen-socials/TitleImg.png"
import Drinks from "../assets/images/freshmen-socials/Drinks.svg"
import Sofa from "../assets/images/freshmen-socials/Sofa.svg"
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

class freshmenSocials extends React.Component {

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
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1mHRvPxdTgeQdWzQ3UgJ_5o79ahPl6A_by2-JmTOXsPs?key=" + process.env.GATSBY_GOOGLE_SHEET_KEY)
      .then(function (response) {
        response.json().then(function (data) {
          console.log("Success");
          let tutorData = that.processData(data["values"]);
          let allTutors = tutorData[0],
            tutorSearch = tutorData[1];
          that.setState({ allTutors: allTutors, tutorSearchOrg: tutorSearch, activityIndicator: false });
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
            desc: data[i][1],
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
      <Template active={"freshmen-socials"} title={""} styleContainer={{paddingLeft:0, paddingRight:0}}>
        <Helmet>
          <meta property="og:title" content="CVC Freshmen Socials" />
          <meta property="og:url" content="http://columbiavirtualcampus.com/freshmen-socials" />
          <meta property="og:description" content="Hangouts for '24 Columbia affiliated students" />
        </Helmet>

        <div style={{ backgroundColor: "white", paddingTop: "20px", paddingBottom: "20px" }}>
          <img src={TitleImg} style={{ width:'max(15vw,500px)', height:'auto', display: "block", marginLeft: "auto", marginRight: "auto"}} />

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
              <div style={{ color: "gray", fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,12px)', marginTop:'2vw'  }}>
                Introducing your upperclassmen hosts for Freshmen Socials! <br/>
              </div>
              <div style={{ color: "gray", fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,12px)', marginTop:'2vw' }}>
                These students are excited to answer your questions, ease your worries about adjusting to college life, and welcome you to the Columbia community!
              </div>
            </div>
          </GridItem>
          <GridItem xs={12} sm={3} style={{ textAlign: "center" }}>
            <img src={Sofa} style={{ width:'max(15vw,180px)', height:'auto', marginTop:'20px' , display: "block", marginLeft: "auto", marginRight: "auto"}} />
          </GridItem>
          </GridContainer>

          <GridContainer
            style={{
              marginTop: "1.5em",
              marginLeft:'auto',
              marginRight:'auto'
            }}
          >
            <GridItem xs={12} sm={3} style={{ textAlign: "center", width:'85%', marginLeft:'auto', marginRight:'auto'}}>
              <img src={Drinks} style={{ width:'max(15vw,180px)', height:'auto', marginTop:'20px', display: "block", marginLeft: "auto", marginRight: "auto" }} />
            </GridItem>
            <GridItem xs={12} sm={9}>
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
                <div style={{ color: "gray", fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,12px)', marginTop:'1vw' }}>
                  Read about their personal and academic interests here so you can indicate if you have a preference on the <a href={"https://forms.gle/XRFMobSHvnrsm3Y68"}> registration form </a>
                </div>
                <div style={{ color:"gray", fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,12px)', marginTop:'2vw'  }}>
                  <strong> We are excited to meet you soon virtually! </strong><br/>
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>

        <Heading color={"blue"} style={{ margin: "40px"}}>
          Upperclassmen Hosts
        </Heading>
        <div style={{maxWidth:"85%", marginLeft: "auto", marginRight: "auto"}} ref={this.myRef}>
          <Subtitle color={"black"}
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,16px)',
                      textAlign: "left",
                    }}>
          </Subtitle>
          <Search data={this.state.data}
                  ref={input => this.inputElement = input}
                  onClick={(val) => { this.searchFunc(val) }}
                  onCancel={() => { this.searchFunc('') }}
          />
          <br/>
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

export default withStyles(useStyles)(freshmenSocials);
