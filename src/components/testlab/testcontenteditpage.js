/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useMemo, useState } from "react";
import ContentEditable from "../texteditor/ContentEditable.js";
import ContentEditableInnerHtml from "../texteditor/ContentEditableInnerHtml.js";
import ContentEditableInnerText from "../texteditor/ContentEditableInnerText.js";

export default function TestContentEditPage(){

  const [html, setHtml] = useState("hello");

  useEffect(()=>{
    console.log("html",html)
  },[html])

  function onChange(object){
    console.log(object.target.value);
    if(object.target.value.includes("?")){
    	setHtml('..');
    }else{
      //setHtml(object.target.value);
    }
  }

  function clickClearText(){
    console.log("clearing???");
    setHtml("clear")
  }

  function clickTestText(){
    console.log("clearing???");
    setHtml("test")
  }

  /*
  const _value = useMemo(()=>({
    html
  }),[
    html
  ])
  results:
  <value={html} >
    - {value.html}

  */

  return (<>
    <div>
      <button onClick={clickClearText}> Clear Test </button>
      <button onClick={clickTestText}> Text Test </button>
      <ContentEditableInnerText value={html} onChange={onChange}/>
    </div>
  </>)
}
/*
<ContentEditableInnerHtml value={html} onChange={onChange}/>
<ContentEditable html={html}  onChange={onChange}/>
*/