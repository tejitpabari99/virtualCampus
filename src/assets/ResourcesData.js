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


const IndexCampusData = {
  'social': ['corona-creation-challenge', 'isolating-together', 'tabletopia', 'quarantine-board-games'],
  'health': ['cps-virtual-support','quarantine-well-being-survey','cps-virtual-support', '7-cups-of-tea', 'coping-tools-list'],
  'needs': ['samaritan', 'spectrum'],
  'covid': ['hearts-over-heads', 'gssc-covid-resources', 'cu-campus-covid-website'],
  'jobs-internships': ['flypaper-tutors']
};

const FeaturedData = {
  'social': 'corona-creation-challenge',
  'health': 'cps-virtual-support',
  'needs': 'samaritan',
  'covid': 'hearts-over-heads',
  'jobs-internships': 'flypaper-tutors'
};

const CampusData = {
  'social': {
    title: 'Social',
    img: 'https://health.columbia.edu/sites/default/files/styles/cu_crop/public/content/pics/Heros/CPS-All-Staff-2019.jpg?h=fc427eec&itok=L83fTsRz',
    pageURL: SocialURL,
    data: {
      'corona-creation-challenge': {
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
      'virtual-campus': {
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
      'isolating-together': {
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
      'tabletopia': {
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
      'quarantine-board-games': {
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
    }
  },
  'health': {
    title: 'Health',
    img: 'https://health.columbia.edu/sites/default/files/styles/cu_crop/public/content/pics/Heros/CPS-All-Staff-2019.jpg?h=fc427eec&itok=L83fTsRz',
    pageURL: HealthURL,
    data: {
      'cps-virtual-support': {
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
      '7-cups-of-tea': {
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
      'coping-tools-list': {
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
      'quarantine-well-being-survey': {
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
    }
  },
  'needs': {
    title: 'Needs',
    img: 'https://i.ytimg.com/vi/ZdkJJOWG05g/maxresdefault.jpg',
    pageURL: NeedsURL,
    data: {
      'samaritan': {
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
      'spectrum': {
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
    }
  },
  'covid': {
    title: 'COVID-19',
    img: 'https://health.columbia.edu/sites/default/files/styles/cu_crop/public/content/pics/Heros/medicalservices_hero2.jpg?itok=TqqcsJY3',
    pageURL: COVIDURL,
    data: {
      'hearts-over-heads': {
        title: 'Hearts Over Heads',
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
      'gssc-covid-resources': {
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
      'columbia-covid-resources1': {
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
       'cu-campus-covid-website': {
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
      'cu-campus-health-service-website': {
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
      'cuimc-campus-health-service-website': {
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
      'covid-watcher': {
        title: 'Consolidated Coronavirus Live Updates',
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
    }
  },
  'jobs-internships': {
    title: 'Jobs and Internships',
    img: 'https://www.mailman.columbia.edu/sites/default/files/styles/hero_1500x632/public/jpg/career-1500x632-4.jpg?itok=rCvHZwm5',
    pageURL: JobsInternshipsURL,
    data: {
      'flypaper-tutors': {
        title: 'Coronavirus Live Updates',
        description: 'Non-profit remote tutoring platform created by two SEAS juniors at Columbia! People can sign up to tutor or recruit students in your area to be tutored.',
        img: 'data:image/jpeg;base64,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',
        links: {
          website: 'https://flypapertutors.org/'
        },
        reviewed: true,
        category: {
          category: 'jobs and internships',
          tags: ['Learning', 'Job']
        }
      }
    }
  }
};

module.exports = {
  CampusData: CampusData,
  IndexCampusData: IndexCampusData,
  FeaturedData: FeaturedData
};
