const imageLinks = {
  csi:'https://i.imgur.com/xgW2gTv.jpg'
};

let eventsData = [
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
    display:false,
    title: 'Genderev Social Network Launch',
    startTime: new Date(2020, 3, 22, 19),
    endTime: new Date(2020, 3, 22, 21),
    description: 'genderev.com is the new social network for members of Genderev at Columbia. ',
    tags: ['Social'],
    website: 'https://genderev.com/',
    imgLink: 'https://imgur.com/hn6bJ4R.jpg',
    eventLink: ['http://meet.jit.si/genderev'],
    eventLinkHeader:['Event'],
    hostedBy: 'Genderev',
    repeat: 'weekly'
  },
  {
    display:false,
    title: 'The Ivy League+ vs Covid-19 12 Hour Charity Stream',
    startTime: new Date(2020, 3, 25, 13),
    endTime: new Date(2020, 3, 26, 13),
    description: 'Columbia Esports is proud to announce that we will be participating in a League of Legends Charity Tournament with ' +
      'The Ivy League, MIT, and Stanford to support the hard efforts of workers combating COVID-19. ' +
      'All donations will be donated to the WHO Covid-19 Solidarity Fund.',
    tags: ['Games'],
    website: '',
    imgLink: 'https://cdn.images.express.co.uk/img/dynamic/143/590x/League-of-Legends-servers-down-1259147.jpg?r=1585327760984',
    eventLinks: [
      {
        link: 'https://discord.gg/5YVfC4a'
      },
      {
        title: 'Twitch',
        link: 'twitch.tv/yaleesports'
      },
      {
        title: 'Twitch',
        link: 'twitch.tv/ColumbiaUniversityEsports'
      },
    ],
    hostedBy: 'Columbia Esports',
  },
  {
    display:false,
    title: 'ColumbiaVotes Town Hall',
    startTime: new Date(2020, 3, 28, 19),
    endTime: new Date(2020, 3, 28, 20),
    description: "It's up to all of us to slow the spread of COVID-19. Everyone, including young and healthy people, " +
      "should avoid large gatherings during this time. Stay up-to-date with public health guidelines from cdc.gov.",
    tags: ['Activism'],
    website: 'https://www.facebook.com/events/639134516813684',
    imgLink: 'https://scontent.fstv6-1.fna.fbcdn.net/v/t1.0-9/51794275_242634223342669_8609539717546901504_o.png?_nc_cat=100&_nc_sid=85a577&_nc_ohc=Oqpz5--3wk0AX_SC3C-&_nc_ht=scontent.fstv6-1.fna&oh=f17acf3a981d29feaf8cffe81e2494ba&oe=5EC50AFF',
    eventLink: [
      {
        title: 'Zoom',
        link: 'https://columbiauniversity.zoom.us/j/9653202444'
      }
    ],
    hostedBy: 'ColumbiaVotes',
  },
  {
    display:false,
    title: 'Zionist Aesthetics in Pre-State Israel',
    startTime: new Date(2020, 3, 27, 20),
    endTime: new Date(2020, 3, 27, 21, 15),
    description: 'We will delve into how Zionism was interpreted and fused in different art movements ' +
      'when envisioning the new Hebrew society in Eretz Israel.',
    tags: ['Education'],
    website: 'https://www.ssimovement.org/lectures.html',
    imgLink: 'https://imgur.com/VenjFsK.jpg',
    eventLink: [
      {
        title: 'Zoom',
        link: 'https://us04web.zoom.us/j/750012737?pwd=bkJqYjFSNXNIY0p5eWp1YTZpL3hXQT09',
        pass: 'SSI2012'
      }
    ],
    hostedBy: 'Students Supporting Israel at Columbia University',
  },
  {
    display:false,
    title: 'Dr. Dana Levin: Medicine in Space',
    startTime: new Date(2020, 4, 1, 15),
    endTime: new Date(2020, 4, 1, 16),
    description: 'Join us over Zoom to learn about medicine in extreme environments with flight surgeon & researcher ' +
        'Dr. Dana Levin. From Antarctica to outer space - learn how doctors keep people healthy in the harshest of conditions.',
    tags: ['Engineering', 'Medicine'],
    website: 'https://www.facebook.com/events/703319930207112/',
    imgLink: imageLinks.csi,
    eventLink: [
      {
        title: 'Zoom',
        link: 'https://columbiauniversity.zoom.us/j/418057536?pwd=T1kzZ1FLd1hLWTRpc0t6TzcwRlZpUT09'
      }
    ],
    hostedBy: 'Columbia Space Initiative',
  },
  {
    display:false,
    title: 'Columbia/Barnard Theatre Producing Workshop and Q&A',
    startTime: new Date(2020, 4, 2, 13),
    endTime: new Date(2020, 4, 2, 15),
    description: 'Join a group of on-campus producers with experience covering productions with BTE, CMTS, CUP, KCST, NOMADS, ' +
        'The Varsity Show, and XMAS! for an informal Zoom workshop and Q&A this Saturday (May 2) at 1PM EST on producing ' +
        'student theatre at Barnumbia!',
    tags: ['Theatre'],
    website: 'https://www.facebook.com/events/235908647824143/?notif_t=plan_user_joined&notif_id=1588103328461127',
    imgLink: 'https://imgur.com/yMupSqA.jpg',
    eventLink: [
    ],
    hostedBy: 'Nakiri Gallagher-Cave',
  },
  {
    display:false,
    title: 'Columbia Virtual Campus Study Break',
    startTime: new Date(2020, 4, 12, 18),
    endTime: new Date(2020, 4, 12, 19),
    description: 'Join the Columbia Virtual Campus team for a quick study break! Play jackbox.tv ' +
        'and talk about anything from the latest manga to finals stories.',
    tags: ['Social'],
    website: 'http://columbiavirtualcampus.com/',
    imgLink: 'https://i.imgur.com/c7ZAMDS.jpg',
    eventLink: [
      {
        title: 'Zoom',
        link: 'https://us04web.zoom.us/j/74810927135?pwd=cHMvVjNzQVYrTHduYjAxRDRId09RZz09',
        pass: '0YP20m'
      }
    ],
    hostedBy: 'Columbia Virtual Campus',
  },
  {
    display:false,
    title: 'CVC Post Final Stress Relief',
    startTime: new Date(2020, 4, 21, 18),
    endTime: new Date(2020, 4, 21, 19),
    description: 'Kickback, relax and enjoy post final with the Columbia Virtual Campus Team. Lets watch something together!',
    tags: ['Social'],
    website: 'http://columbiavirtualcampus.com/',
    imgLink: 'https://i.imgur.com/c7ZAMDS.jpg',
    eventLink: [
      {
        title: 'Zoom',
        link: 'https://us04web.zoom.us/j/71151367257?pwd=YmZJNUsrbVM3UU9yWXFaRFRLZkFuQT09',
        pass: '4LvfDf'
      }
    ],
    hostedBy: 'Columbia Virtual Campus',
  },
  {
    display:true,
    title: 'Summer Kickoff',
    startTime: new Date(2020, 4, 27, 18),
    endTime: new Date(2020, 4, 27, 19),
    description: 'Kickback, relax and enjoy post finals with the Columbia Virtual Campus Team. Maybe even come up with a todo list for the summer? ',
    tags: ['Social'],
    website: 'http://columbiavirtualcampus.com/',
    imgLink: 'https://i.imgur.com/c7ZAMDS.jpg',
    eventLink: [
      {
        title: 'Zoom',
        link: 'https://us04web.zoom.us/j/78063403140?pwd=R0NUaXhCWHlzWkdFeUkvZG9XYVY4QT09',
        pass: '7QVccb'
      }
    ],
    hostedBy: 'Columbia Virtual Campus',
  },
  {
    display:true,
    title: 'Pet Therapy Series (Day 1)',
    startTime: new Date(2020, 4, 31, 18),
    endTime: new Date(2020, 4, 31, 19),
    description: 'Meet Vanessa, CVC communication lead\'s cute and grumpy little cat for a short Q&A',
    tags: ['Social'],
    website: 'http://columbiavirtualcampus.com/',
    imgLink: 'https://i.imgur.com/c7ZAMDS.jpg',
    eventLink: [
      {
        title: 'Zoom',
        link: 'https://us04web.zoom.us/j/74252295412?pwd=T1VFK0FBejZBT0hTZnVUeGRBU016dz09',
        pass: '0nkJp5'
      }
    ],
    hostedBy: 'Columbia Virtual Campus',
  }
];

eventsData.sort(function(a, b){
  return new Date(a.startTime) - new Date(b.startTime);
});

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// let new_arr = [];
// for (const i in events){
//   if(events[i].hasOwnProperty('repeat')){
//     if (events[i].repeat === 'weekly'){
//       for(let i=1; i<11; i+=1){
//         let new_event = events;
//         new_event.startTime = addDays(events.startTime,i*7);
//         new_event.endTime = addDays(events.endTime,i*7);
//         new_arr.push(new_event)
//       }
//     }
//   }
// }
// events.push(...new_arr);
for (const i in eventsData){
  eventsData[i]['id'] = i+1;
}

export default eventsData
