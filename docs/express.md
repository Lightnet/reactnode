


https://medium.com/hackernoon/cracking-nut-nodejs-express-block-get-remote-request-client-ip-address-e4cdfa461add
```js
// Part1, defining blacklist
var BLACKLIST =['192.0.0.1'];


//Part3, Blocking Client IP, if it is in the blacklist
app.use(function(req, res, next) {
  var ipAddress = getClientIp(req);
  if(BLACKLIST.indexOf(ipAddress) === -1){
    next();
  } else {
    res.send(ipAddress + ' IP is not in whiteList')
  }
});



```