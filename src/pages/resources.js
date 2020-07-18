import React from "react"
import TemplateResources from "../components/all/TemplateResources";
import {Title} from "../components";
import ResourcesList from "../components/resources/resourcesList/ResourcesList";
import ResourcesFeatured from "../components/resources/featured/ResourcesFeatured";

export default function Resources() {
    return (
        <TemplateResources active={'resources'} title={'Resources'}>
          <Title color={'blue'}>Resources</Title>
            <div style={{paddingTop: '3%'}}>
                <ResourcesFeatured />
            </div>
            <div style={{paddingLeft: '3%', paddingRight: '3%'}}>
                <ResourcesList />
            </div>
        </TemplateResources>
    );
}
