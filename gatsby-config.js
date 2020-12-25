
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
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
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
          precachePages: [`/`,`/events/`, `/resources/*`, `/about-us`, `/contact-us`, `/technical`],
        },
      },
      {
        resolve: 'gatsby-plugin-html-attributes',
        options: {
          lang: 'en'
        }
      },
      {
        resolve: '@martinreiche/gatsby-firestore',
        options: {
          credential: require("./src/firebase/FirestoreKey.json"),
          types: [
            {
            type: 'Category',
            collection: "resource",
            map: doc => ({
              resource_list: doc.resource_list,
              tag_list: doc.tag_list,
            }),
            subCollections: [
              {
                type: "Resource",
                collection: "resources",
                map: doc => ({
                  title: doc.title,
                  category: doc.category,
                  descriptions: doc.descriptions,
                  links: doc.links,
                  img: doc.img,
                  ranking: doc.ranking,
                  dateCreated: doc.dateCreated,
                  reviewed: doc.reviewed,
                })
              }
            ]
          }/*,
        {
          type: 'Category2',
          collection: "lionbook",
          map: doc => ({
            uni: doc.UNI,
            contact: doc.contact,
            department: doc.department,
            name: doc.name,
            phone: doc.phone,
            title: doc.title,
          })
        }*/]
        } 
      }
    ],
  };