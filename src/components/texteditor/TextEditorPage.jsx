/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/55881397/react-how-to-maintain-caret-position-when-editing-contenteditable-div
// https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx

import React, { useEffect, useRef, useState } from "react"
import useFetch from "../hook/useFetch.mjs";
//import ContentEditable from "./ContentEditable";
//import ContentEditable from 'react-contenteditable'
//import CodeEditor from '@uiw/react-textarea-code-editor';


//import AceEditor from "react-ace";
//import "ace-builds/src-noconflict/mode-java";
//import "ace-builds/src-noconflict/theme-github";
import AceEditor from "./AceEditor";

export default function TextEditorPage(){

  const contentEditable = useRef();
  //const textRef = useRef();
  const [content, setContent] = useState(`sdfdf`);
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
        setContent(scripts[idx].data)
        console.log(scripts[idx].data)
        break;
      }
    }
  }

  function typeFileName(e){
    setFileName(e.target.value)
  }

  function onChangeContent(newValue){
    //console.log(e.target.value)
    console.log(newValue)
    //setContent(newValue);
  }

  function clickPaste1(){
    console.log("set??")
    setContent("Tests 1");
  }

  function clickPaste2(){
    setContent(`console.log("test")`);
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
    //script.innerText = contentEditable.current.innerText;
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
        //, content:contentEditable.current.innerText
        , content:content
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
    <AceEditor
      mode="jsx"
      theme="github"
      value={content}
      onChange={onChangeContent}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />

  </div>
}