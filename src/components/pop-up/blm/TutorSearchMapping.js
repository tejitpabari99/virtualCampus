import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BLMCard } from "../../";
import GridItem from "../../material-kit-components/Grid/GridItem.js";
import GridContainer from "../../material-kit-components/Grid/GridContainer.js";

class TutorSearchMapping extends React.Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <GridContainer style={{ width: "100%" }}>
        {this.props.tutorSearch &&
          this.props.tutorSearch.map((innerEle, innerInd) => {
            console.log(innerEle.item, innerEle.item && innerEle.website);
            if (innerEle.item && innerEle.item.website) {
              return (

                <GridItem key={innerInd} xs={12} sm={12} md={12} >
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
      </div>
    );
  }
}

export default TutorSearchMapping;
