import React from "react"
import Template from "../components/all/Template";
import AddIcon from "@material-ui/icons/Add";
import {MetaData, ResourcesList, ResourcesFeaturedDesktop, Title} from "../components";

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
                <ResourcesFeaturedDesktop/>
            </div>
            <ResourcesList />
        </Template>
    );
}
