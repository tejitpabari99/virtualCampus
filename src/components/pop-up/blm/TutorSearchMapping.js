import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import BLMCard from "../../cards/BLMCard";
import GridItem from "../../material-kit-components/Grid/GridItem.js";
import GridContainer from "../../material-kit-components/Grid/GridContainer.js";
import withStyles from "@material-ui/core/styles/withStyles";

let useStyles = () => ({
  gridItem:{
    "&:hover,&:focus":
      {backgroundColor:'#F2F9FD'}
  }
});

let getLink = (name) => {
  return "https://docs.google.com/forms/d/e/1FAIpQLSeVA6xJTBy9wQgmA8e2c52hVbjLgoOhE2TDszkGiuBnFhfjmQ/viewform?usp=pp_url&entry.1746742806="+name.replace(' ', '+') + ','
};

class TutorSearchMapping extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    const {classes} = this.props;
    return (
        <GridContainer style={{marginTop:"10px"}}>
        {this.props.tutorSearch &&
          this.props.tutorSearch.map((innerEle, innerInd) => {
            console.log(innerEle);
              return (
                <GridItem xs={12} sm={12} md={12} className={classes.gridItem}
                          style={{paddingTop:10, paddingBottom: 10, paddingLeft:25, paddingRight:25}}>
                  <BLMCard
                    website={getLink(innerEle.item.name)}
                    title={innerEle.item.name}
                    description={innerEle.item.desc}
                  />
                </GridItem>
              );
          }
        )}
        </GridContainer>
    );
  }
}

export default withStyles(useStyles) (TutorSearchMapping);
