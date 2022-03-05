/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export default function CookieButton(){

  function clickGetCookie(){
    fetch('/getcookie')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (<>
    <button onClick={clickGetCookie}> Get Cookie </button>
  </>)
}