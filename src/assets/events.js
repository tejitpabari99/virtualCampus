const now = new Date();
const { DateTime } = require("luxon");
const boardGamesImage = require('./img/boardgame_pexels.jpg');
const eventLinkUnavailable = 'TBA';

let convertDate = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())
};

export default [
  {
    id: 0,
    display:false,
    title: 'Lioncraft Barnard Launch',
    startTime: new Date(2020, 3, 19, 17),
    endTime: new Date(2020, 3, 19, 19),
    description: 'Our goal is to provide current and former Columbia students with a virtual campus to reunite with ' +
      'classmates and professors in the Minecraft Virtual World. By working together as a community, ' +
      'users can help rebuild Columbia in all of its glory, block by block.',
    tags: ['Education'],
    website: 'http://lioncraft.nyc/',
    imgLink: 'http://lioncraft.nyc/assets/img/home.png',
    eventLink: '',
    eventLinkHeader:'Zoom Link',
    hostedBy: 'Lioncraft'
  },
  {
    id: 1,
    display:true,
    title: 'Yom HaShoah Webinar with Sami Steigmann',
    startTime: new Date(2020, 3, 20, 15),
    endTime: new Date(2020, 3, 20, 16),
    description: 'April 20-21 is the Holocaust Memorial Day in Israel. We are hosting a webinar called ""Yom Hashoah with Sami Steigmann". ' +
      'He is a Holocaust survivor and Motivational Speaker. In the event, he delves into the importance of History, terminology, ' +
      'Israel, and prosperity. ',
    tags: ['Social'],
    website: 'https://www.ssimovement.org/lectures.html',
    imgLink: 'https://i.imgur.com/ThrrIKY.jpg',
    eventLink: 'https://us02web.zoom.us/j/81378805266?pwd=UVRyWGZ3bUZvUzlPZ3VQcU1yYnZ4Zz09',
    eventLinkHeader:'Zoom Link',
    hostedBy: 'Students Supporting Israel at Columbia University',
  },
  {
    id: 2,
    display:true,
    title: 'Talking Israel on Campus',
    startTime: new Date(2020, 3, 20, 20),
    endTime: new Date(2020, 3, 20, 21),
    description: 'We plan to host a webinar with Dalia Zahger (GS \'19); she is an SSI Columbia President Alumna. ' +
      'She going to reflect on her own experience as a former SSI president and going to discuss how to address and ' +
      'respond to questions about Israel on campus.',
    tags: ['Activism'],
    website: 'https://www.ssimovement.org/lectures.html',
    imgLink: 'https://i.imgur.com/ThrrIKY.jpg',
    eventLink: ' https://us04web.zoom.us/j/398347703?pwd=cmkvaFQvRXJoODBkSy9VSWlzQnJYdz09',
    eventLinkHeader:'Zoom Link',
    hostedBy: 'Students Supporting Israel at Columbia University',
  },
  {
    id: 3,
    display:true,
    title: 'Genderev Social Network Launch',
    startTime: new Date(2020, 3, 22, 13),
    endTime: new Date(2020, 3, 22, 15),
    description: 'genderev.com is the new social network for members of Genderev at Columbia. ',
    tags: ['Social'],
    website: 'https://genderev.com/',
    imgLink: 'https://i.imgur.com/jdjf6vY.jpg',
    eventLink: '',
    eventLinkHeader:'',
    hostedBy: 'Genderev',
    weekly: true
  }
]

