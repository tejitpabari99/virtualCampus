import React from "react";
import { CustomButton } from "../..";
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
      appBarView: false,
      appVarTagsView: false,
      data: this.props.data,
      activityIndicator: true,
      category: "All Resources",
      description: "Resources that promote career, foster health, encourage social connection, support basic needs, and raise awareness of COVID.",
      event: {},
      gridView: true,
      resourcesDict: {},
      resourcesDisplay: [],
      tagsDict: {},
      tagsDisplay: [],
      tagsResourcesDisplay: {},
      searchError: "",
      selection: 1
    };
  }

  componentDidMount() {
    this.getResources();
  }

  /**
  * Get resources from Firestore
  * Set initial resources/tags and display on website
  */
  async getResources() {
    let approvedResourcesDict = {"All Resources":[]};
    try{
      let categoryDocsArray = this.formatFirestoreQueriedData(this.state.data);
      //console.log("categoryDocsArray " + JSON.stringify(categoryDocsArray));
      //console.log("categoryDocsArray type " + typeof(approvedResourcesDict));
      let allReviewedByCategory = this.getAllReviewedByCategory(categoryDocsArray);
      let categoryNameArray = [];

      categoryDocsArray.forEach(categoryDoc =>
        categoryNameArray.push(categoryDoc.category
          ));

      // make dictionary of category -> list of corresponding resources
      for (let i = 0; i < categoryNameArray.length; i++) {
        let category = categoryNameArray[i];
        let allReviewed = allReviewedByCategory[category];

        approvedResourcesDict["All Resources"] = approvedResourcesDict["All Resources"].concat(allReviewed);
        approvedResourcesDict[this.toTitleCase(category)] = allReviewed;
      }


      this.setState({
        activityIndicator: false,
        resourcesDict: approvedResourcesDict,
      }, function () {
        this.setDisplay('All Resources');
      });

    } catch (e) {
      console.log('Progress Error', e)
    }
  }

  formatFirestoreQueriedData(data) {
    let categoryDocsArray = data["allCategory"].edges;
    for (let i = 0; i < categoryDocsArray.length; i++) {
      categoryDocsArray[i].category = categoryDocsArray[i].node.id.replace("_", "/ ");
      categoryDocsArray[i].resource_list = categoryDocsArray[i].node.resource_list;
      categoryDocsArray[i].tag_list = categoryDocsArray[i].node.tag_list;
      categoryDocsArray[i].resources = categoryDocsArray[i].node.childrenResource;
      delete categoryDocsArray[i].node;
    }
    return categoryDocsArray;
  }

  getAllReviewedByCategory(categoryDocsArray) {
    let allReviewedbyCategory = {};
    for (let i = 0; i < categoryDocsArray.length; i++) {
      let categoryDoc = categoryDocsArray[i];
      let category = categoryDoc.category;
      let resourceDocsArray = categoryDoc.resources;
      for (let j = 0; j < resourceDocsArray.length; j++) {
        let resourceDoc = resourceDocsArray[j];
        if (resourceDoc.reviewed) {
          if (!(category in allReviewedbyCategory)) {
            allReviewedbyCategory[category] = [];
          }
          allReviewedbyCategory[category].push(resourceDoc);
        }
      }
    }
    return allReviewedbyCategory;
  }


  /**
  * Make first letter of each word in each category uppercase (e.g. jobs/ internships -> Jobs/ Internships)
  * @param  {String} str: Category name
  * @return {String} res: Category name with the first letter of each word capitalized
  */
  toTitleCase(str) {
    str = str.replace("_", "/ ");
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  /**
  * resourcesDisplay: Display appropriate resources when category button is clicked
  * description: Set corresponding category description
  * category: Set category title
  * tagsDisplay: Set tag buttons
  * tagsResourcesDisplay: Cache of what tags/corresponding resources are selected, currently empty
  * @param  {String} category: Category name
  */
  setDisplay(category) {
    let resources = this.state.resourcesDict[category];
    let tagsDict = this.makeTags(resources);
    this.setState({
      resourcesDisplay: resources,
      description: Descriptions[category],
      category: category,
      tagsDict: tagsDict,
      tagsDisplay: Object.keys(tagsDict),
      tagsResourcesDisplay: {},
      selection: 1
    });
  }

  /**
  * Renders resources when a category is deselected
  */
 deleteDisplay() {
    let resources = this.state.resourcesDict["All Resources"];
    let tagsDict = this.makeTags(resources);
    this.setState({
      resourcesDisplay: resources,
      description: Descriptions["All Resources"],
      category: "All Resources",
      tagsDict: tagsDict,
      tagsDisplay: Object.keys(tagsDict),
      tagsResourcesDisplay: {},
      selection: 1
    });

  }


  /**
  * Make tag buttons based on the resources that are currently displayed
  * @param  {[]} resources: Category name
  */
  makeTags(resources) {
    let res = {};

    for(let i = 0; i < resources.length; i++){
      let ele = resources[i];
      let tags = ele['category']['tags'];

      for(let j = 0; j < tags.length; j++){
        let tagName = this.toTitleCase(tags[j]);
        // if tag exists, add resource
        if(res[tagName]){
            res[tagName].push(ele);
        }
        // if tag doesn't exist, add tag and resource
        else{
          res[tagName] = [ele];
        }
      }
    }
    return res
  }

  /**
  * Renders resources when a tag is selected
  * @param  {String} tag: Selected tag
  */
  setTagDisplay(tag) {
    this.state.tagsResourcesDisplay[tag] = this.state.tagsDict[tag];
    this.renderTagDisplay();
  }

  /**
  * Renders resources when a tag is deselected
  * @param  {String} tag: Deselected tag
  */
  deleteTagDisplay(tag) {
    delete this.state.tagsResourcesDisplay[tag];
    this.renderTagDisplay();
  }

  /**
  * Renders the resources according to which tags are selected/not selected
  */
  renderTagDisplay() {
    let allResources = [].concat.apply([], Object.values(this.state.tagsResourcesDisplay));
    allResources = Array.from(new Set(allResources));

    if(allResources.length === 0){
      let tags = Object.values(this.state.tagsDict);
      allResources = [].concat.apply([], tags);
      allResources = Array.from(new Set(allResources));
      this.setState({ resourcesDisplay: allResources}, function () {
        this.handleChange(this.state.event);
      });
    }
    else{
      this.setState({ resourcesDisplay: allResources}, function () {
        this.handleChange(this.state.event);
      });
    }
  }

  /**
  * Search function for looking up Resources with error messages
  * @param  {String} val: Query that's typed into the search bar
  */
  searchFunc(val) {
    let resources = [];
    let category = this.state.category;
    let allResources = this.state.resourcesDict[category];
    let error = "";
    if(!val || val.length === 0){
      resources = allResources;
    }
    else if (val.length <= 2) {
      error = "ERROR: Search term must be more than 2 characters";
    }
    else {
      this.setState({ activityIndicator: true });
      let fuse = new Fuse(allResources,
          {threshold: 0.2,
                    distance: 1000,
                    keys: ['title', 'descriptions.description', 'descriptions.wantSupportWith', 'descriptions.thisResourceOffers', 'category.tags'],
                    ignoreLocation: true});
      let output = fuse.search(val);

      for (let i=0; i<output.length; i+=1){
          resources.push(output[i]['item']);
      }
      if(output.length === 0){
        error = "No results found";
      }
    }
    let tagsDict = this.makeTags(resources);
    this.setState({
      resourcesDisplay: resources,
      activityIndicator: false,
      searchError: error,
      tagsDict: tagsDict,
      tagsDisplay: Object.keys(tagsDict)
    }, function () {
      this.handleChange(this.state.event);
    });
  }

  /**
  * Function that sorts the filter based on dropdown menu selection
  * @param  event: Received from <Search> element that has the value of the filter sort
  */
  handleChange = (event, index, value) => {
    if (event!== undefined && event.target!== undefined){
      if(event.target.value === 1){
        this.setState({
          event: event,
          selection: event.target.value
        });
      }
      else{
        let array = this.state.resourcesDisplay;
        // alphabetical sort
        if (event.target.value === 2){
          array.sort(function(a, b){
            let titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase();
            if(titleA < titleB){
              return -1;
            }
            if(titleA > titleB){
              return 1;
            }
            return 0;
          });
        }
        // popularity sort
        else if (event.target.value === 3){
          array.sort(function(a, b){
            if (a.ranking > b.ranking){
              return -1;
            }
            if (a.ranking < b.ranking){
              return 1;
            }
            return 0;
          });
        }
        // time added sort
        else if (event.target.value === 4){
          array.sort(function(a, b){
            if (a.dateCreated > b.dateCreated){
              return -1;
            }
            if (a.dateCreated < b.dateCreated){
              return 1;
            }
            return 0;
          });
        }
        this.setState({
          event: event,
          resourcesDisplay: array,
          selection: event.target.value
        });
      }
    }
  }
}

export default ResourcesListFunctionality;
