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

exports.onCreateWebpackConfig = ({
                                   stage,
                                   actions,
                                   getConfig
                                 }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function(context, request, callback) {
        const regex = /^@?firebase(\/(.+))?/;
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, 'umd ' + request);
        }
        callback();
      })
    });
  }
};