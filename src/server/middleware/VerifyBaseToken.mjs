/*
  LICENSE: MIT
  Created by: Lightnet
*/

import jwt from "jsonwebtoken";
import crypto from 'crypto';

const BASE_TOKEN_SECRET = process.env.BASE_TOKEN_SECRET || "BASE_TOKEN_SECRET";

//check token access that is 15 sec recheck
export const verifyBaseToken = async (req, res, next) => {
  //console.log("/verifyBaseToken")
  const authHeader = req.headers['authorization'];
  //console.log("authHeader: ", authHeader)
  const token = authHeader && authHeader.split(' ')[1];
  //console.log("midd token:",token)
  if(token == null) return res.sendStatus(401);
  let hash= crypto.createHash('md5').update(req.ip+BASE_TOKEN_SECRET+req.socket.remoteAddress).digest('hex');
  jwt.verify(token, hash, (err, decoded) => {
    if(err) return res.sendStatus(403);
    console.log("PASS Base Token")
    //pass a variable to next request
    //req.email = decoded.email;
    next();
  })
}