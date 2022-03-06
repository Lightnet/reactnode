/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react"
import ContentEditable from "./ContentEditable";

export default function TextEditorPage(){

  const [contentText, setContentText] = useState("asd");
  const [isEdit, setIsEdit] = useState(true);

  function onChangeText(e){
    console.log(e.target.value)
  }

  function clickPaste1(){
    setContentText("Tests 1");
  }

  function clickPaste2(){
    setContentText("beta 2");
  }

  function toggleEdit(){
    setIsEdit(state=>!state)
  }

  return <div style={{height:"100%", width:"100%"}}>
    <div style={{
      height:"22px"
    , width:"calc(100% - 20px)"
    , border:"1px"
    , borderStyle:"solid"
    }}>
      <label> Editor Actions: </label>
      <button onClick={toggleEdit}> Edit {isEdit?("true"):("false")}</button>
      <button onClick={clickPaste1}> Test Put Content 1</button>
      <button onClick={clickPaste2}> Test Put Content 2</button>
    </div>
    <ContentEditable 
      //type="html"
      isedit={isEdit}
      value={contentText} 
      onChange={onChangeText}
      />
  </div>
}