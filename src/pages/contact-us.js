import React from "react"
import Template from "../components/template";
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import CustomInput from "../components/material-kit-components/CustomInput/CustomInput.js";
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import { Helmet } from 'react-helmet'
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import InputAdornment from "@material-ui/core/InputAdornment";


const TITLE = 'Contact Us'
export default function IndexPage() {
    return (
        <Template active={'contact-us'}>
            <Helmet>
              <title>{TITLE}</title>
              <meta name="description" content="Virtual Campus for the Columbia Community" />
              <link rel="canonical" href="https://columbiavirtualcampus.com/" />
              <meta name="robots" content="index, follow" />
              <meta property="og:title" content="Columbia Virtual Campus" />
              <meta property="og:description" content="Virtual Campus for the Columbia Community" />
              <meta property="og:image" content='https://columbiavirtualcampus.com/static/graphic-7d5b8765ceb0dc19c9fa39db23824216.png' />
              <meta property="og:image:type" content="image/jpeg" />
              <meta property="og:image:alt" content="Columbia Virtual Campus" />
              <meta property="og:image:width" content="200" />
              <meta property="og:image:height" content="200" />
            </Helmet>

                <h3 style={{textAlign:"center", color:"#4284C8", fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}><strong>Contact Us</strong></h3><br/>
                <div style={{textAlign:'center'}}>
                Our Email: <a style={{textAlign:"center", color:"#4284C8", fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}} href={'mailto:columbiavirtualcampus@gmail.com'}>columbiavirtualcampus@gmail.com</a>
                <br/><br/>
                Our Facebook: <a style={{textAlign:"center", color:"#4284C8", fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}} href='https://bit.ly/virtual-campus-group'>https://bit.ly/virtual-campus-group</a>
                </div>
                <br/>

                <div style={{minHeight: '10px'}}/>

                <div style={{minHeight: '10px'}}/>

                <h3 style={{textAlign:"center", color:"#4284C8", fontFamily:'Poppins, Roboto, Helvetica, Arial, sans-serif'}}><strong>Feedback</strong></h3>
                <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="First and Last Name"
                                id="material"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment: (<InputAdornment position="end"><PersonIcon style={{fill: "#4284C8"}}/></InputAdornment>)
                                }}
                            />
                        </GridItem>
                        <br/>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Email"
                                id="material"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment: (<InputAdornment position="end"><EmailIcon style={{fill: "#4284C8"}}/></InputAdornment>)
                                }}
                            />
                        </GridItem>
                        <br/>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Message"
                                id="material"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment: (<InputAdornment position="end"><MessageIcon style={{fill: "#4284C8"}}/></InputAdornment>)
                                }}
                            />
                        </GridItem>
                  </GridContainer>

                  <div style={{textAlign:'center'}}>
                  <Button color="vcColor" size="sm"
                          active={true} target={'_blank'} rel="noopener noreferrer"
                          href={'mailto:columbiavirtualcampus@gmail.com'}> Submit
                  </Button>
                  </div>
        </Template>
    );
}
