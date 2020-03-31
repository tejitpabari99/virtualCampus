const sampleAppData = [
  {
    id: 1,
    developer: ["Anthony Krivonos (SEAS 2021)"],
    imageURL: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    title: "Samaritan",
    blurb: "Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.",
    description: "Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.",
    iosAppLink: '/covid-resources/1',
    websiteLink: 'https://getsamaritan.app/',
    facebookLink: 'https://www.facebook.com/theSamaritanApp/',
    instagramLink: 'https://www.instagram.com/samaritan.app/',
    emailID: 'tvp2107@columbia.edu'
  },
  {
    id: 2,
    developer: ["Anthony"],
    imageURL: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    title: "Random App",
    blurb: "Random App is a great project. It gives you random applications that you can see.",
    description: "Random App is a great project. It gives you random applications that you can see.",
    androidAppLink: '/covid-resources/1',
    twitterLink: 'https://getsamaritan.app/',
    linkedinLink: 'https://www.facebook.com/theSamaritanApp/',
    githubLink: 'https://www.instagram.com/samaritan.app/'
  },
  {
    id:3,
    developer: ["Anthony Krivonos (SEAS 2021)", "Mark Mason (SEAS 2020)", "COVID Updates Lol"],
    imageURL: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    title: "Samaritan",
    blurb: "Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.",
    description: "Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.",
    androidAppLink: '/covid-resources/1',
    iosAppLink: '/covid-resources/1',
    websiteLink: 'https://getsamaritan.app/',
    facebookLink: 'https://www.facebook.com/theSamaritanApp/',
    instagramLink: 'https://www.instagram.com/samaritan.app/',
    twitterLink: 'https://getsamaritan.app/',
    linkedinLink: 'https://www.facebook.com/theSamaritanApp/',
    githubLink: 'https://www.instagram.com/samaritan.app/',
    emailID: 'tvp2107@columbia.edu'
  },
  {
    id:4,
    developer: ["Anthony"],
    imageURL: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    title: "Random App",
    blurb: "Samaritan is a platform that connects those in quarantine with good samaritans willing to perform essential tasks and purchase necessities for them.",
    description: "Random App is a great project. It gives you random applications that you can see."
  }
];

const sampleCOVIDresourcesData = [
  {
    id: 'food',
    imgURL: 'https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    data: [
      {
        id: 'link1',
        title: 'Link1',
        description: 'Description',
        imgURL: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        linkURL: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
      }
    ]
  },
  {
    id: 'shelter',
    imgURL: 'https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    data: [
      {
        id: 'link1',
        title: 'Link1',
        description: 'Description',
        imgURL: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        linkURL: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
      }
    ]
  },
  {
    id: 'internet',
    imgURL: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    data: [
      {
        id: 'link1',
        title: 'Link1',
        description: 'Description',
        imgURL: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
        linkURL: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
      }
    ]
  }
];

module.exports = {
  sampleAppData: sampleAppData,
  sampleCOVIDresourcesData: sampleCOVIDresourcesData
};