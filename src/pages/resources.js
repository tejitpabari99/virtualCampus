import React from "react"
import Template from "../components/all/Template";
import AddIcon from "@material-ui/icons/Add";
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import {MetaData, ResourcesList, CustomButton, Title} from "../components";

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
        <Template active={'resources'}>
            <MetaData title={'Resources'}/>
          <Title color={'blue'}>Resources</Title>
            <div style={{textAlign:'center'}}>
              <CustomButton text={"ADD NEW RESOURCES"} href={"https://forms.gle/WWjyroMcnMsyp7Lv9"}
                            color={"orange"} size={"large"} style={{marginTop: 10, marginBottom: 25}}/>
            </div>
            <ResourcesList />
        </Template>
    );
}
