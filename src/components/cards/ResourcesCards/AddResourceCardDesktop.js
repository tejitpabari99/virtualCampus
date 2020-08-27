import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CustomButton} from "../../index";


const useStyles = makeStyles({
  root: {
    height: '386px',
    background: '#3B5998',
    align: 'center',
    position: 'relative',
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    transition: 'all 0.3s',

    "&:hover": {
      boxShadow: "0 10px 10px 0 rgba(0, 0, 0, 0.14), 0 15px 5px -10px rgba(0, 0, 0, 0.2), 0 5px 25px 0 rgba(0, 0, 0, 0.12)"
    }
  },
  addResourceText: {
    paddingLeft: "12%",
    paddingRight: "12%",
    paddingTop: "5%",
    color:"white",
    textAlign: "left",
    lineHeight: 1.2,
  },
  addResourceButton: {
    position: "absolute",
    bottom: "10%",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
  },
});

export default function AddResourceCardDesktop() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <div className={classes.addResourceText}>
            <h2 style={{fontSize:26}}>Want to add your own resource?</h2>
            <p style={{fontSize: 14}}>Thank you for your interest in sharing your resource through CVC! Please click the button to fill out a short form.
            </p>
          </div>
          <div className={classes.addResourceButton}>
            <CustomButton text={"ADD RESOURCE"}
                        href={"/resources/add-new-resource"}
                        color={"blueInvert2"}
                        size={"large"}
           />
        </div>
    </Card>
  );
}
