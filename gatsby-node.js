/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const Data = require('./src/assets/Data');
const campusCategoriesSubTemplate = require.resolve('./src/components/campusCategoriesSubTemplate.js');
const campusCategoriesTemplate = require.resolve('./src/components/campusCategoriesTemplate.js');
const templateMapping = {
  'campusCategoriesSubTemplate': campusCategoriesSubTemplate,
  'campusCategoriesTemplate': campusCategoriesTemplate
};

// const makePages = function(element, createPage) {
//   if(element.data.length>0 && element.data[0].hasOwnProperty('data') ){
//     createPage({
//       path: element.pageURL.toLowerCase(),
//       component: campusCategoriesTemplate,
//       context: [element.data]
//     });
//     element.data.forEach(ele => {
//       makePages(ele, createPage)
//     })
//   }
//   else{
//     createPage({
//       path: element.pageURL.toLowerCase(),
//       component: campusCategoriesSubTemplate,
//       context: [element.data]
//     })
//   }
// };

const pagesToCreate = function(data){
  let pages = [];
  data.forEach(element => {
    if(element.data.length>0 && element.data[0].hasOwnProperty('data') ){
      pages.push({
        path: element.pageURL.toLowerCase(),
        component: 'campusCategoriesTemplate',
        context: element.data
      });
      let pg = pagesToCreate(element.data);
      pages.push(...pg);
    }
    else {
      pages.push({
        path: element.pageURL.toLowerCase(),
        component: 'campusCategoriesSubTemplate',
        context: element.data
      });
    }
  });
  return pages;
};

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const campusCategoriesData = Data.CampusData;
  let pages = pagesToCreate(campusCategoriesData);
  pages.forEach(element => {
    createPage({
      path: element.path,
      component: templateMapping[element.component],
      context: [element.context]
    })
  });
};