# React Node

# LICENSE: MIT

# Create by: Lightnet

# Pacakges:
- express
- @babel/preset-env
- @babel/preset-react
- npm-run-all
- webpack
- react
- nodemon
- jsonwebtoken
- dayjs
- nanoid

# Information:
  This is testing project. 
  
  To develop modular react ui, components and api. Justing the using the webpack, babel, express web server and other packages to keep it simple.

  Design for web page to tests api by using fetch call and api since it bundle into single javascript. By using the react dom router for account access, api logic type call, and other things for testing. Without need to reload the url pages to save bandwidth and keep it simple call from fetch url. Plus it reduce the load on server for new pages.

# Dev Notes:
  This project is set up as type module in package.json require to used import test from "./test.js" and incorrect from "./test" does not work. It need file name extension. For the server and client script to work.

  Some packages will required some simple like random id as reactjs required key when doing map loop render html.

  Note: Some file might be change depend on the logic thinking. Due to case sensitive when working with linux.

  Need to rebuild or rework the layout for logics as learning more about the context and other functions.

- dayjs
  
  Used for time stamp for time or date for data store.

- nanoid
  
  Use for random number for react js components.

# React:
By using the the react relate packages. To imporve logic code, layout and other things. 

- react
- react-dom
- react-router-dom
- react-redux
- @reduxjs/toolkit

Work in progress testing...

# Database:
  Using mongodb for easy update data.

# features:
- Account management dummy test (work in progress)
  - sign up (added)
  - logout (added)
  - forgot password (not added)
  - verify checks (not added)
  - api fetch (not added)
  - use session (used)
  - use cookie
- Notify (simple dispatch)
  - [notify doc ](/docs/notify.md)
  - context
  - provider
  - useReducer
- cookie (added /not work on)
  - button fetch test
- session (added / testing )
  - button fetch test
- Theme toggle light and dark (added / simple / work in progress)
  - custom color (not added)
- route pages (added / work in progress)
- test lab page (testing features in simple form)
  - notfity test type meeages with button ( added )
  - 
- redux
  - notify ( added )
  - counter ( added )
  - posts ( added /  work in progress)
- upload ( added / simple )
  - using the reactjs
- download ( added / simple )
  - using the reactjs
- Game
  - moblie base game

  Testing game logic.

# React Hooks:
  Note there are free hooks from reference react javascript R&D.

## Fetch types:
  There are different types of fetches as I learned.

  One use the hook and other is none hook just call function.

```js
//...
export async function useFetch(url,options){
  try{
    if(!url){
      return console.log("url error");
    }
    if(!options){
      options={};
    }
    let response = await fetch(url, options);
    if (!response.ok) {
      return {error:'SERVER FETCH ERROR'};// check if the server error
    }
    let data = await response.json();
    return data;
  }catch(e){
    console.log("TRY FETCH ERROR: ", e);
    return {error:'TRY FETCH ERROR'}; //check for json format error
  }
}

//...
import { useEffect, useState } from "react";

export default function useEffectFetch(url,options){
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try{
      if(!url){
        console.log("url error");
        setResponse(null);
        setError("RESPONSE FETCH ERROR")
        setIsLoading(false);
        return;
      }
      if(!options){
        options={};
      }
      let response = await fetch(url, options);
      if (!response.ok) {
        setResponse(null);
        setError("RESPONSE FETCH ERROR") // check if the server error
        setIsLoading(false);
        return;
      }
      let data = await response.json();
      setResponse(data);
      setIsLoading(false)
    }catch(e){
      //console.log("TRY FETCH ERROR: ", e);
      setResponse(null);
      setError('TRY FETCH ERROR'); //check for json format error
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url])

  return [response, error, isLoading, fetchData];
}
//...

import useEffectFetch from "../hook/useEffectFetch.js";
import useFetch from "../hook/useFetch.js";

export default function App(){
  // note this will rerender components
  const [response, error,isfetchloading, fetchcall ] = useEffectFetch('/json');

  if(!isfetchloading){
    console.log(response);
    console.log(error);
  }

  useEffect(async() => {
    let data = await useFetch('/json');
    console.log(data);
  }, [])
  
  async function clickTestFetch(){
    let data = await useFetch('/json');
    console.log(data);
  }

  function clickFetchCall(){
    fetchcall();
  }

  return (<>
    <div>
      <label>UI PAGE</label><br/>
      <button onClick={clickTestFetch}> Fetch Test </button>
      <button onClick={clickFetchCall}> Fetch Call </button>
    </div>
  </>)
}
```
  It depend on the code function calls. One is the fetch for user input data and other is when the page or component to load up the default data. One reason is that the react hook rules.

  The reason is simple that the react component rerender or update when user input does some actions.

```js

  // this is once mount is used by react basic call functions like unmount, mount, cleanup
  useEffect(async() => { // prevent rerender/update component
    let data = await useFetch('/json');
    return ()=>{
      //this is clean up once the react element is remove
    }
  }, [])

//...
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(isLoading){
      //true
    }else{
      //false
    }
    return ()=>{
      //this is clean up once the react element is remove
    }
  }, [isLoading]) //watches variable state change

  setIsLoading(true); // will trigger change state
  setIsLoading(false); // will trigger change state
//...

// Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document ... using the browser API
  });

```
  Please read the react js hook doc as it explain it better.
- https://reactjs.org/docs/hooks-effect.html


# setup:
  Need to install mongodb and nodejs.

```
npm install

npm run dev
```

.env
```
SECRET="SECRET"
DATABASE_URL="mongodb://127.0.0.1/blankreact"
```