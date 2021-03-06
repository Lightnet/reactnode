/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import { API } from '../../lib/API.mjs';
import clientDB from '../../lib/database.mjs';
import { isEmpty } from '../../lib/helper.mjs';
import { log } from '../../lib/log.mjs';
const router = express.Router();

router.get('/post', async function (req, res) {
  
  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }

  try{
    const Post = db.model('Post');
    let posts = await Post.find({recipientid:userid})
      .select('id title content')
      .exec();
    return res.json({api:API.TYPES.POSTS,posts:posts});
  }catch(e){
    log(e)
    return res.json({error:'fail get post db'});
  }
})

router.post('/post',async function (req, res) {
  
  //log(req.body)
  const {api} = req.body;
  //log(api);
  if(isEmpty(api)){
    return res.json({error:'empty'});
  }

  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }
  
  if(api == API.TYPES.CREATE){
    
    try{
      const Post = db.model('Post');

      const data = req.body;
      log(data)
      let newPost = new Post({
          fromid:userid
        , from:username
        , title:data.title
        , content:data.content
      });
      //log(newPost)
      let post = await newPost.save();
      //log(post);
      return res.send({api:API.TYPES.CREATE,post:post});

    }catch(e){
      log(e)
      return res.send({error:'fail create post db'});
    }
  }
  res.json({error:'post error!'})
})

router.put('/post',async function (req, res) {
  
  //log(req.body)
  const {api} = req.body;
  //log(api);
  if(isEmpty(api)){
    return res.json({error:'empty'});
  }

  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }
  
  if(api == API.TYPES.UPDATE){
    
    try{
      const Post = db.model('Post');
      const data = req.body;
      //log(data)
      const filter = { id: data.id };
      const update = { 
          title: data.title
        , content: data.content
      };
      let doc = await Post.findOneAndUpdate(filter, update,{new: true})
        .select('id title content')
        .exec();

      return res.send({api:API.TYPES.UPDATE,post:doc});
    }catch(e){
      log(e)
      return res.send({error:'fail create post db'});
    }
  }
  res.json({error:'post error!'})
})

router.delete('/post',async function (req, res) {
  const {api} = req.body;
  //log("req.body ",req.body);
  //log(api);
  if(isEmpty(api)){
    return res.send({error:'empty'});
  }
  
  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }

  if(api == API.DELETE){
    try{
      const Post = db.model('Post');
      const data = req.body;
      //log(data)
      await Post.deleteOne({id:data.id}).exec();
      //let deletePost = await Post.deleteOne({id:data.id}).exec();
      //log(deletePost)
      return res.send({api:API.DELETE,id:data.id});
    }catch(e){
      log(e)
      return res.send({error:'fail delete post'});
    }
  }
  res.json({error:'post delete'})
})

export default router;