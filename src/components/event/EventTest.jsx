/*
  LICENSE: MIT
  Created by: Lightnet
*/
// dispatch event

import React from "react";
import { useEvent } from "./EventProvider.jsx";

export default function EventTest(){

  const {dispatchEvent} = useEvent();

  function clickEvent1(){
    dispatchEvent({
      type:'EVENT'
      , name:'test1'
      , data:{target:{value:"hello"}}
    })
  }

  function clickEvent2(){
    dispatchEvent({
      type:'EVENT'
      , name:'test2'
    })
  }

  function clickEvent3(){
    dispatchEvent({
      type:'EVENT'
      , name:'beta'
    })
  }

  return <>
    <button onClick={clickEvent1}> Test Event 1</button>
    <button onClick={clickEvent2}> Test Event 2</button>
    <button onClick={clickEvent3}> Beta Event 3</button>
  </>
}