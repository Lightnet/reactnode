/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export default function CookieDoc(){

  function clickGetCookie(){
    console.log(document.cookie)
  }

  return (<>
    <button onClick={clickGetCookie}> Get Doc Cookie </button>
  </>)
}