import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import Grid from '@material-ui/core/Grid';
import FormikField from "../form-components/FormikField"
import { Field, Form } from "formik";
import { Select } from "material-ui-formik-components/Select";
import { CheckboxWithLabel } from "formik-material-ui";

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
  const linkOptions = [
    {
      value: 'registration',
      label: 'Registration Link'
    },
    {
      value: 'meeting_link',
      label: 'Meeting Link'
    }
  ]



  return (
    <div style={{ margin: "15px 0 0 0" }}>
      <div className={classNames(classes.root, classes.title)}>
        Links&nbsp;
        <div style={{ fontSize: "13px", display: "inline" }}>
          (The zoom link you provide will not be shared unless the viewer has a columbia affiliated email address)
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <FormikField label="Website / Event Link"
            name="event_link"
            error={props.errors.event_link}
            touch={props.touched.event_link}
          />
        </Grid>

        <Grid item sm={4} xs={12}>
          <FormikField
            label="Video/Media Link"
            name="invite_link"
            error={props.errors.invite_link}
            touch={props.touched.invite_link}
            required
          />
        </Grid>

        <Grid item sm={4} xs={12}>
          <Field
            name="link_type"
            label="Link Type"
            options={linkOptions}
            component={Select}
            error={props.errors.link_type}
            touch={Boolean(props.touched.link_type)}
            required
          />
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