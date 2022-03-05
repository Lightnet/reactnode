

```js

// https://github.com/auth0/node-jsonwebtoken
import jwt from 'jsonwebtoken';

var secret = process.env.SECRET;
secret = "012345678901234567890123"
console.log(secret)

var today = new Date();
var exp = new Date(today);
//exp.setDate(today.getDate() + 60);
//exp.setDate(today.getDate() + 60);
let test = jwt.sign({
  id: "0",
  name: "test",
  //exp: parseInt(exp.getTime() / 1000),
  exp: Math.floor(Date.now() / 1000) + ( 60) // 60 sec
  }, secret);

console.log(test);

let vettest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAiLCJuYW1lIjoidGVzdCIsImV4cCI6MTY1MTU1MjM5NiwiaWF0IjoxNjQ2MzcxOTk2fQ.TFo5puWW-r-E9vvl2E3SP3sN1ZIwjd4vT_0qA8-X1To";
vettest = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAiLCJuYW1lIjoidGVzdCIsImV4cCI6MTY0NjM3MjYwNiwiaWF0IjoxNjQ2MzcyNTQ2fQ.ZlRFJ1NPypH5bZ1gLfsBg7i56tnrEcxGUm9HQToeK2Y";
/*
try {
  //var decoded = jwt.verify(token, 'wrong-secret');//check fail
  var decoded = jwt.verify(vettest, secret);
  if(decoded){
    console.log(decoded)
    console.log("true")
    //return true; 
  }

} catch(err) {
  // err
  console.log("error")
  console.log("false")
  //return false;
}
*/
try {
  //var decoded = jwt.verify(token, 'wrong-secret');//check fail
  jwt.verify(vettest, secret, function(err, decoded) {
    console.log("decoded///") // bar
    console.log(decoded) // bar
  });
} catch(err) {
  // err
  console.log("error")
  console.log("false")
  //return false;
}
```