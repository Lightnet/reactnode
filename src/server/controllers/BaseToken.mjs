/*
  LICENSE: MIT
  Created by: Lightnet
*/

import jwt from "jsonwebtoken";
import clientDB from "../../lib/database.mjs";
import crypto from 'crypto';

//base or basic access for checks
// for login, sign out, hint, change passphrase.
export const BaseToken = async(req, res) => {

  const db = await clientDB();
  const Users = db.model('User');

  try {
    //const refreshToken = req.cookies.token;
    //console.log("refreshToken:", refreshToken)
    //console.log("/token")
    //if(!refreshToken) return res.sendStatus(401);
    //const user = await Users.fineOne({refresh_token: refreshToken}).exec()
    //const user = await Users.findOne({token:refreshToken})
      //.select('id username tokenSalt')
      //.exec()
    //if(!user) return res.sendStatus(403);
    //jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      //if(err) return res.sendStatus(403);
      //console.log(decoded)

      //need signature ip

      let hash= crypto.createHash('md5').update(req.ip).digest('hex');
      if(hash == decoded.hash){//check hash if tmp token expire
        //console.log("MATCH HASH")
      }else{
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign({id:user.id,user:user.username}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '240s'
      });
      res.json({ accessToken });
    //});
  } catch (error) {
    console.log(error);
  }
}