import React from "react"
import Template from "../components/all/Template";
import AddIcon from "@material-ui/icons/Add";
import Button from "../components/material-kit-components/CustomButtons/Button.js";
import {MetaData, ResourcesList} from "../components";

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
            <h3 style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }}> RESOURCES</h3>
            <div style={{textAlign:'center'}}>
                <Button color="vcColor" size="sm" className={classes.addNewButton}
                        style={{fontSize: 20, boxShadow:'none', marginLeft:'auto', marginRight:'auto', marginTop: 20, marginBottom: 20}}
                        active={true} target={'_blank'} rel="noopener noreferrer"
                        href={'https://forms.gle/WWjyroMcnMsyp7Lv9'}> <AddIcon/> Add New Resource
                </Button>
            </div>
            <ResourcesList />
        </Template>
    );
}
