/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from "../helper.mjs";

const Schema = mongoose.Schema;
var BaseOutPostSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  name: String,
  userid: String,
  isMain: {
    type:Boolean,
    default: false
  },
  data: Schema.Types.Mixed,
  mapid: {
    type:String,
    default: ''
  },
  maptype: {
    type:String,
    default: 'map'
  },
  x: {
    type:Number,
    default: 0
  },
  y: {
    type:Number,
    default: 0
  },
  z: {
    type:Number,
    default: 0
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('BaseOutPost', BaseOutPostSchema );
export default BaseOutPostSchema;