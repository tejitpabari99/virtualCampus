import React from 'react';
import ContactInfo from "../form-components/ContactInfo"
import EntryDetails from "../form-components/EntryDetails"
import TimeAndCapacity from "../form-components/TimeAndCapacity"
import Tags from './Tags'

import { Field } from "formik"
import { CheckboxWithLabel } from "formik-material-ui";


const RequiredFields = (props) => {
  let errors = props.errors
  let touched = props.touched

  const content = (
    <div>
      <ContactInfo
        errorName={errors.name}
        touchedName={touched.name}
        errorEmail={errors.email}
        touchedEmail={touched.email}
      />
      <EntryDetails
        title={props.title}
        entryTitle={props.entryTitle}
        errorTitle={errors.title}
        touchedTitle={touched.title}
        errorImgLink={errors.image_link}
        touchedImgLink={touched.image_link}
        errorDesc={errors.desc}
        touchedDesc={touched.desc}
        imgUpload={props.imgUpload}
        fileName={props.fileName}
        onChange={props.onChange}
      />
      <TimeAndCapacity
        timezones={props.timezones}
        errorAttendants={props.attendants}
        touchedAttendants={props.attendants}
      />
      <Tags
        tags={['Activism', 'COVID', 'Education', 'Health', 'Freshman', 'Social']}
        touched={props.touched}
        errors={props.errors}
      />

      <div style={{ height: "100px" }} />

      <div style={{ margin: '15px 0 0 0' }}>
        By hosting an event you agree to the <a
          href="https://bit.ly/events-policy-docs"
          target="_blank">Columbia Events Policy</a>.
      </div>
      <Field
        component={CheckboxWithLabel}
        name="agree"
        Label={{ label: "I agree to the Columbia Events Policy." }}
        type="checkbox"
        indeterminate={false}
        color="default"

      />
    </div>
  )

  return content
}

export default RequiredFields