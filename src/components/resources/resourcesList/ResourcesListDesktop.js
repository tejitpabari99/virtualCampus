import GridItem from "../../material-kit-components/Grid/GridItem";
import GridContainer from "../../material-kit-components/Grid/GridContainer";
import React from "react";
import {
    AddResourceCardDesktop,
    ResourcesCardListView,
    ResourcesCardGridView,
    LazyLoadingCardGridView,
    Heading,
    CustomButton,
    Search,
    ResourcesSearch,
    SortByMenu
    
} from "../..";
import ResourcesListFunctionality from "./ResourcesListFunctionality"
import {CoolerButton} from "./ResourcesListFunctionality"
import {Select, MenuItem, IconButton} from "@material-ui/core";
import ViewListIcon from '@material-ui/icons/ViewList';
import GridOnIcon from '@material-ui/icons/GridOn';
import {withStyles} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import {Element} from "react-scroll";
import ScrollableAnchor from "react-scrollable-anchor";




const useStyles = () => ({
  search: {
    width:'30%',
    marginTop: '-600px',
    display: 'inline-block',
    marginLeft: '3%',
    verticalAlign: 'middle',
    whiteSpace: 'noWrap',
  },
  searchAppBar: {
    marginTop: '-70px',
    display: 'inline-block',
    marginLeft: '3%',
    marginBottom: '1.5%',
    verticalAlign: 'middle'
  },
  resourcesFound: {
    marginLeft:'2%',
    marginTop: '3%',
    display: 'inline-block',
    textAlign: "center",
    verticalAlign: 'middle',
    color: "#828282",
    fontSize: "18px"
  },
  dropdownMenu: {
   // width:'12%',
   // marginLeft:'57%',
   marginLeft: "54%",
   width: "15%",
   //backgroundColor: "green",
    marginTop: '3%',
    display: 'inline-block',
    //textTransform: "capitalize",
   //textAlign: "left",
    verticalAlign: 'middle'
  },
  viewIcon: {
    width:'2%',
    marginLeft:'2%',
    marginTop: '3%',
    display: 'inline-block',
    textAlign: "center",
    verticalAlign: 'middle'
  },
  searchError: {
    textAlign:'center',
    color: 'red',
    marginTop: '5px'
  },
  category: {
    textAlign:'center',
    marginTop: '30px'
  },
  description: {
    textAlign: 'center',
    marginTop: '15px',
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  addResourceBox: {
    paddingRight:"10%",
    backgroundColor: "#3B5998",
    borderRadius: '5px',
    borderStyle: "solid",
    borderColor: "#3B5998",
    borderWidth: "thick",
    flexDirection: "row",
    display: "flex",
    paddingTop: "10px",
    paddingBottom: "30px",
  },
  addResourceText: {
    paddingLeft: "4%",
    marginLeft: "10px",
    color:"white",
    textAlign: "left"
  },
  addResourceButton: {
    marginLeft: "auto",
    marginRight: "-7%",
    marginTop: "30px",
    verticalAlign: "center"
  },
  resourcesList: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '50px'
  },
  gridCard: {
    marginBottom: "40px",
    marginTop: "10px"
  },
  listCard: {
    marginBottom: "10px",
    marginTop: "5px"
  }
});

class ResourcesListDesktop extends ResourcesListFunctionality {
  constructor(props) {
    super(props);
    this.state = {...this.state, activeTags: "", windowSize: window.innerWidth, scrollCount: 0}
    this.category = "All Resources";
   
   /*
    window.addEventListener("scroll", function() {
      
      let elementTarget = document.getElementById("tags");
     
      if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)){
          console.log("Scrolled past tags!");
      }
      this.setState({
        appBarTagsView: window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight), function() {
          console.log(this.state.appBarTagsView);
        }
      });
   
    }.bind(this));

    window.addEventListener("scroll", function() {
      
      let elementTarget = document.getElementById("searchBar");
     
      if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)){
          console.log("Scrolled past search bar!");
      }
      this.setState({
        appBarView: window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight), function() {
          console.log(this.state.appBarView);
        }
      });
   
    }.bind(this));
  */
    let debounce = function (func, wait) {
      let timeout;
      return function resize() {
        const later = function() {
          timeout = null;
          func();
        };
        
       
       clearTimeout(timeout);
       timeout = setTimeout(later, wait);
      };

    };
    
    let resizeFunc = function () {
      this.setState({windowSize: window.innerWidth});
    }.bind(this); 
    
    window.addEventListener("resize", debounce(resizeFunc, 1500));
    
    window.addEventListener("scroll", function() { //allows other components to update when scroll event fires
      
      this.setState((state) => ({
        scrollCount: state.scrollCount + 1
      }));
    }.bind(this));
      

  }


  
 

