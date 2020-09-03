import AddResourceMobile from "./AddResourceExpansion.js";
import GridItem from "../../material-kit-components/Grid/GridItem";
import GridContainer from "../../material-kit-components/Grid/GridContainer";
import React from "react";


import {
  ResourcesCardGridView,
  Heading,
  Search,
  ResourcesCardListView,
  CustomButton,
  LazyLoadingCardGridView
} from "../..";
import ResourcesListFunctionality from "./ResourcesListFunctionality"
import {CoolerButton} from "./ResourcesListFunctionality"
import {CircularProgress, Select, MenuItem, IconButton} from '@material-ui/core';
import GridOnIcon from "@material-ui/icons/GridOn";
import ViewListIcon from "@material-ui/icons/ViewList";
import {withStyles} from "@material-ui/core/styles";
import {Element} from "react-scroll";
import ScrollableAnchor from "react-scrollable-anchor";

const useStyles = () => ({
  searchBar: {
    marginLeft: '5%',
    width:'80%',
    marginTop: '-1090px',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  resourcesFound: {
    marginLeft:'13%',
    marginTop: '3%',
    textAlign: "center",
    verticalAlign: 'middle',
    color: "#828282",
    fontSize: "18px"
  },
  dropdownMenu: {
    width:'60%',
    marginLeft:'13%',
    marginTop: '3%',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  viewIcon: {
    width:'5%',
    marginLeft: '4%',
    marginTop: '3%',
    display: 'inline-block',
    textAlign: "center",
    verticalAlign: 'middle'
  },
  searchError: {
    textAlign:'center',
    color: 'red',
    marginTop: '3px'
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
  resourcesList: {
    paddingLeft: '30px',
    paddingRight: '5px',
    marginTop: '20px'
  },
  gridCard: {
    marginBottom: "40px",
    marginTop: "10px"
  },
  listCard: {
    marginBottom: "20px",
    marginTop: "5px"
  }
});

class ResourcesListMobile extends ResourcesListFunctionality {
  constructor(props) {
    super(props);
    this.state = {...this.state, activeTags: ""}
  }

  handleClick(tagName){
    this.setState({
      activeTags: tagName
    });
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
        <div className={classes.searchBar}>
            <Search data={this.state.myResourcesDisplay}
                ref={input => this.inputElement = input}
                onClick={(val) => { this.searchFunc(val) }}
                onCancel={() => { this.searchFunc('') }}
                placeholder={"Search resources"}
                iconColor={"white"}
            />
        </div>
        <br/>
        <div style={{flexDirection: 'row', display: 'flex'}}>
          {Object.keys(this.state.resourcesDict).sort().map(category => {
            return (
              // added new custom buttons that toggle on/off based on click status
              <CustomButton size="medium"
                      active={(this.state.activeTags === category)}
                      simple
                      
                      // if category is "All Resources", do not display
                      style={category !== "All Resources" ?{
                          width: '16.66%',
                          height: '50px',
                          boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)',
                          marginRight: '2%',
                          fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif',
                          fontStyle: 'normal',
                          fontWeight: '900',
                          fontSize: '8px',
                          whiteSpace: 'normal',
                          
                      }
                      :{
                        display: 'None'
                      }
                      }
                      onClick={() =>{
                        if (this.category===category)
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
                        (this.category == category) ? "blue" : 'paleblue'
                      }
                      text={category}
              />
            );
          })}
        </div>

        <div className={classes.searchError}>{this.state.searchError}</div>

        <Heading color={'blue'} className={classes.category}>{this.state.category}</Heading>

        <div className={classes.description}>{this.state.description}</div>

        <GridContainer style={{width: '100%'}}>
          <GridItem style={{marginLeft: '3%', marginRight: '3%', marginBottom:'20px'}}>
            {this.state.tagsDisplay.sort().map((data, idx) => {
              return (
                <CoolerButton key={idx} style={{
                                marginTop: 5,
                                marginBottom: 5,
                                marginLeft: 10,
                                fontSize: 'min(1.5vw, 9px)',
                              }}
                              onClick={this.setTagDisplay.bind(this, data)}
                              otherClickOption={this.deleteTagDisplay.bind(this, data)}
                              category={this.state.category}
                              val={data}
                />
              );
            })}
          </GridItem>
          <AddResourceMobile />
          <div className={classes.dropdownMenu}>
            <Select
              labelId="label"
              id="select"
              value={this.state.selection}
              onChange={this.handleChange}
              variant="outlined"
            >
              <MenuItem value={1}>Sort by</MenuItem>
              <MenuItem value={2}>Alphabetical</MenuItem>
              <MenuItem value={3}>Popularity</MenuItem>
              <MenuItem value={4}>Date Added</MenuItem>
            </Select>
          </div>
          <div className={classes.viewIcon}>
            <IconButton onClick={this.handleClickView.bind(this, true)}>
              <GridOnIcon style={{fill: "#0072CE"}}/>
            </IconButton>
          </div>
          <div className={classes.viewIcon}>
            <IconButton onClick={this.handleClickView.bind(this, false)}>
              <ViewListIcon style={{fill: "#0072CE"}}/>
            </IconButton>
          </div>
          <div className={classes.resourcesFound}> {this.state.resourcesDisplay.length} Resources Found </div>
          <GridItem>
            <GridContainer className={classes.resourcesList}>
              {this.state.activityIndicator &&
                <GridItem xs={12}
                          sm={6}
                          md={3}
                          className={classes.gridCard}
                  >
                  <LazyLoadingCardGridView/>
                </GridItem>
              }
              {!this.activityIndicator && this.state.gridView && this.state.resourcesDisplay.map(data => {
                return (
                  <GridItem xs={12}
                            sm={6}
                            md={4}
                            className={classes.gridCard}
                  >
                    <ScrollableAnchor >
                      <Element name={encodeURI(data.title)}>
                        <div id={encodeURI(data.title)}>
                          <ResourcesCardGridView
                            website={data.links.website}
                            img={data.img}
                            title={data.title}
                            description={data.description}
                            tags={data.category.tags}
                            wantSupportWith={data.descriptions.wantSupportWith}
                            resourceOffers={data.descriptions.thisResourceOffers}
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
                  <GridItem className={classes.listCard}>
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

export default withStyles(useStyles)(ResourcesListMobile);
