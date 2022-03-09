/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
const router = express.Router();

import route_turnbasebattle from "./route_battleturnbase.mjs"

router.use("/battleturn",route_turnbasebattle);

router.get("/",async(req, res)=>{
  console.log("hello");
  res.send("Hello World!")
})

export default router;