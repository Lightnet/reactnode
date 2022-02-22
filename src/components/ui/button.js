/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/68801351/how-to-set-the-props-after-a-button-is-clicked-in-react-js
// https://reactjs.org/docs/components-and-props.html


import React, { useEffect, useState } from "react";

export default function Button({color,onClick,children}){

  const [btnColor,setBtnColor] = useState('pri');

  useEffect(()=>{
    if(color){
      if(color=="pri"){
        setBtnColor("btn_pri");
      }
      if(color=="sec"){
        setBtnColor("btn_sec");
      }
      if(color=="ter"){
        setBtnColor("btn_ter");
      }

      if(color=="pos"){
        setBtnColor("btn_pos");
      }
      if(color=="neg"){
        setBtnColor("btn_neg");
      }
    }
  },[color])

  function emitClick(e){
    if(typeof onClick !='undefined'){
      onClick(e);
    }
  }

  return <button className={btnColor} onClick={emitClick}>{children}</button>
}