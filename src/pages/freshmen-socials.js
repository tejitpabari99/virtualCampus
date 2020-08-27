import React from "react";
import { Helmet } from "react-helmet";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Template,
  CustomButton,
  Title,
  TutorExpansionMapping,
  Search,
  TutorSearchMapping,
  CustomFooter
} from "../components";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import BLMCard from "../components/cards/BLMCard";
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
  },
  gridItem:{
    "&:hover,&:focus":
    {backgroundColor:'#F2F9FD'}
  }
})

let getLink = (name) => {
  return "https://docs.google.com/forms/d/e/1FAIpQLSeVA6xJTBy9wQgmA8e2c52hVbjLgoOhE2TDszkGiuBnFhfjmQ/viewform?usp=pp_url&entry.1746742806="+name.replace(' ', '+')+','
}

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
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1mHRvPxdTgeQdWzQ3UgJ_5o79ahPl6A_by2-JmTOXsPs/values/Sheet1!A2:F500?key=" + process.env.GATSBY_GOOGLE_SHEET_KEY)
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
      let tutors = [];
      let tutorSearch = [];
      for (let i = 0; i < data.length; i += 1) {
        if (data[i] && data[i][1]) {
          let subject = data[i][1];
          let description = "";
          if ( data[i][1] ){
            description = description + "A " + data[i][1] + " major. ";
          }
          if ( data[i][2] ){
            description = description + "At Columbia, in " + data[i][2] + ". ";
          }
          if ( data[i][3] ){
            description = description + "My hobbies are " + data[i][3] + ".";
          }
          let data_entry = {
            name: data[i][0],
            desc: description,
          };
          tutorSearch.push(data_entry);
          tutors.push(data_entry);
        }
      }
      return [tutors, tutorSearch];
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
      keys: ['desc', 'name']
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
      <div style={{backgroundColor: "white"}}>
      <Template active={"freshmen-socials"} title={""} styleContainer={{paddingLeft:0, paddingRight:0}}>
        <Helmet>
          <meta property="og:title" content="CVC Freshmen Socials" />
          <meta property="og:url" content="http://columbiavirtualcampus.com/freshmen-socials" />
          <meta property="og:description" content="Hangouts for '24 Columbia affiliated students" />
        </Helmet>

        <div style={{ backgroundColor: "white"}}>
          <Title color={"blue"}>Freshmen Socials</Title>
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
                maxWidth: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "left",
                lineHeight: "1.1em",
              }}
            >
              <div style={{ color: "black", marginBottom: "5px", fontSize:'max(14px,2vw)', lineHeight:'max(15px,2.4vw)', marginTop:'20px' }}>
                We all know how intimidating freshmen year can be. <br/>
              </div>
              <div style={{ color: "gray", fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,12px)', marginTop:'2vw'}}>
                That’s why we’re launching Freshmen Socials to help you hang out, get to know each other and build your Columbia friend web!
              </div>
            </div>
          </GridItem>
          <GridItem xs={12} sm={3} style={{ textAlign: "center" }}>
            <img src={Sofa} style={{ width:'max(16vw,180px)', height:'auto', marginTop:'20px' , display: "block", marginLeft: "auto", marginRight: "auto"}} />
          </GridItem>
          </GridContainer>

          <GridContainer
            style={{
              marginLeft:'auto',
              marginRight:'auto'
            }}
          >
            <GridItem xs={12} sm={3} style={{ textAlign: "center", width:'85%', marginLeft:'auto', marginRight:'auto', marginTop:'auto', marginBottom:'auto'}}>
              <img src={Drinks} style={{ width:'max(16vw,180px)', height:'auto', marginTop:'20px', display: "block", marginLeft: "auto", marginRight: "auto" }} />
            </GridItem>
            <GridItem xs={12} sm={9}>
              <div
                style={{
                  color:'white',
                  maxWidth: "90%",
                  marginTop:'20px',
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "left",
                  fontSize: "calc(12px + 1vw)",
                  lineHeight: "1.1em",
                }}
              >
                <Heading color={"blue"} style={{textAlign:"left"}}>
                  How it works?
                </Heading>
                <div style={{ color: "black",  marginBottom: "15px", fontSize:'max(14px,2vw)', lineHeight:'max(15px,2.4vw)'  }}>
                  To sign up, fill out <a href={"https://forms.gle/XRFMobSHvnrsm3Y68"}> this form </a> and we will match you with a group of friends.
                </div>
                <div style={{ color:"gray", fontSize:'max(1.5vw,12px)', lineHeight:'max(1.9vw,12px)', marginTop:'1vw'  }}>
                  An upperclassmen will join your call to help kickstart the conversation, hangout, and answer your questions. Read about the upperclassmen volunteers below and indicate on the form if you have a preference to pair with one of them. <br/>
                </div>
              </div>
            </GridItem>
          </GridContainer>
        </div>

        <Heading color={"blue"} style={{ margin: "10px", marginTop: "30px"}}>
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
                <div style={{ display: 'flex', flexDirection: 'horizontal', justifyContent: 'center' }}>
                    <div style={{ marginBottom: '3%' }} >
                      <TutorSearchMapping tutorSearch={this.state.tutorSearch} />
                    </div>
                </div>

              </div>
            </div> :
            this.state.tutorSearchError ?
              <div style={{ width: '100%', textAlign: 'center', color: 'red' }}>{this.state.tutorSearchError}</div> :
              <div style={{ display: 'flex', flexDirection: 'horizontal', justifyContent: 'center' }}>
                <div style={{ maxWidth: '85%' }}>
                  <div style={{ marginBottom: '3%' }} >
                  {this.state.allTutors &&
                    <GridContainer style={{marginTop:"10px"}}>
                      {this.state.allTutors.map((ele,ind)=>{
                          return (
                            <GridItem xs={12} sm={12} md={12} className={classes.gridItem}
                                      style={{paddingTop:10, paddingBottom: 10, paddingLeft:25, paddingRight:25}}>
                              <BLMCard
                                website={getLink(ele.name)}
                                title={ele.name}
                                description={ele.desc}
                              />
                            </GridItem>
                          )
                        }
                      )}
                    </GridContainer>
                  }
                  </div>
                </div>
              </div>
          }
        </div>
        }
      </Template>
        <CustomFooter />
      </div>
    );
  }
}

export default withStyles(useStyles)(freshmenSocials);
