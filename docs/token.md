
# Token:
  By using the cookie from the browser client.

  There are two type of tokens since they need one for user access and limited time token key.

  One reason since we use react without need to page refresh. By using the fetch or other request http from javascript package.

  The other reason is prevent fake tokens or attack in cross url domain.

  Note this is dev builds.

## Link:
- https://mfikri.com/en/blog/react-express-mysql-authentication

- https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/

# jsonwebtoken:
- https://www.npmjs.com/package/jsonwebtoken
```js
jwt.sign(payload, secretOrPublicKeyOrPrivateKey, [options, callback])
// exp = numbers only

//=====================
// expiresIn = strings || number
// default "120" is equal to "120ms"
// "2 days" = 2 days
// "1h" = 1 hour
// "7d" = 7 days
// "1h" = 1 hour
// 60 * 60 = 1 hour

```
- https://github.com/vercel/ms

```js
jwt.sign({
    id: "00000"
  , hash: crypto.createHash('md5').update(req.ip).digest('hex')
  , name: "test"
  //, exp: parseInt(exp.getTime() / 1000) // now expire
  //, exp: Math.floor(Date.now() / 1000) + ( 60) // 60 sec
  //, exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
  }, process.env.TOKEN_SECRET,{
    //algorithm: 'RS256'
    expiresIn:'1h'
  });
```









```js
// https://github.com/auth0/node-jsonwebtoken
import jwt from 'jsonwebtoken';
//var secret = process.env.SECRET;
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



https://mfikri.com/en/blog/react-express-mysql-authentication


RefreshToken.js
```js
import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}
```
