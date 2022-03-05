/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import BtnAgent from "../express/BtnAgent";
import BtnFetch from "../express/BtnFetch";
import CookieButton from "../express/CookieButton";
import CookieDoc from "../express/CookieDoc";
import SessionButton from "../express/SessionButton";

export default function TestPage(){

  return <>
    <label> Test </label>
    <BtnAgent/>
    <BtnFetch/>
    <SessionButton/>
    <CookieButton/>
    <CookieDoc/>
  </>
}