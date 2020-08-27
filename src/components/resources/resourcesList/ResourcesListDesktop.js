import GridItem from "../../material-kit-components/Grid/GridItem";
import GridContainer from "../../material-kit-components/Grid/GridContainer";
import React from "react";
import Button from "../../material-kit-components/CustomButtons/Button";
import {ResourcesCardListView, ResourcesCardGridView, Heading, CustomButton, Search, EventCardFeatured} from "../..";
import ResourcesListFunctionality from "./ResourcesListFunctionality"
import {CoolerButton} from "./ResourcesListFunctionality"
import {CircularProgress, Select, MenuItem, IconButton, AppBar, Toolbar} from "@material-ui/core";
import ViewListIcon from '@material-ui/icons/ViewList';
import GridOnIcon from '@material-ui/icons/GridOn';
import {withStyles} from "@material-ui/core/styles";

const useStyles = () => ({
  searchBar: {
    width:'30%',
    marginTop: '-450px',
    display: 'inline-block',
    marginLeft: '3%',
    textAlign: "center",
    verticalAlign: 'middle',
  },
  appBar: {
    top: '60px',
  },
  toolbar: {
    minHeight: '157px'
  },
  topSearchBar: {
    width:'30%',
    marginTop: '-50px',
    display: 'inline-block',
    marginLeft: '3%',
    textAlign: "center",
    verticalAlign: 'middle',
  },
  dropdownMenu: {
    width:'12%',
    marginLeft:'75%',
    marginTop: '3%',
    display: 'inline-block',
    textAlign: "center",
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
  button: {
    position: 'relative',
    marginLeft:"1%",
    marginRight:"2%",
    marginTop: '2%',
    borderRadius: '10px',

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '13px',
    lineHeight: '20px',
    color: '#0072CE'
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
  tags: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 'min(1.5vw, 9px)',
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
  }
});

class ResourcesListDesktop extends ResourcesListFunctionality {
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
        <React.Fragment>
        <AppBar position="fixed" color="white" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.topSearchBar}>
            <Search data={this.state.myResourcesDisplay}
              ref={input => this.inputElement = input}
              onClick={(val) => { this.searchFunc(val) }}
              onCancel={() => { this.searchFunc('') }}
              placeholder={"Search resources"}
              style={{height:'70%'}}
            />
            <br /><br />
            </div>
            <div style={{textAlign: 'center'}}>
              {this.state.tagsDisplay.sort().map((tag, idx) => {
                return (
                  <CoolerButton key={idx}
                                className={classes.tags}
                                onClick={this.setTagDisplay.bind(this, tag)}
                                otherClickOption={this.deleteTagDisplay.bind(this, tag)}
                                category={this.state.category}
                                val={tag}
                  />
                );
              })}
            </div>
            <Select
              labelId="label"
              id="select"
              value={this.state.selection}
              onChange={this.handleChange}
              style={{'&:before': {borderColor: '#0072CE'}, fill: 'white'}}
            >
              <MenuItem value={1}>Sort by</MenuItem>
              <MenuItem value={2}>Alphabetical</MenuItem>
            </Select>

          </Toolbar>
          </AppBar>
        </React.Fragment>

        <div className={classes.searchBar}>
          <Search data={this.state.myResourcesDisplay}
            ref={input => this.inputElement = input}
            onClick={(val) => { this.searchFunc(val) }}
            onCancel={() => { this.searchFunc('') }}
            placeholder={"Search resources"}
            style={{height:'70%'}}
            iconColor={"white"}
          />
          <div className={classes.searchError}>{this.state.searchError}</div>
        </div>
        <div style={{textAlign:'center'}}>
          {Object.keys(this.state.resourcesDict).sort().map(category => {
            return (
              <Button size="medium"
                      active={(this.state.activeTags === category)}
                      simple
                      style={{backgroundColor: (this.state.activeTags === category) ? "#F2F2F2" : "white",}}
                      className={classes.button}
                      onClick={() =>{
                        this.setDisplay.bind(this, category)();
                        this.handleClick.bind(this)(category);
                      }}
                      value={{category}}
              >{category}</Button>
            );
          })}
        </div>
        <div className={classes.dropdownMenu}>
            <Select
              labelId="label"
              id="select"
              value={this.state.selection}
              onChange={this.handleChange}
              style={{'&:before': {borderColor: '#0072CE'}, fill: 'white'}}
            >
              <MenuItem value={1}>Sort by</MenuItem>
              <MenuItem value={2}>Alphabetical</MenuItem>
            </Select>
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

        <hr style={{border: "1px solid #0072CE", marginTop: '20px'}} />

        <Heading color={'blue'}
                 className={classes.category}
        >{this.state.category}</Heading>

        <div className={classes.description}
        >{this.state.description}</div>
        <br/>
        <div style={{textAlign: 'center'}}>
          {this.state.tagsDisplay.sort().map((tag, idx) => {
            return (
              <CoolerButton key={idx}
                            className={classes.tags}
                            onClick={this.setTagDisplay.bind(this, tag)}
                            otherClickOption={this.deleteTagDisplay.bind(this, tag)}
                            category={this.state.category}
                            val={tag}
              />
            );
          })}
        </div>
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

        <GridContainer style={{width: '100%'}}>
          <GridItem>
            <GridContainer className={classes.resourcesList}>
              {this.state.activityIndicator && <CircularProgress style={{ marginLeft: '50%' }} /> }
              {!this.state.activityIndicator && this.state.gridView && this.state.resourcesDisplay.map(data => {
                return (
                  <GridItem xs={12}
                            sm={6}
                            md={3}
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
              {!this.state.activityIndicator && !this.state.gridView && this.state.resourcesDisplay.map(data => {
                return (
                  <GridItem xs={12}
                    sm={6}
                    md={6}
                    style={{marginBottom: "20px", marginTop: "5px"}}
                  >
                    <ResourcesCardListView
                      ele = {data}
                      key={data.id}
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

export default withStyles(useStyles)(ResourcesListDesktop);
