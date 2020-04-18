const now = new Date();
const boardGamesImage = require('./img/boardgame_pexels.jpg');

export default [
  {
    id: 0,
    title: 'Weekly Board Game Nights',
    startTime: new Date(2020, 3, 24, 17),
    endTime: new Date(2020, 3, 24, 19),
    description: 'Do you miss Hex? Does the word "Catan" bring back fond memories? Join us every week starting every ' +
      'Friday evening to play online games with friends and form this new virtual community.',
    tags: ['events'],
    location: 'https://www.google.com',
    imgLink: boardGamesImage,
  }
]