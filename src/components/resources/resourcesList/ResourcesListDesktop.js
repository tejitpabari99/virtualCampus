import GridItem from "../../material-kit-components/Grid/GridItem";
import GridContainer from "../../material-kit-components/Grid/GridContainer";
import React from "react";
import Button from "../../material-kit-components/CustomButtons/Button";
import {ResourcesCard, Heading, CustomButton, Search} from "../..";
import ResourcesListFunctionality from "./ResourcesListFunctionality"
import {CoolerButton} from "./ResourcesListFunctionality"
import {CircularProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

class ResourcesListDesktop extends ResourcesListFunctionality {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div style={{textAlign:'center'}}>
          {Object.keys(this.state.resourcesDict).sort().map(category => {
            return (
              <Button size="medium"
                      active
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        position: 'relative',
                        marginLeft:"1%",
                        marginRight:"2%",
                        marginTop: '2%',
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

        <div style={{width:'86%', marginLeft:'7%', marginTop: '3%'}}>
            <Search data={this.state.myResourcesDisplay}
                ref={input => this.inputElement = input}
                onClick={(val) => { this.searchFunc(val) }}
                onCancel={() => { this.searchFunc('') }}
                placeholder={"Search resources"}
                style={{height:'70%'}}
            />
        </div>

        <div style={{
              textAlign:'center',
              color: 'red',
              paddingTop: '15px',
              paddingBottom: '15px'
            }}
        >{this.state.searchError}</div>

        <hr style={{border: "1px solid #0072CE", marginTop: '20px'}} />

        <Heading color={'blue'}
                 style={{textAlign:'center', marginTop: '30px'}}
        >{this.state.category}</Heading>

        <div style={{
              textAlign: 'center',
              marginTop: '15px',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}
        >{this.state.description}</div>

        <GridContainer style={{width: '100%'}}>
          <GridItem xs={3}>
            <div style={{
                    marginLeft: 16,
                    marginTop: '120px',
                    marginBottom: '8px',
                    fontSize:'18px'
                  }}
            >{this.state.tagsDescription}</div>

            {this.state.tagsDisplay.sort().map((data, idx) => {
              return (
                <CoolerButton key={idx} style={{
                                marginTop: 5,
                                marginBottom: 5,
                                marginLeft: 10,
                                fontSize: 'min(1.5vw, 9px)',
                              }}
                              onClick={this.setTagDisplay.bind(this, this.state.category, data)}
                              otherClickOption={this.deleteTagDisplay.bind(this, this.state.category, data)}
                              category={this.state.category}
                              val={data}
                />
              );
            })}

            <Heading color={'blue'}
                     style={{fontSize: '25px', lineHeight: '42px', textAlign:'left', paddingTop: '60px'}}
            >{"Want to add your own resource?"}</Heading>
            <div style={{
                width: '285px',
                height: '80px',
                textAlign: 'left'
            }}>
                <span style={{
                    fontStyle: 'normal',
                    fontColor: '#000000',
                    fontSize: '14px',
                    lineHeight: '10px'}}>
                    Thank you for your interest in sharing your resource through CVC.
                    Please click the button below to fill out a short form.
                </span>
            </div>
            <div style={{textAlign:'left', marginTop: '3%'}}>
              <CustomButton text={"ADD RESOURCE"}
                            href={"/resources/add-new-resource"}
                            color={"orange"}
                            size={"large"}
                            style={{marginTop: 10, marginBottom: 25}}
              />
            </div>

          </GridItem>
          <GridItem xs={9}>
            <GridContainer style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '50px'}}>
              {this.state.activityIndicator && <CircularProgress style={{ marginLeft: '50%' }} /> }
              {!this.state.activityIndicator && this.state.resourcesDisplay.map(data => {
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

export default ResourcesListDesktop;