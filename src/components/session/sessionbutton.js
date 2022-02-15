/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React from "react";

export default function SessionButton(){

  function clickGetSession(){
    fetch('/session')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (<>
    <button onClick={clickGetSession}> Session </button>
  </>)
}