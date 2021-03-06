/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import { API } from '../../../lib/API.mjs';
import clientDB from "../../../lib/database.mjs";
import { isEmpty, unixTime } from "../../../lib/helper.mjs";
import { log } from '../../../lib/log.mjs';
const router = express.Router();

router.get('/building',async function (req, res) {

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
    const Building = db.model('Building');
    let buildings = await Building.find({userid:userid}).exec();
    log("Building:", buildings.length);

    if(buildings.length == 0){
      return res.json({api:"EMPTY"});
    }
    if(buildings.length >= 1){
      let builds = [];
      for(let building of buildings){
        let _build = building.data;
        _build.id = building.id;
        builds.push(_build)
      }
      return res.json({api:"BUILDINGS",buildings:builds});
    }
    return res.send({error:'building error'});
  }catch(e){
    return res.send({error:'faildb'});
  }
});

router.post('/building',async function (req, res) {

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

  const {api, building} = req.body;
  if(isEmpty(api)){
    return res.send({error:'Empty'});
  }
  if(api == API.TYPES.CREATE){
    try{
      const Building = db.model('Building');
      let data = req.body;
      log('api',data)
      let newBuilding = new Building({
        userid:userid,
        data:data.building
      })

      let saveBuilding = await newBuilding.save();

      return res.json({api:API.TYPES.CREATE, building:saveBuilding});
    }catch(e){
      return res.send({error:'fail create db'});
    }
  }
  return res.send({error:'fail access'});
});

router.put('/building',async function (req, res) {

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
    const Building = db.model('Building');
    let data = req.body;
    if(data.mode){
      if(data.mode=='BUILD'){
        log("BUILD.....")
        const building = await Building.findOne({id:data.id}).exec();
        if(building.data.mode=='BUILD'){
          //return res.json({error:"BUILDALREADY"});
          let remaintime = building.data.buildtime - unixTime();
          if(remaintime <=0){
            //check if finish build
            building.data.mode = 'idle';
            building.data.buildtime = 0;

            let query = {
              id:data.id
            }
            let update ={
              data:building.data
            }

            let doc = await Building.findOneAndUpdate(query, update, {
              new: true
            });
            
            return res.json({api:"BUILDFINISH",time:0});
          }else{
            //return time remain
            return res.json({api:"BUILDTIME",time:building.data.buildtime});
          }
        }
        building.data.mode = 'BUILD';
        building.data.buildtime = building.data.buildtime + unixTime();
        log(building.data.buildtime)
        //let obj = building.data;
        let query = {
          id:data.id
        }
        let update ={
          data:building.data
        }

        let doc = await Building.findOneAndUpdate(query, update, {
          new: true
        });
        log(doc)
        return res.json({api:"BUILDTIME",time:building.data.buildtime});
      }
    }

    if(data.api){
      if(data.api=='CHECKBUILD'){
      
      }  
    }
  }catch(e){
    log(e)
    return res.send({error:'fail create db'});
  }
});





export default router;