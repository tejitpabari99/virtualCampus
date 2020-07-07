import React from "react";
import { CustomButton2 } from "../..";
import firebase from "../../../firebase";
import {Descriptions} from "../../../assets/ResourcesData.js";
import Fuse from 'fuse.js';


export const CoolerButton = ({children, otherClickOption, category, key, val, ...other}) => {
  const [isPushed, setIsPushed] = React.useState(true);
  React.useEffect(() => {
    setIsPushed(true);
  }, [children, category, key]);
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
    <CustomButton2
      onClick={() => {handleClick()}}
      color={
        (isPushed) ? "blue" : "white"
      }
      {...other}
      text={val}
    />
  );
};

class ResourcesListFunctionality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityIndicator: true,
      category: "All Resources",
      description: "Resources that promote career, foster health, encourage social connection, support basic needs, and raise awareness of COVID.",
      resourcesDict: {},
      resourcesDisplay: [],
      tagsDict: {},
      tagsDisplay: [],
      tagsDescription: "Filter by tags: ",
      tagsResourcesDisplay: {},
      searchError: ""
    };
    this.getResources();
  }

  // Get resources from Firestore
  // Set initial resources/tags and display on website
  async getResources() {
    let approvedResourcesDict = {};
    let allResources = [];
    let approvedTagsDict = {};
    try{
      let db = firebase.firestore();
      let approvedResources = await db.collection("resources").where("reviewed", "==", true).get();
      if(approvedResources){
        allResources = approvedResources.docs.map(doc => doc.data());
        approvedResourcesDict = this.makeDisplayResources(allResources);
        approvedTagsDict = this.makeDisplayTags(allResources);
      }
      this.setState({
        activityIndicator: false,
        resourcesDict: approvedResourcesDict,
        resourcesDisplay: allResources,
        tagsDict: approvedTagsDict,
      });
      this.setDisplay('All Resources');
    }
    catch (e) {
      console.log('Progress Error', e)
    }
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
    let res = {'All Resources':{}};
    for (let i = 0; i < resources.length; i += 1) {
      let ele = resources[i];
      let key = this.toTitleCase(ele['category']['category']);
      let tag = ele['category']['tags'];

      for(let j = 0; j < tag.length; j++){
        let tagName = this.toTitleCase(tag[j]);
        // if category not added yet, add tag and resource
        if (!(key in res)) {
          res[key] = {};
          res[key][tagName] = [ele];
          res['All Resources'][tagName] = [ele];
        }
        // if category is already added
        else{
          // if tag exists, add resource
          if(res[key][tagName]){
              res[key][tagName].push(ele);
              res['All Resources'][tagName].push(ele);
          }
          // if tag doesn't exist, add tag and resource
          else{
            res[key][tagName] = [ele];
            res['All Resources'][tagName] = [ele]
          }
        }
      }
    }
    return res;
  }

  // Button categories are uppercase
  toTitleCase(str) {
    if(str == 'blm'){
      return 'BLM';
    }
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // Display appropriate resources when category button is clicked
  setDisplay(category) {
    this.setState({
      resourcesDisplay: this.state.resourcesDict[category],
      description: Descriptions[category],
      category: category,
      tagsDisplay: Object.keys(this.state.tagsDict[category]),
      tagsResourcesDisplay: {},
    });

    this.setState({
      tagsDescription: "Filter by tags: "
    });
  }

  setTagDisplay(category, tag) {
    this.state.tagsResourcesDisplay[tag] = this.state.tagsDict[category][tag];
    this.renderTagDisplay(category)
  }

  deleteTagDisplay(category, tag) {
    delete this.state.tagsResourcesDisplay[tag];
    this.renderTagDisplay(category)
  }

  renderTagDisplay(category) {
    let allResources = [];
    for(let key in this.state.tagsResourcesDisplay){
      let resourceList = this.state.tagsResourcesDisplay[key];
      allResources.push(...resourceList);
    }
    allResources = Array.from(new Set(allResources));
    if(allResources.length == 0){
      this.setState({ resourcesDisplay: this.state.resourcesDict[category]});
    }
    else{
      this.setState({ resourcesDisplay: allResources});
    }
  }

  //Search function for looking up Resources
  searchFunc(val) {
    let res = [];
    let allResources = this.state.resourcesDict['All Resources'];
    let error = "";
    if(!val || val.length === 0){
      res = allResources;
    }
    else if (val.length<=2) {
      error = "ERROR: Search term must be more than 2 characters";
    }
    else {
      this.setState({ activityIndicator: true });
      let fuse = new Fuse(allResources,
          {threshold: 0.2,
                    distance: 1000,
                    keys: ['title', 'description'],
                    ignoreLocation: true});
      let output = fuse.search(val);

      for (let i=0; i<output.length; i+=1){
          res.push(output[i]['item']);
      }
      if(output.length == 0){
        error = "No results found";
      }
    }
    this.setState({
      resourcesDisplay: res,
      activityIndicator: false,
      category: "All Resources",
      description: "Resources that promote career, foster health, encourage social connection, support basic needs, and raise awareness of COVID.",
      tagsDescription: "",
      tagsDisplay: Object.keys(this.state.tagsDict['All Resources']),
      searchError: error
    });
  }
}

export default ResourcesListFunctionality;
