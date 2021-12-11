/*
  Created by: Lightnet
*/

import React, { useState } from 'react';

export function SignOutPage() {
  //const [view, setView] = useState('');

  function clickSignOut(){
    console.log("clickSignOut")
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