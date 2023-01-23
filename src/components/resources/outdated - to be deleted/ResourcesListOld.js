import GridItem from "../../material-kit-components/Grid/GridItem";
import GridContainer from "../../material-kit-components/Grid/GridContainer";
import React from "react";
import Button from "../../material-kit-components/CustomButtons/Button";

import {ResourcesCardGridView, Heading, CustomButton} from "../..";
import firebase from "../../../firebase";
import {Descriptions} from "../../../assets/ResourcesData.js"

const CoolerButton = ({children, otherClickOption, ...other}) => {
  const [isPushed, setIsPushed] = React.useState(true);
  const otherClick = other.onClick.bind({});
  const handleClick = () => {
    setIsPushed(!isPushed);
    if(isPushed){
      otherClick();
    }
    else{
      otherClickOption();
    }
  };
  delete other.onClick;

  return (
    <Button
      onClick={() => {handleClick()}}
      color={
        (isPushed) ? "white" : "grey"
      }
      {...other}
    >
      {children}
    </Button>
  );
};

class ResourcesListOld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCategory: "All Resources",
      myDescription: "Resources that promote career, foster health, encourage social connection, support basic needs, and raise awareness of COVID.",
      myResourcesDict: {},
      myResourcesDisplay: [],
      myTagsDict: {},
      myTagsDisplay: [],
      myTagsDescription: "",
      allResources: {},
      myList: {},
      myKeyList: []
    };
    this.getResources();
  }

  // Get resources from Firestore
  // Set initial resources/tags and display on website
  async getResources() {
    let approvedResourcesDict = {};
    let allResources = [];
    let approvedTagsDict = {};

    let db = firebase.firestore();
    let approvedResources = await db.collection("resources").where("reviewed", "==", true).get();
    if(approvedResources){
      allResources = approvedResources.docs.map(doc => doc.data());
      approvedResourcesDict = this.makeDisplayResources(allResources);
      approvedTagsDict = this.makeDisplayTags(allResources);
    }
    approvedTagsDict['All Resources'] = [];
    this.setState({ myResourcesDict: approvedResourcesDict});
    this.setState({ myResourcesDisplay: allResources});
    this.setState({ myTagsDict: approvedTagsDict});
  }

  // Creates mapping of category to corresponding resources
  makeDisplayResources(resources) {
    let res = {};
    res['All Resources'] = resources;
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

  // Creates nested mapping of category to tag to corresponding resources
  makeDisplayTags(resources) {
    let res = {};
    for (let i = 0; i < resources.length; i += 1) {
      let ele = resources[i];
      let key = this.toTitleCase(ele['category']['category']);
      let tag = ele['category']['tags'];

      for(let j = 0; j < tag.length; j++){
        let tagName = this.toTitleCase(tag[j]);
        // if category not added yet, add tag and resource
        if (!(key in res)) {
          res[key] = [tagName];
          res[key][tagName] = [ele];
        }
        // if category is already added
        else{
          // if tag exists, add resource
          if(res[key][tagName]){
              res[key][tagName].push(ele);
          }
          // if tag doesn't exist, add tag and resource
          else{
            res[key].push(tagName);
            res[key][tagName] = [ele]
          }
        }
      }
    }
    return res;
  }

  // Button categories are uppercase
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // Display appropriate resources when category button is clicked
  setDisplay(category) {
    this.setState({
        myResourcesDisplay: this.state.myResourcesDict[category],
        myDescription: Descriptions[category],
        myCategory: category,
        myTagsDisplay: this.state.myTagsDict[category],
        myList: {},
        myKeyList: []
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



  // Display appropriate resources when tags are clicked
  setTagDisplay(category, tag) {
    let resources = this.state.myTagsDict[category][tag];
    for (let i=0; i < resources.length; i += 1) {
       let ele = resources[i];
       let key = ele['title'];

       if(key in this.state.myList) {
         let newList = this.state.myList;
         newList[key]['activeButton'] += 1;
         this.setState({
           myList: newList
         });
       }
       //new resource
       else{
         let newList = this.state.myList;
         let keyList = this.state.myKeyList;
         keyList.push(key);
         newList[key] = {};
         newList[key]['resource'] = ele;
         newList[key]['activeButton'] = 1;

         let allResources = [];
         for(let j=0; j<keyList.length; j++){
           allResources.push(newList[keyList[j]]['resource']);
         }
         this.setState({
           myList: newList,
           myKeyList: keyList,
           myResourcesDisplay: allResources
         });
       }
     }
  }

  deleteTagDisplay(category, tag) {

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

        <Heading color={'blue'}
                 style={{textAlign:'center', marginTop: '30px'}}
        >{this.state.myCategory}</Heading>

        <div style={{
              textAlign:'center',
              paddingTop: '15px',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}
        >{this.state.myDescription}</div>

        <GridContainer style={{width: '100%'}}>
          <GridItem xs={3} style={{textAlign:'center'}}>
            <div style={{
                    textAlign:'center',
                    paddingTop: '80px',
                    paddingBottom: '8px',
                    fontSize:'18px'
                  }}
            >{this.state.myTagsDescription}</div>

            {this.state.myTagsDisplay.map(data => {
              return (
                <CoolerButton style={{
                                marginTop: 8,
                                marginBottom: 8,
                                marginLeft: 10,
                                fontSize: 'min(1.5vw, 9px)',
                              }}
                              onClick={this.setTagDisplay.bind(this, this.state.myCategory, data)}
                              otherClickOption={this.deleteTagDisplay.bind(this, this.state.myCategory, data)}
                >{data}</CoolerButton>
              );
            })}

            <Heading color={'blue'}
                     style={{fontSize: '28px', textAlign:'center', paddingTop: '30px'}}
            >{"Want to add your own resource?"}</Heading>

            <div style={{textAlign:'center', paddingTop: '3%'}}>
              <CustomButton text={"ADD RESOURCE"}
                            href={"https://forms.gle/1ahZnFfsmXFGcF9XA"}
                            color={"orange"}
                            size={"large"}
                            style={{marginTop: 10, marginBottom: 25}}
              />
            </div>

          </GridItem>
          <GridItem xs={9}>
            <GridContainer style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '50px'}}>

              {this.state.myResourcesDisplay.map(data => {
                return (
                  <GridItem xs={12}
                            sm={6}
                            md={4}
                            style={{marginBottom: "40px", marginTop: "10px"}}
                  >
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
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default ResourcesListOld;
