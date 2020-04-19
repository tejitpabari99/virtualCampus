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
          <CategoriesSection />

        </Template>
    );
}
