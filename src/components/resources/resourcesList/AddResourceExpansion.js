import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {CustomButton} from "../../index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginLeft: '30px'
  },
  panel:{
    background: 'rgba(242, 249, 253, 0.75)'
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: '25px',
    color: '#0072CE',
    textAlign:'left'
  },
  desc: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: '21px',
    color: '#000000'
  },
}));

export default function AddResourcesMobile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#0072CE" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ width:"240px", height:"58px", marginLeft:'5px', marginTop:'6px' }} className={classes.heading}>
              Want to add your own resource?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography className={classes.desc} style={{marginLeft: '5px', textAlign:"left"}}>
              Thank you for your interest in sharing your resource through CVC.
              Please click the button below to fill out a short form.
            <br />
            <CustomButton text={"ADD RESOURCE"} href={"https://forms.gle/WWjyroMcnMsyp7Lv9"}
                          color={"orange"} size={"large"} style={{marginTop: 25, marginBottom: 15}}/>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}