/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useAuth } from '../auth/auth.js';
import NotiftyTest from '../notify/notiftytest.js';

export function HomePage() {
  //const [view, setView] = useState('');
  const {user, setUser} = useAuth();

  function checkUserName(){
    if(user ==''){
      return <label>Weclome Guest.</label>
    }else{
      return <label>User Name:{user}</label>
    }
  }

  return (<>
    <div>
      <label>Index</label><br />
      {checkUserName()} <br />
      <NotiftyTest />
    </div>
  </>);
}
