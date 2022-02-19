/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import useFetch from "../hook/useFetch.js";
import useFetchPromise from "../hook/useFetchPromise.js";
import Modal from "../modal/modal.js";
import TextContent from "../texteditor/textcontent.js";
import TextEditorContent from "../texteditor/texteditorcontent.js";
import BtnUseAxios from "../ui/btnuseaxios.js";
import Button from "../ui/button.js";

export default function UIPage(){

  const[isOpenModal, setIsOpenModal] = useState(false);

  const [modalPos, setModalPos] = useState([0,0]);

  const [editTextContent, setEditTextContent] = useState("testss d");

  function TypyingEditContent(e){
    //console.log(e)
    setEditTextContent(e);
  }

  function clickTextEdit(){
    console.log(editTextContent)
  }

  function clickOpenModal(){
    console.log("hello");
    setIsOpenModal(state=>!state)
  };

  function closeModal(){
    setIsOpenModal(false)
  }
  function updateModelPos(pos){
    setModalPos(pos);
  }
  
  async function clickTestFetch(){
    let data = await useFetch('/json');
    console.log(data);
  }

  function clickFetchCall(){
    fetchcall();
  }

  async function clickFetchPromise(){
    let data = await useFetchPromise('/json');
    console.log(data);
  }

  return (<>
    <div>
      <label>UI PAGE</label><br/>
      <button onClick={clickTestFetch}> Fetch Test </button><br/>
      <button onClick={clickFetchCall}> Fetch Call </button><br/>
      <button onClick={clickFetchPromise}> Fetch Promise </button><br/>
      <br/>
      <BtnUseAxios /><br/>
      <br/>
      <TextContent
        value={editTextContent}
        onChange={TypyingEditContent}
      /><br/>
      <button onClick={clickTextEdit}> Check Text Edit </button>
      <br/>
      <Button color={"pri"}> Primary </Button>
      <Button color={"sec"}> Secondary </Button>
      <Button color={"ter"}> Tertiary </Button><br/>
      <Button color={"pos"}> Postive </Button>
      <Button color={"neg"}> Negtive </Button><br/>

      <div className="info" style={{
        width:"100px"
        ,height:"32px"
      }}></div>

      <div className="success" style={{
        width:"100px"
        ,height:"32px"
      }}></div>

      <div className="error" style={{
        width:"100px"
        ,height:"32px"
      }}></div>

      <div className="warn" style={{
        width:"100px"
        ,height:"32px"
      }}></div>

      <Button color={"pri"} onClick={clickOpenModal}> Modal </Button>


      <Modal
        isOpen={isOpenModal}
        title="Modal"
        pheight="200"
        pos={modalPos}
        closeWindow={closeModal}
        updatePos={updateModelPos}
      >
        <label> Hello Modal </label>
      </Modal>

      <TextEditorContent />

    </div>
  </>)
}