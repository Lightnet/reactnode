/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from "../helper.js";

const Schema = mongoose.Schema;
var ResourceSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  username: String,
  baseid:String,
  name:String,
  material:{
    type:Number
    ,default:0
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('Resource', ResourceSchema );