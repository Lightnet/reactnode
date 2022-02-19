

import React,{ useEffect, useRef, useState } from "react"

export default function ContentEditableInnerHtml({value, onChange}){

  //const [val, setVal] = useState("");
  const [lastHtml, setLastHtml] = useState("");
  const refEl = useRef();

  useEffect(()=>{
    if(typeof value != 'undefined'){
      console.log("value",value);
      //setVal(value.html);
      refEl.current.innerHTML = value;
    }
  },[value])

  function emitChange(){
    let html = refEl.current.innerHTML;
    if (onChange && html !== lastHtml) {
      onChange({
        target: {
          value: html
        }
      });
    }
    setLastHtml(html)
  }

  return <div 
    id="contenteditable"
    ref={refEl}
    contentEditable

    onInput={emitChange} 
    onBlur={emitChange}
        
  />
}