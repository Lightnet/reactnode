
import React, { useState } from 'react';
import { useAuth } from './auth.js';

import {
  Link
} from "react-router-dom";

export default function Sign(){

  const {status} = useAuth();

  console.log(status);
  if(status == 'unauth'){
    return (<>
      <Link to="/signin">Sign In</Link> <span> | </span>
      <Link to="/signup">Sign Up</Link> <span> | </span>
    </>)
  }
  return <Link to="/signout">Sign Out</Link>
}