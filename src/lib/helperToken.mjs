/*
  LICENSE: MIT
  Created by: Lightnet
*/
import jwt from 'jsonwebtoken';

export function checkToken(token, key){
  try {
    //let decoded = jwt.verify(token, key);//check fail
    //jwt.verify(vettest, secret, function(err, decoded) {
      //console.log("decoded///") // bar
      //console.log(decoded) // bar
    //});
    console.log("true")
    return jwt.verify(token, key);
  } catch(err) {
    // err
    //console.log("error")
    console.log("false")
    return null;
    //return false;
  }
}

export function checkReqJson(req){
  let contenttype = req.headers['content-type'];
  console.log(contenttype)
  if (contenttype && contenttype.indexOf('application/json') == 0){//pass
    console.log(contenttype.indexOf('application/json'));
    return true;
  }else{
    return false;
  }
}