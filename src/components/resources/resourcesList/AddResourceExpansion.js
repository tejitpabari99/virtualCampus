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
    position: 'relative',
    maxWidth: '100%',
    marginTop: '15px',
    marginBottom: '15px',
  },
  panel:{
    background: 'rgba(242, 249, 253, 0.75)',
    width: '100vw',
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
      <ExpansionPanel elevation={0} className={classes.panel}>
        <ExpansionPanelSummary
          style={{ width: '95%' }}
          expandIcon={<ExpandMoreIcon style={{ color: "#0072CE" }} />}
          aria-controls="panel1a-content"
        >
          <Typography style={{ width:"240px", height:"58px", marginLeft:'30px', marginTop:'6px' }} className={classes.heading}>
              Want to add your own resource?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ height: '170px' }}>
          <Typography className={classes.desc} style={{marginLeft: '30px', marginRight: '20px', textAlign:"left"}}>
              Thank you for your interest in sharing your resource through CVC.
              Please click the button below to fill out a short form.
            <br />
            <CustomButton text={"ADD RESOURCE"} href={"/resources/add-new-resource"}
                          color={"orange"} size={"large"} style={{marginTop: 25, marginBottom: 15}}/>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}