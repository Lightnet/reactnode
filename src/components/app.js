/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://v5.reactrouter.com/web/guides/quick-start
// https://reacttraining.com/blog/react-router-v6-pre/
// https://dev.to/salehmubashar/usenavigate-tutorial-react-js-aop

import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { IndexPage } from './index.js';
import { SignInPage } from './auth/signin.js';
import { SignOutPage } from './auth/signout.js';
import { SignUpPage } from './auth/signup.js';
import { AuthProvider } from './auth/auth.js';
import { AccountPage } from './account.js';

function NoPage(){
  return <div>Error!</div>
}

export function App() {
  //const [view, setView] = useState('index');

  //function renderView(){
    //return (<>
    //</>)
  //}

  return (<>
    <AuthProvider>
      <Router>
        <div>
          <Link to="/"> Home </Link> <span> | </span>
          <Link to="/account">Account</Link> <span> | </span>
          <Link to="/signin">Sign In</Link> <span> | </span>
          <Link to="/signup">Sign Up</Link> <span> | </span>
          <Link to="/signout">Sign Out</Link> 
        </div>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signout" element={<SignOutPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </>);
}