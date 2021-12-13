/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
const router = express.Router();
import test from './test.mjs';
import auth from './auth.mjs';
import game from './game/game.mjs';

router.use(test); 
router.use(auth); 
router.use(game); 

export default router;