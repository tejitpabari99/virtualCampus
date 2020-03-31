import React from "react"
import Template from "../components/template";
import Card from "../components/material-kit-components/Card/Card.js";
import CardBody from "../components/material-kit-components/Card/CardBody.js";

import WorkSection from "../components/contact-us-sections/work.js";

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


