/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";

import { HomePage } from './pages/HomePage.jsx';
import { SignInPage } from './auth/SignInPage.jsx';
import { SignOutPage } from './auth/SignOutPage.jsx';
import { SignUpPage } from './auth/SignUpPage.jsx';
import { AccountPage } from './account/AccountPage.jsx';
import NavBarTop from './layout/navbartop.jsx';
import { GamePage } from './game/GamePage.jsx';
import Message from './message/index.js';
import ErrorPage from './pages/ErrorPage.jsx';
import NotifyManager from './notify/NotifyManager.jsx';
import TestLabPage from './testlab/TestLabPage.jsx';
import NotifyReduxManager from './notifyredux/NotifyReduxManager.jsx';

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