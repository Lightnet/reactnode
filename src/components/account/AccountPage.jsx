/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import AuthAccess from '../auth/AuthAccess.jsx';
import { useAuth } from '../auth/AuthProvider.jsx';
import useFetch from '../hook/useFetch.mjs';

export function AccountPage() {
  
  const {user, setUser} = useAuth();

  async function getSession(){
    let data = await useFetch('/session');
    console.log(data)
  }

  return (<>
    <AuthAccess>
      <label>Account</label> <br />
      <label>User Name:{user}</label> <br />    
      <button onClick={()=>getSession()}> session </button>
    </AuthAccess>
  </>);
}