/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React,{ useEffect, useState } from "react";
import { useEvent } from "./EventProvider.js";

export default function EventLog2(){

  const [log, setLog] = useState("");

  const {event} = useEvent();

  useEffect(()=>{
    //console.log(event)
    if(event.name=="test2"){
      MyEvent1(event.data)
    }
  },[event])

  function MyEvent1(event){
    console.log("test::",event)
  }
  return <>

  </>
}