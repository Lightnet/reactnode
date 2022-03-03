/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
const router = express.Router();

router.get('/contact', function (req, res) {
  //throw new Error('BROKEN'); //test fetch error
  res.json({message:'contact page'})
})

export default router;