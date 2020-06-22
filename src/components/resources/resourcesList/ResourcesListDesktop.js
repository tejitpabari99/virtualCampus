import GridItem from "../../material-kit-components/Grid/GridItem";
import GridContainer from "../../material-kit-components/Grid/GridContainer";
import React from "react";
import Button from "../../material-kit-components/CustomButtons/Button";

import {ResourcesCard, Heading, CustomButton} from "../..";
import firebase from "../../../firebase";
import {Descriptions} from "../../../assets/ResourcesData.js"

class ResourcesListDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myResourcesDict: {},
      myResourcesDisplay: [],
      myCategory: "All Resources",
      myDescription: "Resources that promote career, foster health, encourage social connection, support basic needs, and raise awareness of COVID.",
      myTagsDict: {},
      myTagsDescription: "",
      myTagsDisplay: []
    };
    this.getResources();
  }

  async getResources() {
    let db = firebase.firestore();
    let approvedResources = await db.collection("resources").where("reviewed", "==", true).get();
    let approvedResourcesDict = {};
    let approvedResourcesDisplay = [];
    let approvedTagsDict = {};
    if(approvedResources){
      approvedResourcesDict = this.makeDisplayResources(approvedResources.docs.map(doc => doc.data()));
      approvedTagsDict = this.makeDisplayTags(approvedResources.docs.map(doc => doc.data()));
      approvedResourcesDisplay = approvedResources.docs.map(doc => doc.data());

    }
    approvedResourcesDict['All Resources'] = approvedResourcesDisplay;
    approvedTagsDict['All Resources'] = [];
    this.setState({ myResourcesDict: approvedResourcesDict});
    this.setState({ myResourcesDisplay: approvedResourcesDisplay});
    this.setState({ myTagsDict: approvedTagsDict});
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
    console.log(res);
    return res;
  }

  makeDisplayTags(resources) {
    let res = {};
    for (let i=0; i< resources.length; i+=1) {
      let ele = resources[i];
      let key = this.toTitleCase(ele['category']['category']);
      let tag = ele['category']['tags'];

      for(let j=0; j<tag.length; j++){
        let tagName = this.toTitleCase(tag[j]);
        //if category not added yet, add tag and resource
        if(key in res== false){
          res[key] = [tagName];
          res[key][tagName] = [ele];
        }
        //if category is already added
        else{
          //if tag exists, add resource
          if(res[key][tagName]){
              res[key][tagName].push(ele);
          }
          //if tag doesn't exist, add tag and resource
          else{
            res[key].push(tagName);
            res[key][tagName] = [ele]
          }
        }
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
        myCategory: category,
        myTagsDisplay: this.state.myTagsDict[category]
    });

    if(category !== 'All Resources'){
      this.setState({
        myTagsDescription: "Filter by tags: "
      });
    }
    else{
      this.setState({
        myTagsDescription: ""
      });
    }
  }

  setTagDisplay(category, tag) {
    this.setState({
      myResourcesDisplay: this.state.myTagsDict[category][tag]
    });
  }
  render() {
    return (
      <div>
        <div style={{textAlign:'center'}}>
          {Object.keys(this.state.myResourcesDict).map(category => {
            return (
              <Button size="medium"
                      active
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        position: 'relative',
                        marginLeft:"2%",
                        marginRight:"2%",
                        marginTop: '3%',
                        borderRadius: '10px',

                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '13px',
                        lineHeight: '17px',
                        color: '#0072CE'
                      }}
                      onClick={this.setDisplay.bind(this, category)}
                      value={{category}}
              >{category}</Button>
            );
          })}
        </div>

        <hr style={{border: "1px solid #0072CE", marginTop: '4%'}} />

        <Heading color={'blue'} style={{textAlign:'center', marginTop: '30px'}}>{this.state.myCategory}</Heading>

        <div style={{textAlign:'center', paddingTop: '15px', paddingLeft: '20px', paddingRight: '20px'}}>{this.state.myDescription}</div>

        <GridContainer style={{width: '100%'}}>
          <GridItem xs={3} style={{textAlign:'center'}}>
            <div style={{textAlign:'center', paddingTop: '80px', paddingBottom: '8px', fontSize:'18px'}}>{this.state.myTagsDescription}</div>
            {this.state.myTagsDisplay.map(data => {
              return (
                <CustomButton text={data}
                              color={'blue'}
                              style={{
                                marginTop: 8,
                                marginBottom: 8,
                                marginLeft: 10,
                                fontSize: 'min(1.5vw, 9px)'
                              }}
                              onClick={this.setTagDisplay.bind(this, this.state.myCategory, data)}
                              value={{data}}
                />
              );
            })}
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
                  <GridItem xs={12} sm={6} md={4} style={{marginBottom: "40px", marginTop: "10px"}}>
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

export default ResourcesListDesktop;
