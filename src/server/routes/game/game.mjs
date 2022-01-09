import express from 'express';
import clientDB from '../../../lib/database.mjs';
import jwt from 'jsonwebtoken';
import { isEmpty } from '../../../lib/helper.mjs';
const router = express.Router();

router.get('/api/base',async function (req, res) {

  const db = await clientDB();
  let userid =null;

  //console.log(req.session);
  if(req.session.token){
    const User = db.model('User');
    //req.session.token
    //let user = await User.findOne({token:req.session.token});
    let user = await User.findOne({username:req.session.user});
    //console.log(user);
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

  //return res.send({action:'EXIST'});
  res.send({error:'fail'});
});

router.post('/api/baseoutpost',async function (req, res) {
  let db = await clientDB();
  let userid =null;

  if(req.session.token){
    const User = db.model('User');
    //req.session.token
    //let user = await User.findOne({token:req.session.token});
    let user = await User.findOne({username:req.session.user});
    //console.log(user);
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

  if(data.action){
    if(data.action=='CREATEMAINBASE'){

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
    
        return res.send({action:'CREATE',base:saveBaseOutPost,character:saveCharacter});
    
      }catch(e){

        return res.send({error:'fail'});
      }

    }
  }

  res.send({error:'fail'});
});



router.post('/game',async function (req, res) {

  //return res.send({action:'EXIST'});
  res.send({error:'fail'});
});

export default router;