import React from "react"
import Template from "../components/all/Template";
import AddIcon from "@material-ui/icons/Add";

import {ResourcesFeaturedDesktop} from "../components";

import Button from "../components/material-kit-components/CustomButtons/Button.js";
import {MetaData, ResourcesList, CustomButton, Title} from "../components";
import ResourcesFeatured from "../components/resources/ResourcesFeatured";

const useStyles = () => ({
    addNewButton:{
        boxShadow:"none",
        fontSize: 15,
        marginLeft:'auto',
        marginRight:'auto'
    }
});

export default function Resources() {
    const classes = useStyles();
    return (
        <Template active={'resources'} title={'Resources'}>
          <Title color={'blue'}>Resources</Title>
            <div style={{paddingTop: '3%'}}>
                <ResourcesFeatured />
            </div>
            <ResourcesList />
        </Template>
    );
}
