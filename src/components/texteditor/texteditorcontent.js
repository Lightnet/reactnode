/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content

import React, { useState } from "react";
import TextContent from "./textcontent.js";

export default function TextEditorContent(){

  const [editTextContent, setEditTextContent] = useState("hello editor");
  const [selectText, setSelectText] = useState(false);

  function TypyingEditContent(e){
    //console.log(e)
    setEditTextContent(e);
  }

  function clickTextEdit(){
    console.log(editTextContent)
  }

  function clickTextSelect(){
    console.log(editTextContent)
    console.log(selectText)
    setSelectText(!selectText);
  }

  return (<>
  <div>
    <div>
      <label> Simple Tools </label>
      <button onClick={clickTextEdit}> log text content </button>
      <button onClick={clickTextSelect}> select text? </button>
    </div>
    <div>
      <TextContent
        value={editTextContent}
        onChange={TypyingEditContent}
        onSelect={selectText}
      ></TextContent>
    </div>
  </div>
  </>)
}