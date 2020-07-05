import React from "react";
import Button from "../../material-kit-components/CustomButtons/Button";
import firebase from "../../../firebase";
import {Descriptions} from "../../../assets/ResourcesData.js"

export const CoolerButton = ({children, otherClickOption, category, key, ...other}) => {
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

class ResourcesListFunctionality extends React.Component {
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
      myTagsResourcesDisplay: {},
      searchVal: "",
      defaultSearchInput: ''
    };
    this.getResources();

//    this.searchFunc = this.searchFunc.bind(this);
//    this.setSearchInput = this.setSearchInput.bind(this);
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
    console.log(approvedTagsDict);
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
          res[key] = {};
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
            res[key][tagName] = [ele]
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
        myResourcesDisplay: this.state.myResourcesDict[category],
        myDescription: Descriptions[category],
        myCategory: category,
        myTagsDisplay: Object.keys(this.state.myTagsDict[category]),
        myTagsResourcesDisplay: {},
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
    this.state.myTagsResourcesDisplay[tag] = this.state.myTagsDict[category][tag];
    this.renderTagDisplay()
  }

  deleteTagDisplay(tag) {
    delete this.state.myTagsResourcesDisplay[tag];
    this.renderTagDisplay()
  }

  renderTagDisplay() {
    let allResources = [];
    for(let key in this.state.myTagsResourcesDisplay){
      let resourceList = this.state.myTagsResourcesDisplay[key];
      allResources.push(...resourceList);
    }
    allResources = Array.from(new Set(allResources));
    this.setState({ myResourcesDisplay: allResources});
  }

  //Search function for looking up Resources

  //Sets the search input for the search functionality
  setSearchInput(input){
    this.setState({ defaultSearchInput: input });
    this.inputElement.state.searchVal = input;
    this.inputElement.props.onClick(input);
  }
}

export default ResourcesListFunctionality;