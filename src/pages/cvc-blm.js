import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Template, CustomButton, Title, TutorExpansionMapping, Search, TutorSearchMapping } from "../components";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import Subtitle from "../components/text/Subtitle";
import Heading from "../components/text/Heading";
import { CircularProgress } from '@material-ui/core';
import firebase from '../firebase'
import Card from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';

import Fuse from 'fuse.js';
import LinearProgress from "@material-ui/core/LinearProgress";


class cvcBlm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allTutors:{},
      tutorSearch: [],
      tutorSearchOrg:[],
      searchVal: "",
      activityIndicator:true,
      tutorSearchError:'',
      donationCompleted:0,
      donationGoal:0,
      donationReceived: 0,
      tutorsPop: {},
      tutorsAllSec: {}
    };

    this.fetchData = this.fetchData.bind(this);
    this.processData = this.processData.bind(this);
    this.searchFunc = this.searchFunc.bind(this);
    this.fetchDonationCompletedData = this.fetchDonationCompletedData.bind(this);

    // this.fetchDonationCompletedData();
    this.fetchData();
  };

  async fetchDonationCompletedData(){
    let db = firebase.firestore();
    try{
      const response = await db.collection('pop-up').doc('blm').get();
      const responseData = response.data();
      const donationGoal = parseInt(responseData.donationGoal);
      const donationReceived = parseInt(responseData.donationReceived);
      this.setState({donationCompleted:parseInt((donationReceived*100)/donationGoal),
        donationReceived:donationReceived, donationGoal:donationGoal});
    }
    catch (e) {
      console.log('Progress Error', e)
    }
  }


  fetchData() {
    let that = this;
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1lKaDRHeC2NHewyeh87podHwo1Ya4qAtYr9VAYI71s50/values/Tutor Profiles!A2:F500?key=" + process.env.GATSBY_GOOGLE_SHEET_KEY)
      .then(function(response) {
        response.json().then(function(data) {
          console.log("Success");
          let tutorData = that.processData(data["values"]);
          let allTutors = tutorData[0],
            tutorSearch = tutorData[1];
          let subjects = ["College Experience", "Jobs and Internships", "Writing/Editing Help", "Programming", "Undergrad/Grad admissions"];
          that.setState({ allTutors: allTutors, tutorSearchOrg: tutorSearch, activityIndicator:false});
          let tutorsPop = {};
          let tutorsAllSec = {};
          for(let key in allTutors) {
            if(allTutors.hasOwnProperty(key)){
              if(subjects.includes(key)){tutorsPop[key] = allTutors[key]}
              else{tutorsAllSec[key] = allTutors[key]}
            }
          }
          that.setState({ tutorsPop: tutorsPop, tutorsAllSec: tutorsAllSec});
        });
      })
      .catch(error => {
        this.setState({activityIndicator:false});
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
    return [{},{}];
  }

  searchFunc(val) {
    if(!val || val.length<=2){
      return this.setState({tutorSearch:[], activityIndicator:false, tutorSearchError:'Search term must be more than 2 characters'});
    }
    this.setState({activityIndicator:true});
    const options = {
      threshold:0.2,
      distance:1000,
      keys: ['desc', 'subject', 'name']
    };

    const fuse = new Fuse(this.state.tutorSearchOrg, options);
    const output = fuse.search(val);
    const tutorSearch = [],
     tutorSearchTab = {};
    for(let i=0; i<output.length; i+=1){
      if(output[i].item.name && !tutorSearchTab.hasOwnProperty(output[i].item.name)){
        tutorSearch.push(output[i]);
        tutorSearchTab[output[i].item.name]=0;
      }
    }
    if(!tutorSearch || tutorSearch.length<=0){
      return this.setState({tutorSearch:[], activityIndicator:false, tutorSearchError:'No Results found'});
    }
    this.setState({tutorSearch:tutorSearch, activityIndicator:false, tutorSearchError:''});
  }

  render() {
    return (
      <Template active={"cvc-blm"} title={"#BLM"}>
        <div style={{marginBottom:20, width:'100%'}}>
          {
            this.state.donationCompleted!==0 &&
            <div style={{maxWidth: "70%", marginLeft: "auto", marginRight: "auto",}}>
              <Heading color={"blue"} style={{ marginTop: "10px" }}>
                Donation Received
              </Heading>
              <div style={{display:'inline'}}>
                <LinearProgress variant="determinate" value={this.state.donationCompleted}
                                style={{width:'90%', display:'inline-block', marginRight:10, verticalAlign:'middle'}} />
                <span>${this.state.donationReceived} of {this.state.donationGoal}</span>
              </div>

            </div>
          }
        </div>


        <Title color={"blue"}>#BLM</Title>
        <Subtitle color={"black"}
                  style={{
                    maxWidth: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "18px",
                    lineHeight: "28px"
                  }}>

          <div style={{ marginBottom: "15px" }}>
            Support the black community in a critical time while developing new skills, expanding your network, experiencing personal growth, polishing off your
            resume and so much more. Once you have chosen a session from below, follow three simple steps to register for it as soon as tomorrow!
          </div>

        </Subtitle>

        <div style={{ display: "flex", flexDirection: "horizontal", justifyContent: "center", marginTop: 10 }}>
          <GridContainer
            style={{
              maxWidth: "90%", display: "flex", flexDirection: "horizontal",
              justifyContent: "space-between", marginTop: 0
            }}>
            <GridItem xs={12} sm={6} md={4} style={{ textAlign: "center" }}>

              <Subtitle color={"black"}
                        style={{
                          maxWidth: "70%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          fontSize: "18px",
                          lineHeight: "28px"
                        }}>
                 Step 1: Donate  </Subtitle>
              <br/>

              Donate to any organization on
              <a href={'https://docs.google.com/spreadsheets/d/1p6IOTPoSUQpOLjcqPFTfCULdoqH_WUZjmEYXFRJdI2c/edit?usp=sharing'}
                 style={{color:'blue'}}>
                &nbsp;this list&nbsp;
            </a>. You can also Venmo us
              <span style={{textDecoration:'underline'}}> @tejit-pabari </span> or
              <a href={"https://www.paypal.me/tejitpabari"} style={{color:'blue'}}
                 target='_blank' rel="noopener noreferrer"> Paypal </a> us
              and we will donate on your behalf. Every $15 donation gives you access to one 30 minute session
              (so, $30 will get you two sessions).

              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <CustomButton text={"Donate"} size={"medium"} color={"orange"}
                              href={"https://docs.google.com/spreadsheets/d/1p6IOTPoSUQpOLjcqPFTfCULdoqH_WUZjmEYXFRJdI2c/edit?usp=sharing"}
                              newTab/>
              </div>
            </GridItem>

            <GridItem xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
              <Subtitle color={"black"}
                        style={{
                          maxWidth: "70%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          fontSize: "18px",
                          lineHeight: "28px"
                        }}>
                Step 2: Send confirmation
              </Subtitle>
              <br/>
              Upload a screenshot of your donation or Venmo payment to this form. We will email you a password
              that you can use to sign up with a mentor.
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <CustomButton text={"Confirm Donation"} size={"medium"} color={"orange"}
                              href={"https://forms.gle/X2wjM9N5qdRwWNrG9"} newTab/>
              </div>
            </GridItem>

            <GridItem xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
              <Subtitle color={"black"}
                        style={{
                          maxWidth: "70%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          fontSize: "18px",
                          lineHeight: "28px"
                        }}>
                Step 3: Register for a session</Subtitle>
              <br/>
              <div>
                Click on the session you wish to attend from below, choose a time, and enter the password emailed to you!
                Enjoy your session.
              </div>
            </GridItem>
          </GridContainer>
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
                  onClick={(val) => {this.searchFunc(val)}}
                  onCancel={()=> {this.searchFunc('')}}
          />
        </div>
        {this.state.activityIndicator &&
          <CircularProgress style={{marginLeft:'50%'}}/>
        }
        {!this.state.activityIndicator &&
        <div>
          {this.state.tutorSearch.length>0 && !this.state.tutorSearchError ?
            <div style={{display:'flex', flexDirection:'horizontal', justifyContent:'center'}}>
              <div style={{ width:'85%'}}>
                <TutorSearchMapping tutorSearch={this.state.tutorSearch}/>
              </div>
            </div>:
            this.state.tutorSearchError?
              <div style={{width:'100%', textAlign:'center', color:'red'}}>{this.state.tutorSearchError}</div>:
              <div style={{display:'flex', flexDirection:'horizontal', justifyContent:'center'}}>
              <div style={{ maxWidth:'85%'}}>
              <div style={{marginBottom:'3%'}} >
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
              <TutorExpansionMapping allTutors={this.state.tutorsPop}/></div>
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
              <TutorExpansionMapping allTutors={this.state.allTutors}/>
              </div>
              </div>
          }
        </div>

        }

        <Heading color={"blue"} style={{ marginTop: "80px" }}>
          Our Mission
        </Heading>

        <Subtitle color={"black"}
                  style={{
                    maxWidth: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "18px",
                    lineHeight: "28px"
                  }}>

          <div style={{ marginBottom: "15px" }}>
            In light of the recent murders of George Floyd, Ahmaud Arbery, and Breonna Taylor, Columbia Virtual Campus
            stands in solidarity with black students, faculty, staff, and affiliates. We recognize the horrific
            history of antiblack racism worldwide, and through our tutoring program, we hope to uplift black
            voices and provide financial support for organizations led by and in support of black people.
          </div>
          <div style={{ marginBottom: "15px" }}>
            Students and faculty at Columbia have offered to provide one-on-one workshops, tutorials,
            and mentorship in exchange for a donation to the any of the organizations in
            <a href={'https://docs.google.com/spreadsheets/d/1p6IOTPoSUQpOLjcqPFTfCULdoqH_WUZjmEYXFRJdI2c/edit?usp=sharing'}
            style={{color:'blue'}}>
              &nbsp;this list.&nbsp;
            </a>
              <strong> Each $15 donation will grant you access to 30 minutes with any tutor of your
            choice! </strong>
            Do you need help polishing your resume? Want another set of eyes on your application papers?
            Need someone to help you with a difficult coding problem? You can do all of that and more while
            donating to important causes.
          </div>
          <div>
            To sign up for a class, please make a donation to the any org on
            <a href={'https://docs.google.com/spreadsheets/d/1p6IOTPoSUQpOLjcqPFTfCULdoqH_WUZjmEYXFRJdI2c/edit?usp=sharing'}
               style={{color:'blue'}}>
              &nbsp;this list.&nbsp;
            </a>
              You can also Venmo us
            <span style={{textDecoration:'underline'}}> @tejit-pabari </span> or
            <a href={"https://www.paypal.me/tejitpabari"} style={{color:'blue'}}
               target='_blank' rel="noopener noreferrer"> Paypal </a> us and
            we can pay on your behalf.
            Verify your donation by uploading
            a snapshot/picture of your receipt on the “Sign up for classes” form below. Upon completion,
            a password that you can use to sign up for meetings with tutors will be sent to your email.
          </div>
        </Subtitle>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <CustomButton text={"Sign up to Tutor"} size={"small"} color={"orange"}
                        href={"https://forms.gle/kG5bhF7NTPtQZPmS7"} newTab/>
        </div>
      </Template>
    );
  }
}

export default cvcBlm;
