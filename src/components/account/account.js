/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useAuth } from '../auth/auth.js';
import useFetch from '../hook/useFetch.js';

export function AccountPage() {
  //const [view, setView] = useState('');
  const {user, setUser} = useAuth();

  //function setUserName(name){
    //setUser(name);
  //}

  async function getSession(){
    let data = await useFetch('/session');
    console.log(data)
  }

  return (<>
    <label>Account</label> <br />
    <label>User Name:{user}</label> <br />    
    <button onClick={()=>getSession()}> session </button>
  </>);
}
/*
<button onClick={()=>setUserName('test1')}> test1 </button>
<button onClick={()=>setUserName('test2')}> test2 </button>
*/