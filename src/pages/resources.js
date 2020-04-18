import React from "react"
import Template from "../components/template";
import classNames from "classnames";
import CategoriesSection from "../components/home-sections/CategoriesSection";
import { Helmet } from 'react-helmet'

const TITLE = 'Resources @ Columbia Virtual Campus'

export default function Resources() {
    return (
        <Template active={'resources'}>
          <Helmet>
            <title>{ TITLE }</title>
          </Helmet>
          <CategoriesSection />

        </Template>
    );
}
