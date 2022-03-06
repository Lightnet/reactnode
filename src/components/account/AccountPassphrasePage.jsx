/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider.jsx';

export function AccountPassphrasePage() {
  
  const {user, setUser} = useAuth();
  const [currentPassphrase, setCurrentPassphrase] = useState("");
  const [newPassphrase, setNewPassphrase] = useState("");

  function typeCurrentPassphrase(e){
    setCurrentPassphrase(e.target.value);
  }

  function typeNewPassphrase(e){
    setNewPassphrase(e.target.value);
  }

  async function clickApplyChange(){

  }

  return (<>
    <label> Current Passphrase:</label><input type={"text"} value={currentPassphrase} onChange={typeCurrentPassphrase} />  <br/>
    <label> New Passphrase:</label><input type={"text"} value={newPassphrase} onChange={typeNewPassphrase}/>  <br/>
    <button onClick={clickApplyChange}> Change Passprhase! </button>  <br/>
  </>);
}