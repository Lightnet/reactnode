/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from "../../helper.mjs";

const Schema = mongoose.Schema;
var CharacterSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  name:String,
  data:Schema.Types.Mixed,
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('Character', CharacterSchema );
export default CharacterSchema;