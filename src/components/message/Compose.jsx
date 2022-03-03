/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import useFetch from '../hook/useFetch.mjs';
import { API } from "../../lib/API";

export default function Compose() {

  const [userName, setUserName] = useState("q")
  const [subject, setSubject] = useState("11")
  const [content, setContent] = useState("22")

  function typeUserName(e){
    setUserName(e.target.value);
  }
  function typeSubject(e){
    setSubject(e.target.value);
  }
  function typeContent(e){
    setContent(e.target.value);
  }

  async function clickSendMessage(){

    let data = await useFetch("/api/message",{
        method:"POST"
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:'MESSAGE'
        , userName
        , subject
        , content
      })
    });

    console.log(data);
    if(data.api == API.TYPES.SENT){
      console.log("message sent")
    }
  }

  return <div>
    <div>
      <label>To:</label><input value={userName} onChange={typeUserName}/>
    </div>
    <div>
      <label>Subject:</label><input value={subject} onChange={typeSubject}/>
    </div>
    <div>
      <label>Content:</label>
    </div>
    <div>
      <textarea  value={content} onChange={typeContent}></textarea>
    </div>
    <div>
      <button onClick={clickSendMessage}> Send Message </button>
    </div>
  </div>
}