/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://expressjs.com/en/guide/routing.html

import express from 'express';
import clientDB from "../../lib/database.js";
const router = express.Router();

router.post('/signin',async function (req, res) {
  //console.log(req.body); // your JSON
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
      let datasub = user.toAuthJSON()
      req.session.user = datasub.name;
      req.session.token = datasub.token;
      //console.log(req.session);
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
  console.log(req.session)
  //req.session.user = null;
  //req.session.token = null;
  req.session.destroy(function(err) {
    console.log(err);
    console.log(req.session);
    // cannot access session here
  })
  //console.log(req.body); // your JSON
  //let data = req.body;
  //let db = await clientDB();
  //let User = db.model('User');
  //let user = await User.findOne({ username: data.user }).exec();
  //console.log("users");
  //console.log(users);
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

router.get('/cookie', function (req, res) {
  console.log('cookie ...')
  res.json({cookie:'nocookie'})
})

export default router;