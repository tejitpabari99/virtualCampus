import AddResourceMobile from "./AddResourceExpansion.js";
import GridItem from "../../material-kit-components/Grid/GridItem";
import GridContainer from "../../material-kit-components/Grid/GridContainer";
import React from "react";
import Button from "../../material-kit-components/CustomButtons/Button";

import {ResourcesCard, Heading, CustomButton} from "../..";
import ResourcesListFunctionality from "./ResourcesListFunctionality"
import {CoolerButton} from "./ResourcesListFunctionality"

class ResourcesListMobile extends ResourcesListFunctionality {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div style={{textAlign:'center'}}>
          {Object.keys(this.state.myResourcesDict).sort().map(category => {
            return (
              <Button size="medium"
                      active
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        position: 'relative',
                        marginLeft:"2%",
                        marginRight:"2%",
                        marginTop: '3%',
                        borderRadius: '10px',

                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: '13px',
                        lineHeight: '17px',
                        color: '#0072CE'
                      }}
                      onClick={this.setDisplay.bind(this, category)}
                      value={{category}}
              >{category}</Button>
            );
          })}
        </div>

        <hr style={{border: "1px solid #0072CE", marginTop: '4%'}} />

        <Heading color={'blue'}
                 style={{textAlign:'center', marginTop: '30px'}}
        >{this.state.myCategory}</Heading>

        <div style={{
              textAlign:'center',
              paddingTop: '15px',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}
        >{this.state.myDescription}</div>

        <GridContainer style={{width: '100%'}}>
          <GridItem style={{textAlign:'center', marginBottom:'34px'}}>
            {this.state.myTagsDisplay.sort().map((data, idx) => {
              return (
                <CoolerButton key={idx} style={{
                                marginTop: 8,
                                marginBottom: 8,
                                marginLeft: 10,
                                fontSize: 'min(1.5vw, 9px)',
                              }}
                              onClick={this.setTagDisplay.bind(this, this.state.myCategory, data)}
                              otherClickOption={this.deleteTagDisplay.bind(this, data)}
                              category={this.state.myCategory}
                >{data}</CoolerButton>
              );
            })}
          </GridItem>
          <AddResourceMobile />
          <GridItem>
            <GridContainer style={{paddingLeft: '30px', paddingRight: '5px', paddingTop: '20px'}}>
              {this.state.myResourcesDisplay.map(data => {
                return (
                  <GridItem xs={12}
                            sm={6}
                            md={4}
                            style={{marginBottom: "40px", marginTop: "10px"}}
                  >
                    <ResourcesCard
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
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default ResourcesListMobile;
