/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import { API } from '../../../lib/API.mjs';
import clientDB from "../../../lib/database.mjs";
import { isEmpty } from "../../../lib/helper.mjs";
const router = express.Router();

router.get('/base',async function (req, res) {

  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //console.log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }

  try{
    const BaseOutPost = db.model('BaseOutPost');
    const Character = db.model('Character');

    const baseOutPost = await BaseOutPost.findOne({userid:userid})
    const character = await Character.findOne({userid:userid})
    //console.log(baseOutPost);
    if(baseOutPost){
      return res.send({api:'BASE',base:baseOutPost,character:character});
    }else{
      return res.send({api:'NOBASE'});
    }
  }catch(e){
    return res.send({error:'faildb'});
  }
});

router.post('/baseoutpost',async function (req, res) {
  
  const { api } = req.body;
  if(isEmpty(api)){
    return res.send({error:'fail'});
  }

  let db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //console.log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }
  
  const BaseOutPost = db.model('BaseOutPost');
  const Character = db.model('Character');
  let data = req.body;
  if((isEmpty(data.basename)==true)||(isEmpty(data.charactername)==true)){
    console.log('EMPTY string');
    res.send({error:'empty'});
    return;
  }

  if(api==API.GAME.CREATEMAINBASE){
    try{
      //need to check if base is create
      let newCharacter = new Character({
        userid:userid,
        name:data.charactername
      })
      let saveCharacter = await newCharacter.save();
      console.log(saveCharacter);
      let newBaseOutPost = new BaseOutPost({
        userid:userid,
        name:data.basename,
        isMain:true
      });
      let saveBaseOutPost = await newBaseOutPost.save();
      console.log(saveBaseOutPost);    
      return res.send({api:'CREATE',base:saveBaseOutPost,character:saveCharacter});
    }catch(e){
      return res.send({error:'fail'});
    }
  }
  res.send({error:'fail'});
});

export default router;