import React from "react";
import { CustomButton } from "../..";
import firebase from "../../../firebase";
import {Descriptions} from "../../../assets/ResourcesData.js";
import Fuse from 'fuse.js';

/**
* Custom tag button for selection/deselection
* @return {CustomButton}: Tag that can be selected or deselected to show more specific resources
*/
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
    <CustomButton
      onClick={() => {handleClick()}}
      color={
        (isPushed) ? "blue" : "whiteNoHover"
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
      tagsResourcesDisplay: {},
      searchError: "",
      categoryList: []
    };
    this.getResources();
  }

  /**
  * Get resources from Firestore
  * Set initial resources/tags and display on website
  */
  async getResources() {
    let approvedResourcesDict = {};
    let allResources = [];
    let approvedTagsDict = {};
    let approvedCategories = [];
    try{
      let db = firebase.firestore();
      let approvedResources = await db.collection("resources").where("reviewed", "==", true).get();
      if(approvedResources){
        allResources = approvedResources.docs.map(doc => doc.data());
        approvedResourcesDict = this.makeDisplayResources(allResources);
        approvedTagsDict = this.makeDisplayTags(allResources);
        approvedCategories = this.getCategoryList(allResources);
      }
      this.setState({
        activityIndicator: false,
        resourcesDict: approvedResourcesDict,
        resourcesDisplay: allResources,
        tagsDict: approvedTagsDict,
        categoryList: approvedCategories
      });
      this.setDisplay('All Resources');
    }
    catch (e) {
      console.log('Progress Error', e)
    }
  }


  /**
  * Creates mapping of category to corresponding resources
  * @param  {List} resources: List of resources
  * @return {Dict} res: Dictionary with categories (Social, All Resources, etc) as keys,
    * list of corresponding resources as values
  */
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

  /**
  * Creates nested mapping of category to tag to corresponding resources
  * @param  {List} resources: List of resources
  * @return {Dict} res: Nested dictionary with categories (Social, All Resources, etc) as keys of outer dict,
    * inner dict as values of outer dict,
    * tags (BLM, Job, etc) as keys of inner dict,
    * list of corresponding resources as values of inner dict
  */
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

  /**
  * Creates list of categories for category button functionality
  * @param  {List} resources: List of resources
  * @return {List} res: List of category names (Social, Basic Needs, etc) with first letter of each word capitalized
  */
  getCategoryList(resources){
    let res = ['All Resources'];
    for(let i=0; i< resources.length; i+= 1){
      let ele = resources[i];
      let key = this.toTitleCase(ele['category']['category']);
      if(!(res.includes(key))){
        res.push(key);
      }
    }
    return res;
  }

  /**
  * Make first letter of each word in each category uppercase (e.g. jobs/ internships -> Jobs/ Internships)
  * @param  {String} str: Category name
  * @return {List} res: Category name with the first letter of each word capitalized
  */
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  /**
  * Display appropriate resources when category button is clicked (resourcesDisplay)
  * Set corresponding category description (description), category title (category), and tags (tagsDisplay)
  * Empty tag selection cache (tagsResourcesDisplay)
  * @param  {String} category: Category name
  */
  setDisplay(category) {
    this.setState({
      resourcesDisplay: this.state.resourcesDict[category],
      description: Descriptions[category],
      category: category,
      tagsDisplay: Object.keys(this.state.tagsDict[category]),
      tagsResourcesDisplay: {},
    });
  }

  /**
  * Add selected tags (keys) along with list of corresponding resources (values) to tagsResourcesDisplay dict
  * Takes all resources present in the dict, renders list of resources, sets resource display to these resources
  * @param  {String} category: Currently selected category
  * @param  {String} tag: Selected tag
  */
  setTagDisplay(category, tag) {
    this.state.tagsResourcesDisplay[tag] = this.state.tagsDict[category][tag];
    this.renderTagDisplay(category)
  }

  /**
  * Delete selected tags (keys) along with list of corresponding resources (values) from tagsResourcesDisplay dict
  * Takes remaining resources present in the dict, renders list of resources, sets resource display to these resources
  * @param  {String} category: Currently selected category
  * @param  {String} tag: Deselected tag
  */
  deleteTagDisplay(category, tag) {
    delete this.state.tagsResourcesDisplay[tag];
    this.renderTagDisplay(category)
  }

  /**
  * Takes all resources present in the dict, renders list of resources, sets resource display to these resources
  * If no resources present in dict (all tags deselected), set resources display to all resources in the category
  * @param  {String} category: Category that's been selected
  */
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

  /**
  * Search function for looking up Resources with error messages
  * @param  {String} val: Query that's typed into the search bar
  */
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
      tagsDisplay: Object.keys(this.state.tagsDict['All Resources']),
      searchError: error
    });
  }
}

export default ResourcesListFunctionality;
