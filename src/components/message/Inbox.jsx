/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { API } from '../../lib/API.mjs';
import useFetch from '../hook/useFetch.mjs';

export default function Inbox() {

  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    getMessages();
  },[])

  async function getMessages(){
    let data = await useFetch("/api/message",{
        method:"POST"
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:'MESSAGES'
      })
    });

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
    }
  }

  return <div>
    <div>
      <label>Actions:</label>
    </div>
    <div>
      {messages.map(item=>{
        return <div key={item.id}> 
          <label> [ From: {item.from} ] </label>
          <label> [ Subject: {item.subject} ] </label>
          <button onClick={()=>clickDelete(item.id)}> Delete </button>
        </div>
      })}
    </div>
  </div>
}