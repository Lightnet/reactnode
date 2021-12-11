/*
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useAuth } from './auth/auth.js';

export function IndexPage() {
  //const [view, setView] = useState('');
  const {user, setUser} = useAuth();

  function setUserName(name){
    setUser(name);
  }

  return (<>
    <label>Index</label>
    <label>User Name:{user}</label>
    <button onClick={()=>setUserName('test1')}> test1 </button>
    <button onClick={()=>setUserName('test2')}> test2 </button>

  </>);
}