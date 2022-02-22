/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import EventLog from "../event/EventLog.js";
import EventLog2 from "../event/EventLog2.js";
import EventTest from "../event/EventTest.js";
import NotiftyPost from "../notify/notifypost.js";
import NotiftyTestv2 from "../notify/notifytestv2.js";
import { AddNotifyReduxForm } from "../notifyredux/addnotifyreduxform.js";
import NotifyReduxList from "../notifyredux/notifyreduxlist.js";
import NotifyReduxTest from "../notifyredux/notifyreduxtest.js";

export default function NoticePage(){

  return (<>
    <div>
      <label>NoticePage</label><br/>
      <NotiftyTestv2 /><br/>
      <NotiftyPost /><br/><br/>
      <NotifyReduxTest /><br/>
      <AddNotifyReduxForm /><br/>
      <NotifyReduxList /><br/>
      <br/>
      <EventTest/>
      <EventLog/>
      <EventLog2/>
    </div>
  </>)
}