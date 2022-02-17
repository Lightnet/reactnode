/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import useEffectFetch from "../hook/useEffectFetch.js";
import useFetch from "../hook/useFetch.js";
import useFetchPromise from "../hook/useFetchPromise.js";

export default function UIPage(){

  const [response, error,isfetchloading, fetchcall ] = useEffectFetch('/json');

  if(!isfetchloading){
    console.log(response);
    console.log(error);
  }
  
  async function clickTestFetch(){
    let data = await useFetch('/json');
    console.log(data);
  }

  function clickFetchCall(){
    fetchcall();
  }

  async function clickFetchPromise(){
    let data = await useFetchPromise('/json');
    console.log(data);
  }

  return (<>
    <div>
      <label>UI PAGE</label><br/>
      <button onClick={clickTestFetch}> Fetch Test </button>
      <button onClick={clickFetchCall}> Fetch Call </button>
      <button onClick={clickFetchPromise}> Fetch Promise </button>
    </div>
  </>)
}