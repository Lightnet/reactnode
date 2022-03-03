/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { API } from '../../lib/API.mjs';
import useFetch from '../hook/useFetch.mjs';

export default function Contacts() {

  const [userName, setUserName] = useState("")
  const [selectName, setSelectName] = useState("")
  const [contacts, setContacts] = useState([])

  useEffect(()=>{
    getContacts();
  },[])

  function typeUserName(e){
    setUserName(e.target.value);
  }

  function onSelectName(e){
    setSelectName(e.target.value);
    console.log(e.target.value);
  }

  async function getContacts(){
    let data = await useFetch("/api/contact")
    console.log(data);
    if(data.error){
      console.log("Fetch contact fail!")
      return;
    }
    if(data.api == "CONTACTS"){
      setContacts(data.contacts)
    }
  }

  async function clickAddContacts(){
    let data = await useFetch("/api/contact",{
      method:API.POST
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:API.TYPES.CREATE
        ,  userName
      })
    })
    console.log(data);
    if(data.error){
      console.log("Fetch create contact fail!")
      return;
    }

    if(data.api=="ADDED"){
      setContacts(state=>[...state,{
        id:data.id
        ,friend:data.friend
      }])
    }
  }

  async function clickRemoveContacts(){
    let data = await useFetch("/api/contact",{
      method:API.DELETE
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:API.DELETE
        ,  userName
      })
    })
    console.log(data);
    if(data.error){
      console.log("Fetch delete contact fail!")
      return;
    }

    if(data.api=="DELETE"){
      setContacts(state=>state.filter(item=>item.friend!=data.username))
    }
  }

  function renderContacts(){

    return <select value={selectName} onChange={onSelectName}>
      <option value={""}> Select User </option>
      {contacts.map(item=>{
        return <option key={item.id} value={item.id} > {item.friend} </option>
      })}
    </select>
  }

  return <div>
    <div>
      <label>User Name:</label>
      <input value={userName} onChange={typeUserName} /> 
      <button onClick={clickAddContacts}> Add </button>
      <button onClick={clickRemoveContacts}> Remove </button>
    </div>
    <div>
      <label>Contacts:</label>
    </div>
    <div>
      {renderContacts()}
    </div>
  </div>
}