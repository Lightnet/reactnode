/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useAuth } from '../auth/auth.js';
import { Counter } from '../counter/counter.js';
import NotiftyTest from '../notify/notiftytest.js';
import { AddPostForm } from '../notifyredux/addnotifyform.js';
import NotifyList from '../notifyredux/notifylist.js';

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
      <NotiftyTest /> <br />
      <Counter /> <br />
      <AddPostForm /> <br />
      <NotifyList /> <br />
    </div>
  </>);
}
