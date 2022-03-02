/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import EventLog from "../event/EventLog.jsx";
import EventLog2 from "../event/EventLog2.jsx";
import EventTest from "../event/EventTest.jsx";
import NotiftyPost from "../notify/NotiftyPost.jsx";
import NotiftyTestv2 from "../notify/NotiftyTest.jsx";
import { AddNotifyReduxForm } from "../notifyredux/addnotifyreduxform.jsx";
import NotifyReduxList from "../notifyredux/notifyreduxlist.jsx";
import NotifyReduxTest from "../notifyredux/notifyreduxtest.jsx";

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