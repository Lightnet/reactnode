/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CountersPage from "./CountersPage.jsx";
import NoticePage from "./NoticePage.jsx";
import ProgressPage from "./ProgressPage.jsx";
import TestContentEditPage from "./TestContentEditPage.jsx";
import ThemePage from "./ThemePage.jsx";
import TimersPage from "./TimersPage.jsx";
import UIPage from "./UIPage.jsx";

export default function TestLabPage(){

  return (<>
    <div>
      <Link to="/testlab"> Index </Link> <span> | </span>
      <Link to="timers"> Timers </Link> <span> | </span>
      <Link to="counters"> Counters </Link> <span> | </span>
      <Link to="progress"> Progress </Link> <span> | </span>
      <Link to="notice"> Notice </Link> <span> | </span>
      <Link to="theme"> Theme </Link> <span> | </span>
      <Link to="ui"> UI </Link> <span> | </span>
      <Link to="testcontentedit"> Test Content Edit </Link> <span> | </span>
    </div>
    <div>
    <Routes>
      <Route path="/" element={<TimersPage />} />
      <Route path="timers" element={<TimersPage />} />
      <Route path="counters" element={<CountersPage />} />
      <Route path="progress" element={<ProgressPage />} />
      <Route path="notice" element={<NoticePage />} />
      <Route path="theme" element={<ThemePage />} />
      <Route path="ui" element={<UIPage />} />
      <Route path="testcontentedit" element={<TestContentEditPage />} />
    </Routes>
    </div>
  </>)
}