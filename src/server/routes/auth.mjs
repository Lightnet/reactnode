/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://expressjs.com/en/guide/routing.html

import express from 'express';
import clientDB from "../../lib/database.mjs";
import { checkToken } from '../../lib/helperToken.mjs';
const router = express.Router();

var secret = process.env.SECRET;
var enableSession = process.env.ISSESSION || true;
var enableCookie = process.env.ISCOOKIE || true;

console.log("secret:", secret)

// https://expressjs.com/en/guide/using-middleware.html
// dev need remove?
router.use((req, res, next) => {
  //console.log('Time:', Date.now())
  //console.log('Request URL:', req.originalUrl)
  //console.log('Request Type:', req.method)
  //console.log("req.session.token: ",req.session.token)
  //console.log("req.cookies.token: ",req.cookies.token)
  //console.log(req.originalUrl.match("/src"))
  if(req.originalUrl == "/"){
    return next();
  }else if(req.originalUrl?.indexOf("/@vite") == 0){
    //console.log("FOUND vite!")
    return next();
  }else if(req.originalUrl?.indexOf("/src") == 0 ){
    //console.log("FOUND src!")
    return next();
  }else if(req.originalUrl?.indexOf("/@react-refresh") == 0 ){
    //console.log("FOUND /@react-refresh!")
    return next();
  }else if(req.originalUrl?.indexOf("/node_modules") == 0 ){
    //console.log("FOUND /node_modules!")
    return next();
  }else if(req.originalUrl?.indexOf("/__vite_ping") == 0 ){
    //console.log("FOUND /__vite_ping!")
    return next();
  }else if(req.originalUrl?.indexOf("/api") == 0 ){
    console.log("FOUND /api!")
    console.log('Request URL:', req.originalUrl)
    if(req.session.token){
      console.log("checking...")
      let sessionToken = checkToken(req.session.token);
      console.log(sessionToken)
    }


    return next();
  }else{
    console.log('Request URL:', req.originalUrl)
  }
  next()
})


router.post('/signin',async function (req, res) {
  var contentType = req.headers['content-type'];
  console.log(contentType);
  console.log(req.body); // your JSON
  let data = req.body;
  let db = await clientDB();
  let User = db.model('User');
  let user = await User.findOne({ username: data.userName }).exec();
  //console.log("users");
  //console.log(users);
  if(!user){
    return res.send({action:'NONEXIST'});
  }else{
    if(user.validPassword(data.password)){
      //user.toAuthJSON();
      //console.log("[login] password pass!");
      //console.log(req.session);
      let datasub = user.toAuthJSON()
      if(enableSession){
        console.log(datasub);
        req.session.user = datasub.name;
        req.session.token = datasub.token;
      }

      if(enableCookie){
        res.cookie("user", datasub.name)
        res.cookie("token", datasub.token)
      }
      
      return res.send({action:'LOGIN',user:datasub.name,token:datasub.token});
    }else{
      console.log("[login] password fail!");
      return res.send({error:"PASSWORDFAIL"});
    }
    //return res.send({action:'EXIST'});
  }

  //return res.send(req.body); // echo the result back
  //res.send(`<html lang="en">page</html>`);
});

router.post('/signup',async function (req, res) {
  console.log(req.body); // your JSON
  let data = req.body;
  let db = await clientDB();
  let User = db.model('User');
  let users = await User.findOne({ username: data.user }).exec();
  //console.log("users");
  //console.log(users);
  if(!users){
    let newUser = new User({
      username: data.user
    });
    newUser.setPassword(data.password);
    let saveUser = await newUser.save();
    //return res.send(saveUser);
    return res.send({action:'CREATE'});
  }else{
    return res.send({action:'EXIST'});
  }

  //return res.send(req.body); // echo the result back
  //res.send(`<html lang="en">page</html>`);
});

router.post('/signout',async function (req, res) {
  //console.log(req.session)
  //req.session.user = null;
  //req.session.token = null;
  if(req.session){
    req.session.destroy(function(err) {
      console.log(err);
      console.log(req.session);
      // cannot access session here
    })
  }

  if(req.cookies?.token){
    res.clearCookie('token')
    res.clearCookie('user')
  }

  
  //console.log(req.body); // your JSON
  //let data = req.body;
  let db = await clientDB();
  let User = db.model('User');
  // neeed token
  // 

  //let user = await User.findOne({ username: data.user }).exec();
  //if(!user){
    //return res.send({action:'NONEXIST'});
  //}else{
    //return res.send({action:'EXIST'});
  //}
  return res.json({action:'SIGNOUT'}); // echo the result back
  //return res.send({error:'ERROR'}); // echo the result back
  //res.send(`<html lang="en">page</html>`);
});

router.get('/session',async function (req, res) {
  //console.log(req.session);
  return res.json(req.session);
})

//router.get('/cookie', function (req, res) {
  //console.log('cookie ...')
  //res.json({cookie:'nocookie'})
//})

export default router;