/*
  LICENSE: MIT
  Created by: Lightnet
*/

//does not work

import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { notifyAdded } from './notifyslice.js';
import { nanoid } from '@reduxjs/toolkit';


export default function AddNoteTest(){

  const dispatch = useDispatch()

  dispatch(
    notifyAdded({
      id: nanoid(),
      title:"test"+nanoid(),
      content:"test"+nanoid()
    })
  )
}