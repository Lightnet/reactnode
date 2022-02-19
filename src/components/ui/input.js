/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";

export default function Button({value,color,onChange,children,props}){

  const [inputColor,setInputColor] = useState('');
  const [val, setVal] = useState('');

  useEffect(()=>{
    if(typeof value != 'undefined'){
      setVal(val);
    }
  },[value])

  useEffect(()=>{
    if(color){
      if(color=="pri"){
        setInputColor("color");
      }
    }
  },[color])

  const typeVal = e => {
    setVal(e.target.value)
    if(typeof onChange == 'function'){
      onChange(e.target.value)
    }
  };

  return <input className={inputColor} value={val} onChange={typeVal} {...props}>{children}</input>
}