import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BLMCard } from "../../";
import GridItem from "../../material-kit-components/Grid/GridItem.js";
import GridContainer from "../../material-kit-components/Grid/GridContainer.js";
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";

let useStyles = () => ({
  gridItem:{
    "&:hover,&:focus":
      {backgroundColor:'#F2F9FD'}
  }
})


class TutorSearchMapping extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    const {classes} = this.props;
    return (
      <div style={{ width: "100%" }}>
        <ExpansionPanel expanded={true} style={{ width: "100%" }}>
        <ExpansionPanelDetails style={{ width: "100%", paddingLeft:0, paddingRight:0 }}>
        <GridContainer style={{ width: "100%", marginLeft:0, marginRight:0 }}>
        {this.props.tutorSearch &&
          this.props.tutorSearch.map((innerEle, innerInd) => {
            console.log(innerEle.item, innerEle.item && innerEle.website);
            if (innerEle.item && innerEle.item.website) {
              return (

                <GridItem key={innerInd} xs={12} sm={12} md={12} className={classes.gridItem}
                          style={{paddingTop:10, paddingBottom: 10, paddingLeft:25, paddingRight:25}}>
                  <BLMCard
                    website={innerEle.item.website}
                    title={innerEle.item.name}
                    description={innerEle.item.desc}
                    links={innerEle.item.profile}
                    resume={innerEle.item.resume}

                  />
                </GridItem>
              );
            }
          }
        )}
        </GridContainer>
        </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(useStyles) (TutorSearchMapping);
