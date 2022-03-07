
- https://stackoverflow.com/questions/51069552/axios-delete-request-with-body-and-headers




- https://axios-http.com/docs/post_example

```js
// axios.post(url[, data[, config]])
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

```

```js
// every time the user request url it check token time before expire.
// then pass config to the user call post
// https://axios-http.com/docs/instance
const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    console.log("PROCESS???")
    if (baseExpire * 1000 < currentDate.getTime()) {
        console.log("EXPRE? base token????>>>>")
        const response = await axios.get('/basetoken');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        console.log(response.data.accessToken);
        setBaseToken(response.data.accessToken);
        const decoded = parseJwt(response.data.accessToken);
        //setName(decoded.name);
        setBaseExpire(decoded.exp);
      }else{
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });

  //axiosJWT.post(url, data=body, config)
axiosJWT.post('/signup',
  {
      user:user
    , password:password
  }
  ,{
    headers: {
    //Authorization: `Bearer ${baseToken}`, //ingore this as from the interceptors config
    "Content-Type": "application/json"
  }
}).then(respone=>{
  console.log(respone)
}).catch(error=>{
  console.log(error)
});

```