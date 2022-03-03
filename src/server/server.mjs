/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.npmjs.com/package/connect-mongo
// https://expressjs.com/en/resources/middleware/session.html
// 
import chalk from 'chalk';
import http from 'http';
import express from "express";
import dotEnv from 'dotenv';
import bodyParser from 'body-parser';
import session  from 'express-session';
import routes from './routes.mjs';
import cors from "cors";
//import clientDB from '../lib/database.js';
import { networkInterfaces } from 'os';

const log = console.log;

// load .env var
dotEnv.config();

//const SECRET = process.env.SECRET;
//console.log(SECRET)

//var DATABASE_URL = process.env.DATABASE_URL;
//console.log("DATABASE_URL: ",DATABASE_URL)

const app = express();
const PORT =  process.env.PORT || 3000;
const HOST = process.env.HOST ||"0.0.0.0";

function getIPAddress() {
  // import { networkInterfaces } from 'os';
  var interfaces = networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}
// https://www.npmjs.com/package/cors
var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

async function main(){
  //let db = await clientDB();

  //app.use(cors(corsOptions))
  app.use(cors())
  //public | dist > folder
  app.use(express.static('dist'));

  //app.set('trust proxy', 1) // trust first proxy
  app.set('PORT', PORT)
  app.set('HOST', HOST)

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

  //app.get('/game', (req, res) => {
    //res.send(
      //'<script src="/bundle.js"></script>'
    //)
  //})

  //Routes
  app.use(routes); 
  //const server = app.listen(app.get('PORT'), () => {
    //console.log(`Server app listening at http://localhost:${PORT}`)
  //})
  const server = http.createServer(app);

  //server.listen(app.get('PORT'),()=>{
  server.listen(app.get('PORT'),app.get('HOST'),()=>{
    console.log('Init Server listen...')
    //console.log("SERVER:: ",server.address())
  });

  server.on('listening', function() {
    let localhost = getIPAddress();
    console.log(`IP address 0 on http://${localhost}:${PORT} <- Local host IP address machine`);
    //console.log(`IP address 1 on http://localhost:${PORT} <- Default for dev testing...`);
    log("");
    log("IP address 1 on "+chalk.green(`http://localhost:${PORT} `) + chalk.red('Default for dev testing.'));
    log("");
    //console.log(`IP address 2 on http://${HOST}:${PORT}`)// does not work but if "0.0.0.0" this will aollow outside access
    //console.log(`IP address 3 on http://127.0.0.1:${PORT}`);//does not work script // Content Security Policy 
    //console.log(`IP address 4 on http://localhost:${PORT}/ip <- IP Test`);
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    //console.log("SERVER:: ",server.address())
  });

  // https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits

  /*
  process.on('exit',()=>{
    server.close();
  })

  //catches ctrl+c event
  process.on('SIGINT',()=>{
    server.close();
  })

  process.on('SIGTERM',()=>{
    server.close();
  })

  //catches uncaught exceptions
  process.on('uncaughtException',()=>{
    server.close();
  })
  */
}

main();

export default app;