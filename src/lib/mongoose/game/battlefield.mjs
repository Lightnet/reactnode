/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../../helper.mjs';

const Schema = mongoose.Schema;
var BattlefieldSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  userid: String,
  battleid:{
    type:String,
    default: ''
  },
  areaid:{
    type:String,
    default: ''
  },
  type:{
    type:String,
    default: ''
  },
  data:Schema.Types.Mixed,
  x:{
    type:String,
    default: '0'
  },
  y:{
    type:String,
    default: '0'
  },
  z:{
    type:String,
    default: '0'
  },
  created:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('BattleField', BattlefieldSchema );
export default BattlefieldSchema;