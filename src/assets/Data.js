const rootURL = '/';
const CampusURL = rootURL + '';
const SocialURL = CampusURL + 'social/';
const MentalHealthURL = CampusURL + 'mental-health/';
const COVIDURL = CampusURL + 'covid/';

const facebookGroupPic = 'https://engineering.fb.com/wp-content/uploads/2017/05/fb-hero-image-001.jpeg';
const instagramGroupPic = 'https://colorlib.com/wp/wp-content/uploads/sites/2/instagram-image-size.jpg';
const googleSeetsPic = 'https://helpdeskgeek.com/wp-content/pictures/2020/01/google-sheets.png';
const surveyPic = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80';

const CampusData = [
  {
    id: 'social',
    title: 'social',
    imgURL: 'https://lernerhall.columbia.edu/files/lerner/content/columbia-31.gif',
    pageURL: SocialURL,
    data: [
      {
        id: 'groups',
        title: 'groups',
        imgURL: 'https://lernerhall.columbia.edu/files/lerner/content/columbia-31.gif',
        pageURL: SocialURL+'groups',
        data: [
          {
            id: 'corona-creation-challenge',
            title: 'Corona Creation Challenge',
            description: 'Share your creations, ideas, stories and resources with other people!',
            imgURL: 'https://scontent.famd1-2.fna.fbcdn.net/v/t1.0-9/89994144_1258020867734532_1508307285024178176_o.jpg?_nc_cat=107&_nc_sid=ca434c&_nc_ohc=PeKDJcJD1ngAX8rOgCv&_nc_ht=scontent.famd1-2.fna&oh=9c2d5717137dd50d020b7689b46a63e4&oe=5EA924EA',
            facebook: 'https://www.facebook.com/groups/2854508524643641/',
          },
          {
            id: 'virtual-campus',
            title: 'Virtual Campus',
            description: 'Virtual Campus group to mimick campus. Organizing a design challenge next weekend!',
            imgURL: 'https://scontent.famd1-1.fna.fbcdn.net/v/t1.0-9/91390214_3438326979527034_5807334385975820288_o.jpg?_nc_cat=103&_nc_sid=825194&_nc_ohc=dTDGi5HT3ZoAX8wyBWP&_nc_ht=scontent.famd1-1.fna&oh=ad4aafc7f6ccd5f53c4b8c260a819b38&oe=5EAA3DCA',
            facebook: 'https://www.facebook.com/groups/1037607879987462/',
            headerTitle: 'Trending Group',
            headerColor: 'warning'
          },
          {
            id: 'isolating-together',
            title: 'Isolating Together',
            description: 'Share what people are upto',
            imgURL: 'https://scontent.famd1-2.fna.fbcdn.net/v/t1.0-9/90316730_904758936632997_768721162262806528_o.jpg?_nc_cat=105&_nc_sid=825194&_nc_ohc=9Hc-Ly1CC38AX-IKSTP&_nc_ht=scontent.famd1-2.fna&oh=fcaaaac4e4b87697b58670c4dedf0c09&oe=5EAB8F40',
            facebook: 'https://www.facebook.com/groups/621455138412555/'
          }
        ]
      },
      {
        id: 'games',
        title: 'Games',
        imgURL: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        pageURL: SocialURL+'games',
        data: [
          {
            id: 'tabletopia',
            title: 'Table Topia',
            description: 'Play 800+ board games online with your friends! Make your own games, schedule games to play with others and have an amazing time! Premium users only for $4 per month.',
            imgURL: 'https://ksr-ugc.imgix.net/assets/012/050/844/0c442edb3fa8aace39db5d36e411e285_original.jpg?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1463727462&auto=format&frame=1&q=92&s=4a08b1c274c2355fb047ead6dc5e2f8c',
            website: 'https://tabletopia.com/',
            iosLink: 'https://apps.apple.com/app/apple-store/id1274379679',
            androidLink: 'https://play.google.com/store/apps/details?id=com.Tabletopia.TabletopiaApp'
          }
        ]
      },
    ]
  },
  {
    id: 'mental-health',
    title: 'Mental health',
    imgURL: 'https://health.columbia.edu/sites/default/files/styles/cu_crop/public/content/pics/Heros/CPS-All-Staff-2019.jpg?h=fc427eec&itok=L83fTsRz',
    pageURL: MentalHealthURL,
    data: [
      {
        id: 'surveys',
        title: 'Surveys',
        imgURL: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80',
        pageURL: MentalHealthURL + 'surveys',
        data: [
          {
            id: 'quarantine-well-being-survey',
            title: 'Quarantine Well-Being Survey',
            description: 'We are conducting an anonymous survey to better understand the current well-being of our communities, specifically in regards to mental health. We hope to use our findings from the survey to improve the remote living situation.',
            imgURL: surveyPic,
            website: 'https://tinyurl.com/spo8j8e'
          }
        ]
      }
    ]
  },
  {
    id: 'covid',
    title: 'COVID',
    imgURL: 'https://health.columbia.edu/sites/default/files/styles/cu_crop/public/content/pics/Heros/medicalservices_hero2.jpg?itok=TqqcsJY3',
    pageURL: COVIDURL,
    data: [
      {
        id: 'samaritan',
        title: 'Good Samaritan',
        description: 'Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.',
        imgURL: 'https://cdn.launchaco.com/images/6b60759e-7a35-4038-bab8-f6783589b7d2.png',
        website: 'https://samaritan.launchaco.com/',
        headerTitle: 'Launching 31st March',
        headerColor: 'warning'
      },
      {
        id: 'hearts-over-heads',
        title: 'Hearts Over Heads',
        description: 'Pairs student volunteers from Columbia University with families who are being adversely impacted, and helps them coordinate video sessions between volunteer and children.',
        imgURL: 'https://uploads-ssl.webflow.com/5e7651fa34e76c26ecb1fa66/5e7661515127a1ab0734dd3d_heartsoverhands4-p-500.png',
        website: 'https://www.heartsoverhands.org/',
      },
      {
        id: 'gssc-covid-resources',
        title: 'GSSC Covid Resources',
        description: 'A list of resources compiled by GSSC',
        imgURL: googleSeetsPic,
        website: 'http://bit.ly/gssc-covid-resources',
      }
    ]
  },
];

module.exports = {
  CampusData: CampusData
};