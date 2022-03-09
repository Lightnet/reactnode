/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import { API } from '../../../lib/API.mjs';
import clientDB from '../../../lib/database.mjs';
import Creature from '../../../lib/game/creature.js';
import { nanoid16 } from '../../../lib/helper.mjs';
const router = express.Router();

router.get('/',async function (req, res) {

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
    const BattleField = db.model('BattleField');
    let BattleFields = await BattleField.find({userid:userid}).exec();
    //if there no battle count create battle
    if(BattleFields.length==0){
      return res.json({api:API.GAME.NOBATTLE});
    }
    //if there current battle get and send to user
    if(BattleFields.length==1){
      return res.json({api:API.TYPES.UPDATE,battlefield:BattleFields[0].data});
    }

    return res.send({api:API.NONE});
  }catch(e){
    return res.send({error:'faildb'});
  }
});

router.post('/',async function (req, res) {

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
    let data = req.body;
    console.log(data);
    if(data.api){
      if(data.api == API.GAME.RANDOMBATTLE){//RANDOMBATTLE
        const Character = db.model('Character');
        const BattleField = db.model('BattleField');
        let characters = await Character.find({userid:userid}).exec();
        let BattleFields = await BattleField.find({userid:userid}).exec();
        if(BattleFields.length==0){
          console.log("CREATE BATTLE...");
          try{
          
            let battleid = nanoid16();
            let new_creature = new Creature({
              id:nanoid16(),
              name:"rabit",
              races:['beast'],
              healthpoint:10,
              healthpointmax:10,
              experience:5
            });
      
            //let player = JSON.parse(characters[0].data);
            let player = characters[0].data;
            let newBattleData = {};
            newBattleData.turns =0;//number battle turns
            newBattleData.allyturns =0;//count many unit finish
            newBattleData.foeturns =0;
            newBattleData.ally=[];
            newBattleData.foe=[];
            newBattleData.ally.push(player);
            newBattleData.foe.push(new_creature);
      
            let newBattleField = new BattleField({
              userid: userid
              , battleid:battleid
              , data: newBattleData
            });

            let saveBattleField = await newBattleField.save();
            const User = db.model('User');
            await User.findOneAndUpdate({id: userid},{battleid:battleid}, {
              new: true
            });
            return res.json({api:"CREATED",battlefield:newBattleData});
          }catch(e){
            console.log(e)
            return res.json({api:"FAIL"});
          }
        }
      }

      if(data.api == 'BATTLE'){
        const Character = db.model('Character');
        const BattleField = db.model('BattleField');
        let battleid;
        //let characters = await Character.find({userid:userid}).exec();
        let battleFields = await BattleField.find({userid:userid}).exec();

        if(battleFields.length==0){
          return res.json({api:"NOBATTLE"});
        }

        if(battleFields.length==1){
          //let battleData = JSON.parse(battleFields[0].data);
          let battleData = battleFields[0].data;
          battleid = battleFields[0].battleid;
          
          //set up entity for attacking each other
          let player = battleData.ally[0];
          let opponent = battleData.foe[0];
          let isFinish = false;
          let stopAttack = false;

          //base attack
          let attack = opponent.defencepoint - player.attackpoint;
          if(attack >= 0){
            attack = 0;
          }
          opponent.healthpoint = opponent.healthpoint + attack;

          if(opponent.healthpoint <=0){
            stopAttack=true;
            isFinish=true;
          }

          //check if oppent is alive stop attacks
          if(stopAttack==false){
            attack = (player.defencepoint - opponent.attackpoint);
            if(attack >= 0){
              attack=0;
            }
            player.healthpoint = player.healthpoint + attack;
          }

          if(isFinish==false){
            try{
              //reassign
              battleData.ally[0]=player;
              battleData.foe[0]=opponent;
              console.log(battleData);
              let data=[];
              //data= JSON.stringify(battleData);
              data= battleData;
            
              let battleFieldUpate = await BattleField.findOneAndUpdate({battleid: battleid},{data:data}, {
                new: true
              });
              console.log(battleFieldUpate);
              return res.json({api:"UPDATE",battlefield:battleData});
            }catch(e){
              console.log("FAIL UPDATE BATTLE!");
              return res.json({api:"BATTLEERROR"});
            }
          }else{
            // check enemies and ally is needed later to finish battle.
            player.experience = player.experience + opponent.giveexp;

            //let charData = JSON.stringify(player);
            let charData = player;

            let updateCharacter = await Character.findOneAndUpdate({id:player.id},{data:charData},{new:true}).exec();
            let deleteBattleField =  await BattleField.findOneAndDelete({battleid: battleid});
            console.log(deleteBattleField);
            const User = db.model('User');
            await User.findOneAndUpdate({id: userid},{battleid:''}, {
              new: true
            });

            return res.json({api:"BATTLEFINISH",character:updateCharacter});
          }
        }
      }
    }
    return res.send({error:'fail battle'});
  }catch(e){
    console.log(e)
    return res.send({error:'fail battle db'});
  }
});

export default router;