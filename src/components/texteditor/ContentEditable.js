
// https://codepen.io/mlbrgl/pen/PQdLgb?editors=1010

import React, { useEffect, useRef, useState } from "react";

export default function ContentEditable(props){

  const refEl = useRef();
  const [lastHtml, setlastHtml] = useState(props.html)

  useEffect(()=>{
    console.log("update?CC??")
    updateInnerHTMLFromProps();

  },[props.html]);

  function emitChange(){
    let html = refEl.current.innerHTML;
    if (props.onChange && html !== lastHtml) {
      props.onChange({
        target: {
          value: html
        }
      });
    }
    setlastHtml(html)
  }

  function updateInnerHTMLFromProps(){
    console.log("update????")
    refEl.current.innerHTML = props.html;
  }

  return <div 
    id="contenteditable"
    ref={refEl}
    contentEditable

    onInput={emitChange} 
    onBlur={emitChange}
        
    />
}