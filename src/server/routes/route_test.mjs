/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://expressjs.com/en/guide/routing.html

import express from 'express';
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

export default router;