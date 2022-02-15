/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useAuth } from '../auth/auth.js';
import CookieButton from '../cookie/cookiebutton.js';
import SessionButton from '../session/sessionbutton.js';

//import { notifyAdded } from '../notifyredux/notifyslice.js';
//import { nanoid } from '@reduxjs/toolkit';

import { useNotifty } from '../notify/notify.js';
import NotiftyTestv2 from '../notify/notifytestv2.js';

export function HomePage() {
  //const [view, setView] = useState('');

  const {
    notifies,
    dispatchNotify
  } = useNotifty();

  const {user, setUser} = useAuth();
  //const dispatch = useDispatch()

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
      <label> {notifies.length} </label>      
      <NotiftyTestv2 />
    </div>
  </>);
}
/*

<NotiftyTest /> <br />
<Counter /> <br />
<AddPostForm /> <br />
<NotifyList /> <br />
<CookieButton /> <br />
<SessionButton /> <br />
<button onClick={clickTest}> Add notify </button>
*/