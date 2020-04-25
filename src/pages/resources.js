import React from "react"
import Template from "../components/template";
import classNames from "classnames";
import CategoriesSection from "../components/home-sections/CategoriesSection";
import { Helmet } from 'react-helmet'
import AddIcon from "@material-ui/icons/Add";
import Button from "../components/material-kit-components/CustomButtons/Button.js";

const TITLE = 'Resources';
const useStyles = () => ({
    addNewButton:{
        boxShadow:"none",
        fontSize: 15,
        marginLeft:'auto',
        marginRight:'auto'
    },
    toAll:{
        fontFamily: 'Poppins, Roboto, Helvetica, Arial, sans-serif', fontWeight: 300, lineHeight: '1.25em',
        WebkitFontSmoothing:"antialiased", boxSizing: 'inherit', margin:"0px"
    }
});

export default function Resources() {
    const classes = useStyles();
    return (
        <Template active={'resources'}>
            <Helmet>
                <title>{ TITLE }</title>
                <meta name="description" content="Virtual Campus for the Columbia Community" />
                <link rel="canonical" href="https://columbiavirtualcampus.com/" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Columbia Virtual Campus" />
                <meta property="og:description" content="Virtual Campus for the Columbia Community" />
                <meta property="og:image" content='https://columbiavirtualcampus.com/static/graphic-7d5b8765ceb0dc19c9fa39db23824216.png' />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:alt" content="Columbia Virtual Campus" />
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
            </Helmet>
            <h3 style={{ textAlign: "center", color: "#4284C8", fontSize: "30px" }}
                className={classes.toAll}> RESOURCES
            </h3>
            <div style={{textAlign:'center'}}>
                <Button color="vcColor" size="sm" className={classes.addNewButton}
                        style={{fontSize: 20, boxShadow:'none', marginLeft:'auto', marginRight:'auto', marginTop: 20, marginBottom: 20}}
                        active={true} target={'_blank'} rel="noopener noreferrer"
                        href={'https://forms.gle/WWjyroMcnMsyp7Lv9'}> <AddIcon/> Add New Resource
                </Button>
            </div>

            <CategoriesSection />

        </Template>
    );
}
