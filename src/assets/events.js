const now = new Date();
const { DateTime } = require("luxon");
const boardGamesImage = require('./img/boardgame_pexels.jpg');
const eventLinkUnavailable = 'TBA';

let convertDate = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes())
};

let events = [
  {
    display:false,
    title: 'Lioncraft Barnard Launch',
    startTime: new Date(2020, 3, 19, 17),
    endTime: new Date(2020, 3, 19, 19),
    shortDescription: 'Our goal is to provide current and former Columbia students with a virtual campus to reunite with ' +
      'classmates and professors in the Minecraft Virtual World. By working together as a community, ' +
      'users can help rebuild Columbia in all of its glory, block by block.',
    longDescription:'',
    tags: ['Education'],
    website: 'http://lioncraft.nyc/',
    imgLink: 'http://lioncraft.nyc/assets/img/home.png',
    eventLink: '',
    eventLinkHeader:'Zoom Link',
    hostedBy: 'Lioncraft'
  },
  {
    display:false,
    title: 'Yom HaShoah Webinar with Sami Steigmann',
    startTime: new Date(2020, 3, 20, 15),
    endTime: new Date(2020, 3, 20, 16),
    shortDescription: 'April 20-21 is the Holocaust Memorial Day in Israel. We are hosting a webinar called ""Yom Hashoah with Sami Steigmann". ' +
      'He is a Holocaust survivor and Motivational Speaker. In the event, he delves into the importance of History, terminology, ' +
      'Israel, and prosperity. ',
    longDescription:'',
    tags: ['Social'],
    website: 'https://www.ssimovement.org/lectures.html',
    imgLink: 'https://i.imgur.com/ThrrIKY.jpg',
    eventLink: 'https://us02web.zoom.us/j/81378805266?pwd=UVRyWGZ3bUZvUzlPZ3VQcU1yYnZ4Zz09',
    eventLinkHeader:'Zoom Link',
    hostedBy: 'Students Supporting Israel at Columbia University',
  },
  {
    display:false,
    title: 'Talking Israel on Campus',
    startTime: new Date(2020, 3, 20, 20),
    endTime: new Date(2020, 3, 20, 21),
    shortDescription: 'We plan to host a webinar with Dalia Zahger (GS \'19); she is an SSI Columbia President Alumna. ' +
      'She going to reflect on her own experience as a former SSI president and going to discuss how to address and ' +
      'respond to questions about Israel on campus.',
    longDescription:'',
    tags: ['Activism'],
    website: 'https://www.ssimovement.org/lectures.html',
    imgLink: 'https://i.imgur.com/ThrrIKY.jpg',
    eventLink: ' https://us04web.zoom.us/j/398347703?pwd=cmkvaFQvRXJoODBkSy9VSWlzQnJYdz09',
    eventLinkHeader:'Zoom Link',
    hostedBy: 'Students Supporting Israel at Columbia University',
  },
  {
    display:true,
    title: 'Genderev Social Network Launch',
    startTime: new Date(2020, 3, 22, 13),
    endTime: new Date(2020, 3, 22, 15),
    shortDescription: 'genderev.com is the new social network for members of Genderev at Columbia. ',
    longDescription:'',
    tags: ['Social'],
    website: 'https://genderev.com/',
    imgLink: 'https://imgur.com/hn6bJ4R.jpg',
    eventLink: ['http://meet.jit.si/genderev'],
    eventLinkHeader:['Event'],
    hostedBy: 'Genderev',
    repeat: 'weekly'
  },
  {
    display:true,
    title: 'The Ivy League+ vs Covid-19 12 Hour Charity Stream',
    startTime: new Date(2020, 3, 25, 13),
    endTime: new Date(2020, 3, 26, 13),
    shortDescription: 'Columbia Esports is proud to announce that we will be participating in a League of Legends Charity Tournament with ' +
      'The Ivy League, MIT, and Stanford to support the hard efforts of workers combating COVID-19. ' +
      'All donations will be donated to the WHO Covid-19 Solidarity Fund.',
    longDescription:'Columbia Esports is proud to announce that we will be participating in a League of Legends Charity ' +
      'Tournament with The Ivy League, MIT, and Stanford to support the hard efforts of workers combating COVID-19. ' +
      'All donations will be donated to the WHO Covid-19 Solidarity Fund. We are partnering up with esports organizations TSM, ' +
      'Team Liquid, and FlyQuest to raise funds in this 12-hour charity stream tournament. The school with the highest total ' +
      'donation will be graciously matched by TSM up to $5000, and they will also be providing limited edition jerseys and ' +
      'mouse pads to donors! Invite your friends and family to come watch the stream and support the World Health Organization!',
    tags: ['Games'],
    website: '',
    imgLink: 'https://cdn.images.express.co.uk/img/dynamic/143/590x/League-of-Legends-servers-down-1259147.jpg?r=1585327760984',
    eventLink: ['https://discord.gg/5YVfC4a', 'https://discord.gg/5YVfC4a'],
    eventLinkHeader:['Discord', 'Discord'],
    hostedBy: 'Columbia Esports',
  }
];



function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

for (const i in events){
  events[i]['id'] = i+1;
}

export default events

