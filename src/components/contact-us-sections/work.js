import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "../material-kit-components/Grid/GridContainer.js";
import GridItem from "../material-kit-components/Grid/GridItem.js";
import CustomInput from "../material-kit-components/CustomInput/CustomInput.js";
import Button from "../material-kit-components/CustomButtons/Button.js";

import styles from "../../assets/material-kit-assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h4 className={classes.description}>
            Submit your project/article/research/COVID-related endeavor here!<br/>
            We will get back to you in a few hours.
          </h4>
          <form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Project Description"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />
              <div className="form-group form-file-upload form-file-multiple">
                <input type="file" multiple="" className="inputFileHidden"/>
                  <div className="input-group">
                    <input type="text" className="form-control inputFileVisible" placeholder="Single File"/>
                    <span className="input-group-btn">
                      <button type="button" className="btn btn-fab btn-round btn-primary">
                        <i className="material-icons">attach_file</i>
                      </button>
                    </span>
                  </div>
              </div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                  <Button color="primary">Send Message</Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}