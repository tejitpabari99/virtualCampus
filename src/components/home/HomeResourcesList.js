import GridItem from "../material-kit-components/Grid/GridItem";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import React from "react";
import Button from "../material-kit-components/CustomButtons/Button";

import {ResourcesCardGridView, Heading} from "..";
import firebase from "../../firebase";
import {Descriptions} from "../../assets/ResourcesData.js"


class HomeResourcesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myResourcesDict: {},
      myResourcesDisplay: [],
  };
    this.getResources();
  }
  /**
   * Get resources from Firestore
   * Set initial resources/tags and display on website
   */
  async getResources() {
    let MAX = 4;
    let approvedResourcesDict = {};
    let allResources = [];
    let approvedResources = [];
    try{
      let db = firebase.firestore();
      // let approvedResources = await db.collection("resources").where("reviewed", "==", true).get();
      let arr = [];

      // had to reference the existing category names
      let category_ref = await db.collection('/resource_reference_docs').doc('Resource Tags by Categories').get();

      Object.keys(category_ref.data()).forEach(function(key){
        arr.push(key);
      });

      for (let i = 0; i < arr.length; i++)
      {
        if (MAX === 0)
          break;

        // changed the loop to retrieve from resource by iterating through each category
        let name = arr[i];
        let template = "/resource/" + name + "/" + name;
        let all_reviewed = await db.collection(template).where("reviewed", "==", true).limit(MAX).get();

        all_reviewed.forEach(doc =>
        {
          MAX--;
          approvedResources.push(doc.data());
        });

      }

      if(approvedResources){
        allResources = approvedResources;
        approvedResourcesDict = this.makeDisplayResources(allResources);
      }
      this.setState({
        activityIndicator: false,
        myResourcesDict: approvedResourcesDict,
        myResourcesDisplay: allResources
      });
    }
    catch (e) {
      console.log('Progress Error', e)
    }
  }

  makeDisplayResources(resources) {
    let res = {};
    for (let i = 0; i < resources.length; i += 1) {
      let ele = resources[i];
      let key = this.toTitleCase(ele['category']['category']);
      if (key in res) {
        res[key].push(ele)
      }
      else {
        res[key] = [ele]
      }
    }
    return res;
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  setDisplay(category) {
    this.setState({
      myResourcesDisplay: this.state.myResourcesDict[category],
      myDescription: Descriptions[category],
      myCategory: category
    });
    console.log(Descriptions);
  }

  render() {
    return (
      <div>
        <GridContainer style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '50px'}}>
          {this.state.myResourcesDisplay.map(data => {
            return (
              <GridItem xs={12} sm={6} md={3} style={{marginBottom: "40px", marginTop: "10px"}}>
                <ResourcesCardGridView
                  website={data.links.website}
                  img={data.img}
                  title={data.title}
                  description={data.description}
                  iosLink={data.links.iosLink}
                  androidLink={data.links.androidLink}
                  tags={data.category.tags}
                  share
                />
              </GridItem>
            );

          })}
        </GridContainer>
      </div>
    );
  }
}

export default HomeResourcesList;
