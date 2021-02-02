/**
 * Author: Tristan Thompson
 * Date Jan 27 2021
 * 
 * This is a tutorial on Node.js and Express
 * 
 * Notes:
 * - curl -H lets me specify HTTPS headers
 * - curl -d lets me specify the body data {"text": "Hello World"} this is accessible on req.body
 */

import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
// These are folders for containing modular routes (./routes) & models for storing my data (./models) This can also be configured to get data from a database as well


import routes from './routes';
import models from './models';

const app = express();

 // This is a custom middleware that determines a pseudo authenticated user to associate a message to.
app.use((req, res, next) => {
  console.log(models)
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);



// This allows us to extract the body portion of an incomin' request stream and make it accessible on req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This adds the CORS header which allows 
app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);

console.log('Hello ever running Node.js project.');

console.log(process.env.MY_SECRET);