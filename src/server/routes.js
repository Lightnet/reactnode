/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
const router = express.Router();
import route_test from './routes/route_test.js';
import auth from './routes/auth.js';
import game from './routes/game/game.js';

router.use(route_test); 
router.use(auth); 
router.use(game); 

export default router;