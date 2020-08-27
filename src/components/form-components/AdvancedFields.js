import React from 'react';
import AdditionalInfo from '../form-components/AdditionalInfo'
import WebsiteAndZoom from "../form-components/WebsiteAndZoom"

const AdvancedFields = (props) => {
  let errors = props.errors
  let touched = props.touched

  const content = (
    <div>
      <WebsiteAndZoom
        errors={errors}
        touched={touched}
      />
      <AdditionalInfo
        errorComments={errors.comments}
        touchedComments={touched.comments}
      />
    </div>
  )

  return content
}

export default AdvancedFields