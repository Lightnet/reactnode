
import express from 'express';
const router = express.Router();
import test from './test.mjs';
import sign from './sign.mjs';

router.use(test); 
router.use(sign); 

export default router;