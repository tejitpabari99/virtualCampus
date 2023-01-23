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
    background: '#3B5998',
    width: '109.6%',
    marginLeft: '-4%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: '25px',
    color: 'white',
    textAlign:'left',
    width:"240px",
    height:"58px",
    marginLeft:'30px',
    marginTop:'6px'
  },
  desc: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: '21px',
    color: 'white',
    marginLeft: '30px',
    marginRight: '20px',
    textAlign:"left"
  },
}));

export default function AddResourcesMobile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel elevation={0} className={classes.panel}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel1a-content"
        >
          <Typography className={classes.heading}>
              Want to add your own resource?
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ height: '170px' }}>
          <Typography className={classes.desc}>
              Thank you for your interest in sharing your resource through CVC.
              Please click the button below to fill out a short form.
            <br />
            <CustomButton text={"ADD RESOURCE"} href={"/resources/add-new-resource"}
                          color={"blueInvert2"} size={"large"} style={{marginTop: 25, marginBottom: 15}}/>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}