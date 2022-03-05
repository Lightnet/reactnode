/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://expressjs.com/en/guide/routing.html

import crypto from 'crypto';
import express from 'express';
//import session from 'express-session';
import clientDB from "../../lib/database.mjs";
import { checkToken, parseJwt } from '../../lib/helperToken.mjs';
const router = express.Router();

var secret = process.env.SECRET;
var enableSession = process.env.ISSESSION || true;
var enableCookie = process.env.ISCOOKIE || false;

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
      //let sessionToken = checkToken(req.session.token, secret);
      //console.log("sessionToken: ", sessionToken)
    }
    return next();
  }else if(req.originalUrl?.indexOf("/session") == 0 ){
    console.log("FOUND /session!")
    console.log('Request URL:', req.originalUrl)
    if(req.session.token){
      console.log("checking...")
      let sessionToken = checkToken(req.session.token, secret);
      console.log("sessionToken: ", sessionToken)
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
      //let datasub = user.toAuthJSON()
      let token = user.generateToken(req)
      if(enableSession){
        console.log(token);
        req.session.user = user.username;
        req.session.token = token;
        try{
          await user.save()
        }catch(e){
          console.log("LOGIN FAIL SAVE TOKEN!")
        }
      }

      if(enableCookie){
        res.cookie("user", user.name)
        res.cookie("token", token)
      }
      
      return res.send({action:'LOGIN',user:user.username,token:token});
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
  let token =null;
  if(req.session?.token){
    token=req.session.token;
  }

  /*
  

  if(req.cookies?.token){
    res.clearCookie('token')
    res.clearCookie('user')
  }
  */

  let db = await clientDB();
  let User = db.model('User');
  // neeed token
  // 
  let user = await User.findOne({ token: token }).exec();
  if(user){
    console.log(user);
    if(user.token == token){
      console.log("FOUND");
      let datatoken = checkToken(token, secret); //check token
      if(datatoken){//passed
        let hash = crypto.createHash('md5').update(req.ip + user.tokenSalt).digest('hex');
        if(hash == datatoken.hash){
          console.log("FOUND HASH!")
          try{  
            user.tokenSalt="";
            user.token="";
            await user.save()
          }catch(e){
            console.log(e);
          }
          if(req.session){//delete session
            req.session.destroy(function(err) {
              console.log(err);
              console.log(req.session);
            })
          }
        }
      }else{
        //check for fake or outdate token
        datatoken = parseJwt(token);
        console.log(datatoken);
        let hash = crypto.createHash('md5').update(req.ip + user.tokenSalt).digest('hex');
        // if expire but match the hash update token to none.
        if(hash == datatoken.hash){
          console.log("OUTDATE FOUND HASH!")
          try{  
            user.tokenSalt="";
            user.token="";
            await user.save()
          }catch(e){
            console.log(e);
          }
        }
        // clear out session
        if(req.session){//delete session
          req.session.destroy(function(err) {
            console.log(err);
            console.log(req.session);
          })
        }
      }
    }
    return res.send({api:'LOGOUT'});
  }else{
    return res.send({api:'NOTOKEN!'});
  }
  //return res.send({error:'ERROR'}); // echo the result back
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