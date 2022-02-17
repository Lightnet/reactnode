/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress

import React, { useState } from "react";

export default function ProgressBarUI(){

  const [percent, setPercent] = useState(0);
  const [maxPercent, setMaxPercent] = useState(100);

  function clickPercent(num){
    setPercent(num)
  }

  function clickAddPercent(num){
    setPercent(percent+num)
  }

  function clickMiniPercent(num){
    setPercent(percent-num)
  }

  return (<>
    <progress value={percent} max="100">70 %</progress>
    <button onClick={()=>clickPercent(0)}> 0 </button>
    <button onClick={()=>clickPercent(10)}> 10 </button>
    <button onClick={()=>clickPercent(100)}> 100 </button>
    <button onClick={()=>clickAddPercent(10)}> +10 </button>
    <button onClick={()=>clickMiniPercent(10)}> -10 </button>
  </>)
}