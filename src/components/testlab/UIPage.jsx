/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import ColorPalettesPage from "../colorpalettes/ColorPalettesPage.jsx";
import useFetch from "../hook/useFetch.mjs";
import useFetchPromise from "../hook/useFetchPromise.mjs";
import Modal from "../modal/Modal.jsx";
import BtnUseAxios from "../ui/BtnuseAxios.jsx";
import Button from "../ui/Button.jsx";
import CheckBox from "../ui/Checkbox.jsx";
import Input from "../ui/Input.jsx";
import Switch from "../ui/Switch.jsx";

export default function UIPage(){

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [modalPos, setModalPos] = useState([0,0]);

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
    //fetchcall();
  }

  async function clickFetchPromise(){
    let data = await useFetchPromise('/json');
    console.log(data);
  }

  function typingInput(e){
    //console.log(e)
    setInputValue(e.target.value)
  }

  useEffect(()=>{
    //console.log(inputValue);
  },[inputValue])


  return (<>
    <div>
      <label>UI PAGE</label><br/>
      <button onClick={clickTestFetch}> Fetch Test </button><br/>
      <button onClick={clickFetchCall}> Fetch Call </button><br/>
      <button onClick={clickFetchPromise}> Fetch Promise </button><br/>
      <br/>
      <br/><ColorPalettesPage/>
      <br/>
      <BtnUseAxios /><br/>
      <br/>

      <Input value={inputValue} onChange={typingInput}/><br/>

      <CheckBox checked test="ss"/><br/>
      <br/>
      <Input value={inputValue} onChange={typingInput}/><label> Switch </label><Switch/> <Switch round/> <Button color={"pri"}> Primary </Button><br/>

      <br/>
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
        //resize
        title="Modal"
        pheight="200"
        pos={modalPos}
        onClose={closeModal}
        updatePos={updateModelPos}
      >
        <label> Hello Modal </label>
      </Modal>

    </div>
  </>)
}