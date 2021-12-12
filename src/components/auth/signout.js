/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import useFetch from "../hook/useFetch.js";

export function SignOutPage() {
  const [token, setToken] = useState('');

  async function clickSignOut(){
    console.log("clickSignOut")
    console.log("login")
    let data = await useFetch('/signout',{
      method:'POST',
      body:JSON.stringify({token})
    })
    console.log(data)
  }

  function clickCancel(){
    console.log("index")
    navigate('/')
  }

  return (<>
    <label>[Sign Out]</label>
    <button onClick={clickSignOut}>Sign Out</button>
    <button onClick={clickCancel}>Cancel</button>
  </>);
}