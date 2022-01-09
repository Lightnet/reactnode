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
import { AuthProvider, useAuth } from './auth/auth.js';
import { AccountPage } from './account.js';
import NavBarTop from './navbartop.js';
import { GamePage } from './game/gamesection.js';
import Message from './message/index.js';

function NoPage(){
  return <div>Error!</div>
}

export default function App() {
  //const [view, setView] = useState('index');

  return (<>
    <AuthProvider>
      <Router>
        <div>
          <NavBarTop />
        </div>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signout" element={<SignOutPage />} />
          <Route path="game" element={<GamePage />} />
          <Route path="message" element={<Message />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </>);
}