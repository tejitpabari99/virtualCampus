import React from "react";
import TextField from "@material-ui/core/TextField"
import { Field, ErrorMessage } from "formik"
import "./FormikField.css"


const FormikField = (props) => {

    const errorMsg = <ErrorMessage name={props.name} />
    const multiline = props.multiline

    // error state handling
    let error = props.error
    let touched = props.touch
    let toggle = false
    if (error != null) {
        if (touched == true) {
            toggle = true
        }
    }

    let multiTog = false
    if (multiline != null) {
        multiTog = true
    }

    return (
        <div className="FormikField">
            <Field
                fullWidth
                as={TextField}
                label={props.label}
                name={props.name}
                helperText={errorMsg}
                required={props.required}
                error={toggle}
                multiline={multiTog}
                rows={props.rows}
                placeholder={props.placeholder}
                variant="outlined"
            />
        </div>
    )
}

export default FormikField