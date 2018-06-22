import 'babel-polyfill';

import articleRouter from 'controllers/articleRouter';
import express from 'express';
import http from 'http';
import connectToMongo from './utils/connectToMongo';
import initCronJob from './cron';
import scrape from 'website-scraper';

if (process.env.NODE_ENV === 'local') {
  require('dotenv').config();
}

let app = express();

/* Creates server and web socket */
const server = http.createServer(app);

/* Set up apps with routers and their root URLs here */
app.use('/article', articleRouter);


/* Initialize server locally */
server.listen(process.env.PORT, async (error) => {
  if (error) {
    console.log(`Error initializing server: ${error}`);
  }
  if (process.env.NODE_ENV === 'local') {
    console.log(`> Server is ready on http://localhost:${process.env.PORT}`);
  } else {
    console.log('> Server is ready!');
  }
  // await connectToMongo();
  // Run cronjob to update DB
  // initCronJob();
});


// To keep Heroku App alive
setInterval(function() {
  https.get("https://moody-api-poc.herokuapp.com/");
}, 300000); // every 5 minutes (300000)
