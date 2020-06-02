const rootURL = '/';
const CampusURL = rootURL + '';
const SocialURL = CampusURL + 'social/';
const HealthURL = CampusURL + 'health/';
const COVIDURL = CampusURL + 'covid/';
const JobsInternshipsURL = CampusURL + 'jobs-internships/';
const NeedsURL = CampusURL + 'basic-needs/';

// const facebookGroupPic = 'https://engineering.fb.com/wp-content/uploads/2017/05/fb-hero-image-001.jpeg';
// const instagramGroupPic = 'https://colorlib.com/wp/wp-content/uploads/sites/2/instagram-image-size.jpg';
// const googleSheetsPic = 'https://helpdeskgeek.com/wp-content/pictures/2020/01/google-sheets.png';
const surveyPic = 'https://imgur.com/fwMQ75E.jpg';
const covidResourcesPic = 'https://imgur.com/OSw7HmK.jpg';
const covidInfoPic = 'https://imgur.com/AJy6GJz.jpg';
// const jobsPic = 'https://images.unsplash.com/photo-1568598035424-7070b67317d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1498&q=80';
// const internshipPic = 'https://images.unsplash.com/photo-1524749292158-7540c2494485?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';
// const medicalSuppliesPic = 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';
const mentalHealthPic = 'https://imgur.com/pwGrd8f.jpg';
const housingPic = 'https://imgur.com/LkYpJR9.jpg';
const internationalStudentsPic = 'https://i.imgur.com/xOA11BT.jpg';
const boardGamesPic = 'https://imgur.com/ocFCBAf.jpg';
// const medicalSuppliesMainImage = 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';

const FeaturedData = {
  'social': {
        title: 'Corona Creation Challenge',
        description: 'Share your creations, ideas, stories and resources with other people!',
        img: 'https://scontent.fbom26-1.fna.fbcdn.net/v/t1.0-9/89994144_1258020867734532_1508307285024178176_o.jpg?_nc_cat=107&_nc_sid=825194&_nc_ohc=M62YqTcTB0MAX-gqFpn&_nc_ht=scontent.fbom26-1.fna&oh=9deb49600539c756b21acc9845287aaa&oe=5ED89AEA',
        links: {
          website: 'https://www.facebook.com/groups/2854508524643641/',
          facebook: 'https://www.facebook.com/groups/2854508524643641/'
        },
        reviewed: true,
        category: {
          category: 'social',
          tags: ['Recreation', 'Connected']
        }
      },
  'health': {
        title: 'CPS Virtual Support',
        description: 'CPS is offering virtual support groups for students. Sign up here!',
        img: 'http://i.imgur.com/7tGEGVo.jpg',
        links: {
          website: 'https://health.columbia.edu/content/support-groups-spring-2020'
        },
        reviewed: true,
        headerTitle: 'CPS',
        headerColor: 'warning',
        category: {
          category: 'health',
          tags: ['Columbia', 'Mental']
        }
      },
  'needs': {
        title: 'Good Samaritan',
        description: 'Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.',
        img: 'https://cdn.launchaco.com/images/6b60759e-7a35-4038-bab8-f6783589b7d2.png',
        links: {
          website: 'https://samaritan.launchaco.com/'
        },
        reviewed: true,
        headerTitle: 'Launching 31st March',
        headerColor: 'warning',
        category: {
          category: 'basic needs',
          tags: ['Columbia', 'Finances']
        }
      },
  'covid': {
        title: 'Hearts Over Hands',
        description: 'Pairs student volunteers from Columbia University with families who are being adversely impacted, and helps them coordinate video sessions between volunteer and children.',
        img: 'https://uploads-ssl.webflow.com/5e7651fa34e76c26ecb1fa66/5e7661515127a1ab0734dd3d_heartsoverhands4-p-500.png',
        links: {
          website: 'https://www.heartsoverhands.org/'
        },
        reviewed: true,
        category: {
          category: 'covid',
          tags: ['Columbia']
        }
      },
  'jobs-internships': {
        title: 'Flypaper Tutors',
        description: 'Non-profit remote tutoring platform created by two SEAS juniors at Columbia! People can sign up to tutor or recruit students in your area to be tutored.',
        img: 'data:image/png;base64,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',
        links: {
          website: 'https://flypapertutors.org/'
        },
        reviewed: true,
        category: {
          category: 'jobs and internships',
          tags: ['Learning', 'Job']
        }
      }
};

