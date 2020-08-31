import React from "react"
import TemplateResources from "../components/all/TemplateResources";
import {CustomFooter, Title} from "../components";
import ResourcesList from "../components/resources/resourcesList/ResourcesList";
import ResourcesFeatured from "../components/resources/featured/ResourcesFeatured";
import IconButton from '@material-ui/core/IconButton';
import InstaIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export default function Resources() {
    return (
        <TemplateResources active={'resources'} title={'Resources'}>
            <div style={{paddingLeft: '3%'}}>
                <ResourcesFeatured />
            </div>
            <div style={{paddingLeft: '3%', paddingRight: '3%'}}>
                <ResourcesList />
            </div>
        </TemplateResources>
    );
}
