/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{useState, useEffect} from "react";

export default function ClockTime(){

  const [time, setTime] = useState();
  const [intervalID, setIntervalID] = useState();

  function tick(){
    setTime(new Date().toLocaleString());
  }

  useEffect(()=>{
    setTime(new Date().toLocaleString())
    let _intervalID=setInterval(
      () => tick(),
      1000
    );
    setIntervalID(_intervalID)

    return ()=>{
      clearInterval(intervalID);
      setTime(null)
    }
  },[])

  return (<label> {time} </label>)
}