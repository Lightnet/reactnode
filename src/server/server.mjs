/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.npmjs.com/package/connect-mongo
// https://expressjs.com/en/resources/middleware/session.html
// 
import express from "express";
import routes from './routes/routes.mjs';
import dotEnv from 'dotenv';
import clientDB from '../lib/database.mjs';
import bodyParser from 'body-parser';

import session  from 'express-session';

dotEnv.config();

var secret = process.env.SECRET;
console.log(secret)

const app = express();
const port = 3000;

async function main(){
  let db = await clientDB();

  //public | dist > folder
  app.use(express.static('dist'));

  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  app.use(bodyParser.json())

  // Access the session as req.session
  app.get('/', (req, res) => {
    res.send(
      '<script src="/bundle.js"></script>'
    )
  })
  //Routes
  app.use(routes); 
  const server = app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`)
  })
  process.on('SIGTERM',()=>{
    server.close();
  })
}

main();

export default app;