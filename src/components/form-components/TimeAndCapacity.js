import React from 'react';
import { Field } from "formik"
import FormikField from "../form-components/FormikField"

import { Select } from "material-ui-formik-components/Select";
import { DateTimePicker } from "formik-material-ui-pickers";
import Grid from '@material-ui/core/Grid';


const TimeAndCapacity = (props) => {
  const content = (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Field
            component={DateTimePicker}
            name="start_date"
            label="Start Time"
            required
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Field
            component={DateTimePicker}
            name="end_date"
            label="End Time"
            required
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Field
            name="timezone"
            label="Select Timezone"
            options={props.timezones}
            component={Select}
            required
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <FormikField
            label="Attendant Cap"
            name="attendants"
            error={props.errorsAttendants}
            touch={props.touchedAttendants}
            required
          />
        </Grid>
      </Grid >
    </div>
  )

  return content
}

export default TimeAndCapacity