const rootURL = '/';
const CampusURL = rootURL + '';
const SocialURL = CampusURL + 'social/';
const MentalHealthURL = CampusURL + 'mental-health/';
const COVIDURL = CampusURL + 'covid/';
const JobsInternshipsURL = CampusURL + 'jobs-internships/';
const HousingURL = CampusURL + 'housing/';
const InternationalStudentsURL = CampusURL + 'international-students/';

const NewResourceURL = CampusURL + 'add-resource/';

const facebookGroupPic = 'https://engineering.fb.com/wp-content/uploads/2017/05/fb-hero-image-001.jpeg';
const instagramGroupPic = 'https://colorlib.com/wp/wp-content/uploads/sites/2/instagram-image-size.jpg';
const googleSeetsPic = 'https://helpdeskgeek.com/wp-content/pictures/2020/01/google-sheets.png';
const surveyPic = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80';
const covidResourcesPic = 'https://images.unsplash.com/photo-1418669112725-fb499fb61127?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';
const covidInfoPic = 'https://images.unsplash.com/photo-1584265549884-cb8ea486a613?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';
const jobsPic = 'https://images.unsplash.com/photo-1568598035424-7070b67317d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1498&q=80';
const internshipPic = 'https://images.unsplash.com/photo-1524749292158-7540c2494485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';
const medicalSuppliesPic = 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';
const mentalHealthPic = 'https://images.pexels.com/photos/2821823/pexels-photo-2821823.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';
const housingPic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/John_Jay_Hall_Columbia_University.jpg/1384px-John_Jay_Hall_Columbia_University.jpg';
const internationalStudentsPic = 'https://i.imgur.com/xOA11BT.jpg';
const boardGamesPic = 'https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
// const medicalSuppliesMainImage = 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';

/*
* Empty lists:
*   COVID - Medical Supplies
*   Jobs Internships - jobs
*   Jobs Internships - internships
*
*/

const IndexCampusData = {
  'social': ['facebook-groups/corona-creation-challenge', 'facebook-groups/isolating-together', 'games/tabletopia', 'games/qurantine-board-games'],
  'mental-health': ['surveys/quarantine-well-being-survey','columbia-resources/cps-virtual-support', 'external-resources/7-cups-of-tea', 'external-resources/coping-tools-list'],
  'housing': ['housing-covid-faq', 'housing-ra-numbers'],
  'covid': ['connecting-people/samaritan', 'connecting-people/hearts-over-heads', 'resource-list/gssc-covid-resources', 'information/cu-campus-covid-website'],
  'international-students': ['isso-covid-faq', 'isso-maintaining-status', 'register-travel-columbia'],
  'jobs-internships':[]
};

