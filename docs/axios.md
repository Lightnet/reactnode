
# information:
There are two way to go around creating axios and instance.

- https://axios-http.com/

```js
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

You can create a new instance of axios with a custom config.
```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.get('/api/post')
.then(function (response) {
  if((response.status==200)&&(response.statusText=="OK")){
    //console.log(response.data)
    let data = response.data;
    console.log(data);
  }
})
.catch(function (error) {
  console.log(error);
});
```

When using the instance you can custom how get, post, delete, put and other methods. One reason is repeating copy and pastes. For example refresh tokens.

## Interceptors
  By using the Interceptors. There are two or more types. Most common is request, response and config.

- https://axios-http.com/docs/interceptors

use Hook > useAxiosTokenAPI.jsx
```js
//...
export default function useAxiosTokenAPI(){//hook api
//...
//const instance = axios.create() // not here else when user typing it create same variable
function createInstance(){
  //console.log("axios creating...")
  const instance = axios.create({
    baseURL: API_URL
    //baseURL: "http://localhost:3000"
    , headers: {
      //'X-Custom-Header': 'foobar'
      "Content-Type": "application/json"
    }
  });
  return instance
}

// create config for request check
async function config(config){
  const currentDate = new Date();
  //console.log(expire)
  if (expire * 1000 < currentDate.getTime()) {//check every time when instance.get({}) or instance.post({})
    //console.log("get update?")
    const response = await axios.get('/token');
    if(response.data.error){
      //console.log("NOT LOGIN");
      setStatus('unauth');
      return config;
    }
    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    setToken(response.data.accessToken);
    const decoded = parseJwt(response.data.accessToken);
    //setName(decoded.name);
    setExpire(decoded.exp);
  }else{
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

//create error event
function ErrorPromise(error){
  return Promise.reject(error);
}
//const instance = createInstance()// can't be used here as this will render every time when there change even the user typing that will update this area.
//init instance
useEffect(()=>{//mount once but ingore user typing
  setTokenJWT({instance:createInstance()})
},[])

//watch variable, init interceptors and clean up
useEffect(()=>{
  //console.log(instance);
  if(tokenJWT.instance!=null){
    const configInterceptor=tokenJWT.instance.interceptors.request.use(config, ErrorPromise);
    //console.log(configInterceptor);
    setIsLoading(false);
    return ()=>{
      //console.log("clean up");
      tokenJWT.instance?.interceptors.request.eject(configInterceptor);
      setIsLoading(false);
    }
  }else{
    setIsLoading(true);
  }
},[tokenJWT.instance,token,expire]);//listen to three variables
return [tokenJWT,isLoading];
}
```

There are two reason why loading is need. One for mount. The other is watch varaibles changes.

```js
const [axiosJWT, isLoading] = useAxiosTokenAPI();
useEffect(()=>{
  console.log("axiosJWT init...");
  console.log("isLoading: ", isLoading)
  if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
    console.log("GETTING...: ")
    getPost();
  }
},[axiosJWT,isLoading])
```

```js
// https://axios-http.com/docs/instance
const axiosJWT = axios.create();
axiosJWT.post("url",{body})

axios#get(url[, config])
axios#delete(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
```

GET
```js
axiosJWT.instance.get("/api/base")
.then(function (response) {
  if((response.status==200)&&(response.statusText=="OK")){
    //console.log(response.data)
    let data = response.data;
    console.log(data);
    if(data.error){
      console.log('axiosJWT Error!');
      return;
    }

    if(data.api=='BASE'){
    }
  }
})
.catch(function (error) {
  console.log(error);
});
```

POST
```js
axiosJWT.instance.post('/api/post',{
    api:API.TYPES.CREATE
  , title:title
  , content:content
})
.then(function (response) {
  if((response.status==200)&&(response.statusText=="OK")){
    //console.log(response.data)
    let data = response.data;
    console.log(data);
    if(data.error){
      console.log('axiosJWT Error!');
      return;
    }

    if(data.api=='UPDATE'){

    }
  }
})
.catch(function (error) {
  console.log(error);
});
```

PUT
```js
axiosJWT.instance.put('/api/post',{
    api:API.TYPES.UPDATE
  , id: postID
  , title:title
  , content:content
})
.then(function (response) {
  if((response.status==200)&&(response.statusText=="OK")){
    //console.log(response.data)
    let data = response.data;
    console.log(data);
    if(data.error){
      console.log('axiosJWT Error!');
      return;
    }

    if(data.api=='UPDATE'){

    }
  }
})
.catch(function (error) {
  console.log(error);
});
```

DELETE
```js
axiosJWT.instance.delete("/api/message",{
data:{
    api:API.DELETE
  , id:id
}
})
.then(function (response) {
  if((response.status==200)&&(response.statusText=="OK")){
    //console.log(response.data)
    let data = response.data;
    console.log(data);
    if(data.error){
      console.log('axiosJWT Error!');
      return;
    }

    if(data.api==API.DELETE){

    }
  }
})
.catch(function (error) {
  console.log(error);
});
```

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
const {
    baseToken, setBaseToken,
    baseExpire, setBaseExpire
  } = useAuth();
// every time the user request url it check token time before expire.
// then pass config to the user call post
// https://axios-http.com/docs/instance
const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    //console.log("PROCESS???")
    if (baseExpire * 1000 < currentDate.getTime()) {
        //console.log("EXPIRE? base token????>>>>")
        const response = await axios.get('/basetoken');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        //console.log(response.data.accessToken);
        setBaseToken(response.data.accessToken);
        const decoded = parseJwt(response.data.accessToken);
        setBaseExpire(decoded.exp);
      }else{
        config.headers.Authorization = `Bearer ${baseToken}`;
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