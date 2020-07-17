const FeaturedData = {
  'jobs-internships': {
    title: 'Brain.fm',
    description: 'Music that helps you be more productive! Designed to enhance your mood, focus, relaxation, sleep, and more!',
    img: 'https://www.brain.fm/assets/img/focus-animation_bcba3d519ff8406664b93fe49a8fa2e8.gif',
    links: {
      website: 'https://www.brain.fm/'
    },
    reviewed: true,
    category: {
      category: 'Jobs/ Internships',
      tags: ['Productivity']
    }
  },
  'progress': {
    title: 'ActBlue',
    description: 'Act Blue allows you to split up your donations across various bail funds, mutual aid funds, and activist organizations.',
    img: 'https://support.actblue.com/wp-content/uploads/2018/10/support-twitter-social-card_TWITSAFE.png',
    links: {
      website: 'https://secure.actblue.com/donate/bail_funds_george_floyd'
    },
    reviewed: true,
    category: {
      category: 'Progressive Communities',
      tags: ['BLM']
    }
  },
  'social': {
    title: 'Sentiment',
    description: 'Sentiment is an SMS messaging service to keep you connected with both yourself and the ones you love.',
    img: 'https://www.joinsentiment.com/static/media/bg_new.825f5d29.png',
    links: {
      website: 'https://www.joinsentiment.com'
    },
    reviewed: true,
    category: {
      category: 'Social',
      tags: ['Connected']
    }
  },
  'needs': {
    title: 'Supportiv',
    description: 'A support network that matches users going through similar struggles, in small groups moderated by qualified individuals.',
    img: 'https://mk0supportivcomd7q1r.kinstacdn.com/wp-content/uploads/2019/07/2019_07_SocialImage.png',
    links: {
      website: 'https://www.supportiv.com'
    },
    reviewed: true,
    category: {
      category: 'Basic Needs',
      tags: ['Mental Health']
    }
  },
  'events': {
    title: 'U.S. ICE News Releases',
    description: 'All official statements and news released by the United States Immigration and Customs Enforcement.',
    img: 'https://www.felhaber.com/wp-content/uploads/ICE.jpg',
    links: {
      website: 'https://www.ice.gov/news/releases/sevp-modifies-temporary-exemptions-nonimmigrant-students-taking-online-courses-during'
    },
    reviewed: true,
    category: {
      category: 'Current Events',
      tags: ['International Students']
    }
  },
};

const Descriptions = {
  'Jobs/ Internships': 'Resources that assist your internship/job search, provide interview practice, and advertise open positions.',
  'Learning/ Academics': 'Resources that promote self-learning, boost study productivity, and give access to academic offerings.',
  'Social': 'Resources that allow you to stay connected with peers, whether through social media, recreational activities, or more.',
  'Basic Needs': 'Resources that support basic living expenses, such as food, utilities, finances, and more.',
  'Current Events': 'Resources that help you stay updated on current events, including COVID-19, ICE news releases, and more.',
  'All Resources': 'Resources that promote career, foster health, encourage social connection, support basic needs, and raise awareness of COVID.',
  'Progressive Communities': 'Resources that further progressive communities through nonprofit organizations, action steps, self-education, and more.'
};

module.exports = {
  Descriptions: Descriptions,
  FeaturedData: FeaturedData
};