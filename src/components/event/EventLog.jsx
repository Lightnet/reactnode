/*
  LICENSE: MIT
  Created by: Lightnet
*/
// listen to event context
import React,{ useEffect, useState } from "react";
import { useEvent } from "./EventProvider.jsx";

export default function EventLog(){

  const [log, setLog] = useState("");

  const {event} = useEvent();

  useEffect(()=>{
    //console.log(event)
    if(event.name=="test1"){
      MyEvent1(event.data)
    }
    if(event.name=="beta"){
      MyEvent2(event.data)
    }
  },[event])

  function MyEvent1(event){
    console.log("test::",event)
    setLog("test")
  }

  function MyEvent2(event){
    console.log("beta::",event)
    setLog("beta")
  }

  return <><label>{log}</label></>
}