import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import Grid from '@material-ui/core/Grid';
import FormikField from "../form-components/FormikField"
import {Field} from "formik";
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

const ContactInfo = (props) => {
  const classes = useStyles()

  return (
    <div style={{ margin: "15px 0 0 0" }}>
      <div className={classNames(classes.root, classes.title)}>
        Contact
      </div>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <FormikField label="Name / Organization"
            name="name"
            error={props.errorName}
            touch={props.touchedName}
            required
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <FormikField label="Email" name="email"
            error={props.errorEmail}
            touch={props.touchedEmail}
            popover={"Not published to our website. Used only if we need to contact you with a question about your event."}
            required />
        </Grid>
      </Grid>
      <Field
          component={CheckboxWithLabel}
          name="displayNameToggleOff"
          Label={{ label: "Check this box if you do not want your name/organization listed on our website and instead we will put CVC as the host." }}
          type="checkbox"
          indeterminate={false}
      />
    </div>
  )
}

export default ContactInfo