  handleClickView(isGridView){
    this.setState({
      gridView: isGridView
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div id="searchBar" className={classes.search}>
          <ResourcesSearch data={this.state.myResourcesDisplay}
            ref={input => this.inputElement = input}
            onClick={(val) => { this.searchFunc(val) }}
            onCancel={() => { this.searchFunc('') }}
            placeholder={"Search resources"}
            iconColor={"white"}
            style={{display: "inline-block"}}
            searchButtonColor={"white3"}
          />
          <div className={classes.searchError}>{this.state.searchError}</div>
        </div>
        {this.state.appBarView && <AppBar style={{paddingTop:"90px", marginTop:"60px", backgroundColor:"white", boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)"}} elevation={0}>
            <div className={classes.searchAppBar} style={{width:"30%", marginBottom:"0.8%"}}>
              <Search data={this.state.myResourcesDisplay}
                ref={input => this.inputElement = input}
                onClick={(val) => { this.searchFunc(val) }}
                onCancel={() => { this.searchFunc('') }}
                placeholder={"Search resources"}
                iconColor={"#0072CE"}
               
              />
            </div>
            <div className={classes.searchError}>{this.state.searchError}</div>
            {this.state.appBarTagsView && <div style={{width: '100%'}}>
              <GridContainer style={{width: "100%"}}>
              <GridItem xs={8} sm={8} md={8}
                style={{marginLeft: '2%', paddingBottom: "2%"}}>
              {this.state.tagsDisplay.sort().map((tag, idx) => {
                return (
                  <CoolerButton key={idx}
                                style={{marginTop: 5,
                                    marginBottom: 5,
                                    marginLeft: 10,
                                    fontSize: 'min(1.5vw, 9px)'
                                    
                                }}
                                onClick={this.setTagDisplay.bind(this, tag)}
                                otherClickOption={this.deleteTagDisplay.bind(this, tag)}
                                category={this.state.category}
                                val={tag}
                  />
                );
              })}
              
              </GridItem>
            <GridItem xs={3} sm={3} md={3}
              style={{display: 'inline-block', marginLeft: '6%'}}>
                <Select
                  labelId="label"
                  id="select"
                  value={this.state.selection}
                  onChange={this.handleChange}
                  style={{'&:before': {borderColor: '#0072CE'}, fill: 'white'}}
                  variant={"outlined"}
                >
                  <MenuItem value={1}>Sort by</MenuItem>
                  <MenuItem value={2}>Alphabetical</MenuItem>
                </Select>
                <IconButton style={{display: 'inline-block', marginLeft: '8%'}}
                            onClick={this.handleClickView.bind(this, true)}>
                    <GridOnIcon style={{fill: "#0072CE", textShadow: "0 0 3px #000"}}/>
                </IconButton>
                <IconButton onClick={this.handleClickView.bind(this, false)}>
                    <ViewListIcon style={{fill: "#0072CE"}}/>
                </IconButton>
            </GridItem>
            </GridContainer>
            </div>}
        </AppBar>}
        {this.state.activityIndicator && <div style={{paddingTop:"160px"}}/>}
        <div style={{flexDirection: 'row', display: 'flex', marginTop: '-7%'}}>
          {Object.keys(this.state.resourcesDict).sort().map(category => {
            return (
              // added new custom buttons that toggle on/off based on click status
              <CustomButton size="medium"
                      active={(this.state.activeTags === category)}
                      simple

                      // if category is "All Resources", do not display
                      style={category !== "All Resources" ?{
                          width: '16%',
                          height: '80px',
                          boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
                          marginRight: '20px',
                          marginTop: '2%',
                          fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif',
                          fontStyle: 'normal',
                          fontWeight: '900',
                          fontSize: '14px',
                          whiteSpace: 'normal'
         
                      }
                      :{
                        display: 'None'
                      }
                      }
                      onClick={() =>{
                        if (this.category === category)
                        {
                          this.category = "All Resources";
                          category = "All Resources";
                        }
                        else
                        {
                          this.category = category;
                        }
                        this.deleteDisplay.bind(this, category);
                        this.setDisplay.bind(this, category)();

                      }}

                      val={category}
                      color={
                        (this.category === category) ? "blue" : 'paleblue'
                      }
                      text={category}
              />
            );
          })}
        </div>

        <br/>
        <Heading color={'blue'}
                 className={classes.category}
        >{this.state.category}</Heading>

        <div className={classes.description}
        >{this.state.description}</div>
        <br/>
        <div id="tags" style={{textAlign: 'center'}}>
          {this.state.tagsDisplay.sort().map((tag, idx) => {
            return (
              <CoolerButton key={idx}
                            style={{marginTop: 5,
                                    marginBottom: 5,
                                    marginLeft: 10,
                                    fontSize: 'min(2vw, 12px)' //used to be 1.5vw
                                    
                                    
                            }}
                            onClick={this.setTagDisplay.bind(this, tag)}
                            otherClickOption={this.deleteTagDisplay.bind(this, tag)}
                            category={this.state.category}
                            val={tag}
                            
              />
            );
          })}
        </div>
        <div className={classes.resourcesFound}> {this.state.resourcesDisplay.length} Resources Found </div>
        <div className={classes.dropdownMenu}>
            
           <SortByMenu onChange={this.handleChange} />
            
         
        </div>
       
        <div className={classes.viewIcon}>
            <IconButton onClick={this.handleClickView.bind(this, true)}>
                <GridOnIcon style={{fill: "#0072CE", textShadow: "0 0 3px #000"}}/>
            </IconButton>
        </div>
        <div className={classes.viewIcon}>
            <IconButton onClick={this.handleClickView.bind(this, false)}>
                <ViewListIcon style={{fill: "#0072CE"}}/>
            </IconButton>
        </div>
        {!this.state.gridView && <div>
          <br/><br/>
          <div className={classes.addResourceBox}>
              <div className={classes.addResourceText}>
                <h2 style={{fontSize:28}}>Want to add your own resource?</h2>
                <p style={{fontSize: 14}}>Thank you for your interest in sharing your resource through CVC! Please click the button to fill out a short form.
                </p>
              </div>
              <div className={classes.addResourceButton}>
                <CustomButton text={"ADD RESOURCE"}
                            href={"/resources/add-new-resource"}
                            color={"blueInvert2"}
                            size={"large"}
               />
              </div>
            </div>
        </div>}

        <GridContainer style={{width: '100%'}}>
          <GridItem>
            <GridContainer className={classes.resourcesList}>
              {this.state.activityIndicator && [...Array(4)].map((x, i) =>
                <GridItem xs={12}
                          sm={6}
                          md={3}
                          className={classes.gridCard}
                  >
                  <LazyLoadingCardGridView/>
                </GridItem>
              )}
              {!this.state.activityIndicator && this.state.gridView && <GridItem xs={12}
                        sm={6}
                        md={3}
                        className={classes.gridCard}
                >
                <AddResourceCardDesktop/>
              </GridItem>}
              {!this.state.activityIndicator && this.state.gridView && this.state.resourcesDisplay.map((data) => {
                return (
                  <GridItem xs={12}
                            sm={6}
                            md={3}
                            className={classes.gridCard}
                  >
                    <ScrollableAnchor >
                      <Element name={encodeURI(data.title)}>
                        <div id={encodeURI(data.title)}>
                          <ResourcesCardGridView
                            website={data.links.website}
                            img={data.img}
                            title={data.title}
                            description={data.descriptions.description}
                            tags={data.category.tags}
                            wantSupportWith={data.descriptions.wantSupportWith}
                            resourceOffers={data.descriptions.thisResourceOffers}
                            id={data.links.website}
                            windowSize = {this.state.windowSize}
                            scrollCount = {this.state.scrollCount}
                            share
                          />
                        </div>
                        
                      </Element>
                    </ScrollableAnchor>
                  </GridItem>
                );

              })}
              {!this.state.activityIndicator && !this.state.gridView && this.state.resourcesDisplay.map(data => {
                return (
                  <GridItem xs={12}
                    sm={6}
                    md={6}
                    className={classes.listCard}
                  >
                    <ScrollableAnchor >
                      <Element name={encodeURI(data.title)}>
                        <div id={encodeURI(data.title)}>
                          <ResourcesCardListView
                            ele = {data}
                            key={data.id}
                          />
                        </div>
                      </Element>
                    </ScrollableAnchor>
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

export default withStyles(useStyles)(ResourcesListDesktop);
