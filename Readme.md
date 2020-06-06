# Columbia Virtual Campus

Welcome to Columbia Virtual Campus.

CVC is a static website (with certain dynamic components) build using 
[React.js](https://reactjs.org/, "React JS"), Javascript and [Firebase](https://firebase.google.com/, "Firebase"). 
It is developed using [Gatsby](https://www.gatsbyjs.org/docs/, "Gatsby"), a static website generator, and utilizes components from [Material UI](https://material-ui.com/getting-started/templates/, "Material UI") and [Material Kit React (By Creative Tim)](https://demos.creative-tim.com/material-kit-react/#/, "Material Kit React").


### Requirements:
1. [Node](https://nodejs.org/en/download/, "Node") (Npm comes installed with it)
2. Gatsby CLI. Install it with `npm i gatsby-cli`


### Running:
1. Fork the github repo and clone it locally.
2. NPM install the packages. (command: `npm install`)
3. Run Command: `gatsby develop`.
4. Go to http://localhost:8000/ to see the output. The website should be up!
5. Any changes made to the code get reflected automatically on the website. If not, the refresh

### Before Submitting:
1. Before submitting code, please run: `gatsby build && gatsby serve`. See the output on http://localhost:9000/ and verify that it is exactly what you want.
2. Make a pull request and inform your Project lead about it. Ask for review on github.


### Creating Firebase Functions:
1. Create a `.env` file in the `functions/` directory.
2. Edit `.env` to contain:  \
`EMAIL=columbiavirtualcampus@gmail.com` \
`PASSWORD=<Ask on Slack for this information>` 
3. Run `$ npm install -g firebase-tools`.
4. While in the `functions/` directory, run `$ firebase login` or `$ firebase login --no-localhost` if you are using the Docker container.
5. Sign in with your email that is associated with the CVC firebase project on the browser to verify your firebase login. (Ask on Slack if you don't have access to the firebase project).
6. To deploy functions, run `$ firebase deploy --only functions`.

Note: You might not have permission to make new functions that rely on HTTP. Use the CVC email to login and deploy in this case.


