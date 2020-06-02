module.exports = {
  siteMetadata: {
    title: `Columbia Virtual Campus`,
    siteUrl: `https://columbiavirtualcampus.com/`,
    description: `Columbia Virtual Campus, a one stop shop for Columbia Activities`,
    author: `@ColumbiaVirtualCampus`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gapi`,
      options: {
        apiKey: `AIzaSyBTFCyJxfKW4sTDM_oJ8I_mkblJWiVWxpw`,
        clientId: `1009798395114-g80e06avugf7ufq7i6v695o3cfck8j3h.apps.googleusercontent.com`,
        discoveryURLs: [
          // These are the discovery docs for various Google APIs.
          // This can be empty.
          // Find more here: https://developers.google.com/discovery
          // This one is for the Google Drive v3 api.
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
        ],
        // The permission scopes your app needs.
        // For auth only, this can be empty.
        // Find more here: https://developers.google.com/identity/protocols/oauth2/scopes
        // This one is for reading a writing all files in Google Drive.
        scopes: ["https://www.googleapis.com/auth/drive"],
      },
    },
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
        background_color: `#FFF`,
        theme_color: `#0072CE`,
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
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`,`/events/`, `/resources/*`, `/about-us`, `/contact-us`],
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    }
  ],
};
