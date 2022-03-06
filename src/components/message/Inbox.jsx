/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { API } from '../../lib/API.mjs';
import useFetch from '../hook/useFetch.mjs';

export default function Inbox() {

  const [messages, setMessages] = useState([]);
  const [messageID, setMessageID] = useState("");
  const [message, setMessage] = useState("");
  const [fromName, setFromName] = useState("");
  const [subject, setSubject] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  useEffect(()=>{
    getMessages();
  },[])

  async function getMessages(){
    let data = await useFetch("/api/message");

    console.log(data);
    if(data.api == API.TYPES.MESSAGES){
      console.log("message sent")
      setMessages(data.messages);
    }
  }

  async function clickDelete(id){
    console.log("delete?")
    let data = await useFetch("/api/message",{
        method:API.DELETE
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:API.DELETE
        , id: id
      })
    });

    console.log(data);
    if(data.api == API.DELETE){
      console.log("message delete",data.id)
      setMessages(state=>state.filter(item=>item.id != data.id))
      if(data.id == messageID){
        clearMessage(messageID)
      }
    }
  }

  function viewMessageID(id){
    for(let idx in messages){
      if(messages[idx].id==id){
        setMessageID(messages[idx].id);
        setFromName(messages[idx].from);
        setMessage(messages[idx].message);
        setSubject(messages[idx].subject);
        setIsMessage(true)
      }
    }
  }

  function clearMessage(id){
    setMessageID("");
    setMessage("");
    setSubject("");
    setIsMessage(false)
  }

  return <div>
    <div>
      <label>Actions:</label>
    </div>
    {isMessage ? (<div>
      <button onClick={clearMessage}> Close </button><button onClick={()=>clickDelete(messageID)}> Delete </button><br/>
      <label> [ From: {fromName} ] </label><br/>
      <label> [ Subject: {subject} ] </label><br/>
      <label> [ Message ] </label>
      <p> {message} </p>
          
    </div>):(<div>
      {messages.map(item=>{
        return <div key={item.id}> 
          <label> [ From: {item.from} ] </label>
          <label> [ Subject: {item.subject} ] </label>
          <button onClick={()=>viewMessageID(item.id)}> View </button>
          <button onClick={()=>clickDelete(item.id)}> Delete </button>
        </div>
      })}
    </div>)}
  </div>
}