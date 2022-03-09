/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import clientDB from '../../lib/database.mjs';
const router = express.Router();

router.get('/ggm',async function (req, res) {

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


    
    return res.send({api:'NONE'});
  }catch(e){
    return res.send({error:'fail db'});
  }

  //return res.send({action:'EXIST'});
  res.send({error:'fail'});
});


export default router;