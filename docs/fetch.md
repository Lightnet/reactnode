https://www.npmjs.com/package/superagent

x-auth


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
  }, [])//if there no variable. It will mount once and unmount.

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

// Similar to componentDidUpdate:
  useEffect(() => {
    // Update the document ... using the browser API
  });

```
  Please read the react js hook doc as it explain it better.
- https://reactjs.org/docs/hooks-effect.html




