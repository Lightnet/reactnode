import express from 'express';
import clientDB from '../../../lib/database.mjs';
const router = express.Router();

router.post('/game',async function (req, res) {

  //return res.send({action:'EXIST'});
  res.send({error:'fail'});
});

export default router;