const CampusData = {
  'social': {
    title: 'Social',
    pageURL: SocialURL,
    data: [
      {
        title: 'Corona Creation Challenge',
        description: 'Share your creations, ideas, stories and resources with other people!',
        img: 'https://scontent.fbom26-1.fna.fbcdn.net/v/t1.0-9/89994144_1258020867734532_1508307285024178176_o.jpg?_nc_cat=107&_nc_sid=825194&_nc_ohc=M62YqTcTB0MAX-gqFpn&_nc_ht=scontent.fbom26-1.fna&oh=9deb49600539c756b21acc9845287aaa&oe=5ED89AEA',
        links: {
          website: 'https://www.facebook.com/groups/2854508524643641/',
          facebook: 'https://www.facebook.com/groups/2854508524643641/'
        },
        reviewed: true,
        category: {
          category: 'social',
          tags: ['Recreation', 'Connected']
        }
      },
      {
        title: 'Virtual Campus',
        description: 'Virtual Campus group to mimic campus. Organizing a design challenge next weekend!',
        img: 'https://scontent.fbom26-1.fna.fbcdn.net/v/t1.0-9/94481910_3496984410327957_3655923926686498816_o.jpg?_nc_cat=108&_nc_sid=825194&_nc_ohc=HO-nujUoyo0AX9Vbqzh&_nc_ht=scontent.fbom26-1.fna&oh=a751596f98c8f7b05d86424bfe547b23&oe=5ED823BC',
        links: {
          website: 'https://www.facebook.com/groups/1037607879987462/',
          facebook: 'https://www.facebook.com/groups/1037607879987462/'
        },
        reviewed: true,
        category: {
          category: 'social',
          tags: ['Columbia', 'Connected'],
        },
        headerTitle: 'Trending Group',
        headerColor: 'warning'
      },
      {
        title: 'Isolating Together',
        description: 'Share what people are up to.',
        img: 'https://scontent.fbom26-1.fna.fbcdn.net/v/t1.0-9/90316730_904758936632997_768721162262806528_o.jpg?_nc_cat=105&_nc_sid=825194&_nc_ohc=D9-S5ldX77oAX9RU9j5&_nc_ht=scontent.fbom26-1.fna&oh=ae6793395bcf86e23b2d1c9c83e02f34&oe=5EDB0540',
        links: {
          website: 'https://www.facebook.com/groups/621455138412555/',
          facebook: 'https://www.facebook.com/groups/621455138412555/'
        },
        reviewed: true,
        category: {
          category: 'social',
          tags: ['Connected']
        }
      },
      {
        title: 'Tabletopia',
        description: 'Play 800+ board games online with your friends! Make your own games, schedule games to play with others and have an amazing time! Premium users only for $4 per month.',
        img: 'https://imgur.com/51FxBbO.jpg',
        links: {
          website: 'https://tabletopia.com/'
        },
        reviewed: true,
        iosLink: 'https://apps.apple.com/app/apple-store/id1274379679',
        androidLink: 'https://play.google.com/store/apps/details?id=com.Tabletopia.TabletopiaApp',
        category: {
          category: 'social',
          tags: ['Recreation', 'Games']
        }
      },
      {
        id: 'quarantine-board-games',
        title: 'Quarantine Games',
        description: 'List of 100+ quarantine games you can play with your friends. Including Board games, Card games, Puzzles, Social Deduction games and more!',
        img: boardGamesPic,
        links: {
          website: 'https://docs.google.com/document/d/10iOD7Wy_YU4NmkPU7ZH7YTrq11qJAANjZZ0PAotKhR8/preview?fbclid=IwAR22HvSlHktWxHC6Lw4nMVkAcR7gmP0QxoFoDkdvpONJbhEbpj3jvBQ0mNU#heading=h.l0jngib9zs61'
        },
        reviewed: true,
        category: {
          category: 'social',
          tags: ['Recreation', 'Games']
        }
      }
    ]
  },
  'health': {
    title: 'Health',
    pageURL: HealthURL,
    data: [
      {
        title: 'CPS Virtual Support',
        description: 'CPS is offering virtual support groups for students. Sign up here!',
        img: 'http://i.imgur.com/7tGEGVo.jpg',
        links: {
          website: 'https://health.columbia.edu/content/support-groups-spring-2020'
        },
        reviewed: true,
        headerTitle: 'CPS',
        headerColor: 'warning',
        category: {
          category: 'health',
          tags: ['Columbia', 'Mental']
        }
      },
      {
        title: '7 Cups Of Tea',
        description: '24/7 online counselling and volunteer listening service, available globally. Anyone can volunteer and will receive proper training!',
        img: 'https://www.7cups.com/cloudfront/img/cup_cover.png',
        links: {
          website: 'https://www.7cups.com/'
        },
        reviewed: true,
        headerTitle: 'Volunteer!',
        headerColor: 'warning',
        category: {
          category: 'health',
          tags: ['Mental']
        }
      },
      {
        title: 'List of Coping Tools',
        description: 'A list of external resources and coping tools by Columbia.',
        img: mentalHealthPic,
        links: {
          website: 'https://health.columbia.edu/content/coping-tools'
        },
        reviewed: true,
        category: {
          category: 'health',
          tags: ['Columbia', 'Mental']
        }
      },
      {
        title: 'Quarantine Well-Being Survey',
        description: 'Conducting an anonymous survey to better understand the current well-being of our communities, specifically in regards to mental health. We hope to use our findings from the survey to improve the remote living situation.',
        img: surveyPic,
        links: {
          website: 'https://tinyurl.com/spo8j8e'
        },
        reviewed: true,
        category: {
          category: 'health',
          tags: ['Columbia', 'Mental']
        }
      }
    ]
  },
  'needs': {
    title: 'Basic Needs',
    pageURL: NeedsURL,
    data: [
      {
        title: 'Good Samaritan',
        description: 'Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.',
        img: 'https://cdn.launchaco.com/images/6b60759e-7a35-4038-bab8-f6783589b7d2.png',
        links: {
          website: 'https://samaritan.launchaco.com/'
        },
        reviewed: true,
        headerTitle: 'Launching 31st March',
        headerColor: 'warning',
        category: {
          category: 'basic needs',
          tags: ['Columbia', 'Finances']
        }
      },
      {
        title: 'Spectrum',
        description: 'Offers plans to install wifi at a free-low cost for those in need to help people stay connected who can\'t afford to do so.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwB2sGrS4dtc9HtR2rtEmfCoSZaE6o-XfBZqb80ooT0V9Xwv5_&usqp=CAU',
        links: {
          website: 'https://www.spectrum.net/support/internet/coronavirus-covid-19-educational-internet-offer'
        },
        reviewed: true,
        category: {
          category: 'basic needs',
          tags: ['Columbia', 'Finances']
        }
      },
    ]
  },
  'covid': {
    title: 'COVID-19',
    pageURL: COVIDURL,
    data: [
      {
        title: 'Hearts Over Hands',
        description: 'Pairs student volunteers from Columbia University with families who are being adversely impacted, and helps them coordinate video sessions between volunteer and children.',
        img: 'https://uploads-ssl.webflow.com/5e7651fa34e76c26ecb1fa66/5e7661515127a1ab0734dd3d_heartsoverhands4-p-500.png',
        links: {
          website: 'https://www.heartsoverhands.org/'
        },
        reviewed: true,
        category: {
          category: 'covid',
          tags: ['Columbia']
        }
      },
      {
        title: 'GSSC Covid Resources',
        description: 'A list of resources compiled by GSSC',
        img: 'https://cdn.pixabay.com/photo/2020/03/16/14/58/coronavirus-4937226_1280.jpg',
        links: {
          website: 'http://bit.ly/gssc-covid-resources'
        },
        reviewed: true,
        category: {
          category: 'covid',
          tags: ['Columbia']
        }
      },
      {
        title: 'Columbia Covid Resources',
        description: 'A list of Columbia resources for COVID help.',
        img: covidResourcesPic,
        links: {
          website: 'http://bit.ly/columbia-covid-resources1'
        },
        reviewed: true,
        category: {
          category: 'covid',
          tags: ['Columbia']
        }
      },
       {
        title: 'CU Campus COVID Website',
        description: 'FAQ by Columbia Campus on COVID-19',
        img: 'https://i.imgur.com/S7E7wzo.jpg',
        links: {
          website: 'https://www.columbia.edu/content/coronavirus'
        },
        reviewed: true,
        category: {
          category: 'covid',
          tags: ['Columbia']
        }
      },
      {
        title: 'CU Health COVID Website',
        description: 'FAQ by Columbia Health on COVID-19',
        img: 'https://images.unsplash.com/photo-1560416313-414b33c856a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
        links: {
          website: 'https://preparedness.columbia.edu/news/2019-novel-coronavirus-frequently-asked-questions'
        },
        reviewed: true,
        category: {
          category: 'covid',
          tags: ['Columbia']
        }
      },
      {
        title: 'CUIMC Health COVID Website',
        description: 'FAQ by Columbia University Irving Medical Center on COVID-19',
        img: 'https://images.pexels.com/photos/3952248/pexels-photo-3952248.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        links: {
          website: 'https://www.cumc.columbia.edu/student-health/'
        },
        reviewed: true,
        category: {
          category: 'covid',
          tags: ['Columbia']
        }
      },
      {
        title: 'Coronavirus Live Updates',
        description: 'Coronavirus Live Updates. Option to view map/tracker.',
        img: 'data:image/png;base64,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',
        links: {
          website: 'https://www.nytimes.com/2020/05/05/us/coronavirus-updates.html?action=click&pgtype=Article&state=default&module=styln-coronavirus-national&region=TOP_BANNER&context=storyline_menu'
        },
        reviewed: true,
        category: {
          category: 'covid',
          tags: ['Updates']
        }
      }
    ]
  },
  'jobs-internships': {
    title: 'Jobs and Internships',
    pageURL: JobsInternshipsURL,
    data: [
      {
        title: 'Flypaper Tutors',
        description: 'Non-profit remote tutoring platform created by two SEAS juniors at Columbia! People can sign up to tutor or recruit students in your area to be tutored.',
        img: 'data:image/png;base64,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',
        links: {
          website: 'https://flypapertutors.org/'
        },
        reviewed: true,
        category: {
          category: 'jobs and internships',
          tags: ['Learning', 'Job']
        }
      }
    ]
  }
};

module.exports = {
  CampusData: CampusData,
  FeaturedData: FeaturedData
};
