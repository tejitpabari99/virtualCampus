module.exports = {
  siteMetadata: {
    title: `Columbia Virtual Campus`,
    siteUrl: `https://columbiavirtualcampus.com/`,
    description: `Columbia Virtual Campus, a one stop shop for Columbia Activities`,
    author: `@ColumbiaVirtualCampus`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        stylesProvider: {
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Columbia Virtual Campus`,
        short_name: `Columbia Virtual Campus`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/logoMain.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Poppins:400']
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'null'
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Columbia Virtual Campus`,
        short_name: `CVC`,
        start_url: `/`,
        background_color: `#F1945B`,
        theme_color: `#4284C8`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`,`/events/`, `/resources/*`, `/about-us`, `/contact-us`],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
