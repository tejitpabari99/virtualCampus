import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import Grid from '@material-ui/core/Grid';
import FormikField from "../form-components/FormikField"
import FileUploadBtn from '../form-components/FileUploadBtn'


const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
  },
  title: {
    fontSize: "20px",
    lineHeight: "30px",
    color: "#0072CE"
  }
}))

const EntryDetails = (props) => {
  const classes = useStyles()

  return (
    <div style={{ margin: "15px 0 0 0" }}>
      <div className={classNames(classes.root, classes.title)}>
        {props.title}
      </div>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12}>
          <FormikField
            label={props.entryTitle}
            name="title"
            error={props.errorTitle}
            touch={props.touchedTitle}
            required
          />
        </Grid>

        {/* <Grid item sm={4} xs={12}>
          <FormikField
            label={props.fileName === "" ? "Logo / Image Link" : props.fileName}
            error={props.errorImgLink}
            touch={props.touchedImgLink}
            name="image_link"
            value={props.fileName}
            popover={"300 x 175 px preferred. If no picture is chosen, a stock photo based on category will be chosen for you."}
          />
        </Grid> */}
        {/* <Grid item sm={2} xs={12}>
          <FileUploadBtn
            text="Upload"
            name='image_file'
            label='Image Upload'
            id="fileUpload"
            onChange={props.imgUpload}
          />
        </Grid> */}
      </Grid >
      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormikField label="Event Description"
            name="desc"
            multiline rows="5"
            error={props.errorDesc}
            touch={props.touchedDesc}
            required
          />
        </Grid>
      </Grid > */}
    </div>
  )
}

export default EntryDetails