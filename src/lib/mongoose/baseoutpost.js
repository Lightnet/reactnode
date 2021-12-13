/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper';

const Schema = mongoose.Schema;
var BaseOutPostSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  name: String,

  userid: String,
  username: String,
  isMain: {
    type:Boolean,
    default: false
  },
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
mongoose.model('BaseOutPost', BaseOutPostSchema );