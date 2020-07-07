import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from "classnames";

import Grid from '@material-ui/core/Grid';
import FormikField from "../form-components/FormikField"
import { Field } from "formik"
import { CheckboxWithLabel } from "formik-material-ui";


const Tags = (props) => {
  const tags = props.tags
  // console.log(tags)

  return (
    <div >
      <Grid container spacing={2}>
        <Grid item sm={1}>
          <div style={{ paddingTop: '8px' }}>Tags</div>
        </Grid>
        <Grid item sm={11}>
          {tags.map(tag => {
            return (
              <Field
                component={CheckboxWithLabel}
                name={tag.toLowerCase() + "_tag"}
                Label={{ label: tag }}
                type="checkbox"
                indeterminate={false}
                color="default"
              ></Field>
            )
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <FormikField label="Other Tags: Please separate by either Semicolons or Commas (e.g. 'tag1;tag2' or 'tag1,tag2')"
            placeholder="Separate Each Tag by Semicolon"
            name="other_tags" />
        </Grid>
      </Grid >
    </div>
  )
}

export default Tags