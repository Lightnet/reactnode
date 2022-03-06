/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/55881397/react-how-to-maintain-caret-position-when-editing-contenteditable-div
// https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx

import React, { useEffect, useRef, useState } from "react"
//import ContentEditable from "./ContentEditable";
import ContentEditable from 'react-contenteditable'
import useFetch from "../hook/useFetch.mjs";

export default function TextEditorPage(){

  const contentEditable = useRef();
  const [contentText, setContentText] = useState("asd");
  const [isEdit, setIsEdit] = useState(true);

  const [fileName, setFileName] = useState("filename.txt");

  const [scriptID, setScriptID] = useState("");
  const [scriptName, setScriptName] = useState("");
  const [scripts, setScripts] = useState([]);

  useEffect(()=>{
    getScripts();
  },[])
  
  function onSelectScriptName(e){
    setScriptName(e.target.value)
    console.log(e.target.value);
    for(let idx in scripts){
      if(scripts[idx].id== e.target.value){
        setScriptID(e.target.value)
        setFileName(scripts[idx].filename)
        setContentText(scripts[idx].data)
        contentEditable.current.innerText = scripts[idx].data;
        console.log(scripts[idx].data)
        break;
      }
    }
  }

  function typeFileName(e){
    setFileName(e.target.value)
  }

  function onChangeText(e){
    //console.log(e.target.value)
    setContentText(e.target.value)
    //console.log(contentEditable.current.innerText)
  }

  function clickPaste1(){
    setContentText("Tests 1");
  }

  function clickPaste2(){
    setContentText(`console.log("test")`);
  }

  function toggleEdit(){
    setIsEdit(state=>!state)
  }

  function initScript(){
    //console.log("test...")
    //const scriptText = "console.log('hello world')";
    //setScripts(state=>[...state,"test"])
    const script = document.createElement('script');
    script.async = true;
    script.type = "module";
    script.innerText = contentEditable.current.innerText;
    document.body.appendChild(script);
    document.body.removeChild(script);
  }

  async function getScripts(){
    let data = await useFetch("/api/script",{
      method:"GET"
      , headers: {'Content-Type': 'application/json'}
    });
    console.log(data)
    if(data.error){
      console.log("fetch scripts error!")
      return;
    }
    if(data.api=="SCRIPTS"){
      setScripts(data.scripts);
    }
  }

  async function createScript(){
    let data = await useFetch("/api/script",{
      method:"POST"
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:"CREATE"
        , filename:fileName
        , content:contentEditable.current.innerText
      })
    });
    console.log(data)
    if(data.error){
      return console.log("fetch create error!")
    }
    if(data.api=="CREATE"){
      setScripts(state=>
        [...state,{
            id:data.script.id
          , filename:data.script.filename
          , data:data.script.data
        }]
      )
    }
    if(data.api=="UPDATE"){
      setScripts(state=>
        state.map(item=>{
          if(item.id == data.script.id){
            item.data = data.script.data;
            return item;
          }
          return item;
        })
      )
    }
  }

  async function deleteScript(){
    let data = await useFetch("/api/script",{
      method:"DELETE"
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:"DELETE"
        , filename:fileName
      })
    });
    console.log(data)
    if(data.error){
      return console.log("fetch delete error!")
    }
    if(data.api == "DELETE"){
      setScripts(state=>state.filter(item=>item.filename != data.filename))
    }
  }

  return <div style={{height:"100%", width:"100%"}}>
    <div style={{
      height:"22px"
    , width:"calc(100% - 20px)"
    , border:"1px"
    , borderStyle:"solid"
    }}>
    
      <button onClick={toggleEdit}> Edit {isEdit?("True"):("False")}</button>
      <label>File:</label>
      <input value={fileName} onChange={typeFileName}/>
      <button onClick={createScript}> Save </button>
      <button onClick={deleteScript}> Delete </button>
      <button onClick={initScript}> Script init </button>
      <select value={scriptName} onChange={onSelectScriptName}>
        <option value=""> Select Script </option>
        {scripts.map(item=><option key={item.id} value={item.id}> {item.filename} </option>)}
      </select>


      <button onClick={clickPaste1}> Test Put 1</button>
      <button onClick={clickPaste2}> Test Put 2</button>

      
    </div>
    <ContentEditable
      innerRef={contentEditable}
      style={{height:"calc(100vh - 42px)"}}
      html={contentText} // innerHTML of the editable div
      disabled={false}       // use true to disable editing
      onChange={onChangeText} // handle innerHTML change
      tagName='div' // Use a custom HTML tag (uses a div by default)
    />
    
    
  </div>
}
/*
<ContentEditable 
      //type="html"
      isedit={isEdit}
      value={contentText} 
      onChange={onChangeText}
      />
*/