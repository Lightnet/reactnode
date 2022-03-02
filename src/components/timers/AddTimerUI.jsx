/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { unixTime } from "../../lib/helper.mjs";
import CountDownTimerUI from "./CountDownTimerUI.jsx"

export default function AddTimerUI(){

  const [time, setTime]  = useState(0)

  function clickAddTimer(num){
    setTime(unixTime()+num)
  }

  return(<>
    <button onClick={()=>clickAddTimer(30)}>  Add Time 30 sec</button>
    <button onClick={()=>clickAddTimer(300)}>  Add Time 300 sec</button>
    <CountDownTimerUI timedate={time}/>
  </>);
}