/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CountersPage from "./counterspage.js";
import NoticePage from "./noticepage.js";
import ProgressPage from "./progresspage.js";
import TimersPage from "./timerspage.js";

export default function TestLabPage(){

  return (<>
    <div>
      <Link to="/testlab"> Index </Link> <span> | </span>
      <Link to="timers"> Timers </Link> <span> | </span>
      <Link to="counters"> Counters </Link> <span> | </span>
      <Link to="progress"> Progress </Link> <span> | </span>
      <Link to="notice"> Notice </Link> <span> | </span>
    </div>
    <div>
    <Routes>
      <Route path="/" element={<TimersPage />} />
      <Route path="timers" element={<TimersPage />} />
      <Route path="counters" element={<CountersPage />} />
      <Route path="progress" element={<ProgressPage />} />
      <Route path="notice" element={<NoticePage />} />
    </Routes>
    </div>
  </>)
}