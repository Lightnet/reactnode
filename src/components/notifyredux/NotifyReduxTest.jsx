/*
  LICENSE: MIT
  Created by: Lightnet
*/

//does not work

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { notifyAdd, notifyClear } from './notifySlice.jsx';
import { nanoid } from '@reduxjs/toolkit';

export default function NotifyReduxTest(){

  const notifies = useSelector(state => state.notifyredux)
  //console.log(notifies);

  const dispatch = useDispatch()

  function clickTest(){
    dispatch(
      notifyAdd({
        id: nanoid(),
        message:"test"
      })
    )
  }

  function clickClear(){
    dispatch(
      notifyClear()
    )
  }

  return <>
    <button onClick={clickTest}> Notify Redux Add </button>
    <button onClick={clickClear}> Notify Redux Clear </button>
  </>
}