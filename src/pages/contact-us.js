import React from "react"
import Template from "../components/all/Template";
import {MetaData} from '../components'
import GridContainer from "../components/material-kit-components/Grid/GridContainer.js";
import GridItem from "../components/material-kit-components/Grid/GridItem.js";
import CustomInput from "../components/material-kit-components/CustomInput/CustomInput.js";
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import { Helmet } from 'react-helmet'
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import MessageIcon from "@material-ui/icons/Message";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from '@material-ui/core/Input';

const Axios = require('axios');

class contactUs extends React.Component{
  constructor(props) {
    super(props);

    this.state={
      to: 'columbiavirtualcampus@gmail.com',
      subject:'',
      from:'',
      text: '',
      feedbackSubmit:false
    };

    this.handleClick=this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.state.from)
    const data = {
      from: this.state.from,
      subject: this.state.subject,
      text:this.state.text
    }

    Axios.post('https://us-central1-columbia-virtual-campus.cloudfunctions.net/contactUs', data)
    .then(res => {
      this.setState({feedbackSubmit:true})
      console.log(res)
    })
    .catch(error => {
      console.log(error);
    });

  }

  render() {
    if (this.state.feedbackSubmit==false) {
      return (
          <Template active={'contact-us'}>
              <MetaData title={'Contact Us'}/>
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
                <GridContainer style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
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
                                value={this.state.from}
                                onChange={(val)=>{this.setState({from:val.target.value})}}
                            />
                        </GridItem>
                        <br/>
                        <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                                labelText="Subject"
                                id="material"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    endAdornment: (<InputAdornment position="end"><PersonIcon style={{fill: "#4284C8"}}/></InputAdornment>)
                                }}
                                value={this.state.subject}
                                onChange={(val)=>{this.setState({subject:val.target.value})}}
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
                                value={this.state.text}
                                onChange={(val)=>{this.setState({text:val.target.value})}}
                                multiline
                            />
                        </GridItem>
                  </GridContainer>
                  <br/>
                  <div style={{textAlign:'center'}}>
                  <Button color="vcColor" size="sm"
                          active={true} target={'_blank'} rel="noopener noreferrer"
                          onClick={this.handleClick}> Submit
                  </Button>
                  </div>
          </Template>
      );
    }
    else {
      return (
          <Template active={'contact-us'}>
              <MetaData title={'Contact Us'}/>

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
                  <br/>
                  <br/>
                  <div style={{textAlign:"center"}}>
                  Thank you for submitting feedback! We really value your opinion.
                  <br/><br/>
                  We will get back to you shortly after one of the board members processes it.
                  </div>
                  <div style={{height:'300px'}}></div>
          </Template>
      );
    }

  }
}
export default contactUs;
