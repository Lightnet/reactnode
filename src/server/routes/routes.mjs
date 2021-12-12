
import express from 'express';
const router = express.Router();
import test from './test.mjs';
import auth from './auth.mjs';

router.use(test); 
router.use(auth); 

export default router;