const CampusData = {
  'social': {
    title: 'social',
    imgURL: 'https://lernerhall.columbia.edu/files/lerner/content/columbia-31.gif',
    pageURL: SocialURL,
    data: {
      'facebook-groups': {
        title: 'Facebook Groups',
        imgURL: 'https://lernerhall.columbia.edu/files/lerner/content/columbia-31.gif',
        pageURL: SocialURL+'groups',
        data: {
          'corona-creation-challenge': {
            title: 'Corona Creation Challenge',
            description: 'Share your creations, ideas, stories and resources with other people!',
            imgURL: 'https://scontent.famd1-2.fna.fbcdn.net/v/t1.0-9/89994144_1258020867734532_1508307285024178176_o.jpg?_nc_cat=107&_nc_sid=ca434c&_nc_ohc=PeKDJcJD1ngAX8rOgCv&_nc_ht=scontent.famd1-2.fna&oh=9c2d5717137dd50d020b7689b46a63e4&oe=5EA924EA',
            facebook: 'https://www.facebook.com/groups/2854508524643641/',
          },
          'virtual-campus': {
            title: 'Virtual Campus',
            description: 'Virtual Campus group to mimick campus. Organizing a design challenge next weekend!',
            imgURL: 'https://scontent.famd1-1.fna.fbcdn.net/v/t1.0-9/91390214_3438326979527034_5807334385975820288_o.jpg?_nc_cat=103&_nc_sid=825194&_nc_ohc=dTDGi5HT3ZoAX8wyBWP&_nc_ht=scontent.famd1-1.fna&oh=ad4aafc7f6ccd5f53c4b8c260a819b38&oe=5EAA3DCA',
            facebook: 'https://www.facebook.com/groups/1037607879987462/',
            headerTitle: 'Trending Group',
            headerColor: 'warning'
          },
          'isolating-together': {
            title: 'Isolating Together',
            description: 'Share what people are up to',
            imgURL: 'https://scontent.famd1-2.fna.fbcdn.net/v/t1.0-9/90316730_904758936632997_768721162262806528_o.jpg?_nc_cat=105&_nc_sid=825194&_nc_ohc=9Hc-Ly1CC38AX-IKSTP&_nc_ht=scontent.famd1-2.fna&oh=fcaaaac4e4b87697b58670c4dedf0c09&oe=5EAB8F40',
            facebook: 'https://www.facebook.com/groups/621455138412555/'
          }
        }
      },
      'games': {
        title: 'Games',
        imgURL: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        pageURL: SocialURL+'games',
        data: {
          'tabletopia': {
            title: 'Table Topia',
            description: 'Play 800+ board games online with your friends! Make your own games, schedule games to play with others and have an amazing time! Premium users only for $4 per month.',
            imgURL: 'https://ksr-ugc.imgix.net/assets/012/050/844/0c442edb3fa8aace39db5d36e411e285_original.jpg?ixlib=rb-2.1.0&crop=faces&w=1552&h=873&fit=crop&v=1463727462&auto=format&frame=1&q=92&s=4a08b1c274c2355fb047ead6dc5e2f8c',
            website: 'https://tabletopia.com/',
            iosLink: 'https://apps.apple.com/app/apple-store/id1274379679',
            androidLink: 'https://play.google.com/store/apps/details?id=com.Tabletopia.TabletopiaApp'
          },
          'qurantine-board-games': {
            id: 'qurantine-board-games',
            title: 'Quarantine Games',
            description: 'List of 100+ qurantine games you can play with your friends. Including Board games, Card games, Puzzles, Social Deduction games and more!',
            imgURL: boardGamesPic,
            website: 'https://docs.google.com/document/d/10iOD7Wy_YU4NmkPU7ZH7YTrq11qJAANjZZ0PAotKhR8/preview?fbclid=IwAR22HvSlHktWxHC6Lw4nMVkAcR7gmP0QxoFoDkdvpONJbhEbpj3jvBQ0mNU#heading=h.l0jngib9zs61'
          }
        }
      }
    }
  },
  'mental-health': {
    title: 'Mental health',
    imgURL: 'https://health.columbia.edu/sites/default/files/styles/cu_crop/public/content/pics/Heros/CPS-All-Staff-2019.jpg?h=fc427eec&itok=L83fTsRz',
    pageURL: MentalHealthURL,
    data: {
      'columbia-resources': {
        title: 'Columbia Resources',
        imgURL: 'http://i.imgur.com/7tGEGVo.jpg',
        pageURL: MentalHealthURL + 'columbia-resources',
        data: {
          'cps-virtual-support': {
            title: 'CPS Virtual Support',
            description: 'CPS is offering virtual support groups for students. Sign up here!',
            imgURL: 'http://i.imgur.com/7tGEGVo.jpg',
            website: 'https://health.columbia.edu/content/support-groups-spring-2020',
            headerTitle: 'CPS',
            headerColor: 'warning'
          }
        }
      },
      'external-resources': {
        title: 'External Resources',
        imgURL: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1500&q=80',
        pageURL: MentalHealthURL + 'external-resources',
        data: {
          '7-cups-of-tea': {
            title: '7 Cups Of Tea',
            description: '24/7 online counselling and volunteer listening service, available globally. Anyone can volunteer and will receive proper training!',
            imgURL: 'https://www.7cups.com/cloudfront/img/cup_cover.png',
            website: 'https://www.7cups.com/',
            headerTitle: 'Volunteer!',
            headerColor: 'warning'
          },
          'coping-tools-list': {
            title: 'List of Coping Tools',
            description: 'A list of external resources and coping tools by Columbia.',
            imgURL: mentalHealthPic,
            website: 'https://health.columbia.edu/content/coping-tools'
          }
        }
      },
      'surveys': {
        title: 'Surveys',
        imgURL: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80',
        pageURL: MentalHealthURL + 'surveys',
        data: {
          'quarantine-well-being-survey': {
            title: 'Quarantine Well-Being Survey',
            description: 'We are conducting an anonymous survey to better understand the current well-being of our communities, specifically in regards to mental health. We hope to use our findings from the survey to improve the remote living situation.',
            imgURL: surveyPic,
            website: 'https://tinyurl.com/spo8j8e'
          }
        }
      }
    }
  },
  'housing': {
    title: 'Housing',
    imgURL: 'https://i.ytimg.com/vi/ZdkJJOWG05g/maxresdefault.jpg',
    pageURL: HousingURL,
    data: {
      'housing-covid-faq': {
        title: 'Columbia Housing COVID FAQ',
        description: 'Columbia Housing\'s FAQ for COVID',
        imgURL: covidInfoPic,
        website: 'https://preparedness.columbia.edu/content/housing/checkout2020',
      },
      'housing-ra-numbers': {
        title: 'RA on duty numbers',
        description: 'Numbers for RA on Duty for all current dorms',
        imgURL: housingPic,
        website: 'https://housing.columbia.edu/housing-options/residences/ra-duty',
      }
    }
  },
  'add_resource': {
    title: 'Add Resource',
    imgURL: 'https://i.ytimg.com/vi/ZdkJJOWG05g/maxresdefault.jpg',
    pageURL: NewResourceURL,
    data: {
      'housing-covid-faq': {
        title: 'Columbia Housing COVID FAQ',
        description: 'Columbia Housing\'s FAQ for COVID',
        imgURL: covidInfoPic,
        website: 'https://preparedness.columbia.edu/content/housing/checkout2020',
      },
      'housing-ra-numbers': {
        title: 'RA on duty numbers',
        description: 'Numbers for RA on Duty for all current dorms',
        imgURL: housingPic,
        website: 'https://housing.columbia.edu/housing-options/residences/ra-duty',
      }
    }
  },
  'covid': {
    title: 'COVID',
    imgURL: 'https://health.columbia.edu/sites/default/files/styles/cu_crop/public/content/pics/Heros/medicalservices_hero2.jpg?itok=TqqcsJY3',
    pageURL: COVIDURL,
    data: {
      'connecting-people':{
        title: 'Connecting People',
        imgURL: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        pageURL: COVIDURL+'connecting-people',
        data: {
          'samaritan': {
            title: 'Good Samaritan',
            description: 'Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.',
            imgURL: 'https://cdn.launchaco.com/images/6b60759e-7a35-4038-bab8-f6783589b7d2.png',
            website: 'https://samaritan.launchaco.com/',
            headerTitle: 'Launching 31st March',
            headerColor: 'warning'
          },
          'hearts-over-heads': {
            title: 'Hearts Over Heads',
            description: 'Pairs student volunteers from Columbia University with families who are being adversely impacted, and helps them coordinate video sessions between volunteer and children.',
            imgURL: 'https://uploads-ssl.webflow.com/5e7651fa34e76c26ecb1fa66/5e7661515127a1ab0734dd3d_heartsoverhands4-p-500.png',
            website: 'https://www.heartsoverhands.org/',
          }
        }
      },
      'resource-list': {
        title: 'Resource Lists',
        imgURL: 'https://cdn.pixabay.com/photo/2020/03/16/14/58/coronavirus-4937226_1280.jpg',
        pageURL: COVIDURL+'resources-list',
        data: {
          'gssc-covid-resources': {
            title: 'GSSC Covid Resources',
            description: 'A list of resources compiled by GSSC',
            imgURL: 'https://cdn.pixabay.com/photo/2020/03/16/14/58/coronavirus-4937226_1280.jpg',
            website: 'http://bit.ly/gssc-covid-resources'
          },
          'columbia-covid-resources1': {
            title: 'Columbia Covid Resoures',
            description: 'A list of columbia resources for COVID help.',
            imgURL: covidResourcesPic,
            website: 'http://bit.ly/columbia-covid-resources1',
          }
        }
      },
      'information': {
        title: 'Information',
        imgURL: 'https://images.unsplash.com/photo-1560416313-414b33c856a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
        pageURL: COVIDURL+'information',
        data: {
          'cu-campus-covid-website': {
            title: 'CU Campus COVID Website',
            description: 'FAQ by Columbia Campus on COVID-19',
            imgURL: 'https://i.imgur.com/S7E7wzo.jpg',
            website: 'https://www.columbia.edu/content/coronavirus',
          },
          'cu-campus-health-service-website': {
            title: 'CU Health COVID Website',
            description: 'FAQ by Columbia Health on COVID-19',
            imgURL: 'https://images.unsplash.com/photo-1560416313-414b33c856a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
            website: 'https://preparedness.columbia.edu/news/2019-novel-coronavirus-frequently-asked-questions',
          },
          'cuimc-campus-health-service-website': {
            title: 'CUIMC Health COVID Website',
            description: 'FAQ by Columbia University Irving Medical Center on COVID-19',
            imgURL: 'https://images.pexels.com/photos/3952248/pexels-photo-3952248.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            website: 'https://www.cumc.columbia.edu/student-health/',
          }
        }
      }
    }
  },
  'international-students': {
    title: 'International Students',
    imgURL: 'https://i.ytimg.com/vi/l6cHK1wNaD0/hqdefault.jpg',
    pageURL: InternationalStudentsURL,
    data: {
      'isso-covid-faq': {
        title: 'Columbia ISSO COVID FAQ',
        description: 'ISSO is physically shut, however, maintains a virtual presence. Check out its hub for ISSO resources',
        imgURL: internationalStudentsPic,
        website: 'https://isso.columbia.edu/content/covid-19-hub0',
      },
      'isso-maintaining-status': {
        title: 'Maintaining status',
        description: 'Check out ISSO\'s maintaining status page for international students worried about their status in US. ',
        imgURL: 'https://images.unsplash.com/photo-1518544866330-4e716499f800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
        website: 'https://isso.columbia.edu/content/guidelines-maintaining-status-students'
      },
      'register-travel-columbia': {
        title: 'Register Travel',
        description: 'All Columbia students are required to register their travels here.',
        imgURL: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        website: 'https://globaltravel.columbia.edu/content/register-trip',
      }
    }
  },
  'jobs-internships': {
    title: 'Jobs and Internships',
    imgURL: 'https://www.mailman.columbia.edu/sites/default/files/styles/hero_1500x632/public/jpg/career-1500x632-4.jpg?itok=rCvHZwm5',
    pageURL: JobsInternshipsURL,
    data: {}
  }
};

console.log("logged!");

module.exports = {
  CampusData: CampusData,
  IndexCampusData: IndexCampusData
};