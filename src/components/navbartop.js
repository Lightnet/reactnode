
import React, { useState } from 'react';
import { useAuth } from './auth/auth.js';

import {
  Link
} from "react-router-dom";

export default function NavBarTop(){

  const {user} = useAuth();


  function renderSign(){
    if(user == ''){
      return (<>
        <Link to="/signin">Sign In</Link> <span> | </span>
        <Link to="/signup">Sign Up</Link> <span> | </span>
      </>)
    }
    return <Link to="/signout">Sign Out</Link>  
  }

  function renderAccess(){
    if(user == ''){
      return <></>
    }
    return(<>
      <Link to="account">Account</Link> <span> | </span>
    </>)
  }

  return (<>
    <Link to="/">Home</Link> <span> | </span>
    {renderAccess()}
    {renderSign()}
  
  </>)
}