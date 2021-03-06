/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import route_contact from './route_contact.mjs';
import route_message from './route_message.mjs';
import route_post from './route_post.mjs';
import route_script from './route_script.mjs';

import route_game from './game/route_game.mjs';
import route_battle from './game/route_battle.mjs';
import route_turnbasebattle from './game/route_battleturnbase.mjs';

const router = express.Router();

router.use(route_contact);
router.use(route_message);
router.use(route_post);
router.use(route_script);

router.use(route_game);
router.use("/battle",route_battle);
//router.use("/battle",route_turnbasebattle);

export default router;