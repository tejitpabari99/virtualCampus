import GridItem from "../material-kit-components/Grid/GridItem";
import GridContainer from "../material-kit-components/Grid/GridContainer";
import React from "react";
import Button from "../material-kit-components/CustomButtons/Button";

import {ResourcesCard, Heading, CustomButton} from "..";
import firebase from "../../firebase";
import {Descriptions} from "../../assets/ResourcesData.js"

class ResourcesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myResourcesDict: {},
      myResourcesDisplay: [],
      myCategory: "All Resources",
      myDescription: "Resources that promote career, foster health, encourage social connection, support basic needs, and raise awareness of COVID.",
      //myTagsDict: {}
    };
    this.getResources();
  }

  async getResources() {
    let db = firebase.firestore();
    let approvedResources = await db.collection("resources").where("reviewed", "==", true).get();
    let approvedResourcesDict = {};
    let approvedResourcesDisplay = [];
    let approvedTagsDict = {};
    //let tagList = []; //is this needed here?
    if(approvedResources){
      approvedResourcesDict = this.makeDisplayResources(approvedResources.docs.map(doc => doc.data()));
      //approvedTagsDict = this.makeDisplayTags(approvedResources.docs.map(doc => doc.data()));
      approvedResourcesDisplay = approvedResources.docs.map(doc => doc.data());
    }
    this.setState({ myResourcesDict: approvedResourcesDict});
    this.setState({ myResourcesDisplay: approvedResourcesDisplay});
    //this.setState({ myTagsDict: approvedTagsDict});
    console.log(approvedResourcesDisplay);
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

/*
  makeDisplayTags(resources) {
    let res = {{}};
    for (let i=0; i< resources.length; i+=1) {
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
    {'health':
      {'mental':[resource1, resource2, etc.],
       'physical': [resource1]},
    }
  }
*/
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  setDisplay(category) {
    /*let temp = [];
    for resource in resources:
      if resource not in temp:
        temp.append(resource)
        */
    this.setState({
      myResourcesDisplay: this.state.myResourcesDict[category],
      myDescription: Descriptions[category],
      myCategory: category,
      //myTags: //makeTag(...)
    });
  }
/*
  makeTag(tagList){
    <div style={{textAlign:'left', paddingTop: '15px'}}>{"Filter by tags:"}</div>
    for (let i = 0; i < tagList.length; i += 1) {
      <div style={{textAlign:'center', paddingTop: '3%'}}>
        <Button text={tagList[i]} style={{marginTop: 10, marginBottom: 25}}/>
      </div>
    }
  }
*/
  render() {
    return (
      <div>
        <div style={{textAlign:'center'}}>
          {Object.keys(this.state.myResourcesDict).map(category => {
            return (
              <Button size="large"
                      style={{background: 'rgba(255, 255, 255, 0.85)',
                        position: 'relative',
                        marginLeft:"4%",
                        marginRight:"4%",
                        marginTop: '3%',
                        borderRadius: '10px',

                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '20px',
                        lineHeight: '30px',
                        color: '#0072CE',
                        '&:active': {
                          background: '#F2F2F2'
                        }}}
                      onClick={this.setDisplay.bind(this, category)}
                      value={{category}}
              >{category}</Button>
            );
          })}
        </div>

        <hr style={{border: "1px solid #0072CE", marginTop: '4%'}} />

        <Heading color={'blue'} style={{textAlign:'center', paddingTop: '30px'}}>{this.state.myCategory}</Heading>

        <div style={{textAlign:'center', paddingTop: '15px'}}>{this.state.myDescription}</div>

      <GridContainer style={{width: '100%'}}>
        <GridItem xs={3}>
          <Heading color={'blue'} style={{fontSize: '28px', textAlign:'center', paddingTop: '30px'}}>{"Want to add your own resource?"}</Heading>
          <div style={{textAlign:'center', paddingTop: '3%'}}>
            <CustomButton text={"ADD RESOURCE"} href={"https://forms.gle/WWjyroMcnMsyp7Lv9"}
                          color={"orange"} size={"large"} style={{marginTop: 10, marginBottom: 25}}/>
          </div>
        </GridItem>
        <GridItem xs={9}>
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
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}

export default ResourcesList;
