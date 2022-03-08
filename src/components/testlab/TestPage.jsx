/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import TestDeleteRefreshToken from "../auth/TestDeleteRefreshToken";
import TestRefreshToken from "../auth/TestRefreshToken";
import TestRefreshToken2 from "../auth/TestRefreshToken2";
import TestRefreshToken3 from "../auth/TestRefreshToken3";
import TestCryptoButton from "../crypto/TestCryptoButton";
import BtnAgent from "../express/BtnAgent";
import BtnFetch from "../express/BtnFetch";
import CookieButton from "../express/CookieButton";
import CookieDoc from "../express/CookieDoc";
import SessionButton from "../express/SessionButton";

export default function TestPage(){

  return <>
    <label> Test </label><br/>
    <BtnAgent/>
    <BtnFetch/><br/>
    <SessionButton/><br/>
    <CookieButton/>
    <CookieDoc/>
    <TestRefreshToken/>
    <TestDeleteRefreshToken/>
    <TestRefreshToken2/>
    <TestRefreshToken3/>
    <br/>
    <TestCryptoButton/>
  </>
}