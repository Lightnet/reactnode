/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from "../../helper.mjs";

const Schema = mongoose.Schema;
var BuildingSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  username: String,
  baseid: String,
  data: Schema.Types.Mixed,
  cost: Schema.Types.Mixed,
  level:  {
    type:Number,
    default: 0
  },
  upgradetime:  {
    type:Number,
    default: 100
  },
  buildtime:  {
    type:Number,
    default: 0
  },
  autobuild:{
    type:Boolean,
    default: false
  },
  producttime:  {
    type:Number,
    default: 5
  },
  producetime:  {
    type:Number,
    default: 5
  },
  itemname:  {
    type:String,
    default: 'energyore'
  },
  producestock:  {
    type:Number,
    default: 1
  },
  stock:  {
    type:Number,
    default: 0
  },
  maxstock:  {
    type:Number,
    default: 1000
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('Building', BuildingSchema );
export default BuildingSchema;

