/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://medium.com/free-code-camp/reactjs-pass-parameters-to-event-handlers-ca1f5c422b9
// https://www.kindacode.com/article/react-passing-parameters-to-event-handler-functions/
// https://flaviocopes.com/react-pass-parameter-event/


import React, { useEffect, useState } from 'react';
import useFetch from '../hook/useFetch.mjs';
import Compose from './Compose.jsx';
import Contacts from './Contacts.jsx';
import Inbox from './Inbox.jsx';
import Settings from './Settings.jsx';

export default function MessagePage() {

  const [view, setView] = useState("inbox");

  useEffect(()=>{
    console.log(view)
  },[view])

  function renderView(){
    
    if(view == "inbox"){
      return <Inbox/>
    }else if(view == "compose"){
      return <Compose/>
    }else if(view == "compose"){
      return <Compose/>
    }else if(view == "settings"){
      return <Settings/>
    }else if(view == "contacts"){
      return <Contacts/>
    }
    return <></>
  }

  function onView(param,e){
    e.preventDefault();
    console.log(param);
    console.log(e);
    setView(param);
  }

  async function clickTest(){
    let data = await useFetch('/api/message');
    console.log(data)
  }

  return <div>
    <div>
      <a href='#' onClick={(e)=>onView("inbox",e)}>Inbox</a><span> | </span>
      <a href='#' onClick={(e)=>onView("compose",e)}>Compose</a><span> | </span>
      <a href='#' onClick={(e)=>onView("contacts",e)}>Contacts</a><span> | </span>
      <a href='#' onClick={(e)=>onView("settings",e)}>Settings</a><span> | </span>
      <button onClick={clickTest}>Test</button><span> | </span>
    </div>
    <div>
      {renderView()}
    </div>
  </div>
}