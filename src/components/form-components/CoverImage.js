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

const CoverImage = (props) => {
  const classes = useStyles()

  const content = (
    <div style={{ margin: "15px 0 0 0" }}>
      <div className={classNames(classes.root, classes.title)}>
        Cover Image &nbsp;
      </div>
      <Grid container spacing={2}>

        <Grid item sm={4} xs={12}>
          <FormikField
            label={props.fileName === "" ? "Logo / Image Link" : props.fileName}
            error={props.errors.image_link}
            touch={props.touched.image_link}
            name="image_link"
            value={props.fileName}
            popover={"300 x 175 px preferred. If no picture is chosen, a stock photo based on category will be chosen for you."}
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <FileUploadBtn
            text="Upload"
            name='image_file'
            label='Image Upload'
            id="fileUpload"
            onChange={props.imgUpload}
          />
        </Grid>
      </Grid>
    </div>
  )

  return content
}

export default CoverImage