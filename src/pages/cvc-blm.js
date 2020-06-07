import React from "react";
import { Helmet } from "react-helmet";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Template, CustomButton, Title, TutorExpansionMapping, Search, TutorSearchMapping } from "../components";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import Subtitle from "../components/text/Subtitle";
import Heading from "../components/text/Heading";
import { CircularProgress } from '@material-ui/core';
import firebase from '../firebase'
import Link from '@material-ui/core/Link';
import Card from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';

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
          let subjects = ["College Experience", "Jobs and Internship Applications: Interviews, Resumes, Networking", "Writing/Editing Help", "Programming", "Undergrad/Grad admissions", "Research"];
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

          <div style={{ marginBottom: "15px", fontSize:20 }}>
            <strong>Are you a college student seeking advice for your internship applications? </strong>
            Do you want resume editing help, interview prep, and networking opportunities
            from interns and employees at Microsoft, Google, Facebook, Goldman Sachs, J.P. Morgan,
            McKinsey & Co, Saturday Night Live, Exxon Mobil, The Observer and more?
          </div>
          <div style={{fontSize: 18}}>
            Columbia Virtual Campus is offering a one-on-one mentorship service in which 100% of
            fees are donated to organizations
            supporting the black community. Get the help you need while donating to a good cause.
          </div>

        </Subtitle>

        <Heading color={"blue"} style={{ marginTop: "40px" }}>
          Available Sessions
        </Heading>
        <Subtitle color={"black"}
                  style={{
                    maxWidth: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "18px",
                    lineHeight: "28px"
                  }}>
          Choose a tutor from below and register for a time.
          We will email you a link to make your donation before you begin your session.
          Any amount of donation will allow you mentorship time with these amazing tutors!.
        </Subtitle>
        <Subtitle color={"black"}
                  style={{
                    maxWidth: "70%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "18px",
                    lineHeight: "28px",
                    marginBottom: 25
                  }}>
          Looking for resume reviews, interview prep, or networking opportunities? Filter by company:
          <br/>
          <div style={{ width:'100%'}}>
            <div style={{maxWidth:'100%', marginLeft:'auto',marginRight:'auto',}}>
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Microsoft')}}> Microsoft </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Facebook')}}> Facebook </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Google')}}> Google </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Reddit')}}> Reddit </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Mongo')}}> Mongo DB </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Blizzard')}}> Blizzard </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Activision')}}> Activision </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Goldman')}}> Goldman Sachs</Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('McKinsey')}}> McKinsey </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Morgan')}}> JP Morgan </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Mercer')}}> Mercer </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Deloitte')}}> Deloitte </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Thrive')}}> Thrive Global </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Exxon')}}> Exxon Mobil </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Exxon')}}> BASF </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Biden')}}> Joe Biden </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Saturday')}}> Saturday Night Live </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Seth Meyers')}}> Late Night with Seth Meyers </Link>,
              <Link className={classes.links} onClick={()=> {this.setSearchInput('Observer')}}> The Observer </Link>, and many more...
            </div>
          </div>


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
            and mentorship in exchange for a donation to
            <a href={'https://secure.everyaction.com/4omQDAR0oUiUagTu0EG-Ig2'}
               target='_blank' rel="noopener noreferrer" className={classes.links}>
              &nbsp;Black Visions Collective&nbsp;
            </a>
              <strong> Any amount donated will grant you mentorship sessions with the tutors of your choice! </strong>
            Do you need help polishing your resume? Want another set of eyes on your application papers?
            Need someone to help you with a difficult coding problem? You can do all of that and more while
            donating to important causes.
          </div>
          <div>
            Want to sign up as a tutor? Click below
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

export default withStyles(useStyles)(cvcBlm);
