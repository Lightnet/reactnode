/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";

import { HomePage } from './pages/homepage.js';
import { SignInPage } from './auth/signin.js';
import { SignOutPage } from './auth/signout.js';
import { SignUpPage } from './auth/signup.js';
import { AccountPage } from './account/account.js';
import NavBarTop from './layout/navbartop.js';
import { GamePage } from './game/gamesection.js';
import Message from './message/index.js';
import ErrorPage from './pages/errorpage.js';
import NotifyManager from './notify/notifymanager.js';
import TestLabPage from './testlab/testlabpage.js';
import NotifyReduxManager from './notifyredux/notifyreduxmanager.js';
//import NotifyManager from './notify/notifymanager.js';

export function RoutePage() {


  return (
  <>
    <div>
      <NavBarTop />
    </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="account" element={<AccountPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signout" element={<SignOutPage />} />
      <Route path="game" element={<GamePage />} />
      <Route path="message" element={<Message />} />
      <Route path="testlab/*" element={<TestLabPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <NotifyManager />
    <NotifyReduxManager />
  </>)
}