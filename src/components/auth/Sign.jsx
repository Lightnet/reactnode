/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { useAuth } from './AuthProvider.jsx';

import {
  Link
} from "react-router-dom";

export default function Sign(){

  const {status} = useAuth();
  //console.log(status);
  
  if(status == 'loading'){
    return (<label>Loading...</label>)
  }

  if(status == 'unauth'){
    return (<>
      <Link to="/signin">Sign In</Link> <span> | </span>
      <Link to="/signup">Sign Up</Link>
    </>)
  }
  return <Link to="/signout">Sign Out</Link>
}