/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    Notify manager place in element where app root in sub

*/

import React from "react";
import ReduxNotification from "./reduxnotification.js";
import NotifyReduxContainer from "./notifyreduxcontainer.js";
import { useSelector, useDispatch } from 'react-redux'
import { notifyRemove } from './notifyslice.js';

export default function NotifyReduxManager(){

  const notifies = useSelector(state => state.notifyredux)

  const dispatch = useDispatch()

  function deleteNotification(id){
    dispatch(notifyRemove({id:id}));
  }

  //display notify messages
  return (<NotifyReduxContainer>
    {notifies.map((item)=>{
      return <ReduxNotification 
        key={item.id}
        onDelete={() => deleteNotification(item.id)} //delete dispatch
        color={item.color}
        autoClose={item.autoClose}
        message={item.message}
      />
    })}
  </NotifyReduxContainer>)
}