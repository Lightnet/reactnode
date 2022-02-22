/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";

export default function CheckBox({checked,onChange}){
  //console.log(props)

  const [checkBox, setCheckBox] = useState(false);

  useEffect(()=>{
    console.log(checked)
    if(typeof checked != "undefined"){
      setCheckBox(checked);
    }
  },[checked])

  const emitChange = e => {
    console.log(e.target.checked)
    setCheckBox(e.target.checked);
    
    if(typeof onChange == 'function'){
      onChange({
        target:{
          checked:e.target.checked
        }
      })
    }
  };

  return <input type="checkbox" checked={checkBox} onChange={emitChange} />
}