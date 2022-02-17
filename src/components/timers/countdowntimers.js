/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/53090432/react-hooks-right-way-to-clear-timeouts-and-intervals?rq=1
// https://dev.to/jexperton/how-to-fix-the-react-memory-leak-warning-d4i
// https://dev.to/jexperton/how-to-fix-the-react-memory-leak-warning-d4i
// 
// 
// 

import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { unixTime } from "../../lib/helper.js";
//import useInterval from "../hook/useInterval.js";
//import useTimeout from "../hook/useTimeout.js";

export default function CountDownTimerUI({timedate}){

  //const [show, setShow] = useState(false);
  const [time, setTime] = useState("00:00:00")
  const [timer, setTimer] = useState(null)
  //const timer = useRef(null);

  function updateTime(){
    let currenttime = unixTime();
    //console.log(currenttime, " >> ", timedate)
    let ctime = timedate - currenttime;
    let minutes = Math.floor((ctime % 3600)/60);
    let seconds = ctime % 60;
    var hours = Math.floor(ctime / 3600);
    //console.log(remaintime );
    if(ctime<=0){
      setTime('00:00:00')
    }else{
      if(String(hours).length <= 1){
        hours= "0"+hours;
      }
      if(String(minutes).length <= 1){
        minutes= "0"+minutes;
      }
      if(String(seconds).length <= 1){
        seconds= "0"+seconds;
      }
      setTime(hours+":"+minutes+":"+seconds)
    }
    //console.log(currenttime)
    if(ctime<=0){
      stopTimer();
    }
  }

  useEffect(()=>{
    /*
    if(timer){
      clearInterval(timer);
      setTimer(null);
    }
    const _timer = setInterval(() => {
      //console.log('time...')
      updateTime();
    },1000);
    setTimer(_timer)
    return () => {
      console.log("clean up timer...");
      if(timer){
        console.log("clearInterval:",timer)
        clearInterval(timer);
      }
      if(_timer){
        console.log("_clearInterval:",_timer)
        clearInterval(_timer);
      }
    }
    */
  },[timedate])

  // After 2 second, we want to show a loader:
  //useTimeout(() => {console.log("loading...")}, 2000 );

  // set loop time
  //useInterval(()=>{
    //console.log("loading...");
    //updateTime() 
  //},1000)

  function stopTimer(){
    //console.log('stop')
    clearInterval(timer);
    setTimer(null);
  }

  return(
    <label> {time} </label>
  );
}