import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BLMCard, Template, CustomButton, Title } from "../components";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import Subtitle from "../components/text/Subtitle";
import Heading from "../components/text/Heading";

let toTitleCase = function(str) {
  str = str.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
};

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
      expanded: ""
    };
    this.fetchData.bind(this);
    this.processData.bind(this);
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let that = this;
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1lKaDRHeC2NHewyeh87podHwo1Ya4qAtYr9VAYI71s50/values/Tutor Profiles!A2:F40?key=" + process.env.GATSBY_GOOGLE_SHEET_KEY)
      .then(function(response) {
        response.json().then(function(data) {
          console.log("Success");
          that.setState({ allTutors: that.processData(data["values"]) });
        });
      })
      .catch(error => {
        console.error("There was an error!", error);
      });
  };

  processData(data) {
    if (data) {
      let new_dict = {};
      for (let i = 0; i < data.length; i += 1) {
        if (data[i] && data[i][0]) {
          let subject = data[i][1].toLowerCase();
          if (new_dict.hasOwnProperty(subject)) {
            new_dict[subject].push(data[i]);
          } else {
            new_dict[subject] = [data[i]];
          }
        }
      }
      let new_arr = [];
      for (let key in new_dict) {
        if (new_dict.hasOwnProperty(key)) {
          new_arr.push([key, new_dict[key]]);
        }
      }
      new_arr.sort(function(a, b) {
        return a[0] - b[0];
      });
      return new_arr;
    }
    return [];

  }


  // request = gapi.client.sheets.spreadsheets.values.batchGet(this.state.params)
  // .then(function(response) {
  //   // TODO: Change code below to process the `response` object:
  //   console.log(response.result);
  // }).catch(function(reason) {
  //   console.error('error: ' + reason.result.error.message);
  // });

  render() {

    return (
      <Template active={"cvc-blm"} title={"Events"}>
        <Title color={"blue"}>Learn and Donate</Title>

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
            and mentorship in exchange for a donation to the Brooklyn Community Bail Fund and Black Visions
            Collective. <strong>Each $15 donation will grant you access to 30 minutes with any tutor of your choice!
            Do you need help polishing your resume?</strong> Want another set of eyes on your application papers?
            Need someone to help you with a difficult coding problem? You can do all of that and more while
            donating to important causes.
          </div>
          <div>
            To sign up for a class, please make a donation to the Brooklyn Community Bail Fund
            or Black Visions Collective (or both!). Verify your donation by uploading
            a snapshot/picture of your receipt on the “Sign up for classes” form below. Upon completion,
            a password that you can use to sign up for meetings with tutors will be sent to your email.
          </div>
        </Subtitle>

        <Heading color={"blue"} style={{ marginTop: "60px" }}>
          How to sign up?
        </Heading>
        <div style={{ display: "flex", flexDirection: "horizontal", justifyContent: "center" }}>
          <GridContainer
            style={{ maxWidth: "90%", display: "flex", flexDirection: "horizontal",
              justifyContent: "space-between", marginTop:0 }}>
            <GridItem xs={12} sm={6} md={4} style={{ textAlign: "center" }}>

              <Subtitle color={"black"}
                        style={{
                          maxWidth: "70%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          fontSize: "18px",
                          lineHeight: "28px"
                        }}>
                Step 1: Donate </Subtitle>
              <br/>

              Donate to either one of the following organizations (or both!) to get access to tutoring sessions held by
              qualified students and professors. Your total donation must amount to $15 - donations can be stacked for
              tutoring sessions longer than 30 minutes (eg.: $30 dollars for an hour, $45 dollars for an hour and a
              half).

              <div style={{ textAlign: "center", marginBottom: "20px", justifyContent: "space-between", flex: 1 }}>
                <CustomButton text={"Brooklyn Community Bail Fund"} size={"medium"} color={"orange"}
                              href={"https://brooklynbailfund.org/donation-form"} style={{ marginBottom: "10px" }}
                              newTab/>
                <CustomButton text={"Black Visions Collective"} size={"medium"} color={"orange"}
                              style={{ marginBottom: "10px" }}
                              href={"https://secure.everyaction.com/4omQDAR0oUiUagTu0EG-Ig2"} newTab/>
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
              Once you have donated, upload your receipt to the form (below) and we will reach out to you with your
              password (check your inbox for an email from columbiavirtualcampus@gmail.com).
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
                Step 3: Pick tutor </Subtitle>
              <br/>
              <div>
                Check out the list of tutors available in the various categories below.
                Links to their credentials will be listed as well. Clicking on their name will show you their schedules.
                Sign up for a time slot with the password provided to you by email.
              </div>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <CustomButton text={"Sign Up for classes"} size={"medium"} color={"orange"}
                              href={"https://forms.gle/X2wjM9N5qdRwWNrG9"} newTab/>
              </div>
            </GridItem>
          </GridContainer>
        </div>


        <Heading color={"blue"} style={{ marginTop: "60px" }}>
          Check out our Tutors!
        </Heading>
        <Subtitle color={"black"}
                  style={{
                    maxWidth: "65%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "18px",
                    lineHeight: "28px"
                  }}>
          Click on any tutor see their schedules!
          If interested in becoming a tutor, please fill out the form below, specifying your area of expertise and
          credentials, so we can add you as one of our tutors!

        </Subtitle>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <CustomButton text={"Sign up to Tutor"} size={"large"} color={"orange"}
                        href={"https://forms.gle/kG5bhF7NTPtQZPmS7"} newTab/>
        </div>
        <div style={{ width: "100%" }}>
          {this.state.allTutors &&
          this.state.allTutors.map((ele, ind) => {
            if (ele[1] && ele[1][0] && ele[1][0][5] && ele[1][0][5] !== undefined && ele[1][0][5].length > 0) {
              return (
                <ExpansionPanel key={ind} expanded={this.state.expanded === "panel" + ind.toString()}
                                style={{ width: "100%" }}
                                onChange={() => {
                                  this.setState({ expanded: this.state.expanded !== "panel" + ind.toString() ? "panel" + ind.toString() : "" });
                                }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1bh-content"
                    id={"panel" + ind.toString() + "bh-header"}
                  >
                    <span>{toTitleCase(ele[0])}</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ width: "100%" }}>
                    <GridContainer style={{ width: "100%" }}>
                      {ele[1] && ele[1].map((innerEle, innerInd) => {
                        if (innerEle && innerEle[5] && innerEle[5] !== undefined && innerEle[5].length > 0) {
                          return (
                            <GridItem key={innerInd} xs={12} sm={6} md={3}>
                              <BLMCard
                                website={innerEle[5]}
                                title={innerEle[0]}
                                description={innerEle[2]}
                                links={innerEle[3]}
                                resume={innerEle[4]}
                              />
                            </GridItem>
                          );
                        }
                      })}
                    </GridContainer>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            }

          })
          }
        </div>
      </Template>
    );
  }
}

export default cvcBlm;
