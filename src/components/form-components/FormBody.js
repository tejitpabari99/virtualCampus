import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import classNames from "classnames";

import { Formik, Form, Field, ErrorMessage } from "formik";


import ContactInfo from "../form-components/ContactInfo"
import EntryDetails from "../form-components/EntryDetails"
import Tags from './Tags'
import AdditionalInfo from './AdditionalInfo'
import SubmitButton from './SubmitButton'

import Button from "@material-ui/core/Button";


const useStyles = makeStyles(() => {

})

const FormBody = (props) => {
    return (
        <Grid item xs={8}>
            <Formik
                initialValues={props.initVal}
                onSubmit={props.submit}
                validationSchema={props.validationSchema}
            >
                {({ dirty, isValid, errors, touched }) => {
                    return (
                        <Form>
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
                            />
                            <div>
                                {props.children}
                            </div>
                            <Tags tags={['Activism', 'COVID', 'Social', 'Health', 'Education']} />
                            <AdditionalInfo
                                errorComments={errors.comments}
                                touchedComments={touched.comments}
                            />
                            <SubmitButton />
                        </Form>
                    )
                }}
            </Formik>
        </Grid>
    )
}

export default FormBody