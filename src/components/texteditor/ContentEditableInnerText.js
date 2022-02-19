

import React,{ useEffect, useRef, useState } from "react"

export default function ContentEditableInnerText({value, onChange}){

  //const [val, setVal] = useState("");
  const [lastText, setLastText] = useState("");
  const refEl = useRef();

  useEffect(()=>{
    if(typeof value != 'undefined'){
      console.log("value",value);
      //setVal(value.html);
      if(value.html){
        return refEl.current.innerText = value.html;
      }
      refEl.current.innerText = value;
      
    }
  },[value])

  function emitChange(){
    
    let text = refEl.current.innerText;
    if (onChange && text !== lastText) {
      onChange({
        target: {
          value: text
        }
      });
    }
    setLastText(text)
    
  }

  return <div 
    id="contenteditable"
    ref={refEl}
    contentEditable

    onInput={emitChange} 
    //onBlur={emitChange}
        
  />
}