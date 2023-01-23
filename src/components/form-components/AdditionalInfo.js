import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import { Field } from "formik";
import Grid from '@material-ui/core/Grid';
import FormikField from "../form-components/FormikField"
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

const AdditionalInfo = (props) => {
  const classes = useStyles()

  return (
    <div style={{ margin: '15px 0 15px 0' }}>
      <div className={classNames(classes.root, classes.title)}>
        Event Details
            </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormikField
            label="Additional comments or information for admin to note..."
            name="comments"
            rows="5"
            multiline

            error={props.errorComments}
            touch={props.touchedComments}
          >
          </FormikField>
        </Grid>
      </Grid>
    </div>
  )
}

export default AdditionalInfo