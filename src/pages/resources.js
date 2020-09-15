import React from "react"
import TemplateResources from "../components/all/TemplateResources";
import {Title} from "../components";
import ResourcesList from "../components/resources/resourcesList/ResourcesList";
import ResourcesFeatured from "../components/resources/featured/ResourcesFeatured";
import { graphql } from "gatsby";

export default function Resources({data}) {
    return (
        <TemplateResources active={'resources'} title={'Resources'}>
            <ResourcesFeatured />
            <div style={{paddingLeft: '3%', paddingRight: '3%'}}>
                <ResourcesList data={data}/>
            </div>
        </TemplateResources>
    );
}

export const query = graphql`
    {
      allCategory {
        edges {
          node {
            resource_list
            tag_list
            id
            childrenResource {
              title
              category {
                  category
                  tags
              }
              descriptions {
                description
                thisResourceOffers
                wantSupportWith
              }
              links {
                cardLink
                website
              }
              img
              ranking
              dateCreated
              reviewed
            }
          }
        }
      }
    }
    `
