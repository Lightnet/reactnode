/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://expressjs.com/en/guide/routing.html

import express from 'express';
import { verifyToken } from '../middleware/VerifyToken.mjs';
import CryptoJS from 'crypto-js';
const router = express.Router();

//Middle ware that is specific to this router
//router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  //next();
//});

// define the name page route
router.get('/test', function (req, res) {
  res.send('test page')
})

router.get('/json', function (req, res) {
  //throw new Error('BROKEN'); //test fetch error
  res.json({message:'test page'})
})

router.get('/jsone', function (req, res) {
  throw new Error('BROKEN'); //test fetch error
  res.json({message:'test page'})
})

// http://expressjs.com/en/4x/api.html#res.cookie

router.get('/setcookie', function (req, res) {
  res.cookie('Cookie token name','encrypted cookie string Value');
  res.send('Cookie have been saved successfully');
})

// get the cookie incoming request
router.get('/getcookie', (req, res) => {
  //show the saved cookies
  console.log(req.cookies)
  res.send(req.cookies);
});

router.get('/deletecookie', (req, res) => {
  //show the saved cookies
  res.clearCookie('Cookie token name')
  res.send('Cookie has been deleted successfully');
});

router.get('/exit', function (req, res) {
  console.log('browser close...')
  res.send('test page')
})
// https://expressjs.com/en/api.html
// https://sailsjs.com/documentation/reference/request-req/req-accepts
// https://stackoverflow.com/questions/23271250/how-do-i-check-content-type-using-expressjs
// https://techeplanet.com/express-set-content-type/
// https://flaviocopes.com/express-headers/
// https://hackersandslackers.com/making-api-requests-with-nodejs/
router.get('/agent', function (req, res) {
  console.log("///////////////////////////")
  //console.log("json: ",req.is('json'))
  console.log(req.accepts('application/json'))
  if (req.accepts('application/json')) {// 'accept':'application/json, charset=utf-8'
    console.log("FOUND json")
  }

  //console.log("Request type :", req.get('Content-Type'));
  //console.log("Request type :", req.get('Content-Type')?.match('application/json'));
  var contype = req.headers['content-type'];
  console.log(contype)
  if (contype && contype.indexOf('application/json') == 0){//pass
    console.log(contype.indexOf('application/json'));
  }

  let agent = req.headers['user-agent'];
  console.log(agent);
  let accept = req.headers['accept']
  console.log("accept:", accept);
  res.json(agent)
})

// middleware check token
// 
router.get('/refreshtest', verifyToken, function (req, res) {
  //console.log(req.get('authorization'))
  //console.log(req.test)
  //console.log(req.test1)
  res.json({test:"test"})
})
// https://code-boxx.com/simple-javascript-password-encryption-decryption/
router.post('/refreshtest', verifyToken, function (req, res) {
  console.log(req.get('authorization'))
  console.log(req.body)

  if(req.body.password){
    let auth = req.get('authorization')
    auth = auth.split(' ')[1]
    var bytes = CryptoJS.AES.decrypt(req.body.password, auth);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText); // 'my message'
  }
  //console.log(req.test1)
  res.json({test:"test"})
})

router.post('/testlogin', verifyToken, function (req, res) {
  console.log(req.get('authorization'))
  console.log(req.body)

  if(req.body.password){
    let auth = req.get('authorization')
    auth = auth.split(' ')[1]
    var bytes = CryptoJS.AES.decrypt(req.body.password, auth);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText); // 'my message'
  }
  //console.log(req.test1)
  res.json({test:"test"})
})

router.delete('/refreshdelete', verifyToken, function (req, res) {
  //console.log(req.get('authorization'))
  console.log(req.body)
  //console.log(req.test1)
  res.json({test:"delete test"})
})
export default router;