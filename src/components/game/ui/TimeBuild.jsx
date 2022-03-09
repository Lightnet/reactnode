/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import { unixTime } from "../../../lib/helper.mjs";

export default function TimeBuild({timedate,onTrigger}) {

  const [time, setTime] = useState("00:00:00")
  const [timer, setTimer] = useState(null)

  function updateTime(){
    //console.log("hello?");
    let currenttime = unixTime();
    //console.log(currenttime, " >> ", timedate)
    let ctime = timedate - currenttime;
    let minutes = Math.floor((ctime % 3600)/60);
    let seconds = ctime % 60;
    var hours = Math.floor(ctime / 3600);
    //console.log(remaintime );
    if(ctime<=0){
      setTime('00:00:00');
      stopTimer();
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
  }

  useEffect(()=>{
    let _timer
    if(timedate !=null){
      _timer = setInterval(() => {
        updateTime();
      }, 1000)
      setTimer(_timer)
    }
    
    return ()=>{
      console.log('CLEAN TIMER..')
      clearInterval(_timer);
    }
  },[timedate])

  function stopTimer(){
    if(onTrigger){
      onTrigger();
    }
    console.log('stop')
    clearInterval(timer);
  }

  return(
    <label> {time} </label>
  );
}