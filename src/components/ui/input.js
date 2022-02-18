/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";

export default function Button({color,onChange,children,props}){

  const [btnColor,setBtnColor] = useState('prim');
  const [value, setValue] = useState('');

  useEffect(()=>{
    if(color){
      if(color=="prim"){
        setBtnColor("color");
      }
      
    }
  },[color])

  const typeValue = e => {
    setValue(e.target.value)
    if(typeof onChange == 'function'){
      onChange(e.target.value)
    }
  };

  return <input value={value} onChange={typeValue} {...props}>{children}</input>
}