/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Data = require('./src/assets/ResourcesData');
const campusCategoriesSubTemplate = require.resolve('./src/components/resources/campusCategoriesSubTemplate.js');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const campusCategoriesData = Data.CampusData;
  Object.keys(campusCategoriesData).forEach(key => {
    createPage({
      path: campusCategoriesData[key]['pageURL'],
      component: campusCategoriesSubTemplate,
      context: campusCategoriesData[key]['data']
    })
  });
};