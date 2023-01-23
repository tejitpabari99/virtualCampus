const FeaturedData = {
  'learning-academics': {
    title: 'Brain.fm',
    descriptions: {
      description: 'Music that helps you be more productive! Designed to enhance your mood, focus, relaxation, sleep, and more!',
      wantSupportWith: 'Staying productive during COVID-19',
      thisResourceOffers: 'Curated music designed to enhance your mood, focus, relaxtion, sleep, and stay more productive'
    },
    img: 'https://www.brain.fm/assets/img/focus-animation_bcba3d519ff8406664b93fe49a8fa2e8.gif',
    links: {
      website: 'https://www.brain.fm/'
    },
    reviewed: true,
    category: {
      category: 'Learning/ Academics',
      tags: ['Productivity']
    }
  },
  'progress': {
    title: 'ActBlue',
    descriptions: {
      description: 'ActBlue allows you to split up your donations across various bail funds, mutual aid funds, and activist organizations.',
      wantSupportWith: 'Seeking new ways to be an ally to the BLM Movement',
      thisResourceOffers: 'A platform that lets you split up your donations across various bail funds, mutual aid funds, and activist organizations'
    },
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
  'events': {
    title: 'Middle East Readings',
    descriptions: {
      description: 'If you are looking for educational material regarding the Middle East, check out this curated list of readings by the Washington Institute.',
      wantSupportWith: 'Beirut Explosion relief efforts',
      thisResourceOffers: 'Reading list to learn more about the Middle East'
    },
    img: 'https://yt3.ggpht.com/a/AATXAJw6RiledZpFbXt0bPDGlLslyEnPBGezJqTENg=s900-c-k-c0xffffffff-no-rj-mo',
    links: {
      website: 'https://www.washingtoninstitute.org/support/reading_list'
    },
    reviewed: true,
    category: {
      category: 'Current Events',
      tags: ['Lebanon']
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
