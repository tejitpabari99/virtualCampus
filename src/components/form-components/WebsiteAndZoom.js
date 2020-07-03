import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import Grid from '@material-ui/core/Grid';
import FormikField from "../form-components/FormikField"
import {Field, Form} from "formik";
import {CheckboxWithLabel} from "formik-material-ui";

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

const WebsiteAndZoom = (props) => {
  const classes = useStyles()

  return (
    <div style={{ margin: "15px 0 0 0" }}>

      <Grid container spacing={2}>
        <Grid item sm={6}>
          <FormikField label="Website / Event Link"
                       name="event_link"
                       error={props.errors.event_link}
                       touch={props.touched.event_link}
                       required />
        </Grid>
        <Grid item sm={6}>
          <FormikField
              label="Video Call / Media Link (Zoom, Twitch, etc.)"
              name="invite_link" />
        </Grid>
      </Grid >
      <Field
          component={CheckboxWithLabel}
          name="zoomLink"
          Label={{ label: "Request a Zoom Pro link (Only valid if no Video Call link given)" }}
          type="checkbox"
          indeterminate={false}
      />
      <br />
    </div>
  )
}

export default WebsiteAndZoom