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
      category: 'Jobs, Internships, & Learning',
      tags: ['Productivity']
    }
  },
  'blm': {
    title: 'ActBlue',
    description: 'Act Blue allows you to split up your donations across various bail funds, mutual aid funds, and activist organizations.',
    img: 'https://support.actblue.com/wp-content/uploads/2018/10/support-twitter-social-card_TWITSAFE.png',
    links: {
      website: 'https://secure.actblue.com/donate/bail_funds_george_floyd'
    },
    reviewed: true,
    category: {
      category: 'BLM',
      tags: ['Action Steps']
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
  'health': {
    title: 'Supportiv',
    description: 'A support network that matches users going through similar struggles, in small groups moderated by qualified individuals.',
    img: 'https://mk0supportivcomd7q1r.kinstacdn.com/wp-content/uploads/2019/07/2019_07_SocialImage.png',
    links: {
      website: 'https://www.supportiv.com'
    },
    reviewed: true,
    category: {
      category: 'Health',
      tags: ['Mental']
    }
  },
  'needs': {
    title: 'Fastweb',
    description: 'Fast connection to scholarships, financial aid, and career advice for those in college. A leading resource that helps pay for tuition.',
    img: 'https://www.fastweb.com/uploads/article_photo/photo/2037164/crop635w_google-feature-graphic_1024x500_v2.png',
    links: {
      website: 'https://www.fastweb.com/'
    },
    reviewed: true,
    category: {
      category: 'Basic Needs',
      tags: ['Finances']
    }
  },
  'covid': {
    title: 'CDC Case Updates',
    description: 'Website to help check for COVID symptoms, how to take precautions, etc.',
    img: 'https://celebrityaccess.com/wp-content/uploads/2020/03/1280px-US_CDC_logo.svg-988x416.png',
    links: {
      website: 'https://www.cdc.gov/coronavirus/2019-ncov/index.html'
    },
    reviewed: true,
    category: {
      category: 'COVID-19',
      tags: ['Updates']
    }
  },
};

const Descriptions = {
  'Jobs, Internships, & Learning': 'Resources that assist your internship/job search, motivate self-learning and interview practice, and advertise open positions.',
  'Health': 'Resources that promote physical/emotional wellbeing, raise self-care tips, and help stabilize yourself during these turbulent times.',
  'Social': 'Resources that allow you to stay connected with peers, whether through social media, recreational activities, or more.',
  'Basic Needs': 'Resources that support basic living expenses, such as food, utilities, finances, and more.',
  'Covid- 19': 'Resources that help you stay updated on COVID, check yourself for symptoms, and offer support if you or a loved one is afflicted.',
  'All Resources': 'Resources that promote career, foster health, encourage social connection, support basic needs, and raise awareness of COVID.',
  'BLM': 'Resources that further the #BLM mission to bring justice for colored people through nonprofit organizations, action steps, self-education, and more.'
};

module.exports = {
  Descriptions: Descriptions,
  FeaturedData: FeaturedData
};