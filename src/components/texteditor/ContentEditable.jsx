/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://codepen.io/mlbrgl/pen/PQdLgb?editors=1010

import React, { useEffect, useRef, useState } from "react";

export default function ContentEditable(props){

  const refEl = useRef();
  const [lastValue, setLastValue] = useState("");
  const [_type, setType] = useState("text");
  const [isEdit, setIsEdit] = useState(true);

  useEffect(()=>{
    if(typeof props.type == "string"){
      console.log(props.type)
      if((props.type == "text")||(props.type == "html")){
        setType(props.type)
      }else{ // default text
        setType("text")
      }
    }
  },[props.type]);

  useEffect(()=>{
    if(_type=="text"){
      console.log(_type)
      refEl.current.innerText = props.value || "placeholder";
    }
    if(_type=="html"){
      console.log(_type)
      refEl.current.innerHTML = props.value || "placeholder";
    }
  },[props.value]);

  useEffect(()=>{
    if(typeof props.isedit == "boolean"){
      setIsEdit(props.isedit)
    }
  },[props.isedit]);

  function emitChange(){
    let value;
    if(_type=="text"){
      console.log(_type)
      value = refEl.current.innerText;
    }else if(_type=="html"){
      console.log(_type)
      value = refEl.current.innerHTML;
    }else{
      value = refEl.current.innerText;
    }
    if (props.onChange && value !== lastValue) {
      props.onChange({
        target: {
          value: value
        }
      });
    }
    setLastValue(value)
  }

  return <div 
    style={{
        padding:"4px"
      //, height:"100%"
      , height:"calc(100vh - 60px)"
      , width:"calc(100% - 10px)"
      , border:"1px"
      , borderStyle:"solid"
      , overflow:"scroll"
    }}

    //id="contenteditable"
    ref={refEl}
    //contentEditable={isEdit}
    onInput={emitChange} 
    onBlur={emitChange}
    >

  </div>
}