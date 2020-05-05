import React, { Component } from "react";
import * as Survey from "survey-react";
import "survey-react/survey.css";
import "../components/app.css";

import $ from "jquery";
window["$"] = window["jQuery"] = $;

export { MyQuestion } from "../components/MyQuestion.js";

Survey.StylesManager.applyTheme("default");

class App extends Component {
  json = {
   title: "Resource Submission Form",
   // description: "This form will be used to create a new resource for the 'Resources' page on the CVC website. Please answer these questions to the best of your ability. Thank you!",
   pages: [
    {
     name: "Resource Submission Form",
     elements: [
      {
       type: "text",
       name: "question1",
       title: "What is your name?",
       hideNumber: true,
       isRequired: true
      },
      {
       type: "text",
       name: "question2",
       title: "What is your email?",
       hideNumber: true,
       isRequired: true
      },
      {
       type: "text",
       name: "Provide a short description of your project (1-2 sentences). This will be displayed on the website along with your project.",
       hideNumber: true,
       isRequired: true
      },
      {
       type: "checkbox",
       name: "question3",
       title: "What category would you like your project to be tagged to?",
       description: "If a category is not selected, we will choose one.",
       hideNumber: true,
       hasOther: true,
       choices: [
        {
         value: "item1",
         text: "Social"
        },
        {
         value: "item2",
         text: "Mental Health"
        },
        {
         value: "item3",
         text: "Housing"
        },
        {
         value: "item4",
         text: "COVID"
        },
        {
         value: "item5",
         text: "International Students"
        }
       ],
       otherText: "Jobs / Internships"
      },
      {
       type: "text",
       name: "Project Website",
       hideNumber: true
      },
      {
       type: "text",
       name: "App Links, if the project is an App (Android and/or iOS)",
       hideNumber: true
      },
      {
       type: "text",
       name: "Social Media Links",
       description: "In the following format: (Name: Link)",
       hideNumber: true
      },
      {
       type: "text",
       name: "Shareable Links for Pictures / Logo",
       description: "Ex. Google Drive, imgur, or any other links. If an image is not provided, we will default to an image.",
       hideNumber: true
      }
     ]
    }
   ]
  };

  onValueChanged(result) {
    console.log("value changed!");
  }

  onComplete(result) {
    console.log("Complete! " + result);
  }

  render() {
    var model = new Survey.Model(this.json);
    return (
      <div className="App">
        <div className="survey">
          <Survey.Survey
            model={model}
            onComplete={this.onComplete}
            onValueChanged={this.onValueChanged}
          />
        </div>
      </div>
    );
  }
}

export default App;