import React from "react"
import Template from "../components/all/Template";
import {Title} from "../components";
import ResourcesList from "../components/resources/resourcesList/ResourcesList";
import ResourcesFeatured from "../components/resources/featured/ResourcesFeatured";

export default function Resources() {
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
