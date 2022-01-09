
import React, { useState } from 'react';
import { useAuth } from './auth/auth.js';

import {
  Link
} from "react-router-dom";
import Sign from './auth/sign.js';

export default function NavBarTop(){

  const {status} = useAuth();

  function renderAccess(){
    if(status == 'unauth'){
      return <></>
    }
    return(<>
      <Link to="account">Account</Link> <span> | </span>
      <Link to="game">Game</Link> <span> | </span>
      <Link to="message">Message</Link> <span> | </span>
    </>)
  }

  return (<>
    <Link to="/">Home</Link> <span> | </span>
    {renderAccess()}
    <Sign />
  </>)
}