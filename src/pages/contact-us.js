import React from "react"
import Template from "../components/template";
import Timeline from "@material-ui/icons/Timeline";
import Info from "@material-ui/icons/Info";
import InfoArea from "../components/material-kit-components/InfoArea/InfoArea.js";
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";

import WorkSection from "./contact-us-sections/work.js";
import CardFooter from "../components/material-kit-components/Card/CardFooter";

export default function IndexPage() {
    return (
        <Template>
            <Card>
                <CardBody>
                    <h3><strong>Contribute Your Project!</strong></h3>
                    <WorkSection/>
                </CardBody>
            </Card>
            <div style={{minHeight: '60px'}}/>


        </Template>
    );
}


