import GridItem from "../material-kit-components/Grid/GridItem";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import React from "react";
import Button from "../material-kit-components/CustomButtons/Button";

import {ResourcesCard, Heading} from "..";
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

  async getResources() {
    let db = firebase.firestore();
    let approvedResources = await db.collection("resources").where("reviewed", "==", true).limit(4).get();
    let approvedResourcesDict = {};
    let approvedResourcesDisplay = [];
    if(approvedResources){
      approvedResourcesDict = this.makeDisplayResources(approvedResources.docs.map(doc => doc.data()));
      approvedResourcesDisplay = approvedResources.docs.map(doc => doc.data());
    }


     console.log(approvedResourcesDict);
    this.setState({ myResourcesDict: approvedResourcesDict});
    this.setState({ myResourcesDisplay: approvedResourcesDisplay});
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
                <ResourcesCard
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
