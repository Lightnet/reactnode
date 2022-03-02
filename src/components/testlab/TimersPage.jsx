/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import AddTimerUI from "../timers/AddTimerUI.jsx";
import ClockTime from "../utilities/timeclock.js";

export default function TimersPage(){

  return (<>
    <div>
      <label>Timers</label><br /><br />
      <ClockTime/><br />

      <AddTimerUI />
    </div>
  </>)
}